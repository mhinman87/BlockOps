# Knowledge, SOPs, and Scripts — Legacy Consolidation Ledger

**Audit mode:** Read-only  
**Live Wiki edits:** None  
**Source corpus:** `/home/bloq/.openclaw/workspace/block-ops/operations` and related business/Obsidian sources  
**Canonical comparison:** Live Supabase Wiki export, 43 pages / 12 sections

## Governing rules

- The Block Ops Wiki is the canonical organizational knowledge source.
- Live Supabase is canonical for application and execution state.
- Mission Control owns current tasks, owners, dependencies, milestone state, and completion evidence.
- Obsidian is an optional drafting, staging, and backup layer.
- Legacy workspace files remain provenance/source material until their useful content is migrated and verified.
- No legacy document should be copied wholesale into the current Wiki.
- Clinical, legal, coding, reimbursement, evidence, and technical claims retain their applicable review gates.
- Archive means retained as historical/source reference, not deleted.

## A. Milestone and launch documents

### `Block_Ops_Launch_Milestones_v1.md`

- **Preserve:** Milestones as outcome gates; explicit completion conditions; dependency-aware progression; legal/compliance as cross-cutting constraints.
- **Merge into:** `Block Ops Operating System`, `Mission Control`, `Compliance / Risk Controls`, `Legal Review Index`, `Go-Live Verification`.
- **Do not migrate:** The ten-step milestone ladder, planning-era dependency chain, or present-tense readiness claims.
- **Reason:** Superseded by current M1–M5 definitions.
- **After extraction:** Archive-reference.

### `Block_Ops_M1_Minimum_Deliverable_Set_v1.md`

- **Preserve:** Mock-run purpose; realistic lead-to-live rehearsal; explicit missing/draft/current states; client-record minimums; test exclusions; continuity requirements.
- **Merge into:** `Block Ops Operating System`, lead-to-live sales pages, `Implementation Bundle Delivery`, `Status Rules`, `Backup and Continuity`, `Go-Live Verification`.
- **Do not migrate:** M1-era open build questions or any implication that drafts are acceptable for client delivery.
- **After extraction:** Archive-reference.

### `Block_Ops_M1_M2_Hierarchy_and_Completion_Map_v1.md`

- **Preserve:** Milestone → workflow → task → owner → status hierarchy; outcomes versus executable work.
- **Merge into:** `Block Ops Operating System`, `Mission Control Rules`, `Roles and Ownership`, `Status Rules`.
- **Do not migrate:** Legacy owner assignments, statuses, or incomplete milestone definitions.
- **After extraction:** Archive-reference.

### `Block_Ops_M2_One_Pager_and_Owners_v1.md`

- **Preserve:** Foundational-client readiness categories: final deliverables, legal package, portal/access, data intake, training, QA, support, security, provisioning, reporting, and acceptance review.
- **Merge into:** Domain pages under Client Delivery System, Digital Platform, Human Capital, Value Intelligence, and Implementation Bundles.
- **Do not migrate:** Vendor speculation, `HIPAA-adjacent` language, absolute “no hiccups” claims, broad owner maps, or unverified current-completion assertions.
- **After extraction:** Archive-reference; it duplicates the detailed M2 workflow source.

### `Block_Ops_M2_Foundational_Client_Workflows_v1.md`

- **Preserve:** Detailed readiness controls and acceptance concepts by domain.
- **Merge into:** `Client Onboarding`, `Client Portal`, `Supabase Data Model`, `Training Day Readiness`, `Go-Live Verification`, `Implementation Bundle Delivery`, `Backup and Continuity`, `Compliance / Risk Controls`, `Legal Review Index`, and relevant SOPs.
- **Do not migrate:** Planning-era ordering, stale status, owner defaults, or unverified legal/platform claims. The file's 18-workflow inventory and 16-step proposed sequence are internally inconsistent.
- **After extraction:** Archive-reference.

