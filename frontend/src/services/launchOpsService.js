import {
  buildMilestoneReadinessSummary,
  buildTaskCollaboratorMap,
  buildTaskDependencyMap,
  deriveTaskState,
  normalizeLaunchMilestoneRow,
  normalizeLaunchTaskRow,
  normalizeWeeklyAgendaRow,
} from './launchOpsTransforms.js';
import {
  buildMilestoneReadinessMap,
  buildUnlockedTaskIds,
  recomputeTaskStatuses,
} from './launchOpsIntelligence.js';


const getDefaultClient = async () => {
  const module = await import('./supabase.js');
  return module.supabase;
};

export const hydrateLaunchTasks = ({ taskRows = [], collaboratorRows = [], dependencyRows = [] } = {}) => {
  const tasks = taskRows.map(normalizeLaunchTaskRow);
  const collaboratorMap = buildTaskCollaboratorMap(collaboratorRows);
  const dependencyMap = buildTaskDependencyMap(dependencyRows);
  const tasksById = Object.fromEntries(tasks.map((task) => [task.id, task]));

  return tasks.map((task) => {
    const state = deriveTaskState({ task, dependencyMap, tasksById });
    return {
      ...task,
      collaborators: collaboratorMap[task.id] || [],
      dependencies: dependencyMap[task.id] || [],
      computedStatus: state.computedStatus,
      blockingTaskIds: state.blockingTaskIds,
      softBlockedTaskIds: state.softBlockedTaskIds,
      hasBlockingDependencies: state.hasBlockingDependencies,
    };
  });
};

export const fetchLaunchMilestones = async ({ client } = {}) => {
  const resolvedClient = client || await getDefaultClient();

  const { data, error } = await resolvedClient
    .from('launch_milestones')
    .select('id, slug, title, description, status, owner, target_date, sort_order, readiness_score, gate_notes')
    .order('sort_order', { ascending: true });

  if (error) throw error;

  return (data || []).map(normalizeLaunchMilestoneRow);
};

export const fetchWeeklyAgenda = async ({ client, weekOf } = {}) => {
  const resolvedClient = client || await getDefaultClient();

  let query = resolvedClient
    .from('weekly_agendas')
    .select('id, week_of, north_star_note, current_milestone_slug, company_priorities, samir_focus, max_focus, adrian_focus, shared_items, blocked_items, decisions_needed, launch_risks')
    .order('week_of', { ascending: false });

  if (weekOf) {
    query = query.eq('week_of', weekOf);
  }

  const { data, error } = await query;

  if (error) throw error;

  const rows = (data || []).map(normalizeWeeklyAgendaRow);
  return weekOf ? (rows[0] || null) : rows;
};

export const fetchLaunchTasks = async ({ client } = {}) => {
  const resolvedClient = client || await getDefaultClient();

  const [tasksResult, collaboratorsResult, dependenciesResult] = await Promise.all([
    resolvedClient
      .from('launch_tasks_v2')
      .select('id, task_key, title, description, primary_owner, status, priority, workstream, milestone_id, due_date, notes, compliance_flag, legal_gate_flag, changed_by_new_info, sort_order, completed_at')
      .order('sort_order', { ascending: true }),
    resolvedClient
      .from('launch_task_collaborators')
      .select('task_id, collaborator'),
    resolvedClient
      .from('launch_task_dependencies')
      .select('task_id, depends_on_task_id, dependency_type'),
  ]);

  if (tasksResult.error) throw tasksResult.error;
  if (collaboratorsResult.error) throw collaboratorsResult.error;
  if (dependenciesResult.error) throw dependenciesResult.error;

  return hydrateLaunchTasks({
    taskRows: tasksResult.data || [],
    collaboratorRows: collaboratorsResult.data || [],
    dependencyRows: dependenciesResult.data || [],
  });
};

