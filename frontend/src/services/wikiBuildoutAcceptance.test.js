import test from 'node:test';
import assert from 'node:assert/strict';

import { searchInternalWikiItems, runWikiBuildoutAcceptance } from './wikiBuildoutAcceptance.js';
import { WIKI_LIBRARY_ITEMS } from './wikiLibraryItems.js';
import { WIKI_PILLAR_MAP } from './wikiPillarMapping.js';
import { CANONICAL_LAUNCH_TASKS } from './launchOpsCanonicalSeed.js';

const getWikiItem = (title) => WIKI_LIBRARY_ITEMS.find((item) => item.title === title);
const getTask = (taskKey) => CANONICAL_LAUNCH_TASKS.find((task) => task.taskKey === taskKey);

test('internal Wiki search finds title, description, tags, and body text', () => {
  assert.ok(searchInternalWikiItems(WIKI_LIBRARY_ITEMS, 'Block Ops Mission').some((item) => item.title === 'Block Ops Mission'));
  assert.ok(searchInternalWikiItems(WIKI_LIBRARY_ITEMS, 'supabase').some((item) => item.title === 'Supabase Data Model'));
  assert.ok(searchInternalWikiItems(WIKI_LIBRARY_ITEMS, 'M1-WIKI-13').some((item) => item.title === 'Block Ops Wiki Client-Facing Candidate Register'));
  assert.ok(searchInternalWikiItems(WIKI_LIBRARY_ITEMS, 'qualified lawyer').length > 0);
});

test('Batch 5 approval locks the no-exception real-client onboarding gate', () => {
  const onboarding = getWikiItem('Client Onboarding');
  const batchReview = getTask('M1-DCK-06');

  assert.equal(onboarding.status, 'current');
  assert.equal(onboarding.publishBucket, 'internal-current');
  assert.match(onboarding.content, /no formal onboarding, portal access, or deliverable release occurs until the required agreement is executed/);
  assert.match(onboarding.content, /required payment or finance condition is satisfied/);
  assert.match(onboarding.content, /business decision cannot waive a required legal signature/i);
  assert.match(onboarding.content, /simulated agreement and payment evidence may test the workflow/i);
  assert.equal(batchReview.status, 'done');
  assert.match(batchReview.description, /Clinical, legal, finance, and Max technical finalization remain separate gates/);
});

test('final review workflow is exact-version, independently gated, and fail-closed', () => {
  const readiness = getWikiItem('Block Ops Wiki Go-Live Readiness Matrix');
  const finalReview = getTask('M1-FINAL-REVIEW-01');

  assert.equal(readiness.status, 'current');
  assert.equal(readiness.publishBucket, 'internal-current');
  assert.match(readiness.content, /Submit one exact version/);
  assert.match(readiness.content, /No reviewer or executive may waive another domain's required gate/);
  assert.match(readiness.content, /Internal-current approval remains internal-only|visibility remains `internal-only`/i);
  assert.match(readiness.content, /Reopen on substantive change/i);
  assert.equal(finalReview.status, 'done');
  assert.match(finalReview.description, /Max-owned UI\/schema enforcement remains M1-FINAL-REVIEW-02/);
});

test('approved CRM model separates the lead lifecycle from the post-signature client lifecycle', () => {
  const crm = getWikiItem('CRM Pipeline Stages');

  assert.match(crm.content, /Part 1 — Lead lifecycle/);
  assert.match(crm.content, /The record remains a lead through Contract & Signature/);
  assert.match(crm.content, /Part 2 — Client lifecycle/);
  assert.match(crm.content, /Client Kickoff[\s\S]*Onboarding[\s\S]*Training Scheduled[\s\S]*Training Ready[\s\S]*Go-Live Verification[\s\S]*Live[\s\S]*First Metrics Captured/);
  assert.match(crm.content, /not renumbered as steps 10–16 of the lead journey/i);
  assert.doesNotMatch(crm.content, /### Stage 10 — Won \/ Signed/);
  assert.equal(crm.publishBucket, 'internal-draft');
});

test('contract-to-live stages have explicit evidence-backed entry and exit gates', () => {
  const crm = getWikiItem('CRM Pipeline Stages');

  for (const stage of ['Contract & Signature', 'Client Kickoff', 'Onboarding', 'Training Scheduled', 'Training Ready', 'Go-Live Verification', 'Live', 'First Metrics Captured']) {
    assert.match(crm.content, new RegExp(`#### ${stage.replace('&', '\\&')}[\\s\\S]*?\\*\\*Entry:`));
  }
  assert.match(crm.content, /Missing evidence, a required \*\*no\*\*, or an unresolved hard stop/);
  assert.match(crm.content, /at least one measurable implementation-bundle KPI/);
  assert.match(crm.content, /M1-GR-008` completed on 2026-07-19/);
  assert.doesNotMatch(crm.content, /Detailed entry\/exit criteria remain the next Samir task/);
});

test('M1-WIKI-14 acceptance passes against verified live baselines', () => {
  const result = runWikiBuildoutAcceptance({
    liveWikiPageCount: Object.keys(WIKI_PILLAR_MAP).length,
    liveM1TaskCount: 328,
    liveCorrectWikiLinkCount: 328,
  });

  assert.equal(result.accepted, true);
  assert.deepEqual(Object.values(result.checks), Object.values(result.checks).map(() => true));
  assert.equal(result.counts.clientVisibleDrafts, 0);
  assert.deepEqual(result.failures, {
    titleSearchFailures: [],
    invalidReviewLabels: [],
    missingPillars: [],
    unlinkedCanonicalM1Tasks: [],
    invalidCanonicalTargets: [],
    clientVisibleDrafts: [],
  });
});

test('acceptance fails closed when live coverage or client filtering regresses', () => {
  const exposedItem = { ...WIKI_LIBRARY_ITEMS[0], status: 'approved' };
  const result = runWikiBuildoutAcceptance({
    wikiItems: [exposedItem, ...WIKI_LIBRARY_ITEMS.slice(1)],
    liveWikiPageCount: 42,
    liveM1TaskCount: 328,
    liveCorrectWikiLinkCount: 327,
  });

  assert.equal(result.accepted, false);
  assert.equal(result.checks.noDraftWikiContentVisibleToClients, false);
  assert.equal(result.checks.liveWikiPageBaselineVerified, false);
  assert.equal(result.checks.liveM1WikiLinksVerified, false);
});
