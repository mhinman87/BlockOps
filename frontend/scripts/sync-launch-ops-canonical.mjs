#!/usr/bin/env node

/**
 * Sync canonical Launch Ops milestones/tasks/collaborators/dependencies into Supabase.
 *
 * Required env:
 *   SUPABASE_URL or VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY
 *
 * Optional env:
 *   DRY_RUN=1       Print the plan without writing.
 *   VERIFY_ONLY=1   Read live rows and compare counts/statuses without writing.
 *
 * This script intentionally does not read or store secrets from files. Pass credentials
 * through your shell/CI secret manager only.
 */

import { createClient } from '@supabase/supabase-js';
import {
  CANONICAL_LAUNCH_MILESTONES,
  CANONICAL_LAUNCH_TASKS,
  CANONICAL_LAUNCH_DEPENDENCIES,
  CANONICAL_LAUNCH_COLLABORATORS,
} from '../src/services/launchOpsCanonicalSeed.js';
import { getPrimaryWikiPageTitle } from '../src/services/missionControlWikiLinks.js';
import { CANONICAL_MILESTONE_DEPENDENCIES } from '../src/services/milestoneBoundaryTaskSeed.js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const dryRun = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true';
const verifyOnly = process.env.VERIFY_ONLY === '1' || process.env.VERIFY_ONLY === 'true';

const requireEnv = () => {
  if (!supabaseUrl) throw new Error('SUPABASE_URL or VITE_SUPABASE_URL is required');
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY is required');
};

const failIfError = (label, { error }) => {
  if (error) throw new Error(`${label}: ${error.message}`);
};

const statusSummary = (rows) => rows.reduce((acc, row) => {
  const status = row.status || 'unknown';
  acc[status] = (acc[status] || 0) + 1;
  return acc;
}, {});

const milestoneRows = () => CANONICAL_LAUNCH_MILESTONES.map((milestone) => ({
  slug: milestone.slug,
  title: milestone.title,
  description: milestone.description,
  status: milestone.status,
  owner: milestone.owner,
  sort_order: milestone.sortOrder ?? 0,
  readiness_score: milestone.readinessScore ?? 0,
  gate_notes: milestone.gateNotes ?? null,
}));

const taskRows = (milestoneIdBySlug, wikiPageIdByTitle) => CANONICAL_LAUNCH_TASKS.map((task) => {
  const primaryWikiPageTitle = getPrimaryWikiPageTitle(task);
  const primaryWikiPageId = primaryWikiPageTitle ? wikiPageIdByTitle.get(primaryWikiPageTitle) : null;
  if (primaryWikiPageTitle && !primaryWikiPageId) {
    throw new Error(`Missing live Wiki target for ${task.taskKey}: ${primaryWikiPageTitle}`);
  }
  return {
    task_key: task.taskKey,
    title: task.title,
    description: task.description,
    primary_owner: task.primaryOwner,
    status: task.status,
    priority: task.priority,
    workstream: task.workstream,
    milestone_id: milestoneIdBySlug.get(task.milestoneSlug) ?? null,
    compliance_flag: Boolean(task.complianceFlag),
    legal_gate_flag: Boolean(task.legalGateFlag),
    changed_by_new_info: Boolean(task.changedByNewInfo),
    sort_order: task.sortOrder ?? 0,
    completed_at: task.status === 'done' ? new Date().toISOString() : null,
    ...(primaryWikiPageId ? { primary_wiki_page_id: primaryWikiPageId } : {}),
  };
});

const selectAll = async (client, table, columns = '*') => {
  const { data, error } = await client.from(table).select(columns);
  failIfError(`select ${table}`, { error });
  return data || [];
};

