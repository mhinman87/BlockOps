import { WIKI_PILLAR_MAP } from './wikiPillarMapping.js';

// One primary knowledge context per Mission Control workflow. Task-specific
// overrides below keep broad workflows from obscuring a more precise page.
export const M1_WORKSTREAM_PRIMARY_WIKI_PAGE = Object.freeze({
  'Design Handoff to Max / Claude Design': 'Design Handoff Process',
  'Lead Capture': 'Lead Capture',
  'Outreach Sequence': 'Outreach Sequence',
  'Client Communication Log': 'Client Communication Log',
  'Qualification and Discovery': 'Qualification and Discovery',
  'Proposal Workflow': 'Proposal Workflow',
  'Sales Materials and Scripts': 'Sales Materials and Scripts',
  'Operating Model': 'Block Ops Operating System',
  'Platform & Internal/Client System': 'Digital Platform Overview',
  'Block Ops Wiki Buildout': 'Block Ops Wiki / Compendium',
  'Mock Client / Demo Flow': 'Client Onboarding',
  'Clinical Standard & Deliverables': 'Implementation Bundle Delivery',
  'Final Review / Approvals': 'Block Ops Wiki Go-Live Readiness Matrix',
  'Client-Facing Leak Audit': 'Compliance / Risk Controls',
  'Wiki / Obsidian Operating System': 'Block Ops Wiki / Compendium',
  'Wiki Cross-Linking': 'Wiki Cross-Linking Map',
  'No-Response / Stalled Lead': 'Outreach Sequence',
  'M1 Final System Test': 'Go-Live Verification',
  'SOP / Knowledge Organization': 'Block Ops Wiki / Compendium',
  'Dashboard / Mission Control UX': 'Dashboard',
  'Training Day Scheduling': 'Training Day Readiness',
  'CRM Pipeline Movement': 'CRM Pipeline Stages',
  'Onboarding Setup': 'Client Onboarding',
  'Discovery Call Scheduling': 'Qualification and Discovery',
  'Discovery Call': 'Qualification and Discovery',
  'Client Touchpoint Naming': 'Client Touchpoint Naming Taxonomy',
  'Post-Discovery Internal Decision': 'Qualification and Discovery',
  'Proposal Approval': 'Proposal Workflow',
  'Contract Flow': 'Legal Review Index',
  'Contract Signed to Onboarding Handoff': 'Client Onboarding',
  'Training-Day Readiness': 'Training Day Readiness',
  'Go-Live Verification': 'Go-Live Verification',
  'Mock Go-Live': 'Go-Live Verification',
  'First Metrics Capture': 'Go-Live Verification',
  'Block Ops Backup and Recovery': 'Backup and Continuity',
  'Internal AI Architecture Improvement': 'Digital Platform Overview',
});

