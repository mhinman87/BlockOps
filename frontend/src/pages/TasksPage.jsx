import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useUserRole } from '../hooks/useUserRole';
import {
  Lock, Search, Users, AlertTriangle, ChevronDown, X, Layers3, ShieldAlert, Scale, BookOpen,
} from 'lucide-react';
import {
  dashboardCard,
  dashboardChip,
  dashboardInput,
  dashboardPageSubtitle,
  dashboardPageTitle,
  dashboardSurfaceMuted,
} from '../services/dashboardTheme.js';
import {
  buildLaunchOpsSnapshot,
  fetchLaunchBoard,
  recomputeLaunchOpsAfterTaskUpdate,
  updateLaunchTask,
} from '../services/launchOpsService.js';


const OWNERS = ['All', 'Max', 'Samir', 'Adrian', 'Bloq'];
const STATUSES = ['in_progress', 'ready', 'review', 'waiting', 'locked', 'blocked', 'done', 'dropped'];
const PRIORITIES = ['critical', 'high', 'medium', 'low'];
const MUTABLE_STATUSES = ['in_progress', 'ready', 'waiting', 'review', 'done', 'blocked', 'dropped'];

// Tasks sort within a workflow: active → ready → blocked → done.
const STATUS_BUCKET = {
  in_progress: 'active', review: 'active', waiting: 'active',
  ready: 'ready',
  locked: 'blocked', blocked: 'blocked',
  done: 'done', dropped: 'done',
};
const BUCKET_RANK = { active: 0, ready: 1, blocked: 2, done: 3 };
const PRIORITY_RANK = { critical: 0, high: 1, medium: 2, low: 3 };

const statusTone = {
  in_progress: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  locked: 'bg-gray-200 text-gray-600',
  blocked: 'bg-red-100 text-red-700',
  waiting: 'bg-purple-100 text-purple-700',
  review: 'bg-cyan-100 text-cyan-700',
  done: 'bg-gray-100 text-gray-500',
  dropped: 'bg-gray-100 text-gray-400',
};

const priorityTone = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
};

const ownerDot = {
  Max: 'bg-indigo-500',
  Samir: 'bg-cyan-500',
  Adrian: 'bg-amber-500',
  Bloq: 'bg-primary',
};

const humanize = (value) => (value || '').replaceAll('_', ' ');
const isLocked = (task) => task.computedStatus === 'locked';

const selectClass = 'px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg text-xs font-semibold bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200 focus:outline-none focus:border-primary cursor-pointer';

