import { FUTURE_PRODUCT_DEPENDENCIES, FUTURE_PRODUCT_TASKS } from './futureProductTaskSeed.js';
import { MILESTONE_BOUNDARY_DEPENDENCIES, MILESTONE_BOUNDARY_TASKS } from './milestoneBoundaryTaskSeed.js';

export const CANONICAL_LAUNCH_MILESTONES = [
  {
    "slug": "m1-mock-run-build-ready",
    "title": "Mock Client Lead-to-Live Run",
    "description": "M1 rehearses the complete lead-to-mock-live path and proves how safety infrastructure, staffing and site roles, procurement, agreement, payment, and readiness inputs are collected, recorded, checked, and routed through mock downstream gates.",
    "status": "in_progress",
    "owner": "Max",
    "sortOrder": 1,
    "readinessScore": 20,
    "gateNotes": "M1 proves the mock workflow and gate logic only. It does not establish real-client legal, billing, clinical, training, support, portal, data, or site readiness; those are finalized and internally/mock verified in M2."
  },
  {
    "slug": "m2-mock-run-complete",
    "title": "Foundational Client Ready",
    "description": "The team can responsibly accept a real foundational client because deliverables, site-readiness and role intake, procurement, lawyer-finalized agreements, billing/payment operations, portal/data systems, training, go-live, and support controls are complete and internally/mock verified.",
    "status": "locked",
    "owner": "Max",
    "sortOrder": 2,
    "readinessScore": 2,
    "gateNotes": "M2 is the real-client readiness buildout gate: required forms, deliverables, legal documents, commercial operations, site/role/procurement pathways, portal/data systems, training, go-live, support, and applicable starter products must be final, governed, built, and internally/mock validated. External attending validation is M3; foundational-client execution is M4; paid-client onboarding is M5."
  },
  {
    "slug": "m3-trusted-anesthesiologist-validation",
    "title": "External Validation Completed",
    "description": "Outside attending anesthesiologists have reviewed the system, the test is passed, and the validation loop is complete.",
    "status": "locked",
    "owner": "Samir",
    "sortOrder": 3,
    "readinessScore": 0,
    "gateNotes": "M3 is the external validation gate: the attending review is complete and the system passed the test."
  },
  {
    "slug": "m4-validation-closed",
    "title": "Foundational Client Completed Successfully",
    "description": "The first foundational client has been onboarded and delivered successfully with the core operating system proven in practice.",
    "status": "locked",
    "owner": "Samir",
    "sortOrder": 4,
    "readinessScore": 0,
    "gateNotes": "M4 closes the foundational client loop and proves the system can run end to end."
  },
  {
    "slug": "m5-founding-partner-ready",
    "title": "Paid Client Onboarded Successfully",
    "description": "A paid client has been onboarded successfully and the system is operating in real delivery.",
    "status": "locked",
    "owner": "Adrian",
    "sortOrder": 5,
    "readinessScore": 0,
    "gateNotes": "M5 is the paid client onboarding gate: real delivery is now underway."
  }
];

export const CANONICAL_MILESTONES = CANONICAL_LAUNCH_MILESTONES.map((milestone) => ({
  ...milestone,
  code: /^m(\d+)-/i.test(milestone.slug) ? `M${milestone.slug.match(/^m(\d+)-/i)[1]}` : '',
}));

