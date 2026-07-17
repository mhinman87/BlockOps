import { normalizeLegacyWikiBucket, WIKI_PROMOTION_STATES } from './wikiGovernance.js';
import { WIKI_PILLAR_MAP } from './wikiPillarMapping.js';

export const WIKI_HUBS = Object.freeze({
  'Sales / Outreach Index': 'Acquisition / Growth Strategy',
  'Mission Control Index': 'Mission Control',
  'Client Portal Index': 'Client Portal',
  'Wiki Governance Index': 'Block Ops Wiki / Compendium',
  'Implementation Bundle Index': 'Implementation Bundles',
  'M1 Index': 'Go-Live Verification',
});

const EXPLICIT_LINKS = Object.freeze({
  'Lead Capture': ['Outreach Sequence', 'CRM Pipeline Stages', 'Client Communication Log', 'Acquisition / Growth Strategy'],
  'Outreach Sequence': ['Lead Capture', 'CRM Pipeline Stages', 'Client Communication Log', 'Qualification and Discovery'],
  'CRM Pipeline Stages': ['Lead Capture', 'Outreach Sequence', 'Client Communication Log', 'Qualification and Discovery'],
  'Client Communication Log': ['Lead Capture', 'Outreach Sequence', 'CRM Pipeline Stages'],
  'Client Health and Retention': ['Recurring Client Support', 'Dashboard', 'Status Rules', 'Compliance / Risk Controls', 'Client Offboarding and Access Closure'],
  'Qualification and Discovery': ['CRM Pipeline Stages', 'Proposal Workflow', 'Client Communication Log'],
  'Proposal Workflow': ['Qualification and Discovery', 'Sales Materials and Scripts', 'Implementation Bundles', 'Renewal and Expansion'],
  'Acquisition / Growth Strategy': ['Lead Capture', 'Outreach Sequence', 'CRM Pipeline Stages', 'Sales Materials and Scripts'],
  'Mission Control': ['Status Rules', 'Roles and Ownership', 'Block Ops Operating System', 'Mission Control Rules', 'Wiki Cross-Linking Map'],
  'Mission Control Rules': ['Mission Control', 'Status Rules', 'Roles and Ownership'],
  'Status Rules': ['Mission Control', 'Mission Control Rules', 'Block Ops Wiki Go-Live Readiness Matrix'],
  'Roles and Ownership': ['Mission Control', 'Status Rules', 'Weekly Ops Review'],
  'Weekly Ops Review': ['Mission Control', 'Decision Capture', 'Status Rules'],
  'Decision Capture': ['Mission Control', 'Decision Log / Historical Archive', 'Ideas and Explorations', 'Weekly Ops Review'],
  'Ideas and Explorations': ['Decision Capture', 'Design Handoff Process', 'Decision Log / Historical Archive', 'Mission Control', 'Status Rules'],
  'Client Portal': ['Dashboard', 'Final Review / Approvals', 'Client-Facing Leak Audit', 'Block Ops Wiki Go-Live Readiness Matrix'],
  Dashboard: ['Client Portal', 'Digital Platform Overview', 'Supabase Data Model'],
  'Digital Platform Overview': ['Client Portal', 'Dashboard', 'Supabase Data Model', 'Backup and Continuity'],
  'Implementation Bundles': ['Implementation Bundle Delivery', 'Clinical / Block Program Knowledge Index', 'Pillar Model / Gold Standard Tree', 'M2 Modular Pillar Offering Strategy', 'Commercial Product and Pack Architecture'],
  'Commercial Product and Pack Architecture': ['Implementation Bundles', 'M2 Modular Pillar Offering Strategy', 'Preoperative Patient Education and Experience Platform', 'Payer Intelligence and Documentation Guidance Platform'],
  'Preoperative Patient Education and Experience Platform': ['Commercial Product and Pack Architecture', 'Client Portal', 'Dashboard', 'Measurement Framework and Minimum Dataset'],
  'Payer Intelligence and Documentation Guidance Platform': ['Commercial Product and Pack Architecture', 'Evidence and Claims Governance', 'Compliance / Risk Controls', 'Proposal Workflow'],
  'Implementation Bundle Delivery': ['Client Onboarding', 'Training Day Readiness', 'Go-Live Verification', 'Implementation Bundles'],
  'Client Onboarding': ['Client Portal', 'Implementation Bundle Delivery', 'Training Day Readiness'],
  'Client Offboarding and Access Closure': ['Client Portal', 'Supabase Data Model', 'Legal Review Index', 'Compliance / Risk Controls', 'Decision Log / Historical Archive'],
  'Training Day Readiness': ['Implementation Bundle Delivery', 'Go-Live Verification', 'Clinical / Block Program Knowledge Index'],
  'Go-Live Verification': ['Client Onboarding', 'Implementation Bundle Delivery', 'Mission Control', 'M1 Mock Client Lead-to-Live Workflow'],
  'Launch History — M1 through M5': ['Block Ops Operating System', 'Mission Control', 'Decision Log / Historical Archive', 'Go-Live Verification'],
  'Recurring Client Support': ['Go-Live Verification', 'Client Health and Retention', 'Implementation Bundle Delivery', 'Dashboard', 'Compliance / Risk Controls'],
  'Renewal and Expansion': ['Proposal Workflow', 'Acquisition / Growth Strategy', 'Implementation Bundles', 'Recurring Client Support', 'Client Health and Retention'],
  'Block Ops Wiki / Compendium': ['Wiki Cross-Linking Map', 'Block Ops Wiki Go-Live Readiness Matrix', 'Block Ops Wiki Six-Pillar Page Map', 'Block Ops Wiki Content Migration'],
  'Wiki Cross-Linking Map': ['Block Ops Wiki / Compendium', 'Block Ops Wiki Go-Live Readiness Matrix', 'Block Ops Wiki Six-Pillar Page Map'],
  'Block Ops Wiki Go-Live Readiness Matrix': ['Block Ops Wiki / Compendium', 'Block Ops Wiki Client-Facing Candidate Register', 'Compliance / Risk Controls'],
  'Block Ops Wiki Six-Pillar Page Map': ['Pillar Model / Gold Standard Tree', 'Block Ops Wiki / Compendium', 'Wiki Cross-Linking Map'],
  'Block Ops Wiki Client-Facing Candidate Register': ['Block Ops Wiki Go-Live Readiness Matrix', 'Client-Facing Leak Audit', 'Final Review / Approvals'],
  'Compliance / Risk Controls': ['Legal Review Index', 'Block Ops Wiki Go-Live Readiness Matrix', 'Backup and Continuity'],
  'Legal Review Index': ['Compliance / Risk Controls', 'Final Review / Approvals'],
  'Foundational Client Readiness and Completion Matrix': ['Client Onboarding', 'Site Readiness Assessment', 'Implementation Bundle Delivery', 'Training Day Readiness', 'Go-Live Verification', 'Recurring Client Support'],
  'Site Readiness Assessment': ['Foundational Client Readiness and Completion Matrix', 'Equipment, Cart, Supply, and Restocking Standard', 'Client Onboarding', 'Training Day Readiness', 'Go-Live Verification'],
  'Foundation Implementation Bundle Manifest and Completion Standard': ['Implementation Bundles', 'Implementation Bundle Delivery', 'Controlled Implementation Bundle Release and Versioning', 'Foundational Client Readiness and Completion Matrix'],
  'Measurement Framework and Minimum Dataset': ['KPI Dictionary and Data Ownership', 'Evidence and Claims Governance', 'Dashboard', 'Client Health and Retention'],
  'Equipment, Cart, Supply, and Restocking Standard': ['Site Readiness Assessment', 'Foundation Implementation Bundle Manifest and Completion Standard', 'Training Day Readiness', 'Go-Live Verification'],
  'KPI Dictionary and Data Ownership': ['Measurement Framework and Minimum Dataset', 'Evidence and Claims Governance', 'Dashboard', 'Supabase Data Model'],
  'Evidence and Claims Governance': ['Measurement Framework and Minimum Dataset', 'KPI Dictionary and Data Ownership', 'Legal Review Index', 'Compliance / Risk Controls', 'Proposal Workflow'],
  'Controlled Implementation Bundle Release and Versioning': ['Foundation Implementation Bundle Manifest and Completion Standard', 'Implementation Bundles', 'Implementation Bundle Delivery', 'Supabase Data Model', 'Client Portal'],
});

