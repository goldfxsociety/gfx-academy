import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const kv = new Redis({
  url:   process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const ping = await kv.ping().catch(() => 'KV unavailable');
    const keys = await kv.keys('*').catch(() => []);
    const { code } = req.query;
    let lookup = null;
    if (code) lookup = await kv.get('r:' + code).catch(() => null);

    // Check all path strategies for clients folder
    const roots = [
      process.cwd(),
      path.join(process.cwd(), '..'),
      '/var/task',
    ];
    const pathDiag = roots.map(root => {
      const clientsDir = path.join(root, 'clients');
      const exists = fs.existsSync(clientsDir);
      const files  = exists ? fs.readdirSync(clientsDir) : [];
      return { root, clientsDir, exists, files };
    });

    return res.status(200).json({
      status: 'ok',
      env: {
        ACADEMY_CLIENT:    process.env.ACADEMY_CLIENT    || '(not set)',
        IB_PASSWORD_SET:   !!process.env.IB_PASSWORD,
        KV_URL_SET:        !!process.env.KV_REST_API_URL,
        KV_TOKEN_SET:      !!process.env.KV_REST_API_TOKEN,
      },
      kv: { ping, total_keys: keys.length, keys },
      lookup,
      paths: pathDiag,
    });

  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
