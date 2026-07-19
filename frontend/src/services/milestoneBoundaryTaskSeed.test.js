import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CANONICAL_MILESTONE_DEPENDENCIES,
  MILESTONE_BOUNDARY_DEPENDENCIES,
  MILESTONE_BOUNDARY_TASKS,
} from './milestoneBoundaryTaskSeed.js';

const taskByKey = new Map(MILESTONE_BOUNDARY_TASKS.map((task) => [task.taskKey, task]));
const hasDependency = (taskKey, dependsOnTaskKey, dependencyType = null) => MILESTONE_BOUNDARY_DEPENDENCIES
  .some((dependency) => dependency.taskKey === taskKey
    && dependency.dependsOnTaskKey === dependsOnTaskKey
    && (!dependencyType || dependency.dependencyType === dependencyType));

test('milestone boundary additions preserve singular ownership and governed task structure', () => {
  assert.equal(MILESTONE_BOUNDARY_TASKS.length, 12);
  assert.equal(taskByKey.size, MILESTONE_BOUNDARY_TASKS.length);
  for (const task of MILESTONE_BOUNDARY_TASKS) {
    assert.ok(task.primaryOwner, `${task.taskKey} requires one primary owner`);
    assert.ok(task.milestoneSlug, `${task.taskKey} requires a milestone`);
    assert.ok(task.workstream, `${task.taskKey} requires a workstream`);
    assert.ok(task.description, `${task.taskKey} requires a boundary-aware description`);
  }
});

test('mock payment gates Client Kickoff and external review execution gates later validation', () => {
  assert.ok(hasDependency('M1-PAY-02', 'M1-PAY-01'));
  assert.ok(hasDependency('M1-104', 'M1-PAY-02'));
  assert.ok(hasDependency('M3-EXEC-01', 'M2-16', 'gate'));
  assert.ok(hasDependency('M4-01', 'M3-16', 'gate'));
  assert.ok(hasDependency('M5-01', 'M4-05', 'gate'));
});

test('M2 readiness workstreams converge on the M2 completion gate', () => {
  for (const taskKey of ['M2-OPS-04', 'M2-06', 'M2-07', 'M2-10', 'M2-14', 'M2-LGL-011', 'M2-FND-023', 'M2-ROI-087']) {
    assert.ok(hasDependency('M2-16', taskKey, 'gate'), `${taskKey} must gate M2-16`);
  }
});

test('milestones form one explicit M1 through M5 dependency ladder', () => {
  assert.deepEqual(CANONICAL_MILESTONE_DEPENDENCIES, [
    { milestoneSlug: 'm2-mock-run-complete', dependsOnMilestoneSlug: 'm1-mock-run-build-ready' },
    { milestoneSlug: 'm3-trusted-anesthesiologist-validation', dependsOnMilestoneSlug: 'm2-mock-run-complete' },
    { milestoneSlug: 'm4-validation-closed', dependsOnMilestoneSlug: 'm3-trusted-anesthesiologist-validation' },
    { milestoneSlug: 'm5-founding-partner-ready', dependsOnMilestoneSlug: 'm4-validation-closed' },
  ]);
});
