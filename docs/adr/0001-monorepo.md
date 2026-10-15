# 0001 Monorepo

Keputusan: frontend, backend, kontrak bersama, dan migrasi database dalam satu repository.
Alasan: perubahan sering menyentuh dua sisi sekaligus, kode bersama (karyawan, skema, tombol), tim kecil.
Dipisah nanti jika: tim dan jadwal rilis berbeda, perlu hak akses berbeda, atau game pindah ke Godot/Unity
(buat repository apps/game sendiri dengan Git LFS).
