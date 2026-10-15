// Ping ringan ke Supabase agar proyek gratis tidak dijeda karena tidak aktif.
export async function keepAlive(env) {
  const res = await fetch(env.SUPABASE_URL + '/rest/v1/keepalive?select=id&limit=1', {
    headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: 'Bearer ' + env.SUPABASE_ANON_KEY }
  });
  if (!res.ok) {
    // Tahap berikut: kirim peringatan ke Telegram atau email
    console.error('Keep-alive gagal', res.status);
  }
  return res.ok;
}
