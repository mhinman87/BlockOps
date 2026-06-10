import React, { useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useUserRole } from '../hooks/useUserRole';
import { Layers3, Lock, Search, Users, AlertTriangle, CheckCircle2, Clock, Rocket, Sparkles } from 'lucide-react';
import {
  dashboardCard,
  dashboardChip,
  dashboardChipActive,
  dashboardInput,
  dashboardPageSubtitle,
  dashboardPageTitle,
  dashboardSurfaceMuted,
} from '../services/dashboardTheme.js';
import {
  buildLaunchOpsSnapshot,
  fetchLaunchMilestones,
  fetchLaunchTasks,
  fetchWeeklyAgenda,
  recomputeLaunchOpsAfterTaskUpdate,
  updateLaunchTask,
} from '../services/launchOpsService.js';

const OWNERS = ['All', 'Max', 'Samir', 'Adrian', 'Bloq'];
const STATUS_ORDER = ['this_week', 'in_progress', 'ready', 'locked', 'blocked', 'waiting', 'review', 'done', 'dropped'];
const MUTABLE_STATUSES = ['this_week', 'in_progress', 'ready', 'waiting', 'review', 'done', 'blocked', 'dropped'];

const statusTone = {
  this_week: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  locked: 'bg-red-100 text-red-700',
  blocked: 'bg-red-100 text-red-700',
  waiting: 'bg-purple-100 text-purple-700',
  review: 'bg-cyan-100 text-cyan-700',
  done: 'bg-gray-100 text-gray-600',
  dropped: 'bg-gray-100 text-gray-500',
};

const priorityTone = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
};

const ownerDot = {
  Max: 'bg-blue-500',
  Samir: 'bg-green-500',
  Adrian: 'bg-amber-500',
  Bloq: 'bg-primary',
};

const humanize = (value) => value.replaceAll('_', ' ');
const parseLines = (value) => (value || '').split('\n').map((line) => line.trim()).filter(Boolean);

