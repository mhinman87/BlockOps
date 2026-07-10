import test from 'node:test';
import assert from 'node:assert/strict';

import {
  WIKI_HUBS,
  canTraverseWikiLink,
  parseWikiHref,
  prepareWikiMarkdown,
  runWikiLinkQa,
  wikiHref,
} from './wikiCrossLinks.js';
import { WIKI_LIBRARY_ITEMS } from './wikiLibraryItems.js';
import { WIKI_PILLAR_MAP } from './wikiPillarMapping.js';

test('governed cross-link graph has six indexes, no broken links, no orphans, and outbound links on every page', () => {
  const result = runWikiLinkQa({ items: WIKI_LIBRARY_ITEMS });
  assert.equal(Object.keys(WIKI_HUBS).length, 6);
  assert.equal(result.counts.governedPages, Object.keys(WIKI_PILLAR_MAP).length);
  assert.ok(result.counts.links >= result.counts.governedPages);
  assert.equal(result.passed, true);
  assert.deepEqual(result.failures, {
    brokenLinks: [],
    orphanPages: [],
    pagesWithNoOutboundLinks: [],
    clientLeakPaths: [],
  });
});

test('every repository Wiki item gets a governed Related Pages block with resolvable targets', () => {
  const titles = new Set(WIKI_LIBRARY_ITEMS.map((item) => item.title));
  for (const item of WIKI_LIBRARY_ITEMS) {
    assert.ok(item.relatedPageTitles.length > 0, `${item.title} has no related pages`);
    assert.match(item.content, /## Related Pages/);
    assert.ok(item.relatedPageTitles.every((title) => titles.has(title)), `${item.title} has an unresolved static target`);
    assert.doesNotMatch(item.content, /\[\[[^\]]+\]\]/, `${item.title} contains unprocessed Wiki syntax`);
    for (const match of item.content.matchAll(/\]\((wiki:[^)]+)\)/g)) {
      assert.ok(titles.has(parseWikiHref(match[1])), `${item.title} contains a broken clickable Wiki target`);
    }
  }
});

test('Wiki syntax becomes safe internal navigation links', () => {
  const href = wikiHref('Mission Control');
  assert.equal(parseWikiHref(href), 'Mission Control');
  assert.equal(prepareWikiMarkdown('See [[Mission Control]] and [[Status Rules|statuses]].'),
    'See [Mission Control](wiki:Mission%20Control) and [statuses](wiki:Status%20Rules).');
  assert.equal(parseWikiHref('https://example.com'), null);
});

test('client traversal fails closed unless both exact pages are client-visible finals', () => {
  const draft = { title: 'Draft', publishBucket: 'internal-draft', visibility: 'internal-only' };
  const final = { title: 'Final', publishBucket: 'client-facing-final', visibility: 'client-visible' };
  assert.equal(canTraverseWikiLink({ source: draft, target: final, isTeam: false }), false);
  assert.equal(canTraverseWikiLink({ source: final, target: draft, isTeam: false }), false);
  assert.equal(canTraverseWikiLink({ source: final, target: final, isTeam: false }), true);
  assert.equal(canTraverseWikiLink({ source: draft, target: draft, isTeam: true }), true);
});

test('link QA reports a client-safe page pointing at an internal draft', () => {
  const items = [
    { title: 'Client Portal', publishBucket: 'client-facing-final', visibility: 'client-visible' },
    { title: 'Dashboard', publishBucket: 'internal-draft', visibility: 'internal-only' },
  ];
  const result = runWikiLinkQa({ items, governedTitles: ['Client Portal', 'Dashboard'] });
  assert.deepEqual(result.failures.clientLeakPaths, [{ source: 'Client Portal', target: 'Dashboard' }]);
  assert.equal(result.passed, false);
});
