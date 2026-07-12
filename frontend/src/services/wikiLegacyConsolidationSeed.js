export const LEGACY_CONSOLIDATION_VERSION = '2026-07-10-v1';

const internalNotice = `> **Internal draft — legacy consolidation pass ${LEGACY_CONSOLIDATION_VERSION}**  
> This page preserves durable operating knowledge recovered from legacy source documents. It is internal-only and review-gated. It does not create a contractual promise, clinical protocol, legal conclusion, billing rule, or verified platform capability.`;

export const LEGACY_CONSOLIDATION_NEW_PAGES = Object.freeze([
  {
    sectionSlug: 'client-delivery-system',
    slug: 'recurring-client-support',
    title: 'Recurring Client Support',
    summary: 'Governed operating model for post-go-live support, review cadence, evidence updates, and support handoffs.',
    status: 'draft',
    owner: 'Samir',
    source: 'Legacy Phase 5 synthesis; Block Ops Wiki consolidation 2026-07-10',
    bodyMd: `# Recurring Client Support

${internalNotice}

## Purpose

Recurring Client Support defines how Block Ops transitions a site from launch stabilization into sustainable ongoing support. It preserves a consistent service rhythm without promising unverified automation, response times, clinical outcomes, or commercial terms.

## Entry gate

A site enters recurring support only after:

- go-live conditions and unresolved exceptions are recorded;
- accountable client and Block Ops contacts are identified;
- approved support scope and escalation channels are documented;
- the active data-capture method is known;
- access, approved-final content, and implementation-bundle configuration are verified;
- critical launch blockers are closed or explicitly accepted by the accountable owner.

## Core operating loop

1. Collect the approved minimum data set through one controlled method.
2. Review engagement, implementation friction, open risks, and support requests.
3. Prepare the support discussion using verified information rather than assumptions.
4. Conduct the review with the appropriate clinical, operational, relationship, and technical participants.
5. Record decisions, owners, deadlines, evidence, and escalations.
6. Route executable follow-up into Mission Control.
7. Update approved content or site configuration only through the applicable review gates.

## Support domains

- **Implementation:** adoption, workflow fit, training reinforcement, and bundle configuration.
- **Stakeholders:** champion continuity, administrator alignment, communication, and escalation.
- **Platform:** access, approved content, data quality, and verified system defects.
- **Clinical knowledge:** questions or update requests routed to qualified clinical review; Block Ops does not replace site clinical governance.
- **Value:** verified trends and client-approved measures; unsupported ROI or outcome claims are prohibited.
- **Risk:** privacy, legal, safety, security, and compliance concerns use the defined escalation path.

## Evidence and knowledge updates

New evidence or requested changes follow this sequence:

Source identified → relevance assessed → applicable qualified review completed → affected content and sites identified → exact version approved → controlled release → notification and audit record.

Indexing, drafting, or agent retrieval does not promote content to approved final.

## Cadence

The exact recurring cadence, response times, participants, and service levels remain site- and agreement-specific until Block Ops approves a universal standard. Mission Control owns current work and deadlines; this page owns the durable procedure.

## Boundaries

- Do not represent draft dashboards, automated alerts, protocol pushes, or agent behavior as implemented until the accountable platform owner verifies the exact capability and records evidence.
- Do not place PHI or client-sensitive information in general Wiki pages.
- Do not treat a support meeting as clinical supervision or transfer of site authority.
- Do not publish pricing, outcome targets, or response guarantees from legacy planning documents.

## Related Pages

- [[Go-Live Verification]]
- [[Client Health and Retention]]
- [[Implementation Bundle Delivery]]
- [[Dashboard]]
- [[Compliance / Risk Controls]]
`,
  },
  {
    sectionSlug: 'strategy-and-growth',
    slug: 'renewal-and-expansion',
    title: 'Renewal and Expansion',
    summary: 'Internal framework for renewal readiness, scope review, evidence-backed expansion, and controlled commercial handoff.',
    status: 'draft',
    owner: 'Samir',
    source: 'Legacy Phase 6 synthesis; Block Ops Wiki consolidation 2026-07-10',
    bodyMd: `# Renewal and Expansion

${internalNotice}

## Purpose

Renewal and Expansion defines how Block Ops evaluates continuation or broader scope without allowing sales pressure to outrun delivery quality, evidence, legal review, or client readiness.

## Renewal readiness

Before a renewal recommendation, review:

- executed scope and current relationship status;
- delivery performance and unresolved commitments;
- stakeholder and champion continuity;
- access, support, and implementation health;
- approved data and evidence relevant to value;
- open legal, clinical, billing, privacy, or platform risks;
- changes requested for the next term.

Renewal timing is agreement-specific until a universal policy is approved. Legacy day-minus timelines are planning references, not current commitments.

## Expansion gate

Expansion should be considered only when:

- the current implementation is stable enough to support broader scope;
- the client has a documented need or opportunity;
- unresolved critical delivery problems are not being masked by a new sale;
- the proposed implementation bundle is defined;
- evidence and claims are approved for the intended use;
- pricing, legal terms, and accountable owners are current;
- the client decision-maker and site owner are identified.

## Expansion workflow

1. Capture the need and source in the canonical Supabase-backed client record.
2. Validate operational, stakeholder, platform, clinical-governance, and value fit.
3. Define the proposed implementation-bundle scope and exclusions.
4. Resolve required internal reviews.
5. Prepare an approved proposal through [[Proposal Workflow]].
6. Record the decision and route accepted work into onboarding and Mission Control.

## Prohibited assumptions

Do not carry forward legacy targets, volume discounts, referral incentives, fixed renewal lead times, automatic annual-report claims, or expansion-rate goals unless they are separately approved and recorded.

## Related Pages

- [[Proposal Workflow]]
- [[Acquisition / Growth Strategy]]
- [[Implementation Bundles]]
- [[Recurring Client Support]]
- [[Client Health and Retention]]
`,
  },
  {
    sectionSlug: 'client-delivery-system',
    slug: 'client-health-and-retention',
    title: 'Client Health and Retention',
    summary: 'Internal framework for detecting implementation risk, coordinating intervention, and preserving client continuity.',
    status: 'draft',
    owner: 'Samir',
    source: 'Legacy Phase 7 synthesis; Block Ops Wiki consolidation 2026-07-10',
    bodyMd: `# Client Health and Retention

${internalNotice}

## Purpose

Client Health and Retention defines how Block Ops detects and responds to relationship, implementation, stakeholder, platform, payment, and support risk. It does not create automatic scores, alerts, or service-level guarantees.

## Health signals

Potential signals include:

- reduced stakeholder engagement or missed agreed reviews;
- implementation or documentation processes no longer being maintained;
- unresolved support requests or repeated defects;
- champion fatigue, departure, or unclear succession;
- administrator, surgeon, anesthesia, nursing, or technical conflict;
- access or approved-content problems;
- material payment or contract concerns;
- new privacy, safety, legal, or compliance risk.

Signals are prompts for human review, not automatic conclusions.

## Intervention record

Every intervention should identify:

- the observed signal and supporting evidence;
- severity and affected scope;
- one accountable owner;
- collaborators and escalation path;
- immediate containment, if needed;
- root-cause hypothesis and validation plan;
- actions, deadlines, and review date;
- client communication owner;
- outcome and any resulting operating-system change.

Current tasks and deadlines belong in Mission Control. The Wiki preserves the repeatable method.

## Champion continuity

A potential champion departure triggers a continuity review covering relationship ownership, site authority, access, training, approved content, open work, and whether service can continue safely within scope. No universal 24/48-hour deadline or automatic successor rule is established by this draft.

## Escalation boundaries

- Clinical and safety issues go to the accountable site owner and qualified clinical review path.
- Contract, payment, termination, privacy, and legal issues follow approved legal/commercial controls.
- Technical incidents follow verified platform and incident-response procedures.
- A health signal alone does not authorize account suspension or offboarding.

## Related Pages

- [[Recurring Client Support]]
- [[Dashboard]]
- [[Status Rules]]
- [[Compliance / Risk Controls]]
- [[Client Offboarding and Access Closure]]
`,
  },
  {
    sectionSlug: 'client-delivery-system',
    slug: 'client-offboarding-access-closure',
    title: 'Client Offboarding and Access Closure',
    summary: 'Controlled internal process for service closure, access changes, data handling, handoff, and lessons learned.',
    status: 'draft',
    owner: 'Samir',
    source: 'Legacy Phase 8 synthesis; Block Ops Wiki consolidation 2026-07-10',
    bodyMd: `# Client Offboarding and Access Closure

${internalNotice}

## Purpose

Client Offboarding and Access Closure provides a controlled end-of-service procedure. Contract terms, law, legal hold, privacy obligations, site policy, and approved data-retention rules override any generic step here.

## Entry conditions

Offboarding begins only when the authorized business/legal decision and effective date are recorded. A client-health concern alone does not authorize termination, suspension, deletion, or access revocation.

## Controlled workflow

1. Confirm decision authority, reason, scope, effective date, and required reviewers.
2. Assign one accountable offboarding owner and identify legal, relationship, clinical-governance, and technical collaborators.
3. Inventory accounts, roles, integrations, approved content, site configuration, open tasks, physical materials, and data obligations.
4. Agree on the client communication and transition plan.
5. Execute access changes through verified platform procedures with evidence.
6. Export, retain, return, restrict, or delete data only according to approved policy and agreement.
7. Complete required handoff and close or transfer open work.
8. Record completion evidence, exceptions, and unresolved obligations.
9. Conduct an exit review and route lessons into the applicable Wiki page, decision record, or Mission Control task.

## Required controls

- No plaintext credential exchange.
- Preserve least-privilege and exact-site boundaries during transition.
- Do not promise that data is simply “archived”; specify approved disposition and evidence.
- Do not assume the client keeps or loses particular materials without current license/contract terms.
- Do not continue dormant marketing contact without an approved relationship and communications basis.
- Re-entry terms, fees, and new minimum commitments require separate commercial and legal approval.

## Completion evidence

The closeout record should identify accounts changed, data disposition, content/license status, open exceptions, client confirmation where required, owner, reviewer, date, and evidence location.

## Related Pages

- [[Client Portal]]
- [[Supabase Data Model]]
- [[Legal Review Index]]
- [[Compliance / Risk Controls]]
- [[Decision Log / Historical Archive]]
`,
  },
  {
    sectionSlug: 'archive-decisions-history',
    slug: 'launch-history-m1-m5',
    title: 'Launch History — M1 through M5',
    summary: 'Concise internal history of the approved M1–M5 launch gates and the role of Mission Control evidence.',
    status: 'draft',
    owner: 'Samir',
    source: 'Legacy milestone-map consolidation; approved naming recorded 2026-07-10',
    bodyMd: `# Launch History — M1 through M5

${internalNotice}

## Purpose

This page preserves the approved launch-gate vocabulary after consolidation of multiple planning-era milestone maps. It is a historical index, not the source for current task status or completion evidence. Mission Control remains the execution record.

## Approved milestone ladder

- **M1 — Mock Client Lead-to-Live Run:** prove that the built process can move realistic mock clients through the operating path and expose friction.
- **M2 — Foundational Client Ready:** establish the operational, QA, document, platform, legal-review, automation, and support foundation needed to begin responsibly.
- **M3 — External Validation Completed:** complete external validation, including the required attending review/test, and capture resulting decisions and remediation.
- **M4 — Foundational Client Completed:** complete the foundational-client engagement and record the operating lessons and evidence.
- **M5 — Paid Client Onboarded:** onboard a paid client through the approved process and record the supporting evidence.

## Status authority

This page does not assert current milestone completion. Exact status, completion evidence, tasks, owners, dependencies, and dates must be read from Mission Control and the associated decision records rather than reconstructed from legacy Markdown plans.

## Superseded structures

The former ten-step launch ladder, Jarvis milestone ladder, M1–M10 task-board labels, and planning-era M3/M4 definitions are retained only in archived source documents. They must not be used as current milestone truth.

## Governance

- Milestones are outcome gates, not task lists.
- Workflows organize related work.
- Mission Control tasks are executable units with exactly one primary owner.
- Legal, compliance, clinical, evidence, platform, and client-approval gates remain applicable even when a milestone is historically complete.
- A historical completion does not prove every related control remains implemented or effective today.

## Related Pages

- [[Block Ops Operating System]]
- [[Mission Control]]
- [[Decision Log / Historical Archive]]
- [[Go-Live Verification]]
`,
  },
]);

