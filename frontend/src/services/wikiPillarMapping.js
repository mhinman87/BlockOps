export const WIKI_PILLARS = Object.freeze([
  'Physical Operations',
  'Digital Platform',
  'Human Capital',
  'Stakeholder Integration',
  'Value Intelligence',
  'Implementation Bundles',
]);

const mapping = {
  'Acquisition / Growth Strategy': ['Stakeholder Integration', ['Digital Platform', 'Value Intelligence']],
  'Backup and Continuity': ['Digital Platform', ['Value Intelligence', 'Human Capital']],
  'Block Ops Mission': ['Human Capital', ['Physical Operations', 'Digital Platform', 'Implementation Bundles']],
  'Block Ops Operating System': ['Digital Platform', ['Human Capital']],
  'Block Ops Positioning and Core Story': ['Stakeholder Integration', ['Physical Operations', 'Human Capital', 'Value Intelligence']],
  'Block Ops Vision': ['Human Capital', ['Physical Operations', 'Digital Platform', 'Implementation Bundles', 'Value Intelligence']],
  'Block Ops Wiki / Compendium': ['Digital Platform', ['Human Capital']],
  'Block Ops Wiki Client-Facing Candidate Register': ['Stakeholder Integration', ['Digital Platform', 'Human Capital', 'Value Intelligence']],
  'Block Ops Wiki Content Migration': ['Digital Platform', ['Human Capital', 'Value Intelligence']],
  'Block Ops Wiki Go-Live Readiness Matrix': ['Human Capital', ['Digital Platform', 'Value Intelligence']],
  'Block Ops Wiki Six-Pillar Page Map': ['Digital Platform', ['Human Capital']],
  'Client Communication Log': ['Stakeholder Integration', ['Digital Platform']],
  'Client Health and Retention': ['Stakeholder Integration', ['Value Intelligence', 'Digital Platform', 'Human Capital']],
  'Client Onboarding': ['Stakeholder Integration', ['Digital Platform', 'Implementation Bundles', 'Human Capital']],
  'Client Offboarding and Access Closure': ['Stakeholder Integration', ['Digital Platform', 'Value Intelligence', 'Human Capital']],
  'Commercial Product and Pack Architecture': ['Implementation Bundles', ['Digital Platform', 'Stakeholder Integration', 'Value Intelligence', 'Human Capital', 'Physical Operations']],
  'Controlled Implementation Bundle Release and Versioning': ['Implementation Bundles', ['Digital Platform', 'Human Capital', 'Physical Operations', 'Stakeholder Integration', 'Value Intelligence']],
  'Client Portal': ['Digital Platform', ['Stakeholder Integration', 'Implementation Bundles']],
  'Client Touchpoint Naming Taxonomy': ['Stakeholder Integration', ['Digital Platform', 'Human Capital']],
  'Clinical / Block Program Knowledge Index': ['Implementation Bundles', ['Physical Operations', 'Human Capital', 'Stakeholder Integration', 'Value Intelligence']],
  'Compliance / Risk Controls': ['Value Intelligence', ['Human Capital', 'Digital Platform']],
  'CRM Pipeline Stages': ['Digital Platform', ['Stakeholder Integration']],
  Dashboard: ['Digital Platform', ['Human Capital', 'Value Intelligence']],
  'Decision Capture': ['Human Capital', ['Digital Platform', 'Value Intelligence']],
  'Decision Log / Historical Archive': ['Human Capital', ['Digital Platform', 'Value Intelligence']],
  'Design Handoff Process': ['Digital Platform', ['Human Capital']],
  'Digital Platform Overview': ['Digital Platform', ['Stakeholder Integration', 'Value Intelligence']],
  'Equipment, Cart, Supply, and Restocking Standard': ['Physical Operations', ['Implementation Bundles', 'Human Capital', 'Stakeholder Integration', 'Value Intelligence']],
  'Evidence and Claims Governance': ['Value Intelligence', ['Human Capital', 'Stakeholder Integration', 'Implementation Bundles', 'Digital Platform']],
  'Foundation Implementation Bundle Manifest and Completion Standard': ['Implementation Bundles', ['Physical Operations', 'Human Capital', 'Digital Platform', 'Stakeholder Integration', 'Value Intelligence']],
  'Foundational Client Readiness and Completion Matrix': ['Human Capital', ['Physical Operations', 'Digital Platform', 'Stakeholder Integration', 'Value Intelligence', 'Implementation Bundles']],
  'Go-Live Verification': ['Physical Operations', ['Human Capital', 'Digital Platform', 'Stakeholder Integration', 'Value Intelligence', 'Implementation Bundles']],
  'Implementation Bundle Delivery': ['Implementation Bundles', ['Physical Operations', 'Human Capital', 'Stakeholder Integration', 'Value Intelligence', 'Digital Platform']],
  'Implementation Bundles': ['Implementation Bundles', ['Physical Operations', 'Human Capital', 'Stakeholder Integration', 'Value Intelligence']],
  'Lead Capture': ['Stakeholder Integration', ['Digital Platform']],
  'Launch History — M1 through M5': ['Human Capital', ['Digital Platform', 'Value Intelligence']],
  'Legal Review Index': ['Value Intelligence', ['Human Capital', 'Stakeholder Integration']],
  'KPI Dictionary and Data Ownership': ['Value Intelligence', ['Digital Platform', 'Human Capital', 'Stakeholder Integration']],
  'M2 Modular Pillar Offering Strategy': ['Implementation Bundles', ['Value Intelligence', 'Stakeholder Integration']],
  'M2 Phone Line Lead Capture': ['Stakeholder Integration', ['Digital Platform']],
  'Mission Control': ['Digital Platform', ['Human Capital']],
  'Mission Control Rules': ['Digital Platform', ['Human Capital']],
  'Measurement Framework and Minimum Dataset': ['Value Intelligence', ['Digital Platform', 'Stakeholder Integration', 'Physical Operations', 'Implementation Bundles']],
  'Outreach Sequence': ['Stakeholder Integration', ['Digital Platform']],
  'Payer Intelligence and Documentation Guidance Platform': ['Value Intelligence', ['Digital Platform', 'Stakeholder Integration', 'Implementation Bundles']],
  'Pillar Model / Gold Standard Tree': ['Human Capital', ['Digital Platform', 'Implementation Bundles']],
  'Proposal Workflow': ['Stakeholder Integration', ['Value Intelligence', 'Implementation Bundles']],
  'Preoperative Patient Education and Experience Platform': ['Stakeholder Integration', ['Digital Platform', 'Value Intelligence', 'Human Capital', 'Implementation Bundles']],
  'Qualification and Discovery': ['Stakeholder Integration', ['Value Intelligence', 'Physical Operations']],
  'Recurring Client Support': ['Stakeholder Integration', ['Value Intelligence', 'Digital Platform', 'Human Capital', 'Implementation Bundles']],
  'Renewal and Expansion': ['Stakeholder Integration', ['Value Intelligence', 'Implementation Bundles']],
  'Roles and Ownership': ['Human Capital', ['Digital Platform']],
  'Sales Materials and Scripts': ['Stakeholder Integration', ['Implementation Bundles', 'Value Intelligence']],
  'Site Readiness Assessment': ['Physical Operations', ['Human Capital', 'Digital Platform', 'Stakeholder Integration', 'Value Intelligence', 'Implementation Bundles']],
  'Status Rules': ['Human Capital', ['Digital Platform', 'Value Intelligence']],
  'Supabase Data Model': ['Digital Platform', ['Value Intelligence']],
  'Training Day Readiness': ['Human Capital', ['Physical Operations', 'Stakeholder Integration', 'Implementation Bundles', 'Value Intelligence']],
  'Weekly Ops Review': ['Human Capital', ['Digital Platform', 'Value Intelligence']],
  'Wiki Cross-Linking Map': ['Digital Platform', ['Human Capital']],
};

export const WIKI_PILLAR_MAP = Object.freeze(Object.fromEntries(
  Object.entries(mapping).map(([title, [primaryPillar, secondaryPillars]]) => [
    title,
    Object.freeze({
      primaryPillar,
      secondaryPillars: Object.freeze([...secondaryPillars]),
    }),
  ]),
));

export const getWikiPillarMetadata = (title) => WIKI_PILLAR_MAP[title] || null;

export const attachWikiPillarMetadata = (item) => {
  const metadata = getWikiPillarMetadata(item?.title);
  if (!metadata) {
    throw new Error(`Wiki page is missing six-pillar metadata: ${item?.title || '(untitled)'}`);
  }

  return {
    ...item,
    primaryPillar: metadata.primaryPillar,
    secondaryPillars: [...metadata.secondaryPillars],
  };
};
