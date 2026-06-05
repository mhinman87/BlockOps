const MILESTONE_COPY_OVERRIDES = {
  'm1-mock-run-build-ready': {
    title: 'Fake client through all the way',
    description: 'Complete when a fake client can move end-to-end through the full system without the flow breaking.',
    gateNotes: 'Milestone 1.',
  },
  'm2-mock-run-complete': {
    title: 'Client all the way through with finalized deliverables and quality testing',
    description: 'Complete when the client run is clean, the deliverables are finalized, and quality testing is done.',
    gateNotes: 'Milestone 2.',
  },
  'm3-trusted-anesthesiologist-validation': {
    title: 'Passed the attendings tests',
    description: 'Complete when attendings have pressure-tested the system and the biggest issues from that review are closed.',
    gateNotes: 'Milestone 3.',
  },
  'm4-validation-closed': {
    title: 'Passed the attendings tests',
    description: 'Complete when the attending feedback loop is closed and the system is ready to move forward.',
    gateNotes: 'Milestone 3.',
  },
  'm5-founding-partner-ready': {
    title: 'Successfully completed founding partners',
    description: 'Complete when the founding partner package is ready and the motion can run with real partners.',
    gateNotes: 'Milestone 4.',
  },
  'm6-first-founding-partner-signed': {
    title: 'Successfully completed founding partners',
    description: 'Complete when the first founding partner agreement is in place and active.',
    gateNotes: 'Milestone 4.',
  },
  'm7-first-founding-partner-live': {
    title: 'Successfully completed founding partners',
    description: 'Complete when the first founding partner is onboarded and live.',
    gateNotes: 'Milestone 4.',
  },
  'm8-additional-founding-partners': {
    title: 'Successfully completed founding partners',
    description: 'Complete when the founding partner motion is stable enough to support additional partners.',
    gateNotes: 'Milestone 4.',
  },
  'm9-paid-client-readiness': {
    title: 'Successfully completed first paid client',
    description: 'Complete when the team is stable and ready to take on the first paid client.',
    gateNotes: 'Milestone 5.',
  },
  'm10-first-paid-client': {
    title: 'Successfully completed first paid client',
    description: 'Complete when the first paid client is signed, onboarded, and actively being delivered.',
    gateNotes: 'Milestone 5.',
  },
};

export const normalizeLaunchMilestoneRow = (row) => ({
  id: row.id,
  slug: row.slug,
  title: MILESTONE_COPY_OVERRIDES[row.slug]?.title || row.title,
  description: MILESTONE_COPY_OVERRIDES[row.slug]?.description || row.description,
  status: row.status,
  owner: row.owner,
  targetDate: row.target_date,
  sortOrder: row.sort_order ?? 0,
  readinessScore: row.readiness_score ?? 0,
  gateNotes: MILESTONE_COPY_OVERRIDES[row.slug]?.gateNotes || row.gate_notes,
});

export const normalizeLaunchTaskRow = (row) => ({
  id: row.id,
  taskKey: row.task_key,
  title: row.title,
  description: row.description,
  primaryOwner: row.primary_owner,
  status: row.status,
  priority: row.priority,
  workstream: row.workstream,
  milestoneId: row.milestone_id,
  dueDate: row.due_date,
  notes: row.notes,
  complianceFlag: Boolean(row.compliance_flag),
  legalGateFlag: Boolean(row.legal_gate_flag),
  changedByNewInfo: Boolean(row.changed_by_new_info),
  sortOrder: row.sort_order ?? 0,
  completedAt: row.completed_at ?? null,
});

export const normalizeWeeklyAgendaRow = (row) => ({
  id: row.id,
  weekOf: row.week_of,
  northStarNote: row.north_star_note,
  currentMilestoneSlug: row.current_milestone_slug,
  companyPriorities: row.company_priorities,
  samirFocus: row.samir_focus,
  maxFocus: row.max_focus,
  adrianFocus: row.adrian_focus,
  sharedItems: row.shared_items,
  blockedItems: row.blocked_items,
  decisionsNeeded: row.decisions_needed,
  launchRisks: row.launch_risks,
});

export const buildTaskCollaboratorMap = (rows = []) => rows.reduce((acc, row) => {
  const taskId = row.task_id;
  if (!taskId) return acc;
  if (!acc[taskId]) acc[taskId] = [];
  acc[taskId].push(row.collaborator);
  return acc;
}, {});

export const buildTaskDependencyMap = (rows = []) => rows.reduce((acc, row) => {
  const taskId = row.task_id;
  if (!taskId) return acc;
  if (!acc[taskId]) acc[taskId] = [];
  acc[taskId].push({
    dependsOnTaskId: row.depends_on_task_id,
    dependencyType: row.dependency_type,
  });
  return acc;
}, {});

const isDoneStatus = (status) => status === 'done';
const isHardDependency = (dependencyType) => dependencyType === 'finish_to_start' || dependencyType === 'gate';

export const deriveTaskState = ({ task, dependencyMap = {}, tasksById = {} }) => {
  const dependencies = dependencyMap[task.id] || [];
  const blockingTaskIds = [];
  const softBlockedTaskIds = [];

  dependencies.forEach((dependency) => {
    const upstreamTask = tasksById[dependency.dependsOnTaskId];
    const upstreamStatus = upstreamTask?.status;
    const isSatisfied = isDoneStatus(upstreamStatus);

    if (dependency.dependencyType === 'soft_blocker') {
      if (!isSatisfied) softBlockedTaskIds.push(dependency.dependsOnTaskId);
      return;
    }

    if (isHardDependency(dependency.dependencyType) && !isSatisfied) {
      blockingTaskIds.push(dependency.dependsOnTaskId);
    }
  });

  if (blockingTaskIds.length > 0 && !isDoneStatus(task.status)) {
    return {
      computedStatus: 'locked',
      blockingTaskIds,
      softBlockedTaskIds,
      hasBlockingDependencies: true,
    };
  }

  return {
    computedStatus: task.status,
    blockingTaskIds,
    softBlockedTaskIds,
    hasBlockingDependencies: false,
  };
};

export const buildMilestoneReadinessSummary = ({ milestones = [], tasks = [] }) => milestones.map((milestone) => {
  const milestoneTasks = tasks.filter((task) => task.milestoneId === milestone.id);
  const totalTasks = milestoneTasks.length;
  const completedTasks = milestoneTasks.filter((task) => isDoneStatus(task.status)).length;
  const activeTasks = totalTasks - completedTasks;
  const readinessFromTasks = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    id: milestone.id,
    slug: milestone.slug,
    title: milestone.title,
    totalTasks,
    completedTasks,
    activeTasks,
    readinessFromTasks,
  };
});
