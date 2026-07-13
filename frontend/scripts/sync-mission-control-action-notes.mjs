import { readFile } from 'node:fs/promises';
import process from 'node:process';

import { createClient } from '@supabase/supabase-js';

const verifyOnly = process.env.VERIFY_ONLY === '1';
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('SUPABASE_URL (or VITE_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY are required.');
}

const notes = JSON.parse(await readFile(
  new URL('./data/mission-control-action-notes-2026-07-12.json', import.meta.url),
  'utf8',
));
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const isBlank = (value) => !String(value || '').trim();
const taskKeys = notes.map((entry) => entry.task_key);
const { data: tasks, error: readError } = await supabase
  .from('launch_tasks_v2')
  .select('id, task_key, action_note')
  .in('task_key', taskKeys);
if (readError) throw readError;

const byKey = new Map(tasks.map((task) => [task.task_key, task]));
const missingTasks = notes.filter((entry) => !byKey.has(entry.task_key));
if (missingTasks.length) {
  throw new Error(`Action-note seed references missing task keys: ${missingTasks.map((entry) => entry.task_key).join(', ')}`);
}

const blank = notes.filter((entry) => isBlank(byKey.get(entry.task_key).action_note));
const divergent = notes.filter((entry) => {
  const stored = byKey.get(entry.task_key).action_note;
  return !isBlank(stored) && stored !== entry.action_note;
});

if (!verifyOnly) {
  for (const entry of blank) {
    const { error } = await supabase
      .from('launch_tasks_v2')
      .update({ action_note: entry.action_note })
      .eq('id', byKey.get(entry.task_key).id)
      .or('action_note.is.null,action_note.eq.');
    if (error) throw new Error(`${entry.task_key}: ${error.message}`);
  }
}

const { data: verified, error: verifyError } = await supabase
  .from('launch_tasks_v2')
  .select('task_key, action_note')
  .in('task_key', taskKeys);
if (verifyError) throw verifyError;
const verifiedByKey = new Map(verified.map((task) => [task.task_key, task.action_note]));
const stillBlank = notes.filter((entry) => isBlank(verifiedByKey.get(entry.task_key)));

console.log(JSON.stringify({
  mode: verifyOnly ? 'verify' : 'sync',
  seededNotes: notes.length,
  blankBefore: blank.length,
  preservedExistingDifferentNotes: divergent.length,
  stillBlank: stillBlank.length,
}, null, 2));

if (stillBlank.length) process.exitCode = 1;
