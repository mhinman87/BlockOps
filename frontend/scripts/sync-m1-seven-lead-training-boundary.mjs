#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import {
  CANONICAL_LAUNCH_TASKS,
  CANONICAL_LAUNCH_DEPENDENCIES,
} from '../src/services/launchOpsCanonicalSeed.js';
import { WIKI_LIBRARY_ITEMS } from '../src/services/wikiLibraryItems.js';
import { getPrimaryWikiPageTitle } from '../src/services/missionControlWikiLinks.js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const verifyOnly = ['1', 'true'].includes(String(process.env.VERIFY_ONLY || '').toLowerCase());
if (!url || !key) throw new Error('Supabase URL and service key are required');
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const fail = (label, error) => { if (error) throw new Error(`${label}: ${error.message}`); };

const taskKeys = new Set([
  'M1-04', 'M1-DCK-03', 'M2-08',
  'M1-FST-01', 'M1-FST-02', 'M1-FST-03', 'M1-FST-04', 'M1-FST-05', 'M1-FST-06',
  'M1-FST-07', 'M1-FST-08', 'M1-FST-09', 'M1-FST-10', 'M1-FST-11', 'M1-FST-12', 'M1-FST-13',
]);
const movedTrainingKeys = [
  'M1-GR-023', 'M1-GR-024', 'M1-153', 'M1-155', 'M1-161', 'M1-162', 'M1-163', 'M1-169',
];
const wikiTitles = [
  'Lead Capture', 'Outreach Sequence', 'Client Communication Log', 'Qualification and Discovery',
  'Sales Materials and Scripts', 'Proposal Workflow', 'CRM Pipeline Stages', 'Client Onboarding',
  'Implementation Bundle Delivery', 'Training Day Readiness', 'Go-Live Verification', 'Mission Control',
];
const crossLinkStart = '<!-- wiki-cross-links:start -->';
const canonicalTasks = CANONICAL_LAUNCH_TASKS.filter((task) => taskKeys.has(task.taskKey));
if (canonicalTasks.length !== taskKeys.size) {
  const found = new Set(canonicalTasks.map((task) => task.taskKey));
  throw new Error(`Missing canonical tasks: ${[...taskKeys].filter((taskKey) => !found.has(taskKey)).join(', ')}`);
}

const { data: milestones, error: milestoneError } = await db.from('launch_milestones').select('id,slug');
fail('Read milestones', milestoneError);
const milestoneBySlug = new Map((milestones || []).map((row) => [row.slug, row.id]));
const m2Id = milestoneBySlug.get('m2-mock-run-complete');
if (!m2Id) throw new Error('Missing M2 milestone');

const { data: pages, error: pageError } = await db.from('wiki_pages').select('*').in('title', wikiTitles);
fail('Read Wiki pages', pageError);
const pageByTitle = new Map((pages || []).map((page) => [page.title, page]));
const missingPages = wikiTitles.filter((title) => !pageByTitle.has(title));
if (missingPages.length) throw new Error(`Missing Wiki pages: ${missingPages.join(', ')}`);

const allKeys = [...taskKeys, ...movedTrainingKeys];
const { data: beforeTasks, error: taskError } = await db.from('launch_tasks_v2').select('*').in('task_key', allKeys);
fail('Read affected tasks', taskError);
const beforeByKey = new Map((beforeTasks || []).map((task) => [task.task_key, task]));
const affectedIds = (beforeTasks || []).map((task) => task.id);
const { data: beforeDependencies, error: dependencyError } = affectedIds.length
  ? await db.from('launch_task_dependencies').select('*').in('task_id', affectedIds)
  : { data: [], error: null };
fail('Read affected dependencies', dependencyError);
const backupPath = `/tmp/blockops-before-m1-seven-lead-sync-${Date.now()}.json`;
if (!verifyOnly) writeFileSync(backupPath, JSON.stringify({ tasks: beforeTasks, dependencies: beforeDependencies, pages }, null, 2));

