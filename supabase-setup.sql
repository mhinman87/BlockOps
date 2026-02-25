-- ============================================
-- Block Ops — Supabase Database Setup
-- Run this in Supabase → SQL Editor (all at once)
-- ============================================

-- 1. Deliverable status tracking
CREATE TABLE deliverable_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  storage_path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'needs_revision')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  revision_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. User roles (reviewer = Samir, admin = Max/Adrian, client = customers)
CREATE TABLE user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'reviewer', 'client')),
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE deliverable_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — deliverable_status
CREATE POLICY "Authenticated users can read deliverable status"
  ON deliverable_status FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reviewers can update deliverable status"
  ON deliverable_status FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('reviewer', 'admin')
    )
  );

CREATE POLICY "Admin and reviewers can insert deliverable status"
  ON deliverable_status FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('reviewer', 'admin')
    )
  );

-- 5. RLS Policies — user_roles
CREATE POLICY "Users can read roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (true);

-- 6. Seed the LAST Protocol Suite as first deliverable
INSERT INTO deliverable_status (storage_path, title, status)
VALUES ('foundation/LAST_Protocol_Suite.md', 'LAST Protocol Suite', 'draft');

-- ============================================
-- STOP HERE — Run everything above first.
-- Then do step 7 below after looking up user IDs.
-- ============================================

-- 7. Assign team roles
-- Go to Supabase → Authentication → Users
-- Find the UUID for each team member and replace below

-- INSERT INTO user_roles (user_id, role, display_name) VALUES
--   ('REPLACE_WITH_SAMIR_UUID', 'reviewer', 'Dr. Samir Bhakta'),
--   ('REPLACE_WITH_MAX_UUID', 'admin', 'Max Hinman'),
--   ('REPLACE_WITH_ADRIAN_UUID', 'admin', 'Adrian');
