import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  const code = req.query?.code || req.url?.split('/r/')[1]?.split('?')[0] || null;

  if (!code) return res.redirect(302, '/academy');

  // No KV configured — just redirect home
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.redirect(302, '/academy');
  }

  // Instantiate inside handler
  const kv = new Redis({
    url:   process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  try {
    const url = await kv.get('r:' + code);
    if (!url) return res.redirect(302, '/academy?err=link_not_found');
    return res.redirect(302, url);
  } catch (err) {
    console.error('Redirect error:', err);
    return res.redirect(302, '/academy');
  }
}
