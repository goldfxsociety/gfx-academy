export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { code }    = req.body || {};
  const correct     = process.env.TOOLS_ACCESS_CODE;

  if (!correct) return res.status(503).json({ ok: false, error: 'Not configured' });
  if (!code || typeof code !== 'string' || code.trim() === '') {
    return res.status(401).json({ ok: false });
  }
  if (code.trim().toUpperCase() === correct.trim().toUpperCase()) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false, error: 'Incorrect' });
}
