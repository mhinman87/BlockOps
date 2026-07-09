const DONE_STATUS = 'done';
const HARD_DEPENDENCY_TYPES = new Set(['finish_to_start', 'gate']);

export const recomputeTaskStatuses = ({ tasks = [], dependencyMap = {} } = {}) => {
  const tasksById = Object.fromEntries(tasks.map((task) => [task.id, task]));

  return tasks.map((task) => {
    const dependencies = dependencyMap[task.id] || [];
    const blockingTaskIds = [];
    const softBlockedTaskIds = [];

    for (const dependency of dependencies) {
      const upstreamTask = tasksById[dependency.dependsOnTaskId];
      const upstreamStatus = upstreamTask?.computedStatus || upstreamTask?.status;
      const isDone = upstreamStatus === DONE_STATUS;

      if (dependency.dependencyType === 'soft_blocker') {
        if (!isDone) softBlockedTaskIds.push(dependency.dependsOnTaskId);
        continue;
      }

      if (HARD_DEPENDENCY_TYPES.has(dependency.dependencyType) && !isDone) {
        blockingTaskIds.push(dependency.dependsOnTaskId);
      }
    }

    const computedStatus = task.status === DONE_STATUS
      ? DONE_STATUS
      : blockingTaskIds.length > 0
        ? 'locked'
        : task.status;

    return {
      ...task,
      computedStatus,
      blockingTaskIds,
      softBlockedTaskIds,
      hasBlockingDependencies: blockingTaskIds.length > 0,
    };
  });
};

export const buildUnlockedTaskIds = ({ previousTasks = [], nextTasks = [] } = {}) => {
  const previousById = Object.fromEntries(previousTasks.map((task) => [task.id, task]));

  return nextTasks
    .filter((task) => {
      const previous = previousById[task.id];
      return previous?.computedStatus === 'locked' && task.computedStatus !== 'locked';
    })
    .map((task) => task.id);
};

export const buildMilestoneReadinessMap = ({ milestones = [], tasks = [] } = {}) => Object.fromEntries(
  milestones.map((milestone) => {
    const milestoneTasks = tasks.filter((task) => task.milestoneId === milestone.id);
    const totalTasks = milestoneTasks.length;
    const completedTasks = milestoneTasks.filter((task) => task.computedStatus === DONE_STATUS).length;
    const lockedTasks = milestoneTasks.filter((task) => task.computedStatus === 'locked').length;
    const actionableTasks = milestoneTasks.filter((task) => ['in_progress', 'ready', 'review', 'waiting'].includes(task.computedStatus)).length;
    const readinessPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return [milestone.id, {
      milestoneId: milestone.id,
      slug: milestone.slug,
      title: milestone.title,
      totalTasks,
      completedTasks,
      lockedTasks,
      actionableTasks,
      readinessPercent,
    }];
  }),
);
