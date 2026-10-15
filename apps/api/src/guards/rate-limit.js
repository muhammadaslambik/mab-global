// Batas laju sederhana per isolate (cukup untuk tahap awal). Ganti dengan KV atau Durable Object bila perlu.
const hits = new Map();
export function rateLimited(req, max = 30, windowMs = 60000) {
  const ip = req.headers.get('cf-connecting-ip') || 'lokal';
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
}
