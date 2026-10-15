insert into employees (name, role, floor, room, is_head) values
  ('Yusa', 'Asisten owner', 7, 'Ruang rapat', false),
  ('Ziro', 'Kepala MAB-Media', 4, 'Pimpinan', true),
  ('Hami', 'Pemimpin Redaksi', 3, 'Redaksi', true)
on conflict (name) do nothing;
