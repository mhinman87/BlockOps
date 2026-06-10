import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  ACTIVE_SITE_STORAGE_KEY,
  buildRenderedSiteQuery,
  chooseInitialActiveSiteId,
  DEFAULT_ACTIVE_SITE_ID,
  getDefaultActiveSiteId,
} from '../services/activeSiteState.js';
import { fetchSites } from '../services/siteService.js';

const ActiveSiteContext = createContext();

export const ActiveSiteProvider = ({ children }) => {
  const [sites, setSites] = useState([]);
  const [activeSiteId, setActiveSiteIdState] = useState(DEFAULT_ACTIVE_SITE_ID);
  const [isLoadingSites, setIsLoadingSites] = useState(true);
  const [sitesError, setSitesError] = useState(null);

  useEffect(() => {
    const loadSites = async () => {
      setIsLoadingSites(true);
      try {
        const loadedSites = await fetchSites();
        const storedSiteId = (() => {
          try {
            return localStorage.getItem(ACTIVE_SITE_STORAGE_KEY);
          } catch {
            return null;
          }
        })();

        const resolvedSiteId = chooseInitialActiveSiteId({
          sites: loadedSites,
          storedSiteId,
        });

        setSites(loadedSites);
        setActiveSiteIdState(resolvedSiteId);
        setSitesError(null);

        try {
          localStorage.setItem(ACTIVE_SITE_STORAGE_KEY, resolvedSiteId);
        } catch {}
      } catch (error) {
        console.error(error);
        setSites([]);
        setActiveSiteIdState(DEFAULT_ACTIVE_SITE_ID);
        setSitesError('Failed to load sites. Falling back to the demo site.');
      } finally {
        setIsLoadingSites(false);
      }
    };

    loadSites();
  }, []);

  const setActiveSiteId = (siteId) => {
    if (!siteId) return;

    setActiveSiteIdState(siteId);
    try {
      localStorage.setItem(ACTIVE_SITE_STORAGE_KEY, siteId);
    } catch {}
  };

  const activeSite = useMemo(() => (
    sites.find((site) => site.siteId === activeSiteId) || null
  ), [sites, activeSiteId]);

  const activeSiteDisplay = activeSite || {
    siteId: activeSiteId || DEFAULT_ACTIVE_SITE_ID,
    siteName: 'ASC Demo Site',
    clientAccountName: 'Demo Health Partners',
    status: 'onboarding',
    launchPhase: 'prep',
  };

  const availableSites = sites.length > 0
    ? sites
    : [activeSiteDisplay];

  const canSelectSites = sites.length > 0;

  const value = {
    sites: availableSites,
    activeSiteId,
    activeSite: activeSiteDisplay,
    isLoadingSites,
    sitesError,
    canSelectSites,
    setActiveSiteId,
    renderedSiteQuery: buildRenderedSiteQuery(activeSiteId || getDefaultActiveSiteId(availableSites)),
  };

  return (
    <ActiveSiteContext.Provider value={value}>
      {children}
    </ActiveSiteContext.Provider>
  );
};

export const useActiveSite = () => {
  const context = useContext(ActiveSiteContext);
  if (!context) {
    throw new Error('useActiveSite must be used within ActiveSiteProvider');
  }
  return context;
};
