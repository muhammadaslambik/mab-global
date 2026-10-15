# Runbook

## Deploy backend
1. cd apps/api
2. npx wrangler login
3. npx wrangler secret put SUPABASE_URL (ulangi untuk SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY, API_TOKEN)
4. npm run deploy

## Supabase terjeda
Buka dasbor, pilih Restore project. Pastikan jadwal keep-alive (apps/api/src/cron/keepalive.js) berjalan.

## Ganti kunci bocor
Cabut kunci di penyedia, buat baru, jalankan wrangler secret put lagi, lalu deploy.

## Cadangan
Jalankan scripts/backup-db.js (atau supabase db dump) secara berkala. Proyek gratis tidak punya backup otomatis.
