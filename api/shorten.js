import { Redis } from '@upstash/redis';

function makeCode(len = 6) {
  const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < len; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Check KV env vars first — fail gracefully if not connected
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(503).json({ error: 'URL shortener not configured on this project' });
  }

  // Instantiate inside handler — safe even when env vars are missing on other projects
  const kv = new Redis({
    url:   process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') return res.status(400).json({ error: 'Missing url' });

    // Dedup — reuse existing code for same URL
    const existingCode = await kv.get('url:' + url);
    if (existingCode) {
      const base = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers['host']}`;
      return res.status(200).json({ short: `${base}/r/${existingCode}`, code: existingCode, reused: true });
    }

    // Generate unique code
    let code, attempts = 0;
    do {
      code = makeCode();
      if (++attempts > 10) return res.status(500).json({ error: 'Could not generate unique code' });
    } while (await kv.get('r:' + code));

    await kv.set('r:' + code, url);
    await kv.set('url:' + url, code);

    const base = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers['host']}`;
    return res.status(200).json({ short: `${base}/r/${code}`, code });

  } catch (err) {
    console.error('Shorten error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
