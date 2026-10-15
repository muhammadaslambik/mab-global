// Cadangan database berkala ke penyimpanan lain. Belum diimplementasikan.
// Proyek Supabase gratis tidak punya backup otomatis, jadi ini penting.
export async function backup(env) {
  return { skipped: true };
}
