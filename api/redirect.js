import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  const code = req.query?.code || req.url?.split('/r/')[1]?.split('?')[0] || null;

  if (!code) return res.redirect(302, '/academy');

  // Vercel's own KV product uses KV_REST_API_*; the Upstash marketplace
  // integration uses UPSTASH_REDIS_REST_*, so accept either naming.
  const restUrl   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
  const restToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // No KV configured — just redirect home
  if (!restUrl || !restToken) {
    return res.redirect(302, '/academy');
  }

  // Instantiate inside handler
  const kv = new Redis({ url: restUrl, token: restToken });

  try {
    const url = await kv.get('r:' + code);
    if (!url) return res.redirect(302, '/academy?err=link_not_found');
    return res.redirect(302, url);
  } catch (err) {
    console.error('Redirect error:', err);
    return res.redirect(302, '/academy');
  }
}
