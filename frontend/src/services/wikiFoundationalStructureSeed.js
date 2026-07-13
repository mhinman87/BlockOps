export const FOUNDATIONAL_STRUCTURE_VERSION = '2026-07-12-v2';

const notice = `> **Internal scaffold — ${FOUNDATIONAL_STRUCTURE_VERSION}**  
> This page establishes governed structure before every operating decision is complete. Sections marked **Milestone-built** must be completed and verified through Mission Control evidence. This scaffold does not create a clinical protocol, legal conclusion, contractual promise, billing rule, performance claim, or verified platform capability.`;

const renderList = (items) => items.map((item) => `- ${item}`).join('\n');

const renderPage = (page) => `# ${page.title}

${notice}

## Purpose

${page.purpose}

## Scope and boundaries

${renderList(page.scope)}

## Required structure

${page.sections.map((section, index) => `### ${index + 1}. ${section}\n\n**Milestone-built.** Record the approved standard, accountable owner, source, evidence, exceptions, and applicable site scope here.`).join('\n\n')}

## Minimum governance record

| Field | Requirement |
|---|---|
| Accountable owner | Exactly one owner for the current approved version |
| Reviewers | Named domain, clinical, legal, evidence, platform, or client reviewers as applicable |
| Source and rationale | Traceable source plus why the decision applies |
| Version and effective date | Exact approved version and date |
| Site scope | Global baseline, block-specific module, or named-site adaptation |
| Entry gate | Conditions required before this procedure applies |
| Exit evidence | Evidence that proves completion or readiness |
| Exceptions | Open exception, owner, disposition, and deadline in Mission Control |
| System of record | Wiki for durable procedure; Supabase for canonical application data; Mission Control for current work and evidence |

## Promotion rule

This page remains internal draft until its required sections are completed, applicable reviewers approve the exact version, unresolved exceptions are visible, and verification evidence is linked. Draft structure is not proof of operational readiness.

## Related Pages

