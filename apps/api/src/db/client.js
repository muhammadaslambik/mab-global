// Pembungkus REST Supabase memakai kunci service (hanya di backend).
export async function sb(env, path, init = {}) {
  const res = await fetch(env.SUPABASE_URL + '/rest/v1/' + path, {
    ...init,
    headers: {
      apikey: env.SUPABASE_SERVICE_KEY,
      Authorization: 'Bearer ' + env.SUPABASE_SERVICE_KEY,
      'content-type': 'application/json',
      ...(init.headers || {})
    }
  });
  if (!res.ok) throw new Error('Supabase ' + res.status);
  return res.status === 204 ? null : res.json();
}
