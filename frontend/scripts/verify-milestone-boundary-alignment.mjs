#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import {
  CANONICAL_MILESTONE_DEPENDENCIES,
  MILESTONE_BOUNDARY_DEPENDENCIES,
  MILESTONE_BOUNDARY_TASKS,
} from '../src/services/milestoneBoundaryTaskSeed.js';
import { getPrimaryWikiPageTitle } from '../src/services/missionControlWikiLinks.js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
if (!url || !key) throw new Error('Supabase URL and service key are required');
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const fail = (label, error) => { if (error) throw new Error(`${label}: ${error.message}`); };

const [milestoneResult, taskResult, dependencyResult, milestoneDependencyResult, wikiResult] = await Promise.all([
  client.from('launch_milestones').select('id, slug, title, status, sort_order').order('sort_order'),
  client.from('launch_tasks_v2').select('id, task_key, title, description, primary_owner, status, workstream, milestone_id, sort_order, primary_wiki_page_id'),
  client.from('launch_task_dependencies').select('task_id, depends_on_task_id, dependency_type'),
  client.from('launch_milestone_dependencies').select('milestone_id, depends_on_milestone_id'),
  client.from('wiki_pages').select('id, title, status, body_md'),
]);
for (const [label, result] of [['milestones', milestoneResult], ['tasks', taskResult], ['task dependencies', dependencyResult], ['milestone dependencies', milestoneDependencyResult], ['Wiki', wikiResult]]) fail(label, result.error);

const milestones = milestoneResult.data || [];
const tasks = taskResult.data || [];
const dependencies = dependencyResult.data || [];
const milestoneDependencies = milestoneDependencyResult.data || [];
const wikiPages = wikiResult.data || [];
const milestoneById = new Map(milestones.map((row) => [row.id, row]));
const taskById = new Map(tasks.map((row) => [row.id, row]));
const taskByKey = new Map(tasks.map((row) => [row.task_key, row]));
const wikiById = new Map(wikiPages.map((row) => [row.id, row]));

const liveEdges = dependencies.map((row) => ({
  taskKey: taskById.get(row.task_id)?.task_key,
  dependsOnTaskKey: taskById.get(row.depends_on_task_id)?.task_key,
  dependencyType: row.dependency_type,
}));
const expectedDependencyType = (taskKey, dependsOnTaskKey) => MILESTONE_BOUNDARY_DEPENDENCIES
  .find((edge) => edge.taskKey === taskKey && edge.dependsOnTaskKey === dependsOnTaskKey)?.dependencyType;
const hasEdge = (taskKey, dependsOnTaskKey, dependencyType = null) => liveEdges
  .some((edge) => edge.taskKey === taskKey && edge.dependsOnTaskKey === dependsOnTaskKey
    && (!dependencyType || edge.dependencyType === dependencyType));
const requiredEdges = [
  ['M1-PAY-02', 'M1-PAY-01'],
  ['M1-104', 'M1-PAY-02'],
  ['M2-OPS-03', 'M2-OPS-01'],
  ['M2-OPS-03', 'M2-OPS-02'],
  ['M2-16', 'M2-OPS-04'],
  ['M3-EXEC-01', 'M2-16'],
  ['M3-15', 'M3-EXEC-01'],
  ['M4-01', 'M3-16'],
  ['M5-01', 'M4-05'],
  ['M5-05', 'M5-04'],
];
const missingRequiredEdges = requiredEdges.filter(([taskKey, dependsOnTaskKey]) => !hasEdge(
  taskKey,
  dependsOnTaskKey,
  expectedDependencyType(taskKey, dependsOnTaskKey),
));
const forbiddenSerialEdges = [];
for (let sequence = 5; sequence <= 15; sequence += 1) {
  const taskKey = `M2-${String(sequence).padStart(2, '0')}`;
  const dependsOnTaskKey = `M2-${String(sequence - 1).padStart(2, '0')}`;
  if (hasEdge(taskKey, dependsOnTaskKey)) forbiddenSerialEdges.push([taskKey, dependsOnTaskKey]);
}

const boundaryKeys = MILESTONE_BOUNDARY_TASKS.map((task) => task.taskKey);
const missingBoundaryTasks = boundaryKeys.filter((taskKey) => !taskByKey.has(taskKey));
const boundaryTaskIssues = MILESTONE_BOUNDARY_TASKS.flatMap((expected) => {
  const task = taskByKey.get(expected.taskKey);
  if (!task) return [];
  return [
    task.primary_owner !== expected.primaryOwner && `${expected.taskKey}:owner`,
    task.title !== expected.title && `${expected.taskKey}:title`,
    task.description !== expected.description && `${expected.taskKey}:description`,
    task.workstream !== expected.workstream && `${expected.taskKey}:workstream`,
    task.status !== expected.status && `${expected.taskKey}:status`,
    milestoneById.get(task.milestone_id)?.slug !== expected.milestoneSlug && `${expected.taskKey}:milestone`,
    wikiById.get(task.primary_wiki_page_id)?.title !== getPrimaryWikiPageTitle(expected)
      && `${expected.taskKey}:wiki`,
  ].filter(Boolean);
});

