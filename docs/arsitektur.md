# Arsitektur

    Pengguna
       |
    apps/web (dunia 3D + panel)  --gateway-->  apps/api (Cloudflare Workers)
                                                  |-- agents/  (persona, orkestrator kepala -> anggota)
                                                  |-- llm/     (Claude, Gemini, Groq, cadangan)
                                                  |-- guards/  (autentikasi, batas laju, persetujuan manusia)
                                                  |-- cron/    (keep-alive, tugas harian, cadangan)
                                                  '-- db/      --> Supabase (Postgres)

Lapisan gateway di frontend punya dua implementasi: ClaudeArtifactGateway (di dalam Claude) dan
HttpGateway (memanggil backend sendiri). Kode dunia 3D tidak perlu tahu mana yang dipakai.
