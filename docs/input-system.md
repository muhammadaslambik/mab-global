# Sistem input pertandingan

Enam lapisan: perangkat -> bindings (slot) -> konteks -> recognizer kombo -> intent -> FSM pemain.
Kode: apps/web/src/match/input. Tes: apps/web/tests/input.test.js.

Prinsip: gameplay tidak membaca tombol, hanya membaca intent. Kombo dievaluasi lebih dulu dan menandai
tombol sebagai terpakai. Perintah bersifat tepi dibuffer 180 ms; perintah berbasis level (pressing) tidak.

Kombo: one-two (L1 + SOUTH, lalu NORTH), lob through (L1 + NORTH), finesse (WEST ditahan + R2),
double pressing (tahan SOUTH + tap WEST saat bertahan), L1 tap = ganti kursor.
