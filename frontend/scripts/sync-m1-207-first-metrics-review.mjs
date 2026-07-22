#!/usr/bin/env node

import { writeFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { FOUNDATIONAL_STRUCTURE_PAGES } from '../src/services/wikiFoundationalStructureSeed.js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const verifyOnly = ['1', 'true'].includes(String(process.env.VERIFY_ONLY || '').toLowerCase());
if (!url || !key) throw new Error('Supabase URL and service key are required');

const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const title = 'Measurement Framework and Minimum Dataset';
const sourcePage = FOUNDATIONAL_STRUCTURE_PAGES.find((page) => page.title === title);
if (!sourcePage) throw new Error(`Missing governed source for ${title}`);

const START = '<!-- wiki-cross-links:start -->';
const END = '<!-- wiki-cross-links:end -->';
const fail = (label, error) => { if (error) throw new Error(`${label}: ${error.message}`); };
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const crossLinkPattern = new RegExp(`${escapeRegex(START)}[\\s\\S]*?${escapeRegex(END)}`, 'g');
const stripCrossLinks = (body) => String(body || '').replace(crossLinkPattern, '').trim();
const existingCrossLinks = (body) => String(body || '').match(crossLinkPattern)?.[0] || '';

const [{ data: beforePage, error: pageError }, { data: beforeTask, error: taskError }, qualityResult, financialResult] = await Promise.all([
  client.from('wiki_pages').select('id, title, body_md, status, owner, updated_at').eq('title', title).single(),
  client.from('launch_tasks_v2').select('*').eq('task_key', 'M1-207').single(),
  client.from('quality_metrics').select('*').eq('site_id', 'asc-demo').order('period_start'),
  client.from('financials').select('*').eq('site_id', 'asc-demo').order('period_start'),
]);
fail(`Read ${title}`, pageError);
fail('Read M1-207', taskError);
fail('Read asc-demo quality metrics', qualityResult.error);
fail('Read asc-demo financials', financialResult.error);

const beforeQuality = qualityResult.data || [];
const beforeFinancials = financialResult.data || [];
const backupPath = `/tmp/blockops-before-m1-207-${Date.now()}.json`;
if (!verifyOnly) {
  writeFileSync(backupPath, JSON.stringify({ task: beforeTask, page: beforePage, qualityMetrics: beforeQuality, financials: beforeFinancials }, null, 2));
}

if (!verifyOnly) {
  const now = new Date().toISOString();
  const managedBlock = existingCrossLinks(beforePage.body_md);
  const bodyMd = `${stripCrossLinks(sourcePage.bodyMd)}${managedBlock ? `\n\n${managedBlock}` : ''}\n`;
  const { error: updatePageError } = await client.from('wiki_pages').update({ body_md: bodyMd, updated_at: now }).eq('id', beforePage.id);
  fail(`Update ${title}`, updatePageError);

  const { error: qualityUpdateError } = await client
    .from('quality_metrics')
    .update({ is_published: false, updated_at: now })
    .eq('site_id', 'asc-demo');
  fail('Unpublish legacy asc-demo quality metrics', qualityUpdateError);

  const { error: financialUpdateError } = await client
    .from('financials')
    .update({ is_published: false, updated_at: now })
    .eq('site_id', 'asc-demo');
  fail('Unpublish legacy asc-demo financials', financialUpdateError);

  const approvalNote = 'Completed 2026-07-21: Samir reviewed the legacy asc-demo series (six quality rows and four financial rows) and issued Hold—useful mock narrative scaffold, not a defensible client value story. The series suggests a useful adoption/quality/recovery/economic narrative, but it omits the six approved M1 operational measures, source/provenance and representation labels, and defensible formulas/review evidence. Four of six displayed block-success rates fail reconciliation; ROI lacks an approved cost basis and denominator. All legacy rows were preserved but removed from published eligibility. Follow-up remains with Max for source/display/baseline/entry and Dashboard verification, and Bloq for governed capture and assumptions. Completion records the review and Hold disposition; it does not approve the values or satisfy First Metrics Captured.';
  const existingNotes = String(beforeTask.notes || '');
  const notes = existingNotes.includes(approvalNote) ? existingNotes : [existingNotes, approvalNote].filter(Boolean).join('\n\n');
  const { error: taskUpdateError } = await client.from('launch_tasks_v2').update({
    status: 'done',
    completed_at: now,
    updated_at: now,
    description: 'Review the existing first-metrics prototype for business meaning and record a fail-closed disposition, boundaries, and follow-up ownership.',
    notes,
  }).eq('id', beforeTask.id);
  fail('Complete M1-207', taskUpdateError);
}

const [{ data: afterPage, error: afterPageError }, { data: afterTask, error: afterTaskError }, afterQualityResult, afterFinancialResult] = await Promise.all([
  client.from('wiki_pages').select('id, title, body_md, status, owner, updated_at').eq('title', title).single(),
  client.from('launch_tasks_v2').select('task_key, title, status, completed_at, description, notes, primary_owner, primary_wiki_page_id').eq('task_key', 'M1-207').single(),
  client.from('quality_metrics').select('*').eq('site_id', 'asc-demo').order('period_start'),
  client.from('financials').select('*').eq('site_id', 'asc-demo').order('period_start'),
]);
fail(`Verify ${title}`, afterPageError);
fail('Verify M1-207', afterTaskError);
fail('Verify asc-demo quality metrics', afterQualityResult.error);
fail('Verify asc-demo financials', afterFinancialResult.error);

const qualityRows = afterQualityResult.data || [];
const financialRows = afterFinancialResult.data || [];
const mismatchedSuccessRows = qualityRows.filter((row) => {
  if (!row.total_blocks || row.failed_blocks == null || row.block_success_rate_pct == null) return true;
  const calculated = Number((((row.total_blocks - row.failed_blocks) / row.total_blocks) * 100).toFixed(1));
  return calculated !== Number(row.block_success_rate_pct);
});
const body = String(afterPage.body_md || '').toLowerCase();
const report = {
  verifyOnly,
  backupPath: verifyOnly ? null : backupPath,
  task: {
    taskKey: afterTask.task_key,
    status: afterTask.status,
    completedAt: afterTask.completed_at,
    owner: afterTask.primary_owner,
    holdNotePresent: String(afterTask.notes || '').includes('issued Hold—useful mock narrative scaffold'),
  },
  wiki: {
    markerPresent: body.includes('m1 first-metrics business review — completed 2026-07-21'),
    holdPresent: body.includes('hold — useful mock narrative scaffold, not a defensible client value story'),
    statusPreserved: afterPage.status === beforePage.status,
    ownerPreserved: afterPage.owner === beforePage.owner,
    crossLinkBlocks: (afterPage.body_md?.match(new RegExp(escapeRegex(START), 'g')) || []).length,
  },
  evidence: {
    qualityRows: qualityRows.length,
    financialRows: financialRows.length,
    mismatchedSuccessRows: mismatchedSuccessRows.length,
    qualityUnpublished: qualityRows.every((row) => row.is_published === false),
    financialUnpublished: financialRows.every((row) => row.is_published === false),
    rowsPreserved: qualityRows.length === beforeQuality.length && financialRows.length === beforeFinancials.length,
  },
};
console.log(JSON.stringify(report, null, 2));

const failed = afterTask.status !== 'done' || !afterTask.completed_at || !report.task.holdNotePresent
  || !report.wiki.markerPresent || !report.wiki.holdPresent || !report.wiki.statusPreserved || !report.wiki.ownerPreserved
  || report.wiki.crossLinkBlocks > 1 || report.evidence.qualityRows !== 6 || report.evidence.financialRows !== 4
  || report.evidence.mismatchedSuccessRows !== 4 || !report.evidence.qualityUnpublished
  || !report.evidence.financialUnpublished || !report.evidence.rowsPreserved;
if (failed) process.exitCode = 1;
