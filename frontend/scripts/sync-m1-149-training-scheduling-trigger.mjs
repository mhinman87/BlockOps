#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const verifyOnly = ['1', 'true'].includes(String(process.env.VERIFY_ONLY || '').toLowerCase());
if (!url || !key) throw new Error('Supabase URL and service key are required');

const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const vaultRoot = '/home/bloq/Documents/Block Ops Vault';
const START = '<!-- wiki-cross-links:start -->';
const END = '<!-- wiki-cross-links:end -->';
const sources = new Map([
  ['Training Day Readiness', '02 - Operations/Training Day Readiness.md'],
  ['CRM Pipeline Stages', '02 - Operations/CRM Pipeline Stages.md'],
  ['Client Onboarding', '03 - Client Delivery/Client Onboarding.md'],
]);
const requiredMarkers = new Map([
  ['Training Day Readiness', '## Training-day scheduling authorization — approved 2026-07-19'],
  ['CRM Pipeline Stages', 'The conditional scheduling gate is evidenced:'],
  ['Client Onboarding', '### Training-day scheduling trigger — approved 2026-07-19'],
]);

const fail = (label, error) => {
  if (error) throw new Error(`${label}: ${error.message}`);
};
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const crossLinkPattern = new RegExp(`${escapeRegex(START)}[\\s\\S]*?${escapeRegex(END)}`, 'g');
const stripCrossLinks = (body) => String(body || '').replace(crossLinkPattern, '').trim();
const existingCrossLinks = (body) => String(body || '').match(crossLinkPattern)?.[0] || '';

const { data: beforePages, error: pagesError } = await client
  .from('wiki_pages')
  .select('id, title, body_md, status, owner, updated_at')
  .in('title', [...sources.keys()]);
fail('Read governed Wiki pages', pagesError);
if ((beforePages || []).length !== sources.size) {
  const found = new Set((beforePages || []).map((page) => page.title));
  throw new Error(`Missing governed Wiki pages: ${[...sources.keys()].filter((title) => !found.has(title)).join(', ')}`);
}

const { data: beforeTask, error: taskError } = await client
  .from('launch_tasks_v2')
  .select('*')
  .eq('task_key', 'M1-149')
  .single();
fail('Read M1-149', taskError);

const backupPath = `/tmp/blockops-before-m1-149-${Date.now()}.json`;
if (!verifyOnly) writeFileSync(backupPath, JSON.stringify({ task: beforeTask, pages: beforePages }, null, 2));

if (!verifyOnly) {
  const now = new Date().toISOString();
  for (const page of beforePages) {
    const sourceBody = readFileSync(`${vaultRoot}/${sources.get(page.title)}`, 'utf8');
    const managedBlock = existingCrossLinks(page.body_md);
    const bodyMd = `${stripCrossLinks(sourceBody)}${managedBlock ? `\n\n${managedBlock}` : ''}\n`;
    const { error } = await client
      .from('wiki_pages')
      .update({ body_md: bodyMd, updated_at: now })
      .eq('id', page.id);
    fail(`Update ${page.title}`, error);
  }

  const approvalNote = 'Completed 2026-07-19: Samir approved conditional scheduling after agreement/payment clearance, Client Kickoff, confirmed client/site owners and contacts, known scope/purpose/format/location/date window, identified required attendee roles, no known infeasibility hard stop, and one owner plus a pre-readiness due date for every remaining readiness item. Scheduling authorized, Training Scheduled, and Training Ready remain separate.';
  const notes = String(beforeTask.notes || '').includes(approvalNote)
    ? beforeTask.notes
    : [beforeTask.notes, approvalNote].filter(Boolean).join('\n\n');
  const { error } = await client
    .from('launch_tasks_v2')
    .update({
      status: 'done',
      completed_at: now,
      updated_at: now,
      description: 'Define the conditional onboarding/readiness state that authorizes a training date to be coordinated and reserved without implying Training Ready.',
      notes,
    })
    .eq('id', beforeTask.id);
  fail('Complete M1-149', error);
}

const { data: afterPages, error: afterPagesError } = await client
  .from('wiki_pages')
  .select('id, title, body_md, status, owner, updated_at')
  .in('title', [...sources.keys()]);
fail('Verify governed Wiki pages', afterPagesError);
const afterByTitle = new Map((afterPages || []).map((page) => [page.title, page]));
const beforeByTitle = new Map((beforePages || []).map((page) => [page.title, page]));

const { data: afterTask, error: afterTaskError } = await client
  .from('launch_tasks_v2')
  .select('task_key, title, status, completed_at, description, notes, primary_owner, primary_wiki_page_id')
  .eq('task_key', 'M1-149')
  .single();
fail('Verify M1-149', afterTaskError);

const pageResults = [...sources.keys()].map((title) => {
  const page = afterByTitle.get(title);
  return {
    title,
    markerPresent: Boolean(page?.body_md?.includes(requiredMarkers.get(title))),
    statusPreserved: page?.status === beforeByTitle.get(title)?.status,
    ownerPreserved: page?.owner === beforeByTitle.get(title)?.owner,
    crossLinkBlocks: (page?.body_md?.match(new RegExp(escapeRegex(START), 'g')) || []).length,
    bodyBytes: Buffer.byteLength(page?.body_md || ''),
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
    primaryWikiPageId: afterTask.primary_wiki_page_id,
    approvalNotePresent: String(afterTask.notes || '').includes('Samir approved conditional scheduling'),
  },
  pages: pageResults,
};
console.log(JSON.stringify(report, null, 2));

const failed = afterTask.status !== 'done'
  || !afterTask.completed_at
  || !report.task.approvalNotePresent
  || pageResults.some((page) => !page.markerPresent || !page.statusPreserved || !page.ownerPreserved || page.crossLinkBlocks > 1);
if (failed) process.exitCode = 1;