// Resolve which column/value identifies the row to update. Accepts an explicit
// taskId, a full task object, or a taskKey — so callers can update by task key
// (stable) and not just the raw row id. Canonical-only ids (no live row yet)
// fall back to the task key.
const resolveTaskMatcher = ({ taskId, task, taskKey } = {}) => {
  if (taskId) return { column: 'id', value: taskId };
  if (task) {
    if (task.id && !String(task.id).startsWith('canonical:')) return { column: 'id', value: task.id };
    if (task.taskKey) return { column: 'task_key', value: task.taskKey };
  }
  if (taskKey) return { column: 'task_key', value: taskKey };
  return null;
};

export const updateLaunchTask = async ({ client, taskId, task, taskKey, updates } = {}) => {
  if (!updates || typeof updates !== 'object') throw new Error('updates are required');

  const matcher = resolveTaskMatcher({ taskId, task, taskKey });
  if (!matcher) throw new Error('taskId, task, or taskKey is required');

  const resolvedClient = client || await getDefaultClient();
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (updates.status === 'done' && !updates.completed_at) {
    payload.completed_at = new Date().toISOString();
  }

  if (updates.status && updates.status !== 'done' && updates.completed_at === undefined) {
    payload.completed_at = null;
  }

  const { data, error } = await resolvedClient
    .from('launch_tasks_v2')
    .update(payload)
    .eq(matcher.column, matcher.value)
    .select();

  if (error) throw error;

  return normalizeLaunchTaskRow((data || [])[0] || {});
};

// Loads the governed board from Supabase. Internal Mission Control content must
// never fall back to browser-bundled seed data: authorization is enforced by
// live RLS and an empty/error response must fail closed.
export const fetchLaunchBoard = async ({ client, weekOf = '2026-06-01' } = {}) => {
  const resolvedClient = client || await getDefaultClient();
  const [milestones, tasks, agenda] = await Promise.all([
    fetchLaunchMilestones({ client: resolvedClient }),
    fetchLaunchTasks({ client: resolvedClient }),
    fetchWeeklyAgenda({ client: resolvedClient, weekOf }),
  ]);

  return {
    milestones,
    tasks,
    agenda,
    errors: null,
  };
};

export const recomputeLaunchOpsAfterTaskUpdate = ({ previousTasks = [], updatedTask, dependencyMap = {}, milestones = [] } = {}) => {
  const nextTasks = previousTasks.map((task) => task.id === updatedTask.id
    ? { ...task, ...updatedTask, computedStatus: updatedTask.status }
    : task);

  const recomputedTasks = recomputeTaskStatuses({ tasks: nextTasks, dependencyMap });
  const unlockedTaskIds = buildUnlockedTaskIds({ previousTasks, nextTasks: recomputedTasks });
  const milestoneReadinessMap = buildMilestoneReadinessMap({ milestones, tasks: recomputedTasks });

  return {
    tasks: recomputedTasks,
    unlockedTaskIds,
    milestoneReadinessMap,
  };
};

export const buildLaunchOpsSnapshot = ({ milestones = [], tasks = [], agenda = null } = {}) => {
  const readiness = buildMilestoneReadinessSummary({ milestones, tasks });
  const readinessBySlug = Object.fromEntries(readiness.map((item) => [item.slug, item]));
  const currentMilestone = agenda?.currentMilestoneSlug
    ? milestones.find((milestone) => milestone.slug === agenda.currentMilestoneSlug) || null
    : milestones.find((milestone) => milestone.status === 'in_progress') || null;

  return {
    currentMilestone,
    readiness,
    readinessBySlug,
    tasksByOwner: tasks.reduce((acc, task) => {
      if (!acc[task.primaryOwner]) acc[task.primaryOwner] = [];
      acc[task.primaryOwner].push(task);
      return acc;
    }, {}),
    blockedTasks: tasks.filter((task) => task.computedStatus === 'locked' || task.computedStatus === 'blocked'),
    activeTasks: tasks.filter((task) => ['in_progress', 'ready', 'review', 'waiting'].includes(task.computedStatus)),
  };
};
