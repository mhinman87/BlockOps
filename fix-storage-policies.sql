-- ============================================
-- Block Ops — Fix Storage Write Permissions
-- Run this in Supabase → SQL Editor
-- ============================================

-- Step 1: Check existing policies (review output before continuing)
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'objects';

-- Step 2: Drop any existing restrictive policies on storage.objects
-- (Uncomment these if Step 1 shows policies that conflict)
-- DROP POLICY IF EXISTS "Team can upload to team folder" ON storage.objects;
-- DROP POLICY IF EXISTS "Team can update team files" ON storage.objects;
-- DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
-- DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;

-- Step 3: Create new policies that allow team members to write anywhere in deliverables

CREATE POLICY "Team can upload to deliverables"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'deliverables'
  AND EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'reviewer')
  )
);

CREATE POLICY "Team can update deliverables"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'deliverables'
  AND EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'reviewer')
  )
);

CREATE POLICY "Team can delete from deliverables"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'deliverables'
  AND EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'reviewer')
  )
);
