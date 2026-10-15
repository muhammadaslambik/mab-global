-- Tabel inti. RLS aktif tanpa kebijakan publik: hanya kunci service (backend) yang bisa mengakses.
create extension if not exists pgcrypto;

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  role text not null,
  floor int not null,
  room text,
  is_head boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid references employees(id) on delete cascade,
  prompt text not null,
  category text,
  status text not null default 'queued'
    check (status in ('queued','running','needs_approval','done','failed')),
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists task_results (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  content text not null,
  provider text,
  tokens_in int,
  tokens_out int,
  created_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid references employees(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  decision text check (decision in ('approved','rejected')),
  decided_at timestamptz
);

create table if not exists daily_logs (
  id uuid primary key default gen_random_uuid(),
  day date not null default current_date,
  summary text,
  created_at timestamptz not null default now()
);

alter table employees enable row level security;
alter table tasks enable row level security;
alter table task_results enable row level security;
alter table chat_messages enable row level security;
alter table approvals enable row level security;
alter table daily_logs enable row level security;
