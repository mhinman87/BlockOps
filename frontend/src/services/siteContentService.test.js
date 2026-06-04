import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildRenderedSiteRepresentations,
  fetchRenderedSiteRepresentations,
} from './siteContentService.js';

test('buildRenderedSiteRepresentations overlays site configuration on top of global rows and appends approved exceptions', () => {
  const rows = [
    {
      object_id: 'foundation.block-bay-workflow-logic',
      title: 'Block Bay Workflow Logic',
      storage_path: 'foundation/Block_Bay_Workflow_Logic.md',
      review_status: 'approved',
      scope_type: 'global_standard',
      site_id: null,
    },
    {
      object_id: 'foundation.ra-consent-form',
      title: 'RA Consent Form',
      storage_path: 'foundation/RA_Consent_Form.md',
      review_status: 'approved',
      scope_type: 'global_standard',
      site_id: null,
    },
    {
      object_id: 'foundation.block-bay-workflow-logic',
      title: 'Block Bay Workflow Logic — ASC Demo Site',
      storage_path: 'sites/asc-demo/Block_Bay_Workflow_Logic.md',
      review_status: 'approved',
      scope_type: 'site_configuration',
      site_id: 'asc-demo',
    },
    {
      object_id: 'foundation.block-bay-workflow-logic.exception-1',
      title: 'Block Bay Workflow Logic Exception — ASC Demo Site',
      storage_path: 'sites/asc-demo/exceptions/Block_Bay_Workflow_Logic_EXCEPTION.md',
      review_status: 'approved',
      scope_type: 'exception',
      site_id: 'asc-demo',
    },
    {
      object_id: 'foundation.ra-consent-form',
      title: 'RA Consent Form — Draft Local Version',
      storage_path: 'sites/asc-demo/RA_Consent_Form.md',
      review_status: 'draft',
      scope_type: 'site_configuration',
      site_id: 'asc-demo',
    },
    {
      object_id: 'foundation.block-bay-workflow-logic',
      title: 'Wrong Site Override',
      storage_path: 'sites/site-2/Block_Bay_Workflow_Logic.md',
      review_status: 'approved',
      scope_type: 'site_configuration',
      site_id: 'site-2',
    },
  ];

  assert.deepEqual(buildRenderedSiteRepresentations(rows, { siteId: 'asc-demo' }), [
    {
      object_id: 'foundation.block-bay-workflow-logic',
      title: 'Block Bay Workflow Logic — ASC Demo Site',
      storage_path: 'sites/asc-demo/Block_Bay_Workflow_Logic.md',
      review_status: 'approved',
      scope_type: 'site_configuration',
      site_id: 'asc-demo',
      inherited_from_object_id: 'foundation.block-bay-workflow-logic',
    },
    {
      object_id: 'foundation.ra-consent-form',
      title: 'RA Consent Form',
      storage_path: 'foundation/RA_Consent_Form.md',
      review_status: 'approved',
      scope_type: 'global_standard',
      site_id: null,
      inherited_from_object_id: 'foundation.ra-consent-form',
    },
    {
      object_id: 'foundation.block-bay-workflow-logic.exception-1',
      title: 'Block Bay Workflow Logic Exception — ASC Demo Site',
      storage_path: 'sites/asc-demo/exceptions/Block_Bay_Workflow_Logic_EXCEPTION.md',
      review_status: 'approved',
      scope_type: 'exception',
      site_id: 'asc-demo',
      inherited_from_object_id: null,
    },
  ]);
});

test('fetchRenderedSiteRepresentations requests client-visible human content and returns rendered site view', async () => {
  const queryState = {
    table: null,
    selected: null,
    filters: [],
    order: null,
  };

  const fakeClient = {
    from(table) {
      queryState.table = table;
      return {
        select(selected) {
          queryState.selected = selected;
          return this;
        },
        eq(column, value) {
          queryState.filters.push([column, value]);
          return this;
        },
        order(column, options) {
          queryState.order = [column, options];
          return Promise.resolve({
            data: [
              {
                object_id: 'foundation.block-bay-workflow-logic',
                title: { title: 'Block Bay Workflow Logic' },
                storage_path: 'foundation/Block_Bay_Workflow_Logic.md',
                review_status: 'approved',
                scope_type: 'global_standard',
                site_id: null,
              },
              {
                object_id: 'foundation.block-bay-workflow-logic',
                title: { title: 'Block Bay Workflow Logic — ASC Demo Site' },
                storage_path: 'sites/asc-demo/Block_Bay_Workflow_Logic.md',
                review_status: 'approved',
                scope_type: 'site_configuration',
                site_id: 'asc-demo',
              },
            ],
            error: null,
          });
        },
      };
    },
  };

  const rows = await fetchRenderedSiteRepresentations({ siteId: 'asc-demo', client: fakeClient });

  assert.equal(queryState.table, 'content_representations');
  assert.equal(queryState.selected, 'object_id, title:content_objects(title), storage_path, review_status, scope_type, site_id');
  assert.deepEqual(queryState.filters, [
    ['knowledge_layer', 'layer1_human'],
    ['workspace_visibility', 'client_visible'],
  ]);
  assert.deepEqual(queryState.order, ['storage_path', { ascending: true }]);
  assert.deepEqual(rows, [
    {
      object_id: 'foundation.block-bay-workflow-logic',
      title: 'Block Bay Workflow Logic — ASC Demo Site',
      storage_path: 'sites/asc-demo/Block_Bay_Workflow_Logic.md',
      review_status: 'approved',
      scope_type: 'site_configuration',
      site_id: 'asc-demo',
      inherited_from_object_id: 'foundation.block-bay-workflow-logic',
    },
  ]);
});
