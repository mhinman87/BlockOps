export const filterRepresentationsByScope = (rows, { scope = 'global', siteId = null } = {}) => {
  const items = rows || [];

  if (scope === 'global') {
    return items.filter((row) => row.scope_type === 'global_standard');
  }

  if (scope === 'site') {
    return items.filter((row) => row.site_id === siteId && (row.scope_type === 'site_configuration' || row.scope_type === 'exception'));
  }

  if (scope === 'rendered') {
    return items.filter((row) => {
      if (row.scope_type === 'global_standard') return true;
      return row.site_id === siteId && (row.scope_type === 'site_configuration' || row.scope_type === 'exception');
    });
  }

  return items;
};
