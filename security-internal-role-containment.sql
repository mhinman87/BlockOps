-- Block Ops M1 containment: internal Wiki and Mission Control
-- Apply with a database-owner connection in Supabase SQL Editor.
-- This migration is intentionally fail-closed: only explicit reviewer/admin
-- rows in public.user_roles can access the governed internal surfaces.

begin;

create or replace function public.is_internal_user()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role in ('reviewer', 'admin')
  );
$$;

revoke all on function public.is_internal_user() from public;
grant execute on function public.is_internal_user() to authenticated, service_role;

-- Remove every existing policy on the protected surfaces. PostgreSQL combines
-- permissive policies with OR, so leaving one broad legacy policy would defeat
-- a new restrictive policy.
do $$
declare
  policy_row record;
begin
  for policy_row in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = any (array[
        'wiki_sections',
        'wiki_pages',
        'wiki_page_links',
        'launch_milestones',
        'launch_tasks',
        'launch_tasks_v2',
        'launch_task_collaborators',
        'launch_task_dependencies',
        'launch_milestone_dependencies',
        'weekly_agendas'
      ])
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      policy_row.policyname,
      policy_row.schemaname,
      policy_row.tablename
    );
  end loop;
end
$$;

-- Enforce RLS and remove direct anonymous table privileges as defense in depth.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'wiki_sections',
    'wiki_pages',
    'wiki_page_links',
    'launch_milestones',
    'launch_tasks',
    'launch_tasks_v2',
    'launch_task_collaborators',
    'launch_task_dependencies',
    'launch_milestone_dependencies',
    'weekly_agendas'
  ]
  loop
    if to_regclass(format('public.%I', table_name)) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      execute format('revoke all on table public.%I from anon', table_name);
      execute format(
        'create policy %I on public.%I for all to authenticated using (public.is_internal_user()) with check (public.is_internal_user())',
        'Internal roles only',
        table_name
      );
    end if;
  end loop;
end
$$;

-- Role lookup is needed by the frontend, but users may read only their own row.
-- Role assignment remains a service-role/database-owner operation.
alter table public.user_roles enable row level security;
revoke all on table public.user_roles from anon;

do $$
declare
  policy_row record;
begin
  for policy_row in
    select policyname
    from pg_policies
    where schemaname = 'public' and tablename = 'user_roles'
  loop
    execute format('drop policy if exists %I on public.user_roles', policy_row.policyname);
  end loop;
end
$$;

create policy "Users can read their own role"
  on public.user_roles
  for select
  to authenticated
  using (user_id = auth.uid());

commit;

-- Verification expectations after commit:
-- 1. anon key: zero readable rows / permission denied for all protected tables.
-- 2. authenticated client without reviewer/admin role: zero readable rows.
-- 3. reviewer/admin JWT: Wiki and Mission Control reads succeed.
-- 4. service role: full access remains available (service role bypasses RLS).
