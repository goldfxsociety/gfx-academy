import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  try {
    // Which client config to load — set in Vercel env vars
    const clientId = process.env.ACADEMY_CLIENT || 'default';

    // Validate — only allow alphanumeric + hyphens to prevent path traversal
    if (!/^[a-zA-Z0-9-_]+$/.test(clientId)) {
      return res.status(400).json({ error: 'Invalid client ID' });
    }

    const configPath = path.join(process.cwd(), 'clients', `${clientId}.json`);

    // Fallback to default if client config not found
    const filePath = fs.existsSync(configPath)
      ? configPath
      : path.join(process.cwd(), 'clients', 'default.json');

    const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // NEVER expose password in config response — only expose type
    if (config.ibBuilder) {
      delete config.ibBuilder.password;
    }

    return res.status(200).json(config);

  } catch (err) {
    console.error('Config error:', err);
    return res.status(500).json({ error: 'Could not load config' });
  }
}
