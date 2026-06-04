import test from 'node:test';
import assert from 'node:assert/strict';

import { fetchKnowledgeLibraryItems } from './knowledgeLibraryContentService.js';
import { fetchFoundationDeliverableSections } from './deliverableContentService.js';

test('fetchKnowledgeLibraryItems uses rendered site view when scope is rendered', async () => {
  const fakeClient = {
    from() {
      return {
        select() { return this; },
        eq() { return this; },
        order() {
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

  const items = await fetchKnowledgeLibraryItems({ scope: 'rendered', siteId: 'asc-demo', client: fakeClient });

  assert.equal(items.length, 1);
  assert.equal(items[0].storagePath, 'sites/asc-demo/Block_Bay_Workflow_Logic.md');
  assert.equal(items[0].title, 'Block Bay Workflow Logic — ASC Demo Site');
});

test('fetchFoundationDeliverableSections uses rendered site view when scope is rendered', async () => {
  const fakeClient = {
    from() {
      return {
        select() { return this; },
        eq() { return this; },
        order() {
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

  const sections = await fetchFoundationDeliverableSections({ scope: 'rendered', siteId: 'asc-demo', client: fakeClient });

  assert.equal(sections.length, 1);
  assert.equal(sections[0].name, 'Physical Infrastructure');
  assert.equal(sections[0].items.length, 1);
  assert.equal(sections[0].items[0].storagePath, 'sites/asc-demo/Block_Bay_Workflow_Logic.md');
  assert.equal(sections[0].items[0].name, 'Block Bay Workflow Logic — ASC Demo Site');
});
