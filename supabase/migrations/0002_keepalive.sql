-- Tabel kecil untuk ping berkala agar proyek gratis tidak dijeda karena tidak aktif.
create table if not exists keepalive (id int primary key default 1, last_seen timestamptz default now());
insert into keepalive (id) values (1) on conflict do nothing;
alter table keepalive enable row level security;
create policy "anon boleh baca" on keepalive for select to anon using (true);