const sortTasks = (tasks) => [...tasks].sort((a, b) => (
  (BUCKET_RANK[STATUS_BUCKET[a.computedStatus] || 'active'] - BUCKET_RANK[STATUS_BUCKET[b.computedStatus] || 'active'])
  || ((PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9))
  || ((a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  || a.title.localeCompare(b.title)
));

export const TasksPage = () => {
  const { isTeam } = useUserRole();
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [syncNote, setSyncNote] = useState('');

  const [filterOwner, setFilterOwner] = useState('All');
  const [filterMilestone, setFilterMilestone] = useState('All');
  const [filterWorkflow, setFilterWorkflow] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [openMilestones, setOpenMilestones] = useState([]);
  const [hasSeededOpen, setHasSeededOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const board = await fetchLaunchBoard({ weekOf: '2026-06-01' });
        if (!active) return;
        setMilestones(board.milestones);
        setTasks(board.tasks);
        setAgenda(board.agenda);
        setSyncNote(board.errors ? 'Showing the canonical structure — live sync was partial.' : '');
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Failed to load Mission Control.');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const snapshot = useMemo(() => buildLaunchOpsSnapshot({ milestones, tasks, agenda }), [milestones, tasks, agenda]);
  const currentMilestone = snapshot.currentMilestone;

  useEffect(() => {
    if (hasSeededOpen || !currentMilestone) return;
    setOpenMilestones([currentMilestone.id]);
    setHasSeededOpen(true);
  }, [currentMilestone, hasSeededOpen]);

  const dependencyMap = useMemo(
    () => Object.fromEntries(tasks.map((task) => [task.id, task.dependencies || []])),
    [tasks],
  );
  const taskById = useMemo(() => Object.fromEntries(tasks.map((task) => [task.id, task])), [tasks]);
  const selectedTask = selectedTaskId ? taskById[selectedTaskId] : null;

  const workflowOptions = useMemo(() => {
    return Array.from(new Set(tasks.map((task) => task.workstream).filter(Boolean)));
  }, [tasks]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    if (filterOwner !== 'All' && task.primaryOwner !== filterOwner) return false;
    if (filterMilestone !== 'All' && task.milestoneId !== filterMilestone) return false;
    if (filterWorkflow !== 'All' && task.workstream !== filterWorkflow) return false;
    if (filterStatus !== 'All' && task.computedStatus !== filterStatus) return false;
    if (filterPriority !== 'All' && task.priority !== filterPriority) return false;
    if (searchQuery) {
      const haystack = `${task.taskKey} ${task.title} ${task.description || ''} ${task.workstream || ''} ${task.primaryWikiPageTitle || ''}`.toLowerCase();
      if (!haystack.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  }), [tasks, filterOwner, filterMilestone, filterWorkflow, filterStatus, filterPriority, searchQuery]);

  const hasActiveFilters = filterOwner !== 'All' || filterMilestone !== 'All' || filterWorkflow !== 'All'
    || filterStatus !== 'All' || filterPriority !== 'All' || Boolean(searchQuery);

  // milestone -> workflow -> tasks
  const milestoneGroups = useMemo(() => milestones.map((milestone) => {
    const milestoneTasks = filteredTasks.filter((task) => task.milestoneId === milestone.id);
    const workflowOrder = Array.from(new Set(milestoneTasks.map((task) => task.workstream).filter(Boolean)));
    const workflows = workflowOrder
      .map((workflow) => ({ workflow, tasks: sortTasks(milestoneTasks.filter((task) => task.workstream === workflow)) }))
      .filter((group) => group.tasks.length > 0);
    const doneCount = milestoneTasks.filter((task) => task.computedStatus === 'done').length;
    const lockedCount = milestoneTasks.filter(isLocked).length;
    return {
      milestone,
      workflows,
      total: milestoneTasks.length,
      doneCount,
      lockedCount,
      progress: milestoneTasks.length === 0 ? 0 : Math.round((doneCount / milestoneTasks.length) * 100),
    };
  }), [milestones, filteredTasks]);

  const visibleGroups = milestoneGroups.filter((group) => group.total > 0 || (!hasActiveFilters));

  const handleStatusChange = async (task, nextStatus) => {
    setUpdatingTaskId(task.id);
    setError('');
    const updatedTask = { ...task, status: nextStatus, computedStatus: nextStatus };
    const recomputed = recomputeLaunchOpsAfterTaskUpdate({ previousTasks: tasks, updatedTask, dependencyMap, milestones });
    setTasks(recomputed.tasks);
    try {
      await updateLaunchTask({ task, updates: { status: nextStatus } });
    } catch (err) {
      setError(err?.message || 'Saved locally, but the live update failed.');
    } finally {
      setUpdatingTaskId('');
    }
  };

  const resetFilters = () => {
    setFilterOwner('All'); setFilterMilestone('All'); setFilterWorkflow('All');
    setFilterStatus('All'); setFilterPriority('All'); setSearchQuery('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className={dashboardPageTitle}>Mission Control</h1>
            <p className={dashboardPageSubtitle}>
              The working board — every milestone, workflow, task, dependency, and gate for Samir, Max, Adrian, and Hermes.
            </p>
          </div>
          {currentMilestone && (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Current: {currentMilestone.code ? `${currentMilestone.code} — ` : ''}{currentMilestone.title}
            </span>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-red-800">Mission Control hit an error</p>
              <p className="text-xs text-red-600 font-light mt-1">{error}</p>
            </div>
          </div>
        )}
        {syncNote && !error && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
            <AlertTriangle className="text-amber-500 flex-shrink-0" size={15} />
            <p className="text-xs text-amber-700 font-medium">{syncNote}</p>
          </div>
        )}

        {/* Filters */}
        <div className={`${dashboardCard} p-4 flex flex-wrap items-center gap-2.5`}>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className={`${dashboardInput} pl-9 w-56`}
            />
          </div>
          <select value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)} className={selectClass}>
            {OWNERS.map((owner) => <option key={owner} value={owner}>{owner === 'All' ? 'All owners' : owner}</option>)}
          </select>
          <select value={filterMilestone} onChange={(e) => setFilterMilestone(e.target.value)} className={selectClass}>
            <option value="All">All milestones</option>
            {milestones.map((milestone) => (
              <option key={milestone.id} value={milestone.id}>{milestone.code ? `${milestone.code} — ` : ''}{milestone.title}</option>
            ))}
          </select>
          <select value={filterWorkflow} onChange={(e) => setFilterWorkflow(e.target.value)} className={selectClass}>
            <option value="All">All workflows</option>
            {workflowOptions.map((workflow) => <option key={workflow} value={workflow}>{workflow}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={selectClass}>
            <option value="All">All statuses</option>
            {STATUSES.map((status) => <option key={status} value={status}>{humanize(status)}</option>)}
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className={selectClass}>
            <option value="All">All priorities</option>
            {PRIORITIES.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
          </select>
          {hasActiveFilters && (
            <button onClick={resetFilters} className={`${dashboardChip} px-3 py-1.5 rounded-full text-xs font-semibold`}>Clear</button>
          )}
        </div>

        {loading ? (
          <div className={`${dashboardCard} p-12 text-center text-gray-400 dark:text-gray-500`}>Loading Mission Control...</div>
        ) : visibleGroups.length === 0 ? (
          <div className={`${dashboardCard} p-12 text-center`}>
            <Layers3 className="text-gray-300 dark:text-gray-500 mx-auto mb-3" size={32} />
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">No tasks match these filters</p>
            <button onClick={resetFilters} className="text-xs text-primary font-semibold mt-2">Clear filters</button>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleGroups.map(({ milestone, workflows, total, doneCount, lockedCount, progress }) => {
              const isOpen = openMilestones.includes(milestone.id);
              const isCurrent = currentMilestone?.id === milestone.id;
              return (
                <div key={milestone.id} className={`${dashboardCard} overflow-hidden ${isCurrent ? 'ring-1 ring-primary/30' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenMilestones((current) => (
                      current.includes(milestone.id) ? current.filter((id) => id !== milestone.id) : [...current, milestone.id]
                    ))}
                    className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left hover:bg-black/[0.02] dark:hover:bg-white/5 transition"
                    aria-expanded={isOpen}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] ${isCurrent ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 dark:bg-dark-border dark:text-gray-400'}`}>
                          {milestone.code || '—'}
                        </span>
                        <h3 className="min-w-0 text-sm font-bold text-gray-900 dark:text-gray-100">{milestone.title}</h3>
                        {isCurrent && <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">Current</span>}
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-5">{milestone.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-dark-border/60 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:text-gray-300">Owner: {milestone.owner || '—'}</span>
                        <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-dark-border/60 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:text-gray-300">{total} tasks</span>
                        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">{doneCount} done</span>
                        {lockedCount > 0 && <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 text-[10px] font-semibold">{lockedCount} locked</span>}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      <span className="text-sm font-bold text-primary">{progress}%</span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 dark:border-dark-border px-4 py-4 space-y-4">
                      {workflows.length === 0 ? (
                        <p className="text-sm text-gray-400 dark:text-gray-500 font-light px-1">No tasks in this milestone yet.</p>
                      ) : workflows.map(({ workflow, tasks: workflowTasks }) => (
                        <div key={workflow}>
                          <div className="flex items-center gap-2 mb-2 px-1">
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">{workflow}</span>
                            <span className="text-[11px] text-gray-400 dark:text-gray-500">{workflowTasks.length}</span>
                          </div>
                          <div className="space-y-1.5">
                            {workflowTasks.map((task) => {
                              const locked = isLocked(task);
                              return (
                                <button
                                  key={task.id}
                                  onClick={() => setSelectedTaskId(task.id)}
                                  className={`w-full text-left rounded-xl border px-3 py-2.5 transition hover:border-primary/40 ${locked
                                    ? 'border-gray-200 dark:border-dark-border bg-gray-50/70 dark:bg-dark-border/20 opacity-70'
                                    : 'border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card'}`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{task.taskKey}</span>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusTone[task.computedStatus] || 'bg-gray-100 text-gray-600'}`}>{humanize(task.computedStatus)}</span>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityTone[task.priority] || 'bg-gray-100 text-gray-600'}`}>{task.priority}</span>
                                        {task.legalGateFlag && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">legal gate</span>}
                                        {task.complianceFlag && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700">compliance</span>}
                                      </div>
                                      <p className={`mt-1 text-sm font-semibold leading-5 ${locked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>{task.title}</p>
                                      <div className="mt-1.5 flex flex-wrap items-center gap-2.5 text-[11px] text-gray-500 dark:text-gray-400">
                                        <span className="inline-flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${ownerDot[task.primaryOwner] || 'bg-gray-400'}`} />{task.primaryOwner}</span>
                                        {task.collaborators?.length > 0 && <span className="inline-flex items-center gap-1"><Users size={11} /> {task.collaborators.join(', ')}</span>}
                                        {locked && task.blockingTaskIds?.length > 0 && (
                                          <span className="inline-flex items-center gap-1 text-gray-500"><Lock size={11} /> waiting on {task.blockingTaskIds.map((id) => taskById[id]?.taskKey || id).join(', ')}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!isTeam && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-amber-800">Internal working board</p>
              <p className="text-xs text-amber-600 font-light mt-1">Mission Control is for the internal team and may expose strategy, blockers, and legal/compliance gates.</p>
            </div>
          </div>
        )}
      </div>

      {/* Task detail side panel */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelectedTaskId('')} />
          <div className="relative h-full w-full max-w-md overflow-y-auto bg-white dark:bg-dark-card shadow-2xl border-l border-gray-200 dark:border-dark-border">
            <div className="flex items-start justify-between gap-3 border-b border-gray-100 dark:border-dark-border p-5">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{selectedTask.taskKey}</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight mt-0.5">{selectedTask.title}</h2>
              </div>
              <button onClick={() => setSelectedTaskId('')} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"><X size={18} /></button>
            </div>

            <div className="p-5 space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusTone[selectedTask.computedStatus] || 'bg-gray-100 text-gray-600'}`}>{humanize(selectedTask.computedStatus)}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityTone[selectedTask.priority] || 'bg-gray-100 text-gray-600'}`}>{selectedTask.priority}</span>
                {selectedTask.legalGateFlag && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 inline-flex items-center gap-1"><Scale size={12} /> legal gate</span>}
                {selectedTask.complianceFlag && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 inline-flex items-center gap-1"><ShieldAlert size={12} /> compliance</span>}
              </div>

              {selectedTask.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-6">{selectedTask.description}</p>
              )}

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-gray-400 dark:text-gray-500">Owner</dt><dd className="font-semibold text-gray-900 dark:text-gray-100">{selectedTask.primaryOwner}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-gray-400 dark:text-gray-500">Workflow</dt><dd className="font-semibold text-gray-900 dark:text-gray-100 text-right">{selectedTask.workstream}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-gray-400 dark:text-gray-500">Milestone</dt><dd className="font-semibold text-gray-900 dark:text-gray-100 text-right">{milestones.find((m) => m.id === selectedTask.milestoneId)?.code || ''} {milestones.find((m) => m.id === selectedTask.milestoneId)?.title || '—'}</dd></div>
                {selectedTask.collaborators?.length > 0 && (
                  <div className="flex justify-between gap-3"><dt className="text-gray-400 dark:text-gray-500">With</dt><dd className="font-semibold text-gray-900 dark:text-gray-100 text-right">{selectedTask.collaborators.join(', ')}</dd></div>
                )}
                {selectedTask.primaryWikiPageTitle && (
                  <div className="flex justify-between gap-3"><dt className="text-gray-400 dark:text-gray-500 inline-flex items-center gap-1"><BookOpen size={13} /> Wiki context</dt><dd className="font-semibold text-primary text-right">{selectedTask.primaryWikiPageTitle}</dd></div>
                )}
              </dl>

              {(selectedTask.blockingTaskIds?.length > 0 || selectedTask.softBlockedTaskIds?.length > 0) && (
                <div className={`p-3 rounded-lg ${dashboardSurfaceMuted}`}>
                  {selectedTask.blockingTaskIds?.length > 0 && (
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 inline-flex items-center gap-1.5"><Lock size={12} className="text-gray-500" /> Blocked until done: {selectedTask.blockingTaskIds.map((id) => taskById[id]?.taskKey || id).join(', ')}</p>
                  )}
                  {selectedTask.softBlockedTaskIds?.length > 0 && (
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mt-1">Soft blockers: {selectedTask.softBlockedTaskIds.map((id) => taskById[id]?.taskKey || id).join(', ')}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">Update status</label>
                <select
                  value={selectedTask.status}
                  onChange={(event) => handleStatusChange(selectedTask, event.target.value)}
                  disabled={updatingTaskId === selectedTask.id}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg text-sm bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200"
                >
                  {MUTABLE_STATUSES.map((status) => <option key={status} value={status}>{humanize(status)}</option>)}
                </select>
                {isLocked(selectedTask) && (
                  <p className="text-xs text-gray-400 mt-1.5">This task is locked by dependencies — its live status is “{humanize(selectedTask.status)}”.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