### `Block_Ops_M3_External_Validation_Outline_v1.md`

- **Preserve:** Reviewer selection, controlled pre-read, structured feedback capture, severity tagging, remediation, retesting, deferral recording, and completion readout.
- **Merge into:** `Go-Live Verification`, `Decision Capture`, `Decision Log / Historical Archive`, clinical knowledge governance, and risk/legal pages.
- **Do not migrate:** M3-as-future wording, open planning questions, or proposed owner split.
- **After extraction:** Archive-reference.

### `Block_Ops_M3_Workflow_Task_Owner_Map_v1.md`

- **Preserve:** Only any validation procedure not already represented by the M3 outline or current Wiki.
- **Merge into:** Same destinations as the M3 outline; current actionable work belongs in Mission Control.
- **Do not migrate:** Pending statuses, planning owners, or task IDs.
- **After extraction:** Archive-reference as duplicate executable expansion.

### `Block_Ops_Jarvis_Milestone_Map_v1.md`

- **Preserve:** Truth, workflow/dependency, continuity, interface, and intelligence-layer concepts; surfacing blockers and next actions.
- **Merge into:** `Block Ops Operating System`, `Mission Control`, `Dashboard`, `Backup and Continuity`, `Decision Capture`.
- **Do not migrate:** Parallel Jarvis milestone ladder or Jarvis as a second public/system architecture.
- **After extraction:** Archive-reference.

## B. Master playbook and client lifecycle

### `Block_Ops_Master_Playbook_v2.md`

- **Preserve:** Repeatable client lifecycle; separation of clinical, relationship, and platform roles; controlled handoffs; internal-only operating-manual intent.
- **Merge into:** Existing sales, onboarding, training, go-live, operating-system, role, platform, and delivery pages.
- **Do not migrate:** Dated “built/building/need to build” roadmap, fixed durations, named-person dependencies, temporary access credentials, old pricing/payment assumptions, unsupported outcome/ROI claims, or the eight phases as the company milestone structure.
- **After extraction:** Archive-reference. Its phase summaries duplicate Phase 1–8.

### `Phase_1_Lead_Gen_Qualification_v2.md`

- **Preserve:** ICP dimensions; source-aware lead intake; researched prospect briefs; fit assessment; Go/Defer/Need More Info/Pass discipline; controlled proposal handoff; quality-over-volume prospecting.
- **Merge into:** `Acquisition / Growth Strategy`, `Lead Capture`, `Outreach Sequence`, `CRM Pipeline Stages`, `Client Communication Log`, `Qualification and Discovery`, `Proposal Workflow`, `Sales Materials and Scripts`.
- **Current Wiki wins on:** Outreach cadence, channel logic, CRM stage names, implementation-bundle terminology, finals-only content, and task ownership.
- **Do not migrate without decision/review:** Hard size/geography exclusions, Champion tiers, numeric fit threshold, pre-engagement clinical probing, exact pricing/payment terms, ROI/outcome claims, or clinical/coding demo answers.
- **After extraction:** Archive-reference.

### `Phase_2_PreVisit_Prep_Customization_v2.md`

- **Preserve:** Controlled contract-to-onboarding handoff; site configuration; universal foundation baseline versus site configuration; version/approval evidence; access setup; physical packaging QA; role-specific preparation; hard readiness gates.
- **Merge into:** `Client Onboarding`, `Implementation Bundles`, `Implementation Bundle Delivery`, `Client Portal`, `Supabase Data Model`, `Training Day Readiness`, `Compliance / Risk Controls`.
- **Current Wiki wins on:** Invitation/reset-password flow, approved-final content only, implementation-bundle language, review gates, and site-specific configuration controls.
- **Do not migrate:** Plaintext credential transmission, fixed four-week schedule, fixed package counts, clinical defaults, unverified agent accuracy claims, or unapproved legal/site materials.
- **After extraction:** Archive-reference.

