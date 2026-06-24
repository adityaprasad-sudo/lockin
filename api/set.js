import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'Missing key' });

  try {
    await redis.set(key, value);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Redis Write Error:", error);
    return res.status(500).json({ error: error.message, details: "Failed to write to standard Redis." });
  }
}