import test from 'node:test';
import assert from 'node:assert/strict';

import { filterVisibleLibraryItems } from './contentVisibility.js';
import { WIKI_LIBRARY_ITEMS } from './wikiLibraryItems.js';

const register = WIKI_LIBRARY_ITEMS.find(
  (item) => item.title === 'Block Ops Wiki Client-Facing Candidate Register',
);

test('the M1-WIKI-13 candidate register is complete and internal-only', () => {
  assert.ok(register);
  assert.equal(register.status, 'draft');
  assert.equal(register.publishBucket, 'internal-draft');
  assert.equal(register.primaryPillar, 'Stakeholder Integration');
  assert.match(register.content, /Whole-page candidate \| 0/);
  assert.match(register.content, /Excerpt\/derivative candidate identified \| 17/);
  assert.match(register.content, /Deferred \| 3/);
  assert.match(register.content, /Permanent-internal \| 22/);
  assert.match(register.content, /does not promote any page/);
});

test('the candidate register is excluded from client library results', () => {
  assert.deepEqual(filterVisibleLibraryItems([register], false), []);
  assert.deepEqual(filterVisibleLibraryItems([register], true), [register]);
});
