import { Redis } from 'ioredis';

// Connects automatically using your REDIS_URL environment variable
const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  
  const { key } = req.query;
  if (!key) return res.status(400).json({ error: 'Missing key' });

  try {
    const data = await redis.get(key);
    return res.status(200).json({ value: data });
  } catch (error) {
    console.error("Redis Read Error:", error);
    return res.status(500).json({ error: error.message, details: "Failed to read from standard Redis." });
  }
}
