# Block Ops DB Upgrade Plan

## What is true right now

I directly checked the live Supabase project at `msnwupckhoomeiqxfbts.supabase.co` and applied the additive schema + seed updates.

### Present in live DB
- `sites`
- `content_objects`
- `content_representations`
- `launch_milestones`
- `launch_tasks`
- `launch_tasks_v2`
- `weekly_agendas`
- older app tables like `BusinessProfile`, `Lead`, `Conversation`

### Current live state
- The new site-aware schema is present.
- The launch ops milestone/task graph is present.
- The pilot site `asc-demo` exists.
- The foundation content catalog is seeded.

## Plain-English conclusion

The upgrade has been applied successfully.
The remaining work is now app-level deployment/verification and any follow-on content or workflow polish.

---

## Correct apply order

Already completed in the live DB:
1. `content-objects-setup.sql`
2. `sites-setup.sql`
3. `content-objects-seed-pilot.sql`
4. `sites-seed-pilot.sql`

Optional later:
5. `content-objects-site-template.sql`
   - template only for site-specific overlays / exceptions
   - do not run as-is unless intentionally creating site-specific rows

Already present / not part of this upgrade:
- `supabase-setup.sql` → already partially applied in live DB
- `launch-tasks-setup.sql` → already applied
- `embeddings-setup.sql` → already applied
- `fix-storage-policies.sql` → only if deliverables bucket writes are failing

---

## Why this order

- `content_representations` depends on `content_objects`
- site-aware app code depends on both metadata tables and the `sites` table
- pilot seed files depend on those tables already existing

---

## Expected outcome after upgrade

After running the upgrade:
- live DB will have `sites`
- live DB will have `content_objects`
- live DB will have `content_representations`
- the app’s site-aware pages will have the schema they expect
- the pilot site `asc-demo` will exist

---

## Important caution

This upgrade is additive, not a destructive replacement.
It should coexist with the older `deliverable_status` table during migration.

That said, SQL changes affect the live database, so they should be executed carefully and in order.
