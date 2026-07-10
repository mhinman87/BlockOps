import { filterVisibleLibraryItems } from './contentVisibility.js';
import { CANONICAL_LAUNCH_TASKS } from './launchOpsCanonicalSeed.js';
import { getPrimaryWikiPageTitle } from './missionControlWikiLinks.js';
import { normalizeLegacyWikiBucket, WIKI_PROMOTION_STATES } from './wikiGovernance.js';
import { WIKI_LIBRARY_ITEMS } from './wikiLibraryItems.js';
import { WIKI_PILLAR_MAP } from './wikiPillarMapping.js';

const normalize = (value) => String(value || '').trim().toLowerCase();
const GOVERNED_WIKI_PAGE_TITLES = new Set(Object.keys(WIKI_PILLAR_MAP));

export const searchInternalWikiItems = (items, query) => {
  const needle = normalize(query);
  if (!needle) return items || [];
  return (items || []).filter((item) => [
    item.title,
    item.description,
    ...(item.tags || []),
    item.content,
  ].some((value) => normalize(value).includes(needle)));
};

export const runWikiBuildoutAcceptance = ({
  wikiItems = WIKI_LIBRARY_ITEMS,
  canonicalTasks = CANONICAL_LAUNCH_TASKS,
  liveWikiPageCount,
  liveM1TaskCount,
  liveCorrectWikiLinkCount,
} = {}) => {
  const wikiTasks = canonicalTasks.filter((task) => /^M1-WIKI-\d+$/.test(task.taskKey));
  const m1Tasks = canonicalTasks.filter((task) => task.milestoneSlug === 'm1-mock-run-build-ready');
  const invalidReviewLabels = wikiItems.filter((item) => ![
    WIKI_PROMOTION_STATES.INTERNAL_DRAFT,
    WIKI_PROMOTION_STATES.DOMAIN_REVIEW,
  ].includes(normalizeLegacyWikiBucket(item.publishBucket)));
  const titleSearchFailures = wikiItems.filter(
    (item) => !searchInternalWikiItems(wikiItems, item.title).some((result) => result.id === item.id),
  );
  const unlinkedCanonicalM1Tasks = m1Tasks.filter((task) => !getPrimaryWikiPageTitle(task));
  const invalidCanonicalTargets = m1Tasks.filter((task) => {
    const title = getPrimaryWikiPageTitle(task);
    return title && !GOVERNED_WIKI_PAGE_TITLES.has(title);
  });
  const clientVisibleDrafts = filterVisibleLibraryItems(wikiItems, false);
  const missingPillars = [...GOVERNED_WIKI_PAGE_TITLES].filter((title) => !WIKI_PILLAR_MAP[title]);

  const checks = {
    canonicalWikiLibraryVisibleInternally: wikiItems.length > 0 && wikiItems.every((item) => item.hasContent),
    internalSearchFindsEveryCanonicalTitle: titleSearchFailures.length === 0,
    reviewLabelsAppliedConservatively: invalidReviewLabels.length === 0,
    allGovernedPagesMappedToPillars: missingPillars.length === 0,
    allCanonicalM1TasksHaveGovernedWikiLinks:
      m1Tasks.length > 0 && unlinkedCanonicalM1Tasks.length === 0 && invalidCanonicalTargets.length === 0,
    allWikiBuildoutTasksDone: wikiTasks.length === 14 && wikiTasks.every((task) => task.status === 'done'),
    noDraftWikiContentVisibleToClients: clientVisibleDrafts.length === 0,
    liveWikiPageBaselineVerified: liveWikiPageCount == null || liveWikiPageCount === GOVERNED_WIKI_PAGE_TITLES.size,
    liveM1WikiLinksVerified:
      liveM1TaskCount == null
      || (liveM1TaskCount > 0 && liveCorrectWikiLinkCount === liveM1TaskCount),
  };

  return {
    accepted: Object.values(checks).every(Boolean),
    checks,
    counts: {
      canonicalWikiItems: wikiItems.length,
      governedWikiPages: GOVERNED_WIKI_PAGE_TITLES.size,
      canonicalM1Tasks: m1Tasks.length,
      wikiBuildoutTasks: wikiTasks.length,
      clientVisibleDrafts: clientVisibleDrafts.length,
      liveWikiPageCount: liveWikiPageCount ?? null,
      liveM1TaskCount: liveM1TaskCount ?? null,
      liveCorrectWikiLinkCount: liveCorrectWikiLinkCount ?? null,
    },
    failures: {
      titleSearchFailures: titleSearchFailures.map((item) => item.title),
      invalidReviewLabels: invalidReviewLabels.map((item) => item.title),
      missingPillars,
      unlinkedCanonicalM1Tasks: unlinkedCanonicalM1Tasks.map((task) => task.taskKey),
      invalidCanonicalTargets: invalidCanonicalTargets.map((task) => task.taskKey),
      clientVisibleDrafts: clientVisibleDrafts.map((item) => item.title),
    },
  };
};
