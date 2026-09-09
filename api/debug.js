import { Redis } from '@upstash/redis';

const kv = new Redis({
  url:   process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Test 1: Can we connect?
    const ping = await kv.ping();

    // Test 2: List all keys
    const keys = await kv.keys('*');

    // Test 3: Check a specific code if passed
    const { code } = req.query;
    let lookup = null;
    if (code) {
      lookup = await kv.get('r:' + code);
    }

    return res.status(200).json({
      status: 'connected',
      ping,
      total_keys: keys.length,
      keys,
      lookup: lookup || null,
      env_url_set:   !!process.env.KV_REST_API_URL,
      env_token_set: !!process.env.KV_REST_API_TOKEN,
    });

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
      env_url_set:   !!process.env.KV_REST_API_URL,
      env_token_set: !!process.env.KV_REST_API_TOKEN,
    });
  }
}