const PILLAR_HUBS = Object.freeze({
  'Physical Operations': 'Go-Live Verification',
  'Digital Platform': 'Digital Platform Overview',
  'Human Capital': 'Roles and Ownership',
  'Stakeholder Integration': 'Acquisition / Growth Strategy',
  'Value Intelligence': 'Compliance / Risk Controls',
  'Implementation Bundles': 'Implementation Bundles',
});

const unique = (values) => [...new Set(values.filter(Boolean))];
const normalize = (value) => String(value || '').trim().toLowerCase();

const WIKI_TITLE_ALIASES = Object.freeze({
  'Pillar Model - Gold Standard Tree': 'Pillar Model / Gold Standard Tree',
  'Client Portal Rules': 'Client Portal',
  'Clinical - Block Program Knowledge Index': 'Clinical / Block Program Knowledge Index',
  'Compliance - Risk Controls': 'Compliance / Risk Controls',
  'Decision Log - Historical Archive': 'Decision Log / Historical Archive',
  'Block Ops Wiki - Compendium': 'Block Ops Wiki / Compendium',
  'Block Ops Wiki Content Migration Plan': 'Block Ops Wiki Content Migration',
});

export const buildWikiRelatedPageMap = (titles = Object.keys(WIKI_PILLAR_MAP)) => {
  const available = new Set(titles);
  const fallback = titles[0] || null;
  return Object.freeze(Object.fromEntries(titles.map((title, index) => {
    const pillarHub = PILLAR_HUBS[WIKI_PILLAR_MAP[title]?.primaryPillar];
    const nextTitle = titles.length > 1 ? titles[(index + 1) % titles.length] : null;
    const candidates = unique([
      ...(EXPLICIT_LINKS[title] || []),
      pillarHub,
      WIKI_HUBS['Wiki Governance Index'],
      nextTitle,
      fallback,
    ]).filter((target) => target !== title && available.has(target));
    return [title, Object.freeze(candidates.slice(0, 6))];
  })));
};

