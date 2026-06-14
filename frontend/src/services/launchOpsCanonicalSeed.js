// Canonical Mission Control structure.
//
// This is the source of truth for the milestone / workflow / task ladder so the
// board always renders the full operating picture even when the live Supabase
// rows are missing or incomplete. Live rows are merged ON TOP of this (see
// launchOpsMerge.js): live state (status, owner, completion) wins, canonical
// supplies structure and any rows the database is missing.
//
// Milestone ladder (M1–M10) uses the approved plain-English naming.

export const CANONICAL_MILESTONES = [
  {
    slug: 'm1-mock-run-build-ready',
    code: 'M1',
    title: 'Mock Client Lead-to-Live Run',
    description: 'Run a mock client from first contact all the way to live without the system breaking.',
    status: 'in_progress',
    owner: 'Max',
    sortOrder: 1,
    readinessScore: 20,
    gateNotes: 'M1 — the system can carry a client end to end.',
  },
  {
    slug: 'm2-mock-run-complete',
    code: 'M2',
    title: 'Foundational Client Ready',
    description: 'A foundational client setup is complete, clean, and something we can stand behind.',
    status: 'locked',
    owner: 'Max',
    sortOrder: 2,
    readinessScore: 0,
    gateNotes: 'M2 — the foundational run is clean and final.',
  },
  {
    slug: 'm3-trusted-anesthesiologist-validation',
    code: 'M3',
    title: 'Externally Trusted Validation Ready',
    description: 'Trusted outside experts have pressure-tested the system and signed off on what matters.',
    status: 'locked',
    owner: 'Samir',
    sortOrder: 3,
    readinessScore: 0,
    gateNotes: 'M3 — external validation is set up and ready to run.',
  },
  {
    slug: 'm4-validation-closed',
    code: 'M4',
    title: 'Validation Round Closed / Holes Patched',
    description: 'The validation round is finished and the gaps it exposed have been patched.',
    status: 'locked',
    owner: 'Samir',
    sortOrder: 4,
    readinessScore: 0,
    gateNotes: 'M4 — validation feedback is closed out.',
  },
  {
    slug: 'm5-founding-partner-ready',
    code: 'M5',
    title: 'Founding Partner Ready',
    description: 'Everything required to bring on a founding partner is in place.',
    status: 'locked',
    owner: 'Adrian',
    sortOrder: 5,
    readinessScore: 0,
    gateNotes: 'M5 — we can confidently sign a founding partner.',
  },
  {
    slug: 'm6-first-founding-partner-signed',
    code: 'M6',
    title: 'First Founding Partner Signed',
    description: 'The first founding partner has signed.',
    status: 'locked',
    owner: 'Adrian',
    sortOrder: 6,
    readinessScore: 0,
    gateNotes: 'M6 — first founding partner committed.',
  },
  {
    slug: 'm7-first-founding-partner-live',
    code: 'M7',
    title: 'First Founding Partner Live',
    description: 'The first founding partner is live and running on the system.',
    status: 'locked',
    owner: 'Samir',
    sortOrder: 7,
    readinessScore: 0,
    gateNotes: 'M7 — first founding partner is live.',
  },
  {
    slug: 'm8-additional-founding-partners',
    code: 'M8',
    title: 'Additional Founding Partners',
    description: 'Additional founding partners are onboarded and live.',
    status: 'locked',
    owner: 'Adrian',
    sortOrder: 8,
    readinessScore: 0,
    gateNotes: 'M8 — the founding partner motion repeats.',
  },
  {
    slug: 'm9-paid-client-readiness',
    code: 'M9',
    title: 'Paid Client Ready',
    description: 'Everything required to take on a paying client is ready.',
    status: 'locked',
    owner: 'Max',
    sortOrder: 9,
    readinessScore: 0,
    gateNotes: 'M9 — we can confidently sign a paid client.',
  },
  {
    slug: 'm10-first-paid-client',
    code: 'M10',
    title: 'First Paid Client',
    description: 'The first paid client is signed, onboarded, and in delivery.',
    status: 'locked',
    owner: 'Adrian',
    sortOrder: 10,
    readinessScore: 0,
    gateNotes: 'M10 — first paid client is in delivery.',
  },
];

// Workflows (lanes) tasks are grouped under inside each milestone.
export const CANONICAL_WORKFLOWS = [
  'Clinical Standard & Validation',
  'Product & System Build',
  'Commercial & Partnerships',
  'Operating Cadence & Gates',
  'Board Operations',
];

// Workflow is derived from the task-key prefix so it stays consistent.
export const workflowForTaskKey = (taskKey = '') => {
  if (/^M\d+A$/.test(taskKey)) return 'Board Operations';
  const prefix = taskKey.charAt(0).toUpperCase();
  switch (prefix) {
    case 'S': return 'Clinical Standard & Validation';
    case 'X': return 'Product & System Build';
    case 'A': return 'Commercial & Partnerships';
    case 'O': return 'Operating Cadence & Gates';
    default: return 'Board Operations';
  }
};

