export function isAuthorized(req, env) {
  if (!env.API_TOKEN) return false;   // tanpa token terkonfigurasi, tolak semua
  return req.headers.get('authorization') === 'Bearer ' + env.API_TOKEN;
}