const graph = new Map();
for (const edge of liveEdges) {
  if (!edge.taskKey || !edge.dependsOnTaskKey) continue;
  if (!graph.has(edge.taskKey)) graph.set(edge.taskKey, []);
  graph.get(edge.taskKey).push(edge.dependsOnTaskKey);
}
const visiting = new Set();
const visited = new Set();
const cycles = [];
const visit = (taskKey, path = []) => {
  if (visiting.has(taskKey)) { cycles.push([...path, taskKey]); return; }
  if (visited.has(taskKey)) return;
  visiting.add(taskKey);
  for (const parent of graph.get(taskKey) || []) visit(parent, [...path, taskKey]);
  visiting.delete(taskKey);
  visited.add(taskKey);
};
for (const taskKey of taskByKey.keys()) visit(taskKey);

const liveMilestoneEdges = milestoneDependencies.map((row) => ({
  milestoneSlug: milestoneById.get(row.milestone_id)?.slug,
  dependsOnMilestoneSlug: milestoneById.get(row.depends_on_milestone_id)?.slug,
}));
const missingMilestoneEdges = CANONICAL_MILESTONE_DEPENDENCIES.filter((expected) => !liveMilestoneEdges.some((actual) => actual.milestoneSlug === expected.milestoneSlug && actual.dependsOnMilestoneSlug === expected.dependsOnMilestoneSlug));
const canonicalMilestoneSlugs = new Set(CANONICAL_MILESTONE_DEPENDENCIES.map((edge) => edge.milestoneSlug));
const extraMilestoneEdges = liveMilestoneEdges.filter((actual) => canonicalMilestoneSlugs.has(actual.milestoneSlug)
  && !CANONICAL_MILESTONE_DEPENDENCIES.some((expected) => expected.milestoneSlug === actual.milestoneSlug
    && expected.dependsOnMilestoneSlug === actual.dependsOnMilestoneSlug));

const wikiTitles = [
  'Foundational Client Readiness and Completion Matrix',
  'Site Readiness Assessment',
  'Equipment, Cart, Supply, and Restocking Standard',
  'Training Day Readiness',
  'Go-Live Verification',
  'Legal Review Index',
  'Client Onboarding',
];
const wikiChecks = wikiTitles.map((title) => {
  const page = wikiPages.find((candidate) => candidate.title === title);
  return { title, exists: Boolean(page), boundary: /Milestone (application|ladder)|approved 2026-07-19/i.test(page?.body_md || ''), status: page?.status || null };
});

const hardParentsByTask = new Map();
for (const row of dependencies) {
  const task = taskById.get(row.task_id);
  const parent = taskById.get(row.depends_on_task_id);
  if (!task || !parent) continue;
  if (!hardParentsByTask.has(task.task_key)) hardParentsByTask.set(task.task_key, []);
  hardParentsByTask.get(task.task_key).push(parent);
}
const m1 = milestones.find((milestone) => milestone.slug === 'm1-mock-run-build-ready');
const nextSamirTasks = tasks
  .filter((task) => task.milestone_id === m1?.id && task.primary_owner === 'Samir' && ['review', 'ready', 'in_progress'].includes(task.status))
  .map((task) => ({ ...task, unmet: (hardParentsByTask.get(task.task_key) || []).filter((parent) => parent.status !== 'done') }))
  .filter((task) => task.unmet.length === 0)
  .sort((left, right) => left.sort_order - right.sort_order || left.task_key.localeCompare(right.task_key))
  .slice(0, 5)
  .map((task) => ({ taskKey: task.task_key, title: task.title, status: task.status, sortOrder: task.sort_order }));

const milestoneCounts = milestones.map((milestone) => {
  const milestoneTasks = tasks.filter((task) => task.milestone_id === milestone.id);
  return {
    title: milestone.title,
    total: milestoneTasks.length,
    statuses: Object.fromEntries([...new Set(milestoneTasks.map((task) => task.status))].sort().map((status) => [status, milestoneTasks.filter((task) => task.status === status).length])),
  };
});

const report = {
  milestoneCounts,
  taskDependencies: dependencies.length,
  milestoneDependencies: liveMilestoneEdges,
  boundaryTasks: { expected: boundaryKeys.length, present: boundaryKeys.length - missingBoundaryTasks.length, missing: missingBoundaryTasks, issues: boundaryTaskIssues },
  missingRequiredEdges,
  forbiddenSerialEdges,
  taskDependencyCycles: cycles,
  missingMilestoneEdges,
  extraMilestoneEdges,
  wikiChecks,
  nextSamirTasks,
};
console.log(JSON.stringify(report, null, 2));

const failed = missingBoundaryTasks.length || boundaryTaskIssues.length || missingRequiredEdges.length
  || forbiddenSerialEdges.length || cycles.length || missingMilestoneEdges.length
  || extraMilestoneEdges.length
  || wikiChecks.some((page) => !page.exists || !page.boundary);
if (failed) process.exitCode = 1;
