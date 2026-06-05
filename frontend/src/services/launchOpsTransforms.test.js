import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildTaskDependencyMap,
  buildTaskCollaboratorMap,
  normalizeLaunchMilestoneRow,
  normalizeLaunchTaskRow,
  normalizeWeeklyAgendaRow,
  deriveTaskState,
  buildMilestoneReadinessSummary,
} from './launchOpsTransforms.js';

test('normalizeLaunchMilestoneRow maps milestone records into frontend milestone objects', () => {
  assert.deepEqual(normalizeLaunchMilestoneRow({
    id: 'm1',
    slug: 'm1-mock-run-build-ready',
    title: 'Build complete enough for full internal mock run',
    description: 'Mock readiness',
    status: 'in_progress',
    owner: 'Max',
    target_date: '2026-06-30',
    sort_order: 1,
    readiness_score: 20,
    gate_notes: 'Current active milestone',
  }), {
    id: 'm1',
    slug: 'm1-mock-run-build-ready',
    title: 'Fake client through all the way',
    description: 'Complete when a fake client can move end-to-end through the full system without the flow breaking.',
    status: 'in_progress',
    owner: 'Max',
    targetDate: '2026-06-30',
    sortOrder: 1,
    readinessScore: 20,
    gateNotes: 'Milestone 1.',
  });
});

test('normalizeLaunchTaskRow maps task records into frontend task objects', () => {
  assert.deepEqual(normalizeLaunchTaskRow({
    id: 't1',
    task_key: 'S1',
    title: 'Define mock-client minimum clinical deliverable set',
    description: 'desc',
    primary_owner: 'Samir',
    status: 'this_week',
    priority: 'critical',
    workstream: 'Clinical Standard & Deliverables',
    milestone_id: 'm1',
    due_date: '2026-06-10',
    notes: 'note',
    compliance_flag: false,
    legal_gate_flag: false,
    changed_by_new_info: true,
    sort_order: 10,
    completed_at: null,
  }), {
    id: 't1',
    taskKey: 'S1',
    title: 'Define mock-client minimum clinical deliverable set',
    description: 'desc',
    primaryOwner: 'Samir',
    status: 'this_week',
    priority: 'critical',
    workstream: 'Clinical Standard & Deliverables',
    milestoneId: 'm1',
    dueDate: '2026-06-10',
    notes: 'note',
    complianceFlag: false,
    legalGateFlag: false,
    changedByNewInfo: true,
    sortOrder: 10,
    completedAt: null,
  });
});

test('normalizeWeeklyAgendaRow maps agenda records into frontend agenda objects', () => {
  assert.deepEqual(normalizeWeeklyAgendaRow({
    id: 'w1',
    week_of: '2026-06-01',
    north_star_note: 'North star',
    current_milestone_slug: 'm1-mock-run-build-ready',
    company_priorities: '1. First\n2. Second',
    samir_focus: 'samir',
    max_focus: 'max',
    adrian_focus: 'adrian',
    shared_items: 'shared',
    blocked_items: 'blocked',
    decisions_needed: 'decisions',
    launch_risks: 'risks',
  }), {
    id: 'w1',
    weekOf: '2026-06-01',
    northStarNote: 'North star',
    currentMilestoneSlug: 'm1-mock-run-build-ready',
    companyPriorities: '1. First\n2. Second',
    samirFocus: 'samir',
    maxFocus: 'max',
    adrianFocus: 'adrian',
    sharedItems: 'shared',
    blockedItems: 'blocked',
    decisionsNeeded: 'decisions',
    launchRisks: 'risks',
  });
});

test('buildTaskCollaboratorMap groups collaborators by task id', () => {
  assert.deepEqual(buildTaskCollaboratorMap([
    { task_id: 't1', collaborator: 'Max' },
    { task_id: 't1', collaborator: 'Adrian' },
    { task_id: 't2', collaborator: 'Samir' },
  ]), {
    t1: ['Max', 'Adrian'],
    t2: ['Samir'],
  });
});

test('buildTaskDependencyMap groups dependencies by task id', () => {
  assert.deepEqual(buildTaskDependencyMap([
    { task_id: 't1', depends_on_task_id: 't0', dependency_type: 'finish_to_start' },
    { task_id: 't1', depends_on_task_id: 'gate-1', dependency_type: 'gate' },
    { task_id: 't2', depends_on_task_id: 't1', dependency_type: 'soft_blocker' },
  ]), {
    t1: [
      { dependsOnTaskId: 't0', dependencyType: 'finish_to_start' },
      { dependsOnTaskId: 'gate-1', dependencyType: 'gate' },
    ],
    t2: [
      { dependsOnTaskId: 't1', dependencyType: 'soft_blocker' },
    ],
  });
});

test('deriveTaskState marks tasks with unfinished hard dependencies as locked', () => {
  const tasksById = {
    t0: { id: 't0', status: 'done' },
    t1: { id: 't1', status: 'ready' },
    gate1: { id: 'gate1', status: 'in_progress' },
  };

  assert.equal(
    deriveTaskState({
      task: { id: 't2', status: 'ready' },
      dependencyMap: {
        t2: [
          { dependsOnTaskId: 't0', dependencyType: 'finish_to_start' },
          { dependsOnTaskId: 'gate1', dependencyType: 'gate' },
        ],
      },
      tasksById,
    }).computedStatus,
    'locked',
  );
});

test('deriveTaskState preserves active statuses when hard dependencies are satisfied', () => {
  const tasksById = {
    t0: { id: 't0', status: 'done' },
  };

  assert.deepEqual(
    deriveTaskState({
      task: { id: 't1', status: 'this_week' },
      dependencyMap: {
        t1: [{ dependsOnTaskId: 't0', dependencyType: 'finish_to_start' }],
      },
      tasksById,
    }),
    {
      computedStatus: 'this_week',
      blockingTaskIds: [],
      softBlockedTaskIds: [],
      hasBlockingDependencies: false,
    },
  );
});

test('deriveTaskState reports soft blockers without locking the task', () => {
  const tasksById = {
    t0: { id: 't0', status: 'in_progress' },
  };

  assert.deepEqual(
    deriveTaskState({
      task: { id: 't1', status: 'ready' },
      dependencyMap: {
        t1: [{ dependsOnTaskId: 't0', dependencyType: 'soft_blocker' }],
      },
      tasksById,
    }),
    {
      computedStatus: 'ready',
      blockingTaskIds: [],
      softBlockedTaskIds: ['t0'],
      hasBlockingDependencies: false,
    },
  );
});

test('buildMilestoneReadinessSummary counts tasks and completed tasks for each milestone', () => {
  const milestones = [
    { id: 'm1', slug: 'm1', title: 'Milestone 1' },
    { id: 'm2', slug: 'm2', title: 'Milestone 2' },
  ];
  const tasks = [
    { id: 't1', milestoneId: 'm1', status: 'done' },
    { id: 't2', milestoneId: 'm1', status: 'locked' },
    { id: 't3', milestoneId: 'm1', status: 'review' },
    { id: 't4', milestoneId: 'm2', status: 'done' },
  ];

  assert.deepEqual(buildMilestoneReadinessSummary({ milestones, tasks }), [
    {
      id: 'm1',
      slug: 'm1',
      title: 'Milestone 1',
      totalTasks: 3,
      completedTasks: 1,
      activeTasks: 2,
      readinessFromTasks: 33,
    },
    {
      id: 'm2',
      slug: 'm2',
      title: 'Milestone 2',
      totalTasks: 1,
      completedTasks: 1,
      activeTasks: 0,
      readinessFromTasks: 100,
    },
  ]);
});
