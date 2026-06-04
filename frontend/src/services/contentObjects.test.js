import test from 'node:test';
import assert from 'node:assert/strict';

import { buildAgentKnowledgeItems } from './contentObjectTransforms.js';

test('buildAgentKnowledgeItems maps content representations into agent knowledge page items', () => {
  const rows = [
    {
      object_id: 'foundation.last-protocol-suite',
      source_path: 'agent-knowledge/LAST_Protocol_Suite.agent.md',
      storage_path: 'agent-knowledge/LAST_Protocol_Suite.agent.md',
      review_status: 'draft',
    },
    {
      object_id: 'foundation.block-champion-charter',
      source_path: 'agent-knowledge/Block_Champion_Charter.agent.md',
      storage_path: 'agent-knowledge/Block_Champion_Charter.agent.md',
      review_status: 'approved',
    },
  ];

  const fileMetadata = {
    'LAST_Protocol_Suite.agent.md': { category: 'Safety', units: 9, qaPairs: 7 },
    'Block_Champion_Charter.agent.md': { category: 'Governance', units: 11, qaPairs: 8 },
  };

  const items = buildAgentKnowledgeItems(rows, fileMetadata);

  assert.deepEqual(items, [
    {
      objectId: 'foundation.block-champion-charter',
      fileName: 'Block_Champion_Charter.agent.md',
      name: 'Block Champion Charter',
      path: 'agent-knowledge/Block_Champion_Charter.agent.md',
      deliverable: 'Block Champion Charter',
      category: 'Governance',
      status: 'complete',
      reviewStatus: 'approved',
      units: 11,
      qaPairs: 8,
    },
    {
      objectId: 'foundation.last-protocol-suite',
      fileName: 'LAST_Protocol_Suite.agent.md',
      name: 'LAST Protocol Suite',
      path: 'agent-knowledge/LAST_Protocol_Suite.agent.md',
      deliverable: 'LAST Protocol Suite',
      category: 'Safety',
      status: 'complete',
      reviewStatus: 'draft',
      units: 9,
      qaPairs: 7,
    },
  ]);
});

test('buildAgentKnowledgeItems falls back gracefully when metadata is missing', () => {
  const rows = [
    {
      object_id: 'foundation.custom-doc',
      source_path: 'agent-knowledge/Custom_Doc.agent.md',
      storage_path: 'agent-knowledge/Custom_Doc.agent.md',
      review_status: 'draft',
    },
  ];

  const items = buildAgentKnowledgeItems(rows, {});

  assert.equal(items[0].name, 'Custom Doc');
  assert.equal(items[0].category, 'General');
  assert.equal(items[0].units, 0);
  assert.equal(items[0].qaPairs, 0);
});
