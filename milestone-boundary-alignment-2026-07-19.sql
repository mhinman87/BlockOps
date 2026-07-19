-- Block Ops milestone buildout-boundary alignment — approved 2026-07-19
-- Additive/in-place only: preserve task IDs, history, completed evidence, and expanded live catalog.

begin;

-- Clarify live-only M1 task boundaries without reopening completed smoke-test evidence.
update launch_tasks_v2 set
  description = 'Define the mock Client Assessment Meeting record fields for safety infrastructure, staffing model and accountable site roles, equipment/supplies, procurement path, agreement/signature path, payment trigger/status, evidence source, verification state, explicit Unknowns, blocker owner, and next action. M2 finalizes the real-client forms and systems.',
  action_note = 'Define the structured mock record and where it lives. Decision-changing Unknowns must block Proposal Preparation; other Unknowns retain one owner and next action. This is M1 mock workflow proof, not real-site readiness.',
  changed_by_new_info = true,
  updated_at = now()
where task_key = 'M1-50';

update launch_tasks_v2 set
  title = 'Retest unresolved site-readiness inputs and proposal gate',
  description = 'Using both required mock-client paths, record and check safety infrastructure, staffing/site roles, procurement, agreement, and payment inputs. Confirm decision-changing Unknowns block Proposal Preparation and nonblocking Unknowns retain an owner and next action.',
  action_note = 'Retest the mock Client Assessment Meeting record and proposal gate after M1-50 and the mock agreement/payment definitions are complete. Capture failures as separate fixes; do not claim real-site readiness.',
  priority = 'high', changed_by_new_info = true, updated_at = now()
where task_key = 'M1-90';

update launch_tasks_v2 set
  title = 'Define mock agreement input fields and handoff states',
  description = 'Define mock-only entity/site, scope, dates, services, commercial assumptions, signer/authority, procurement/legal reviewers, signature state, open conditions, and evidence reference. M2 owns lawyer-finalized real-client documents.',
  action_note = 'Define the fields and state handoffs needed to rehearse a mock agreement. Do not write, approve, or represent a real-client agreement as legally final.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-115';

update launch_tasks_v2 set
  description = 'Review the mock package for scope, dates, services, and commercial consistency only. This is not qualified-lawyer finalization or approval for real-client use.',
  action_note = 'Check only that the mock agreement matches the mock proposal and assumptions. Record gaps for M2 counsel finalization; do not provide legal approval.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-117';

update launch_tasks_v2 set
  description = 'Define simulated or executed-mock signature evidence and the state change used for the M1 onboarding handoff; this is not proof of a real enforceable agreement.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-122';

update launch_tasks_v2 set
  description = 'Historical M1 smoke test of mock agreement preparation, send, follow-up, simulated signature, and Client Kickoff trigger. Controlled payment-gate testing remains in M1-PAY-02; M2 finalizes legal and commercial operations.',
  notes = concat_ws(E'\n', nullif(notes, ''), '2026-07-19 boundary clarification: preserve this completed smoke-test evidence; it does not prove lawyer-finalized agreements or real payment operations.'),
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-124';

update launch_tasks_v2 set
  description = 'Define the mock signed-evidence rule plus the configured simulated payment condition that authorizes Client Kickoff. M2 finalizes real agreement and billing/payment operations.',
  notes = concat_ws(E'\n', nullif(notes, ''), '2026-07-19 boundary clarification: signed-state behavior passed historically; M1-PAY-01 and M1-PAY-02 separately define and test simulated payment-gate behavior.'),
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-125';

update launch_tasks_v2 set
  status = 'done',
  description = 'Completed 2026-07-19. M1 uses an explicitly mock-only payment record with proposal/version, amount/schedule or Unknown, billing contact or owned Unknown, configured condition, trigger/due state, accountable owner, evidence, exception controls, and downstream authorization. Only Simulated received, proposal-backed Not required, or an evidenced Authorized mock exception can satisfy the payment side of Client Kickoff; all other states fail closed. This does not create real invoicing, collection, accounting, finance approval, waiver authority, or payment operations. M1-PAY-02 retains live/mock-path testing.',
  notes = concat_ws(E'\n', nullif(notes, ''), '2026-07-19: reconciled from the approved payment-dependent onboarding gate and explicit M1 mock-only boundary; detailed record/status rule is governed in Client Onboarding.'),
  completed_at = coalesce(completed_at, now()),
  changed_by_new_info = true,
  updated_at = now()
where task_key = 'M1-PAY-01';

update launch_tasks_v2 set
  title = 'Check mock safety, equipment, supply, and procurement readiness evidence',
  description = 'Check that previously collected mock safety infrastructure, equipment/supply, staffing, workflow, procurement, evidence states, and Unknowns are recorded and routed correctly. This is not real clinical or site approval.',
  action_note = 'Perform a downstream check of the mock readiness record; flag missing or decision-changing inputs. M2 finalizes and validates the real-client standard.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-165';

update launch_tasks_v2 set
  description = 'Define the mock pre-training people-readiness checklist: site champion, accountable clinical owner, operational owner, nursing/technical roles, Block Ops roles, attendance, reachability, backups, and unresolved role gaps.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-GR-024';

update launch_tasks_v2 set
  description = 'Define the simulated M1 mock go/no-go threshold and blocking rules. Real authority remains with qualified site, clinical, legal, and Block Ops owners under the M2-finalized process.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-168';

update launch_tasks_v2 set
  description = 'Confirm mock onboarding and training-readiness items are mock-complete, simulated, or recorded as unresolved blockers. Clinical or legal gates are never silently waived.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-174';

update launch_tasks_v2 set
  description = 'Confirm materials approved for the internal M1 mock rehearsal appear in the correct mock location. Real-client approved-final content and visibility are M2 requirements.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-176';

update launch_tasks_v2 set
  description = 'Approve only the mock state transition after the M1 checklist passes; this does not authorize a real clinical site or client program to go live.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M1-183';

-- Make the real-client legal buildout wording explicit while keeping lawyers as the finalizers.
update launch_tasks_v2 set
  title = 'Prepare the MSA candidate and route it for qualified counsel review',
  description = 'Prepare the controlled MSA candidate, obtain business-owner approval, record the open-issue list and exact version, and route it to appropriate qualified counsel. Preparation is not legal finalization.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M2-LGL-001';

update launch_tasks_v2 set
  title = 'Resolve counsel redlines and freeze the signature-ready contract package',
  description = 'Resolve counsel redlines, record accepted legal/business posture, lock exact versions and effective dates, define approved fallback clauses, and block release while any critical legal issue remains.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M2-LGL-010';

update launch_tasks_v2 set
  title = 'Assemble contract-package signoff checklist and approval evidence',
  description = 'Assemble exact-version counsel and business approvals, issue dispositions, and signature-ready evidence. Bloq may coordinate evidence; only qualified lawyers finalize legal content and Samir records business release.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M2-LGL-011';

update launch_tasks_v2 set
  description = 'Verify every required real-client agreement is identified, exact-version lawyer review is recorded, signature-ready versions and approved fallback clauses are controlled, and unresolved critical issues block M2.',
  changed_by_new_info = true, updated_at = now()
where task_key = 'M2-LGL-102';

commit;
