const getDefaultClient = async () => {
  const module = await import('./supabase.js');
  return module.supabase;
};

const SECTION_CATEGORY = {
  'company-identity': 'wiki-foundation',
  'strategy-and-growth': 'wiki-foundation',
  'operating-model': 'wiki-operating',
  'sales-and-client-pipeline': 'wiki-sales',
  'client-delivery-system': 'wiki-delivery',
  'clinical-block-knowledge': 'wiki-delivery',
  'digital-platform': 'wiki-platform',
  'proof-metrics-value': 'wiki-readiness',
  'knowledge-sops-scripts': 'wiki-readiness',
  'backup-continuity-risk': 'wiki-risk',
  'design-and-build-handoffs': 'wiki-platform',
  'archive-decisions-history': 'wiki-risk',
};

export const fetchInternalWikiItems = async ({ client } = {}) => {
  const resolvedClient = client || await getDefaultClient();

  const [sectionsResult, pagesResult] = await Promise.all([
    resolvedClient
      .from('wiki_sections')
      .select('id, title, slug, sort_order')
      .order('sort_order', { ascending: true }),
    resolvedClient
      .from('wiki_pages')
      .select('id, section_id, title, slug, summary, body_md, status, owner, storage_path, source, updated_at')
      .order('title', { ascending: true }),
  ]);

  if (sectionsResult.error) throw sectionsResult.error;
  if (pagesResult.error) throw pagesResult.error;

  const sectionById = new Map((sectionsResult.data || []).map((section) => [section.id, section]));

  return (pagesResult.data || []).map((page) => {
    const section = sectionById.get(page.section_id);
    return {
      id: `wiki.${page.id}`,
      objectId: `wiki.${page.id}`,
      title: page.title,
      description: page.summary || 'Internal Block Ops Wiki page.',
      category: SECTION_CATEGORY[section?.slug] || 'wiki-foundation',
      status: page.status || 'draft',
      publishBucket: 'internal-only',
      reviewer: page.owner || null,
      tags: ['Block Ops Wiki', section?.title, page.status].filter(Boolean),
      hasContent: Boolean(page.body_md),
      storagePath: null,
      content: page.body_md || '',
      kind: 'wiki-page',
      sectionTitle: section?.title || null,
      slug: page.slug,
      updatedAt: page.updated_at,
    };
  });
};
