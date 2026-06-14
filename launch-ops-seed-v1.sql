-- Block Ops: Adaptive Launch Ops Seed v1
-- Run this after launch-milestones-setup.sql and launch-tasks-v2-setup.sql

begin;

insert into launch_milestones (slug, title, description, status, owner, sort_order, readiness_score, gate_notes)
values
  ('m1-mock-run-build-ready', 'Mock Client Lead-to-Live Run', 'Run a mock client from first contact all the way to live without the system breaking.', 'in_progress', 'Max', 1, 20, 'M1 — the system can carry a client end to end.'),
  ('m2-mock-run-complete', 'Foundational Client Ready', 'A foundational client setup is complete, clean, and something we can stand behind.', 'locked', 'Max', 2, 0, 'M2 — the foundational run is clean and final.'),
  ('m3-trusted-anesthesiologist-validation', 'Externally Trusted Validation Ready', 'Trusted outside experts have pressure-tested the system and signed off on what matters.', 'locked', 'Samir', 3, 0, 'M3 — external validation is set up and ready to run.'),
  ('m4-validation-closed', 'Validation Round Closed / Holes Patched', 'The validation round is finished and the gaps it exposed have been patched.', 'locked', 'Samir', 4, 0, 'M4 — validation feedback is closed out.'),
  ('m5-founding-partner-ready', 'Founding Partner Ready', 'Everything required to bring on a founding partner is in place.', 'locked', 'Adrian', 5, 0, 'M5 — we can confidently sign a founding partner.'),
  ('m6-first-founding-partner-signed', 'First Founding Partner Signed', 'The first founding partner has signed.', 'locked', 'Adrian', 6, 0, 'M6 — first founding partner committed.'),
  ('m7-first-founding-partner-live', 'First Founding Partner Live', 'The first founding partner is live and running on the system.', 'locked', 'Samir', 7, 0, 'M7 — first founding partner is live.'),
  ('m8-additional-founding-partners', 'Additional Founding Partners', 'Additional founding partners are onboarded and live.', 'locked', 'Adrian', 8, 0, 'M8 — the founding partner motion repeats.'),
  ('m9-paid-client-readiness', 'Paid Client Ready', 'Everything required to take on a paying client is ready.', 'locked', 'Max', 9, 0, 'M9 — we can confidently sign a paid client.'),
  ('m10-first-paid-client', 'First Paid Client', 'The first paid client is signed, onboarded, and in delivery.', 'locked', 'Adrian', 10, 0, 'M10 — first paid client is in delivery.')
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  status = excluded.status,
  owner = excluded.owner,
  sort_order = excluded.sort_order,
  readiness_score = excluded.readiness_score,
  gate_notes = excluded.gate_notes,
  updated_at = now();

insert into launch_milestone_dependencies (milestone_id, depends_on_milestone_id)
select child.id, parent.id
from launch_milestones child
join launch_milestones parent on (
  (child.slug = 'm2-mock-run-complete' and parent.slug = 'm1-mock-run-build-ready') or
  (child.slug = 'm3-trusted-anesthesiologist-validation' and parent.slug = 'm2-mock-run-complete') or
  (child.slug = 'm4-validation-closed' and parent.slug = 'm3-trusted-anesthesiologist-validation') or
  (child.slug = 'm5-founding-partner-ready' and parent.slug = 'm4-validation-closed') or
  (child.slug = 'm6-first-founding-partner-signed' and parent.slug = 'm5-founding-partner-ready') or
  (child.slug = 'm7-first-founding-partner-live' and parent.slug = 'm6-first-founding-partner-signed') or
  (child.slug = 'm8-additional-founding-partners' and parent.slug = 'm7-first-founding-partner-live') or
  (child.slug = 'm9-paid-client-readiness' and parent.slug = 'm7-first-founding-partner-live') or
  (child.slug = 'm9-paid-client-readiness' and parent.slug = 'm8-additional-founding-partners') or
  (child.slug = 'm10-first-paid-client' and parent.slug = 'm9-paid-client-readiness')
)
on conflict do nothing;

