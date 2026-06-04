import test from 'node:test';
import assert from 'node:assert/strict';

import { fetchSites, normalizeSiteRow } from './siteService.js';

test('normalizeSiteRow maps database rows into frontend site objects', () => {
  assert.deepEqual(normalizeSiteRow({
    site_id: 'asc-demo',
    site_name: 'ASC Demo Site',
    client_account_name: 'Demo Health Partners',
    status: 'onboarding',
    launch_phase: 'prep',
  }), {
    siteId: 'asc-demo',
    siteName: 'ASC Demo Site',
    clientAccountName: 'Demo Health Partners',
    status: 'onboarding',
    launchPhase: 'prep',
  });
});

test('fetchSites reads the sites table and returns alphabetized site objects', async () => {
  const queryState = { table: null, selected: null, order: null };

  const fakeClient = {
    from(table) {
      queryState.table = table;
      return {
        select(selected) {
          queryState.selected = selected;
          return this;
        },
        order(column, options) {
          queryState.order = [column, options];
          return Promise.resolve({
            data: [
              {
                site_id: 'zeta',
                site_name: 'Zeta ASC',
                client_account_name: 'Zeta Health',
                status: 'active',
                launch_phase: 'support',
              },
              {
                site_id: 'asc-demo',
                site_name: 'ASC Demo Site',
                client_account_name: 'Demo Health Partners',
                status: 'onboarding',
                launch_phase: 'prep',
              },
            ],
            error: null,
          });
        },
      };
    },
  };

  const sites = await fetchSites({ client: fakeClient });

  assert.equal(queryState.table, 'sites');
  assert.equal(queryState.selected, 'site_id, site_name, client_account_name, status, launch_phase');
  assert.deepEqual(queryState.order, ['site_name', { ascending: true }]);
  assert.deepEqual(sites, [
    {
      siteId: 'asc-demo',
      siteName: 'ASC Demo Site',
      clientAccountName: 'Demo Health Partners',
      status: 'onboarding',
      launchPhase: 'prep',
    },
    {
      siteId: 'zeta',
      siteName: 'Zeta ASC',
      clientAccountName: 'Zeta Health',
      status: 'active',
      launchPhase: 'support',
    },
  ]);
});
