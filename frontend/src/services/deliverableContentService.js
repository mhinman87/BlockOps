import { buildFoundationSections } from './deliverableObjects.js';
import { filterRepresentationsByScope } from './contentScope.js';
import { fetchRenderedSiteRepresentations } from './siteContentService.js';

const getDefaultClient = async () => {
  const module = await import('./supabase.js');
  return module.supabase;
};

export const fetchFoundationDeliverableSections = async ({ scope = 'global', siteId = null, client } = {}) => {
  if (scope === 'rendered') {
    const renderedRows = await fetchRenderedSiteRepresentations({
      siteId,
      knowledgeLayer: 'layer1_human',
      workspaceVisibility: 'client_visible',
      client,
    });

    return buildFoundationSections(renderedRows);
  }

  const resolvedClient = client || await getDefaultClient();
  const { data, error } = await resolvedClient
    .from('content_representations')
    .select('object_id, title:content_objects(title), storage_path, review_status, scope_type, site_id')
    .eq('knowledge_layer', 'layer1_human')
    .eq('workspace_visibility', 'client_visible')
    .order('storage_path', { ascending: true });

  if (error) throw error;

  const normalized = (data || []).map((row) => ({
    object_id: row.object_id,
    title: row.title?.title || row.title,
    storage_path: row.storage_path,
    review_status: row.review_status,
    scope_type: row.scope_type,
    site_id: row.site_id,
  }));

  return buildFoundationSections(filterRepresentationsByScope(normalized, { scope, siteId }));
};
