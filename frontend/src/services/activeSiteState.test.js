import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ACTIVE_SITE_STORAGE_KEY,
  DEFAULT_ACTIVE_SITE_ID,
  buildRenderedSiteQuery,
  chooseInitialActiveSiteId,
  getDefaultActiveSiteId,
} from './activeSiteState.js';

test('active site constants use the demo site as the initial fallback', () => {
  assert.equal(ACTIVE_SITE_STORAGE_KEY, 'blockops_active_site_id');
  assert.equal(DEFAULT_ACTIVE_SITE_ID, 'asc-demo');
});

test('getDefaultActiveSiteId prefers the demo site when it is available', () => {
  const sites = [
    { siteId: 'client-2', siteName: 'Client 2' },
    { siteId: 'asc-demo', siteName: 'ASC Demo Site' },
  ];

  assert.equal(getDefaultActiveSiteId(sites), 'asc-demo');
});

test('getDefaultActiveSiteId falls back to the first available site when demo is unavailable', () => {
  const sites = [
    { siteId: 'client-2', siteName: 'Client 2' },
    { siteId: 'client-3', siteName: 'Client 3' },
  ];

  assert.equal(getDefaultActiveSiteId(sites), 'client-2');
});

test('chooseInitialActiveSiteId prefers stored site when it exists in the available site list', () => {
  const sites = [
    { siteId: 'asc-demo', siteName: 'ASC Demo Site' },
    { siteId: 'client-2', siteName: 'Client 2' },
  ];

  assert.equal(chooseInitialActiveSiteId({ sites, storedSiteId: 'client-2' }), 'client-2');
});

test('chooseInitialActiveSiteId falls back to the default site when the stored site is missing', () => {
  const sites = [
    { siteId: 'asc-demo', siteName: 'ASC Demo Site' },
    { siteId: 'client-2', siteName: 'Client 2' },
  ];

  assert.equal(chooseInitialActiveSiteId({ sites, storedSiteId: 'unknown-site' }), 'asc-demo');
});

test('chooseInitialActiveSiteId falls back to the first available site when default is unavailable', () => {
  const sites = [
    { siteId: 'client-2', siteName: 'Client 2' },
    { siteId: 'client-3', siteName: 'Client 3' },
  ];

  assert.equal(chooseInitialActiveSiteId({ sites, storedSiteId: null }), 'client-2');
});

test('buildRenderedSiteQuery returns rendered query options for the active site', () => {
  assert.deepEqual(buildRenderedSiteQuery('client-2'), {
    scope: 'rendered',
    siteId: 'client-2',
  });
});
