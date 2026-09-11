export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { password } = req.body;

    const correctPassword = process.env.IB_PASSWORD;

    // No password set in env — open access
    if (!correctPassword) {
      return res.status(200).json({ ok: true });
    }

    // Empty submission — just return unauthorized (used by checkNeedsAuth)
    if (!password || typeof password !== 'string' || password.trim() === '') {
      return res.status(401).json({ ok: false });
    }

    // Compare — use await to keep function alive (fixes Vercel serverless timeout issue)
    await new Promise(resolve => setTimeout(resolve, 500)); // brute force delay

    if (password.trim() === correctPassword.trim()) {
      return res.status(200).json({ ok: true });
    }

    return res.status(401).json({ ok: false, error: 'Incorrect password' });

  } catch (err) {
    console.error('verify-password error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
