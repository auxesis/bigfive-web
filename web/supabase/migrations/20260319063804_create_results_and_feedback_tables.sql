create extension if not exists "pgcrypto";

create table if not exists results (
  id           uuid        primary key default gen_random_uuid(),
  test_id      text        not null,
  lang         text        not null,
  invalid      boolean     not null default false,
  time_elapsed integer     not null,
  date_stamp   timestamptz not null default now(),
  answers      jsonb       not null
);

create table if not exists feedback (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz not null default now()
);