### `Phase_3_OnSite_Training_v2.md`

- **Preserve:** Educational/implementation boundary; structured readiness evidence; role-specific observations; hands-on training; evidence-backed conditions and follow-up; client clinical owner retains clinical authority.
- **Merge into:** `Training Day Readiness`, `Go-Live Verification`, `Implementation Bundle Delivery`, `Clinical / Block Program Knowledge Index`, `Legal Review Index`.
- **Do not migrate as operating truth:** Detailed LAST treatment/dosing, fixed monitoring times, retrieval-time thresholds, technique/drug guidance, photo capture, person-specific scope exceptions, or competency claims without qualified review.
- **After extraction:** Archive-reference.

### `Phase_4_GoLive_Bridge_Support_v2.md`

- **Preserve:** Named support owners; early scheduled follow-up; blocker/access/material/documentation tracking; escalation; transition to recurring support.
- **Merge into:** `Go-Live Verification`, `Dashboard`, `Compliance / Risk Controls`.
- **Do not migrate without approval:** Mandatory Day 3/7/14/30 cadence, exact SLAs, targets such as 20 blocks or 90% logging, or simplistic wrong-answer handling.
- **After extraction:** Archive-reference after cadence decision.

### `Phase_5_Ongoing_Support_Subscription_v2.md`

- **Preserve:** Recurring data collection, support review, action summaries, quarterly trends, engagement monitoring, evidence-update governance, and explainable client-health signals.
- **Existing destinations:** `Go-Live Verification`, `Dashboard`, `Supabase Data Model`, `Implementation Bundle Delivery`, `Clinical / Block Program Knowledge Index`, `Compliance / Risk Controls`.
- **Missing destination:** Create a governed `Recurring Client Support` page before migrating the complete procedure.
- **Do not migrate:** $3K–$5K value claim, automatic protocol pushes, consulting SLA, twice-monthly evidence scan, exact site-time assumption, unverified product behavior, or unsupported benchmarks.
- **Until destination exists:** Source-only; do not archive yet.

### `Phase_6_Renewal_Expansion_v2.md`

- **Preserve:** Early renewal preparation; outcomes/relationship/scope review; fix delivery problems before expansion; evidence-based expansion fit.
- **Existing destinations:** `Proposal Workflow`, `Acquisition / Growth Strategy`, `Implementation Bundles`, `Implementation Bundle Delivery`, risk/claims governance.
- **Missing destination:** Create governed `Renewal and Expansion` page.
- **Do not migrate:** Fixed 90-day sequence, renewal/expansion targets, volume pricing, referral incentives, or annual-report claims without approval.
- **Until destination exists:** Source-only; do not archive yet.

### `Phase_7_Churn_Prevention_v2.md`

- **Preserve:** Client-health signals, graduated intervention, named action owner, champion continuity, and evidence-linked intervention plans.
- **Existing destinations:** `Dashboard`, `Status Rules`, `Compliance / Risk Controls`.
- **Missing destination:** Create governed `Client Health and Retention` page, likely linked to Recurring Client Support.
- **Do not migrate:** Fixed yellow/red thresholds, 24/48-hour SLA, payment-aging sequence, unverified automation, or automatic offboarding criteria.
- **Until destination exists:** Source-only; do not archive yet.

### `Phase_8_Offboarding_v2.md`

- **Preserve:** Internal alignment; respectful exit; controlled access closure; contract/law/policy-governed data handling; final handoff; exit interview; lessons learned.
- **Existing destinations:** `Client Portal`, `Supabase Data Model`, `Legal Review Index`, `Compliance / Risk Controls`, `Decision Log / Historical Archive`.
- **Missing destination:** Create governed `Client Offboarding and Access Closure` page.
- **Do not migrate:** Automatic loss of all access, vague “data archived,” reproduction restrictions, dormant outreach, re-entry fees, or new minimum terms without legal/business approval.
- **Until destination exists:** Source-only; do not archive yet.