// [taskKey, title, description, primaryOwner, status, priority, milestoneSlug, complianceFlag, legalGateFlag, sortOrder]
const TASK_ROWS = [
  ['S1', 'Set the M1 bar', 'Agree on what must be true before we can run the mock client end to end.', 'Samir', 'this_week', 'critical', 'm1-mock-run-build-ready', false, false, 10],
  ['S2', 'List the missing pieces', 'Turn the M1 bar into a short list of things still missing.', 'Samir', 'ready', 'high', 'm1-mock-run-build-ready', false, false, 20],
  ['S3', 'Plan the client walkthrough', 'Write the simple steps the mock client should follow.', 'Samir', 'locked', 'high', 'm1-mock-run-build-ready', false, false, 30],
  ['S4', 'Pick the reviewer list', 'Choose the first attendings to pressure-test the system.', 'Samir', 'ready', 'high', 'm3-trusted-anesthesiologist-validation', false, false, 40],
  ['S5', 'Write the review questions', 'List the questions the reviewers should answer.', 'Samir', 'locked', 'high', 'm3-trusted-anesthesiologist-validation', false, false, 50],
  ['S6', 'Check the legal gates', 'Confirm which legal and safety items are required before a founding partner can sign.', 'Samir', 'ready', 'high', 'm5-founding-partner-ready', true, true, 60],
  ['X1', 'Map the launch data model', 'Turn the launch plan into the data structure the dashboard needs.', 'Max', 'this_week', 'critical', 'm1-mock-run-build-ready', false, false, 70],
  ['X2', 'List the screens we need', 'Decide which screens must exist for the mock-client flow.', 'Max', 'this_week', 'critical', 'm1-mock-run-build-ready', false, false, 80],
  ['X3', 'Build the M1 checklist', 'Write the checklist that tells us when M1 is truly ready.', 'Max', 'ready', 'critical', 'm1-mock-run-build-ready', false, false, 90],
  ['X4', 'Run the mock client', 'Walk a mock client through the full flow and note any break points.', 'Max', 'this_week', 'critical', 'm2-mock-run-complete', false, false, 100],
  ['X5', 'Plan the board upgrade', 'Decide how the task board should store milestones, owners, and links.', 'Max', 'ready', 'high', 'm1-mock-run-build-ready', false, false, 110],
  ['X6', 'Separate mock and live rules', 'Write what is allowed in the mock run versus a real launch.', 'Max', 'ready', 'high', 'm5-founding-partner-ready', false, false, 120],
  ['X7', 'Set the safety gate list', 'Turn safety and privacy concerns into a clear go or no-go list.', 'Max', 'ready', 'high', 'm5-founding-partner-ready', true, true, 130],
  ['X8', 'Prepare the review pack', 'Gather the notes, template, and issue log for reviewer sessions.', 'Max', 'locked', 'medium', 'm3-trusted-anesthesiologist-validation', false, false, 140],
  ['X9', 'Set the proof tracker', 'Decide what usage and outcome data we should keep.', 'Max', 'ready', 'medium', 'm9-paid-client-readiness', false, false, 150],
  ['X10', 'Plan the live task board', 'Turn the new schema into a simple build order.', 'Max', 'locked', 'high', 'm1-mock-run-build-ready', false, false, 160],
  ['A1', 'Map the client journey', 'Write the path from first contact to onboarding in plain terms.', 'Adrian', 'this_week', 'critical', 'm1-mock-run-build-ready', false, false, 170],
  ['A2', 'Define the founding partner fit', 'Decide who is a good early partner and who is not.', 'Adrian', 'ready', 'high', 'm5-founding-partner-ready', false, false, 180],
  ['A3', 'Polish the onboarding handoff', 'Make the mock onboarding feel like a real client handoff.', 'Adrian', 'ready', 'high', 'm2-mock-run-complete', false, false, 190],
  ['A4', 'Set the reviewer outreach', 'Decide how to invite the attending reviewers.', 'Adrian', 'ready', 'medium', 'm3-trusted-anesthesiologist-validation', false, false, 200],
  ['A5', 'Draft the partner offer', 'Write the simple terms for the first partner relationship.', 'Adrian', 'locked', 'high', 'm5-founding-partner-ready', false, false, 210],
  ['A6', 'Fill the sales gaps', 'List the one-pagers, visuals, and buyer materials still missing.', 'Adrian', 'ready', 'medium', 'm5-founding-partner-ready', false, false, 220],
  ['O1', 'Set the M1 go or no-go', 'Agree on the exact line between not ready and ready for a mock client.', 'Samir', 'ready', 'critical', 'm1-mock-run-build-ready', false, false, 230],
  ['O2', 'Set the M2 finish line', 'Define what a clean foundational client run has to include.', 'Samir', 'ready', 'high', 'm2-mock-run-complete', false, false, 240],
  ['O3', 'List the founding partner gates', 'Turn legal and risk items into a clear sign-off list.', 'Samir', 'ready', 'critical', 'm9-paid-client-readiness', true, true, 250],
  ['O4', 'Capture review fixes', 'Write how feedback becomes updates after the review sessions.', 'Samir', 'locked', 'medium', 'm3-trusted-anesthesiologist-validation', false, false, 260],
  ['O5', 'Keep the weekly agenda current', 'Update the plan each week so the team sees what changed.', 'Bloq', 'in_progress', 'high', 'm1-mock-run-build-ready', false, false, 270],
  ['M1A', 'Clean up the board view', 'Make the board easier to scan at a glance.', 'Bloq', 'ready', 'medium', 'm1-mock-run-build-ready', false, false, 280],
  ['M2A', 'Fix the run notes', 'Write the clean notes from the foundational client run.', 'Bloq', 'locked', 'medium', 'm2-mock-run-complete', false, false, 290],
  ['M3A', 'Write the follow-up summary', 'Turn reviewer feedback into a short next-step list.', 'Bloq', 'ready', 'medium', 'm3-trusted-anesthesiologist-validation', false, false, 300],
  ['M4A', 'Prepare the partner one-pager', 'Build a simple sheet that explains the partner offer.', 'Bloq', 'locked', 'medium', 'm5-founding-partner-ready', false, false, 310],
  ['M5A', 'Set the client update rhythm', 'Decide when and how the client gets updates.', 'Bloq', 'ready', 'medium', 'm9-paid-client-readiness', false, false, 320],
];