if (!verifyOnly) {
  const payload = canonicalTasks.map((task) => {
    const existing = beforeByKey.get(task.taskKey);
    const wikiTitle = getPrimaryWikiPageTitle(task);
    const wikiPageId = pageByTitle.get(wikiTitle)?.id;
    if (!wikiPageId) throw new Error(`No Wiki page mapping for ${task.taskKey}: ${wikiTitle}`);
    return {
      task_key: task.taskKey,
      title: task.title,
      description: task.description,
      primary_owner: task.primaryOwner,
      status: task.status,
      priority: task.priority,
      workstream: task.workstream,
      milestone_id: milestoneBySlug.get(task.milestoneSlug),
      compliance_flag: Boolean(task.complianceFlag),
      legal_gate_flag: Boolean(task.legalGateFlag),
      changed_by_new_info: Boolean(task.changedByNewInfo),
      sort_order: task.sortOrder ?? 0,
      primary_wiki_page_id: wikiPageId,
      completed_at: task.status === 'done' ? (existing?.completed_at || new Date().toISOString()) : existing?.completed_at || null,
    };
  });
  const { error } = await db.from('launch_tasks_v2').upsert(payload, { onConflict: 'task_key' });
  fail('Upsert affected canonical tasks', error);

  for (const taskKey of movedTrainingKeys) {
    const existing = beforeByKey.get(taskKey);
    if (!existing) throw new Error(`Missing live-only training task ${taskKey}`);
    const note = 'Moved to M2 on 2026-07-21: M1 requires training scheduling and handoff only. Detailed training materials, people/access readiness, event preparation, readiness review, execution, completion evidence, and follow-up begin after M2 completes and organizes the deliverables and offering. Governed by M2-08.';
    const description = String(existing.description || '').includes('Moved to M2 on 2026-07-21')
      ? existing.description
      : `${note} ${existing.description || ''}`.trim();
    const { error } = await db.from('launch_tasks_v2').update({
      milestone_id: m2Id,
      status: 'locked',
      workstream: 'Training and Support',
      description,
      changed_by_new_info: true,
      primary_wiki_page_id: pageByTitle.get('Training Day Readiness').id,
    }).eq('task_key', taskKey);
    fail(`Move ${taskKey} to M2`, error);
  }

  const { data: afterTasks, error: afterTaskError } = await db.from('launch_tasks_v2').select('id,task_key').in('task_key', [...taskKeys]);
  fail('Read synced tasks for dependencies', afterTaskError);
  const idByKey = new Map((afterTasks || []).map((task) => [task.task_key, task.id]));
  const dependencyTargets = new Set(['M1-FST-02', 'M1-FST-03', 'M1-FST-04', 'M1-FST-05', 'M1-FST-06', 'M1-FST-07', 'M1-FST-08', 'M1-FST-09', 'M1-FST-10', 'M1-FST-11', 'M1-FST-12', 'M1-FST-13', 'M2-08']);
  const targetIds = [...dependencyTargets].map((taskKey) => idByKey.get(taskKey)).filter(Boolean);
  if (targetIds.length) {
    const { error } = await db.from('launch_task_dependencies').delete().in('task_id', targetIds);
    fail('Delete affected dependencies', error);
  }
  const edges = CANONICAL_LAUNCH_DEPENDENCIES.filter((edge) => dependencyTargets.has(edge.taskKey));
  const neededKeys = [...new Set(edges.flatMap((edge) => [edge.taskKey, edge.dependsOnTaskKey]))];
  const { data: edgeTasks, error: edgeTaskError } = await db.from('launch_tasks_v2').select('id,task_key').in('task_key', neededKeys);
  fail('Read dependency task IDs', edgeTaskError);
  const edgeIdByKey = new Map((edgeTasks || []).map((task) => [task.task_key, task.id]));
  const dependencyPayload = edges.map((edge) => ({
    task_id: edgeIdByKey.get(edge.taskKey),
    depends_on_task_id: edgeIdByKey.get(edge.dependsOnTaskKey),
    dependency_type: edge.dependencyType,
  }));
  if (dependencyPayload.some((row) => !row.task_id || !row.depends_on_task_id)) throw new Error('Missing task ID in dependency payload');
  if (dependencyPayload.length) {
    const { error } = await db.from('launch_task_dependencies').insert(dependencyPayload);
    fail('Insert affected dependencies', error);
  }

  const staticByTitle = new Map(WIKI_LIBRARY_ITEMS.map((page) => [page.title, page]));
  for (const title of wikiTitles) {
    const current = pageByTitle.get(title);
    const staticPage = staticByTitle.get(title);
    if (!staticPage?.content) throw new Error(`Missing static Wiki content for ${title}`);
    const currentSuffixAt = String(current.body_md || '').indexOf(crossLinkStart);
    const suffix = currentSuffixAt >= 0 ? String(current.body_md).slice(currentSuffixAt).trim() : '';
    const body = suffix ? `${String(staticPage.content).trim()}\n\n${suffix}` : String(staticPage.content).trim();
    const { error } = await db.from('wiki_pages').update({ body_md: body, updated_at: new Date().toISOString() }).eq('id', current.id);
    fail(`Publish ${title}`, error);
  }
}

