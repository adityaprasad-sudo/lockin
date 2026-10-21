import { redis, validKey } from './_redis.js';

export default async function handler(req, res) {
  const key = req.query.key;
  if (!validKey(key)) return res.status(400).json({ error: 'invalid key' });
  try {
    const v = await redis.get(key);
    // The frontend does JSON.parse(value), so it must receive a STRING.
    // @upstash/redis auto-parses JSON, so turn objects back into strings here.
    const value = v == null ? null : (typeof v === 'string' ? v : JSON.stringify(v));
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ value });
  } catch (e) {
    console.error('redis get failed:', e);
    return res.status(500).json({ error: 'redis read failed' });
  }
}
