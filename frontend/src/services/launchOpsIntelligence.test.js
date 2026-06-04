import test from 'node:test';
import assert from 'node:assert/strict';

import {
  recomputeTaskStatuses,
  buildMilestoneReadinessMap,
  buildUnlockedTaskIds,
} from './launchOpsIntelligence.js';

test('recomputeTaskStatuses locks tasks with incomplete hard dependencies and preserves ready tasks otherwise', () => {
  const tasks = [
    { id: 't1', status: 'done' },
    { id: 't2', status: 'ready' },
    { id: 't3', status: 'this_week' },
  ];
  const dependencyMap = {
    t2: [{ dependsOnTaskId: 't1', dependencyType: 'finish_to_start' }],
    t3: [{ dependsOnTaskId: 't4', dependencyType: 'gate' }],
  };

  const recomputed = recomputeTaskStatuses({ tasks, dependencyMap });
  const byId = Object.fromEntries(recomputed.map((task) => [task.id, task]));

  assert.equal(byId.t2.computedStatus, 'ready');
  assert.equal(byId.t3.computedStatus, 'locked');
  assert.deepEqual(byId.t3.blockingTaskIds, ['t4']);
});

test('buildUnlockedTaskIds returns tasks newly unlocked by a completed upstream task', () => {
  const previousTasks = [
    { id: 'a', computedStatus: 'in_progress' },
    { id: 'b', computedStatus: 'locked' },
    { id: 'c', computedStatus: 'locked' },
  ];
  const nextTasks = [
    { id: 'a', computedStatus: 'done' },
    { id: 'b', computedStatus: 'ready' },
    { id: 'c', computedStatus: 'locked' },
  ];

  assert.deepEqual(buildUnlockedTaskIds({ previousTasks, nextTasks }), ['b']);
});

test('buildMilestoneReadinessMap summarizes completion, locked count, and this-week count by milestone', () => {
  const milestones = [
    { id: 'm1', slug: 'm1', title: 'Milestone 1' },
    { id: 'm2', slug: 'm2', title: 'Milestone 2' },
  ];
  const tasks = [
    { id: 't1', milestoneId: 'm1', computedStatus: 'done' },
    { id: 't2', milestoneId: 'm1', computedStatus: 'locked' },
    { id: 't3', milestoneId: 'm1', computedStatus: 'this_week' },
    { id: 't4', milestoneId: 'm2', computedStatus: 'done' },
  ];

  assert.deepEqual(buildMilestoneReadinessMap({ milestones, tasks }), {
    m1: {
      milestoneId: 'm1',
      slug: 'm1',
      title: 'Milestone 1',
      totalTasks: 3,
      completedTasks: 1,
      lockedTasks: 1,
      thisWeekTasks: 1,
      readinessPercent: 33,
    },
    m2: {
      milestoneId: 'm2',
      slug: 'm2',
      title: 'Milestone 2',
      totalTasks: 1,
      completedTasks: 1,
      lockedTasks: 0,
      thisWeekTasks: 0,
      readinessPercent: 100,
    },
  });
});
