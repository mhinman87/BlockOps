import test from 'node:test';
import assert from 'node:assert/strict';

import { filterRepresentationsByScope } from './contentScope.js';

test('filterRepresentationsByScope returns only global rows when scope is global', () => {
  const rows = [
    { object_id: 'foundation.a', scope_type: 'global_standard', site_id: null },
    { object_id: 'foundation.b', scope_type: 'site_configuration', site_id: 'site-1' },
    { object_id: 'foundation.c', scope_type: 'exception', site_id: 'site-1' },
  ];

  assert.deepEqual(filterRepresentationsByScope(rows, { scope: 'global' }), [
    { object_id: 'foundation.a', scope_type: 'global_standard', site_id: null },
  ]);
});

test('filterRepresentationsByScope returns site config and exceptions for a site', () => {
  const rows = [
    { object_id: 'foundation.a', scope_type: 'global_standard', site_id: null },
    { object_id: 'foundation.b', scope_type: 'site_configuration', site_id: 'site-1' },
    { object_id: 'foundation.c', scope_type: 'exception', site_id: 'site-1' },
    { object_id: 'foundation.d', scope_type: 'site_configuration', site_id: 'site-2' },
  ];

  assert.deepEqual(filterRepresentationsByScope(rows, { scope: 'site', siteId: 'site-1' }), [
    { object_id: 'foundation.b', scope_type: 'site_configuration', site_id: 'site-1' },
    { object_id: 'foundation.c', scope_type: 'exception', site_id: 'site-1' },
  ]);
});

test('filterRepresentationsByScope returns global plus site rows for rendered mode', () => {
  const rows = [
    { object_id: 'foundation.a', scope_type: 'global_standard', site_id: null },
    { object_id: 'foundation.b', scope_type: 'site_configuration', site_id: 'site-1' },
    { object_id: 'foundation.c', scope_type: 'exception', site_id: 'site-1' },
    { object_id: 'foundation.d', scope_type: 'site_configuration', site_id: 'site-2' },
  ];

  assert.deepEqual(filterRepresentationsByScope(rows, { scope: 'rendered', siteId: 'site-1' }), [
    { object_id: 'foundation.a', scope_type: 'global_standard', site_id: null },
    { object_id: 'foundation.b', scope_type: 'site_configuration', site_id: 'site-1' },
    { object_id: 'foundation.c', scope_type: 'exception', site_id: 'site-1' },
  ]);
});
