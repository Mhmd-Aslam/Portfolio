import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Content Security Policy
  // - dev: relaxed for HMR and debugging
  // - preview (Vercel): allow inline and vercel.live helpers, keep domains explicit
  // - production: strict
  const isPreview = env.VERCEL_ENV === 'preview';
  const csp = dev
    ? [
        "default-src 'self' https:",
        // Allow Vite HMR and external CDNs
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: cdnjs.cloudflare.com cdn.jsdelivr.net",
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src 'self' fonts.gstatic.com",
        "img-src 'self' data: blob:",
        "connect-src 'self' http: https: ws:",
        "frame-ancestors 'none'",
        "base-uri 'none'"
      ].join('; ')
    : isPreview
    ? [
        "default-src 'self'",
        // Allow inline for Vercel preview helpers and Svelte runtime on preview if needed
        "script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com cdn.jsdelivr.net vercel.live",
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src 'self' fonts.gstatic.com",
        "img-src 'self' data: blob:",
        // Preview may call vercel.live endpoints
        "connect-src 'self' https:",
        // Allow preview toolbar iframe
        "frame-src 'self' vercel.live",
        "frame-ancestors 'none'",
        "base-uri 'none'"
      ].join('; ')
    : [
        "default-src 'self'",
        // Allow Vanta/Three from CDNs
        "script-src 'self' cdnjs.cloudflare.com cdn.jsdelivr.net",
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src 'self' fonts.gstatic.com",
        "img-src 'self' data: blob:",
        // Limit browser connects; server can still call external APIs server-side
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'none'"
      ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Effective only over HTTPS (Vercel uses HTTPS). Safe in local dev too.
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return response;
};
