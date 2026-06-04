export const ACTIVE_SITE_STORAGE_KEY = 'blockops_active_site_id';
export const DEFAULT_ACTIVE_SITE_ID = 'asc-demo';

export const getDefaultActiveSiteId = (sites = []) => {
  const siteIds = new Set((sites || []).map((site) => site.siteId));

  if (siteIds.has(DEFAULT_ACTIVE_SITE_ID)) {
    return DEFAULT_ACTIVE_SITE_ID;
  }

  return sites?.[0]?.siteId || DEFAULT_ACTIVE_SITE_ID;
};

export const chooseInitialActiveSiteId = ({ sites = [], storedSiteId = null } = {}) => {
  const siteIds = new Set((sites || []).map((site) => site.siteId));

  if (storedSiteId && siteIds.has(storedSiteId)) {
    return storedSiteId;
  }

  return getDefaultActiveSiteId(sites);
};

export const buildRenderedSiteQuery = (siteId) => ({
  scope: 'rendered',
  siteId,
});
