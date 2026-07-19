import test from 'node:test';
import assert from 'node:assert/strict';

import { CANONICAL_TASKS } from './launchOpsCanonicalSeed.js';
import { WIKI_PILLAR_MAP } from './wikiPillarMapping.js';
import {
  M1_TASK_PRIMARY_WIKI_PAGE_OVERRIDES,
  M1_WORKSTREAM_PRIMARY_WIKI_PAGE,
  attachPrimaryWikiPage,
  getPrimaryWikiPageTitle,
} from './missionControlWikiLinks.js';

const canonicalM1Tasks = CANONICAL_TASKS.filter((task) => task.milestoneSlug === 'm1-mock-run-build-ready');

test('every canonical M1 task resolves to exactly one governed primary Wiki page', () => {
  assert.equal(canonicalM1Tasks.length, 114);
  for (const task of canonicalM1Tasks) {
    const title = getPrimaryWikiPageTitle(task);
    assert.ok(title, `${task.taskKey} has no primary Wiki page`);
    assert.ok(WIKI_PILLAR_MAP[title], `${task.taskKey} links to unknown Wiki page ${title}`);
    assert.equal(typeof title, 'string');
  }
});

test('every configured workflow and task override points to a governed Wiki page', () => {
  for (const [workstream, title] of Object.entries(M1_WORKSTREAM_PRIMARY_WIKI_PAGE)) {
    assert.ok(WIKI_PILLAR_MAP[title], `${workstream} links to unknown Wiki page ${title}`);
  }
  for (const [taskKey, title] of Object.entries(M1_TASK_PRIMARY_WIKI_PAGE_OVERRIDES)) {
    assert.ok(WIKI_PILLAR_MAP[title], `${taskKey} links to unknown Wiki page ${title}`);
  }
});

test('task-specific context wins over the workflow default', () => {
  assert.equal(getPrimaryWikiPageTitle({
    taskKey: 'M1-DP-02',
    workstream: 'Platform & Internal/Client System',
    milestoneSlug: 'm1-mock-run-build-ready',
  }), 'Client Portal');
  assert.equal(getPrimaryWikiPageTitle({
    taskKey: 'M1-WIKI-11',
    workstream: 'Block Ops Wiki Buildout',
    milestoneSlug: 'm1-mock-run-build-ready',
  }), 'Block Ops Wiki Six-Pillar Page Map');
});

test('expanded M1 tasks use controlled workflow defaults', () => {
  assert.equal(getPrimaryWikiPageTitle({
    task_key: 'M1-209',
    workstream: 'Block Ops Backup and Recovery',
  }), 'Backup and Continuity');
  assert.equal(getPrimaryWikiPageTitle({
    task_key: 'M1-173',
    workstream: 'Go-Live Verification',
  }), 'Go-Live Verification');
});

test('unknown M1 workflows fail closed while non-M1 tasks remain unlinked', () => {
  assert.throws(
    () => attachPrimaryWikiPage({ taskKey: 'M1-NEW', workstream: 'Unmapped M1 Workflow' }),
    /missing primary Wiki context/,
  );
  assert.deepEqual(attachPrimaryWikiPage({ taskKey: 'M2-01', workstream: 'Other' }), {
    taskKey: 'M2-01',
    workstream: 'Other',
    primaryWikiPageTitle: null,
  });
});

test('precise post-M1 task overrides resolve while broad future work stays fail-closed', () => {
  assert.equal(getPrimaryWikiPageTitle({
    taskKey: 'M2-XR-PORTAL-04',
    workstream: 'Mixed Reality — Portal & Data Integration',
  }), 'Supabase Data Model');
  assert.equal(getPrimaryWikiPageTitle({
    taskKey: 'M4-XR-PROD-03',
    workstream: 'Mixed Reality — Production Platform',
  }), 'Backup and Continuity');
  assert.equal(getPrimaryWikiPageTitle({
    taskKey: 'M2-XR-APP-01',
    workstream: 'Mixed Reality — Mixed-Reality Application',
  }), null);
});

test('first metrics tasks resolve to metric governance instead of go-live verification', () => {
  assert.equal(getPrimaryWikiPageTitle({
    taskKey: 'M1-197',
    workstream: 'First Metrics Capture',
  }), 'KPI Dictionary and Data Ownership');
  assert.equal(getPrimaryWikiPageTitle({
    taskKey: 'M1-202',
    workstream: 'First Metrics Capture',
  }), 'Measurement Framework and Minimum Dataset');
});
