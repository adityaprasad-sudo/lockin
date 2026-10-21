import { Redis } from '@upstash/redis';

// Works with the Vercel/Upstash integration, which injects UPSTASH_REDIS_REST_URL / _TOKEN
// (older Vercel KV projects used KV_REST_API_URL / _TOKEN, so both are accepted).
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
})

// Only allow the keys this app actually uses: ps_users, ps_d_<date>, ps_w_<date>, ps_goals_<name>
export const validKey = k => typeof k === 'string' && k.startsWith('ps_') && k.length <= 120;