with milestone_lookup as (
  select slug, id from launch_milestones
), task_rows as (
  select * from (values
    ('S1', 'Set the M1 bar', 'Agree on what must be true before we can run the mock client end to end.', 'Samir', 'this_week', 'critical', 'Clinical Standard & Validation', 'm1-mock-run-build-ready', false, false, false, 10),
    ('S2', 'List the missing pieces', 'Turn the M1 bar into a short list of things still missing.', 'Samir', 'ready', 'high', 'Clinical Standard & Validation', 'm1-mock-run-build-ready', false, false, false, 20),
    ('S3', 'Plan the client walkthrough', 'Write the simple steps the mock client should follow.', 'Samir', 'locked', 'high', 'Clinical Standard & Validation', 'm1-mock-run-build-ready', false, false, false, 30),
    ('S4', 'Pick the reviewer list', 'Choose the first attendings to pressure-test the system.', 'Samir', 'ready', 'high', 'Clinical Standard & Validation', 'm3-trusted-anesthesiologist-validation', false, false, false, 40),
    ('S5', 'Write the review questions', 'List the questions the reviewers should answer.', 'Samir', 'locked', 'high', 'Clinical Standard & Validation', 'm3-trusted-anesthesiologist-validation', false, false, false, 50),
    ('S6', 'Check the legal gates', 'Confirm which legal and safety items are required before a founding partner can sign.', 'Samir', 'ready', 'high', 'Clinical Standard & Validation', 'm5-founding-partner-ready', true, true, false, 60),
    ('X1', 'Map the launch data model', 'Turn the launch plan into the data structure the dashboard needs.', 'Max', 'this_week', 'critical', 'Product & System Build', 'm1-mock-run-build-ready', false, false, false, 70),
    ('X2', 'List the screens we need', 'Decide which screens must exist for the mock-client flow.', 'Max', 'this_week', 'critical', 'Product & System Build', 'm1-mock-run-build-ready', false, false, false, 80),
    ('X3', 'Build the M1 checklist', 'Write the checklist that tells us when M1 is truly ready.', 'Max', 'ready', 'critical', 'Product & System Build', 'm1-mock-run-build-ready', false, false, false, 90),
    ('X4', 'Run the mock client', 'Walk a mock client through the full flow and note any break points.', 'Max', 'this_week', 'critical', 'Product & System Build', 'm2-mock-run-complete', false, false, false, 100),
    ('X5', 'Plan the board upgrade', 'Decide how the task board should store milestones, owners, and links.', 'Max', 'ready', 'high', 'Product & System Build', 'm1-mock-run-build-ready', false, false, false, 110),
    ('X6', 'Separate mock and live rules', 'Write what is allowed in the mock run versus a real launch.', 'Max', 'ready', 'high', 'Product & System Build', 'm5-founding-partner-ready', false, false, false, 120),
    ('X7', 'Set the safety gate list', 'Turn safety and privacy concerns into a clear go or no-go list.', 'Max', 'ready', 'high', 'Product & System Build', 'm5-founding-partner-ready', true, true, false, 130),
    ('X8', 'Prepare the review pack', 'Gather the notes, template, and issue log for reviewer sessions.', 'Max', 'locked', 'medium', 'Product & System Build', 'm3-trusted-anesthesiologist-validation', false, false, false, 140),
    ('X9', 'Set the proof tracker', 'Decide what usage and outcome data we should keep.', 'Max', 'ready', 'medium', 'Product & System Build', 'm9-paid-client-readiness', false, false, false, 150),
    ('X10', 'Plan the live task board', 'Turn the new schema into a simple build order.', 'Max', 'locked', 'high', 'Product & System Build', 'm1-mock-run-build-ready', false, false, false, 160),
    ('A1', 'Map the client journey', 'Write the path from first contact to onboarding in plain terms.', 'Adrian', 'this_week', 'critical', 'Commercial & Partnerships', 'm1-mock-run-build-ready', false, false, false, 170),
    ('A2', 'Define the founding partner fit', 'Decide who is a good early partner and who is not.', 'Adrian', 'ready', 'high', 'Commercial & Partnerships', 'm5-founding-partner-ready', false, false, false, 180),
    ('A3', 'Polish the onboarding handoff', 'Make the mock onboarding feel like a real client handoff.', 'Adrian', 'ready', 'high', 'Commercial & Partnerships', 'm2-mock-run-complete', false, false, false, 190),
    ('A4', 'Set the reviewer outreach', 'Decide how to invite the attending reviewers.', 'Adrian', 'ready', 'medium', 'Commercial & Partnerships', 'm3-trusted-anesthesiologist-validation', false, false, false, 200),
    ('A5', 'Draft the partner offer', 'Write the simple terms for the first partner relationship.', 'Adrian', 'locked', 'high', 'Commercial & Partnerships', 'm5-founding-partner-ready', false, false, false, 210),
    ('A6', 'Fill the sales gaps', 'List the one-pagers, visuals, and buyer materials still missing.', 'Adrian', 'ready', 'medium', 'Commercial & Partnerships', 'm5-founding-partner-ready', false, false, false, 220),
    ('O1', 'Set the M1 go or no-go', 'Agree on the exact line between not ready and ready for a mock client.', 'Samir', 'ready', 'critical', 'Operating Cadence & Gates', 'm1-mock-run-build-ready', false, false, false, 230),
    ('O2', 'Set the M2 finish line', 'Define what a clean foundational client run has to include.', 'Samir', 'ready', 'high', 'Operating Cadence & Gates', 'm2-mock-run-complete', false, false, false, 240),
    ('O3', 'List the founding partner gates', 'Turn legal and risk items into a clear sign-off list.', 'Samir', 'ready', 'critical', 'Operating Cadence & Gates', 'm9-paid-client-readiness', true, true, false, 250),
    ('O4', 'Capture review fixes', 'Write how feedback becomes updates after the review sessions.', 'Samir', 'locked', 'medium', 'Operating Cadence & Gates', 'm3-trusted-anesthesiologist-validation', false, false, false, 260),
    ('O5', 'Keep the weekly agenda current', 'Update the plan each week so the team sees what changed.', 'Bloq', 'in_progress', 'high', 'Operating Cadence & Gates', 'm1-mock-run-build-ready', false, false, false, 270),
    ('M1A', 'Clean up the board view', 'Make the board easier to scan at a glance.', 'Bloq', 'ready', 'medium', 'Board Operations', 'm1-mock-run-build-ready', false, false, false, 280),
    ('M2A', 'Fix the run notes', 'Write the clean notes from the foundational client run.', 'Bloq', 'locked', 'medium', 'Board Operations', 'm2-mock-run-complete', false, false, false, 290),
    ('M3A', 'Write the follow-up summary', 'Turn reviewer feedback into a short next-step list.', 'Bloq', 'ready', 'medium', 'Board Operations', 'm3-trusted-anesthesiologist-validation', false, false, false, 300),
    ('M4A', 'Prepare the partner one-pager', 'Build a simple sheet that explains the partner offer.', 'Bloq', 'locked', 'medium', 'Board Operations', 'm5-founding-partner-ready', false, false, false, 310),
    ('M5A', 'Set the client update rhythm', 'Decide when and how the client gets updates.', 'Bloq', 'ready', 'medium', 'Board Operations', 'm9-paid-client-readiness', false, false, false, 320)
  ) as t(task_key, title, description, primary_owner, status, priority, workstream, milestone_slug, compliance_flag, legal_gate_flag, changed_by_new_info, sort_order)
)
insert into launch_tasks_v2 (task_key, title, description, primary_owner, status, priority, workstream, milestone_id, compliance_flag, legal_gate_flag, changed_by_new_info, sort_order)
select
  tr.task_key,
  tr.title,
  tr.description,
  tr.primary_owner,
  tr.status,
  tr.priority,
  tr.workstream,
  ml.id,
  tr.compliance_flag,
  tr.legal_gate_flag,
  tr.changed_by_new_info,
  tr.sort_order
