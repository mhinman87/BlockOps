import { DELIVERABLE_CATEGORY_CONFIG } from './deliverableObjects.js';
import { KNOWLEDGE_LIBRARY_METADATA } from './knowledgeLibraryMetadata.js';

export const buildKnowledgeLibraryItems = (rows, config = {
  objectCategoryMap: DELIVERABLE_CATEGORY_CONFIG.objectCategoryMap,
  cardMetadata: KNOWLEDGE_LIBRARY_METADATA,
}) => {
  return (rows || [])
    .map((row) => {
      const category = config.objectCategoryMap[row.object_id];
      const meta = config.cardMetadata[row.object_id];
      if (!category || !meta) return null;

      return {
        objectId: row.object_id,
        title: row.title,
        description: meta.description,
        category,
        status: row.review_status,
        tags: meta.tags,
        hasContent: true,
        storagePath: row.storage_path,
      };
    })
    .filter(Boolean);
};
