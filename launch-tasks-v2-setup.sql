-- Block Ops: Adaptive Launch Ops - Tasks, Collaborators, Dependencies, Agendas
-- Run this in Supabase SQL Editor after launch-milestones-setup.sql

create table if not exists launch_tasks_v2 (
  id uuid default gen_random_uuid() primary key,
  task_key text unique,
  title text not null,
  description text,
  primary_owner text not null check (primary_owner in ('Max', 'Samir', 'Adrian', 'Bloq')),
  status text not null check (status in ('locked', 'ready', 'in_progress', 'waiting', 'blocked', 'review', 'done', 'dropped')),
  priority text not null check (priority in ('critical', 'high', 'medium', 'low')),
  workstream text not null check (workstream in (
    'Clinical Standard & Deliverables',
    'Platform & Internal/Client System',
    'Mock Client / Demo Flow',
    'Clinical Validation Round',
    'Legal & Compliance',
    'Founding Partner Motion',
    'Proof / Data / Reporting',
    'Operating System / Execution Management',
    'Block Ops Wiki Buildout',
    'Operating Model',
    'Final Review / Approvals',
    'Client-Facing Leak Audit',
    'Wiki / Obsidian Operating System',
    'Wiki Cross-Linking'
  )),
  milestone_id uuid references launch_milestones(id) on delete set null,
  due_date date,
  notes text,
  compliance_flag boolean default false,
  legal_gate_flag boolean default false,
  changed_by_new_info boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists launch_task_collaborators (
  id uuid default gen_random_uuid() primary key,
  task_id uuid not null references launch_tasks_v2(id) on delete cascade,
  collaborator text not null check (collaborator in ('Max', 'Samir', 'Adrian', 'Bloq')),
  created_at timestamptz default now(),
  unique(task_id, collaborator)
);

create table if not exists launch_task_dependencies (
  id uuid default gen_random_uuid() primary key,
  task_id uuid not null references launch_tasks_v2(id) on delete cascade,
  depends_on_task_id uuid not null references launch_tasks_v2(id) on delete cascade,
  dependency_type text not null default 'finish_to_start' check (dependency_type in ('finish_to_start', 'gate', 'soft_blocker')),
  created_at timestamptz default now(),
  unique(task_id, depends_on_task_id),
  check (task_id <> depends_on_task_id)
);

create table if not exists launch_milestone_dependencies (
  id uuid default gen_random_uuid() primary key,
  milestone_id uuid not null references launch_milestones(id) on delete cascade,
  depends_on_milestone_id uuid not null references launch_milestones(id) on delete cascade,
  created_at timestamptz default now(),
  unique(milestone_id, depends_on_milestone_id),
  check (milestone_id <> depends_on_milestone_id)
);

create table if not exists weekly_agendas (
  id uuid default gen_random_uuid() primary key,
  week_of date not null unique,
  north_star_note text,
  current_milestone_slug text,
  company_priorities text,
  samir_focus text,
  max_focus text,
  adrian_focus text,
  shared_items text,
  blocked_items text,
  decisions_needed text,
  launch_risks text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists launch_tasks_v2_owner_idx on launch_tasks_v2(primary_owner);
create index if not exists launch_tasks_v2_status_idx on launch_tasks_v2(status);
create index if not exists launch_tasks_v2_priority_idx on launch_tasks_v2(priority);
create index if not exists launch_tasks_v2_milestone_idx on launch_tasks_v2(milestone_id);
create index if not exists launch_task_dependencies_task_idx on launch_task_dependencies(task_id);
create index if not exists launch_task_dependencies_depends_idx on launch_task_dependencies(depends_on_task_id);
create index if not exists launch_task_collaborators_task_idx on launch_task_collaborators(task_id);

alter table launch_tasks_v2 enable row level security;
alter table launch_task_collaborators enable row level security;
alter table launch_task_dependencies enable row level security;
alter table launch_milestone_dependencies enable row level security;
alter table weekly_agendas enable row level security;

create policy "Authenticated users can read launch tasks v2"
  on launch_tasks_v2 for select
  to authenticated
  using (true);

create policy "Authenticated users can insert launch tasks v2"
  on launch_tasks_v2 for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update launch tasks v2"
  on launch_tasks_v2 for update
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access to launch tasks v2"
  on launch_tasks_v2 for all
  to service_role
  using (true)
  with check (true);

create policy "Authenticated users can read launch task collaborators"
  on launch_task_collaborators for select
  to authenticated
  using (true);

create policy "Authenticated users can insert launch task collaborators"
  on launch_task_collaborators for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update launch task collaborators"
  on launch_task_collaborators for update
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access to launch task collaborators"
  on launch_task_collaborators for all
  to service_role
  using (true)
  with check (true);

create policy "Authenticated users can read launch task dependencies"
  on launch_task_dependencies for select
  to authenticated
  using (true);

create policy "Authenticated users can insert launch task dependencies"
  on launch_task_dependencies for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update launch task dependencies"
  on launch_task_dependencies for update
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access to launch task dependencies"
  on launch_task_dependencies for all
  to service_role
  using (true)
  with check (true);

create policy "Authenticated users can read launch milestone dependencies"
  on launch_milestone_dependencies for select
  to authenticated
  using (true);

create policy "Authenticated users can insert launch milestone dependencies"
  on launch_milestone_dependencies for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update launch milestone dependencies"
  on launch_milestone_dependencies for update
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access to launch milestone dependencies"
  on launch_milestone_dependencies for all
  to service_role
  using (true)
  with check (true);

create policy "Authenticated users can read weekly agendas"
  on weekly_agendas for select
  to authenticated
  using (true);

create policy "Authenticated users can insert weekly agendas"
  on weekly_agendas for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update weekly agendas"
  on weekly_agendas for update
  to authenticated
  using (true)
  with check (true);

create policy "Service role full access to weekly agendas"
  on weekly_agendas for all
  to service_role
  using (true)
  with check (true);