const { data: finalTasks, error: finalTaskError } = await db.from('launch_tasks_v2')
  .select('id,task_key,title,description,primary_owner,status,workstream,milestone_id,primary_wiki_page_id')
  .in('task_key', allKeys);
fail('Verify tasks', finalTaskError);
const finalByKey = new Map((finalTasks || []).map((task) => [task.task_key, task]));
const finalFstIds = (finalTasks || []).filter((task) => task.task_key.startsWith('M1-FST-')).map((task) => task.id);
const { data: finalDeps, error: finalDepError } = await db.from('launch_task_dependencies')
  .select('task_id,depends_on_task_id,dependency_type').in('task_id', finalFstIds);
fail('Verify dependencies', finalDepError);
const { data: finalPages, error: finalPageError } = await db.from('wiki_pages').select('title,body_md,status,owner').in('title', wikiTitles);
fail('Verify Wiki pages', finalPageError);

const finalStaticByTitle = new Map(WIKI_LIBRARY_ITEMS.map((page) => [page.title, page]));
const liveBodyWithoutManagedLinks = (body = '') => {
  const index = String(body).indexOf(crossLinkStart);
  return (index >= 0 ? String(body).slice(0, index) : String(body)).trim();
};

const checks = {
  allCanonicalTasksPresent: [...taskKeys].every((taskKey) => finalByKey.has(taskKey)),
  approvedSetDone: finalByKey.get('M1-FST-05')?.status === 'done',
  sevenLeadMarkers: ['M1-FST-03','M1-FST-04','M1-FST-07','M1-FST-08','M1-FST-09','M1-FST-10','M1-FST-11'].every((taskKey) => finalByKey.has(taskKey)),
  duplicateTaskPresent: finalByKey.has('M1-FST-12'),
  retestTaskPresent: finalByKey.has('M1-FST-13'),
  movedTrainingTasksInM2: movedTrainingKeys.every((taskKey) => finalByKey.get(taskKey)?.milestone_id === m2Id && finalByKey.get(taskKey)?.status === 'locked'),
  trainingBoundaryPublished: finalPages.find((page) => page.title === 'Training Day Readiness')?.body_md?.includes('M1 does not finalize or test the training agenda'),
  sevenLeadWikiPublished: finalPages.find((page) => page.title === 'Lead Capture')?.body_md?.includes('seven-lead set'),
  goLiveMockBoundaryPublished: finalPages.find((page) => page.title === 'Go-Live Verification')?.body_md?.includes('M1 training exception approved 2026-07-21'),
  pageMetadataPreserved: finalPages.every((page) => page.status && page.owner),
  crossLinksPreserved: finalPages.every((page) => page.body_md?.includes(crossLinkStart)),
  wikiSourceBodiesMatch: finalPages.every((page) => liveBodyWithoutManagedLinks(page.body_md) === String(finalStaticByTitle.get(page.title)?.content || '').trim()),
  dependencyCount: finalDeps?.length || 0,
};
console.log(JSON.stringify({ verifyOnly, backupPath: verifyOnly ? null : backupPath, checks, tasks: [...taskKeys].sort(), movedTrainingKeys }, null, 2));
if (Object.entries(checks).some(([key, value]) => key !== 'dependencyCount' && value !== true) || checks.dependencyCount < 18) process.exitCode = 1;
