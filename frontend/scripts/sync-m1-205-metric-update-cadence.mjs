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
  ['KPI Dictionary and Data Ownership', 'M1 metric update cadence — approved 2026-07-21'],
  ['Measurement Framework and Minimum Dataset', 'M1 measurement cadence — approved 2026-07-21'],
  ['CRM Pipeline Stages', 'M1 metric update cadence — approved 2026-07-21'],
]);
const cadenceMarkers = ['day 0', 'day 3', 'day 7', 'monthly', 'quarterly', 'annual'];

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
  .eq('task_key', 'M1-205')
  .single();
fail('Read M1-205', taskError);

const backupPath = `/tmp/blockops-before-m1-205-${Date.now()}.json`;
if (!verifyOnly) writeFileSync(backupPath, JSON.stringify({ task: beforeTask, pages: beforePages }, null, 2));

if (!verifyOnly) {
  const now = new Date().toISOString();
  for (const page of beforePages) {
    const managedBlock = existingCrossLinks(page.body_md);
    const bodyMd = `${stripCrossLinks(sourceBody(page.title))}${managedBlock ? `\n\n${managedBlock}` : ''}\n`;
    const { error } = await client.from('wiki_pages').update({ body_md: bodyMd, updated_at: now }).eq('id', page.id);
    fail(`Update ${page.title}`, error);
  }

  const approvalNote = 'Completed 2026-07-21: Samir approved the M1 metric cadence—Day 0 opens the first measurement window, Day 3 checks the data path and quality state, and Day 7 records and reviews the first governed snapshot plus the next refresh date. After first capture, available KPI values and quality states refresh monthly where practical, formal performance/value review occurs quarterly, configuration and scope are reviewed annually, and material corrections or governance events trigger an affected off-cycle refresh. Preserve source timestamp, period, owner, sanity result, corrections, history, and next refresh date. Continuous Dashboard access is not a real-time-data promise. Separate Max-owned technical work must implement any scheduling or automation; cadence approval does not prove implementation.';
  const existingNotes = String(beforeTask.notes || '');
  const notes = existingNotes.includes(approvalNote)
    ? existingNotes
    : [existingNotes, approvalNote].filter(Boolean).join('\n\n');
  const { error } = await client.from('launch_tasks_v2').update({
    status: 'done', completed_at: now, updated_at: now,
    description: 'Define the approved Day 0/3/7 first-capture handoff into monthly refresh, quarterly formal review, annual scope review, and event-triggered correction.',
    notes,
  }).eq('id', beforeTask.id);
  fail('Complete M1-205', error);
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
  .eq('task_key', 'M1-205')
  .single();
fail('Verify M1-205', afterTaskError);

const pages = titles.map((title) => {
  const before = beforeByTitle.get(title);
  const after = afterByTitle.get(title);
  const body = String(after?.body_md || '').toLowerCase();
  return {
    title,
    markerPresent: body.includes(requiredMarkers.get(title).toLowerCase()),
    cadencePresent: cadenceMarkers.every((marker) => body.includes(marker)),
    eventRefreshPresent: body.includes('event-triggered') || body.includes('off-cycle'),
    realTimeBoundaryPresent: body.includes('real-time'),
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
    title: afterTask.title,
    status: afterTask.status,
    completedAt: afterTask.completed_at,
    owner: afterTask.primary_owner,
    approvalNotePresent: String(afterTask.notes || '').includes('Samir approved the M1 metric cadence'),
  },
  pages,
};
console.log(JSON.stringify(report, null, 2));

const failed = afterTask.status !== 'done' || !afterTask.completed_at || !report.task.approvalNotePresent
  || pages.some((page) => !page.markerPresent || !page.cadencePresent || !page.eventRefreshPresent
    || !page.realTimeBoundaryPresent || !page.statusPreserved || !page.ownerPreserved || page.crossLinkBlocks > 1);
if (failed) process.exitCode = 1;
