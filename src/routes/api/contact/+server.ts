import type { RequestHandler } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

// Expect the following environment variables to be configured on Vercel (or in .env.local when using `vercel dev`):
// - RESEND_API_KEY: your Resend API key
// - CONTACT_TO: destination email address for messages
// - CONTACT_FROM (optional): custom from address verified in Resend; fallback used if not provided

const resend = new Resend(env.RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
  try {
    const payload = await request.json();
    const name = (payload?.name ?? '').toString();
    const email = (payload?.email ?? '').toString();
    const subject = (payload?.subject ?? '').toString() || 'New portfolio contact message';
    const message = (payload?.message ?? '').toString();

    // Basic validation (mirror front-end)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!message || message.trim().length < 10) {
      return new Response(JSON.stringify({ ok: false, error: 'Message too short' }), {
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
      return new Response(JSON.stringify({ ok: false, error: error.message || 'Email send failed' }), {
        status: 502,
        headers: { 'content-type': 'application/json' }
      });
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
