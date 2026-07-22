import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CANONICAL_LAUNCH_DEPENDENCIES,
  CANONICAL_LAUNCH_TASKS,
} from './launchOpsCanonicalSeed.js';
import { WIKI_LIBRARY_ITEMS } from './wikiLibraryItems.js';

const taskByKey = new Map(CANONICAL_LAUNCH_TASKS.map((task) => [task.taskKey, task]));
const getPage = (title) => {
  const page = WIKI_LIBRARY_ITEMS.find((candidate) => candidate.title === title);
  assert.ok(page, `Missing Wiki page: ${title}`);
  return page.content;
};
const hasDependency = (taskKey, dependsOnTaskKey) => CANONICAL_LAUNCH_DEPENDENCIES.some(
  (edge) => edge.taskKey === taskKey && edge.dependsOnTaskKey === dependsOnTaskKey,
);

test('M1 final system test uses seven primary leads plus one duplicate attempt', () => {
  for (const taskKey of [
    'M1-FST-03', 'M1-FST-04', 'M1-FST-07', 'M1-FST-08',
    'M1-FST-09', 'M1-FST-10', 'M1-FST-11',
  ]) {
    assert.ok(taskByKey.has(taskKey), `Missing primary lead test task ${taskKey}`);
    assert.equal(taskByKey.get(taskKey).status, 'locked');
    assert.ok(hasDependency(taskKey, 'M1-FST-02'));
  }

  assert.match(taskByKey.get('M1-04').description, /seven primary mock leads plus one deliberate duplicate-entry attempt/i);
  assert.equal(taskByKey.get('M1-FST-05').status, 'done');
  assert.match(taskByKey.get('M1-FST-12').description, /not an eighth prospect/i);
  assert.ok(hasDependency('M1-FST-12', 'M1-FST-02'));
});

test('critical repair and retest gate blocks the M1 completion readout', () => {
  const scenarioTasks = [
    'M1-FST-03', 'M1-FST-04', 'M1-FST-07', 'M1-FST-08',
    'M1-FST-09', 'M1-FST-10', 'M1-FST-11', 'M1-FST-12',
  ];
  assert.match(taskByKey.get('M1-FST-13').description, /cannot close on an unverified critical fix/i);
  for (const scenarioTask of scenarioTasks) {
    assert.ok(hasDependency('M1-FST-13', scenarioTask), `Retest gate must depend on ${scenarioTask}`);
  }
  assert.ok(hasDependency('M1-FST-06', 'M1-FST-13'));
});

test('M1 ends required training work at scheduling and M2 owns readiness and execution', () => {
  const m2Training = taskByKey.get('M2-08');
  assert.match(m2Training.description, /after the Foundation Library, deliverables, and modular offering are completed and organized/i);
  assert.match(m2Training.description, /agenda, activities, approved materials/i);
  assert.ok(hasDependency('M2-08', 'M2-02'));

  const training = getPage('Training Day Readiness');
  const pipeline = getPage('CRM Pipeline Stages');
  const goLive = getPage('Go-Live Verification');
  const onboarding = getPage('Client Onboarding');

  assert.match(training, /M1 does not finalize or test the training agenda/i);
  assert.match(training, /`M2-08` owns this work/i);
  assert.match(pipeline, /This exit evidence is the end of M1's required training work/i);
  assert.match(goLive, /M1 training exception approved 2026-07-21/i);
  assert.match(onboarding, /For M1 completion, scheduling evidence is sufficient/i);
});

test('governed Wiki pages carry the comprehensive scenario matrix', () => {
  const leadCapture = getPage('Lead Capture');
  const outreach = getPage('Outreach Sequence');
  const communication = getPage('Client Communication Log');
  const proposal = getPage('Proposal Workflow');

  for (const marker of [
    'AI-chat lead', 'Adrian / network lead',
    'Contact Us lead', 'Direct-email lead',
    'Early not-fit lead', 'Permanent no-response lead', 'Late-stage declined lead',
    'duplicate-entry attempt',
  ]) assert.match(leadCapture, new RegExp(marker, 'i'));

  assert.match(outreach, /all seven required mock leads/i);
  assert.match(communication, /Client Communication Log must be tested across all seven required mock leads/i);
  assert.match(proposal, /Required proposal-path coverage/i);
});
