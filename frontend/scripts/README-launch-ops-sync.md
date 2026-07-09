# Launch Ops canonical → live Supabase sync

Use this when Mission Control/Dashboard live task rows drift from the canonical launch seed in `src/services/launchOpsCanonicalSeed.js`.

## Why this exists

The dashboard merges live Supabase rows with the canonical seed. Authenticated users can see `launch_tasks_v2`, but anon/public checks may see zero rows because RLS protects the table. That means source updates can deploy correctly while the authenticated dashboard still shows stale live rows unless the canonical seed is explicitly synced into Supabase.

## Required secrets

Do **not** commit secrets. Pass them through your shell or CI secret manager:

```bash
export SUPABASE_URL="https://<project>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
```

`SUPABASE_SERVICE_ROLE_KEY` can also be supplied as `SUPABASE_SERVICE_KEY`.

## Dry run

Shows what would sync without writing:

```bash
DRY_RUN=1 npm run launch:sync
```

Expected current plan:

```txt
5 milestones
145 tasks
84 collaborators
58 dependencies
```

## Apply sync

```bash
npm run launch:sync
```

This upserts:

- `launch_milestones` by `slug`
- `launch_tasks_v2` by `task_key`
- canonical `launch_task_collaborators`
- canonical `launch_task_dependencies`

For collaborators/dependencies, the script removes existing rows for canonical task IDs first, then reinserts the canonical set. It does not delete extra live-only tasks.

## Verify only

```bash
npm run launch:verify
```

The report checks:

- live canonical task count matches the source seed
- `M1-WIKI-01` through `M1-WIKI-07` are `done`
- `M1-WIKI-08` is `this_week`
- live task status summaries
- extra live-only task count, if any

## Current expected Wiki state

```txt
M1-WIKI-01 through M1-WIKI-07 — done
M1-WIKI-08 — this_week
M1-WIKI-09 through M1-WIKI-12 — ready
M1-WIKI-13 through M1-WIKI-14 — locked
```

## Safety notes

- This script intentionally does not load `.env` files or store credentials.
- Run from `frontend/`.
- Use service-role credentials only in a trusted shell/CI context.
- If the dashboard still shows stale totals after a successful sync, refresh the authenticated session and inspect whether live-only tasks are inflating the overall count.