export const WIKI_RELATED_PAGE_MAP = buildWikiRelatedPageMap();

export const getWikiRelatedPageTitles = (title, availableTitles) => {
  const map = availableTitles ? buildWikiRelatedPageMap(availableTitles) : WIKI_RELATED_PAGE_MAP;
  return map[title] || [];
};

export const wikiHref = (title) => `wiki:${encodeURIComponent(title)}`;

export const parseWikiHref = (href) => {
  if (!String(href || '').startsWith('wiki:')) return null;
  try {
    return decodeURIComponent(String(href).slice(5));
  } catch {
    return null;
  }
};

export const prepareWikiMarkdown = (content = '', availableTitles = null) => String(content).replace(
  /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
  (_match, title, label) => {
    const rawTitle = String(title).trim();
    const target = WIKI_TITLE_ALIASES[rawTitle] || rawTitle;
    const linkLabel = String(label || rawTitle).trim();
    if (availableTitles && !availableTitles.has(target)) return linkLabel;
    return `[${linkLabel}](${wikiHref(target)})`;
  },
);

const clientSafe = (item) => {
  const rawState = item?.publishBucket || item?.status;
  const state = rawState === WIKI_PROMOTION_STATES.CLIENT_FACING_FINAL
    ? rawState
    : normalizeLegacyWikiBucket(rawState);
  return state === WIKI_PROMOTION_STATES.CLIENT_FACING_FINAL
    && normalize(item?.visibility || item?.workspaceVisibility) === 'client-visible';
};

export const canTraverseWikiLink = ({ source, target, isTeam }) => {
  if (!source || !target) return false;
  if (isTeam) return true;
  return clientSafe(source) && clientSafe(target);
};

export const enrichWikiItemsWithLinks = (items = []) => {
  const byTitle = new Map(items.map((item) => [item.title, item]));
  const titles = [...byTitle.keys()];
  const availableTitles = new Set(titles);
  const relatedMap = buildWikiRelatedPageMap(titles);
  return items.map((item) => {
    const relatedPageTitles = relatedMap[item.title] || [];
    const relatedBlock = relatedPageTitles.length
      ? `\n\n## Related Pages\n\n${relatedPageTitles.map((title) => `- [[${title}]]`).join('\n')}\n`
      : '';
    const hasRelatedBlock = /(^|\n)## Related Pages\b/.test(item.content || '');
    return {
      ...item,
      relatedPageTitles,
      hubNames: Object.entries(WIKI_HUBS)
        .filter(([, target]) => target === item.title)
        .map(([name]) => name),
      content: prepareWikiMarkdown(`${item.content || ''}${hasRelatedBlock ? '' : relatedBlock}`, availableTitles),
    };
  });
};

export const runWikiLinkQa = ({ items = [], governedTitles = Object.keys(WIKI_PILLAR_MAP) } = {}) => {
  const governed = new Set(governedTitles);
  const map = buildWikiRelatedPageMap(governedTitles);
  const brokenLinks = [];
  const pagesWithNoOutboundLinks = [];
  const inbound = new Map(governedTitles.map((title) => [title, 0]));
  for (const title of governedTitles) {
    const links = map[title] || [];
    if (!links.length) pagesWithNoOutboundLinks.push(title);
    for (const target of links) {
      if (!governed.has(target)) brokenLinks.push({ source: title, target });
      else inbound.set(target, (inbound.get(target) || 0) + 1);
    }
  }
  const orphanPages = governedTitles.filter((title) => (inbound.get(title) || 0) === 0);
  const clientLeakPaths = [];
  for (const source of items) {
    for (const targetTitle of map[source.title] || []) {
      const target = items.find((item) => item.title === targetTitle);
      if (source && target && clientSafe(source) && !clientSafe(target)) {
        clientLeakPaths.push({ source: source.title, target: targetTitle });
      }
    }
  }
  return {
    passed: brokenLinks.length === 0 && orphanPages.length === 0
      && pagesWithNoOutboundLinks.length === 0 && clientLeakPaths.length === 0,
    counts: {
      governedPages: governedTitles.length,
      links: Object.values(map).reduce((sum, links) => sum + links.length, 0),
      hubs: Object.keys(WIKI_HUBS).length,
    },
    failures: { brokenLinks, orphanPages, pagesWithNoOutboundLinks, clientLeakPaths },
  };
};
