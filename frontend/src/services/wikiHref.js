export const parseWikiHref = (href) => {
  if (!String(href || '').startsWith('wiki:')) return null;
  try {
    return decodeURIComponent(String(href).slice(5));
  } catch {
    return null;
  }
};
