-- ============================================
-- Block Ops — Content Object Metadata Setup
-- Phase 1 additive schema
-- This coexists with deliverable_status during migration
-- ============================================

-- 1. Canonical content objects
create table if not exists content_objects (
  object_id text primary key,
  title text not null,
  slug text not null unique,
  object_type text not null,
  package text not null,
  owner text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Representations of those objects
create table if not exists content_representations (
  id uuid default gen_random_uuid() primary key,
  object_id text not null references content_objects(object_id) on delete cascade,
  representation_type text not null check (representation_type in ('human_document', 'agent_document', 'site_render', 'attachment', 'reference')),
  knowledge_layer text not null check (knowledge_layer in ('layer1_human', 'layer2_agent', 'layer3_site')),
  audience text not null check (audience in ('internal', 'client', 'mixed')),
  workspace_visibility text not null check (workspace_visibility in ('internal_only', 'client_visible', 'hidden', 'archived')),
  review_status text not null default 'draft' check (review_status in ('draft', 'under_review', 'approved', 'needs_revision', 'archived')),
  scope_type text not null check (scope_type in ('global_standard', 'site_configuration', 'exception')),
  site_id text,
  agent_facing boolean not null default false,
  version text,
  source_path text not null unique,
  storage_path text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(object_id, representation_type, knowledge_layer, source_path)
);

-- 3. Helpful indexes
create index if not exists content_objects_package_idx on content_objects(package);
create index if not exists content_objects_type_idx on content_objects(object_type);
create index if not exists content_representations_object_idx on content_representations(object_id);
create index if not exists content_representations_visibility_idx on content_representations(workspace_visibility);
create index if not exists content_representations_status_idx on content_representations(review_status);
create index if not exists content_representations_scope_idx on content_representations(scope_type, site_id);
create index if not exists content_representations_storage_idx on content_representations(storage_path);

-- 4. Enable RLS
alter table content_objects enable row level security;
alter table content_representations enable row level security;

-- 5. Read policies
create policy "Authenticated users can read content objects"
  on content_objects for select
  to authenticated
  using (true);

create policy "Authenticated users can read content representations"
  on content_representations for select
  to authenticated
  using (true);

-- 6. Team write policies
create policy "Team can insert content objects"
  on content_objects for insert
  to authenticated
  with check (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('reviewer', 'admin')
    )
  );

create policy "Team can update content objects"
  on content_objects for update
  to authenticated
  using (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('reviewer', 'admin')
    )
  );

create policy "Team can insert content representations"
  on content_representations for insert
  to authenticated
  with check (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('reviewer', 'admin')
    )
  );

create policy "Team can update content representations"
  on content_representations for update
  to authenticated
  using (
    exists (
      select 1 from user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role in ('reviewer', 'admin')
    )
  );

create policy "Team can delete content representations"
  on content_representations for delete
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
-- - Keep deliverable_status in place for now
-- - Next step is seeding a pilot inventory
-- - Start with Foundation deliverables + current agent-knowledge files
-- ============================================
