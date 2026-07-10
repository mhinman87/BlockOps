import test from 'node:test';
import assert from 'node:assert/strict';

import {
  WIKI_PROMOTION_STATES,
  WIKI_REVIEW_GATES,
  WIKI_VISIBILITY,
  canExposeWikiContentToClient,
  normalizeLegacyWikiBucket,
} from './wikiGovernance.js';

test('client exposure fails closed for drafts and candidates', () => {
  for (const promotionState of [
    WIKI_PROMOTION_STATES.INTERNAL_DRAFT,
    WIKI_PROMOTION_STATES.DOMAIN_REVIEW,
    WIKI_PROMOTION_STATES.INTERNAL_CURRENT,
    WIKI_PROMOTION_STATES.CLIENT_FACING_CANDIDATE,
  ]) {
    assert.equal(canExposeWikiContentToClient({
      promotionState,
      visibility: WIKI_VISIBILITY.CLIENT_VISIBLE,
      exactVersionApproved: true,
      leakPathsVerified: true,
    }), false);
  }
});

test('client exposure requires every gate, exact-version approval, and leak-path verification', () => {
  const requiredGates = [
    WIKI_REVIEW_GATES.BUSINESS_OWNER,
    WIKI_REVIEW_GATES.QUALIFIED_LEGAL_FINALIZATION,
  ];

  assert.equal(canExposeWikiContentToClient({
    promotionState: WIKI_PROMOTION_STATES.CLIENT_FACING_FINAL,
    visibility: WIKI_VISIBILITY.CLIENT_VISIBLE,
    requiredGates,
    completedGates: [WIKI_REVIEW_GATES.BUSINESS_OWNER],
    exactVersionApproved: true,
    leakPathsVerified: true,
  }), false);

  assert.equal(canExposeWikiContentToClient({
    promotionState: WIKI_PROMOTION_STATES.CLIENT_FACING_FINAL,
    visibility: WIKI_VISIBILITY.CLIENT_VISIBLE,
    requiredGates,
    completedGates: requiredGates,
    exactVersionApproved: true,
    leakPathsVerified: true,
  }), true);
});

test('legacy Wiki buckets normalize conservatively', () => {
  assert.equal(normalizeLegacyWikiBucket('internal-current-draft'), WIKI_PROMOTION_STATES.INTERNAL_DRAFT);
  assert.equal(normalizeLegacyWikiBucket('internal-draft'), WIKI_PROMOTION_STATES.INTERNAL_DRAFT);
  assert.equal(normalizeLegacyWikiBucket('system-gated-draft'), WIKI_PROMOTION_STATES.DOMAIN_REVIEW);
  assert.equal(normalizeLegacyWikiBucket('restricted-review-gated'), WIKI_PROMOTION_STATES.DOMAIN_REVIEW);
  assert.equal(normalizeLegacyWikiBucket('unknown'), WIKI_PROMOTION_STATES.INTERNAL_DRAFT);
});
