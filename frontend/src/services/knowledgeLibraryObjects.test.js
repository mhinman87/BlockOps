import test from 'node:test';
import assert from 'node:assert/strict';

import { buildKnowledgeLibraryItems } from './knowledgeLibraryObjects.js';

test('buildKnowledgeLibraryItems maps foundation representations into library cards', () => {
  const rows = [
    {
      object_id: 'foundation.last-protocol-suite',
      title: 'LAST Protocol Suite',
      storage_path: 'foundation/LAST_Protocol_Suite.md',
      review_status: 'approved',
    },
    {
      object_id: 'foundation.block-bay-workflow-logic',
      title: 'Block Bay Workflow Logic',
      storage_path: 'foundation/Block_Bay_Workflow_Logic.md',
      review_status: 'draft',
    },
  ];

  const config = {
    objectCategoryMap: {
      'foundation.last-protocol-suite': 'safety',
      'foundation.block-bay-workflow-logic': 'infrastructure',
    },
    cardMetadata: {
      'foundation.last-protocol-suite': {
        description: 'LAST content',
        tags: ['Foundation', 'Safety', 'Emergency'],
      },
      'foundation.block-bay-workflow-logic': {
        description: 'Workflow content',
        tags: ['Foundation', 'Infrastructure', 'Workflow'],
      },
    },
  };

  const items = buildKnowledgeLibraryItems(rows, config);

  assert.deepEqual(items, [
    {
      objectId: 'foundation.last-protocol-suite',
      title: 'LAST Protocol Suite',
      description: 'LAST content',
      category: 'safety',
      status: 'approved',
      tags: ['Foundation', 'Safety', 'Emergency'],
      hasContent: true,
      storagePath: 'foundation/LAST_Protocol_Suite.md',
    },
    {
      objectId: 'foundation.block-bay-workflow-logic',
      title: 'Block Bay Workflow Logic',
      description: 'Workflow content',
      category: 'infrastructure',
      status: 'draft',
      tags: ['Foundation', 'Infrastructure', 'Workflow'],
      hasContent: true,
      storagePath: 'foundation/Block_Bay_Workflow_Logic.md',
    },
  ]);
});

test('buildKnowledgeLibraryItems omits rows without category mapping', () => {
  const items = buildKnowledgeLibraryItems([
    {
      object_id: 'foundation.unknown',
      title: 'Unknown',
      storage_path: 'foundation/Unknown.md',
      review_status: 'draft',
    },
  ], {
    objectCategoryMap: {},
    cardMetadata: {},
  });

  assert.deepEqual(items, []);
});
