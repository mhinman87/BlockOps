-- Block Ops: Adaptive Launch Ops Seed v1
-- Run this after launch-milestones-setup.sql and launch-tasks-v2-setup.sql

begin;

insert into launch_milestones (slug, title, description, status, owner, sort_order, readiness_score, gate_notes)
values
  ('m1-mock-run-build-ready', 'Mock Client Lead-to-Live Run', 'M1 proves the full customer path by running a mock client from lead capture through CRM entry, follow-up, proposal, contract, go-live prep, and launch board organization.', 'in_progress', 'Max', 1, 20, 'M1 is the end-to-end mock client rehearsal: lead pipelines, CRM, workflows, and Mission Control organization all have to work together.'),
  ('m2-mock-run-complete', 'Foundational Client Ready', 'The team can responsibly accept a real foundational client with finalized deliverables, legal readiness, portal readiness, data intake solved, support readiness, and no major improvisation.', 'locked', 'Max', 2, 0, 'M2 is the real-client readiness gate: final deliverables, legal, portal, data, support, and operating cadence are all in place.'),
  ('m3-trusted-anesthesiologist-validation', 'External Validation Completed', 'Outside attending anesthesiologists have reviewed the system, the test is passed, and the validation loop is complete.', 'locked', 'Samir', 3, 0, 'M3 is the external validation gate: the attending review is complete and the system passed the test.'),
  ('m4-validation-closed', 'Foundational Client Completed Successfully', 'The first foundational client has been onboarded and delivered successfully with the core operating system proven in practice.', 'locked', 'Samir', 4, 0, 'M4 closes the foundational client loop and proves the system can run end to end.'),
  ('m5-founding-partner-ready', 'Paid Client Onboarded Successfully', 'A paid client has been onboarded successfully and the system is operating in real delivery.', 'locked', 'Adrian', 5, 0, 'M5 is the paid client onboarding gate: real delivery is now underway.')
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
  (child.slug = 'm5-founding-partner-ready' and parent.slug = 'm4-validation-closed')
)
on conflict do nothing;