const block = (heading, body) => `<!-- legacy-consolidation:${LEGACY_CONSOLIDATION_VERSION}:start -->\n## ${heading}\n\n${body.trim()}\n<!-- legacy-consolidation:${LEGACY_CONSOLIDATION_VERSION}:end -->`;

export const LEGACY_CONSOLIDATION_PAGE_ADDITIONS = Object.freeze({
  'Block Ops Operating System': block('Consolidated operating doctrine', `Legacy launch and Jarvis planning documents have been consolidated into the current operating model.

- Milestones are outcome gates; workflows organize related work; tasks are executable units.
- Mission Control owns current status, dependencies, evidence, and exactly one primary owner per task.
- The approved launch vocabulary is M1 through M5 as recorded in [[Launch History — M1 through M5]].
- The former ten-step and Jarvis milestone ladders are archive references, not parallel operating structures.
- New information may unlock, relock, reprioritize, or invalidate work; completion percentage alone does not prove readiness.
- The legacy eight-phase model is retained only as a provisional client-delivery lifecycle, distinct from launch milestones and subordinate to current Wiki doctrine.`),
  'Mission Control Rules': block('Recovered dependency and accountability rules', `Legacy adaptive-operations specifications reinforce the current rules:

- one accountable primary owner per task; collaborators do not dilute ownership;
- milestones and tasks are different object types;
- dependencies and gates must be explicit;
- work can return to waiting, blocked, or review when new evidence changes readiness;
- legal and compliance requirements are real gates rather than side notes;
- current execution state belongs in Mission Control, never in a copied Markdown task board.`),
  'Roles and Ownership': block('Lifecycle accountability', `Legacy playbooks are useful for role separation but do not override live ownership.

- Clinical direction, relationship ownership, platform work, and operating-memory work are distinct lanes.
- Named-person assignments in archived plans are historical defaults only.
- Every current Mission Control task requires exactly one primary owner.
- Client clinical governance, credentialing, supervision, and patient-care authority remain with the accountable client/site organization.`),
  'Qualification and Discovery': block('Recovered qualification doctrine', `The legacy Phase 1 sources add durable principles without carrying forward their fixed thresholds:

- assess facility type, surgical mix, operating maturity, champion capacity, stakeholder alignment, decision authority, and practical implementation fit;
- research should be targeted, documented, and used to prepare a concise Prospect Brief;
- use Go, Defer, Need More Information, or Pass rather than allowing commercial enthusiasm to erase clinical or operating concerns;
- numeric score thresholds, Champion tiers, hard geography/size exclusions, and pre-engagement clinical probing remain unapproved unless separately reviewed;
- current CRM stages and [[Outreach Sequence]] override legacy labels and cadence.`),
  'Acquisition / Growth Strategy': block('Recovered quality-over-volume principle', `Legacy lead-generation material contributes one durable principle: prioritize a small number of well-researched, high-fit prospects over uncontrolled volume. Facility dossiers and contextual outreach should support—but not replace—the current CRM, qualification, outreach, privacy, and review rules.`),
  'Proposal Workflow': block('Legacy proposal controls retained', `Useful legacy proposal doctrine is retained with current safeguards:

- proposals should be facility-specific and connect readiness, scope, timeline, implementation bundles, exclusions, investment, and review path;
- evidence, ROI, reimbursement, throughput, opioid, discharge, and revenue claims require the applicable evidence, legal, clinical, and billing/compliance review;
- legacy pricing, milestone-payment, subscription, founding-partner, and discount assumptions are not current merely because they appear in an old playbook;
- agreement and required authorization precede onboarding.`),
  'Client Onboarding': block('Recovered configuration and handoff controls', `Legacy pre-visit material reinforces controlled contract-to-onboarding handoff, one accountable owner, verified site/contact records, explicit configuration inputs, and documented access/readiness blockers. Current invitation/reset-password controls and approved-final-only client content override legacy plaintext credential and email-attachment practices.`),
  'Implementation Bundle Delivery': block('Recovered customization controls', `Legacy customization material is retained only through the current model:

- foundation deliverables form the universal baseline;
- implementation bundles and site configuration adapt the baseline without mutating global truth;
- every released representation requires applicable version, owner, source, review, approval, and site-scope evidence;
- old “Block Pack,” fixed-count, universal-clinical-default, and internal-review-only assumptions are superseded.`),
  'Training Day Readiness': block('Recovered training evidence doctrine', `Legacy on-site training plans reinforce hands-on preparation, role-specific readiness, structured evidence capture, explicit blockers, and post-session actions. Detailed treatment protocols, drug/dose guidance, monitoring thresholds, person-specific scope exceptions, photography, and competency claims remain outside this general operating page unless qualified review and site approval are recorded.`),
  'Go-Live Verification': block('Bridge-support consolidation', `The legacy Day 3/7/14/30 bridge sequence is preserved as a proposed planning cadence, not mandatory policy. Exact timing, participants, data set, response expectations, and transition to recurring support remain agreement- and site-specific until approved. Durable requirements are named owners, early follow-up, evidence-backed blockers, controlled escalation, and a documented handoff to [[Recurring Client Support]].`),
  'Dashboard': block('Client-health display boundary', `Legacy support and churn documents describe useful signals—engagement, implementation activity, unresolved support, champion continuity, access, payment, and risk—but do not prove that automated scoring or alerts exist. Dashboard may summarize verified health information; [[Client Health and Retention]] owns the business process, and Max must verify any live calculation or automation.`),
  'Block Ops Wiki / Compendium': block('Knowledge-layer consolidation', `Legacy layer-architecture material is preserved through explicit governance rather than a second top-level “three-layer” doctrine.

- Human-readable deliverables, reasoning-rich agent knowledge, and site configuration are distinct representations.
- Agent knowledge should preserve rationale, exceptions, boundaries, rejected inferences, and negative knowledge.
- Raw internal reasoning must not automatically enter client agents.
- Site-specific staffing, formulary, equipment, workflow, and escalation choices must not mutate global standards.
- Promotion state, visibility, review gates, scope, representation type, and client-safe/agent-facing metadata control exposure.
- The Block Ops Wiki is canonical organizational knowledge; Obsidian is optional drafting, staging, and backup context.`),
  'Block Ops Wiki Content Migration': block('Current authority hierarchy', `The consolidation pass supersedes earlier wording that treated Obsidian as the working source of truth.

- The Block Ops Wiki is canonical organizational knowledge.
- Live Supabase is canonical for application and execution state.
- Mission Control owns current tasks, owners, dependencies, milestones, and completion evidence.
- Obsidian is optional drafting, staging, and backup context.
- Legacy workspace files remain provenance until their durable content is migrated, verified, and marked archive-reference.`),
  'Backup and Continuity': block('Legacy backup claims reconciled', `Legacy checklists describe backup requirements but do not prove a working backup or restore path. Current continuity evidence must identify the protected system, timestamp, owner, integrity result, restore test, RPO/RTO, exception state, and comparison with live truth. Supabase export/restore, deployment recovery, restricted legal storage, and recurring audit cadence remain review items until verified.`),
  'Decision Log / Historical Archive': block('Legacy consolidation decision', `On 2026-07-10, Samir approved consolidation of the old Knowledge, SOPs, and Scripts collection into the current Wiki. The approved defaults were:

- retain the eight-phase model only as a provisional client-delivery lifecycle distinct from M1–M5;
- preserve a concise M1–M5 launch-history page;
- retire Jarvis as a parallel architecture name;
- retain Day 3/7/14/30 bridge support as proposed rather than mandatory;
- create governed pages for recurring support, renewal/expansion, client health/retention, and offboarding/access closure;
- archive source pages only after useful material is mapped and verified.`),
  'Mission Control': block('Wiki consolidation extension', `The 2026-07-10 legacy consolidation increased the governed live Wiki from 43 to 48 pages. The five additions are internal drafts and do not change historical M1-WIKI-11 or M1-WIKI-13 completion counts. Current Wiki page inventory and cross-link verification belong to the live Wiki governance scripts; current execution state remains in Mission Control.`),
  'Block Ops Wiki Go-Live Readiness Matrix': block('2026-07-10 consolidation extension', `The governed live baseline is now **48 pages** after adding five internal-draft consolidation pages. All 48 have one valid primary pillar, governed cross-links, and internal-only treatment. The original M1-WIKI-13 42-page candidate audit remains a historical baseline; the five added pages are permanent-internal sources and were not promoted or made client-visible.`),
  'Block Ops Wiki Six-Pillar Page Map': block('2026-07-10 map extension', `The current governed live baseline is **48 pages**. The original 43-page map remains historical context; these five pages were added with fail-closed pillar metadata:

| Page | Primary pillar | Secondary pillars |
|---|---|---|
| [[Recurring Client Support]] | Stakeholder Integration | Value Intelligence; Digital Platform; Human Capital; Implementation Bundles |
| [[Renewal and Expansion]] | Stakeholder Integration | Value Intelligence; Implementation Bundles |
| [[Client Health and Retention]] | Stakeholder Integration | Value Intelligence; Digital Platform; Human Capital |
| [[Client Offboarding and Access Closure]] | Stakeholder Integration | Digital Platform; Value Intelligence; Human Capital |
| [[Launch History — M1 through M5]] | Human Capital | Digital Platform; Value Intelligence |

No backend section was renamed and no page was promoted to client-visible.`),
  'Wiki Cross-Linking Map': block('2026-07-10 graph extension', `The governed graph now covers **48 pages** and **246 related-page links** across six indexes. Verification found no broken links, orphan pages, pages without outbound links, client-leak paths, or status changes.`),
  'Block Ops Wiki Client-Facing Candidate Register': block('2026-07-10 candidate-register extension', `Five internal-draft pages were added during the legacy consolidation: [[Recurring Client Support]], [[Renewal and Expansion]], [[Client Health and Retention]], [[Client Offboarding and Access Closure]], and [[Launch History — M1 through M5]]. All five are classified **permanent-internal** for this pass. They were not nominated, promoted, or exposed to clients. The original 42-page M1-WIKI-13 table remains the historical audit baseline; this extension brings the governed live Wiki to 48 pages including this register.`),
});