export const M1_TASK_PRIMARY_WIKI_PAGE_OVERRIDES = Object.freeze({
  'M1-03': 'Lead Capture',
  'M1-04': 'Lead Capture',
  'M1-07': 'CRM Pipeline Stages',
  'M1-08': 'Sales Materials and Scripts',
  'M1-09': 'Outreach Sequence',

  'M1-OM-01': 'Block Ops Operating System',
  'M1-OM-02': 'Roles and Ownership',
  'M1-OM-03': 'Mission Control Rules',
  'M1-OM-04': 'Weekly Ops Review',
  'M1-OM-05': 'Decision Capture',
  'M1-OM-06': 'Status Rules',
  'M1-OPS-OWNER-01': 'Roles and Ownership',

  'M1-DP-01': 'Digital Platform Overview',
  'M1-DP-02': 'Client Portal',
  'M1-DP-03': 'Dashboard',
  'M1-DP-04': 'Mission Control',
  'M1-DP-05': 'Block Ops Wiki / Compendium',
  'M1-DP-06': 'Supabase Data Model',
  'M1-DP-07': 'Design Handoff Process',

  'M1-DCK-01': 'Client Onboarding',
  'M1-DCK-02': 'Implementation Bundle Delivery',
  'M1-DCK-03': 'Training Day Readiness',
  'M1-DCK-04': 'Go-Live Verification',
  'M1-DCK-05': 'Clinical / Block Program Knowledge Index',
  'M1-DCK-06': 'Clinical / Block Program Knowledge Index',

  'M1-WIKI-01': 'Block Ops Wiki Content Migration',
  'M1-WIKI-02': 'Block Ops Wiki Content Migration',
  'M1-WIKI-03': 'Block Ops Wiki Content Migration',
  'M1-WIKI-04': 'Pillar Model / Gold Standard Tree',
  'M1-WIKI-05': 'Lead Capture',
  'M1-WIKI-06': 'Block Ops Operating System',
  'M1-WIKI-07': 'Digital Platform Overview',
  'M1-WIKI-08': 'Clinical / Block Program Knowledge Index',
  'M1-WIKI-09': 'Compliance / Risk Controls',
  'M1-WIKI-10': 'Block Ops Wiki Go-Live Readiness Matrix',
  'M1-WIKI-11': 'Block Ops Wiki Six-Pillar Page Map',
  'M1-WIKI-12': 'Mission Control',
  'M1-WIKI-13': 'Block Ops Wiki Client-Facing Candidate Register',
  'M1-WIKI-14': 'Block Ops Wiki Go-Live Readiness Matrix',

  'M1-FINAL-REVIEW-01': 'Block Ops Wiki Go-Live Readiness Matrix',
  'M1-FINAL-REVIEW-02': 'Block Ops Wiki Go-Live Readiness Matrix',
  'M1-CLIENT-LEAK-01': 'Compliance / Risk Controls',
  'M1-SYNC-01': 'Backup and Continuity',

  'M1-WIKI-LINK-01': 'Wiki Cross-Linking Map',
  'M1-WIKI-LINK-02': 'Wiki Cross-Linking Map',
  'M1-WIKI-LINK-03': 'Wiki Cross-Linking Map',
  'M1-WIKI-LINK-04': 'Wiki Cross-Linking Map',
  'M1-WIKI-LINK-05': 'Wiki Cross-Linking Map',

  'M1-WOS-009': 'Decision Capture',
  'M1-WOS-010': 'Block Ops Wiki Content Migration',
  'M1-WOS-012': 'Mission Control',
  'M1-WOS-013': 'Design Handoff Process',
  'M1-WOS-014': 'Design Handoff Process',
  'M1-WOS-018': 'Decision Log / Historical Archive',
  'M1-WOS-019': 'Block Ops Wiki Go-Live Readiness Matrix',
  'M1-WOS-021': 'Mission Control',
  'M1-WOS-022': 'Block Ops Wiki Go-Live Readiness Matrix',
  'M1-WOS-023': 'Block Ops Wiki Go-Live Readiness Matrix',
  'M1-WOS-024': 'Weekly Ops Review',

  'M1-223': 'Mission Control',
  'M1-235': 'Digital Platform Overview',

  // First Metrics Capture tasks use metric-definition/measurement knowledge,
  // not the broader go-live verification page.
  'M1-GR-025': 'KPI Dictionary and Data Ownership',
  'M1-GR-026': 'KPI Dictionary and Data Ownership',
  'M1-197': 'KPI Dictionary and Data Ownership',
  'M1-198': 'KPI Dictionary and Data Ownership',
  'M1-200': 'KPI Dictionary and Data Ownership',
  'M1-201': 'KPI Dictionary and Data Ownership',
  'M1-205': 'KPI Dictionary and Data Ownership',
  'M1-199': 'Measurement Framework and Minimum Dataset',
  'M1-202': 'Measurement Framework and Minimum Dataset',
  'M1-203': 'Measurement Framework and Minimum Dataset',
  'M1-204': 'Measurement Framework and Minimum Dataset',
  'M1-207': 'Measurement Framework and Minimum Dataset',

  // Safe interim links for post-M1 tasks that already have a precise governed
  // Wiki destination. Broader M2–M4 work remains fail-closed until its
  // dedicated knowledge hubs are built.
  'M2-XR-PORTAL-04': 'Supabase Data Model',
  'M2-XR-PORTAL-05': 'Supabase Data Model',
  'M2-XR-RISK-02': 'Legal Review Index',
  'M2-XR-RISK-05': 'Legal Review Index',
  'M2-08': 'Training Day Readiness',
  'M4-XR-PROD-01': 'Supabase Data Model',
  'M4-XR-PROD-03': 'Backup and Continuity',
  'M4-XR-PROD-04': 'Compliance / Risk Controls',
  'M4-XR-PROD-05': 'Supabase Data Model',
  'M4-XR-COMM-01': 'Sales Materials and Scripts',
  'M4-XR-COMM-02': 'M2 Modular Pillar Offering Strategy',
  'M4-XR-COMM-03': 'Sales Materials and Scripts',
  'M4-XR-COMM-06': 'Foundational Client Readiness and Completion Matrix',
  'M2-PAT-001': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-002': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-003': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-004': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-005': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-006': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-007': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-008': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-009': 'Preoperative Patient Education and Experience Platform',
  'M2-PAT-010': 'Preoperative Patient Education and Experience Platform',
  'M4-PAT-011': 'Preoperative Patient Education and Experience Platform',
  'M4-PAT-012': 'Preoperative Patient Education and Experience Platform',
  'M2-PAY-001': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-002': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-003': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-004': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-005': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-006': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-007': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-008': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-009': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-010': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-PAY-011': 'Payer Intelligence and Documentation Guidance Platform',
  'M5-PAY-012': 'Payer Intelligence and Documentation Guidance Platform',
  'M2-FND-024': 'Foundation Implementation Bundle Manifest and Completion Standard',
  'M2-LRA-03': 'Acquisition / Growth Strategy',
  'M2-LRA-04': 'Backup and Continuity',
  'M2-06': 'Client Portal',
  'M2-XR-PORTAL-01': 'Supabase Data Model',
  'M2-09': 'Block Ops Operating System',
  'M2-LRA-05': 'Decision Log / Historical Archive',
  'M2-15': 'Recurring Client Support',
  'M2-13': 'Weekly Ops Review',
  'M2-14': 'Go-Live Verification',
  'M2-CLAIMS-01': 'Evidence and Claims Governance',
  'M2-DELIV-REVIEW-01': 'Foundation Implementation Bundle Manifest and Completion Standard',
  'M2-DOC-001': 'Commercial Product and Pack Architecture',
  'M2-07': 'Measurement Framework and Minimum Dataset',
});