export const CANONICAL_LAUNCH_TASKS = [
  {
    "taskKey": "M1-03",
    "title": "Map the two lead pipelines",
    "description": "Document the AI chat lead path and Adrian's network lead path from first touch to intake.",
    "primaryOwner": "Adrian",
    "status": "done",
    "priority": "critical",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 30
  },
  {
    "taskKey": "M1-04",
    "title": "Define high-level mock-client test paths",
    "description": "Approved 2026-07-21: M1 uses seven primary mock leads plus one deliberate duplicate-entry attempt. Four distinct sources—AI chatbot, Adrian manual entry, Contact Us, and direct email—must reach mock Live through different journeys. Three additional leads prove early not-fit, permanent no-response, and late-stage decline endings. The duplicate attempt tests merge/link and duplicate-client prevention; it is not an eighth prospect. Detailed scenario inputs remain a controlled near-closeout task.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 40
  },
  {
    "taskKey": "M1-05",
    "title": "Capture AI chat leads into the CRM",
    "description": "Make sure web chat inquiries land in the CRM with the right fields and ownership.",
    "primaryOwner": "Max",
    "status": "done",
    "priority": "critical",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 50
  },
  {
    "taskKey": "M1-06",
    "title": "Capture Adrian network leads into the CRM",
    "description": "Make sure Adrian can enter referrals and network leads into the same CRM flow.",
    "primaryOwner": "Adrian",
    "status": "done",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 60
  },
  {
    "taskKey": "M1-07",
    "title": "Define the CRM record and stage model",
    "description": "Set the lead fields, statuses, ownership, notes, and pipeline stages needed for the mock client.",
    "primaryOwner": "Max",
    "status": "done",
    "priority": "critical",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 70
  },
  {
    "taskKey": "M1-LC-06",
    "title": "Define lead source categories",
    "description": "Samir approved the M1 taxonomy: website/contact form, AI chat, Adrian network, Samir network, referral, manual entry, and other. Later-use categories may remain available but do not expand the M1 test gate. Max must verify the live CRM options and stored values before closeout.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 75
  },
  {
    "taskKey": "M1-LC-07",
    "title": "Define minimum required lead fields",
    "description": "M1 rule locked: a lead may be saved with at least one identity (contact or facility), source, owner, status, next action, and next follow-up date. Contact details and context are captured when known but are not save blockers; incomplete legitimate leads route to Needs Review. Max must verify live CRM behavior.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 76
  },
  {
    "taskKey": "M1-LC-08",
    "title": "Define duplicate lead rule",
    "description": "Samir-approved rule: suspected duplicates move to Needs Review; the system may suggest but never auto-merge or delete; exact email/phone matches are strong signals while similar names are warnings; the same person at multiple facilities is not automatically a duplicate; outreach pauses until review; the reviewer chooses merge, link, or keep separate; and all sources, notes, communications, owners, attachments, timestamps, and audit history are preserved. Max must verify the live CRM behavior.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 77
  },
  {
    "taskKey": "M1-LC-09",
    "title": "Define lead handoff from capture to outreach",
    "description": "Samir-approved rule: a lead enters Contact Needed and Adrian's outreach queue only after the minimum record exists, source and owner are recorded, duplicate/spam/fit concerns are resolved, the lead is no longer in Needs Review, the first channel is identified, and the first action and due date are assigned. The Day 0-2 clock starts at Contact Needed; source paths share the gate but may use different channels/messages; handoff does not mean qualified, interested, or proposal-ready. Adrian must validate the operating flow.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 78
  },
  {
    "taskKey": "M1-LC-10",
    "title": "Test lead capture flow with mock entries",
    "description": "Run mock leads through each source path and confirm they land in the correct CRM/workflow bucket.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 79
  },
  {
    "taskKey": "M1-LC-11",
    "title": "Confirm manual lead entry does not trigger automatic email",
    "description": "Verify Adrian manual lead entry captures the lead without sending the website auto-acknowledgment email; manual outreach should remain intentional.",
    "primaryOwner": "Adrian",
    "status": "done",
    "priority": "high",
    "workstream": "Lead Capture",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 80
  },
  {
    "taskKey": "M1-08",
    "title": "Prepare the sales materials package",
    "description": "Gather the brochures, one-pagers, decks, and info sheets the lead receives after capture.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 81
  },
  {
    "taskKey": "M1-09",
    "title": "Define the follow-up workflow and schedule",
    "description": "Adrian-approved M1 follow-up workflow: first touch Day 0–2, follow-up 1 after 3–4 business days, default no-response cadence through business day 10, and 7-business-day fast lane for warm/referral/high-intent leads. Remaining follow-up: materials by touchpoint and finer channel-use details.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "critical",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 90
  },
  {
    "taskKey": "M1-OS-03",
    "title": "Define outreach start trigger",
    "description": "Drafted in Obsidian Outreach Sequence page: starts after Lead Capture creates/updates CRM record with source, owner, status, next action, first due date, and context; Needs Review blocks outreach until resolved.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 91
  },
  {
    "taskKey": "M1-OS-04",
    "title": "Write first-touch email script",
    "description": "Create the first outbound email for a qualified captured lead.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 92
  },
  {
    "taskKey": "M1-OS-05",
    "title": "Write first-touch text script",
    "description": "Create the first text message for warm/network leads where texting is appropriate.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 93
  },
  {
    "taskKey": "M1-OS-06",
    "title": "Define follow-up 3–4 business-day touch",
    "description": "Approved follow-up rule: if there is no response 3–4 business days after first touch, send a follow-up through the best available channel; optionally call when a phone number exists and the lead's warmth or value justifies it; keep the lead Contacted and update attempt, owner, channel, last-contact, and next-follow-up data.",
    "primaryOwner": "Adrian",
    "status": "done",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 94
  },
  {
    "taskKey": "M1-OS-07",
    "title": "Define final nudge timing",
    "description": "Approved final-nudge rule: use business day 7–8 for the default cadence and business day 5 for warm, referral, or high-intent fast-lane leads; send a final value-focused close-the-loop email by default, with an optional call only for warm or high-value leads, then prepare an unanswered lead for the governed no-response review.",
    "primaryOwner": "Adrian",
    "status": "done",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 95
  },
  {
    "taskKey": "M1-OS-08",
    "title": "Define Day 10 close-loop / nurture rule",
    "description": "Approved M1 rule: after 3 unanswered attempts over the default 10-business-day cadence or approved 7-business-day fast lane, move the lead to No Response / Stalled, stop active outreach, preserve full history, owner, and last contact date, and assign a next review date. Use Nurture / Recycle Later only with a specific reason and re-entry trigger; Future Market / Geography remains a structured hold reason. Silence alone is never Not Fit.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 96
  },
  {
    "taskKey": "M1-OS-09",
    "title": "Define call attempt rule",
    "description": "Approved channel rule: website/contact/AI-chat leads are call-first when a phone number exists and email-first otherwise; Adrian/network leads use relationship judgment; referrals use referral context and are not text-first unless warm or permissioned; most cold/manual leads are email-first, with calling reserved for strategic/high-value leads with a supplied phone number and likely correct contact.",
    "primaryOwner": "Adrian",
    "status": "done",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 97
  },
  {
    "taskKey": "M1-OS-10",
    "title": "Define interested-lead handoff",
    "description": "Approved: Adrian remains the relationship owner after a positive response and decides when the lead is ready to include Samir. Samir is not automatically added to every Initial Fit Conversation, and interest alone does not bypass the Opportunity Review or Client Assessment Meeting or trigger Proposal Preparation.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 98
  },
  {
    "taskKey": "M1-OS-11",
    "title": "Define not-interested response handling",
    "description": "Approved reason-based rule: timing, budget, priorities, or leadership-readiness objections move to Nurture / Recycle Later with a reason, owner, and review date; explicit do-not-contact or firm permanent rejection moves to Closed / Not Interested with future outreach suppressed; clear mismatch with Block Ops' target or offering moves to Not Fit with the disqualifying reason; and geography limitations use Nurture / Recycle Later with Future Market / Geography. Preserve full history in every path.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 99
  },
  {
    "taskKey": "M1-OS-12",
    "title": "Test outreach sequence with mock client",
    "description": "Run a mock lead through the full outreach sequence and verify each state shows correctly.",
    "primaryOwner": "Bloq",
    "status": "ready",
    "priority": "high",
    "workstream": "Outreach Sequence",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 100
  },
  {
    "taskKey": "M1-CL-01",
    "title": "Define communication logging threshold",
    "description": "Approved M1 standard: manually log every meaningful external touch across every channel when it creates or changes relationship context, pipeline status, next action, follow-up timing, materials sent, meeting status, ownership, or decision history. Low-value threads may be summarized and system noise need not be recreated manually. Future target: automatically capture every external interaction in one complete omnichannel timeline when integrations make that low-overhead.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Client Communication Log",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 110
  },
  {
    "taskKey": "M1-CL-02",
    "title": "Define communication log required fields",
    "description": "Samir approved a core-plus-conditional model. Always require lead/client record, date/time, team owner, channel, direction, brief summary, and outcome. When applicable require contact/facility, source/context, materials, status movement, next action/owner/due date, objection or disposition reason, sensitivity flags, and source message/external interaction ID for automated capture. Never force empty, guessed, or fabricated values. Max must verify the live schema and form behavior.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Client Communication Log",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 111
  },
  {
    "taskKey": "M1-CL-03",
    "title": "Connect communication entries to CRM stage movement",
    "description": "Approved business rules are documented in Obsidian: first outreach moves Contact Needed to Contacted; positive replies move toward discovery; no-response thresholds move to No Response / Stalled with preserved history and a review date; temporary timing/budget/priority/readiness objections move to Nurture with a reason and review date; do-not-contact or firm permanent rejection moves to Closed / Not Interested with outreach suppressed; and actual mismatch moves to Not Fit with a reason. Max must verify CRM implementation.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Client Communication Log",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 112
  },
  {
    "taskKey": "M1-CL-04",
    "title": "Test communication log with both mock-client paths",
    "description": "Executed 2026-07-18 with website and Adrian/network live mock leads. Nine durable lead_notes preserve communication, qualification, brief, and decision history, but fields are prose-only and protected admin UI visibility could not be verified. Keep in review until Max implements structured history and Bloq visually retests.",
    "primaryOwner": "Bloq",
    "status": "review",
    "priority": "high",
    "workstream": "Client Communication Log",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 113
  },
  {
    "taskKey": "M1-QD-01",
    "title": "Define Initial Fit Conversation question bank",
    "description": "Samir-approved business model: every 15–20 minute Initial Fit Conversation covers five core areas—trigger/desired improvement, facility/surgical opportunity, current block activity/inconsistency, champion/stakeholder posture, and decision path/timing/next step—with conditional prompts used only when relevant or decision-changing. Unknowns remain explicit; Adrian must validate the sales language before closeout.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "high",
    "workstream": "Qualification and Discovery",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 120
  },
  {
    "taskKey": "M1-QD-02",
    "title": "Define qualification scoring and disqualifiers",
    "description": "Approved hybrid qualification model: confirmed hard stops are screened first; eight fit factors are rated 0–2 with Unknown kept separate; the 16-point score guides but does not determine Advance, Advance with Conditions, Need More Information, Nurture, or Pass. Material overrides require a short rationale.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Qualification and Discovery",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 121
  },
  {
    "taskKey": "M1-QD-03",
    "title": "Define prospect brief requirements",
    "description": "Samir approved Model B on 2026-07-18: one living Prospect Brief begins as a concise opportunity snapshot after the Initial Fit Conversation and expands only when the lead advances toward a Client Assessment Meeting. Stage 1 captures CRM/conversation facts, qualification, flags/unknowns, disposition, and one owned next action; Stage 2 adds only decision-relevant research, preliminary implementation hypotheses, and questions for Samir. Adrian must validate sales practicality; Max must separately verify a no-duplicate-entry CRM implementation.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "high",
    "workstream": "Qualification and Discovery",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 122
  },
  {
    "taskKey": "M1-QD-04",
    "title": "Define Client Assessment Meeting question banks",
    "description": "Approved: the Client Assessment Meeting is required before Proposal Preparation; all five assessment areas must be answered or explicitly unresolved, and material unknowns block proposal creation until resolved.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Qualification and Discovery",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 123
  },
  {
    "taskKey": "M1-QD-05",
    "title": "Test fit and assessment journey with mock-client paths",
    "description": "Executed 2026-07-18 against two live Supabase mock leads: website path cd4a03e5-2f50-4805-adec-207e8c460593 reached Need More Information with Stage 1 brief; Adrian/network path ecfb59c9-7fba-4938-b5c3-4b335bb744cf reached Client Assessment Meeting and Advance with Conditions with Stage 1/2 brief. Operating flow passed, but source/status taxonomy, structured communication/qualification/brief fields, and protected admin UI verification remain Max-owned blockers.",
    "primaryOwner": "Bloq",
    "status": "review",
    "priority": "high",
    "workstream": "Qualification and Discovery",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 124
  },
  {
    "taskKey": "M1-PW-01",
    "title": "Define proposal request requirements",
    "description": "Drafted in Obsidian Proposal Workflow page: facility, ORs, surgical mix, current block activity, champion, package, pain points, heatmap inputs, pricing tier, desired start date, and special concerns. Needs Adrian/Max review.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "high",
    "workstream": "Proposal Workflow",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 130
  },
  {
    "taskKey": "M1-PW-02",
    "title": "Define proposal page structure",
    "description": "Drafted in Obsidian Proposal Workflow page: cover, executive summary, site readiness heatmap, procedure opportunity, deliverables, timeline, investment, ROI caveat, About Block Ops, and next steps. Needs Samir/Adrian/Max review.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Proposal Workflow",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 131
  },
  {
    "taskKey": "M1-PW-03",
    "title": "Define proposal claim and pricing review rules",
    "description": "Approved internal rule: M1 uses labeled mock pricing; real pricing requires Samir approval; claims distinguish evidence, client data, and assumptions; outcome guarantees are prohibited; Adrian verifies sales accuracy; legal review is triggered by new sensitive claims or nonstandard terms.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Proposal Workflow",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 132
  },
  {
    "taskKey": "M1-PW-04",
    "title": "Test proposal workflow with mock-client paths",
    "description": "Run website/AI-chat and Adrian/network mock leads through proposal request, draft proposal review, proposal sent status, and follow-up task creation.",
    "primaryOwner": "Bloq",
    "status": "ready",
    "priority": "high",
    "workstream": "Proposal Workflow",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 133
  },
  {
    "taskKey": "M1-SMS-01",
    "title": "Define approved sales positioning spine",
    "description": "Samir approved the internal positioning spine: Block Ops turns regional anesthesia from a person-dependent skill set into a repeatable site-level program by building the training, workflows, safety infrastructure, implementation support, and measurement system around nerve blocks. Adrian must complete sales-language validation before overall closeout.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "high",
    "workstream": "Sales Materials and Scripts",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 140
  },
  {
    "taskKey": "M1-SMS-02",
    "title": "Define first-touch and follow-up script set",
    "description": "Drafted in Obsidian Sales Materials and Scripts page: warm network, referral, website/AI-chat, manual prospect, Day 2-3 follow-up, Day 5-7 follow-up, close-loop, nurture, and polite pass scripts. Needs Adrian review.",
    "primaryOwner": "Adrian",
    "status": "review",
    "priority": "high",
    "workstream": "Sales Materials and Scripts",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 141
  },
  {
    "taskKey": "M1-SMS-03",
    "title": "Define sales material approval statuses",
    "description": "Approved M1 baseline: Internal Draft, Internal Review, Legal Review Required only when triggered, Approved Final, and Archived/Superseded. Only Approved Final may be sent externally; approval records the exact version, approvers, and dates; editing an approved item creates a new Internal Draft requiring review again. Test in the mock workflow and adjust from operating evidence.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",

    "workstream": "Sales Materials and Scripts",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 142
  },
  {
    "taskKey": "M1-SMS-04",
    "title": "Test scripts and materials with mock-client paths",
    "description": "Use the drafted inbound and warm-network scripts in the M1 mock-client paths, verify script/material used is logged, and confirm unsupported claims are avoided.",
    "primaryOwner": "Bloq",
    "status": "ready",
    "priority": "high",
    "workstream": "Sales Materials and Scripts",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 143
  },
  {
    "taskKey": "M1-OM-01",
    "title": "Define Block Ops operating system layers",
    "description": "Approved operating model: Supabase is canonical live business truth; the internal Wiki is the governed readable knowledge view; Mission Control owns execution; Dashboard is the calm summary; the client portal exposes approved-final client-safe content and KPIs; Obsidian is the agent-optimized knowledge mirror, authoring workspace, source context, and continuity layer; GitHub is the code/version/recovery layer. Obsidian and seeds cannot overwrite newer verified live state.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 150
  },
  {
    "taskKey": "M1-OM-02",
    "title": "Define roles and task ownership rules",
    "description": "Approved ownership model: milestones are shared; workflows organize; every task has exactly one accountable owner; collaborators are optional; executor and reviewer roles are distinct; unknown ownership routes temporarily to Samir for reassignment; and done requires evidence plus applicable review. Full RACI is deferred unless operating evidence shows it is needed.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 151
  },
  {
    "taskKey": "M1-OM-03",
    "title": "Define Mission Control operating rules",
    "description": "Drafted in Obsidian Mission Control Rules page: Mission Control tracks milestones, workflows, tasks, owners, priorities, statuses, blockers, dependencies, and source links; Dashboard stays separate. Needs Max/Samir review.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 152
  },
  {
    "taskKey": "M1-OM-04",
    "title": "Define weekly ops review cadence",
    "description": "Samir-approved activation model: no mandatory weekly review through M3; current work stays continuous and milestone- or decision-driven. Activate a lightweight client-implementation review in M4, retain it in M5 and later only while active client work justifies it, and pause it otherwise. Bloq prepares the operating record; Samir handles only business decisions; routine updates stay in Mission Control.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "medium",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 153
  },
  {
    "taskKey": "M1-OM-05",
    "title": "Define decision capture rules",
    "description": "Samir-approved two-lane rule: valuable ideas, brainstorming, possibilities, and unanswered questions are preserved in Ideas and Explorations with Captured, Exploring, Parked, Promoted, or Retired state; approved choices become concise decision records; only promoted actionable work enters Mission Control. Supabase is canonical, the internal Wiki is the governed readable view, and Obsidian is the brainstorming workspace and mirror.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "medium",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 154
  },
  {
    "taskKey": "M1-OM-06",
    "title": "Define status rules by object type",
    "description": "Samir-approved business architecture: knowledge, ideas/explorations, Mission Control tasks, and deliverables use separate status systems; client visibility is an independent permission; knowledge uses Internal Draft, Review Required, Current Internal, and Archived/Superseded; Mission Control does not use this_week without a real dated cadence; and done does not make output approved or client-safe. Pending Max verification against live Dashboard, Mission Control, and Supabase vocabulary.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 155
  },
  {
    "taskKey": "M1-OM-07",
    "title": "Review Batch 3 operating model pages",
    "description": "Completed 2026-07-18: Samir approved Batch 3 operating-model pages and the display rule that formal M1–M5 milestone names appear consistently across the internal Wiki, Mission Control, Dashboard, Obsidian, and source records, paired with short plain-language explanations when useful. Remaining technical implementation checks stay with Max-owned tasks.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 156
  },
  {
    "taskKey": "M1-DP-01",
    "title": "Define digital platform surface map",
    "description": "Completed 2026-07-18: Samir's approved platform boundaries were reconciled into one surface map. Client Portal is approved-final client-facing; Dashboard is the internal summary; Mission Control is execution; the Wiki is the governed reading layer; Obsidian is authoring/agent mirror/continuity; Supabase is canonical live state; GitHub is code/version history; and Vercel is deployment. Internal Dashboard/prototype remains separate from the client-facing app. Max-owned technical verification remains separate.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 160
  },
  {
    "taskKey": "M1-DP-02",
    "title": "Define client portal non-negotiables",
    "description": "Drafted in Obsidian Client Portal page: Dashboard-first, read-only by default, approved final content only, client settings editable only, and v1 universal navigation. Needs Samir/Max review.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 161
  },
  {
    "taskKey": "M1-DP-03",
    "title": "Define internal Dashboard rules",
    "description": "Samir approved the business rules: Dashboard is the calm internal summary home with current milestone, overall progress, and individual task progress; it shortcuts into Mission Control without becoming a task dump. Bloq appears as Bloq (AI) only when it owns active Mission Control tasks, remains internal-only, and never appears in the client portal. Max still owns implementation verification.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 162
  },
  {
    "taskKey": "M1-DP-04",
    "title": "Define Mission Control platform behavior",
    "description": "Drafted in Obsidian Mission Control page: full task graph, milestones, workflows, owners, status, priority, dependencies, locked work, and context links. Needs Max/Samir review.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 163
  },
  {
    "taskKey": "M1-DP-05",
    "title": "Define internal Wiki / Compendium behavior",
    "description": "Completed 2026-07-18: Samir's approved Wiki/Compendium behavior is locked. Supabase is canonical live state; the internal Wiki is the governed reading/search layer; Obsidian is the authoring, agent-mirror, source-context, and continuity layer; Mission Control links execution to Wiki context; and the client portal remains separate and approved-final only. Max-owned search, navigation, permissions, and UI verification remain separate.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 164
  },
  {
    "taskKey": "M1-DP-06",
    "title": "Review Supabase data model summary",
    "description": "Drafted in Obsidian Supabase Data Model page from current SQL/source notes: sites, content objects, representations, launch tasks, dependencies, weekly agendas, and RLS caveats. Needs Max review and live schema verification.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "critical",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 165
  },
  {
    "taskKey": "M1-DP-07",
    "title": "Define design handoff process",
    "description": "Drafted in Obsidian Design Handoff Process page: capture feedback in Obsidian, wait for explicit send/package trigger, route to Dashboard/Mission Control/client portal/both/Obsidian-only, and require stakeholder acceptance. Needs Samir/Max review.",
    "primaryOwner": "Bloq",
    "status": "review",
    "priority": "medium",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 166
  },
  {
    "taskKey": "M1-DP-08",
    "title": "Review Batch 4 digital platform pages",
    "description": "Completed 2026-07-18: Samir reviewed Batch 4 business behavior and approved the last open display rule: show Bloq as Bloq (AI) on the internal Dashboard only when it owns active Mission Control tasks; never expose Bloq ownership in the client portal. Max-owned schema, RLS, deployment, search, navigation, layout, and UI checks remain separate technical tasks.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Platform & Internal/Client System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 167
  },
  {
    "taskKey": "M1-WIKI-01",
    "title": "Import drafted Wiki pages into admin Block Ops Wiki",
    "description": "Completed 2026-07-03: actual admin Wiki surface uses Supabase wiki_sections and wiki_pages, not the legacy Knowledge Library route. Imported 35 Obsidian-drafted pages; verified 40 total live admin Wiki pages. Content remains internal review material only, not client-facing final content.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 168
  },
  {
    "taskKey": "M1-WIKI-02",
    "title": "Audit imported admin Wiki pages and set initial review gates",
    "description": "Completed 2026-07-08: imported admin Wiki pages now have an M1 project catalog and initial current-internal/review-gated handling. Remaining final promotion label work is tracked separately in M1-WIKI-10, six-pillar mapping in M1-WIKI-11, task linking in M1-WIKI-12, and client-facing candidate review in M1-WIKI-13.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 169
  },
  {
    "taskKey": "M1-WIKI-03",
    "title": "Audit live Wiki sections and page counts",
    "description": "Verify the admin Block Ops Wiki sections, page counts, and imported titles after each import or cleanup pass. Current baseline: 40 live pages across the existing 12 admin sections.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "high",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 176
  },
  {
    "taskKey": "M1-WIKI-04",
    "title": "QA Company Identity Wiki pages",
    "description": "Completed 2026-07-08: reviewed and re-synced Company Identity pages into the live admin Wiki as current internal drafts with explicit non-client-facing review gates: Mission, Vision, Positioning/Core Story, Pillar Model / Gold Standard Tree, and Implementation Bundles.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 177
  },
  {
    "taskKey": "M1-WIKI-05",
    "title": "QA Sales and Client Pipeline Wiki pages",
    "description": "Completed 2026-07-08: reviewed and re-synced Sales and Client Pipeline pages into the live admin Wiki as current internal drafts with explicit Adrian/Samir/Max/legal review gates. Includes lead capture, outreach, CRM stages, communication log, qualification/discovery, proposal workflow, sales materials/scripts, touchpoint taxonomy, and M2 phone lead capture as future scope.",
    "primaryOwner": "Adrian",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 178
  },
  {
    "taskKey": "M1-WIKI-06",
    "title": "QA Operating Model Wiki pages",
    "description": "Completed 2026-07-08: reviewed and re-synced Operating Model pages into the live admin Wiki as current internal drafts. Includes Block Ops Operating System, Roles and Ownership, Mission Control Rules, Weekly Ops Review, Decision Capture, and Status Rules, with Samir review gates and Max review gates for Dashboard/Mission Control/Supabase implementation details.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 179
  },
  {
    "taskKey": "M1-WIKI-07",
    "title": "QA Digital Platform Wiki pages",
    "description": "Completed 2026-07-08: reviewed and re-synced Digital Platform pages into the live admin Wiki as current internal drafts. Includes Digital Platform Overview, Client Portal, Dashboard, Mission Control, Block Ops Wiki / Compendium, Supabase Data Model, and Design Handoff Process, with Max/Samir review gates and approved-final-only client portal boundaries.",
    "primaryOwner": "Max",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 180
  },
  {
    "taskKey": "M1-WIKI-08",
    "title": "QA Delivery and Clinical Knowledge Wiki pages",
    "description": "Completed 2026-07-09: reviewed and re-synced Client Onboarding, Implementation Bundle Delivery, Training Day Readiness, Go-Live Verification, and Clinical / Block Program Knowledge Index as current internal drafts. Standardized implementation-bundle terminology, the universal foundation baseline, current M3/M4/M5 milestone framing, approved-final-only client visibility, qualified clinical fact review, lawyer approval, and role-based evidence gates.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 181
  },
  {
    "taskKey": "M1-WIKI-09",
    "title": "QA Legal Risk Archive and Growth Wiki pages",
    "description": "Completed 2026-07-09: reviewed and re-synced Legal Review Index, Compliance / Risk Controls, Acquisition / Growth Strategy, Backup and Continuity, and Decision Log / Historical Archive as current internal drafts. Added qualified-lawyer finalization, control evidence, client-leak/privilege/retention safeguards, M3/M4/M5 framing, Supabase live-data authority, seed/live reconciliation, and domain-specific final-state rules.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 182
  },
  {
    "taskKey": "M1-WIKI-10",
    "title": "Define Wiki promotion and review labels",
    "description": "Completed 2026-07-09: defined the canonical Wiki governance model separating eight promotion states, multi-select qualified review gates, and five visibility labels. Added fail-closed defaults, exact-version client-release approval, leak-path verification, rollback/incident rules, one accountable owner, and conservative handling of legacy draft buckets. No content was promoted to client-facing candidate or final; durable Supabase/UI enforcement remains Max implementation work.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 183
  },
  {
    "taskKey": "M1-WIKI-11",
    "title": "Map reviewed Wiki pages to the six-pillar spine",
    "description": "Completed 2026-07-09: audited 41 existing live Wiki pages, preserved five legitimate live-only pages, created the governed six-pillar page map as the 42nd live page, and assigned every page exactly one primary official pillar with optional secondary pillars. Added fail-closed canonical metadata for 37 repository Wiki items while retaining the current 12-section backend/admin structure. No visible category rename, review completion, content promotion, or client-facing publication occurred; durable live pillar fields/navigation remain Max implementation work.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "high",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 184
  },
  {
    "taskKey": "M1-WIKI-12",
    "title": "Link M1 Mission Control tasks to primary Wiki pages",
    "description": "Completed 2026-07-09: created a controlled one-primary-page context map for all 112 canonical M1 tasks and every expanded live M1 task. Added fail-closed governed-target tests, live primary_wiki_page_id synchronization, source schema/index/foreign-key setup, and visible Wiki context titles in Mission Control task details. Existing expanded task rows were preserved; no Wiki page was promoted or exposed to clients.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "high",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 185
  },
  {
    "taskKey": "M1-WIKI-13",
    "title": "Identify client-facing Wiki candidates without publishing them",
    "description": "Completed 2026-07-09: audited all 42 governed live Wiki pages and created the internal Block Ops Wiki Client-Facing Candidate Register as the 43rd governed page. Classified 0 whole-page candidates, 17 excerpt/derivative candidates, 3 deferred pages, and 22 permanent-internal pages with exact audience, scope, required review gates, and exclusions. No source page was promoted, published, or made client-visible; every possible future candidate still requires an exact-version artifact, applicable qualified reviews, business release, and client-path verification.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 186
  },
  {
    "taskKey": "M1-WIKI-14",
    "title": "Run Wiki buildout acceptance check",
    "description": "Completed 2026-07-09: accepted the first governed Wiki buildout after verifying 43 live governed pages, internal title/description/tag/body search coverage, conservative review labels, 43 of 43 pillar assignments, correct primary Wiki context for all 328 live M1 tasks, synchronized Obsidian operating records, and zero draft Wiki items returned to client library results. Added fail-closed acceptance regression tests. This closes the buildout pass without promoting any page or claiming that future final-review, schema/UI enforcement, or client-leak workflows are complete.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "critical",
    "workstream": "Block Ops Wiki Buildout",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 187
  },
  {
    "taskKey": "M1-OPS-OWNER-01",
    "title": "Apply default owner rule for new tasks",
    "description": "Implemented operating rule: every Mission Control task has one accountable owner. If ownership is unclear, assign Samir temporarily so he can redirect to Adrian, Max, or Bloq. Verified against the live Mission Control task set with zero missing primary owners.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Operating Model",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 188
  },
  {
    "taskKey": "M1-FINAL-REVIEW-01",
    "title": "Define final review and owner approval workflow",
    "description": "Completed 2026-07-19 by reconciliation with M1-WIKI-10 and the approved universal governed-content model. Final review applies to one exact version and records one accountable owner, intended audience/use, required gates, and reviewer outcome of approved, changes required, or not applicable with date, scope, and evidence. All applicable gates must clear independently before promotion; no reviewer can waive another domain's required gate. Internal-current approval remains internal-only. Client-facing-final additionally requires an immutable/versioned artifact, business release approval, approved audience/scope, and verified portal, search, agent, download, link, cache, and print paths. Substantive edits reopen affected gates. Max-owned UI/schema enforcement remains M1-FINAL-REVIEW-02.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Final Review / Approvals",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 189
  },
  {
    "taskKey": "M1-FINAL-REVIEW-02",
    "title": "Create final review approval page concept",
    "description": "Design the admin/internal page where Samir, Adrian, Max, and Bloq can read assigned final-review items and click approved or request changes, creating an auditable path to final state.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "high",
    "workstream": "Final Review / Approvals",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 190
  },
  {
    "taskKey": "M1-CLIENT-LEAK-01",
    "title": "Run client-facing leak audit workflow",
    "description": "Test the separate client application/portal paths early in M1 to confirm drafts, internal Mission Control details, Internal Operations System content/terminology, implementation notes, and unapproved Wiki pages are not visible to clients. Create fix tasks for any leak found.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "critical",
    "workstream": "Client-Facing Leak Audit",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 191
  },
  {
    "taskKey": "M1-SYNC-01",
    "title": "Document source-of-truth and regression checklist",
    "description": "Completed 2026-07-21: documented Supabase/live execution precedence, governed Wiki and Obsidian roles, repository seed boundaries, targeted test/build requirements, independent live readback, GitHub/production delivery checks, client fail-closed rules, and residual-owner reporting in Backup and Continuity.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "high",
    "workstream": "Wiki / Obsidian Operating System",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 192
  },

  {
    "taskKey": "M1-WIKI-LINK-01",
    "title": "Create Block Ops Wiki cross-linking map",
    "description": "Completed 2026-07-09: defined a controlled 43-page cross-link graph with 214 governed links, explicit concept clusters, six topic indexes, primary-pillar fallbacks, and visibility-safe traversal rules.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "high",
    "workstream": "Wiki Cross-Linking",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 193
  },
  {
    "taskKey": "M1-WIKI-LINK-02",
    "title": "Add related-page blocks to core Wiki pages",
    "description": "Completed 2026-07-09: added deterministic Related Pages blocks and related-page metadata to every repository Wiki page while preserving internal-only status and filtering every static target to an available governed page.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "high",
    "workstream": "Wiki Cross-Linking",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 194
  },
  {
    "taskKey": "M1-WIKI-LINK-03",
    "title": "Add inline Wiki links where they improve navigation",
    "description": "Completed 2026-07-09: converted natural Obsidian Wiki links into clickable internal navigation in the Dashboard Wiki viewer, with fail-closed client traversal that requires both exact pages to be client-visible finals.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "medium",
    "workstream": "Wiki Cross-Linking",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 195
  },
  {
    "taskKey": "M1-WIKI-LINK-04",
    "title": "Create Wiki hub and index pages",
    "description": "Completed 2026-07-09: established Sales / Outreach, Mission Control, Client Portal, Wiki Governance, Implementation Bundle, and M1 indexes using governed anchor pages rather than duplicate content.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "medium",
    "workstream": "Wiki Cross-Linking",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 196
  },
  {
    "taskKey": "M1-WIKI-LINK-05",
    "title": "Run Wiki link QA and client-leak check",
    "description": "Completed 2026-07-09: automated link QA passed across 43 governed pages and 214 links with zero broken targets, orphan pages, pages without outbound links, or client-leak paths. Regression tests cover link parsing, related blocks, hubs, and fail-closed visibility.",
    "primaryOwner": "Max",
    "status": "done",
    "priority": "high",
    "workstream": "Wiki Cross-Linking",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 197
  },
  {
    "taskKey": "M1-DCK-01",
    "title": "Define client onboarding operating path",
    "description": "Drafted in Obsidian Client Onboarding page: signed/client handoff, site profile, welcome communication, portal access, site configuration, deliverable assignment, prep call scheduling, and blockers. Needs Samir/Max review.",
    "primaryOwner": "Max",
    "status": "review",
    "priority": "high",
    "workstream": "Mock Client / Demo Flow",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 170
  },
  {
    "taskKey": "M1-DCK-02",
    "title": "Define implementation bundle delivery process",
    "description": "Samir-approved delivery model: every engagement receives the minimum responsible foundation layer plus only purchased capability modules; verified site data creates a controlled site-specific instance without mutating global source; applicable domain gates apply per item; approved-final items may release incrementally; and delivery complete, training ready, or go-live ready requires every item for that bundle gate. The manifest records scope, versions, reviewers, evidence, release, and re-review triggers.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Clinical Standard & Deliverables",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 171
  },
  {
    "taskKey": "M1-DCK-03",
    "title": "Define preliminary training-readiness boundary",
    "description": "Completed 2026-07-19 as a preliminary governance definition and updated 2026-07-21 so it is not an M1 closeout requirement. M1 proves training scheduling and handoff only. Final training agenda, activities, materials, readiness review, event execution, completion evidence, and post-training follow-up are M2 work after the deliverables and offering are completed and organized. The engagement boundary remains: Block Ops personnel act as educators and systems consultants—not treating clinicians; they do not perform blocks, touch patients, direct patient care, or supervise site clinicians. The client retains clinical authority. Any hands-on clinical service requires a separate credentialed, insured, contracted, and lawyer-approved arrangement. Final wording will be refined after outside counsel completes the legal documents.",

    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Clinical Standard & Deliverables",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 172
  },
  {
    "taskKey": "M1-DCK-04",
    "title": "Define go-live verification checklist",
    "description": "Completed 2026-07-19: Samir approved the joint, fail-closed go-live authority flow. Every required domain owner controls their own gate: the client/site clinical owner controls patient-care and safety readiness; the named Block Ops implementation owner controls Block Ops materials, access, service, and support readiness; qualified lawyers clear legal blockers; and the platform owner verifies live access and visibility controls. Any required no, missing approval, or unresolved hard stop means no-go. No person may override another qualified domain owner's stop. One named Block Ops implementation owner records the joint decision and evidence without gaining waiver authority. The proposed Day 3/7/14/30 support sequence remains nonmandatory and site-specific until separately approved.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Mock Client / Demo Flow",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 173
  },
  {
    "taskKey": "M1-DCK-05",
    "title": "Index clinical and block program knowledge library",
    "description": "Completed 2026-07-19: Samir approved the clinical and block-program knowledge index plus one universal layered classification model for all governed Block Ops content. Wiki pages, deliverables, SOPs, policies, templates, forms, training materials, legal documents, clinical references, and imported sources each carry independent lifecycle, visibility, and applicable approval-gate fields. Unverified index entries default to planned/unverified; one review cannot make an item final or client-visible; and substantive edits reopen applicable checks for the new exact version. Item-level existence, source, version, and domain review remain separate later work.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "critical",
    "workstream": "Clinical Standard & Deliverables",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 174
  },
  {
    "taskKey": "M1-DCK-06",
    "title": "Review Batch 5 delivery and clinical knowledge pages",
    "description": "Completed 2026-07-19: Samir approved Batch 5 and the remaining Client Onboarding entry gate. A real client receives no formal onboarding, portal access, or deliverables until the required agreement is executed and the required payment or finance condition is satisfied. Internal preparation may occur earlier but cannot be represented as completed onboarding. A business exception cannot waive a required legal signature; unusual real-client arrangements require documented clearance from the applicable legal and finance authorities. Clinical, legal, finance, and Max technical finalization remain separate gates.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "Clinical Standard & Deliverables",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 175
  },
  {
    "taskKey": "M1-29",
    "title": "Define no-response threshold",
    "description": "Completed 2026-07-18 by reconciliation with approved M1-OS-08: after 3 unanswered outreach attempts over the default 10-business-day cadence—or the approved 7-business-day fast lane for warm, referral, or high-intent leads—move the lead to No Response / Stalled. Stop active outreach, preserve the record and full history, retain the owner and last-contact date, and assign a next review date. Silence alone is never Not Fit.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 290
  },
  {
    "taskKey": "M1-30",
    "title": "Define stalled lead statuses in CRM",
    "description": "Confirm the CRM statuses needed for stalled leads, such as waiting, no response, nurture, closed-lost, or recycle later.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "high",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 300
  },
  {
    "taskKey": "M1-31",
    "title": "Set no-response retry cadence",
    "description": "Define how many follow-up attempts happen, over what time period, and through which channels before the lead is paused or recycled.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "high",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 310
  },
  {
    "taskKey": "M1-32",
    "title": "Write no-response email script",
    "description": "Draft the early-phase email language Adrian uses when a lead has not responded.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 320
  },
  {
    "taskKey": "M1-33",
    "title": "Write no-response text script",
    "description": "Draft the early-phase text message language Adrian uses when a lead has not responded.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 330
  },
  {
    "taskKey": "M1-34",
    "title": "Write final nudge / close-loop script",
    "description": "Draft the final follow-up message Adrian uses before pausing, closing, or recycling a stalled lead.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 340
  },
  {
    "taskKey": "M1-35",
    "title": "Define pause vs close rule",
    "description": "Completed 2026-07-18: keep a lead active only while its outreach cadence remains open or a response has produced a dated next action. At the no-response threshold, pause it as No Response / Stalled and assign a human review date; never close automatically. Use Nurture / Recycle Later only with a specific temporary reason and re-entry trigger. Use Closed / No Response only after human review finds no near-term action and no justified nurture path; use Closed / Not Interested for an explicit do-not-contact request or firm permanent rejection; and use Not Fit only for a documented mismatch. Preserve the complete record and history in every path.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 350
  },
  {
    "taskKey": "M1-36",
    "title": "Define recycle-later rule",
    "description": "Set when and how a stalled lead comes back into follow-up after being paused.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 360
  },
  {
    "taskKey": "M1-37",
    "title": "Add stalled-lead tracking fields if missing",
    "description": "Add or confirm fields needed to track stalled-lead reason, last touch, next touch, recycle date, and owner.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 370
  },
  {
    "taskKey": "M1-38",
    "title": "Test stalled-lead flow with mock client",
    "description": "Run a mock lead through the no-response path to confirm statuses, cadence, scripts, and next steps are clear.",
    "primaryOwner": "Adrian",
    "status": "ready",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 380
  },
  {
    "taskKey": "M1-39",
    "title": "Confirm stalled leads show correctly in Mission Control / CRM",
    "description": "Verify the stalled-lead tasks and statuses appear correctly in Mission Control and CRM views.",
    "primaryOwner": "Bloq",
    "status": "ready",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 390
  },
  {
    "taskKey": "M1-40",
    "title": "Document No-Response / Stalled Lead workflow",
    "description": "Completed 2026-07-22: consolidated the approved no-response threshold, pause-versus-close rule, state transitions, evidence fields, and human-review outcomes into the Outreach Sequence operating note and linked it to the M1 permanent no-response and stalled-and-resumed scenarios. Implementation display and mock-path testing remain separate tasks M1-39 and M1-38.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "medium",
    "workstream": "No-Response / Stalled Lead",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 400
  },
  {
    "taskKey": "M1-FST-01",
    "title": "Define M1 final system test checklist",
    "description": "Maintain the end-of-milestone checklist that proves M1 with seven primary mock leads, one duplicate-entry attempt, four distinct lead-to-live journeys, three required non-live endings, CRM/communication visibility, portal/account flow, deliverables, proposal/contract flow, scheduling-only training scope, mock go-live, first metrics, critical-fix retest, and closeout proof.",
    "primaryOwner": "Bloq",
    "status": "done",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 410
  },
  {
    "taskKey": "M1-FST-02",
    "title": "Define detailed mock-client data inputs near closeout",
    "description": "Near M1 closeout, define facility names, contacts, exact inputs, path-specific blockers and decisions, deliverable assignments, embedded edge tests, portal content, and expected outcomes for all seven primary mock leads plus the duplicate-entry attempt. Every record and artifact remains clearly labeled mock.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "medium",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 420
  },
  {
    "taskKey": "M1-FST-03",
    "title": "Run AI-chat complete-path mock client",
    "description": "Run the AI-chat lead from chatbot collection through clean automated intake, acknowledgement, CRM/source/owner verification, qualification, proposal, agreement, onboarding, portal access, training scheduling, explicitly simulated downstream training assumption, mock Live, support, and first metrics. Capture pass/fail evidence without claiming training readiness or execution.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 430
  },
  {
    "taskKey": "M1-FST-04",
    "title": "Run Adrian relationship mock client",
    "description": "Run the Adrian manual/network lead through the warm relationship and faster complete path without skipping required gates. Verify no inappropriate automated acknowledgement, preserved relationship context, a different mock package, proposal/agreement, onboarding, portal access, training scheduling, explicitly simulated downstream training assumption, mock Live, support, and first metrics.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 440
  },
  {
    "taskKey": "M1-FST-05",
    "title": "Approve comprehensive M1 mock-lead test set",
    "description": "Completed 2026-07-21: Samir approved seven primary mock leads plus one duplicate-entry attempt. Four distinct source paths reach mock Live; three branch leads prove early not-fit, permanent no-response, and late-stage decline. Embedded tests cover password reset, rescheduling, different deliverables, permissions, messy intake, support, and first metrics. Add an eighth primary lead only if a major uncovered path emerges.",
    "primaryOwner": "Samir",
    "status": "done",
    "priority": "high",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 450
  },
  {
    "taskKey": "M1-FST-07",
    "title": "Run Contact Us stalled-and-resumed complete-path mock client",
    "description": "Run a distinct Contact Us lead through incomplete intake, acknowledgement, retry reminders, pause, later return, preserved history, qualification, proposal, agreement, onboarding, portal access, training scheduling, explicitly simulated downstream training assumption, mock Live, support, and first metrics.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 451
  },
  {
    "taskKey": "M1-FST-08",
    "title": "Run direct-email conditional-and-revised complete-path mock client",
    "description": "Run a direct-email lead through unstructured intake, CRM normalization, possible duplicate review, Need More Information or Advance with Conditions, owned blocker resolution, proposal/package revision, delayed agreement/payment condition, onboarding, portal access, training scheduling, explicitly simulated downstream training assumption, mock Live, support, and first metrics.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 452
  },
  {
    "taskKey": "M1-FST-09",
    "title": "Run early not-fit branch mock lead",
    "description": "Run a repeated AI or manual-entry mock lead through initial fit to a supported Not a Fit / Closed outcome. Record the reason, final communication, owner, evidence, and verify that proposal, contract, onboarding, portal, scheduling, and go-live work are not created.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 453
  },
  {
    "taskKey": "M1-FST-10",
    "title": "Run permanent no-response branch mock lead",
    "description": "Run a repeated Contact Us or direct-email mock lead through acknowledgement, the complete approved retry cadence, missed-contact visibility, and correct Nurture, Recycle, or No Response closure. Verify the record does not remain indefinitely active and no downstream sales/delivery work is invented.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 454
  },
  {
    "taskKey": "M1-FST-11",
    "title": "Run late-stage declined branch mock lead",
    "description": "Run a repeated AI or manual-entry mock lead through qualification, assessment, proposal, questions, and at least one revision before a Declined / Closed outcome. Preserve decision context and verify contract, onboarding, portal, scheduling, and go-live work do not continue.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 455
  },
  {
    "taskKey": "M1-FST-12",
    "title": "Run deliberate duplicate-entry attempt",
    "description": "Enter an existing mock contact or facility through a second source. Verify possible-duplicate detection, suppression of inappropriate duplicate messages, merge/link disposition, source-history preservation, one correct owner, and prevention of duplicate client, portal, entitlement, and onboarding records. This is a test event, not an eighth prospect.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 456
  },
  {
    "taskKey": "M1-FST-13",
    "title": "Resolve and retest critical M1 mock-run failures",
    "description": "Collect every failed or missing step from the seven leads and duplicate attempt, create one-owner repair tasks, verify each critical repair in the actual affected path, and preserve unresolved noncritical items with disposition for M2. M1 cannot close on an unverified critical fix.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 457
  },
  {
    "taskKey": "M1-FST-06",
    "title": "Write M1 completion readout",
    "description": "Write the M1 completion readout after all seven leads, the duplicate attempt, and critical-failure retests finish. Summarize each scenario, evidence, pass/fail result, repairs, retest result, scheduling-only training boundary, explicit mock assumptions, and work moved to M2.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 460
  },
  {
    "taskKey": "M1-SOP-01",
    "title": "Clean up SOP documents folder and tab organization",
    "description": "Reorganize the SOP documents folder and SOP tab so internal SOPs are easier to browse, grouped by workflow area, and not duplicated across indexes. Deferred intentionally; not tonight.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "medium",
    "workstream": "SOP / Knowledge Organization",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 470
  },
  {
    "taskKey": "M1-DASH-01",
    "title": "Hide locked tasks from dashboard current-task cards",
    "description": "Update dashboard current-task cards so each person only sees actionable tasks now, excluding locked and blocked future-dependent work.",
    "primaryOwner": "Max",
    "status": "done",
    "priority": "high",
    "workstream": "Dashboard / Mission Control UX",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 480
  },
  {
    "taskKey": "M1-CAL-01",
    "title": "Confirm internal calendar scheduling works",
    "description": "Verify different client meetings can be scheduled and added to the internal Block Ops calendar. Client email notifications are tracked separately because they did not send during the mock test.",
    "primaryOwner": "Max",
    "status": "done",
    "priority": "high",
    "workstream": "Training Day Scheduling",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 490
  },
  {
    "taskKey": "M1-CAL-02",
    "title": "Build client meeting email notifications",
    "description": "When a meeting is scheduled, send the client the correct meeting email/invite. Current mock test added meetings to the internal calendar but clients did not receive meeting emails.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "critical",
    "workstream": "Training Day Scheduling",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 500
  },
  {
    "taskKey": "M1-CAL-03",
    "title": "Integrate Google Meet for client meetings",
    "description": "Improve Google Meet integration so Block Ops can use Meet as the client meeting platform and include usable meeting links in the client invite flow.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "critical",
    "workstream": "Training Day Scheduling",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 510
  },
  {
    "taskKey": "M1-CAL-04",
    "title": "Test client meeting email and Google Meet pathway",
    "description": "Run a mock client meeting scheduling test that confirms the internal calendar event, client email invite, Google Meet link, and client join path all work.",
    "primaryOwner": "Bloq",
    "status": "ready",
    "priority": "critical",
    "workstream": "Training Day Scheduling",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 520
  },
  {
    "taskKey": "M1-PA-01",
    "title": "Confirm signed client appears in portal access tab",
    "description": "Verify that once a lead signs and becomes a client, the client record appears in the internal Portal Access tab. This proves the tab population path works even if tab actions are still mostly static.",
    "primaryOwner": "Max",
    "status": "done",
    "priority": "high",
    "workstream": "Onboarding Setup",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 530
  },
  {
    "taskKey": "M1-PA-02",
    "title": "Build functional portal access tab actions",
    "description": "Make the Portal Access tab operational instead of mostly static: expose the needed client access status, invite/reset/access actions, and any admin controls needed to manage client portal access safely.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "critical",
    "workstream": "Onboarding Setup",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 540
  },
  {
    "taskKey": "M1-PA-03",
    "title": "Test portal access tab admin workflow",
    "description": "Run a mock client through the Portal Access tab workflow after functionality is built: verify access state, admin actions, reset/invite behavior, and that client-facing access remains correct.",
    "primaryOwner": "Bloq",
    "status": "ready",
    "priority": "high",
    "workstream": "Onboarding Setup",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 550
  },
  {
    "taskKey": "M2-01",
    "title": "Confirm the M2 readiness definition",
    "description": "Lock M2 as foundational-client ready: the complete Foundation Library and M2 client-product architecture are reviewed, approved, finalized, measurable, and operable without major improvisation.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Foundational Readiness",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 10
  },
  {
    "taskKey": "M2-02",
    "title": "Finalize the Foundation Library and modular product catalog",
    "description": "Review, approve, and finalize the complete Foundation Library; classify each item into the Platform and Safety Core, Capability Packs, Block Packs, internal knowledge, or Premium Modules; and apply the locked Universal Pack Contract: scope, approved deliverables, implementation, two to three KPIs, Dashboard experience, recurring service, governance/evidence, and expansion map.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Deliverables and Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 20
  },
  {
    "taskKey": "M2-03",
    "title": "Configure the modular pack catalog",
    "description": "Configure Capability Packs and block-specific Block Packs as independently assignable client products that inherit approved Foundation Library content, include two to three pack KPIs, and expand cleanly through the shared platform.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "Deliverables and Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 30
  },
  {
    "taskKey": "M2-DOC-001",
    "title": "Finalize the Documentation and Billing Capability Pack",
    "description": "During M2, refine and approve the saved pack draft: assessment, documentation standard, provider note template, coding/medical-necessity references, charge reconciliation, audit and denial workflows, training, Dashboard reporting, three KPIs, data pathway, review gates, and site-validation boundaries.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "Deliverables and Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 31
  },
  {
    "taskKey": "M2-04",
    "title": "Lock the legal package and ownership structure",
    "description": "Finalize the legal docs, review path, and ownership / equity planning.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "critical",
    "workstream": "Legal and Ownership",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": false,
    "sortOrder": 40
  },
  {
    "taskKey": "M2-LRA-01",
    "title": "Review legal review index",
    "description": "Drafted in Obsidian Legal Review Index page: legal package, counsel gates, operating controls, AI/no-PHI/on-site/sales claim boundaries, and final-versus-draft status rules. Needs Samir and qualified legal review.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Legal and Ownership",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 41
  },
  {
    "taskKey": "M2-LRA-02",
    "title": "Review compliance and risk controls",
    "description": "Drafted in Obsidian Compliance / Risk Controls page: no clinical-care boundary, no-PHI posture, AI reference-tool guardrails, on-site educator boundary, claims guardrails, and portal content controls. Needs Samir/legal review and Max implementation verification.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Security and Compliance",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 42
  },
  {
    "taskKey": "M2-LRA-03",
    "title": "Review acquisition and growth strategy",
    "description": "Drafted in Obsidian Acquisition / Growth Strategy page: lead sources, early-fit signals, relationship-first routing, nurture/future-market handling, and growth feedback loop. Needs Samir/Adrian review.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "Commercial Operations",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 43
  },
  {
    "taskKey": "M2-LRA-04",
    "title": "Define backup and continuity verification",
    "description": "Drafted in Obsidian Backup and Continuity page: layer-specific backup targets, recovery priorities, source preservation, and recurring continuity checks. Needs Max to define live Supabase/Vercel backup and restore path.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "QA and Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 44
  },
  {
    "taskKey": "M2-LRA-05",
    "title": "Review decision log and historical archive rules",
    "description": "Drafted in Obsidian Decision Log / Historical Archive page: decision capture triggers, short entry format, archive/source-only handling, and current-truth versus historical-source separation. Needs Samir review.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "medium",
    "workstream": "Operating Rhythm",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 45
  },
  {
    "taskKey": "M2-LRA-06",
    "title": "Review Batch 6 legal risk acquisition archive pages",
    "description": "Samir reviews Batch 6 pages for accuracy: Legal Review Index, Compliance / Risk Controls, Acquisition / Growth Strategy, Backup and Continuity, and Decision Log / Historical Archive.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "Legal and Ownership",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 46
  },
  {
    "taskKey": "M2-05",
    "title": "Define and validate the governed client-agent experience",
    "description": "Build from the locked starting boundaries: the agent layer sits beneath the Dashboard, uses only entitled approved sources and permitted client data, cites source/version, labels drafts, logs actions, escalates to humans, fails closed, and never independently publishes, changes global standards, makes clinical decisions, finalizes regulated conclusions, alters KPIs, declares completion, contacts patients, or crosses tenants.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "Client Experience",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 50
  },
  {
    "taskKey": "M2-06",

    "title": "Make the portal operational for a real client",
    "description": "Confirm the portal sections, access rules, approved content flow, and live data path.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "Portal and Data Flow",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 60
  },
  {
    "taskKey": "M2-07",
    "title": "Implement the tiered KPI data-intake model",
    "description": "Implement the locked three-level model: every pack works with structured aggregate Dashboard entry, improves through validated de-identified file import, and may automate through premium system integrations. Show each KPI as not configured, baseline collecting, tracking, data-quality concern, or verified for reporting.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "critical",
    "workstream": "Portal and Data Flow",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 70
  },
  {
    "taskKey": "M2-08",
    "title": "Finalize training-day and on-site support readiness",
    "description": "After the Foundation Library, deliverables, and modular offering are completed and organized, finalize and internally/mock verify the actual training event: purpose and scope, agenda, activities, approved materials, participant preparation, site and Block Ops roles, roster, access, equipment and logistics, safety boundaries, contingencies, readiness/go-no-go review, attendance and completion evidence, knowledge/skill checks where applicable, post-training follow-up, unresolved-gap handling, and named approval authority. M1 scheduling evidence does not complete this task.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Training and Support",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 80
  },
  {
    "taskKey": "M2-09",
    "title": "Finalize billing, invoicing, and payment operations",
    "description": "Finalize and internally/mock test customer billing intake, approved price and payment schedule, PO handling, invoice creation/approval/delivery, secure payment methods, payment-status tracking, accounts-receivable follow-up, disputes/credits/refunds, reconciliation, access controls, and evidence retention. No actual paid-client revenue proof is claimed until M5.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "critical",
    "workstream": "Commercial Operations",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 90
  },
  {
    "taskKey": "M2-10",
    "title": "Set security, HIPAA, and compliance boundaries",
    "description": "Make the compliance posture explicit so the system stays safe and professional.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Security and Compliance",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 100
  },
  {
    "taskKey": "M2-11",
    "title": "Define provisioning and offboarding",
    "description": "Document how clients are set up, updated, and cleanly taken off the system.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "Client Operations",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 110
  },
  {
    "taskKey": "M2-12",
    "title": "Define reporting and visibility",
    "description": "Make sure the team can see status, value, and quality clearly.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "medium",
    "workstream": "Reporting and Visibility",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 120
  },
  {
    "taskKey": "M2-13",
    "title": "Define the operating cadence",
    "description": "Set the weekly loop for priorities, owners, updates, and issue review.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "medium",
    "workstream": "Operating Rhythm",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 130
  },
  {
    "taskKey": "M2-14",
    "title": "Define QA, staging, and validation steps",
    "description": "Create the internal check path so changes can be tested before a client sees them.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "QA and Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 140
  },
  {
    "taskKey": "M2-15",
    "title": "Operationalize recurring support and service handoffs",
    "description": "Finalize and internally/mock verify support channels and hours, severity definitions, response and escalation targets, accountable owner and backup, issue records, client communications, closure evidence, recurring Dashboard/KPI/update service, and the handoff from go-live into ongoing support.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Training and Support",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 150
  },
  {
    "taskKey": "M2-16",
    "title": "Run the M2 real-client-readiness proof",
    "description": "Using mock client and site records only, run the finalized real-client workflow across site safety/readiness, staffing and accountable roles, procurement, lawyer-finalized agreement controls, billing/payment operations, portal/data, training, formal go-live/no-go, and support. Exercise failure/rework/escalation paths and close only with exact evidence, approvals, and no unresolved readiness blocker.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "M2 Real-Client Readiness Proof",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 200
  },
  {
    "taskKey": "M3-01",
    "title": "Choose the reviewer group",
    "description": "Decide exactly which outside anesthesiologists will review the system.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Reviewer Strategy",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 10
  },
  {
    "taskKey": "M3-02",
    "title": "Decide confidentiality requirements",
    "description": "Decide whether NDAs or a lighter confidentiality note are needed.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "Reviewer Strategy",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": false,
    "sortOrder": 20
  },
  {
    "taskKey": "M3-03",
    "title": "Define reviewer criteria",
    "description": "Write the criteria so the right reviewers are invited for useful feedback.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "Reviewer Strategy",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 30
  },
  {
    "taskKey": "M3-04",
    "title": "Define the reviewer count",
    "description": "Decide how many reviewers are enough for a useful validation round.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "medium",
    "workstream": "Reviewer Strategy",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 40
  },
  {
    "taskKey": "M3-05",
    "title": "Confirm outreach and scheduling ownership",
    "description": "Make sure the invite, scheduling, and follow-up ownership is clear.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "Scheduling and Logistics",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 50
  },
  {
    "taskKey": "M3-06",
    "title": "Decide what will be shown",
    "description": "Lock the exact scope of what will be reviewed so the story stays coherent.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Presentation Package",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 60
  },
  {
    "taskKey": "M3-07",
    "title": "Build the review packet / pre-read",
    "description": "Create the packet that explains the system before the session starts.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "Presentation Package",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 70
  },
  {
    "taskKey": "M3-08",
    "title": "Define the walkthrough assets and talking points",
    "description": "Gather the examples, slides, and talking points needed for the review.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "Presentation Package",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 80
  },
  {
    "taskKey": "M3-09",
    "title": "Draft the reviewer ask message",
    "description": "Write the outreach message in a professional, low-friction way.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "Scheduling and Logistics",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 90
  },
  {
    "taskKey": "M3-10",
    "title": "Define the meeting format and time box",
    "description": "Set the session format so the review stays focused and short enough to use.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "medium",
    "workstream": "Scheduling and Logistics",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 100
  },
  {
    "taskKey": "M3-11",
    "title": "Write the walkthrough agenda in order",
    "description": "Make the review follow the same sequence every time.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "Walkthrough Process",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 110
  },
  {
    "taskKey": "M3-12",
    "title": "Define the feedback capture template",
    "description": "Capture issues in a way that can be converted into tasks quickly.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "high",
    "workstream": "Feedback Capture",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 120
  },
  {
    "taskKey": "M3-13",
    "title": "Define severity and ownership tags",
    "description": "Let review notes be sorted by severity and owner.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "Feedback Capture",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 130
  },
  {
    "taskKey": "M3-14",
    "title": "Decide the follow-up appreciation note",
    "description": "Close the loop respectfully and keep the relationship warm.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "medium",
    "workstream": "Follow-Up",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 140
  },
  {
    "taskKey": "M3-15",
    "title": "Convert issues into a fix list and retest",
    "description": "Turn the highest-priority issues into a patch list and verify the fixes.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "critical",
    "workstream": "Patch and Retest",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 150
  },
  {
    "taskKey": "M3-16",
    "title": "Write the M3 completion readout",
    "description": "Summarize what changed, what remains open, and whether the milestone is complete.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "high",
    "workstream": "Completion Readout",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 160
  },
  {
    "taskKey": "M4-01",
    "title": "Authorize the foundational-client engagement",
    "description": "Confirm the real foundational client, executed agreement and commercial authorization, accountable client and Block Ops owners, approved scope, evidence plan, and M3 prerequisite completion before delivery begins.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Foundational Client Delivery",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 10
  },
  {
    "taskKey": "M4-02",
    "title": "Complete foundational-client site readiness",
    "description": "Apply the M2-ready intake and controls to the real foundational-client site and verify safety infrastructure, staffing and accountable roles, equipment/supplies and procurement, portal/data access, training logistics, and unresolved blockers with site-specific evidence and approvals.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "Foundational Client Delivery",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 20
  },
  {
    "taskKey": "M4-03",
    "title": "Complete training, go-live, and support start",
    "description": "Deliver the approved foundational-client training, record completion and exceptions, pass the qualified go-live/no-go gate, begin governed delivery, and confirm support channels, escalation, and first operating cadence are active.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "Foundational Client Delivery",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 30
  },
  {
    "taskKey": "M4-04",
    "title": "Verify foundational-client outcomes and acceptance",
    "description": "Capture delivery evidence, KPI baselines and available results, incidents, support activity, remediation, client feedback, and acceptance against the approved foundational-client completion standard.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "high",
    "workstream": "Foundational Client Evidence",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 40
  },
  {
    "taskKey": "M4-05",
    "title": "Approve foundational-client successful completion",
    "description": "Close M4 only when the foundational client and accountable Block Ops owners accept the delivered scope, required evidence is complete, material incidents and blockers have controlled disposition, and the engagement satisfies the approved completion standard.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Foundational Client Completion",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 50
  },
  ...MILESTONE_BOUNDARY_TASKS,
  ...FUTURE_PRODUCT_TASKS
];

