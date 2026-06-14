import {
  CANONICAL_MILESTONES,
  CANONICAL_TASKS,
  CANONICAL_DEPENDENCIES,
  CANONICAL_COLLABORATORS,
} from './launchOpsCanonicalSeed.js';
import { recomputeTaskStatuses } from './launchOpsIntelligence.js';

// Derive a milestone code (M1..) from its slug when one isn't supplied.
export const milestoneCodeFromSlug = (slug = '') => {
  const match = /^m(\d+)-/i.exec(slug);
  return match ? `M${match[1]}` : '';
};

// Canonical milestones are the spine; live rows (already normalized) supply
// current state and any extra milestones the database has that canonical does
// not. Stable identity is the slug; the live row's id is preserved so task
// links and updates keep working.
export const mergeMilestonesWithCanonical = (liveMilestones = []) => {
  const liveBySlug = new Map(liveMilestones.map((milestone) => [milestone.slug, milestone]));

  const merged = CANONICAL_MILESTONES.map((canonical) => {
    const live = liveBySlug.get(canonical.slug);
    return {
      id: live?.id ?? `canonical:${canonical.slug}`,
      slug: canonical.slug,
      code: canonical.code || milestoneCodeFromSlug(canonical.slug),
      title: live?.title ?? canonical.title,
      description: live?.description ?? canonical.description,
      status: live?.status ?? canonical.status,
      owner: live?.owner ?? canonical.owner,
      targetDate: live?.targetDate ?? null,
      sortOrder: canonical.sortOrder ?? live?.sortOrder ?? 0,
      readinessScore: live?.readinessScore ?? canonical.readinessScore ?? 0,
      gateNotes: live?.gateNotes ?? canonical.gateNotes,
      isCanonicalOnly: !live,
    };
  });

  const canonicalSlugs = new Set(CANONICAL_MILESTONES.map((milestone) => milestone.slug));
  const liveOnly = liveMilestones
    .filter((milestone) => !canonicalSlugs.has(milestone.slug))
    .map((milestone) => ({
      ...milestone,
      code: milestone.code || milestoneCodeFromSlug(milestone.slug),
      isCanonicalOnly: false,
      isLiveOnly: true,
    }));

  return [...merged, ...liveOnly].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
};

const canonicalCollaboratorsByKey = () => CANONICAL_COLLABORATORS.reduce((acc, { taskKey, collaborator }) => {
  (acc[taskKey] ||= []).push(collaborator);
  return acc;
}, {});

// Canonical tasks are the spine; live rows supply current status / owner /
// completion and any extra tasks. Canonical owns the structural copy (title,
// description, workflow, milestone, gates) so the board reads consistently.
export const mergeTasksWithCanonical = ({ liveTasks = [], milestones = [] } = {}) => {
  const milestoneIdBySlug = new Map(milestones.map((milestone) => [milestone.slug, milestone.id]));
  const milestoneSlugById = new Map(milestones.map((milestone) => [milestone.id, milestone.slug]));
  const liveByKey = new Map(liveTasks.filter((task) => task.taskKey).map((task) => [task.taskKey, task]));
  const canonCollab = canonicalCollaboratorsByKey();

  const mergedFromCanonical = CANONICAL_TASKS.map((canonical) => {
    const live = liveByKey.get(canonical.taskKey);
    const collaborators = Array.from(new Set([
      ...(canonCollab[canonical.taskKey] || []),
      ...((live?.collaborators) || []),
    ]));

    return {
      id: live?.id ?? `canonical:${canonical.taskKey}`,
      taskKey: canonical.taskKey,
      title: live?.title ?? canonical.title,
      description: live?.description ?? canonical.description,
      primaryOwner: live?.primaryOwner ?? canonical.primaryOwner,
      status: live?.status ?? canonical.status,
      priority: live?.priority ?? canonical.priority,
      workstream: canonical.workstream || live?.workstream,
      milestoneSlug: canonical.milestoneSlug,
      milestoneId: milestoneIdBySlug.get(canonical.milestoneSlug) ?? live?.milestoneId ?? `canonical:${canonical.milestoneSlug}`,
      dueDate: live?.dueDate ?? null,
      notes: live?.notes ?? null,
      complianceFlag: live?.complianceFlag ?? canonical.complianceFlag,
      legalGateFlag: live?.legalGateFlag ?? canonical.legalGateFlag,
      changedByNewInfo: live?.changedByNewInfo ?? false,
      sortOrder: canonical.sortOrder ?? live?.sortOrder ?? 0,
      completedAt: live?.completedAt ?? null,
      collaborators,
      isCanonicalOnly: !live,
    };
  });

  const canonicalKeys = new Set(CANONICAL_TASKS.map((task) => task.taskKey));
  const liveOnly = liveTasks
    .filter((task) => !task.taskKey || !canonicalKeys.has(task.taskKey))
    .map((task) => ({
      ...task,
      milestoneSlug: milestoneSlugById.get(task.milestoneId) ?? null,
      isCanonicalOnly: false,
      isLiveOnly: true,
    }));

  const allTasks = [...mergedFromCanonical, ...liveOnly];
  const idByKey = new Map(allTasks.filter((task) => task.taskKey).map((task) => [task.taskKey, task.id]));

  const dependencyMap = {};
  for (const { taskKey, dependsOnTaskKey, dependencyType } of CANONICAL_DEPENDENCIES) {
    const id = idByKey.get(taskKey);
    const dependsOnTaskId = idByKey.get(dependsOnTaskKey);
    if (!id || !dependsOnTaskId) continue;
    (dependencyMap[id] ||= []).push({ dependsOnTaskId, dependencyType });
  }
  // Preserve any live-only dependency edges (deduped).
  for (const task of liveTasks) {
    if (!task.dependencies?.length) continue;
    const existing = dependencyMap[task.id] ||= [];
    for (const dependency of task.dependencies) {
      const isDuplicate = existing.some((edge) => edge.dependsOnTaskId === dependency.dependsOnTaskId
        && edge.dependencyType === dependency.dependencyType);
      if (!isDuplicate) existing.push({ dependsOnTaskId: dependency.dependsOnTaskId, dependencyType: dependency.dependencyType });
    }
  }

  const withDependencies = allTasks.map((task) => ({ ...task, dependencies: dependencyMap[task.id] || [] }));
  return recomputeTaskStatuses({ tasks: withDependencies, dependencyMap });
};

export const mergeBoardWithCanonical = ({ liveMilestones = [], liveTasks = [] } = {}) => {
  const milestones = mergeMilestonesWithCanonical(liveMilestones);
  const tasks = mergeTasksWithCanonical({ liveTasks, milestones });
  return { milestones, tasks };
};