export const isM1Task = (task = {}) => (
  task.milestoneSlug === 'm1-mock-run-build-ready'
  || /^M1(?:-|$)/.test(task.taskKey || task.task_key || '')
);

export const getPrimaryWikiPageTitle = (task = {}) => {
  const taskKey = task.taskKey || task.task_key;
  const explicitTaskPage = M1_TASK_PRIMARY_WIKI_PAGE_OVERRIDES[taskKey];
  if (explicitTaskPage) return explicitTaskPage;
  if (!isM1Task(task)) return null;
  const workstream = task.workstream;
  return M1_WORKSTREAM_PRIMARY_WIKI_PAGE[workstream] || null;
};

export const attachPrimaryWikiPage = (task = {}) => {
  const primaryWikiPageTitle = getPrimaryWikiPageTitle(task);
  if (isM1Task(task) && !primaryWikiPageTitle) {
    throw new Error(`M1 task is missing primary Wiki context: ${task.taskKey || task.task_key || '(unknown task)'}`);
  }
  if (primaryWikiPageTitle && !WIKI_PILLAR_MAP[primaryWikiPageTitle]) {
    throw new Error(`Task links to an unknown governed Wiki page: ${primaryWikiPageTitle}`);
  }
  return { ...task, primaryWikiPageTitle };
};