from task_rows tr
join milestone_lookup ml on ml.slug = tr.milestone_slug
on conflict (task_key) do update set
  title = excluded.title,
  description = excluded.description,
  primary_owner = excluded.primary_owner,
  status = excluded.status,
  priority = excluded.priority,
  workstream = excluded.workstream,
  milestone_id = excluded.milestone_id,
  compliance_flag = excluded.compliance_flag,
  legal_gate_flag = excluded.legal_gate_flag,
  changed_by_new_info = excluded.changed_by_new_info,
  sort_order = excluded.sort_order,
  updated_at = now();

with deps(task_key, depends_on_task_key, dependency_type) as (
  values
    ('S2', 'S1', 'finish_to_start'),
    ('S3', 'S2', 'finish_to_start'),
    ('S5', 'X8', 'finish_to_start'),
    ('X2', 'S1', 'finish_to_start'),
    ('X3', 'S2', 'finish_to_start'),
    ('X3', 'X2', 'finish_to_start'),
    ('X4', 'S3', 'finish_to_start'),
    ('X4', 'X2', 'finish_to_start'),
    ('X5', 'X1', 'finish_to_start'),
    ('X6', 'S6', 'gate'),
    ('X7', 'S6', 'gate'),
    ('X8', 'S4', 'finish_to_start'),
    ('X10', 'X5', 'finish_to_start'),
    ('A3', 'A1', 'finish_to_start'),
    ('A3', 'S3', 'finish_to_start'),
    ('A4', 'A2', 'finish_to_start'),
    ('A4', 'S4', 'finish_to_start'),
    ('A5', 'A2', 'finish_to_start'),
    ('A5', 'X6', 'gate'),
    ('O1', 'S1', 'finish_to_start'),
    ('O1', 'A1', 'finish_to_start'),
    ('O2', 'X4', 'finish_to_start'),
    ('O2', 'A3', 'finish_to_start'),
    ('O3', 'S6', 'gate'),
    ('O3', 'X6', 'gate'),
    ('O3', 'X7', 'gate'),
    ('O4', 'X8', 'finish_to_start')
)
insert into launch_task_dependencies (task_id, depends_on_task_id, dependency_type)
select task.id, dep.id, deps.dependency_type
from deps
join launch_tasks_v2 task on task.task_key = deps.task_key
join launch_tasks_v2 dep on dep.task_key = deps.depends_on_task_key
on conflict do nothing;

