-- Block Ops: Adaptive Launch Ops Seed v1
-- Run this after launch-milestones-setup.sql and launch-tasks-v2-setup.sql

begin;

insert into launch_milestones (slug, title, description, status, owner, sort_order, readiness_score, gate_notes)
values
  ('m1-mock-run-build-ready', 'Fake client through all the way', 'Complete when a fake client can move end-to-end through the full system without the flow breaking.', 'in_progress', 'Max', 1, 20, 'Milestone 1.'),
  ('m2-mock-run-complete', 'Client all the way through with finalized deliverables and quality testing', 'Complete when the client run is clean, the deliverables are finalized, and quality testing is done.', 'locked', 'Max', 2, 0, 'Milestone 2.'),
  ('m3-trusted-anesthesiologist-validation', 'Passed the attendings tests', 'Complete when attendings have pressure-tested the system and the biggest issues from that review are closed.', 'locked', 'Samir', 3, 0, 'Milestone 3.'),
  ('m4-validation-closed', 'Passed the attendings tests', 'Complete when the attending feedback loop is closed and the system is ready to move forward.', 'locked', 'Samir', 4, 0, 'Milestone 3.'),
  ('m5-founding-partner-ready', 'Successfully completed founding partners', 'Complete when the founding partner motion is in place, signed, and live enough to count as finished.', 'locked', 'Adrian', 5, 0, 'Milestone 4.'),
  ('m6-first-founding-partner-signed', 'Successfully completed founding partners', 'Complete when the first founding partner agreement is in place and active.', 'locked', 'Adrian', 6, 0, 'Milestone 4.'),
  ('m7-first-founding-partner-live', 'Successfully completed founding partners', 'Complete when the first founding partner is onboarded and live.', 'locked', 'Samir', 7, 0, 'Milestone 4.'),
  ('m8-additional-founding-partners', 'Successfully completed founding partners', 'Complete when the founding partner motion is stable enough to support additional partners.', 'locked', 'Adrian', 8, 0, 'Milestone 4.'),
  ('m9-paid-client-readiness', 'Successfully completed first paid client', 'Complete when the team is stable and ready to take on the first paid client.', 'locked', 'Max', 9, 0, 'Milestone 5.'),
  ('m10-first-paid-client', 'Successfully completed first paid client', 'Complete when the first paid client is signed, onboarded, and actively being delivered.', 'locked', 'Adrian', 10, 0, 'Milestone 5.')
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
    ('S1', 'Define minimum quality standards for fake-client readiness', 'Decide which clinical and workflow standards the system must meet before we can honestly run a fake client through it.', 'Samir', 'this_week', 'critical', 'Clinical Standard & Quality', 'm1-mock-run-build-ready', false, false, false, 10),
    ('S2', 'Identify remaining gaps before fake-client readiness', 'Convert the readiness standard into a concrete list of unfinished or underdeveloped pieces that still need to be completed before M1.', 'Samir', 'ready', 'critical', 'Clinical Standard & Quality', 'm1-mock-run-build-ready', false, false, false, 20),
    ('S3', 'Create mock-client clinical walkthrough expectations', 'Define what the clinical side of the fake onboarding/live run should demonstrate to count as believable and useful.', 'Samir', 'locked', 'high', 'Mock Client / Demo Flow', 'm1-mock-run-build-ready', false, false, false, 30),
    ('S4', 'Define trusted anesthesiologist validation targets', 'Identify the first 2-3 anesthesiologists Samir wants to use for the hole-poking validation round.', 'Samir', 'ready', 'high', 'Clinical Validation Round', 'm3-trusted-anesthesiologist-validation', false, false, false, 40),
    ('S5', 'Define validation-round hole-poking prompts', 'Define exactly what external reviewers should pressure-test: protocols, training logic, agent behavior, onboarding flow, practical use, etc.', 'Samir', 'locked', 'high', 'Clinical Validation Round', 'm3-trusted-anesthesiologist-validation', false, false, false, 50),
    ('S6', 'Review legal/clinical boundary package against launch gates', 'Confirm what legal/clinical boundary items are mandatory before a real founding partner can sign and launch.', 'Samir', 'ready', 'high', 'Legal & Compliance', 'm5-founding-partner-ready', true, true, false, 60),

    ('X1', 'Translate launch graph into structured milestone/task schema proposal', 'Convert the adaptive operating system spec into the concrete data model needed for dashboard/Supabase implementation.', 'Max', 'this_week', 'critical', 'Operating System / Execution Management', 'm1-mock-run-build-ready', false, false, false, 70),
    ('X2', 'Define what system surfaces are required for a full fake-client run', 'Identify which product/system pieces must exist to simulate qualification, onboarding, configuration, training, launch, and live use for a fake client.', 'Max', 'this_week', 'critical', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, false, 80),
    ('X3', 'Build M1 readiness checklist', 'Create the operational checklist that determines when Block Ops is actually ready to run the internal mock client.', 'Max', 'ready', 'critical', 'Operating System / Execution Management', 'm1-mock-run-build-ready', false, false, false, 90),
    ('X4', 'Draft the fake-client end-to-end system flow', 'Define the exact fake-client sequence from lead to qualification to proposal to onboarding to prep to training to go-live to support.', 'Max', 'locked', 'high', 'Mock Client / Demo Flow', 'm2-mock-run-complete', false, false, false, 100),
    ('X5', 'Design dashboard migration path from launch_tasks to adaptive operating system', 'Decide whether to extend existing launch_tasks or create new milestone/task/dependency tables and UI views.', 'Max', 'ready', 'high', 'Operating System / Execution Management', 'm1-mock-run-build-ready', false, false, false, 110),
    ('X6', 'Define agent/legal gating requirements for mock run vs real launch', 'Separate what is required for internal mock testing from what is required before a real founding partner uses the system live.', 'Max', 'ready', 'high', 'Legal & Compliance', 'm5-founding-partner-ready', true, true, false, 120),
    ('X7', 'Define PHI / agent safety gating tasks for founding partner readiness', 'Convert known AI/PHI/legal concerns into explicit gating tasks instead of vague future worries.', 'Max', 'ready', 'high', 'Legal & Compliance', 'm5-founding-partner-ready', true, true, false, 130),
    ('X8', 'Build validation session support pack', 'Create the structure used during expert hole-poking: walkthrough materials, note capture, issue log, synthesis template.', 'Max', 'locked', 'medium', 'Clinical Validation Round', 'm3-trusted-anesthesiologist-validation', false, false, false, 140),
    ('X9', 'Define first proof/data capture loop for mock and founding partner phases', 'Define what usage/outcome/process data is captured during fake-client testing and founding partner launch.', 'Max', 'ready', 'medium', 'Proof / Data / Reporting', 'm5-founding-partner-ready', false, false, false, 150),
    ('X10', 'Prototype live adaptive task board implementation plan', 'Turn the schema and migration plan into a concrete build sequence for the dashboard operating system.', 'Max', 'locked', 'high', 'Operating System / Execution Management', 'm1-mock-run-build-ready', false, false, false, 160),

    ('A1', 'Define fake-client commercial journey', 'Define how the fake client should move through outreach, qualification, proposal receipt, decision, onboarding, and relationship handling.', 'Adrian', 'this_week', 'critical', 'Mock Client / Demo Flow', 'm1-mock-run-build-ready', false, false, false, 170),
    ('A2', 'Refine founding partner ideal profile v1', 'Tighten the definition of who qualifies as a founding partner and what makes someone a high-fit early adopter.', 'Adrian', 'ready', 'high', 'Founding Partner Motion', 'm5-founding-partner-ready', false, false, false, 180),
    ('A3', 'Define mock-client onboarding narrative and handoff experience', 'Shape the human/business experience of the fake onboarding flow so it feels like a real client, not just an internal process test.', 'Adrian', 'ready', 'high', 'Mock Client / Demo Flow', 'm2-mock-run-complete', false, false, false, 190),
    ('A4', 'Build trusted-reviewer outreach approach', 'Define how Samir''s trusted anesthesiologist contacts should be approached and framed for the hole-poking validation round.', 'Adrian', 'ready', 'medium', 'Clinical Validation Round', 'm3-trusted-anesthesiologist-validation', false, false, false, 200),
    ('A5', 'Define founding partner commercial offer shape', 'Outline the practical terms, expectations, and positioning for the first founding partner relationship.', 'Adrian', 'locked', 'high', 'Founding Partner Motion', 'm5-founding-partner-ready', false, false, false, 210),
    ('A6', 'Identify commercial asset gaps for M5 readiness', 'Identify what one-pagers, proposal assets, visual aids, and buyer-facing materials are still missing before real founding partner selling.', 'Adrian', 'ready', 'medium', 'Founding Partner Motion', 'm5-founding-partner-ready', false, false, false, 220),

    ('O1', 'Define exact success criteria for M1', 'Agree on what must be true before the team can honestly say Block Ops is ready for a full internal mock run.', 'Max', 'this_week', 'critical', 'Operating System / Execution Management', 'm1-mock-run-build-ready', false, false, false, 230),
    ('O2', 'Define exact success criteria for M2', 'Agree on what counts as a clean mock-client run rather than just we sort of got through it.', 'Max', 'ready', 'high', 'Operating System / Execution Management', 'm2-mock-run-complete', false, false, false, 240),
    ('O3', 'Build legal/compliance gate list for M5', 'Convert legal/admin/risk items into a real gate list for founding partner readiness.', 'Samir', 'ready', 'critical', 'Legal & Compliance', 'm5-founding-partner-ready', true, true, false, 250),
    ('O4', 'Define issue capture + patch loop for validation phases', 'Decide how holes found in mock runs and anesthesiologist reviews are captured, prioritized, and patched.', 'Max', 'locked', 'medium', 'Clinical Validation Round', 'm3-trusted-anesthesiologist-validation', false, false, false, 260),
    ('O5', 'Create live weekly agenda cadence', 'Maintain the working agenda and adapt focus based on completed work and newly discovered constraints.', 'Bloq', 'in_progress', 'high', 'Operating System / Execution Management', 'm1-mock-run-build-ready', false, false, false, 270)
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
  '1. Finish the system enough to run a fake client end-to-end.\n2. Build the task/milestone operating system so launch execution becomes visible and manageable.\n3. Continue legal/compliance groundwork so founding partner readiness is not blocked later.',
  '- identify the minimum readiness standard needed to run the fake client\n- define clinical must-haves for a believable fake onboarding/live run\n- outline trusted anesthesiologist validation targets and what they should be asked to poke at\n- continue legal/clinical boundary framing where needed',
  '- define and build the adaptive operating system structure\n- plan migration from simple launch_tasks to milestone/dependency-aware execution system\n- identify what product/system pieces are still missing for the fake-client run and its benchmarks\n- keep platform architecture aligned to internal mock run needs first',
  '- define the ideal mock-client commercial path from initial interest through onboarding\n- refine the future founding partner path so it can be tested in the mock run\n- start shaping how expert validation sessions should be framed from a buyer/relationship perspective\n- continue organizing commercial assets needed downstream',
  '- define what mock client complete means\n- define what founding partner ready means\n- define legal/compliance items required before real founding partner signing\n- decide how expert feedback will be captured and turned into changes',
  '- true dashboard intelligence layer is blocked on schema/UI upgrade\n- founding partner tasks remain structurally downstream of mock run and validation round\n- paid client tasks remain downstream of founding partner proof',
  '- exact success criteria for M1 and M2\n- what quality standards the fake-client run must meet\n- what legal package is truly mandatory before M6\n- whether the upgraded task system should extend launch_tasks or move to a new milestone/task schema',
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
