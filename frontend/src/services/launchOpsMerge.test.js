import test from 'node:test';
import assert from 'node:assert/strict';

import {
  mergeMilestonesWithCanonical,
  mergeBoardWithCanonical,
} from './launchOpsMerge.js';
import { CANONICAL_MILESTONES, CANONICAL_TASKS } from './launchOpsCanonicalSeed.js';

test('mergeMilestonesWithCanonical renders the full M1–M10 ladder when live rows are empty', () => {
  const merged = mergeMilestonesWithCanonical([]);
  assert.equal(merged.length, CANONICAL_MILESTONES.length);
  assert.equal(merged[0].code, 'M1');
  assert.equal(merged[0].title, 'Mock Client Lead-to-Live Run');
  assert.equal(merged[0].id, 'canonical:m1-mock-run-build-ready');
  assert.equal(merged[0].isCanonicalOnly, true);
  assert.equal(merged[9].code, 'M10');
});

test('mergeMilestonesWithCanonical keeps the live id and current status, never loses live-only rows', () => {
  const merged = mergeMilestonesWithCanonical([
    { id: 'real-1', slug: 'm1-mock-run-build-ready', title: 'Mock Client Lead-to-Live Run', status: 'done', sortOrder: 1 },
    { id: 'live-only', slug: 'm99-special', title: 'Special live milestone', status: 'in_progress', sortOrder: 99 },
  ]);

  const m1 = merged.find((m) => m.slug === 'm1-mock-run-build-ready');
  assert.equal(m1.id, 'real-1');
  assert.equal(m1.status, 'done');
  assert.equal(m1.isCanonicalOnly, false);

  const liveOnly = merged.find((m) => m.slug === 'm99-special');
  assert.ok(liveOnly, 'live-only milestone should be preserved');
  assert.equal(liveOnly.code, 'M99');
  assert.equal(liveOnly.isLiveOnly, true);
});

test('mergeBoardWithCanonical builds the full task ladder linked to milestone ids when live is empty', () => {
  const { milestones, tasks } = mergeBoardWithCanonical({ liveMilestones: [], liveTasks: [] });
  assert.equal(tasks.length, CANONICAL_TASKS.length);

  const milestoneIdBySlug = Object.fromEntries(milestones.map((m) => [m.slug, m.id]));
  const s1 = tasks.find((t) => t.taskKey === 'S1');
  assert.equal(s1.milestoneId, milestoneIdBySlug['m1-mock-run-build-ready']);
  assert.equal(s1.workstream, 'Clinical Standard & Validation');
  assert.ok(s1.computedStatus, 'computed status should be derived');

  // A task with an unmet hard dependency computes as locked (S3 depends on S2).
  const s3 = tasks.find((t) => t.taskKey === 'S3');
  assert.equal(s3.computedStatus, 'locked');
});

test('mergeBoardWithCanonical lets live status win while keeping canonical structure', () => {
  const { tasks } = mergeBoardWithCanonical({
    liveMilestones: [{ id: 'real-1', slug: 'm1-mock-run-build-ready', status: 'in_progress', sortOrder: 1 }],
    liveTasks: [{
      id: 'live-s1', taskKey: 'S1', title: 'Live override title', status: 'done',
      primaryOwner: 'Samir', milestoneId: 'real-1', collaborators: [], dependencies: [],
    }],
  });

  const s1 = tasks.find((t) => t.taskKey === 'S1');
  assert.equal(s1.id, 'live-s1');
  assert.equal(s1.status, 'done');
  assert.equal(s1.milestoneId, 'real-1');
  // Canonical owns the structural workflow lane.
  assert.equal(s1.workstream, 'Clinical Standard & Validation');
});

test('mergeBoardWithCanonical preserves live-only tasks', () => {
  const { tasks } = mergeBoardWithCanonical({
    liveMilestones: [],
    liveTasks: [{ id: 'extra-1', taskKey: 'ZZ1', title: 'Extra live task', status: 'ready', primaryOwner: 'Max', milestoneId: 'whatever', collaborators: [], dependencies: [] }],
  });
  const extra = tasks.find((t) => t.taskKey === 'ZZ1');
  assert.ok(extra, 'live-only task should be preserved');
  assert.equal(extra.isLiveOnly, true);
});
