import test from 'node:test';
import assert from 'node:assert/strict';

import { buildFoundationSections } from './deliverableObjects.js';

test('buildFoundationSections groups human foundation representations into display sections', () => {
  const rows = [
    {
      object_id: 'foundation.last-protocol-suite',
      title: 'LAST Protocol Suite',
      source_path: 'deliverables/foundation/LAST_Protocol_Suite.md',
      storage_path: 'foundation/LAST_Protocol_Suite.md',
      review_status: 'approved',
      package: 'foundation',
    },
    {
      object_id: 'foundation.block-bay-workflow-logic',
      title: 'Block Bay Workflow Logic',
      source_path: 'deliverables/foundation/Block_Bay_Workflow_Logic.md',
      storage_path: 'foundation/Block_Bay_Workflow_Logic.md',
      review_status: 'draft',
      package: 'foundation',
    },
  ];

  const config = {
    categories: {
      safety: { label: 'Safety' },
      infrastructure: { label: 'Physical Infrastructure' },
    },
    objectCategoryMap: {
      'foundation.last-protocol-suite': 'safety',
      'foundation.block-bay-workflow-logic': 'infrastructure',
    },
  };

  const sections = buildFoundationSections(rows, config);

  assert.deepEqual(sections, [
    {
      id: 'safety',
      name: 'Safety',
      items: [
        {
          objectId: 'foundation.last-protocol-suite',
          name: 'LAST Protocol Suite',
          status: 'approved',
          storagePath: 'foundation/LAST_Protocol_Suite.md',
          category: 'safety',
        },
      ],
    },
    {
      id: 'infrastructure',
      name: 'Physical Infrastructure',
      items: [
        {
          objectId: 'foundation.block-bay-workflow-logic',
          name: 'Block Bay Workflow Logic',
          status: 'draft',
          storagePath: 'foundation/Block_Bay_Workflow_Logic.md',
          category: 'infrastructure',
        },
      ],
    },
  ]);
});

test('buildFoundationSections ignores uncategorized rows', () => {
  const rows = [
    {
      object_id: 'foundation.unknown',
      title: 'Unknown',
      storage_path: 'foundation/Unknown.md',
      review_status: 'draft',
      package: 'foundation',
    },
  ];

  const sections = buildFoundationSections(rows, {
    categories: { safety: { label: 'Safety' } },
    objectCategoryMap: {},
  });

  assert.deepEqual(sections, []);
});
