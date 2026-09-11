import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Check all path strategies
    const roots = [
      process.cwd(),
      path.join(process.cwd(), '..'),
      '/var/task',
    ];

    const pathDiag = roots.map(root => {
      const clientsDir = path.join(root, 'clients');
      let exists = false;
      let files  = [];
      try {
        exists = fs.existsSync(clientsDir);
        if (exists) files = fs.readdirSync(clientsDir);
      } catch(e) {}
      return { root, clientsDir, exists, files };
    });

    return res.status(200).json({
      status: 'ok',
      env: {
        ACADEMY_CLIENT:  process.env.ACADEMY_CLIENT  || '(not set)',
        IB_PASSWORD_SET: !!process.env.IB_PASSWORD,
        KV_URL_SET:      !!process.env.KV_REST_API_URL,
        KV_TOKEN_SET:    !!process.env.KV_REST_API_TOKEN,
        NODE_ENV:        process.env.NODE_ENV || '(not set)',
      },
      paths: pathDiag,
    });

  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
