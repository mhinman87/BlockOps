const normalizeRepresentationRow = (row) => ({
  object_id: row.object_id,
  title: row.title?.title || row.title,
  storage_path: row.storage_path,
  review_status: row.review_status,
  scope_type: row.scope_type,
  site_id: row.site_id,
});

const isApproved = (row) => row.review_status === 'approved';

const getDefaultClient = async () => {
  const module = await import('./supabase.js');
  return module.supabase;
};

export const buildRenderedSiteRepresentations = (rows, { siteId } = {}) => {
  const items = (rows || []).map(normalizeRepresentationRow);

  const globalRows = items.filter((row) => row.scope_type === 'global_standard' && isApproved(row));
  const siteConfigRows = items.filter((row) => row.site_id === siteId && row.scope_type === 'site_configuration' && isApproved(row));
  const exceptionRows = items.filter((row) => row.site_id === siteId && row.scope_type === 'exception' && isApproved(row));

  const siteConfigByObjectId = new Map(siteConfigRows.map((row) => [row.object_id, row]));
  const renderedBaseRows = globalRows.map((row) => {
    const siteOverride = siteConfigByObjectId.get(row.object_id);
    const resolvedRow = siteOverride || row;

    return {
      ...resolvedRow,
      inherited_from_object_id: row.object_id,
    };
  });

  const siteOnlyRows = siteConfigRows
    .filter((row) => !globalRows.some((globalRow) => globalRow.object_id === row.object_id))
    .map((row) => ({
      ...row,
      inherited_from_object_id: row.object_id,
    }));

  const renderedExceptions = exceptionRows.map((row) => ({
    ...row,
    inherited_from_object_id: null,
  }));

  return [...renderedBaseRows, ...siteOnlyRows, ...renderedExceptions];
};

export const fetchRenderedSiteRepresentations = async ({
  siteId,
  knowledgeLayer = 'layer1_human',
  workspaceVisibility = 'client_visible',
  client,
} = {}) => {
  const resolvedClient = client || await getDefaultClient();

  const { data, error } = await resolvedClient
    .from('content_representations')
    .select('object_id, title:content_objects(title), storage_path, review_status, scope_type, site_id')
    .eq('knowledge_layer', knowledgeLayer)
    .eq('workspace_visibility', workspaceVisibility)
    .order('storage_path', { ascending: true });

  if (error) throw error;

  return buildRenderedSiteRepresentations(data, { siteId });
};