export const CANONICAL_TASKS = CANONICAL_LAUNCH_TASKS;

export const CANONICAL_WORKFLOWS = Array.from(new Set(CANONICAL_LAUNCH_TASKS.map((task) => task.workstream).filter(Boolean)));

export const CANONICAL_LAUNCH_DEPENDENCIES = [
  {
    "taskKey": "M1-04",
    "dependsOnTaskKey": "M1-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-05",
    "dependsOnTaskKey": "M1-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-06",
    "dependsOnTaskKey": "M1-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-07",
    "dependsOnTaskKey": "M1-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-07",
    "dependsOnTaskKey": "M1-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-08",
    "dependsOnTaskKey": "M1-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-09",
    "dependsOnTaskKey": "M1-08",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-02",
    "dependsOnTaskKey": "M1-FST-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-05",
    "dependsOnTaskKey": "M1-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-03",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-04",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-07",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-08",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-09",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-10",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-11",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-12",
    "dependsOnTaskKey": "M1-FST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-08",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-09",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-10",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-11",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-13",
    "dependsOnTaskKey": "M1-FST-12",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-06",
    "dependsOnTaskKey": "M1-FST-13",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-02",
    "dependsOnTaskKey": "M2-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-03",
    "dependsOnTaskKey": "M2-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-04",
    "dependsOnTaskKey": "M2-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-08",
    "dependsOnTaskKey": "M2-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-16",
    "dependsOnTaskKey": "M2-15",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-02",
    "dependsOnTaskKey": "M3-01",
    "dependencyType": "finish_to_start"
  },
  {

    "taskKey": "M3-03",
    "dependsOnTaskKey": "M3-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-04",
    "dependsOnTaskKey": "M3-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-05",
    "dependsOnTaskKey": "M3-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-06",
    "dependsOnTaskKey": "M3-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-07",
    "dependsOnTaskKey": "M3-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-08",
    "dependsOnTaskKey": "M3-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-09",
    "dependsOnTaskKey": "M3-08",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-10",
    "dependsOnTaskKey": "M3-09",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-11",
    "dependsOnTaskKey": "M3-10",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-12",
    "dependsOnTaskKey": "M3-11",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-13",
    "dependsOnTaskKey": "M3-12",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-14",
    "dependsOnTaskKey": "M3-13",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-16",
    "dependsOnTaskKey": "M3-15",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-04",
    "dependsOnTaskKey": "M1-WIKI-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-05",
    "dependsOnTaskKey": "M1-WIKI-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-06",
    "dependsOnTaskKey": "M1-WIKI-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-07",
    "dependsOnTaskKey": "M1-WIKI-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-08",
    "dependsOnTaskKey": "M1-WIKI-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-09",
    "dependsOnTaskKey": "M1-WIKI-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-10",
    "dependsOnTaskKey": "M1-WIKI-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-11",
    "dependsOnTaskKey": "M1-WIKI-10",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-12",
    "dependsOnTaskKey": "M1-WIKI-11",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-WIKI-13",
    "dependsOnTaskKey": "M1-WIKI-10",
    "dependencyType": "gate"
  },
  {
    "taskKey": "M1-WIKI-14",
    "dependsOnTaskKey": "M1-WIKI-12",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-02",
    "dependsOnTaskKey": "M4-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-03",
    "dependsOnTaskKey": "M4-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-04",
    "dependsOnTaskKey": "M4-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-05",
    "dependsOnTaskKey": "M4-04",
    "dependencyType": "finish_to_start"
  }
];

