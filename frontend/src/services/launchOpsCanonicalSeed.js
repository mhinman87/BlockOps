import { FUTURE_PRODUCT_DEPENDENCIES, FUTURE_PRODUCT_TASKS } from './futureProductTaskSeed.js';

export const CANONICAL_LAUNCH_MILESTONES = [
  {
    "slug": "m1-mock-run-build-ready",
    "title": "Mock Client Lead-to-Live Run",
    "description": "M1 proves the full customer path by running a mock client from lead capture through CRM entry, follow-up, proposal, contract, go-live prep, and launch board organization.",
    "status": "in_progress",
    "owner": "Max",
    "sortOrder": 1,
    "readinessScore": 20,
    "gateNotes": "M1 is the end-to-end mock client rehearsal: lead pipelines, CRM, workflows, and Mission Control organization all have to work together."
  },
  {
    "slug": "m2-mock-run-complete",
    "title": "Foundational Client Ready",
    "description": "The team can responsibly accept a real foundational client with finalized deliverables, legal readiness, portal readiness, data intake solved, support readiness, governed agent capabilities, and M2-ready starter offerings for Mixed Reality training, patient education/experience, and payer intelligence/documentation guidance.",
    "status": "locked",
    "owner": "Max",
    "sortOrder": 2,
    "readinessScore": 2,
    "gateNotes": "M2 is the real-client readiness gate: final deliverables, legal, portal, data, support, governed agents, the Mixed Reality working starter package, the patient education/experience foundation, and the payer intelligence/documentation-guidance foundation must be built and internally/mock validated. Real-patient foundational-client validation remains M4 evidence; a live payer-integration pilot remains M5 evidence."
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
    "description": "Confirm M1 will use at least two distinct mock-client paths: one website or AI-chat lead and one Adrian relationship lead. Detailed client data inputs are defined later near closeout.",
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
    "description": "Adrian-approved baseline: if no response 3–4 business days after first touch, send follow-up by the best available channel and optionally call when phone exists and lead warmth/value justifies it.",
    "primaryOwner": "Adrian",
    "status": "review",
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
    "description": "Adrian-approved baseline: default final nudge occurs around business day 7–8, or business day 5 for warm/referral/high-intent fast-lane leads; final close-loop is email-only by default.",
    "primaryOwner": "Adrian",
    "status": "review",
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
    "description": "Adrian-approved outreach cadence moves default no-response/stalled review to around business day 10, with a business day 7 fast lane. Samir approved the future-market model: Nurture / Recycle Later plus structured Future Market / Geography hold reason and filtered view. Samir still owns the remaining not-fit, nurture, and close/no-response business rules.",
    "primaryOwner": "Adrian",
    "status": "review",
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
    "description": "Adrian-approved channel baseline: website/contact/AI-chat leads are call-first when phone exists and email-first when no phone exists; Adrian/network leads use relationship judgment; referral/manual text-first is not default unless warm or permissioned.",
    "primaryOwner": "Adrian",
    "status": "review",
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
    "description": "Approved: Adrian remains the relationship owner after a positive response and decides when the lead is ready to include Samir. Samir is not automatically added to every Initial Fit Call, and interest alone does not bypass qualification/discovery or trigger a proposal.",
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
    "description": "Clarify how to close or recycle a lead that responds negatively.",
    "primaryOwner": "Adrian",
    "status": "ready",
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
    "description": "Drafted in Obsidian Client Communication Log page: log every meaningful touch that affects relationship context, pipeline status, next action, materials sent, or follow-up. Needs Adrian/Samir review.",
    "primaryOwner": "Adrian",
    "status": "review",
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
    "description": "Drafted in Obsidian Client Communication Log page: lead/client, contact, facility, date/time, owner, channel, direction, source/context, summary, outcome, next step, follow-up due date, and materials sent. Needs Max review for schema.",
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
    "description": "Drafted in Obsidian Client Communication Log page: first outreach moves Contact Needed to Contacted, positive reply moves toward discovery, no-response threshold moves to stalled, and meaningful outcomes create next steps. Needs Max/Samir review.",
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
    "description": "Run website/AI-chat and Adrian/network mock leads through communication logging, verify history appears on the lead/client record, and confirm owner/next follow-up/status changes are visible.",
    "primaryOwner": "Bloq",
    "status": "ready",
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
    "title": "Define Initial Fit Call question bank",
    "description": "Drafted in Obsidian Qualification and Discovery page: capture facility type, OR count, surgical mix, current block activity, champion candidate, surgeon buy-in, pain point, decision path, and timeline. Needs Adrian/Samir review.",
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
    "description": "Drafted in Obsidian Qualification and Discovery page: facility, surgical mix, current blocks, champion, decision path, pain points, qualification read, red/yellow flags, questions for Samir, and recommended next step. Needs Samir/Adrian review.",
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
    "title": "Define Scope Assessment Call question banks",
    "description": "Approved: the Scope Assessment Call is required before proposal work; all five discovery areas must be answered or explicitly unresolved, and material unknowns block proposal creation until resolved.",
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
    "title": "Test qualification and discovery with mock-client paths",
    "description": "Run website/AI-chat and Adrian/network mock leads through Initial Fit Call, qualification outcome, communication logging, CRM stage movement, and next-step creation.",
    "primaryOwner": "Bloq",
    "status": "ready",
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
    "description": "Samir reviews Batch 3 pages for accuracy: Block Ops Operating System, Roles and Ownership, Mission Control Rules, Weekly Ops Review, Decision Capture, and Status Rules.",
    "primaryOwner": "Samir",
    "status": "ready",
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
    "description": "Drafted in Obsidian Digital Platform Overview page: client portal, internal Dashboard, Mission Control, Block Ops Wiki/Compendium, Obsidian, and Supabase each have separate roles. Needs Samir/Max review.",
    "primaryOwner": "Samir",
    "status": "review",
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
    "description": "Drafted in Obsidian Dashboard page: Dashboard is the calm summary home with current milestone, overall progress, and individual task progress; it should shortcut into Mission Control without becoming a task dump. Needs Max/Samir review.",
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
    "description": "Samir approved the business behavior: Supabase is canonical live state; the internal Wiki is the governed reading/search layer; Obsidian is the agent-optimized knowledge mirror, authoring workspace, source context, and continuity layer; Mission Control links execution to Wiki context; the client portal stays separate and approved-final only. Remains in review for Max to verify the implemented data and UI paths.",
    "primaryOwner": "Samir",
    "status": "review",
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
    "description": "Samir and Max review Batch 4 pages for accuracy: Digital Platform Overview, Client Portal, Dashboard, Mission Control, Block Ops Wiki / Compendium, Supabase Data Model, and Design Handoff Process.",
    "primaryOwner": "Samir",
    "status": "ready",
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
    "description": "Create the process for moving internal drafts to approved-final state: each relevant owner reviews the page/artifact, approves or requests changes, and final status is only applied after required approvals are recorded.",
    "primaryOwner": "Samir",
    "status": "ready",
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
    "description": "Test the client-facing app/portal paths early in M1 to confirm drafts, internal Mission Control details, Jarvis/internal language, implementation notes, and unapproved Wiki pages are not visible to clients. Create fix tasks for any leak found.",
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
    "description": "Write the operating reference that explains Supabase/live Dashboard, Mission Control, Wiki/admin content, Obsidian, source seed, and verification checklist roles so future changes do not drift or update only one layer.",
    "primaryOwner": "Bloq",
    "status": "ready",
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
    "title": "Define training day readiness checklist",
    "description": "Drafted in Obsidian Training Day Readiness page: champion, site configuration, materials, access, prep call, schedule, supplies, LAST readiness, observation logger, and educator/consultant boundary. Needs Samir review.",
    "primaryOwner": "Samir",
    "status": "review",
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
    "description": "Drafted in Obsidian Go-Live Verification page: portal access, approved materials, safety infrastructure, documentation/logging, support cadence, escalation path, metrics, and Mission Control status. Needs Samir/Max review.",
    "primaryOwner": "Samir",
    "status": "review",
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
    "description": "Drafted in Obsidian Clinical / Block Program Knowledge Index page: groups foundation deliverables by physical ops, training, patient integration, clinical safety, documentation/value, and ultrasound/technique. Needs Samir fact review before final use.",
    "primaryOwner": "Samir",
    "status": "review",
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
    "description": "Samir reviews Batch 5 pages for accuracy: Client Onboarding, Implementation Bundle Delivery, Training Day Readiness, Go-Live Verification, and Clinical / Block Program Knowledge Index.",
    "primaryOwner": "Samir",
    "status": "ready",
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
    "description": "Set the operating rule for when a lead becomes no-response/stalled, such as no reply after a defined number of days or touches.",
    "primaryOwner": "Samir",
    "status": "ready",
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
    "description": "Set the business rule for when a stalled lead should be paused, closed-lost, or kept active.",
    "primaryOwner": "Samir",
    "status": "ready",
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
    "description": "Write the internal operating note for the no-response/stalled-lead workflow and link it back to M1.",
    "primaryOwner": "Bloq",
    "status": "ready",
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
    "description": "Create the end-of-milestone checklist that proves M1 using mock client paths, edge cases, CRM visibility, portal/account flow, deliverables, proposal/contract flow, onboarding, go-live, and closeout proof.",
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
    "description": "Near M1 closeout, define facility names, contacts, exact scenarios, deliverable assignments, and portal content for the required mock clients.",
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
    "title": "Run website / AI-chat mock client",
    "description": "Near M1 closeout, run one website or AI-chat mock client from lead capture to mock go-live and capture pass/fail notes.",
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
    "description": "Near M1 closeout, run one Adrian relationship mock client from manual/network lead entry to mock go-live and capture pass/fail notes.",
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
    "title": "Decide whether extra mock clients are needed",
    "description": "After the two required mock clients run, decide if additional edge-case mock clients are needed for password reset, stalled leads, missing info, different deliverables, permissions, or messy CRM data.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "M1 Final System Test",
    "milestoneSlug": "m1-mock-run-build-ready",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 450
  },
  {
    "taskKey": "M1-FST-06",
    "title": "Write M1 completion readout",
    "description": "Summarize what was tested, what passed, what failed, what got fixed, and what moves to M2.",
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
    "title": "Define training and boots-on-ground readiness",
    "description": "Make the client training and site support process executable.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "Training and Support",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 80
  },
  {
    "taskKey": "M2-09",
    "title": "Define billing, invoicing, and payment operations",
    "description": "Make sure the money flow is operational and can be tracked without improvisation.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "Commercial Operations",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": false,
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
    "title": "Operationalize the recurring pack-service promise",
    "description": "Prove Block Ops can maintain every active pack through continuous Dashboard access, KPI history, approved updates, material notices, standard support, evidence-based recommendations, monthly data refresh where practical, quarterly performance review, and annual configuration review. Define boundaries, handoffs, response times, and premium service tiers before sale.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "Training and Support",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 150
  },
  {
    "taskKey": "M2-16",
    "title": "Run the mock-client proof against M2",
    "description": "Prove the real-client version of the workflow can run without major improvisation.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "critical",
    "workstream": "Mock Client Proof",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 160
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
    "title": "Synthesize validation feedback",
    "description": "Pull the review notes into one current truth.",
    "primaryOwner": "Bloq",
    "status": "locked",
    "priority": "critical",
    "workstream": "Closure",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 10
  },
  {
    "taskKey": "M4-02",
    "title": "Patch the major holes",
    "description": "Fix the biggest issues found during validation.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "critical",
    "workstream": "Closure",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 20
  },
  {
    "taskKey": "M4-03",
    "title": "Resolve clinical clarity issues",
    "description": "Clean up anything that made the clinical story vague or unsafe.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "Closure",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 30
  },
  {
    "taskKey": "M4-04",
    "title": "Retest the changed flow",
    "description": "Confirm the patched flow still works cleanly end to end.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "Retest",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 40
  },
  {
    "taskKey": "M4-05",
    "title": "Confirm validation is closed",
    "description": "Decide if the system is ready to move on to founding partner motion.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "Completion",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": false,
    "sortOrder": 50
  },
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
    "taskKey": "M1-FST-05",
    "dependsOnTaskKey": "M1-FST-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-05",
    "dependsOnTaskKey": "M1-FST-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M1-FST-06",
    "dependsOnTaskKey": "M1-FST-05",
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
    "taskKey": "M2-05",
    "dependsOnTaskKey": "M2-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-06",
    "dependsOnTaskKey": "M2-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-07",
    "dependsOnTaskKey": "M2-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-08",
    "dependsOnTaskKey": "M2-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-09",
    "dependsOnTaskKey": "M2-08",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-10",
    "dependsOnTaskKey": "M2-09",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-11",
    "dependsOnTaskKey": "M2-10",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-12",
    "dependsOnTaskKey": "M2-11",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-13",
    "dependsOnTaskKey": "M2-12",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-14",
    "dependsOnTaskKey": "M2-13",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-15",
    "dependsOnTaskKey": "M2-14",
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
    "taskKey": "M3-15",
    "dependsOnTaskKey": "M3-14",
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
