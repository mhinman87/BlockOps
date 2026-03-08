-- Block Ops: Launch Task Tracker
-- Run this in Supabase SQL Editor

create table if not exists launch_tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  owner text not null check (owner in ('Max', 'Samir', 'Adrian', 'Bloq')),
  category text not null check (category in ('Legal', 'Website', 'Dashboard', 'Sales', 'Funding', 'Infrastructure', 'Content', 'Agent')),
  done boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for filtering
create index if not exists launch_tasks_owner_idx on launch_tasks(owner);
create index if not exists launch_tasks_category_idx on launch_tasks(category);
create index if not exists launch_tasks_done_idx on launch_tasks(done);

-- RLS
alter table launch_tasks enable row level security;

create policy "Authenticated users can read tasks"
  on launch_tasks for select
  to authenticated
  using (true);

create policy "Authenticated users can insert tasks"
  on launch_tasks for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update tasks"
  on launch_tasks for update
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access"
  on launch_tasks for all
  to service_role
  using (true)
  with check (true);
