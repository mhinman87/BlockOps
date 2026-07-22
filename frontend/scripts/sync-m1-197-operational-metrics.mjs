#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { FOUNDATIONAL_STRUCTURE_PAGES } from '../src/services/wikiFoundationalStructureSeed.js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const verifyOnly = ['1', 'true'].includes(String(process.env.VERIFY_ONLY || '').toLowerCase());
if (!url || !key) throw new Error('Supabase URL and service key are required');

const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const vaultRoot = '/home/bloq/Documents/Block Ops Vault';
const START = '<!-- wiki-cross-links:start -->';
const END = '<!-- wiki-cross-links:end -->';
const titles = ['KPI Dictionary and Data Ownership', 'Measurement Framework and Minimum Dataset', 'CRM Pipeline Stages'];
const requiredMarkers = new Map([
  ['KPI Dictionary and Data Ownership', 'M1 mock first operational metric set — approved 2026-07-21'],
  ['Measurement Framework and Minimum Dataset', 'M1 mock measurement baseline — approved 2026-07-21'],
  ['CRM Pipeline Stages', 'M1 mock operational set — approved 2026-07-21'],
]);

const fail = (label, error) => { if (error) throw new Error(`${label}: ${error.message}`); };
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const crossLinkPattern = new RegExp(`${escapeRegex(START)}[\\s\\S]*?${escapeRegex(END)}`, 'g');
const stripCrossLinks = (body) => String(body || '').replace(crossLinkPattern, '').trim();
const existingCrossLinks = (body) => String(body || '').match(crossLinkPattern)?.[0] || '';
const foundationalByTitle = new Map(FOUNDATIONAL_STRUCTURE_PAGES.map((page) => [page.title, page.bodyMd]));
const sourceBody = (title) => {
  if (foundationalByTitle.has(title)) return foundationalByTitle.get(title);
  if (title === 'CRM Pipeline Stages') return readFileSync(`${vaultRoot}/02 - Operations/CRM Pipeline Stages.md`, 'utf8');
  throw new Error(`No governed source for ${title}`);
};

const { data: beforePages, error: pagesError } = await client
  .from('wiki_pages')
  .select('id, title, body_md, status, owner, updated_at')
  .in('title', titles);
fail('Read governed Wiki pages', pagesError);
if ((beforePages || []).length !== titles.length) {
  const found = new Set((beforePages || []).map((page) => page.title));
  throw new Error(`Missing governed Wiki pages: ${titles.filter((title) => !found.has(title)).join(', ')}`);
}

const { data: beforeTask, error: taskError } = await client
  .from('launch_tasks_v2')
  .select('*')
  .eq('task_key', 'M1-197')
  .single();
fail('Read M1-197', taskError);

const backupPath = `/tmp/blockops-before-m1-197-${Date.now()}.json`;
if (!verifyOnly) writeFileSync(backupPath, JSON.stringify({ task: beforeTask, pages: beforePages }, null, 2));

if (!verifyOnly) {
  const now = new Date().toISOString();
  for (const page of beforePages) {
    const managedBlock = existingCrossLinks(page.body_md);
    const bodyMd = `${stripCrossLinks(sourceBody(page.title))}${managedBlock ? `\n\n${managedBlock}` : ''}\n`;
    const { error } = await client.from('wiki_pages').update({ body_md: bodyMd, updated_at: now }).eq('id', page.id);
    fail(`Update ${page.title}`, error);
  }

  const approvalNote = 'Completed 2026-07-21: Samir approved six M1 mock operational metrics—mock workflow volume, journey coverage, stage cycle time, handoff quality, operating readiness, and first-week support activity. Values remain mock and Unknown is never inferred. Revenue, ROI, opioid reduction, clinical outcomes, and other value claims remain separate. Max owns source/provenance, entry, and Dashboard work; Bloq owns labeled mock capture. Definition approval does not prove implementation or capture.';
  const notes = String(beforeTask.notes || '').includes(approvalNote)
    ? beforeTask.notes
    : [beforeTask.notes, approvalNote].filter(Boolean).join('\n\n');
  const { error } = await client.from('launch_tasks_v2').update({
    status: 'done', completed_at: now, updated_at: now,
    description: 'Define the six approved first-capture operational metrics for each clearly labeled M1 mock client without implying value, clinical, or technical proof.',
    notes,
  }).eq('id', beforeTask.id);
  fail('Complete M1-197', error);
}

const { data: afterPages, error: afterPagesError } = await client
  .from('wiki_pages')
  .select('id, title, body_md, status, owner, updated_at')
  .in('title', titles);
fail('Verify governed Wiki pages', afterPagesError);
const beforeByTitle = new Map(beforePages.map((page) => [page.title, page]));
const afterByTitle = new Map(afterPages.map((page) => [page.title, page]));
const { data: afterTask, error: afterTaskError } = await client
  .from('launch_tasks_v2')
  .select('task_key, title, status, completed_at, description, notes, primary_owner, primary_wiki_page_id')
  .eq('task_key', 'M1-197')
  .single();
fail('Verify M1-197', afterTaskError);

const pages = titles.map((title) => {
  const before = beforeByTitle.get(title);
  const after = afterByTitle.get(title);
  return {
    title,
    markerPresent: Boolean(after?.body_md?.includes(requiredMarkers.get(title))),
    sixMetricsPresent: ['mock workflow volume', 'journey coverage', 'stage cycle time', 'handoff quality', 'operating readiness', 'first-week support activity']
      .every((marker) => String(after?.body_md || '').toLowerCase().includes(marker)),
    statusPreserved: after?.status === before?.status,
    ownerPreserved: after?.owner === before?.owner,
    crossLinkBlocks: (after?.body_md?.match(new RegExp(escapeRegex(START), 'g')) || []).length,
  };
});
const report = {
  verifyOnly,
  backupPath: verifyOnly ? null : backupPath,
  task: {
    taskKey: afterTask.task_key,
    status: afterTask.status,
    completedAt: afterTask.completed_at,
    owner: afterTask.primary_owner,
    approvalNotePresent: String(afterTask.notes || '').includes('Samir approved six M1 mock operational metrics'),
  },
  pages,
};
console.log(JSON.stringify(report, null, 2));

const failed = afterTask.status !== 'done' || !afterTask.completed_at || !report.task.approvalNotePresent
  || pages.some((page) => !page.markerPresent || !page.sixMetricsPresent || !page.statusPreserved || !page.ownerPreserved || page.crossLinkBlocks > 1);
if (failed) process.exitCode = 1;