${page.related.map((title) => `- [[${title}]]`).join('\n')}
`;

const definitions = [
  {
    sectionSlug: 'client-delivery-system',
    slug: 'commercial-product-pack-architecture',
    title: 'Commercial Product and Pack Architecture',
    summary: 'Locked modular, land-and-expand product model connecting Block Ops intellectual property, client packs, platform access, metrics, implementation, and premium growth paths.',
    owner: 'Samir',
    primaryPillar: 'Implementation Bundles',
    secondaryPillars: ['Digital Platform', 'Stakeholder Integration', 'Value Intelligence', 'Human Capital', 'Physical Operations'],
    purpose: 'Define how Block Ops can sell a focused client solution or a complete regional-anesthesia program while keeping every purchase inside one measurable, extensible operating platform.',
    scope: ['The Foundation Library is Block Ops’ complete approved source of universal standards and intellectual property; it is not an all-or-nothing client purchase.', 'Every client receives a small Platform and Safety Core plus the Capability Packs, Block Packs, and Premium Modules they purchase.', 'The Platform and Safety Core includes secure Dashboard access, site/user configuration, purchased-pack controls, approved-final/version controls, update notices, pack KPI reporting, implementation/support status, minimum site/scope assessment, applicable safety/escalation boundaries, material recommendation/declination records, and appropriate data/privacy/legal/clinical disclaimers.', 'Every pack follows one Universal Pack Contract: defined scope, approved deliverables, implementation pathway, two to three KPIs, Dashboard experience, recurring service, governance/evidence, and an expansion map.', 'Implementation Bundles are the site-specific deployment method rather than a clinical product category.', 'Value Intelligence is both a shared measurement layer and an advanced purchasable analytics, interpretation, financial-modeling, and advisory function.', 'Only the architecture, Universal Pack Contract, and initial Platform and Safety Core above are locked; final pack names, contents, KPI definitions, collection methods, recurring-service terms, agent boundaries, and Mixed Reality packaging remain milestone-built decisions.'],
    sections: ['Locked product-layer definitions', 'Universal Pack Contract', 'Capability Pack catalog and boundaries', 'Block Pack catalog and inheritance rules', 'Platform and Safety Core', 'Implementation Bundle delivery model', 'Two-to-three-KPI contract for every pack', 'Value Intelligence shared and premium functions', 'Client portal progressive-disclosure and expansion model', 'Premium Module roadmap', 'Open architecture decisions and M2 completion evidence'],
    related: ['Foundation Implementation Bundle Manifest and Completion Standard', 'Measurement Framework and Minimum Dataset', 'KPI Dictionary and Data Ownership', 'Client Portal', 'Implementation Bundle Delivery', 'Foundational Client Readiness and Completion Matrix'],
  },
  {
    sectionSlug: 'client-delivery-system',
    slug: 'foundational-client-readiness-completion-matrix',
    title: 'Foundational Client Readiness and Completion Matrix',
    summary: 'Lifecycle control matrix connecting foundational-client entry gates, owners, evidence, exceptions, and completion standards.',
    owner: 'Samir',
    primaryPillar: 'Human Capital',
    secondaryPillars: ['Physical Operations', 'Digital Platform', 'Stakeholder Integration', 'Value Intelligence', 'Implementation Bundles'],
    purpose: 'Define the end-to-end control structure for deciding when Block Ops is ready to begin, advance, stabilize, and complete a foundational-client engagement without confusing milestone intent with verified readiness.',
    scope: ['Covers authorization through closeout and operating-memory capture.', 'Does not declare M2 or M4 complete; Mission Control evidence controls status.', 'Timing and evidence may be site- or agreement-specific until universal standards are approved.'],
    sections: ['Lifecycle stages and accountable owners', 'Entry gates by stage', 'Required evidence and systems of record', 'Cross-pillar readiness checks', 'Exception and escalation authority', 'Client acceptance and closeout criteria', 'M2 readiness evidence', 'M4 completion evidence'],
    related: ['Client Onboarding', 'Site Readiness Assessment', 'Implementation Bundle Delivery', 'Training Day Readiness', 'Go-Live Verification', 'Recurring Client Support'],
  },
  {
    sectionSlug: 'client-delivery-system', slug: 'site-readiness-assessment', title: 'Site Readiness Assessment',
    summary: 'Governed assessment structure for physical, stakeholder, platform, training, compliance, and implementation readiness at a client site.', owner: 'Samir',
    primaryPillar: 'Physical Operations', secondaryPillars: ['Human Capital', 'Digital Platform', 'Stakeholder Integration', 'Value Intelligence', 'Implementation Bundles'],
    purpose: 'Create a repeatable assessment record that identifies what is ready, what is unknown, what is blocked, and who owns resolution before implementation or go-live.',
    scope: ['Assessment informs decisions but does not replace site clinical governance, credentialing, legal review, or safety approval.', 'Site findings must not mutate the universal baseline without governed review.', 'Unknown is an allowed result and must not be silently scored as ready.'],
    sections: ['Site profile and implementation scope', 'Stakeholders and decision authority', 'Current workflow and case environment', 'Physical space, scheduling, and patient flow', 'Equipment, ultrasound, carts, and supplies', 'Cleaning, infection control, storage, and restocking', 'Platform access, security, and data readiness', 'Training and competency-readiness inputs', 'Compliance, legal, and clinical-governance gates', 'Findings, blockers, owners, and readiness recommendation'],
    related: ['Foundational Client Readiness and Completion Matrix', 'Equipment, Cart, Supply, and Restocking Standard', 'Client Onboarding', 'Training Day Readiness', 'Go-Live Verification'],
  },
  {
    sectionSlug: 'client-delivery-system', slug: 'foundation-implementation-bundle-manifest-completion-standard', title: 'Foundation Implementation Bundle Manifest and Completion Standard',
    summary: 'Canonical manifest and completion framework for the complete Foundation Library and its controlled use in modular client products.', owner: 'Samir',
    primaryPillar: 'Implementation Bundles', secondaryPillars: ['Physical Operations', 'Human Capital', 'Digital Platform', 'Stakeholder Integration', 'Value Intelligence'],
    purpose: 'Define what belongs in the complete Foundation Library and what evidence proves each component is complete, reviewed, approved, and ready to be assembled into modular client solutions.',
    scope: ['The Foundation Library is the complete approved source of universal standards and intellectual property, not a mandatory all-or-nothing client package.', 'Client solutions combine the Platform and Safety Core with purchased Capability Packs, Block Packs, and Premium Modules.', 'Block-specific modules and site adaptations remain separately identified.', 'A listed artifact is not complete until its required evidence and review gates are satisfied.'],
    sections: ['Foundation Library component manifest', 'Platform and Safety Core classification', 'Capability Pack assignment', 'Block Pack inheritance and reuse', 'Internal-only and premium classification', 'Required artifact and representation types', 'Owner and reviewer matrix', 'Global, block-specific, and site-specific boundaries', 'Version and source requirements', 'Completion evidence by component', 'Client-safe derivative rules', 'Open gaps and milestone build sequence'],
    related: ['Commercial Product and Pack Architecture', 'Implementation Bundles', 'Implementation Bundle Delivery', 'Controlled Implementation Bundle Release and Versioning', 'Foundational Client Readiness and Completion Matrix', 'Clinical / Block Program Knowledge Index'],
  },
  {
    sectionSlug: 'proof-metrics-value', slug: 'measurement-framework-minimum-dataset', title: 'Measurement Framework and Minimum Dataset',
    summary: 'Governed structure for approved measures, minimum data collection, provenance, interpretation, and site-specific constraints.', owner: 'Samir',
    primaryPillar: 'Value Intelligence', secondaryPillars: ['Digital Platform', 'Stakeholder Integration', 'Physical Operations', 'Implementation Bundles'],
    purpose: 'Define the smallest defensible data structure needed to understand implementation activity and value without inventing automated collection, clinical outcomes, ROI, or universal reporting commitments.',
    scope: ['Every minimum purchasable pack must define two to three meaningful client-visible KPIs, generally spanning adoption, performance, and value without forcing artificial measures.', 'At least one core KPI must measure performance or value rather than activity alone.', 'Measures must have approved definitions, purpose, source, owner, and limitations.', 'PHI and sensitive data follow approved privacy, security, and site controls.', 'Unavailable or low-quality data must be shown as unknown rather than inferred.'],
    sections: ['Measurement objectives and audiences', 'Pack-level two-to-three-KPI contract', 'Core versus configured KPIs', 'Universal minimum dataset', 'Site- and agreement-specific additions', 'Data sources and collection methods', 'Data ownership and access', 'Baseline and comparison periods', 'Quality checks and missing-data handling', 'Interpretation boundaries', 'Reporting cadence and representation approval', 'Value Intelligence expansion path', 'Milestone validation plan'],
    related: ['KPI Dictionary and Data Ownership', 'Evidence and Claims Governance', 'Dashboard', 'Client Health and Retention', 'Foundational Client Readiness and Completion Matrix'],
  },
  {
    sectionSlug: 'client-delivery-system', slug: 'equipment-cart-supply-restocking-standard', title: 'Equipment, Cart, Supply, and Restocking Standard',
    summary: 'Governed physical-operations scaffold for equipment readiness, cart configuration, par levels, ownership, and replenishment.', owner: 'Samir',
    primaryPillar: 'Physical Operations', secondaryPillars: ['Implementation Bundles', 'Human Capital', 'Stakeholder Integration', 'Value Intelligence'],
    purpose: 'Establish a site-adaptable physical readiness structure for required equipment, ultrasound access, carts, supplies, storage, inspection, and replenishment.',
    scope: ['Does not prescribe clinical use, medication selection, dose, sterility standard, or site purchasing terms.', 'Qualified reviewers and site policy control clinical, infection-control, medication, and regulatory details.', 'Par levels and ownership may vary by site and service scope.'],
    sections: ['Equipment categories and readiness states', 'Ultrasound access and verification', 'Cart or storage planogram', 'Supply categories and approved substitutions', 'Par-level method', 'Restocking trigger and accountable owner', 'Inspection, expiration, and exception handling', 'Cleaning and storage interfaces', 'Site configuration record', 'Readiness evidence before training and go-live'],
    related: ['Site Readiness Assessment', 'Foundation Implementation Bundle Manifest and Completion Standard', 'Training Day Readiness', 'Go-Live Verification', 'Compliance / Risk Controls'],
  },
  {
    sectionSlug: 'proof-metrics-value', slug: 'kpi-dictionary-data-ownership', title: 'KPI Dictionary and Data Ownership',
    summary: 'Canonical definitions, provenance, ownership, calculation boundaries, and approval state for Block Ops measures and KPIs.', owner: 'Samir',
    primaryPillar: 'Value Intelligence', secondaryPillars: ['Digital Platform', 'Human Capital', 'Stakeholder Integration'],
    purpose: 'Prevent inconsistent metric language by giving every approved KPI one definition, owner, source, calculation rule, quality status, audience, and interpretation boundary.',
    scope: ['A proposed metric is not an approved KPI.', 'No calculation or automated dashboard capability is implied until technically verified.', 'Clinical, financial, reimbursement, quality, and outcome measures require applicable qualified review.'],
    sections: ['Metric register', 'Business purpose and decision use', 'Exact definition and unit', 'Numerator, denominator, and exclusions', 'Source system and provenance', 'Data owner and steward', 'Calculation and refresh method', 'Quality thresholds and exception handling', 'Approved audiences and representations', 'Change history and retirement rules'],
    related: ['Measurement Framework and Minimum Dataset', 'Evidence and Claims Governance', 'Dashboard', 'Supabase Data Model', 'Client Health and Retention'],
  },
  {
    sectionSlug: 'proof-metrics-value', slug: 'evidence-claims-governance', title: 'Evidence and Claims Governance',
    summary: 'Controlled process for sourcing, reviewing, approving, using, updating, and retiring evidence-backed claims.', owner: 'Samir',
    primaryPillar: 'Value Intelligence', secondaryPillars: ['Human Capital', 'Stakeholder Integration', 'Implementation Bundles', 'Digital Platform'],
    purpose: 'Create a single governed path from source evidence to an approved claim while preserving limitations, audience, representation, and review requirements.',
    scope: ['Indexing or drafting does not approve a claim.', 'Exact wording and representation—not only the source—require approval.', 'Legal, clinical, billing, compliance, and client review remain applicable by claim type and use.'],
    sections: ['Evidence source register', 'Claim proposal and intended use', 'Evidence quality and applicability review', 'Limitations and prohibited inference', 'Required reviewer matrix', 'Exact-language approval', 'Audience and representation scope', 'Release and audit evidence', 'Monitoring, update, and withdrawal', 'Negative knowledge and rejected claims'],
    related: ['Measurement Framework and Minimum Dataset', 'KPI Dictionary and Data Ownership', 'Legal Review Index', 'Compliance / Risk Controls', 'Sales Materials and Scripts', 'Proposal Workflow'],
  },
  {
    sectionSlug: 'client-delivery-system', slug: 'controlled-implementation-bundle-release-versioning', title: 'Controlled Implementation Bundle Release and Versioning',
    summary: 'Governed release, version, site-scope, update, rollback, and audit structure for implementation bundles.', owner: 'Samir',
    primaryPillar: 'Implementation Bundles', secondaryPillars: ['Digital Platform', 'Human Capital', 'Physical Operations', 'Stakeholder Integration', 'Value Intelligence'],
    purpose: 'Define how an implementation bundle moves from draft through review, exact-version approval, site configuration, controlled release, update, and retirement without mutating global standards or exposing drafts.',
    scope: ['Separates universal baseline, block-specific module, and site-specific adaptation.', 'Client access requires approved-final content and exact-site scope.', 'Rollback and withdrawal requirements must be verified before relying on them operationally.'],
    sections: ['Bundle identity and scope', 'Representation inventory', 'Version and provenance model', 'Required review gates', 'Site configuration and inheritance', 'Release authorization and evidence', 'Notification and training impact', 'Update and change-control workflow', 'Rollback, withdrawal, and supersession', 'Audit trail and periodic review'],
    related: ['Foundation Implementation Bundle Manifest and Completion Standard', 'Implementation Bundles', 'Implementation Bundle Delivery', 'Supabase Data Model', 'Client Portal', 'Backup and Continuity'],
  },
];

export const FOUNDATIONAL_STRUCTURE_PAGES = Object.freeze(definitions.map((page) => Object.freeze({
  ...page,
  status: 'draft',
  source: `Foundational Wiki structure build ${FOUNDATIONAL_STRUCTURE_VERSION}`,
  bodyMd: renderPage(page),
})));
