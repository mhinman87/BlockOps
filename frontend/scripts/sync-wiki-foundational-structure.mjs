#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import { FOUNDATIONAL_STRUCTURE_PAGES } from '../src/services/wikiFoundationalStructureSeed.js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const verifyOnly = ['1', 'true'].includes(String(process.env.VERIFY_ONLY || '').toLowerCase());
if (!url || !key) throw new Error('Supabase URL and service key are required');

const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const fail = (label, error) => { if (error) throw new Error(`${label}: ${error.message}`); };

const { data: sections, error: sectionError } = await client.from('wiki_sections').select('id, slug, title');
fail('Read wiki sections', sectionError);
const sectionIdBySlug = new Map((sections || []).map((section) => [section.slug, section.id]));

const { data: beforePages, error: beforeError } = await client.from('wiki_pages').select('*').order('title');
fail('Read wiki pages', beforeError);
const beforeByTitle = new Map((beforePages || []).map((page) => [page.title, page]));
const backupPath = `/tmp/blockops-wiki-before-foundational-structure-${Date.now()}.json`;
if (!verifyOnly) writeFileSync(backupPath, JSON.stringify({ sections, pages: beforePages }, null, 2));

const missingSections = [...new Set(FOUNDATIONAL_STRUCTURE_PAGES.map((page) => page.sectionSlug))]
  .filter((slug) => !sectionIdBySlug.has(slug));
if (missingSections.length) throw new Error(`Missing target sections: ${missingSections.join(', ')}`);

if (!verifyOnly) {
  for (const page of FOUNDATIONAL_STRUCTURE_PAGES) {
    const payload = {
      section_id: sectionIdBySlug.get(page.sectionSlug), slug: page.slug, title: page.title,
      summary: page.summary, body_md: page.bodyMd, status: page.status,
      owner: page.owner, source: page.source, updated_at: new Date().toISOString(),
    };
    const existing = beforeByTitle.get(page.title);
    const result = existing
      ? await client.from('wiki_pages').update(payload).eq('id', existing.id)
      : await client.from('wiki_pages').insert(payload);
    fail(`Upsert ${page.title}`, result.error);
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
  expectedIncrease: FOUNDATIONAL_STRUCTURE_PAGES.filter((page) => !beforeByTitle.has(page.title)).length,
  pages: FOUNDATIONAL_STRUCTURE_PAGES.map((expected) => {
    const actual = afterByTitle.get(expected.title);
    return {
      title: expected.title,
      exists: Boolean(actual),
      sectionCorrect: actual?.section_id === sectionIdBySlug.get(expected.sectionSlug),
      status: actual?.status || null,
      owner: actual?.owner || null,
      scaffoldNotice: actual?.body_md?.includes('Internal scaffold') || false,
      milestoneBuiltMarkers: (actual?.body_md?.match(/\*\*Milestone-built\.\*\*/g) || []).length,
    };
  }),
  duplicateTitles: FOUNDATIONAL_STRUCTURE_PAGES
    .filter((expected) => afterPages.filter((page) => page.title === expected.title).length !== 1)
    .map((page) => page.title),
  clientFacingPages: FOUNDATIONAL_STRUCTURE_PAGES
    .filter((expected) => afterByTitle.get(expected.title)?.status !== 'draft')
    .map((page) => page.title),
};

console.log(JSON.stringify(report, null, 2));
const failed = report.totalPagesAfter !== report.totalPagesBefore + report.expectedIncrease
  || report.pages.some((page) => !page.exists || !page.sectionCorrect || page.status !== 'draft'
    || page.owner !== 'Samir' || !page.scaffoldNotice || page.milestoneBuiltMarkers === 0)
  || report.duplicateTitles.length || report.clientFacingPages.length;
if (failed) process.exitCode = 1;