const verify = async (client) => {
  const [milestones, tasks, collaborators, dependencies, milestoneDependencies, wikiPages] = await Promise.all([
    selectAll(client, 'launch_milestones', 'id, slug, status'),
    selectAll(client, 'launch_tasks_v2', 'id, task_key, status, workstream, milestone_id, primary_wiki_page_id'),
    selectAll(client, 'launch_task_collaborators', 'task_id, collaborator'),
    selectAll(client, 'launch_task_dependencies', 'task_id, depends_on_task_id, dependency_type'),
    selectAll(client, 'launch_milestone_dependencies', 'milestone_id, depends_on_milestone_id'),
    selectAll(client, 'wiki_pages', 'id, title'),
  ]);

  const canonicalKeys = new Set(CANONICAL_LAUNCH_TASKS.map((task) => task.taskKey));
  const liveCanonicalTasks = tasks.filter((task) => canonicalKeys.has(task.task_key));
  const wikiTasks = liveCanonicalTasks
    .filter((task) => task.task_key?.startsWith('M1-WIKI-'))
    .sort((a, b) => a.task_key.localeCompare(b.task_key, undefined, { numeric: true }));
  const m1MilestoneId = milestones.find((milestone) => milestone.slug === 'm1-mock-run-build-ready')?.id;
  const m1Tasks = tasks.filter((task) => task.milestone_id === m1MilestoneId);
  const wikiTitleById = new Map(wikiPages.map((page) => [page.id, page.title]));
  const mismatchedM1WikiLinks = m1Tasks.filter((task) => {
    const expectedTitle = getPrimaryWikiPageTitle(task);
    return !expectedTitle || wikiTitleById.get(task.primary_wiki_page_id) !== expectedTitle;
  });

  const report = {
    canonical: {
      milestones: CANONICAL_LAUNCH_MILESTONES.length,
      tasks: CANONICAL_LAUNCH_TASKS.length,
      collaborators: CANONICAL_LAUNCH_COLLABORATORS.length,
      dependencies: CANONICAL_LAUNCH_DEPENDENCIES.length,
      taskStatusSummary: statusSummary(CANONICAL_LAUNCH_TASKS),
    },
    live: {
      milestones: milestones.length,
      tasks: tasks.length,
      canonicalTasksPresent: liveCanonicalTasks.length,
      extraLiveTasks: tasks.length - liveCanonicalTasks.length,
      collaborators: collaborators.length,
      dependencies: dependencies.length,
      milestoneDependencies: milestoneDependencies.length,
      canonicalTaskStatusSummary: statusSummary(liveCanonicalTasks),
      wikiTasks: wikiTasks.map((task) => ({
        taskKey: task.task_key,
        status: task.status,
        workstream: task.workstream,
      })),
      m1WikiContext: {
        total: m1Tasks.length,
        linked: m1Tasks.filter((task) => task.primary_wiki_page_id).length,
        correct: m1Tasks.length - mismatchedM1WikiLinks.length,
        mismatchedTaskKeys: mismatchedM1WikiLinks.map((task) => task.task_key),
      },
    },
    matches: {
      canonicalTasksPresent: liveCanonicalTasks.length === CANONICAL_LAUNCH_TASKS.length,
      wikiDoneThrough14: wikiTasks
        .filter((task) => /^M1-WIKI-(0[1-9]|1[0-4])$/.test(task.task_key))
        .every((task) => task.status === 'done'),
      wiki14Done: wikiTasks.some((task) => task.task_key === 'M1-WIKI-14' && task.status === 'done'),
      wikiCrossLinksDone: wikiTasks
        .filter((task) => /^M1-WIKI-LINK-0[1-5]$/.test(task.task_key))
        .length === 5
        && wikiTasks
          .filter((task) => /^M1-WIKI-LINK-0[1-5]$/.test(task.task_key))
          .every((task) => task.status === 'done'),
      allM1TasksHaveCorrectPrimaryWikiContext: m1Tasks.length > 0 && mismatchedM1WikiLinks.length === 0,
    },
  };

  console.log(JSON.stringify(report, null, 2));
  return report;
};

