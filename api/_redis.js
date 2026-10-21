import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url:
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL,
  token:
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Only allow the keys this app actually uses: ps_users, ps_d_<date>, ps_w_<date>, ps_goals_<name>
export const validKey = k => typeof k === 'string' && k.startsWith('ps_') && k.length <= 120;
