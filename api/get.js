import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { key } = req.query;
  if (!key) return res.status(400).json({ error: 'Missing key' });

  try {
    const data = await kv.get(key);
    return res.status(200).json({ value: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}