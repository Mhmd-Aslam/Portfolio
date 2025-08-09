import { json, type RequestHandler } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

// Expect the following environment variables to be configured on Vercel (or in .env.local when using `vercel dev`):
// - RESEND_API_KEY: your Resend API key
// - CONTACT_TO: destination email address for messages
// - CONTACT_FROM (optional): custom from address verified in Resend; fallback used if not provided

const resend = new Resend(env.RESEND_API_KEY);

// In-memory per-IP sliding window rate limiter (no third-party)
// NOTE: Resets on deploy/restart and is per-instance only. Suitable for small sites.
const RL_WINDOW_MS = 60_000; // 1 minute
const RL_MAX = 5; // allow 5 requests per window per IP
const rlStore = new Map<string, number[]>(); // ip -> timestamps (ms)

function rateLimitCheck(ip: string, now: number) {
  if (!ip) ip = 'unknown';
  const arr = rlStore.get(ip) ?? [];
  const cutoff = now - RL_WINDOW_MS;
  const recent = arr.filter((t) => t > cutoff);
  if (recent.length >= RL_MAX) {
    // Compute Retry-After seconds based on oldest request in window
    const oldest = recent[0];
    const msLeft = RL_WINDOW_MS - (now - oldest);
    const retryAfter = Math.max(1, Math.ceil(msLeft / 1000));
    rlStore.set(ip, recent); // keep pruned
    return { allowed: false, retryAfter } as const;
  }
  recent.push(now);
  rlStore.set(ip, recent);
  return { allowed: true } as const;
}

export const POST: RequestHandler = async (event) => {
  const { request, getClientAddress } = event as unknown as { request: Request; getClientAddress?: () => string };
  try {
    // Basic size guard
    const cl = request.headers.get('content-length');
    if (cl && Number(cl) > 50_000) {
      return new Response(JSON.stringify({ ok: false, error: 'Payload too large' }), { status: 413 });
    }

    // Origin allowlist (optional env CONTACT_ALLOWED_ORIGINS comma-separated). In dev, allow localhost.
    const origin = request.headers.get('origin') || '';
    const allowed = (env.CONTACT_ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
    if (dev) allowed.push('http://localhost:5173', 'http://127.0.0.1:5173');
    if (origin && allowed.length && !allowed.includes(origin)) {
      return new Response(JSON.stringify({ ok: false, error: 'Forbidden origin' }), { status: 403 });
    }

    // Rate limit (after origin check)
    const ipHeader = request.headers.get('x-forwarded-for') || '';
    const ip = (getClientAddress?.() || ipHeader.split(',')[0].trim() || 'unknown');
    const now = Date.now();
    const rl = rateLimitCheck(ip, now);
    if (!rl.allowed) {
      return new Response(JSON.stringify({ ok: false, error: 'Too many requests' }), {
        status: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(rl.retryAfter)
        }
      });
    }

    const payload = await request.json();
    const name = (payload?.name ?? '').toString();
    const email = (payload?.email ?? '').toString();
    const subject = (payload?.subject ?? '').toString() || 'New portfolio contact message';
    const message = (payload?.message ?? '').toString();
    const website = (payload?.website ?? '').toString(); // honeypot

    // Honeypot: silently accept but do nothing if filled (looks successful to bots)
    if (website.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
    }

    // Basic validation (mirror front-end) + strict lengths
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email) || /[\r\n]/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }
    if (name.length > 100 || subject.length > 150 || message.length > 2000) {
      return new Response(JSON.stringify({ ok: false, error: 'Field too long' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }
    if (!email || !emailRegex.test(email.trim())) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
        status: 400,
        headers: { 'content-type': 'application/json' }
      });
    }

    const to = env.CONTACT_TO || 'aslamaass108@gmail.com';
    if (!to) {
      return new Response(JSON.stringify({ ok: false, error: 'Server not configured: CONTACT_TO missing' }), {
        status: 500,
        headers: { 'content-type': 'application/json' }
      });
    }

    const from = env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>';

    // Send email via Resend (report errors verbosely for debugging)
    const { data: emailData, error } = await resend.emails.send({
      from,
      to,
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, sans-serif;">
          <h2 style="margin:0 0 12px;">New contact message</h2>
          <p style="margin:0 0 4px;"><b>Name:</b> ${escapeHtml(name)}</p>
          <p style="margin:0 0 4px;"><b>Email:</b> ${escapeHtml(email)}</p>
          <p style="margin:0 0 12px;"><b>Subject:</b> ${escapeHtml(subject)}</p>
          <div style="white-space:pre-wrap; border:1px solid #eee; padding:12px; border-radius:8px;">
            ${escapeHtml(message)}
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      const body = dev
        ? { ok: false, error: error.message || 'Email send failed' }
        : { ok: false, error: 'Unable to send message. Please try again later.' };
      return new Response(JSON.stringify(body), { status: 502, headers: { 'content-type': 'application/json' } });
    }

    return new Response(JSON.stringify({ ok: true, id: emailData?.id }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Unexpected server error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