with milestone_lookup as (
  select slug, id from launch_milestones
), task_rows as (
  select * from (values
    ('M1-03', 'Map the two lead pipelines', 'Document the AI chat lead path and Adrian''s network lead path from first touch to intake.', 'Adrian', 'ready', 'critical', 'Lead Capture', 'm1-mock-run-build-ready', false, false, false, 30),
    ('M1-04', 'Define high-level mock-client test paths', 'Confirm M1 will use at least two distinct mock-client paths: one website or AI-chat lead and one Adrian relationship lead. Detailed client data inputs are defined later near closeout.', 'Samir', 'done', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, false, 40),
    ('M1-05', 'Capture AI chat leads into the CRM', 'Make sure web chat inquiries land in the CRM with the right fields and ownership.', 'Max', 'done', 'critical', 'Lead Capture', 'm1-mock-run-build-ready', false, false, false, 50),
    ('M1-06', 'Capture Adrian network leads into the CRM', 'Make sure Adrian can enter referrals and network leads into the same CRM flow.', 'Adrian', 'done', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, false, 60),
    ('M1-07', 'Define the CRM record and stage model', 'Set the lead fields, statuses, ownership, notes, and pipeline stages needed for the mock client.', 'Max', 'done', 'critical', 'Lead Capture', 'm1-mock-run-build-ready', false, false, false, 70),
    ('M1-LC-06', 'Define lead source categories', 'Drafted in Obsidian Lead Capture page: website/contact page, AI chat, Adrian network, Samir network, referral, ASC directory/research dossier, conference/event, LinkedIn, phone line, manual entry, other. Needs Max/Samir review before live CRM lock.', 'Max', 'review', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, true, 75),
    ('M1-LC-07', 'Define minimum required lead fields', 'Drafted in Obsidian Lead Capture page: facility/contact, contact info, source, owner, current status, next action, next follow-up due date, and notes/context, with optional fit fields. Needs Max review for CRM schema.', 'Max', 'review', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, true, 76),
    ('M1-LC-08', 'Define duplicate lead rule', 'Drafted in Obsidian Lead Capture page: possible duplicates move to Needs Review and duplicate records should be preserved or linked instead of deleting context. Needs Max/Samir review for merge behavior.', 'Max', 'review', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, true, 77),
    ('M1-LC-09', 'Define lead handoff from capture to outreach', 'Drafted in Obsidian Lead Capture and Outreach Sequence pages: record exists, source known or inferred, owner assigned, first channel clear, next action/due date set, and duplicate/not-fit issues resolved or flagged. Needs Adrian review.', 'Adrian', 'review', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, true, 78),
    ('M1-LC-10', 'Test lead capture flow with mock entries', 'Run mock leads through each source path and confirm they land in the correct CRM/workflow bucket.', 'Bloq', 'done', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, false, 79),
    ('M1-LC-11', 'Confirm manual lead entry does not trigger automatic email', 'Verify Adrian manual lead entry captures the lead without sending the website auto-acknowledgment email; manual outreach should remain intentional.', 'Adrian', 'done', 'high', 'Lead Capture', 'm1-mock-run-build-ready', false, false, true, 80),
    ('M1-08', 'Prepare the sales materials package', 'Gather the brochures, one-pagers, decks, and info sheets the lead receives after capture.', 'Adrian', 'ready', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, false, 81),
    ('M1-09', 'Define the follow-up workflow and schedule', 'Adrian-approved M1 follow-up workflow: first touch Day 0–2, follow-up 1 after 3–4 business days, default no-response cadence through business day 10, and 7-business-day fast lane for warm/referral/high-intent leads. Remaining follow-up: materials by touchpoint and finer channel-use details.', 'Adrian', 'review', 'critical', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, true, 90),
    ('M1-OS-03', 'Define outreach start trigger', 'Drafted in Obsidian Outreach Sequence page: starts after Lead Capture creates/updates CRM record with source, owner, status, next action, first due date, and context; Needs Review blocks outreach until resolved.', 'Adrian', 'review', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, true, 91),
    ('M1-OS-04', 'Write first-touch email script', 'Create the first outbound email for a qualified captured lead.', 'Adrian', 'ready', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, false, 92),
    ('M1-OS-05', 'Write first-touch text script', 'Create the first text message for warm/network leads where texting is appropriate.', 'Adrian', 'ready', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, false, 93),
    ('M1-OS-06', 'Define follow-up 3–4 business-day touch', 'Adrian-approved baseline: if no response 3–4 business days after first touch, send follow-up by the best available channel and optionally call when phone exists and lead warmth/value justifies it.', 'Adrian', 'review', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, true, 94),
    ('M1-OS-07', 'Define final nudge timing', 'Adrian-approved baseline: default final nudge occurs around business day 7–8, or business day 5 for warm/referral/high-intent fast-lane leads; final close-loop is email-only by default.', 'Adrian', 'review', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, true, 95),
    ('M1-OS-08', 'Define Day 10 close-loop / nurture rule', 'Adrian-approved outreach cadence moves default no-response/stalled review to around business day 10, with a business day 7 fast lane. Samir still owns final not-fit, nurture, future-market, and close/no-response business rules.', 'Adrian', 'review', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, true, 96),
    ('M1-OS-09', 'Define call attempt rule', 'Adrian-approved channel baseline: website/contact/AI-chat leads are call-first when phone exists and email-first when no phone exists; Adrian/network leads use relationship judgment; referral/manual text-first is not default unless warm or permissioned.', 'Adrian', 'review', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, true, 97),
    ('M1-OS-10', 'Define interested-lead handoff', 'Drafted in Obsidian Qualification and Discovery page: positive outreach response can move to Initial Fit Call / Meeting Discovery Scheduled, then Discovery Completed, Proposal Needed, Nurture, Needs Review, or Not Fit. Needs Samir/Adrian validation.', 'Samir', 'review', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, true, 98),
    ('M1-OS-11', 'Define not-interested response handling', 'Clarify how to close or recycle a lead that responds negatively.', 'Adrian', 'ready', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, false, 99),
    ('M1-OS-12', 'Test outreach sequence with mock client', 'Run a mock lead through the full outreach sequence and verify each state shows correctly.', 'Bloq', 'ready', 'high', 'Outreach Sequence', 'm1-mock-run-build-ready', false, false, false, 100),
    ('M1-CL-01', 'Define communication logging threshold', 'Drafted in Obsidian Client Communication Log page: log every meaningful touch that affects relationship context, pipeline status, next action, materials sent, or follow-up. Needs Adrian/Samir review.', 'Adrian', 'review', 'high', 'Client Communication Log', 'm1-mock-run-build-ready', false, false, true, 110),
    ('M1-CL-02', 'Define communication log required fields', 'Drafted in Obsidian Client Communication Log page: lead/client, contact, facility, date/time, owner, channel, direction, source/context, summary, outcome, next step, follow-up due date, and materials sent. Needs Max review for schema.', 'Max', 'review', 'high', 'Client Communication Log', 'm1-mock-run-build-ready', false, false, true, 111),
    ('M1-CL-03', 'Connect communication entries to CRM stage movement', 'Drafted in Obsidian Client Communication Log page: first outreach moves Contact Needed to Contacted, positive reply moves toward discovery, no-response threshold moves to stalled, and meaningful outcomes create next steps. Needs Max/Samir review.', 'Max', 'review', 'high', 'Client Communication Log', 'm1-mock-run-build-ready', false, false, true, 112),
    ('M1-CL-04', 'Test communication log with both mock-client paths', 'Run website/AI-chat and Adrian/network mock leads through communication logging, verify history appears on the lead/client record, and confirm owner/next follow-up/status changes are visible.', 'Bloq', 'ready', 'high', 'Client Communication Log', 'm1-mock-run-build-ready', false, false, true, 113),
    ('M1-QD-01', 'Define Initial Fit Call question bank', 'Drafted in Obsidian Qualification and Discovery page: capture facility type, OR count, surgical mix, current block activity, champion candidate, surgeon buy-in, pain point, decision path, and timeline. Needs Adrian/Samir review.', 'Adrian', 'review', 'high', 'Qualification and Discovery', 'm1-mock-run-build-ready', false, false, true, 120),
    ('M1-QD-02', 'Define qualification scoring and disqualifiers', 'Drafted in Obsidian Qualification and Discovery page using the provisional 8-point rubric plus hard-stop rules: no champion, active surgeon hostility, expects clinical staffing, unsafe clinical concern, no authority path, or protocols-only ask. Needs Samir/Adrian review.', 'Samir', 'review', 'high', 'Qualification and Discovery', 'm1-mock-run-build-ready', false, false, true, 121),
    ('M1-QD-03', 'Define prospect brief requirements', 'Drafted in Obsidian Qualification and Discovery page: facility, surgical mix, current blocks, champion, decision path, pain points, qualification read, red/yellow flags, questions for Samir, and recommended next step. Needs Samir/Adrian review.', 'Adrian', 'review', 'high', 'Qualification and Discovery', 'm1-mock-run-build-ready', false, false, true, 122),
    ('M1-QD-04', 'Define Scope Assessment Call question banks', 'Drafted in Obsidian Qualification and Discovery page: pain/current-state, champion/clinical readiness, operational fit, decision authority, and timeline/urgency question banks. Needs Samir/Adrian review.', 'Samir', 'review', 'high', 'Qualification and Discovery', 'm1-mock-run-build-ready', false, false, true, 123),
    ('M1-QD-05', 'Test qualification and discovery with mock-client paths', 'Run website/AI-chat and Adrian/network mock leads through Initial Fit Call, qualification outcome, communication logging, CRM stage movement, and next-step creation.', 'Bloq', 'ready', 'high', 'Qualification and Discovery', 'm1-mock-run-build-ready', false, false, true, 124),
    ('M1-PW-01', 'Define proposal request requirements', 'Drafted in Obsidian Proposal Workflow page: facility, ORs, surgical mix, current block activity, champion, package, pain points, heatmap inputs, pricing tier, desired start date, and special concerns. Needs Adrian/Max review.', 'Adrian', 'review', 'high', 'Proposal Workflow', 'm1-mock-run-build-ready', false, false, true, 130),
    ('M1-PW-02', 'Define proposal page structure', 'Drafted in Obsidian Proposal Workflow page: cover, executive summary, site readiness heatmap, procedure opportunity, deliverables, timeline, investment, ROI caveat, About Block Ops, and next steps. Needs Samir/Adrian/Max review.', 'Max', 'review', 'high', 'Proposal Workflow', 'm1-mock-run-build-ready', false, false, true, 131),
    ('M1-PW-03', 'Define proposal claim and pricing review rules', 'Drafted in Obsidian Proposal Workflow page: pricing is draft-only until approved, ROI/value claims need caveats, and unsupported outcome guarantees must be avoided. Needs Samir/Adrian/legal review.', 'Samir', 'review', 'critical', 'Proposal Workflow', 'm1-mock-run-build-ready', true, true, true, 132),
    ('M1-PW-04', 'Test proposal workflow with mock-client paths', 'Run website/AI-chat and Adrian/network mock leads through proposal request, draft proposal review, proposal sent status, and follow-up task creation.', 'Bloq', 'ready', 'high', 'Proposal Workflow', 'm1-mock-run-build-ready', false, false, true, 133),
    ('M1-SMS-01', 'Define approved sales positioning spine', 'Drafted in Obsidian Sales Materials and Scripts page: Block Ops turns regional anesthesia from person-dependent skill into a repeatable site-level program, with strict no-clinical-care boundary. Needs Samir/Adrian review.', 'Samir', 'review', 'high', 'Sales Materials and Scripts', 'm1-mock-run-build-ready', false, false, true, 140),
    ('M1-SMS-02', 'Define first-touch and follow-up script set', 'Drafted in Obsidian Sales Materials and Scripts page: warm network, referral, website/AI-chat, manual prospect, Day 2-3 follow-up, Day 5-7 follow-up, close-loop, nurture, and polite pass scripts. Needs Adrian review.', 'Adrian', 'review', 'high', 'Sales Materials and Scripts', 'm1-mock-run-build-ready', false, false, true, 141),
    ('M1-SMS-03', 'Define sales material approval statuses', 'Drafted in Obsidian Sales Materials and Scripts page: draft/internal, ready for Samir review, ready for Adrian review, legal/compliance review, approved final, and archive/source only. Needs Samir/Adrian review.', 'Samir', 'review', 'high', 'Sales Materials and Scripts', 'm1-mock-run-build-ready', true, true, true, 142),
    ('M1-SMS-04', 'Test scripts and materials with mock-client paths', 'Use the drafted inbound and warm-network scripts in the M1 mock-client paths, verify script/material used is logged, and confirm unsupported claims are avoided.', 'Bloq', 'ready', 'high', 'Sales Materials and Scripts', 'm1-mock-run-build-ready', false, false, true, 143),
    ('M1-OM-01', 'Define Block Ops operating system layers', 'Drafted in Obsidian Block Ops Operating System page: Wiki/Obsidian is source truth, Mission Control is execution, Dashboard is calm summary, client portal is approved client-safe output. Needs Samir review.', 'Samir', 'review', 'high', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 150),
    ('M1-OM-02', 'Define roles and task ownership rules', 'Drafted in Obsidian Roles and Ownership page: milestones are shared, workflows organize, and tasks are owned; reviewer and executor can differ. Needs Samir review.', 'Samir', 'review', 'high', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 151),
    ('M1-OM-03', 'Define Mission Control operating rules', 'Drafted in Obsidian Mission Control Rules page: Mission Control tracks milestones, workflows, tasks, owners, priorities, statuses, blockers, dependencies, and source links; Dashboard stays separate. Needs Max/Samir review.', 'Max', 'review', 'high', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 152),
    ('M1-OM-04', 'Define weekly ops review cadence', 'Drafted in Obsidian Weekly Ops Review page: weekly reset checks milestone, workflows, blockers, owner next actions, priorities, locked items, and Mission Control updates. Needs Samir review.', 'Bloq', 'review', 'medium', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 153),
    ('M1-OM-05', 'Define decision capture rules', 'Drafted in Obsidian Decision Capture page: capture decisions that change product, workflow, milestone, naming, client-facing rules, legal/compliance caution areas, or major trade-offs. Needs Samir review.', 'Bloq', 'review', 'medium', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 154),
    ('M1-OM-06', 'Define status rules by object type', 'Drafted in Obsidian Status Rules page: Wiki note status, Mission Control task status, and client-facing deliverable approval status are separate. Needs Samir/Max review against live Supabase vocabulary.', 'Max', 'review', 'high', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 155),
    ('M1-OM-07', 'Review Batch 3 operating model pages', 'Samir reviews Batch 3 pages for accuracy: Block Ops Operating System, Roles and Ownership, Mission Control Rules, Weekly Ops Review, Decision Capture, and Status Rules.', 'Samir', 'ready', 'high', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 156),
    ('M1-DP-01', 'Define digital platform surface map', 'Drafted in Obsidian Digital Platform Overview page: client portal, internal Dashboard, Mission Control, Block Ops Wiki/Compendium, Obsidian, and Supabase each have separate roles. Needs Samir/Max review.', 'Samir', 'review', 'high', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 160),
    ('M1-DP-02', 'Define client portal non-negotiables', 'Drafted in Obsidian Client Portal page: Dashboard-first, read-only by default, approved final content only, client settings editable only, and v1 universal navigation. Needs Samir/Max review.', 'Max', 'review', 'high', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 161),
    ('M1-DP-03', 'Define internal Dashboard rules', 'Drafted in Obsidian Dashboard page: Dashboard is the calm summary home with current milestone, overall progress, and individual task progress; it should shortcut into Mission Control without becoming a task dump. Needs Max/Samir review.', 'Max', 'review', 'high', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 162),
    ('M1-DP-04', 'Define Mission Control platform behavior', 'Drafted in Obsidian Mission Control page: full task graph, milestones, workflows, owners, status, priority, dependencies, locked work, and context links. Needs Max/Samir review.', 'Max', 'review', 'high', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 163),
    ('M1-DP-05', 'Define internal Wiki / Compendium behavior', 'Drafted in Obsidian Block Ops Wiki - Compendium page: Obsidian remains source-of-truth authoring layer, internal Wiki is polished reading/search layer, Mission Control links to Wiki context, and client portal stays separate. Needs Samir/Max review.', 'Samir', 'review', 'high', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 164),
    ('M1-DP-06', 'Review Supabase data model summary', 'Drafted in Obsidian Supabase Data Model page from current SQL/source notes: sites, content objects, representations, launch tasks, dependencies, weekly agendas, and RLS caveats. Needs Max review and live schema verification.', 'Max', 'review', 'critical', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 165),
    ('M1-DP-07', 'Define design handoff process', 'Drafted in Obsidian Design Handoff Process page: capture feedback in Obsidian, wait for explicit send/package trigger, route to Dashboard/Mission Control/client portal/both/Obsidian-only, and require stakeholder acceptance. Needs Samir/Max review.', 'Bloq', 'review', 'medium', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 166),
    ('M1-DP-08', 'Review Batch 4 digital platform pages', 'Samir and Max review Batch 4 pages for accuracy: Digital Platform Overview, Client Portal, Dashboard, Mission Control, Block Ops Wiki / Compendium, Supabase Data Model, and Design Handoff Process.', 'Samir', 'ready', 'high', 'Platform & Internal/Client System', 'm1-mock-run-build-ready', false, false, true, 167),
    ('M1-WIKI-01', 'Import drafted Wiki pages into admin Block Ops Wiki', 'Completed 2026-07-03: actual admin Wiki surface uses Supabase wiki_sections and wiki_pages, not the legacy Knowledge Library route. Imported 35 Obsidian-drafted pages; verified 40 total live admin Wiki pages. Content remains internal review material only, not client-facing final content.', 'Bloq', 'done', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 168),
    ('M1-WIKI-02', 'Audit imported admin Wiki pages and set initial review gates', 'Completed 2026-07-08: imported admin Wiki pages now have an M1 project catalog and initial current-internal/review-gated handling. Remaining final promotion label work is tracked separately in M1-WIKI-10, six-pillar mapping in M1-WIKI-11, task linking in M1-WIKI-12, and client-facing candidate review in M1-WIKI-13.', 'Samir', 'done', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 169),
    ('M1-WIKI-03', 'Audit live Wiki sections and page counts', 'Verify the admin Block Ops Wiki sections, page counts, and imported titles after each import or cleanup pass. Current baseline: 40 live pages across the existing 12 admin sections.', 'Bloq', 'done', 'high', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', false, false, true, 176),
    ('M1-WIKI-04', 'QA Company Identity Wiki pages', 'Completed 2026-07-08: reviewed and re-synced Company Identity pages into the live admin Wiki as current internal drafts with explicit non-client-facing review gates: Mission, Vision, Positioning/Core Story, Pillar Model / Gold Standard Tree, and Implementation Bundles.', 'Samir', 'done', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', false, false, true, 177),
    ('M1-WIKI-05', 'QA Sales and Client Pipeline Wiki pages', 'Completed 2026-07-08: reviewed and re-synced Sales and Client Pipeline pages into the live admin Wiki as current internal drafts with explicit Adrian/Samir/Max/legal review gates. Includes lead capture, outreach, CRM stages, communication log, qualification/discovery, proposal workflow, sales materials/scripts, touchpoint taxonomy, and M2 phone lead capture as future scope.', 'Adrian', 'done', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 178),
    ('M1-WIKI-06', 'QA Operating Model Wiki pages', 'Completed 2026-07-08: reviewed and re-synced Operating Model pages into the live admin Wiki as current internal drafts. Includes Block Ops Operating System, Roles and Ownership, Mission Control Rules, Weekly Ops Review, Decision Capture, and Status Rules, with Samir review gates and Max review gates for Dashboard/Mission Control/Supabase implementation details.', 'Samir', 'done', 'high', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', false, false, true, 179),
    ('M1-WIKI-07', 'QA Digital Platform Wiki pages', 'Completed 2026-07-08: reviewed and re-synced Digital Platform pages into the live admin Wiki as current internal drafts. Includes Digital Platform Overview, Client Portal, Dashboard, Mission Control, Block Ops Wiki / Compendium, Supabase Data Model, and Design Handoff Process, with Max/Samir review gates and approved-final-only client portal boundaries.', 'Max', 'done', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', false, false, true, 180),
    ('M1-WIKI-08', 'QA Delivery and Clinical Knowledge Wiki pages', 'Completed 2026-07-09: reviewed and re-synced Client Onboarding, Implementation Bundle Delivery, Training Day Readiness, Go-Live Verification, and Clinical / Block Program Knowledge Index as current internal drafts. Standardized implementation-bundle terminology, the universal foundation baseline, current M3/M4/M5 milestone framing, approved-final-only client visibility, qualified clinical fact review, lawyer approval, and role-based evidence gates.', 'Samir', 'done', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 181),
    ('M1-WIKI-09', 'QA Legal Risk Archive and Growth Wiki pages', 'Completed 2026-07-09: reviewed and re-synced Legal Review Index, Compliance / Risk Controls, Acquisition / Growth Strategy, Backup and Continuity, and Decision Log / Historical Archive as current internal drafts. Added qualified-lawyer finalization, control evidence, client-leak/privilege/retention safeguards, M3/M4/M5 framing, Supabase live-data authority, seed/live reconciliation, and domain-specific final-state rules.', 'Samir', 'done', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 182),
    ('M1-WIKI-10', 'Define Wiki promotion and review labels', 'Completed 2026-07-09: defined the canonical Wiki governance model separating eight promotion states, multi-select qualified review gates, and five visibility labels. Added fail-closed defaults, exact-version client-release approval, leak-path verification, rollback/incident rules, one accountable owner, and conservative handling of legacy draft buckets. No content was promoted to client-facing candidate or final; durable Supabase/UI enforcement remains Max implementation work.', 'Samir', 'done', 'high', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 183),
    ('M1-WIKI-11', 'Map reviewed Wiki pages to the six-pillar spine', 'After page QA, map pages from the current 12 admin/backend sections into the official six-pillar Wiki spine without rushing a visible category rename.', 'Bloq', 'ready', 'high', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', false, false, true, 184),
    ('M1-WIKI-12', 'Link M1 Mission Control tasks to primary Wiki pages', 'Add or verify one primary Wiki context link for meaningful M1 tasks so Mission Control tracks execution while the Wiki carries the operating explanation.', 'Bloq', 'ready', 'high', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', false, false, true, 185),
    ('M1-WIKI-13', 'Identify client-facing Wiki candidates without publishing them', 'Create a list of pages or sections that may later become client-facing after Samir review, legal/clinical review where needed, and final approval. Do not publish draft Wiki content to clients.', 'Samir', 'locked', 'high', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 186),
    ('M1-WIKI-14', 'Run Wiki buildout acceptance check', 'Confirm the admin Wiki is visible, searchable enough for internal use, review labels are applied, Mission Control links exist, Obsidian logs are synced, and no draft content is exposed as client-facing final.', 'Bloq', 'locked', 'critical', 'Block Ops Wiki Buildout', 'm1-mock-run-build-ready', true, true, true, 187),
    ('M1-OPS-OWNER-01', 'Apply default owner rule for new tasks', 'Operating rule: every Mission Control task must have one accountable owner. If ownership is unclear, assign Samir by default so he can redirect to Adrian, Max, or Bloq as the workflow matures.', 'Samir', 'ready', 'high', 'Operating Model', 'm1-mock-run-build-ready', false, false, true, 188),
    ('M1-FINAL-REVIEW-01', 'Define final review and owner approval workflow', 'Create the process for moving internal drafts to approved-final state: each relevant owner reviews the page/artifact, approves or requests changes, and final status is only applied after required approvals are recorded.', 'Samir', 'ready', 'critical', 'Final Review / Approvals', 'm1-mock-run-build-ready', true, true, true, 189),
    ('M1-FINAL-REVIEW-02', 'Create final review approval page concept', 'Design the admin/internal page where Samir, Adrian, Max, and Bloq can read assigned final-review items and click approved or request changes, creating an auditable path to final state.', 'Max', 'ready', 'high', 'Final Review / Approvals', 'm1-mock-run-build-ready', true, true, true, 190),
    ('M1-CLIENT-LEAK-01', 'Run client-facing leak audit workflow', 'Test the client-facing app/portal paths early in M1 to confirm drafts, internal Mission Control details, Jarvis/internal language, implementation notes, and unapproved Wiki pages are not visible to clients. Create fix tasks for any leak found.', 'Max', 'ready', 'critical', 'Client-Facing Leak Audit', 'm1-mock-run-build-ready', true, true, true, 191),
    ('M1-SYNC-01', 'Document source-of-truth and regression checklist', 'Write the operating reference that explains Supabase/live Dashboard, Mission Control, Wiki/admin content, Obsidian, source seed, and verification checklist roles so future changes do not drift or update only one layer.', 'Bloq', 'ready', 'high', 'Wiki / Obsidian Operating System', 'm1-mock-run-build-ready', false, false, true, 192),
    ('M1-WIKI-LINK-01', 'Create Block Ops Wiki cross-linking map', 'Define the controlled Wikipedia-style link map for core Block Ops concepts so cross-linking is useful, governed, and not link-spam. Include page hubs, allowed internal links, and client-facing visibility cautions.', 'Bloq', 'ready', 'high', 'Wiki Cross-Linking', 'm1-mock-run-build-ready', false, false, true, 193),
    ('M1-WIKI-LINK-02', 'Add related-page blocks to core Wiki pages', 'Add governed Related Pages sections to active/internal Block Ops Wiki pages, starting with Mission Control, Outreach Sequence, Lead Capture, CRM Pipeline Stages, Client Portal Rules, Status Rules, and Wiki governance pages.', 'Bloq', 'ready', 'high', 'Wiki Cross-Linking', 'm1-mock-run-build-ready', false, false, true, 194),
    ('M1-WIKI-LINK-03', 'Add inline Wiki links where they improve navigation', 'Add natural inline links between major concepts without over-linking repeated terms. Keep client-facing visibility rules in mind so internal-only pages are not accidentally surfaced through client-safe paths.', 'Bloq', 'locked', 'medium', 'Wiki Cross-Linking', 'm1-mock-run-build-ready', false, false, true, 195),
    ('M1-WIKI-LINK-04', 'Create Wiki hub and index pages', 'Create or update hub/index pages such as Sales / Outreach Index, Mission Control Index, Client Portal Index, Wiki Governance Index, Implementation Bundle Index, and M1 Index so users can navigate by topic.', 'Bloq', 'locked', 'medium', 'Wiki Cross-Linking', 'm1-mock-run-build-ready', false, false, true, 196),
    ('M1-WIKI-LINK-05', 'Run Wiki link QA and client-leak check', 'Check for broken links, orphan pages, pages with no outbound links, duplicate concepts, and links that could leak internal-only or draft content into client-facing paths.', 'Max', 'locked', 'high', 'Wiki Cross-Linking', 'm1-mock-run-build-ready', false, false, true, 197),
    ('M1-DCK-01', 'Define client onboarding operating path', 'Drafted in Obsidian Client Onboarding page: signed/client handoff, site profile, welcome communication, portal access, site configuration, deliverable assignment, prep call scheduling, and blockers. Needs Samir/Max review.', 'Max', 'review', 'high', 'Mock Client / Demo Flow', 'm1-mock-run-build-ready', false, false, true, 170),
    ('M1-DCK-02', 'Define implementation bundle delivery process', 'Drafted in Obsidian Implementation Bundle Delivery page: foundation baseline plus site-customized materials, review gates, approved final content, and source/agent/site representation traceability. Needs Samir review.', 'Samir', 'review', 'critical', 'Clinical Standard & Deliverables', 'm1-mock-run-build-ready', true, false, true, 171),
    ('M1-DCK-03', 'Define training day readiness checklist', 'Drafted in Obsidian Training Day Readiness page: champion, site configuration, materials, access, prep call, schedule, supplies, LAST readiness, observation logger, and educator/consultant boundary. Needs Samir review.', 'Samir', 'review', 'critical', 'Clinical Standard & Deliverables', 'm1-mock-run-build-ready', true, false, true, 172),
    ('M1-DCK-04', 'Define go-live verification checklist', 'Drafted in Obsidian Go-Live Verification page: portal access, approved materials, safety infrastructure, documentation/logging, support cadence, escalation path, metrics, and Mission Control status. Needs Samir/Max review.', 'Samir', 'review', 'critical', 'Mock Client / Demo Flow', 'm1-mock-run-build-ready', true, false, true, 173),
    ('M1-DCK-05', 'Index clinical and block program knowledge library', 'Drafted in Obsidian Clinical / Block Program Knowledge Index page: groups foundation deliverables by physical ops, training, patient integration, clinical safety, documentation/value, and ultrasound/technique. Needs Samir fact review before final use.', 'Samir', 'review', 'critical', 'Clinical Standard & Deliverables', 'm1-mock-run-build-ready', true, false, true, 174),
    ('M1-DCK-06', 'Review Batch 5 delivery and clinical knowledge pages', 'Samir reviews Batch 5 pages for accuracy: Client Onboarding, Implementation Bundle Delivery, Training Day Readiness, Go-Live Verification, and Clinical / Block Program Knowledge Index.', 'Samir', 'ready', 'high', 'Clinical Standard & Deliverables', 'm1-mock-run-build-ready', true, false, true, 175),
    ('M1-29', 'Define no-response threshold', 'Set the operating rule for when a lead becomes no-response/stalled, such as no reply after a defined number of days or touches.', 'Samir', 'ready', 'high', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 290),
    ('M1-30', 'Define stalled lead statuses in CRM', 'Confirm the CRM statuses needed for stalled leads, such as waiting, no response, nurture, closed-lost, or recycle later.', 'Max', 'ready', 'high', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 300),
    ('M1-31', 'Set no-response retry cadence', 'Define how many follow-up attempts happen, over what time period, and through which channels before the lead is paused or recycled.', 'Adrian', 'ready', 'high', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 310),
    ('M1-32', 'Write no-response email script', 'Draft the early-phase email language Adrian uses when a lead has not responded.', 'Adrian', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 320),
    ('M1-33', 'Write no-response text script', 'Draft the early-phase text message language Adrian uses when a lead has not responded.', 'Adrian', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 330),
    ('M1-34', 'Write final nudge / close-loop script', 'Draft the final follow-up message Adrian uses before pausing, closing, or recycling a stalled lead.', 'Adrian', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 340),
    ('M1-35', 'Define pause vs close rule', 'Set the business rule for when a stalled lead should be paused, closed-lost, or kept active.', 'Samir', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 350),
    ('M1-36', 'Define recycle-later rule', 'Set when and how a stalled lead comes back into follow-up after being paused.', 'Adrian', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 360),
    ('M1-37', 'Add stalled-lead tracking fields if missing', 'Add or confirm fields needed to track stalled-lead reason, last touch, next touch, recycle date, and owner.', 'Max', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 370),
    ('M1-38', 'Test stalled-lead flow with mock client', 'Run a mock lead through the no-response path to confirm statuses, cadence, scripts, and next steps are clear.', 'Adrian', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 380),
    ('M1-39', 'Confirm stalled leads show correctly in Mission Control / CRM', 'Verify the stalled-lead tasks and statuses appear correctly in Mission Control and CRM views.', 'Bloq', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 390),
    ('M1-40', 'Document No-Response / Stalled Lead workflow', 'Write the internal operating note for the no-response/stalled-lead workflow and link it back to M1.', 'Bloq', 'ready', 'medium', 'No-Response / Stalled Lead', 'm1-mock-run-build-ready', false, false, true, 400),
    ('M1-FST-01', 'Define M1 final system test checklist', 'Create the end-of-milestone checklist that proves M1 using mock client paths, edge cases, CRM visibility, portal/account flow, deliverables, proposal/contract flow, onboarding, go-live, and closeout proof.', 'Bloq', 'done', 'critical', 'M1 Final System Test', 'm1-mock-run-build-ready', false, false, true, 410),
    ('M1-FST-02', 'Define detailed mock-client data inputs near closeout', 'Near M1 closeout, define facility names, contacts, exact scenarios, deliverable assignments, and portal content for the required mock clients.', 'Samir', 'locked', 'medium', 'M1 Final System Test', 'm1-mock-run-build-ready', false, false, true, 420),
    ('M1-FST-03', 'Run website / AI-chat mock client', 'Near M1 closeout, run one website or AI-chat mock client from lead capture to mock go-live and capture pass/fail notes.', 'Bloq', 'locked', 'critical', 'M1 Final System Test', 'm1-mock-run-build-ready', false, false, true, 430),
    ('M1-FST-04', 'Run Adrian relationship mock client', 'Near M1 closeout, run one Adrian relationship mock client from manual/network lead entry to mock go-live and capture pass/fail notes.', 'Adrian', 'locked', 'critical', 'M1 Final System Test', 'm1-mock-run-build-ready', false, false, true, 440),
    ('M1-FST-05', 'Decide whether extra mock clients are needed', 'After the two required mock clients run, decide if additional edge-case mock clients are needed for password reset, stalled leads, missing info, different deliverables, permissions, or messy CRM data.', 'Samir', 'locked', 'high', 'M1 Final System Test', 'm1-mock-run-build-ready', false, false, true, 450),
    ('M1-FST-06', 'Write M1 completion readout', 'Summarize what was tested, what passed, what failed, what got fixed, and what moves to M2.', 'Bloq', 'locked', 'critical', 'M1 Final System Test', 'm1-mock-run-build-ready', false, false, true, 460),
    ('M1-SOP-01', 'Clean up SOP documents folder and tab organization', 'Reorganize the SOP documents folder and SOP tab so internal SOPs are easier to browse, grouped by workflow area, and not duplicated across indexes. Deferred intentionally; not tonight.', 'Bloq', 'locked', 'medium', 'SOP / Knowledge Organization', 'm1-mock-run-build-ready', false, false, true, 470),
    ('M1-DASH-01', 'Hide locked tasks from dashboard current-task cards', 'Update dashboard current-task cards so each person only sees actionable tasks now, excluding locked and blocked future-dependent work.', 'Max', 'done', 'high', 'Dashboard / Mission Control UX', 'm1-mock-run-build-ready', false, false, true, 480),
    ('M1-CAL-01', 'Confirm internal calendar scheduling works', 'Verify different client meetings can be scheduled and added to the internal Block Ops calendar. Client email notifications are tracked separately because they did not send during the mock test.', 'Max', 'done', 'high', 'Training Day Scheduling', 'm1-mock-run-build-ready', false, false, true, 490),
    ('M1-CAL-02', 'Build client meeting email notifications', 'When a meeting is scheduled, send the client the correct meeting email/invite. Current mock test added meetings to the internal calendar but clients did not receive meeting emails.', 'Max', 'ready', 'critical', 'Training Day Scheduling', 'm1-mock-run-build-ready', false, false, true, 500),
    ('M1-CAL-03', 'Integrate Google Meet for client meetings', 'Improve Google Meet integration so Block Ops can use Meet as the client meeting platform and include usable meeting links in the client invite flow.', 'Max', 'ready', 'critical', 'Training Day Scheduling', 'm1-mock-run-build-ready', false, false, true, 510),
    ('M1-CAL-04', 'Test client meeting email and Google Meet pathway', 'Run a mock client meeting scheduling test that confirms the internal calendar event, client email invite, Google Meet link, and client join path all work.', 'Bloq', 'ready', 'critical', 'Training Day Scheduling', 'm1-mock-run-build-ready', false, false, true, 520),
    ('M1-PA-01', 'Confirm signed client appears in portal access tab', 'Verify that once a lead signs and becomes a client, the client record appears in the internal Portal Access tab. This proves the tab population path works even if tab actions are still mostly static.', 'Max', 'done', 'high', 'Onboarding Setup', 'm1-mock-run-build-ready', false, false, true, 530),
    ('M1-PA-02', 'Build functional portal access tab actions', 'Make the Portal Access tab operational instead of mostly static: expose the needed client access status, invite/reset/access actions, and any admin controls needed to manage client portal access safely.', 'Max', 'ready', 'critical', 'Onboarding Setup', 'm1-mock-run-build-ready', false, false, true, 540),
    ('M1-PA-03', 'Test portal access tab admin workflow', 'Run a mock client through the Portal Access tab workflow after functionality is built: verify access state, admin actions, reset/invite behavior, and that client-facing access remains correct.', 'Bloq', 'ready', 'high', 'Onboarding Setup', 'm1-mock-run-build-ready', false, false, true, 550),
    ('M2-01', 'Confirm the M2 readiness definition', 'Lock M2 as foundational client ready and write the plain-English readiness statement.', 'Samir', 'locked', 'critical', 'Foundational Readiness', 'm2-mock-run-complete', false, false, false, 10),
    ('M2-02', 'Finalize the deliverables set', 'Lock every deliverable that can be shown, sent, or used in a real client run.', 'Samir', 'locked', 'critical', 'Deliverables and Content', 'm2-mock-run-complete', false, false, false, 20),
    ('M2-03', 'Configure the starter block pack catalog', 'Set the reusable foundation block packs and make sure they can be assigned cleanly.', 'Max', 'locked', 'high', 'Deliverables and Content', 'm2-mock-run-complete', false, false, false, 30),
    ('M2-04', 'Lock the legal package and ownership structure', 'Finalize the legal docs, review path, and ownership / equity planning.', 'Adrian', 'locked', 'critical', 'Legal and Ownership', 'm2-mock-run-complete', true, true, false, 40),
    ('M2-LRA-01', 'Review legal review index', 'Drafted in Obsidian Legal Review Index page: legal package, counsel gates, operating controls, AI/no-PHI/on-site/sales claim boundaries, and final-versus-draft status rules. Needs Samir and qualified legal review.', 'Samir', 'locked', 'critical', 'Legal and Ownership', 'm2-mock-run-complete', true, true, true, 41),
    ('M2-LRA-02', 'Review compliance and risk controls', 'Drafted in Obsidian Compliance / Risk Controls page: no clinical-care boundary, no-PHI posture, AI reference-tool guardrails, on-site educator boundary, claims guardrails, and portal content controls. Needs Samir/legal review and Max implementation verification.', 'Samir', 'locked', 'critical', 'Security and Compliance', 'm2-mock-run-complete', true, true, true, 42),
    ('M2-LRA-03', 'Review acquisition and growth strategy', 'Drafted in Obsidian Acquisition / Growth Strategy page: lead sources, early-fit signals, relationship-first routing, nurture/future-market handling, and growth feedback loop. Needs Samir/Adrian review.', 'Adrian', 'locked', 'high', 'Commercial Operations', 'm2-mock-run-complete', false, false, true, 43),
    ('M2-LRA-04', 'Define backup and continuity verification', 'Drafted in Obsidian Backup and Continuity page: layer-specific backup targets, recovery priorities, source preservation, and recurring continuity checks. Needs Max to define live Supabase/Vercel backup and restore path.', 'Max', 'locked', 'high', 'QA and Validation', 'm2-mock-run-complete', true, false, true, 44),
    ('M2-LRA-05', 'Review decision log and historical archive rules', 'Drafted in Obsidian Decision Log / Historical Archive page: decision capture triggers, short entry format, archive/source-only handling, and current-truth versus historical-source separation. Needs Samir review.', 'Samir', 'locked', 'medium', 'Operating Rhythm', 'm2-mock-run-complete', false, false, true, 45),
    ('M2-LRA-06', 'Review Batch 6 legal risk acquisition archive pages', 'Samir reviews Batch 6 pages for accuracy: Legal Review Index, Compliance / Risk Controls, Acquisition / Growth Strategy, Backup and Continuity, and Decision Log / Historical Archive.', 'Samir', 'locked', 'high', 'Legal and Ownership', 'm2-mock-run-complete', true, true, true, 46),
    ('M2-05', 'Define the client personal-agent experience', 'Decide what the client-facing agent does, how it behaves, and how it hands off to humans.', 'Adrian', 'locked', 'high', 'Client Experience', 'm2-mock-run-complete', false, false, false, 50),
    ('M2-06', 'Make the portal operational for a real client', 'Confirm the portal sections, access rules, approved content flow, and live data path.', 'Max', 'locked', 'high', 'Portal and Data Flow', 'm2-mock-run-complete', false, false, false, 60),
    ('M2-07', 'Solve the EMR data intake path', 'Define how client data is collected from the EMR and made usable downstream.', 'Max', 'locked', 'critical', 'Portal and Data Flow', 'm2-mock-run-complete', true, false, false, 70),
    ('M2-08', 'Define training and boots-on-ground readiness', 'Make the client training and site support process executable.', 'Samir', 'locked', 'high', 'Training and Support', 'm2-mock-run-complete', false, false, false, 80),
    ('M2-09', 'Define billing, invoicing, and payment operations', 'Make sure the money flow is operational and can be tracked without improvisation.', 'Adrian', 'locked', 'high', 'Commercial Operations', 'm2-mock-run-complete', true, true, false, 90),
    ('M2-10', 'Set security, HIPAA, and compliance boundaries', 'Make the compliance posture explicit so the system stays safe and professional.', 'Samir', 'locked', 'critical', 'Security and Compliance', 'm2-mock-run-complete', true, false, false, 100),
    ('M2-11', 'Define provisioning and offboarding', 'Document how clients are set up, updated, and cleanly taken off the system.', 'Max', 'locked', 'high', 'Client Operations', 'm2-mock-run-complete', false, false, false, 110),
    ('M2-12', 'Define reporting and visibility', 'Make sure the team can see status, value, and quality clearly.', 'Max', 'locked', 'medium', 'Reporting and Visibility', 'm2-mock-run-complete', false, false, false, 120),
    ('M2-13', 'Define the operating cadence', 'Set the weekly loop for priorities, owners, updates, and issue review.', 'Bloq', 'locked', 'medium', 'Operating Rhythm', 'm2-mock-run-complete', false, false, false, 130),
    ('M2-14', 'Define QA, staging, and validation steps', 'Create the internal check path so changes can be tested before a client sees them.', 'Max', 'locked', 'high', 'QA and Validation', 'm2-mock-run-complete', false, false, false, 140),
    ('M2-15', 'Confirm support readiness and handoffs', 'Make sure support can be delivered responsibly after launch without confusion.', 'Samir', 'locked', 'high', 'Training and Support', 'm2-mock-run-complete', false, false, false, 150),
    ('M2-16', 'Run the mock-client proof against M2', 'Prove the real-client version of the workflow can run without major improvisation.', 'Max', 'locked', 'critical', 'Mock Client Proof', 'm2-mock-run-complete', false, false, false, 160),
    ('M3-01', 'Choose the reviewer group', 'Decide exactly which outside anesthesiologists will review the system.', 'Samir', 'locked', 'critical', 'Reviewer Strategy', 'm3-trusted-anesthesiologist-validation', false, false, false, 10),
    ('M3-02', 'Decide confidentiality requirements', 'Decide whether NDAs or a lighter confidentiality note are needed.', 'Adrian', 'locked', 'high', 'Reviewer Strategy', 'm3-trusted-anesthesiologist-validation', true, true, false, 20),
    ('M3-03', 'Define reviewer criteria', 'Write the criteria so the right reviewers are invited for useful feedback.', 'Samir', 'locked', 'high', 'Reviewer Strategy', 'm3-trusted-anesthesiologist-validation', false, false, false, 30),
    ('M3-04', 'Define the reviewer count', 'Decide how many reviewers are enough for a useful validation round.', 'Max', 'locked', 'medium', 'Reviewer Strategy', 'm3-trusted-anesthesiologist-validation', false, false, false, 40),
    ('M3-05', 'Confirm outreach and scheduling ownership', 'Make sure the invite, scheduling, and follow-up ownership is clear.', 'Adrian', 'locked', 'high', 'Scheduling and Logistics', 'm3-trusted-anesthesiologist-validation', false, false, false, 50),
    ('M3-06', 'Decide what will be shown', 'Lock the exact scope of what will be reviewed so the story stays coherent.', 'Samir', 'locked', 'critical', 'Presentation Package', 'm3-trusted-anesthesiologist-validation', false, false, false, 60),
    ('M3-07', 'Build the review packet / pre-read', 'Create the packet that explains the system before the session starts.', 'Max', 'locked', 'high', 'Presentation Package', 'm3-trusted-anesthesiologist-validation', false, false, false, 70),
    ('M3-08', 'Define the walkthrough assets and talking points', 'Gather the examples, slides, and talking points needed for the review.', 'Adrian', 'locked', 'high', 'Presentation Package', 'm3-trusted-anesthesiologist-validation', false, false, false, 80),
    ('M3-09', 'Draft the reviewer ask message', 'Write the outreach message in a professional, low-friction way.', 'Adrian', 'locked', 'high', 'Scheduling and Logistics', 'm3-trusted-anesthesiologist-validation', false, false, false, 90),
    ('M3-10', 'Define the meeting format and time box', 'Set the session format so the review stays focused and short enough to use.', 'Adrian', 'locked', 'medium', 'Scheduling and Logistics', 'm3-trusted-anesthesiologist-validation', false, false, false, 100),
    ('M3-11', 'Write the walkthrough agenda in order', 'Make the review follow the same sequence every time.', 'Max', 'locked', 'high', 'Walkthrough Process', 'm3-trusted-anesthesiologist-validation', false, false, false, 110),
    ('M3-12', 'Define the feedback capture template', 'Capture issues in a way that can be converted into tasks quickly.', 'Bloq', 'locked', 'high', 'Feedback Capture', 'm3-trusted-anesthesiologist-validation', false, false, false, 120),
    ('M3-13', 'Define severity and ownership tags', 'Let review notes be sorted by severity and owner.', 'Max', 'locked', 'high', 'Feedback Capture', 'm3-trusted-anesthesiologist-validation', false, false, false, 130),
    ('M3-14', 'Decide the follow-up appreciation note', 'Close the loop respectfully and keep the relationship warm.', 'Adrian', 'locked', 'medium', 'Follow-Up', 'm3-trusted-anesthesiologist-validation', false, false, false, 140),
    ('M3-15', 'Convert issues into a fix list and retest', 'Turn the highest-priority issues into a patch list and verify the fixes.', 'Max', 'locked', 'critical', 'Patch and Retest', 'm3-trusted-anesthesiologist-validation', false, false, false, 150),
    ('M3-16', 'Write the M3 completion readout', 'Summarize what changed, what remains open, and whether the milestone is complete.', 'Bloq', 'locked', 'high', 'Completion Readout', 'm3-trusted-anesthesiologist-validation', false, false, false, 160),
    ('M4-01', 'Synthesize validation feedback', 'Pull the review notes into one current truth.', 'Bloq', 'locked', 'critical', 'Closure', 'm4-validation-closed', false, false, false, 10),
    ('M4-02', 'Patch the major holes', 'Fix the biggest issues found during validation.', 'Max', 'locked', 'critical', 'Closure', 'm4-validation-closed', false, false, false, 20),
    ('M4-03', 'Resolve clinical clarity issues', 'Clean up anything that made the clinical story vague or unsafe.', 'Samir', 'locked', 'high', 'Closure', 'm4-validation-closed', true, false, false, 30),
    ('M4-04', 'Retest the changed flow', 'Confirm the patched flow still works cleanly end to end.', 'Max', 'locked', 'high', 'Retest', 'm4-validation-closed', false, false, false, 40),
    ('M4-05', 'Confirm validation is closed', 'Decide if the system is ready to move on to founding partner motion.', 'Samir', 'locked', 'critical', 'Completion', 'm4-validation-closed', false, false, false, 50)
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
    ('M1-04', 'M1-03', 'finish_to_start'),
    ('M1-05', 'M1-04', 'finish_to_start'),
    ('M1-06', 'M1-04', 'finish_to_start'),
    ('M1-07', 'M1-05', 'finish_to_start'),
    ('M1-07', 'M1-06', 'finish_to_start'),
    ('M1-08', 'M1-07', 'finish_to_start'),
    ('M1-09', 'M1-08', 'finish_to_start'),
    ('M1-FST-02', 'M1-FST-01', 'finish_to_start'),
    ('M1-FST-03', 'M1-FST-02', 'finish_to_start'),
    ('M1-FST-04', 'M1-FST-02', 'finish_to_start'),
    ('M1-FST-05', 'M1-FST-03', 'finish_to_start'),
    ('M1-FST-05', 'M1-FST-04', 'finish_to_start'),
    ('M1-FST-06', 'M1-FST-05', 'finish_to_start'),
    ('M2-02', 'M2-01', 'finish_to_start'),
    ('M2-03', 'M2-02', 'finish_to_start'),
    ('M2-04', 'M2-02', 'finish_to_start'),
    ('M2-05', 'M2-04', 'finish_to_start'),
    ('M2-06', 'M2-05', 'finish_to_start'),
    ('M2-07', 'M2-06', 'finish_to_start'),
    ('M2-08', 'M2-07', 'finish_to_start'),
    ('M2-09', 'M2-08', 'finish_to_start'),
    ('M2-10', 'M2-09', 'finish_to_start'),
    ('M2-11', 'M2-10', 'finish_to_start'),
    ('M2-12', 'M2-11', 'finish_to_start'),
    ('M2-13', 'M2-12', 'finish_to_start'),
    ('M2-14', 'M2-13', 'finish_to_start'),
    ('M2-15', 'M2-14', 'finish_to_start'),
    ('M2-16', 'M2-15', 'finish_to_start'),
    ('M3-02', 'M3-01', 'finish_to_start'),
    ('M3-03', 'M3-02', 'finish_to_start'),
    ('M3-04', 'M3-03', 'finish_to_start'),
    ('M3-05', 'M3-04', 'finish_to_start'),
    ('M3-06', 'M3-05', 'finish_to_start'),
    ('M3-07', 'M3-06', 'finish_to_start'),
    ('M3-08', 'M3-07', 'finish_to_start'),
    ('M3-09', 'M3-08', 'finish_to_start'),
    ('M3-10', 'M3-09', 'finish_to_start'),
    ('M3-11', 'M3-10', 'finish_to_start'),
    ('M3-12', 'M3-11', 'finish_to_start'),
    ('M3-13', 'M3-12', 'finish_to_start'),
    ('M3-14', 'M3-13', 'finish_to_start'),
    ('M3-15', 'M3-14', 'finish_to_start'),
    ('M3-16', 'M3-15', 'finish_to_start'),
    ('M1-WIKI-04', 'M1-WIKI-03', 'finish_to_start'),
    ('M1-WIKI-05', 'M1-WIKI-04', 'finish_to_start'),
    ('M1-WIKI-06', 'M1-WIKI-04', 'finish_to_start'),
    ('M1-WIKI-07', 'M1-WIKI-04', 'finish_to_start'),
    ('M1-WIKI-08', 'M1-WIKI-04', 'finish_to_start'),
    ('M1-WIKI-09', 'M1-WIKI-04', 'finish_to_start'),
    ('M1-WIKI-10', 'M1-WIKI-04', 'finish_to_start'),
    ('M1-WIKI-11', 'M1-WIKI-10', 'finish_to_start'),
    ('M1-WIKI-12', 'M1-WIKI-11', 'finish_to_start'),
    ('M1-WIKI-13', 'M1-WIKI-10', 'gate'),
    ('M1-WIKI-14', 'M1-WIKI-12', 'finish_to_start'),
    ('M4-02', 'M4-01', 'finish_to_start'),
    ('M4-03', 'M4-02', 'finish_to_start'),
    ('M4-04', 'M4-03', 'finish_to_start'),
    ('M4-05', 'M4-04', 'finish_to_start')
)
insert into launch_task_dependencies (task_id, depends_on_task_id, dependency_type)
select task.id, dep.id, deps.dependency_type
from deps
join launch_tasks_v2 task on task.task_key = deps.task_key
join launch_tasks_v2 dep on dep.task_key = deps.depends_on_task_key
on conflict do nothing;

with collabs(task_key, collaborator) as (
  values
    ('M1-03', 'Max'),
    ('M1-03', 'Adrian'),
    ('M1-04', 'Max'),
    ('M1-05', 'Adrian'),
    ('M1-05', 'Samir'),
    ('M1-06', 'Adrian'),
    ('M1-06', 'Max'),
    ('M1-07', 'Samir'),
    ('M1-07', 'Adrian'),
    ('M1-08', 'Samir'),
    ('M1-08', 'Max'),
    ('M1-09', 'Samir'),
    ('M1-09', 'Adrian'),
    ('M1-FST-01', 'Bloq'),
    ('M1-FST-01', 'Samir'),
    ('M1-FST-02', 'Samir'),
    ('M1-FST-02', 'Max'),
    ('M1-FST-02', 'Adrian'),
    ('M1-FST-03', 'Max'),
    ('M1-FST-03', 'Samir'),
    ('M1-FST-04', 'Adrian'),
    ('M1-FST-04', 'Samir'),
    ('M1-FST-05', 'Bloq'),
    ('M1-FST-05', 'Samir'),
    ('M1-FST-06', 'Bloq'),
    ('M1-FST-06', 'Samir'),
    ('M2-01', 'Samir'),
    ('M2-02', 'Samir'),
    ('M2-03', 'Max'),
    ('M2-04', 'Adrian'),
    ('M2-04', 'Samir'),
    ('M2-05', 'Adrian'),
    ('M2-05', 'Max'),
    ('M2-06', 'Max'),
    ('M2-06', 'Samir'),
    ('M2-07', 'Max'),
    ('M2-08', 'Samir'),
    ('M2-09', 'Adrian'),
    ('M2-10', 'Samir'),
    ('M2-11', 'Max'),
    ('M2-12', 'Max'),
    ('M2-13', 'Bloq'),
    ('M2-14', 'Max'),
    ('M2-15', 'Samir'),
    ('M2-16', 'Max'),
    ('M2-16', 'Bloq'),
    ('M3-01', 'Samir'),
    ('M3-02', 'Adrian'),
    ('M3-03', 'Samir'),
    ('M3-04', 'Max'),
    ('M3-05', 'Adrian'),
    ('M3-06', 'Samir'),
    ('M3-07', 'Max'),
    ('M3-08', 'Adrian'),
    ('M3-09', 'Adrian'),
    ('M3-10', 'Adrian'),
    ('M3-11', 'Max'),
    ('M3-12', 'Bloq'),
    ('M3-13', 'Max'),
    ('M3-14', 'Adrian'),
    ('M3-15', 'Max'),
    ('M3-16', 'Bloq'),
    ('M1-WIKI-04', 'Bloq'),
    ('M1-WIKI-05', 'Samir'),
    ('M1-WIKI-05', 'Bloq'),
    ('M1-WIKI-06', 'Bloq'),
    ('M1-WIKI-07', 'Samir'),
    ('M1-WIKI-07', 'Bloq'),
    ('M1-WIKI-08', 'Bloq'),
    ('M1-WIKI-09', 'Bloq'),
    ('M1-WIKI-10', 'Max'),
    ('M1-WIKI-10', 'Bloq'),
    ('M1-WIKI-11', 'Samir'),
    ('M1-WIKI-11', 'Max'),
    ('M1-WIKI-12', 'Max'),
    ('M1-WIKI-13', 'Adrian'),
    ('M1-WIKI-13', 'Max'),
    ('M1-WIKI-14', 'Samir'),
    ('M1-WIKI-14', 'Max'),
    ('M4-01', 'Bloq'),
    ('M4-02', 'Max'),
    ('M4-03', 'Samir'),
    ('M4-04', 'Max'),
    ('M4-05', 'Samir')
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
  'Jarvis should rehearse the full mock-client journey so every lead source, workflow step, and launch handoff is ready before the real run.',
  'm1-mock-run-build-ready',
  '1. Lock the mock-client scope, workflow hierarchy, and owner sort rules.
2. Define the CRM intake, follow-up, and sales enablement flow.
3. Prepare the proposal, contract, and go-live handoff.
4. Run the mock client end to end and verify the process is clean.',
  '- confirm the mock-client profile and both lead paths
- set the milestone/workflow/task hierarchy
- keep the client-facing narrative clear and clinically safe
- review the M2 and M3 readiness criteria',
  '- make sure both lead pipelines land in the CRM
- define the owner and workflow sort rules in Mission Control
- keep the launch board readable and current
- support the M2 proof run and validation prep',
  '- ensure the network lead path matches the AI chat path
- keep proposal, contract, and follow-up language moving
- make the handoff story feel real and smooth
- prepare the M3 reviewer outreach path',
  '- the CRM record model must be clear before intake starts
- sales materials must exist before the mock client is contacted
- go-live prep cannot start until the contract step is defined
- the board should keep active items on top and archived items out of the way',
  '- proposal and contract steps must be defined before the close
- onboarding materials must be ready before go-live
- M2 cannot start until the M1 mock-client path is proven
- M3 cannot start until the M2 readiness package is in place',
  '- lock the final milestone/workflow naming
- decide the exact owner sorting behavior on Mission Control
- decide which M2 deliverables are mandatory for launch
- decide who reviews the M3 packet first',
  '- the two lead pipelines must both land in the same operating flow
- the mock client should move from lead to launch without a missing step
- the validation round needs a clean packet and a clean feedback capture process'
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
