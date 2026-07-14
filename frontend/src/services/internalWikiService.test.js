import test from 'node:test';
import assert from 'node:assert/strict';

import { fetchInternalWikiItems } from './internalWikiService.js';

const resultQuery = (result) => ({
  select() { return this; },
  order() { return Promise.resolve(result); },
});

test('fetchInternalWikiItems maps governed live rows without static Wiki content', async () => {
  const client = {
    from(table) {
      if (table === 'wiki_sections') {
        return resultQuery({
          data: [{ id: 'section-1', title: 'Digital Platform', slug: 'digital-platform', sort_order: 7 }],
          error: null,
        });
      }
      if (table === 'wiki_pages') {
        return resultQuery({
          data: [{
            id: 'page-1',
            section_id: 'section-1',
            title: 'Mission Control',
            slug: 'mission-control',
            summary: 'Internal operating board.',
            body_md: '# Mission Control',
            status: 'draft',
            owner: 'Max',
            storage_path: null,
            source: 'supabase',
            updated_at: '2026-07-14T00:00:00Z',
          }],
          error: null,
        });
      }
      throw new Error(`Unexpected table: ${table}`);
    },
  };

  assert.deepEqual(await fetchInternalWikiItems({ client }), [{
    id: 'wiki.page-1',
    objectId: 'wiki.page-1',
    title: 'Mission Control',
    description: 'Internal operating board.',
    category: 'wiki-platform',
    status: 'draft',
    publishBucket: 'internal-only',
    reviewer: 'Max',
    tags: ['Block Ops Wiki', 'Digital Platform', 'draft'],
    hasContent: true,
    storagePath: null,
    content: '# Mission Control',
    kind: 'wiki-page',
    sectionTitle: 'Digital Platform',
    slug: 'mission-control',
    updatedAt: '2026-07-14T00:00:00Z',
  }]);
});
