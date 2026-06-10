-- Block Ops: Adaptive Launch Ops - Milestones
-- Run this in Supabase SQL Editor before seeding launch ops data

create table if not exists launch_milestones (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  description text,
  status text not null check (status in ('locked', 'ready', 'in_progress', 'review', 'done', 'blocked')),
  owner text not null check (owner in ('Max', 'Samir', 'Adrian', 'Bloq')),
  target_date date,
  sort_order integer default 0,
  readiness_score integer default 0 check (readiness_score >= 0 and readiness_score <= 100),
  gate_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists launch_milestones_owner_idx on launch_milestones(owner);
create index if not exists launch_milestones_status_idx on launch_milestones(status);
create index if not exists launch_milestones_sort_order_idx on launch_milestones(sort_order);

alter table launch_milestones enable row level security;

create policy "Authenticated users can read launch milestones"
  on launch_milestones for select
  to authenticated
  using (true);

create policy "Authenticated users can insert launch milestones"
  on launch_milestones for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update launch milestones"
  on launch_milestones for update
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access to launch milestones"
  on launch_milestones for all
  to service_role
  using (true)
  with check (true);
