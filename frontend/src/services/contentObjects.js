import { supabase } from './supabase.js';
import { buildAgentKnowledgeItems } from './contentObjectTransforms.js';

export { buildAgentKnowledgeItems, humanizeAgentFileName } from './contentObjectTransforms.js';

export const fetchAgentKnowledgeItems = async (fileMetadata = {}) => {
  const { data, error } = await supabase
    .from('content_representations')
    .select('object_id, source_path, storage_path, review_status')
    .eq('knowledge_layer', 'layer2_agent')
    .eq('workspace_visibility', 'internal_only')
    .order('source_path', { ascending: true });

  if (error) throw error;

  return buildAgentKnowledgeItems(data, fileMetadata);
};
