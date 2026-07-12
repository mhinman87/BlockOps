#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import {
  LEGACY_CONSOLIDATION_NEW_PAGES,
  LEGACY_CONSOLIDATION_PAGE_ADDITIONS,
  LEGACY_CONSOLIDATION_TEXT_REPLACEMENTS,
  LEGACY_CONSOLIDATION_VERSION,
} from '../src/services/wikiLegacyConsolidationSeed.js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const verifyOnly = ['1', 'true'].includes(String(process.env.VERIFY_ONLY || '').toLowerCase());
if (!url || !key) throw new Error('Supabase URL and service key are required');

const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const START = `<!-- legacy-consolidation:${LEGACY_CONSOLIDATION_VERSION}:start -->`;
const END = `<!-- legacy-consolidation:${LEGACY_CONSOLIDATION_VERSION}:end -->`;
const CROSS_LINK_START = '<!-- wiki-cross-links:start -->';

const fail = (label, error) => {
  if (error) throw new Error(`${label}: ${error.message}`);
};

const { data: sections, error: sectionError } = await client
  .from('wiki_sections').select('id, slug, title');
fail('Read wiki sections', sectionError);
const sectionIdBySlug = new Map((sections || []).map((section) => [section.slug, section.id]));

const { data: beforePages, error: beforeError } = await client
  .from('wiki_pages').select('*').order('title');
fail('Read wiki pages', beforeError);

const backupPath = `/tmp/blockops-wiki-before-legacy-consolidation-${Date.now()}.json`;
if (!verifyOnly) writeFileSync(backupPath, JSON.stringify({ sections, pages: beforePages }, null, 2));

const newTitles = new Set(LEGACY_CONSOLIDATION_NEW_PAGES.map((page) => page.title));
const targetTitles = Object.keys(LEGACY_CONSOLIDATION_PAGE_ADDITIONS);
const byTitle = new Map((beforePages || []).map((page) => [page.title, page]));
const missingTargets = targetTitles.filter((title) => !byTitle.has(title));
if (missingTargets.length) throw new Error(`Missing canonical update targets: ${missingTargets.join(', ')}`);

const missingSections = [...new Set(LEGACY_CONSOLIDATION_NEW_PAGES.map((page) => page.sectionSlug))]
  .filter((slug) => !sectionIdBySlug.has(slug));
if (missingSections.length) throw new Error(`Missing target sections: ${missingSections.join(', ')}`);

const replaceAddition = (body, addition) => {
  const current = String(body || '');
  const escapedStart = START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedEnd = END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`, 'g');
  if (pattern.test(current)) return current.replace(pattern, addition);
  const crossLinkAt = current.indexOf(CROSS_LINK_START);
  if (crossLinkAt >= 0) {
    return `${current.slice(0, crossLinkAt).trim()}\n\n${addition}\n\n${current.slice(crossLinkAt)}`;
  }
  return `${current.trim()}\n\n${addition}\n`;
};

if (!verifyOnly) {
  for (const page of LEGACY_CONSOLIDATION_NEW_PAGES) {
    const payload = {
      section_id: sectionIdBySlug.get(page.sectionSlug),
      slug: page.slug,
      title: page.title,
      summary: page.summary,
      body_md: page.bodyMd,
      status: page.status,
      owner: page.owner,
      source: page.source,
      updated_at: new Date().toISOString(),
    };
    const existing = byTitle.get(page.title);
    const result = existing
      ? await client.from('wiki_pages').update(payload).eq('id', existing.id)
      : await client.from('wiki_pages').insert(payload);
    fail(`Upsert ${page.title}`, result.error);
  }

  for (const [title, addition] of Object.entries(LEGACY_CONSOLIDATION_PAGE_ADDITIONS)) {
    const page = byTitle.get(title);
    const normalizedBody = (LEGACY_CONSOLIDATION_TEXT_REPLACEMENTS[title] || []).reduce(
      (body, [legacyText, canonicalText]) => body.replaceAll(legacyText, canonicalText),
      String(page.body_md || ''),
    );
    const nextBody = replaceAddition(normalizedBody, addition);
    const { error } = await client.from('wiki_pages')
      .update({ body_md: nextBody, updated_at: new Date().toISOString() })
      .eq('id', page.id);
    fail(`Update ${title}`, error);
  }
}

const { data: afterPages, error: afterError } = await client
  .from('wiki_pages').select('id, section_id, slug, title, body_md, status, owner, source').order('title');
fail('Verify wiki pages', afterError);
const afterByTitle = new Map((afterPages || []).map((page) => [page.title, page]));

const report = {
  verifyOnly,
  backupPath: verifyOnly ? null : backupPath,
  totalPagesBefore: beforePages?.length || 0,
  totalPagesAfter: afterPages?.length || 0,
  expectedIncrease: LEGACY_CONSOLIDATION_NEW_PAGES.filter((page) => !byTitle.has(page.title)).length,
  newPages: LEGACY_CONSOLIDATION_NEW_PAGES.map((expected) => {
    const actual = afterByTitle.get(expected.title);
    return {
      title: expected.title,
      exists: Boolean(actual),
      sectionCorrect: actual?.section_id === sectionIdBySlug.get(expected.sectionSlug),
      status: actual?.status || null,
      internalNotice: actual?.body_md?.includes('Internal draft — legacy consolidation pass') || false,
    };
  }),
  updatedPages: targetTitles.map((title) => ({
    title,
    markerCount: (afterByTitle.get(title)?.body_md?.match(new RegExp(START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length,
    hasCurrentAuthorityLanguage: title !== 'Block Ops Wiki Content Migration'
      || afterByTitle.get(title)?.body_md?.includes('The Block Ops Wiki is canonical organizational knowledge.'),
  })),
  duplicateNewTitles: [...newTitles].filter((title) => afterPages.filter((page) => page.title === title).length !== 1),
  clientFacingNewPages: LEGACY_CONSOLIDATION_NEW_PAGES
    .filter((expected) => afterByTitle.get(expected.title)?.status !== 'draft')
    .map((page) => page.title),
};

console.log(JSON.stringify(report, null, 2));
const failed = report.totalPagesAfter !== report.totalPagesBefore + report.expectedIncrease
  || report.newPages.some((page) => !page.exists || !page.sectionCorrect || !page.internalNotice)
  || report.updatedPages.some((page) => page.markerCount !== 1 || !page.hasCurrentAuthorityLanguage)
  || report.duplicateNewTitles.length
  || report.clientFacingNewPages.length;
if (failed) process.exitCode = 1;
