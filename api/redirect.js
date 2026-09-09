import { Redis } from '@upstash/redis';

const kv = new Redis({
  url:   process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Store: upstash-kv-canary-apple

export default async function handler(req, res) {
  // Vercel injects the :code param into req.query when using rewrites
  // Also fallback: parse from URL path directly
  const code =
    req.query?.code ||
    req.url?.split('/r/')[1]?.split('?')[0] ||
    null;

  if (!code) {
    return res.redirect(302, '/academy');
  }

  try {
    const url = await kv.get('r:' + code);

    if (!url) {
      // Code not found — redirect to academy home with error hint
      return res.redirect(302, '/academy?err=link_not_found');
    }

    // 302 so browsers don't permanently cache the redirect
    return res.redirect(302, url);

  } catch (err) {
    console.error('Redirect error:', err);
    return res.redirect(302, '/academy');
  }
}
