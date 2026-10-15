# MAB Global (monorepo)

Dunia karyawan AI PT. MAB Global Company: tampilan 3D (frontend), otak agen AI (backend),
basis data (Supabase), dan dokumentasi. Semua dalam satu repository.

## Persiapan
- Node.js 20 atau lebih baru (cek dengan: node -v) dan Git
- Akun gratis: GitHub, Cloudflare, Supabase

## Mulai
    npm install
    Copy-Item .env.example .env      (Windows PowerShell; di Mac/Linux: cp .env.example .env)
    npm test                         (tes sistem input, skema, dan API)
    npm run dev:web                  (tampilan di http://localhost:5173)
    npm run dev:api                  (backend di http://localhost:8787)

## Susunan
    apps/web          frontend: dunia 3D, panel kendali, sistem input pertandingan
    apps/api          backend: Cloudflare Workers (agen AI, jadwal, penjaga)
    packages/shared   kontrak yang dipakai kedua sisi (karyawan, skema, tombol)
    supabase          migrasi dan data awal basis data
    docs              arsitektur, sistem input, agen AI, anggaran gratis, runbook
    scripts           build satu berkas (artifact), cadangan, seed
    .github/workflows CI dan deploy otomatis

## Build satu berkas untuk Claude (artifact)
    npm run build:artifact
Hasilnya: dist/artifact/gedung-mab.html. Daftar dan urutan berkas diatur di apps/web/manifest.json.

## Aturan penting
- Jangan pernah commit rahasia (kunci API). Pakai .env (diabaikan Git) dan rahasia Cloudflare.
- Frontend hanya boleh memegang kunci anon Supabase yang memang publik.
- Pekerjaan berisiko (publikasi, keuangan, balasan pelanggan) harus lewat persetujuan manusia.