export const TasksPage = () => {
  const { isTeam } = useUserRole();
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterOwner, setFilterOwner] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState('');
  const [recentlyUnlocked, setRecentlyUnlocked] = useState([]);
  const [milestoneReadinessMap, setMilestoneReadinessMap] = useState({});

  useEffect(() => {
    let active = true;

    const loadLaunchOps = async () => {
      try {
        setLoading(true);
        setError('');

        const [loadedMilestones, loadedTasks, loadedAgenda] = await Promise.all([
          fetchLaunchMilestones(),
          fetchLaunchTasks(),
          fetchWeeklyAgenda({ weekOf: '2026-06-01' }),
        ]);

        if (!active) return;
        setMilestones(loadedMilestones);
        setTasks(loadedTasks);
        setAgenda(loadedAgenda);
        setMilestoneReadinessMap(Object.fromEntries(
          loadedMilestones.map((milestone) => [milestone.id, {
            milestoneId: milestone.id,
            slug: milestone.slug,
            title: milestone.title,
            totalTasks: loadedTasks.filter((task) => task.milestoneId === milestone.id).length,
            completedTasks: loadedTasks.filter((task) => task.milestoneId === milestone.id && task.computedStatus === 'done').length,
            lockedTasks: loadedTasks.filter((task) => task.milestoneId === milestone.id && task.computedStatus === 'locked').length,
            thisWeekTasks: loadedTasks.filter((task) => task.milestoneId === milestone.id && task.computedStatus === 'this_week').length,
            readinessPercent: loadedTasks.filter((task) => task.milestoneId === milestone.id).length === 0
              ? 0
              : Math.round((loadedTasks.filter((task) => task.milestoneId === milestone.id && task.computedStatus === 'done').length / loadedTasks.filter((task) => task.milestoneId === milestone.id).length) * 100),
          }]),
        ));
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Failed to load launch operating board.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadLaunchOps();
    return () => { active = false; };
  }, []);

  const snapshot = useMemo(() => buildLaunchOpsSnapshot({ milestones, tasks, agenda }), [milestones, tasks, agenda]);
  const currentMilestone = snapshot.currentMilestone;
  const currentReadiness = currentMilestone ? snapshot.readinessBySlug[currentMilestone.slug] : null;
  const blockedItems = parseLines(agenda?.blockedItems);
  const decisionsNeeded = parseLines(agenda?.decisionsNeeded);

  const dependencyMap = useMemo(() => Object.fromEntries(tasks.map((task) => [task.id, task.dependencies || []])), [tasks]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    if (filterOwner !== 'All' && task.primaryOwner !== filterOwner) return false;
    if (filterStatus !== 'All' && task.computedStatus !== filterStatus) return false;
    if (searchQuery) {
      const haystack = `${task.taskKey} ${task.title} ${task.description || ''}`.toLowerCase();
      if (!haystack.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  }), [tasks, filterOwner, filterStatus, searchQuery]);

  const groupedTasks = useMemo(() => {
    const groups = {};
    OWNERS.filter((owner) => owner !== 'All').forEach((owner) => { groups[owner] = []; });
    filteredTasks.forEach((task) => {
      if (!groups[task.primaryOwner]) groups[task.primaryOwner] = [];
      groups[task.primaryOwner].push(task);
    });
    return groups;
  }, [filteredTasks]);

  const milestoneById = useMemo(() => Object.fromEntries(milestones.map((milestone) => [milestone.id, milestone])), [milestones]);
  const taskById = useMemo(() => Object.fromEntries(tasks.map((task) => [task.id, task])), [tasks]);
  const totalTasks = tasks.length;
  const thisWeekTasks = snapshot.thisWeekTasks.length;
  const blockedTasks = snapshot.blockedTasks.length;

  const handleStatusChange = async (task, nextStatus) => {
    try {
      setUpdatingTaskId(task.id);
      setError('');
      const updatedTask = await updateLaunchTask({ taskId: task.id, updates: { status: nextStatus } });
      const recomputed = recomputeLaunchOpsAfterTaskUpdate({
        previousTasks: tasks,
        updatedTask,
        dependencyMap,
        milestones,
      });

      setTasks(recomputed.tasks);
      setRecentlyUnlocked(recomputed.unlockedTaskIds.map((id) => taskById[id]?.taskKey || id));
      setMilestoneReadinessMap(recomputed.milestoneReadinessMap);
    } catch (err) {
      setError(err?.message || 'Failed to update task status.');
    } finally {
      setUpdatingTaskId('');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className={dashboardPageTitle}>Dashboard Launch Board</h1>
          <p className={dashboardPageSubtitle}>
            Adaptive milestone, task, blocker, and coordination system for Samir, Max, Adrian, and Hermes.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-red-800">Launch board failed to load</p>
              <p className="text-xs text-red-600 font-light mt-1">{error}</p>
            </div>
          </div>
        )}

        {recentlyUnlocked.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-green-800">Newly unlocked tasks</p>
              <p className="text-xs text-green-700 font-light mt-1">{recentlyUnlocked.join(', ')}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className={`${dashboardCard} p-4`}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Current Gate</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{currentMilestone?.title || '—'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{currentMilestone?.status ? humanize(currentMilestone.status) : 'No active milestone'}</p>
          </div>
          <div className={`${dashboardCard} p-4`}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Total Tasks</p>
            <p className="text-2xl font-black text-gray-900 dark:text-gray-100">{totalTasks}</p>
          </div>
          <div className={`${dashboardCard} p-4`}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">This Week</p>
            <p className="text-2xl font-black text-amber-600">{thisWeekTasks}</p>
          </div>
          <div className={`${dashboardCard} p-4`}>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Blocked / Locked</p>
            <p className="text-2xl font-black text-red-600">{blockedTasks}</p>
          </div>
        </div>

        {currentMilestone && currentReadiness && (
          <div className={`${dashboardCard} p-5`}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Current Milestone Progress</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{currentMilestone.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{currentReadiness.completedTasks}/{currentReadiness.totalTasks}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">tasks complete</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-dark-bg rounded-full h-2 overflow-hidden">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${milestoneReadinessMap[currentMilestone.id]?.readinessPercent || currentMilestone.readinessScore || currentReadiness.readinessFromTasks}%` }}></div>
            </div>
            {currentMilestone.gateNotes && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{currentMilestone.gateNotes}</p>}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search adaptive tasks..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className={`${dashboardInput} pl-9 w-72`}
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Owner:</span>
            {OWNERS.map((owner) => (
              <button
                key={owner}
                onClick={() => setFilterOwner(owner)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${filterOwner === owner ? dashboardChipActive : dashboardChip}`}
              >
                {owner}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Status:</span>
            {['All', ...STATUS_ORDER].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${filterStatus === status ? dashboardChipActive : dashboardChip}`}
              >
                {status === 'All' ? status : humanize(status)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className={`${dashboardCard} p-12 text-center text-gray-400 dark:text-gray-500`}>Loading adaptive launch board...</div>
        ) : filteredTasks.length === 0 ? (
          <div className={`${dashboardCard} p-12 text-center`}>
            <Rocket className="text-gray-300 dark:text-gray-500 mx-auto mb-3" size={32} />
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">No adaptive tasks found</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Adjust filters or seed more tasks into the new launch ops system.</p>
          </div>
        ) : (
          OWNERS.filter((owner) => owner !== 'All' && groupedTasks[owner]?.length > 0).map((owner) => (
            <div key={owner} className={`${dashboardCard} overflow-hidden`}>
              <div className="px-5 py-3 border-b border-gray-100 dark:border-dark-border flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${ownerDot[owner]}`}></div>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{owner}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-light">({groupedTasks[owner].length})</span>
              </div>
              {groupedTasks[owner].map((task, index) => {
                const milestone = milestoneById[task.milestoneId];
                return (
                  <div
                    key={task.id}
                    className={`px-5 py-4 hover:bg-gray-50 dark:hover:bg-dark-border/30 transition ${index !== groupedTasks[owner].length - 1 ? 'border-b border-gray-50 dark:border-dark-border/40' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">{task.taskKey}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusTone[task.computedStatus] || 'bg-gray-100 text-gray-600'}`}>
                            {humanize(task.computedStatus)}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityTone[task.priority] || 'bg-gray-100 text-gray-600'}`}>
                            {task.priority}
                          </span>
                          {task.legalGateFlag && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">legal gate</span>
                          )}
                          {task.complianceFlag && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700">compliance</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-light mt-1">{task.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>Milestone: {milestone?.slug || '—'}</span>
                          <span>Workstream: {task.workstream}</span>
                          {task.collaborators.length > 0 && (
                            <span className="inline-flex items-center gap-1"><Users size={12} /> {task.collaborators.join(', ')}</span>
                          )}
                        </div>
                        {(task.blockingTaskIds.length > 0 || task.softBlockedTaskIds.length > 0) && (
                          <div className={`mt-3 p-3 ${dashboardSurfaceMuted}`}>
                            {task.blockingTaskIds.length > 0 && (
                              <p className="text-xs text-red-700 dark:text-red-300 font-medium">
                                Blocking dependencies: {task.blockingTaskIds.map((id) => taskById[id]?.taskKey || id).join(', ')}
                              </p>
                            )}
                            {task.softBlockedTaskIds.length > 0 && (
                              <p className="text-xs text-amber-700 dark:text-amber-300 font-medium mt-1">
                                Soft blockers: {task.softBlockedTaskIds.map((id) => taskById[id]?.taskKey || id).join(', ')}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <select
                          value={task.status}
                          onChange={(event) => handleStatusChange(task, event.target.value)}
                          disabled={updatingTaskId === task.id}
                          className="px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg text-xs bg-white dark:bg-dark-card text-gray-700 dark:text-gray-200"
                        >
                          {MUTABLE_STATUSES.map((status) => (
                            <option key={status} value={status}>{humanize(status)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${dashboardCard} p-5`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">Blocked Items</h2>
            <div className="space-y-2">
              {blockedItems.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500">No blocked agenda items loaded.</p>
              ) : blockedItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-dark-border/40 border border-red-100 dark:border-dark-border rounded-lg">
                  <Lock size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800 dark:text-gray-200 font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${dashboardCard} p-5`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">Decisions Needed</h2>
            <div className="space-y-2">
              {decisionsNeeded.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500">No pending decisions loaded.</p>
              ) : decisionsNeeded.map((item, index) => (
                <div key={index} className={`p-3 ${dashboardSurfaceMuted}`}>
                  <p className="text-sm text-gray-700 dark:text-gray-200 font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!isTeam && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-amber-800">Internal launch operating board</p>
              <p className="text-xs text-amber-600 font-light mt-1">This board is designed for internal team execution and may expose strategy, blockers, and legal/compliance gates.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
