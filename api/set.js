import { redis, validKey } from './_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { key, value } = req.body || {};
  if (!validKey(key) || typeof value !== 'string') return res.status(400).json({ error: 'bad request' });
  try {
    await redis.set(key, value);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('redis set failed:', e);
    return res.status(500).json({ error: 'redis write failed' });
  }
}
