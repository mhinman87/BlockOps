import test from 'node:test';
import assert from 'node:assert/strict';

import { filterVisibleLibraryItems } from './contentVisibility.js';

test('filterVisibleLibraryItems returns all items for team users', () => {
  const items = [
    { title: 'Draft Doc', status: 'draft', hasContent: true },
    { title: 'Approved Doc', status: 'approved', hasContent: true },
  ];

  assert.deepEqual(filterVisibleLibraryItems(items, true), items);
});

test('filterVisibleLibraryItems returns only approved content for clients', () => {
  const items = [
    { title: 'Draft Doc', status: 'draft', hasContent: true },
    { title: 'Approved Doc', status: 'approved', hasContent: true },
    { title: 'No Content Yet', status: 'approved', hasContent: false },
  ];

  assert.deepEqual(filterVisibleLibraryItems(items, false), [
    { title: 'Approved Doc', status: 'approved', hasContent: true },
  ]);
});
