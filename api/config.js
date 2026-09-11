import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const clientId = process.env.ACADEMY_CLIENT || 'default';

    // Validate
    if (!/^[a-zA-Z0-9-_]+$/.test(clientId)) {
      return res.status(400).json({ error: 'Invalid client ID' });
    }

    // Try multiple path strategies — Vercel can resolve differently per runtime
    const roots = [
      process.cwd(),
      path.join(process.cwd(), '..'),
      '/var/task',                    // Vercel Lambda root
      path.join('/var/task'),
    ];

    let config = null;

    for (const root of roots) {
      const clientPath  = path.join(root, 'clients', `${clientId}.json`);
      const defaultPath = path.join(root, 'clients', 'default.json');

      if (fs.existsSync(clientPath)) {
        config = JSON.parse(fs.readFileSync(clientPath, 'utf8'));
        break;
      } else if (fs.existsSync(defaultPath)) {
        config = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));
        break;
      }
    }

    // If still nothing found — return fallback
    if (!config) {
      console.error('Config not found. ACADEMY_CLIENT:', clientId, 'cwd:', process.cwd());
      return res.status(200).json({
        name: 'Trading Academy', shortName: 'Academy', logo: 'GFX',
        branding: {}, links: {}, modules: {}, customTabs: [], footer: {},
        ibBuilder: { passwordType: 'password' }
      });
    }

    // Never expose password
    if (config.ibBuilder) delete config.ibBuilder.password;

    return res.status(200).json(config);

  } catch (err) {
    console.error('Config error:', err.message);
    return res.status(200).json({
      name: 'Trading Academy', shortName: 'Academy', logo: 'GFX',
      branding: {}, links: {}, modules: {}, customTabs: [], footer: {},
      ibBuilder: { passwordType: 'password' }
    });
  }
}