## C. Architecture, governance, task-board, and duplicate sources

### `Layer_Architecture_and_Knowledge_Governance.md`

- **Preserve:** Human-readable deliverables versus reasoning-rich agent knowledge versus site configuration; negative knowledge; client-safe filtering; global versus site-specific scope.
- **Merge into:** `Block Ops Wiki / Compendium`, `Block Ops Wiki Go-Live Readiness Matrix`, `Supabase Data Model`, `Client Portal`, clinical knowledge index, and risk controls.
- **Restate through:** Representation type, promotion state, visibility, review gates, scope, and client-safe/agent-facing metadata.
- **Do not migrate:** A second ambiguous “three-layer architecture” as top-level company doctrine.
- **After extraction:** Archive-reference.

### `Block_Ops_Adaptive_Operating_System_Spec_v1.md`
### `Block_Ops_Adaptive_Launch_Ops_Schema_Design_v1.md`
### `Block_Ops_Working_Agenda_and_Task_System_v1.md`

- **Preserve:** One owner; tasks versus milestones; explicit dependencies; ready/locked/active/waiting/blocked/review/done/dropped semantics; relocking on new facts; legal gates; readiness not inferred from completion percentage; weekly review discipline.
- **Merge into:** `Block Ops Operating System`, `Mission Control`, `Mission Control Rules`, `Status Rules`, `Roles and Ownership`, `Weekly Ops Review`, `Supabase Data Model`.
- **Do not migrate:** Proposed schema as live truth, hard-coded owner lists, old milestone ladder, Hermes terminology, or markdown as execution state.
- **After extraction:** Archive-reference as design history.

### `Block_Ops_30_Day_Adaptive_Task_Board_v1.md`

- **Preserve:** Historical rationale only; compare any apparently unfinished task with live Mission Control before creating new work.
- **Merge into:** No Wiki operating page beyond concise history if needed. Current work belongs in Mission Control.
- **Do not migrate:** Status, `this_week`, priority, old IDs, owner assignments, or M1–M10 ladder.
- **After extraction:** Archive-reference.

### `.archive_Block_Ops_Operating_Model_v1.md`

- **Preserve selectively:** Education/systems boundary, client clinical authority, global standard versus site adaptation, lifecycle and support concepts.
- **Merge into:** Positioning, onboarding, bundle delivery, readiness, go-live, roles, and risk controls.
- **Do not migrate:** Five-phase structure, fixed counts, timing, automation percentages, outcomes, or scale projections.
- **Disposition:** Remain archived.

### `.archive_Lead_Generation_Strategy.md`

- **Preserve:** Quality-over-quantity prospecting, scored facility dossiers, contextual outreach, fit criteria, response logging.
- **Merge into:** Acquisition, lead capture, qualification, outreach, and CRM pages.
- **Do not migrate:** Weekly quotas, tool choices, old stage names, or unapproved facility exclusions.
- **Disposition:** Remain archived after selective merge.

### `.archive_Phase_1_Sales_Site_Assessment_Playbook.md`

- **Preserve:** Reviewed fit criteria, discovery categories, clinical/commercial boundaries, red/yellow flags, advisory-not-credentialing boundary.
- **Merge into:** `Qualification and Discovery`, `Proposal Workflow`, `Client Onboarding`, `Roles and Ownership`, risk controls.
- **Do not migrate:** Numeric thresholds, experience cutoffs, fixed pricing/package assumptions, old lifecycle model, or unreviewed claims.
- **Disposition:** Remain archived.

### Duplicate `Block_Ops_Strategic_Vision_v1.md`