const sync = async () => {
  requireEnv();
  const client = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const plan = {
    milestones: CANONICAL_LAUNCH_MILESTONES.length,
    tasks: CANONICAL_LAUNCH_TASKS.length,
    collaborators: CANONICAL_LAUNCH_COLLABORATORS.length,
    dependencies: CANONICAL_LAUNCH_DEPENDENCIES.length,
    dryRun,
    verifyOnly,
  };
  console.log(JSON.stringify({ plan }, null, 2));

  if (verifyOnly) {
    await verify(client);
    return;
  }

  if (dryRun) return;

  const milestonePayload = milestoneRows();
  failIfError('upsert launch_milestones', await client
    .from('launch_milestones')
    .upsert(milestonePayload, { onConflict: 'slug' }));

  const milestones = await selectAll(client, 'launch_milestones', 'id, slug');
  const milestoneIdBySlug = new Map(milestones.map((milestone) => [milestone.slug, milestone.id]));

  const milestoneDependencyPayload = CANONICAL_MILESTONE_DEPENDENCIES.map((dependency) => ({
    milestone_id: milestoneIdBySlug.get(dependency.milestoneSlug),
    depends_on_milestone_id: milestoneIdBySlug.get(dependency.dependsOnMilestoneSlug),
  }));
  failIfError('upsert launch_milestone_dependencies', await client
    .from('launch_milestone_dependencies')
    .upsert(milestoneDependencyPayload, { onConflict: 'milestone_id,depends_on_milestone_id' }));
  const existingMilestoneDependencies = await selectAll(
    client,
    'launch_milestone_dependencies',
    'id, milestone_id, depends_on_milestone_id',
  );
  const canonicalMilestoneIds = new Set(milestoneDependencyPayload.map((row) => row.milestone_id));
  const desiredMilestoneEdges = new Set(milestoneDependencyPayload
    .map((row) => `${row.milestone_id}:${row.depends_on_milestone_id}`));
  const staleCanonicalMilestoneDependencyIds = existingMilestoneDependencies
    .filter((row) => canonicalMilestoneIds.has(row.milestone_id)
      && !desiredMilestoneEdges.has(`${row.milestone_id}:${row.depends_on_milestone_id}`))
    .map((row) => row.id);
  if (staleCanonicalMilestoneDependencyIds.length) {
    failIfError('delete stale canonical launch_milestone_dependencies', await client
      .from('launch_milestone_dependencies')
      .delete()
      .in('id', staleCanonicalMilestoneDependencyIds));
  }
  const wikiPages = await selectAll(client, 'wiki_pages', 'id, title');
  const wikiPageIdByTitle = new Map(wikiPages.map((page) => [page.title, page.id]));

  const taskPayload = taskRows(milestoneIdBySlug, wikiPageIdByTitle);
  failIfError('upsert launch_tasks_v2', await client
    .from('launch_tasks_v2')
    .upsert(taskPayload, { onConflict: 'task_key' }));

  const tasks = await selectAll(client, 'launch_tasks_v2', 'id, task_key, workstream, milestone_id, primary_wiki_page_id');
  const taskIdByKey = new Map(tasks.map((task) => [task.task_key, task.id]));

  // Preserve the expanded live catalog and apply the same governed mapping to
  // every M1 row, not only to the canonical baseline tasks.
  const m1MilestoneId = milestoneIdBySlug.get('m1-mock-run-build-ready');
  const expandedM1Tasks = tasks.filter((task) => task.milestone_id === m1MilestoneId);
  const expandedByWikiPageId = new Map();
  for (const task of expandedM1Tasks) {
    const title = getPrimaryWikiPageTitle(task);
    if (!title) throw new Error(`Expanded M1 task has no governed Wiki context: ${task.task_key}`);
    const pageId = wikiPageIdByTitle.get(title);
    if (!pageId) throw new Error(`Expanded M1 task ${task.task_key} links to missing Wiki page: ${title}`);
    if (!expandedByWikiPageId.has(pageId)) expandedByWikiPageId.set(pageId, []);
    expandedByWikiPageId.get(pageId).push(task.id);
  }
  for (const [pageId, taskIds] of expandedByWikiPageId) {
    failIfError(`link ${taskIds.length} M1 tasks to Wiki page ${pageId}`, await client
      .from('launch_tasks_v2')
      .update({ primary_wiki_page_id: pageId })
      .in('id', taskIds));
  }

  const canonicalTaskIds = CANONICAL_LAUNCH_TASKS
    .map((task) => taskIdByKey.get(task.taskKey))
    .filter(Boolean);
  if (canonicalTaskIds.length) {
    failIfError('delete canonical launch_task_collaborators', await client
      .from('launch_task_collaborators')
      .delete()
      .in('task_id', canonicalTaskIds));
    failIfError('delete canonical launch_task_dependencies', await client
      .from('launch_task_dependencies')
      .delete()
      .in('task_id', canonicalTaskIds));
  }

  const collaboratorPayload = CANONICAL_LAUNCH_COLLABORATORS
    .map(({ taskKey, collaborator }) => ({ task_id: taskIdByKey.get(taskKey), collaborator }))
    .filter((row) => row.task_id && row.collaborator);
  if (collaboratorPayload.length) {
    failIfError('insert launch_task_collaborators', await client
      .from('launch_task_collaborators')
      .insert(collaboratorPayload));
  }

  const dependencyPayload = CANONICAL_LAUNCH_DEPENDENCIES
    .map(({ taskKey, dependsOnTaskKey, dependencyType }) => ({
      task_id: taskIdByKey.get(taskKey),
      depends_on_task_id: taskIdByKey.get(dependsOnTaskKey),
      dependency_type: dependencyType || 'finish_to_start',
    }))
    .filter((row) => row.task_id && row.depends_on_task_id);
  if (dependencyPayload.length) {
    failIfError('upsert launch_task_dependencies', await client
      .from('launch_task_dependencies')
      .upsert(dependencyPayload, { onConflict: 'task_id,depends_on_task_id' }));
  }

  await verify(client);
};

sync().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
