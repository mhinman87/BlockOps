export const humanizeAgentFileName = (fileName) => fileName
  .replace(/\.agent\.md$/i, '')
  .replace(/_/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase());

export const buildAgentKnowledgeItems = (rows, fileMetadata = {}) => {
  return [...(rows || [])]
    .map((row) => {
      const fileName = row.source_path.split('/').pop();
      const meta = fileMetadata[fileName] || {};
      const name = humanizeAgentFileName(fileName);

      return {
        objectId: row.object_id,
        fileName,
        name,
        path: row.storage_path,
        deliverable: name,
        category: meta.category || 'General',
        status: 'complete',
        reviewStatus: row.review_status,
        units: meta.units || 0,
        qaPairs: meta.qaPairs || 0,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
