#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { WIKI_HUBS, WIKI_RELATED_PAGE_MAP, runWikiLinkQa } from '../src/services/wikiCrossLinks.js';
import { WIKI_PILLAR_MAP } from '../src/services/wikiPillarMapping.js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const verifyOnly = process.env.VERIFY_ONLY === '1' || process.env.VERIFY_ONLY === 'true';
const START = '<!-- wiki-cross-links:start -->';
const END = '<!-- wiki-cross-links:end -->';

if (!supabaseUrl) throw new Error('SUPABASE_URL or VITE_SUPABASE_URL is required');
if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY is required');

const client = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const buildBlock = (title) => {
  const related = WIKI_RELATED_PAGE_MAP[title] || [];
  const indexes = Object.entries(WIKI_HUBS)
    .filter(([, target]) => target === title)
    .map(([name]) => name);
  return [
    START,
    '## Related Pages',
    '',
    ...related.map((target) => `- [[${target}]]`),
    ...(indexes.length ? ['', `**Topic indexes anchored here:** ${indexes.join(', ')}`] : []),
    '',
    '> Internal navigation only. Links do not change review, promotion, or visibility state. Client traversal requires both exact pages to be independently approved client-visible finals.',
    END,
  ].join('\n');
};

const replaceBlock = (body, title) => {
  const next = buildBlock(title);
  const current = String(body || '');
  const pattern = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
  return pattern.test(current) ? current.replace(pattern, next) : `${current.trim()}\n\n${next}\n`;
};

const { data: pages, error } = await client.from('wiki_pages').select('id, title, body_md, status');
if (error) throw error;

const expectedTitles = Object.keys(WIKI_PILLAR_MAP);
const byTitle = new Map((pages || []).map((page) => [page.title, page]));
const missing = expectedTitles.filter((title) => !byTitle.has(title));
if (missing.length) throw new Error(`Missing governed live Wiki pages: ${missing.join(', ')}`);

if (!verifyOnly) {
  for (const title of expectedTitles) {
    const page = byTitle.get(title);
    const bodyMd = replaceBlock(page.body_md, title);
    const { error: updateError } = await client
      .from('wiki_pages')
      .update({ body_md: bodyMd, updated_at: new Date().toISOString() })
      .eq('id', page.id);
    if (updateError) throw new Error(`Update ${title}: ${updateError.message}`);
  }
}

const { data: verifiedPages, error: verifyError } = await client
  .from('wiki_pages')
  .select('title, body_md, status');
if (verifyError) throw verifyError;
const verifiedByTitle = new Map((verifiedPages || []).map((page) => [page.title, page]));
const bodyFailures = expectedTitles.filter((title) => {
  const body = verifiedByTitle.get(title)?.body_md || '';
  return !body.includes(START)
    || !body.includes(END)
    || !(WIKI_RELATED_PAGE_MAP[title] || []).every((target) => body.includes(`[[${target}]]`));
});
const statusChanges = expectedTitles
  .map((title) => verifiedByTitle.get(title))
  .filter((page) => page?.status !== byTitle.get(page.title)?.status)
  .map((page) => page.title);
const qa = runWikiLinkQa();
const report = {
  verifyOnly,
  livePages: verifiedPages?.length || 0,
  governedPages: expectedTitles.length,
  updatedOrVerified: expectedTitles.length - bodyFailures.length,
  linkQa: qa,
  bodyFailures,
  statusChanges,
};
console.log(JSON.stringify(report, null, 2));
if (!qa.passed || bodyFailures.length || statusChanges.length) process.exitCode = 1;
