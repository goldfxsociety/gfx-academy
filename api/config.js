import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve path relative to this file — works reliably on Vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const CLIENTS_DIR = path.join(__dirname, '..', 'clients');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const clientId = process.env.ACADEMY_CLIENT || 'default';

    // Validate — only alphanumeric + hyphens
    if (!/^[a-zA-Z0-9-_]+$/.test(clientId)) {
      return res.status(400).json({ error: 'Invalid client ID' });
    }

    const clientPath  = path.join(CLIENTS_DIR, `${clientId}.json`);
    const defaultPath = path.join(CLIENTS_DIR, 'default.json');

    let filePath;
    if (fs.existsSync(clientPath)) {
      filePath = clientPath;
    } else if (fs.existsSync(defaultPath)) {
      filePath = defaultPath;
    } else {
      // No config files found at all — return bare minimum so app doesn't break
      return res.status(200).json({
        name: 'Trading Academy', shortName: 'Academy', logo: 'GFX',
        branding: {}, links: {}, modules: {}, customTabs: [], footer: {},
        ibBuilder: { passwordType: 'password' }
      });
    }

    const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Never expose password
    if (config.ibBuilder) delete config.ibBuilder.password;

    return res.status(200).json(config);

  } catch (err) {
    console.error('Config error:', err.message);
    // Return minimal config instead of 500 so the app still loads
    return res.status(200).json({
      name: 'Trading Academy', shortName: 'Academy', logo: 'GFX',
      branding: {}, links: {}, modules: {}, customTabs: [], footer: {},
      ibBuilder: { passwordType: 'password' }
    });
  }
}
