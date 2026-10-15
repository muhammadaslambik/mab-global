// Cadangan database. Cara paling sederhana: supabase CLI.
//   npx supabase db dump --db-url "$SUPABASE_DB_URL" -f backup.sql
// Tahap berikut: jalankan dari cron dan simpan ke Cloudflare R2 atau repository privat.
console.log('Lihat komentar di scripts/backup-db.js untuk cara mencadangkan.');
