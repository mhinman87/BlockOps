import test from 'node:test';
import assert from 'node:assert/strict';

import { WIKI_LIBRARY_ITEMS } from './wikiLibraryItems.js';
import {
  WIKI_PILLARS,
  WIKI_PILLAR_MAP,
  attachWikiPillarMetadata,
  getWikiPillarMetadata,
} from './wikiPillarMapping.js';

const pillarSet = new Set(WIKI_PILLARS);

test('the six-pillar map covers all audited live Wiki pages', () => {
  assert.equal(Object.keys(WIKI_PILLAR_MAP).length, 61);

  for (const [title, metadata] of Object.entries(WIKI_PILLAR_MAP)) {
    assert.ok(pillarSet.has(metadata.primaryPillar), `${title} has an invalid primary pillar`);
    assert.ok(!metadata.secondaryPillars.includes(metadata.primaryPillar), `${title} repeats its primary pillar`);
    assert.equal(new Set(metadata.secondaryPillars).size, metadata.secondaryPillars.length, `${title} has duplicate secondary pillars`);
    assert.ok(metadata.secondaryPillars.every((pillar) => pillarSet.has(pillar)), `${title} has an invalid secondary pillar`);
  }
});

test('every canonical Wiki library page receives pillar metadata', () => {
  assert.equal(WIKI_LIBRARY_ITEMS.length, 56);
  assert.deepEqual(WIKI_LIBRARY_ITEMS.filter((item) => !item.primaryPillar), []);
  assert.ok(WIKI_LIBRARY_ITEMS.every((item) => Array.isArray(item.secondaryPillars)));
});

test('pillar metadata is deterministic for representative cross-pillar pages', () => {
  assert.deepEqual(getWikiPillarMetadata('Go-Live Verification'), {
    primaryPillar: 'Physical Operations',
    secondaryPillars: [
      'Human Capital',
      'Digital Platform',
      'Stakeholder Integration',
      'Value Intelligence',
      'Implementation Bundles',
    ],
  });

  const mapped = attachWikiPillarMetadata({ title: 'Legal Review Index' });
  assert.equal(mapped.primaryPillar, 'Value Intelligence');
  assert.deepEqual(mapped.secondaryPillars, ['Human Capital', 'Stakeholder Integration']);

  assert.deepEqual(getWikiPillarMetadata('Design Handoff Template'), {
    primaryPillar: 'Digital Platform',
    secondaryPillars: ['Human Capital'],
  });
});

test('new Wiki pages fail closed when pillar metadata is missing', () => {
  assert.throws(
    () => attachWikiPillarMetadata({ title: 'Unmapped Page' }),
    /missing six-pillar metadata/,
  );
});