export const CANONICAL_TASKS = TASK_ROWS.map(([
  taskKey, title, description, primaryOwner, status, priority, milestoneSlug, complianceFlag, legalGateFlag, sortOrder,
]) => ({
  taskKey,
  title,
  description,
  primaryOwner,
  status,
  priority,
  workstream: workflowForTaskKey(taskKey),
  milestoneSlug,
  complianceFlag,
  legalGateFlag,
  sortOrder,
}));

// [taskKey, dependsOnTaskKey, dependencyType]
export const CANONICAL_DEPENDENCIES = [
  ['S2', 'S1', 'finish_to_start'],
  ['S3', 'S2', 'finish_to_start'],
  ['S5', 'X8', 'finish_to_start'],
  ['X2', 'S1', 'finish_to_start'],
  ['X3', 'S2', 'finish_to_start'],
  ['X3', 'X2', 'finish_to_start'],
  ['X4', 'S3', 'finish_to_start'],
  ['X4', 'X2', 'finish_to_start'],
  ['X5', 'X1', 'finish_to_start'],
  ['X6', 'S6', 'gate'],
  ['X7', 'S6', 'gate'],
  ['X8', 'S4', 'finish_to_start'],
  ['X10', 'X5', 'finish_to_start'],
  ['A3', 'A1', 'finish_to_start'],
  ['A3', 'S3', 'finish_to_start'],
  ['A4', 'A2', 'finish_to_start'],
  ['A4', 'S4', 'finish_to_start'],
  ['A5', 'A2', 'finish_to_start'],
  ['A5', 'X6', 'gate'],
  ['O1', 'S1', 'finish_to_start'],
  ['O1', 'A1', 'finish_to_start'],
  ['O2', 'X4', 'finish_to_start'],
  ['O2', 'A3', 'finish_to_start'],
  ['O3', 'S6', 'gate'],
  ['O3', 'X6', 'gate'],
  ['O3', 'X7', 'gate'],
  ['O4', 'X8', 'finish_to_start'],
].map(([taskKey, dependsOnTaskKey, dependencyType]) => ({ taskKey, dependsOnTaskKey, dependencyType }));

// [taskKey, collaborator]
export const CANONICAL_COLLABORATORS = [
  ['S1', 'Max'], ['S2', 'Max'], ['S3', 'Adrian'], ['S4', 'Adrian'], ['S5', 'Adrian'], ['S5', 'Max'], ['S6', 'Max'],
  ['X1', 'Bloq'], ['X2', 'Samir'], ['X2', 'Adrian'], ['X3', 'Samir'], ['X3', 'Adrian'], ['X4', 'Samir'], ['X4', 'Adrian'],
  ['X5', 'Bloq'], ['X6', 'Samir'], ['X7', 'Samir'], ['X8', 'Samir'], ['X8', 'Adrian'], ['X9', 'Samir'], ['X9', 'Adrian'], ['X10', 'Bloq'],
  ['A1', 'Max'], ['A2', 'Samir'], ['A3', 'Samir'], ['A3', 'Max'], ['A4', 'Samir'], ['A5', 'Samir'], ['A5', 'Max'], ['A6', 'Max'],
  ['O1', 'Samir'], ['O1', 'Adrian'], ['O2', 'Samir'], ['O2', 'Adrian'], ['O3', 'Max'], ['O3', 'Adrian'], ['O4', 'Samir'], ['O4', 'Adrian'],
  ['O5', 'Samir'], ['O5', 'Max'], ['O5', 'Adrian'],
].map(([taskKey, collaborator]) => ({ taskKey, collaborator }));