with collabs(task_key, collaborator) as (
  values
    ('S1', 'Max'),
    ('S2', 'Max'),
    ('S3', 'Adrian'),
    ('S4', 'Adrian'),
    ('S5', 'Adrian'),
    ('S5', 'Max'),
    ('S6', 'Max'),
    ('X1', 'Bloq'),
    ('X2', 'Samir'),
    ('X2', 'Adrian'),
    ('X3', 'Samir'),
    ('X3', 'Adrian'),
    ('X4', 'Samir'),
    ('X4', 'Adrian'),
    ('X5', 'Bloq'),
    ('X6', 'Samir'),
    ('X7', 'Samir'),
    ('X8', 'Samir'),
    ('X8', 'Adrian'),
    ('X9', 'Samir'),
    ('X9', 'Adrian'),
    ('X10', 'Bloq'),
    ('A1', 'Max'),
    ('A2', 'Samir'),
    ('A3', 'Samir'),
    ('A3', 'Max'),
    ('A4', 'Samir'),
    ('A5', 'Samir'),
    ('A5', 'Max'),
    ('A6', 'Max'),
    ('O1', 'Samir'),
    ('O1', 'Adrian'),
    ('O2', 'Samir'),
    ('O2', 'Adrian'),
    ('O3', 'Max'),
    ('O3', 'Adrian'),
    ('O4', 'Samir'),
    ('O4', 'Adrian'),
    ('O5', 'Samir'),
    ('O5', 'Max'),
    ('O5', 'Adrian')
)
insert into launch_task_collaborators (task_id, collaborator)
select task.id, collabs.collaborator
from collabs
join launch_tasks_v2 task on task.task_key = collabs.task_key
on conflict do nothing;

insert into weekly_agendas (
  week_of,
  north_star_note,
  current_milestone_slug,
  company_priorities,
  samir_focus,
  max_focus,
  adrian_focus,
  shared_items,
  blocked_items,
  decisions_needed,
  launch_risks
)
values (
  date '2026-06-01',
  'Block Ops is a standardized implementation system for building and sustaining high-performing regional anesthesia programs at the site level.',
  'm1-mock-run-build-ready',
  '1. Finish the system enough to run a mock client end-to-end.\n2. Build the task/milestone operating system so launch execution becomes visible and manageable.\n3. Continue legal/compliance groundwork so founding partner readiness is not blocked later.',
  '- identify the minimum readiness standard needed to run the mock client\n- define clinical must-haves for a believable mock onboarding/live run\n- outline trusted anesthesiologist validation targets and what they should be asked to poke at\n- continue legal/clinical boundary framing where needed',
  '- define and build the adaptive operating system structure\n- plan migration from simple launch_tasks to milestone/dependency-aware execution system\n- identify what product/system pieces are still missing for the foundational client run and its benchmarks\n- keep platform architecture aligned to internal mock run needs first',
  '- define the ideal mock-client commercial path from initial interest through onboarding\n- refine the future founding partner path so it can be tested in the mock run\n- start shaping how expert validation sessions should be framed from a buyer/relationship perspective\n- continue organizing commercial assets needed downstream',
  '- define what mock client complete means\n- define what founding partner ready means\n- define legal/compliance items required before real founding partner signing\n- decide how expert feedback will be captured and turned into changes',
  '- true dashboard intelligence layer is blocked on schema/UI upgrade\n- founding partner tasks remain structurally downstream of mock run and validation round\n- paid client tasks remain downstream of founding partner proof',
  '- exact success criteria for M1 and M2\n- what quality standards the foundational client run must meet\n- what legal package is truly mandatory before M6\n- whether the upgraded task system should extend launch_tasks or move to a new milestone/task schema',
  '- stale dashboard data causing false confidence\n- too much work happening without explicit dependency logic\n- legal items being treated as side tasks instead of launch gates\n- mock run attempted before the system is truly coherent'
)
on conflict (week_of) do update set
  north_star_note = excluded.north_star_note,
  current_milestone_slug = excluded.current_milestone_slug,
  company_priorities = excluded.company_priorities,
  samir_focus = excluded.samir_focus,
  max_focus = excluded.max_focus,
  adrian_focus = excluded.adrian_focus,
  shared_items = excluded.shared_items,
  blocked_items = excluded.blocked_items,
  decisions_needed = excluded.decisions_needed,
  launch_risks = excluded.launch_risks,
  updated_at = now();

commit;
