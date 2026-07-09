import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildLaunchOpsSnapshot,
  fetchLaunchMilestones,
  fetchLaunchTasks,
  fetchWeeklyAgenda,
  updateLaunchTask,
  hydrateLaunchTasks,
  recomputeLaunchOpsAfterTaskUpdate,
} from './launchOpsService.js';

test('fetchLaunchMilestones reads milestones ordered by sort order', async () => {
  const queryState = { table: null, selected: null, order: null };
  const fakeClient = {
    from(table) {
      queryState.table = table;
      return {
        select(selected) {
          queryState.selected = selected;
          return this;
        },
        order(column, options) {
          queryState.order = [column, options];
          return Promise.resolve({
            data: [
              {
                id: 'm1',
                slug: 'm1',
                title: 'Milestone 1',
                description: 'desc',
                status: 'in_progress',
                owner: 'Max',
                target_date: '2026-06-30',
                sort_order: 1,
                readiness_score: 20,
                gate_notes: 'notes',
              },
            ],
            error: null,
          });
        },
      };
    },
  };

  const milestones = await fetchLaunchMilestones({ client: fakeClient });
  assert.equal(queryState.table, 'launch_milestones');
  assert.match(queryState.selected, /slug/);
  assert.deepEqual(queryState.order, ['sort_order', { ascending: true }]);
  assert.equal(milestones[0].slug, 'm1');
});

test('fetchWeeklyAgenda returns the latest agenda when no week is provided', async () => {
  const fakeClient = {
    from(table) {
      assert.equal(table, 'weekly_agendas');
      return {
        select() {
          return this;
        },
        order(column, options) {
          assert.deepEqual([column, options], ['week_of', { ascending: false }]);
          return Promise.resolve({
            data: [{
              id: 'w1',
              week_of: '2026-06-01',
              north_star_note: 'North star',
              current_milestone_slug: 'm1',
              company_priorities: '1',
              samir_focus: 'samir',
              max_focus: 'max',
              adrian_focus: 'adrian',
              shared_items: 'shared',
              blocked_items: 'blocked',
              decisions_needed: 'decisions',
              launch_risks: 'risks',
            }],
            error: null,
          });
        },
      };
    },
  };

  const agendas = await fetchWeeklyAgenda({ client: fakeClient });
  assert.equal(agendas.length, 1);
  assert.equal(agendas[0].weekOf, '2026-06-01');
});

test('hydrateLaunchTasks merges collaborators, dependencies, and computed task state', () => {
  const hydrated = hydrateLaunchTasks({
    taskRows: [
      {
        id: 't0',
        task_key: 'BASE',
        title: 'Base task',
        description: null,
        primary_owner: 'Samir',
        status: 'done',
        priority: 'high',
        workstream: 'Clinical Standard & Deliverables',
        milestone_id: 'm1',
        due_date: null,
        notes: null,
        compliance_flag: false,
        legal_gate_flag: false,
        changed_by_new_info: false,
        sort_order: 1,
        completed_at: '2026-06-01T00:00:00Z',
      },
      {
        id: 't1',
        task_key: 'LOCKED',
        title: 'Locked task',
        description: null,
        primary_owner: 'Max',
        status: 'ready',
        priority: 'critical',
        workstream: 'Platform & Internal/Client System',
        milestone_id: 'm1',
        due_date: null,
        notes: null,
        compliance_flag: false,
        legal_gate_flag: false,
        changed_by_new_info: false,
        sort_order: 2,
        completed_at: null,
      },
    ],
    collaboratorRows: [{ task_id: 't1', collaborator: 'Adrian' }],
    dependencyRows: [{ task_id: 't1', depends_on_task_id: 'gate', dependency_type: 'gate' }],
  });

  const lockedTask = hydrated.find((task) => task.id === 't1');
  assert.deepEqual(lockedTask.collaborators, ['Adrian']);
  assert.equal(lockedTask.computedStatus, 'locked');
  assert.deepEqual(lockedTask.blockingTaskIds, ['gate']);
});

