export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { password } = req.body;

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Missing password' });
    }

    const correctPassword = process.env.IB_PASSWORD;

    if (!correctPassword) {
      // No password set — allow access (for Ben's default setup without password)
      return res.status(200).json({ ok: true });
    }

    if (password.trim() === correctPassword.trim()) {
      return res.status(200).json({ ok: true });
    }

    // Add small delay to prevent brute force
    setTimeout(() => {
      return res.status(401).json({ ok: false, error: 'Incorrect password' });
    }, 800);

  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