CANONICAL_LAUNCH_DEPENDENCIES.push(...FUTURE_PRODUCT_DEPENDENCIES);
CANONICAL_LAUNCH_DEPENDENCIES.push(...MILESTONE_BOUNDARY_DEPENDENCIES);

export const CANONICAL_DEPENDENCIES = CANONICAL_LAUNCH_DEPENDENCIES;

export const CANONICAL_LAUNCH_COLLABORATORS = [
  {
    "taskKey": "M1-03",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-03",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-04",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-05",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-06",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-06",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-07",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-07",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-08",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-08",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-09",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-09",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-FST-01",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-FST-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-FST-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-FST-02",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-FST-02",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-FST-03",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-FST-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-FST-04",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-FST-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-FST-05",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-FST-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-FST-06",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-FST-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-03",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-04",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M2-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-05",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M2-05",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-06",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-07",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-08",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-09",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M2-10",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-11",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-12",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-13",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M2-14",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-15",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-16",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-16",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M3-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-02",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M3-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-04",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-05",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M3-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-07",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-08",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M3-09",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M3-10",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M3-11",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-12",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M3-13",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-14",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M3-15",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-16",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-04",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-WIKI-05",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-06",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-07",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-WIKI-07",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-08",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-09",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-10",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-WIKI-10",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M1-WIKI-11",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-WIKI-11",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-WIKI-12",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-WIKI-13",
    "collaborator": "Adrian"
  },
  {
    "taskKey": "M1-WIKI-13",
    "collaborator": "Max"
  },
  {
    "taskKey": "M1-WIKI-14",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M1-WIKI-14",
    "collaborator": "Max"
  },
  {
    "taskKey": "M4-01",
    "collaborator": "Bloq"
  },
  {
    "taskKey": "M4-02",
    "collaborator": "Max"
  },
  {
    "taskKey": "M4-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-04",
    "collaborator": "Max"
  },
  {
    "taskKey": "M4-05",
    "collaborator": "Samir"
  }
];

export const CANONICAL_COLLABORATORS = CANONICAL_LAUNCH_COLLABORATORS;
