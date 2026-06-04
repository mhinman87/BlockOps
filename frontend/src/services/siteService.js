export const normalizeSiteRow = (row) => ({
  siteId: row.site_id,
  siteName: row.site_name,
  clientAccountName: row.client_account_name,
  status: row.status,
  launchPhase: row.launch_phase,
});

const getDefaultClient = async () => {
  const module = await import('./supabase.js');
  return module.supabase;
};

export const fetchSites = async ({ client } = {}) => {
  const resolvedClient = client || await getDefaultClient();

  const { data, error } = await resolvedClient
    .from('sites')
    .select('site_id, site_name, client_account_name, status, launch_phase')
    .order('site_name', { ascending: true });

  if (error) throw error;

  return (data || []).map(normalizeSiteRow).sort((a, b) => a.siteName.localeCompare(b.siteName));
};
