import adapter from '@sveltejs/adapter-vercel';

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ runtime: 'nodejs20.x' }),
    csp: {
      mode: 'hash',
      directives: {
        'default-src': ["'self'", ...(isDev ? ['https:'] : [])],
        // Allow Vanta/Three from CDNs; add dev relaxations for HMR
        'script-src': [
          "'self'",
          ...(isDev ? ["'unsafe-inline'", "'unsafe-eval'", 'blob:'] : []),
          'cdnjs.cloudflare.com',
          'cdn.jsdelivr.net',
          'vercel.live'
        ],
        'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        'font-src': ["'self'", 'fonts.gstatic.com'],
        'img-src': ["'self'", 'data:', 'blob:'],
        'connect-src': [
          "'self'",
          ...(isDev ? ['http:', 'https:', 'ws:'] : [])
        ],
        'frame-src': ["'self'", 'vercel.live'],
        'frame-ancestors': ["'none'"],
        'base-uri': ["'none'"]
      }
    }
  }
};

export default config;
