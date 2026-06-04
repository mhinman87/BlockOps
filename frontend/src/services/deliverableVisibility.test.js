import test from 'node:test';
import assert from 'node:assert/strict';

import { filterVisibleDeliverableItems } from './contentVisibility.js';

test('filterVisibleDeliverableItems returns all items for team users', () => {
  const items = [
    { name: 'Draft Doc', status: 'draft', storagePath: 'foundation/Draft.md' },
    { name: 'Approved Doc', status: 'approved', storagePath: 'foundation/Approved.md' },
    { name: 'Not Started Doc', status: 'not-started' },
  ];

  assert.deepEqual(filterVisibleDeliverableItems(items, true), items);
});

test('filterVisibleDeliverableItems returns only approved client-visible items for clients', () => {
  const items = [
    { name: 'Draft Doc', status: 'draft', storagePath: 'foundation/Draft.md' },
    { name: 'Approved Doc', status: 'approved', storagePath: 'foundation/Approved.md' },
    { name: 'Not Started Doc', status: 'not-started' },
  ];

  assert.deepEqual(filterVisibleDeliverableItems(items, false), [
    { name: 'Approved Doc', status: 'approved', storagePath: 'foundation/Approved.md' },
  ]);
});
