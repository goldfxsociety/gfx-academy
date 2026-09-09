import { Redis } from '@upstash/redis';

const kv = new Redis({
  url:   process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Store: upstash-kv-canary-apple

// Generates a random short code like "a3kX9"
function makeCode(len = 6) {
  const chars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < len; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export default async function handler(req, res) {
  // CORS — allow requests from same origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { url } = req.body;

    // Validate — only allow links to your own academy
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Missing url' });
    }
    if (!url.includes('/academy')) {
      return res.status(400).json({ error: 'Only academy links can be shortened' });
    }

    // Check if this exact URL was already shortened — reuse the code
    const existingCode = await kv.get('url:' + url);
    if (existingCode) {
      const base = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers['host']}`;
      return res.status(200).json({ short: `${base}/r/${existingCode}`, code: existingCode, reused: true });
    }

    // Generate unique code (retry if collision)
    let code, attempts = 0;
    do {
      code = makeCode();
      attempts++;
      if (attempts > 10) return res.status(500).json({ error: 'Could not generate unique code' });
    } while (await kv.get('r:' + code));

    // Save both directions:
    // r:<code>  → full URL      (for redirects)
    // url:<url> → code          (for deduplication)
    await kv.set('r:' + code, url);
    await kv.set('url:' + url, code);

    const base = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers['host']}`;
    return res.status(200).json({ short: `${base}/r/${code}`, code });

  } catch (err) {
    console.error('Shorten error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
