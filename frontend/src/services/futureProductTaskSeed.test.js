import test from 'node:test';
import assert from 'node:assert/strict';
import { FUTURE_PRODUCT_DEPENDENCIES, FUTURE_PRODUCT_TASKS } from './futureProductTaskSeed.js';
import { XR_TRAINING_TASKS } from './xrTrainingProjectSeed.js';

test('patient and payer starter products are M2 scope while real-world pilots remain later evidence', () => {
  const byKey = new Map(FUTURE_PRODUCT_TASKS.map((task) => [task.taskKey, task]));
  const m2Patient = FUTURE_PRODUCT_TASKS.filter((task) => /^M2-PAT-/.test(task.taskKey));
  const m2Payer = FUTURE_PRODUCT_TASKS.filter((task) => /^M2-PAY-/.test(task.taskKey));

  assert.equal(m2Patient.length, 10);
  assert.equal(m2Payer.length, 11);
  assert.ok([...m2Patient, ...m2Payer].every((task) => task.milestoneSlug === 'm2-mock-run-complete'));
  assert.equal(byKey.get('M4-PAT-011')?.milestoneSlug, 'm4-validation-closed');
  assert.equal(byKey.get('M4-PAT-012')?.milestoneSlug, 'm4-validation-closed');
  assert.equal(byKey.get('M5-PAY-012')?.milestoneSlug, 'm5-founding-partner-ready');
});

test('future-product dependencies reference existing tasks across milestone gates', () => {
  const keys = new Set(FUTURE_PRODUCT_TASKS.map((task) => task.taskKey));
  for (const dependency of FUTURE_PRODUCT_DEPENDENCIES) {
    assert.ok(keys.has(dependency.taskKey), `missing task ${dependency.taskKey}`);
    assert.ok(keys.has(dependency.dependsOnTaskKey), `missing dependency ${dependency.dependsOnTaskKey}`);
    assert.equal(dependency.dependencyType, 'finish_to_start');
  }

  assert.ok(FUTURE_PRODUCT_DEPENDENCIES.some((item) => item.taskKey === 'M4-PAT-011' && item.dependsOnTaskKey === 'M2-PAT-010'));
  assert.ok(FUTURE_PRODUCT_DEPENDENCIES.some((item) => item.taskKey === 'M5-PAY-012' && item.dependsOnTaskKey === 'M2-PAY-011'));
});

test('approved M2 definition work remains marked complete in canonical seeds', () => {
  const futureByKey = new Map(FUTURE_PRODUCT_TASKS.map((task) => [task.taskKey, task]));
  const xrByKey = new Map(XR_TRAINING_TASKS.map((task) => [task.taskKey, task]));

  assert.equal(futureByKey.get('M2-PAY-001')?.status, 'done');
  assert.equal(futureByKey.get('M2-PAY-002')?.status, 'done');
  assert.equal(xrByKey.get('M2-XR-CLIN-01')?.status, 'done');
  assert.equal(xrByKey.get('M2-XR-CLIN-05')?.status, 'done');
});