- **Primary retained source:** `/business/Block_Ops_Strategic_Vision_v1.md`.
- **Duplicate:** `/operations/Block_Ops_Strategic_Vision_v1.md`.
- **Preserve:** Education/implementation-system identity, site configuration, transferable IP, strategic optionality.
- **Exclude/review:** Valuation multiples, largest-dataset claims, ownership/de-identification assertions, fixed pricing/timing.
- **Merge into:** Positioning, Vision, Acquisition / Growth, Digital Platform, Implementation Bundles.
- **After extraction:** Archive duplicate operations copy.

### Duplicate `elevator-pitch-v1.md`

- **Primary retained source:** `/business/elevator-pitch-v1.md`.
- **Duplicate:** `/operations/elevator-pitch-v1.md`.
- **Preserve:** Concise problem/value framing and implementation-system description.
- **Exclude/review:** Revenue growth, world-class, opioid reduction, faster discharge, more cases per day, or unverified platform/service capability claims.
- **Merge into:** `Block Ops Positioning and Core Story`, `Sales Materials and Scripts`.
- **After extraction:** Archive duplicate operations copy.

## D. Backup inventory discrepancy

No dedicated source files matching the rendered titles `Backup Inventory — Code Side` or `Backup Inventory — Ops Side` were located under the legacy workspace. Backup concepts are fragmented across milestone/checklist documents.

The strongest current synthesis is:

- `/home/bloq/Documents/Block Ops Vault/02 - Operations/Backup and Continuity.md`
- Canonical Wiki destination: `Backup and Continuity`

Do not treat legacy backup requirements as proof of successful backup or restore capability. Current unresolved controls include Supabase export/restore testing, deployment recovery, restricted legal storage, and recurring audit cadence.

## Proposed new canonical pages before final archival

These are required to avoid forcing later lifecycle procedures into unrelated pages:

1. `Recurring Client Support`
2. `Renewal and Expansion`
3. `Client Health and Retention`
4. `Client Offboarding and Access Closure`

Recommended relationships:

- Recurring Client Support → primary `Stakeholder Integration`; secondary `Value Intelligence`, `Digital Platform`, `Human Capital`, `Implementation Bundles`.
- Renewal and Expansion → primary `Stakeholder Integration`; secondary `Value Intelligence`, `Implementation Bundles`.
- Client Health and Retention → primary `Stakeholder Integration`; secondary `Value Intelligence`, `Digital Platform`, `Human Capital`.
- Client Offboarding and Access Closure → primary `Stakeholder Integration`; secondary `Digital Platform`, `Value Intelligence`, `Human Capital`.

## Decisions requiring Samir before migration

The audit reduced the decision set to these business questions:

1. Should the eight-phase model remain as a named **provisional client-delivery lifecycle**, distinct from M1–M5 milestones, or should the stages be renamed/restructured now?
2. Should a concise launch-history page record achieved M1–M5 gates, or should historical milestone evidence remain solely in Mission Control?
3. Retire `Jarvis` as an architecture name, or retain it once as an internal codename?
4. Approve/revise/reject the proposed Day 3/7/14/30 bridge-support cadence.
5. Approve creation and naming of the four missing canonical lifecycle pages above.

Other unresolved issues—pricing, claims, clinical standards, legal posture, support SLAs, renewal targets, retention thresholds, and offboarding terms—can remain explicitly review-gated rather than blocking the structural consolidation.

## Recommended execution order after approval

1. Fix current governance language that still calls Obsidian the working source of truth.
2. Add the four missing canonical lifecycle pages as internal drafts.
3. Merge milestone and operating-system principles into existing canonical pages.
4. Consolidate Phase 1–4 into existing pages, preserving current rules where conflicts exist.
5. Consolidate Phase 5–8 into the new lifecycle pages plus linked technical/risk pages.
6. Merge knowledge-governance metadata rules.
7. Verify every legacy section has a destination or an explicit exclusion reason.
8. Mark migrated legacy pages `archive-reference` with replacement links and dates.
9. Verify live Wiki page count, pillar metadata, links, promotion states, visibility, and no client exposure.
10. Update repository source maps and Obsidian migration log only after live verification.
