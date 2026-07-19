export const WIKI_PROMOTION_STATES = Object.freeze({
  PLANNED_UNBUILT: 'planned-unbuilt',
  SOURCE_ONLY: 'source-only',
  INTERNAL_DRAFT: 'internal-draft',
  DOMAIN_REVIEW: 'domain-review',
  CHANGES_REQUIRED: 'changes-required',
  INTERNAL_CURRENT: 'internal-current',
  CLIENT_FACING_CANDIDATE: 'client-facing-candidate',
  CLIENT_FACING_FINAL: 'client-facing-final',
  ARCHIVE_REFERENCE: 'archive-reference',
});

export const WIKI_REVIEW_GATES = Object.freeze({
  BUSINESS_OWNER: 'business-owner-review',
  SALES_CLIENT_LANGUAGE: 'sales-client-language-review',
  PLATFORM_VERIFICATION: 'platform-verification',
  QUALIFIED_LEGAL_FINALIZATION: 'qualified-legal-finalization',
  QUALIFIED_CLINICAL_FACT_REVIEW: 'qualified-clinical-fact-review',
  EVIDENCE_CLAIMS_REVIEW: 'evidence-claims-review',
  CODING_COMPLIANCE_REVIEW: 'coding-compliance-review',
  SITE_OWNER_APPROVAL: 'site-owner-approval',
});

export const WIKI_VISIBILITY = Object.freeze({
  RESTRICTED_INTERNAL: 'restricted-internal',
  INTERNAL_ONLY: 'internal-only',
  CLIENT_VISIBLE: 'client-visible',
  ARCHIVED: 'archived',
  HIDDEN: 'hidden',
});

export const canExposeWikiContentToClient = ({
  promotionState,
  visibility,
  requiredGates = [],
  completedGates = [],
  exactVersionApproved = false,
  leakPathsVerified = false,
} = {}) => {
  const completed = new Set(completedGates);
  const gatesComplete = requiredGates.every((gate) => completed.has(gate));

  return promotionState === WIKI_PROMOTION_STATES.CLIENT_FACING_FINAL
    && visibility === WIKI_VISIBILITY.CLIENT_VISIBLE
    && gatesComplete
    && exactVersionApproved
    && leakPathsVerified;
};

export const normalizeLegacyWikiBucket = (bucket) => {
  switch (bucket) {
    case 'planned-unbuilt':
      return WIKI_PROMOTION_STATES.PLANNED_UNBUILT;
    case 'restricted-review-gated':
    case 'system-gated-draft':
      return WIKI_PROMOTION_STATES.DOMAIN_REVIEW;
    case 'internal-current-draft':
    case 'internal-draft':
    default:
      return WIKI_PROMOTION_STATES.INTERNAL_DRAFT;
  }
};
