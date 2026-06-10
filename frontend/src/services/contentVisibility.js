export const filterVisibleLibraryItems = (items, isTeam) => {
  if (isTeam) return items;
  return (items || []).filter((item) => item.hasContent && item.status === 'approved');
};

export const filterVisibleDeliverableItems = (items, isTeam) => {
  if (isTeam) return items;
  return (items || []).filter((item) => item.storagePath && item.status === 'approved');
};