test('fetchLaunchTasks merges collaborators, dependencies, and computed task state', async () => {
  const fakeClient = {
    from(table) {
      if (table === 'launch_tasks_v2') {
        return {
          select() {
            return this;
          },
          order() {
            return Promise.resolve({
              data: [
                {
                  id: 't0',
                  task_key: 'BASE',
                  title: 'Base task',
                  description: null,
                  primary_owner: 'Samir',
                  status: 'done',
                  priority: 'high',
                  workstream: 'Clinical Standard & Deliverables',
                  milestone_id: 'm1',
                  due_date: null,
                  notes: null,
                  compliance_flag: false,
                  legal_gate_flag: false,
                  changed_by_new_info: false,
                  sort_order: 1,
                  completed_at: '2026-06-01T00:00:00Z',
                },
                {
                  id: 't1',
                  task_key: 'LOCKED',
                  title: 'Locked task',
                  description: null,
                  primary_owner: 'Max',
                  status: 'ready',
                  priority: 'critical',
                  workstream: 'Platform & Internal/Client System',
                  milestone_id: 'm1',
                  due_date: null,
                  notes: null,
                  compliance_flag: false,
                  legal_gate_flag: false,
                  changed_by_new_info: false,
                  sort_order: 2,
                  completed_at: null,
                },
              ],
              error: null,
            });
          },
        };
      }

      if (table === 'launch_task_collaborators') {
        return {
          select() {
            return Promise.resolve({
              data: [{ task_id: 't1', collaborator: 'Adrian' }],
              error: null,
            });
          },
        };
      }

      if (table === 'launch_task_dependencies') {
        return {
          select() {
            return Promise.resolve({
              data: [{ task_id: 't1', depends_on_task_id: 'gate', dependency_type: 'gate' }],
              error: null,
            });
          },
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    },
  };

  const tasks = await fetchLaunchTasks({ client: fakeClient });
  const lockedTask = tasks.find((task) => task.id === 't1');

  assert.deepEqual(lockedTask.collaborators, ['Adrian']);
  assert.equal(lockedTask.computedStatus, 'locked');
  assert.deepEqual(lockedTask.blockingTaskIds, ['gate']);
});

test('updateLaunchTask updates task fields and timestamps completed tasks', async () => {
  const updatesSeen = [];
  const fakeClient = {
    from(table) {
      assert.equal(table, 'launch_tasks_v2');
      return {
        update(payload) {
          updatesSeen.push(payload);
          return {
            eq(column, value) {
              assert.equal(column, 'id');
              assert.equal(value, 'task-1');
              return {
                select() {
                  return Promise.resolve({
                    data: [{
                      id: 'task-1',
                      task_key: 'S1',
                      title: payload.title || 'Task 1',
                      description: payload.notes || null,
                      primary_owner: 'Samir',
                      status: payload.status,
                      priority: 'critical',
                      workstream: 'Clinical Standard & Deliverables',
                      milestone_id: 'm1',
                      due_date: null,
                      notes: payload.notes || null,
                      compliance_flag: false,
                      legal_gate_flag: false,
                      changed_by_new_info: false,
                      sort_order: 1,
                      completed_at: payload.completed_at || null,
                    }],
                    error: null,
                  });
                },
              };
            },
          };
        },
      };
    },
  };

  const updated = await updateLaunchTask({
    client: fakeClient,
    taskId: 'task-1',
    updates: { status: 'done', notes: 'Completed with Adrian' },
  });

  assert.equal(updatesSeen[0].status, 'done');
  assert.equal(updatesSeen[0].notes, 'Completed with Adrian');
  assert.ok(updatesSeen[0].updated_at);
  assert.ok(updatesSeen[0].completed_at);
  assert.equal(updated.status, 'done');
  assert.ok(updated.completedAt);
});

test('recomputeLaunchOpsAfterTaskUpdate recomputes downstream tasks and reports newly unlocked ids', () => {
  const previousTasks = [
    {
      id: 't1',
      status: 'ready',
      computedStatus: 'ready',
      milestoneId: 'm1',
      primaryOwner: 'Samir',
    },
    {
      id: 't2',
      status: 'locked',
      computedStatus: 'locked',
      milestoneId: 'm1',
      primaryOwner: 'Max',
    },
  ];

  const result = recomputeLaunchOpsAfterTaskUpdate({
    previousTasks,
    updatedTask: {
      id: 't1',
      status: 'done',
      milestoneId: 'm1',
      primaryOwner: 'Samir',
    },
    dependencyMap: {
      t2: [{ dependsOnTaskId: 't1', dependencyType: 'finish_to_start' }],
    },
    milestones: [{ id: 'm1', slug: 'm1', title: 'Milestone 1' }],
  });

  const t2 = result.tasks.find((task) => task.id === 't2');
  assert.equal(t2.computedStatus, 'locked');
  assert.deepEqual(result.unlockedTaskIds, []);
  assert.equal(result.milestoneReadinessMap.m1.completedTasks, 1);
});

test('buildLaunchOpsSnapshot returns current milestone, readiness, and grouped tasks', () => {
  const milestones = [
    { id: 'm1', slug: 'm1', title: 'Milestone 1', status: 'in_progress' },
  ];
  const tasks = [
    { id: 't1', primaryOwner: 'Samir', milestoneId: 'm1', status: 'done', computedStatus: 'done' },
    { id: 't2', primaryOwner: 'Samir', milestoneId: 'm1', status: 'ready', computedStatus: 'ready' },
    { id: 't3', primaryOwner: 'Max', milestoneId: 'm1', status: 'blocked', computedStatus: 'blocked' },
  ];
  const agenda = { currentMilestoneSlug: 'm1' };

  const snapshot = buildLaunchOpsSnapshot({ milestones, tasks, agenda });

  assert.equal(snapshot.currentMilestone.slug, 'm1');
  assert.equal(snapshot.activeTasks.length, 1);
  assert.equal(snapshot.blockedTasks.length, 1);
  assert.equal(snapshot.tasksByOwner.Samir.length, 2);
  assert.equal(snapshot.readiness[0].readinessFromTasks, 33);
});
