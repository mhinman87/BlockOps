const milestoneCodeFromSlug = (slug = '') => {
  const match = /^m(\d+)-/i.exec(slug);
  return match ? `M${match[1]}` : '';
};

export const normalizeLaunchMilestoneRow = (row) => {
  return {
    id: row.id,
    slug: row.slug,
    code: milestoneCodeFromSlug(row.slug),
    title: row.title,
    description: row.description,
    status: row.status,
    owner: row.owner,
    targetDate: row.target_date,
    sortOrder: row.sort_order ?? 0,
    readinessScore: row.readiness_score ?? 0,
    gateNotes: row.gate_notes,
  };
};

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
  primaryWikiPageId: row.primary_wiki_page_id ?? null,
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
