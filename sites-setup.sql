-- ============================================
-- Block Ops — Sites Table Setup
-- First real site object for client-specific implementations
-- ============================================

create table if not exists sites (
  site_id text primary key,
  site_name text not null,
  client_account_name text not null,
  status text not null check (status in ('prospect', 'onboarding', 'active', 'paused', 'offboarded')),
  launch_phase text not null check (launch_phase in ('prelaunch', 'prep', 'onsite', 'golive', 'support', 'renewal')),
  primary_champion_name text,
  primary_champion_role text,
  lead_nurse_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists sites_status_idx on sites(status);
create index if not exists sites_launch_phase_idx on sites(launch_phase);
create index if not exists sites_client_account_name_idx on sites(client_account_name);

alter table sites enable row level security;

create policy "Authenticated users can read sites"
  on sites for select
  to authenticated
  using (true);

create policy "Team can insert sites"
  on sites for insert
  to authenticated
  with check (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('reviewer', 'admin')
    )
  );

create policy "Team can update sites"
  on sites for update
  to authenticated
  using (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('reviewer', 'admin')
    )
  );

create policy "Team can delete sites"
  on sites for delete
  to authenticated
  using (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('reviewer', 'admin')
    )
  );

-- ============================================
-- Notes
-- - This table stores site identity and implementation context only
-- - Detailed content stays in content_representations via site_id + scope_type
-- - Next step: seed one example site and connect site-specific representations
-- ============================================
