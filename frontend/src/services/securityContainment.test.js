import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (relativePath) => readFile(new URL(relativePath, import.meta.url), 'utf8');

test('runtime keeps internal Wiki and canonical Mission Control bodies out of the public bundle graph', async () => {
  const [libraryPage, launchService, launchTransforms, tasksPage] = await Promise.all([
    read('../pages/KnowledgeLibraryPage.jsx'),
    read('./launchOpsService.js'),
    read('./launchOpsTransforms.js'),
    read('../pages/TasksPage.jsx'),
  ]);

  assert.doesNotMatch(libraryPage, /wikiLibraryItems|WIKI_LIBRARY_ITEMS|LAST_PROTOCOL_CONTENT_UNUSED/);
  assert.doesNotMatch(launchService, /launchOpsCanonicalSeed|launchOpsMerge/);
  assert.doesNotMatch(launchTransforms, /launchOpsCanonicalSeed/);
  assert.doesNotMatch(tasksPage, /launchOpsCanonicalSeed/);
});

test('Mission Control route uses the live internal-role guard', async () => {
  const app = await read('../App.jsx');
  assert.match(app, /<InternalRoute><TasksPage \/><\/InternalRoute>/);
});

test('containment migration revokes anonymous access and covers Wiki and Mission Control tables', async () => {
  const sql = await read('../../../security-internal-role-containment.sql');
  assert.match(sql, /revoke all on table public\.%I from anon/i);
  assert.match(sql, /is_internal_user/i);

  for (const table of [
    'wiki_sections',
    'wiki_pages',
    'wiki_page_links',
    'launch_milestones',
    'launch_tasks',
    'launch_tasks_v2',
    'launch_task_collaborators',
    'launch_task_dependencies',
    'launch_milestone_dependencies',
    'weekly_agendas',
  ]) {
    assert.match(sql, new RegExp(`'${table}'`));
  }
});
