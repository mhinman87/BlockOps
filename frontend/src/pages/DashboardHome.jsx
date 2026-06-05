import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  Layers3,
} from 'lucide-react';
import {
  dashboardCard,
  dashboardCardInteractive,
  dashboardPageSubtitle,
  dashboardPageTitle,
} from '../services/dashboardTheme.js';
import {
  buildLaunchOpsSnapshot,
  fetchLaunchMilestones,
  fetchLaunchTasks,
  fetchWeeklyAgenda,
} from '../services/launchOpsService.js';

const parseLines = (value) => (value || '')
  .replace(/\\n/g, '\n')
  .split(/\n+/)
  .map((line) => line.trim())
  .filter(Boolean);

const stripBulletPrefix = (value) => (value || '')
  .replace(/^\s*(?:[-•*]|\d+[.)])\s*/, '')
  .trim();

const capitalizeFirst = (value) => {
  const text = stripBulletPrefix(value);
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const taskPriorityRank = (priority) => {
  const normalized = (priority || '').toLowerCase();
  const order = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  return order[normalized] ?? 9;
};

const people = [
  {
    name: 'Samir',
    focusKey: 'samirFocus',
    accent: 'cyan',
    accentText: 'text-cyan-700 dark:text-cyan-300',
    accentBg: 'bg-cyan-50 dark:bg-cyan-500/10',
    accentRing: 'ring-cyan-200/70 dark:ring-cyan-400/30',
    accentBorder: 'border-cyan-200/70 dark:border-cyan-400/30',
    accentDot: 'bg-cyan-500',
  },
  {
    name: 'Max',
    focusKey: 'maxFocus',
    accent: 'indigo',
    accentText: 'text-indigo-700 dark:text-indigo-300',
    accentBg: 'bg-indigo-50 dark:bg-indigo-500/10',
    accentRing: 'ring-indigo-200/70 dark:ring-indigo-400/30',
    accentBorder: 'border-indigo-200/70 dark:border-indigo-400/30',
    accentDot: 'bg-indigo-500',
  },
  {
    name: 'Adrian',
    focusKey: 'adrianFocus',
    accent: 'amber',
    accentText: 'text-amber-700 dark:text-amber-300',
    accentBg: 'bg-amber-50 dark:bg-amber-500/10',
    accentRing: 'ring-amber-200/70 dark:ring-amber-400/30',
    accentBorder: 'border-amber-200/70 dark:border-amber-400/30',
    accentDot: 'bg-amber-500',
  },
];

const launchStageDefinitions = [
  {
    key: 'm1',
    phase: 'M1',
    title: 'Internal mock-run ready',
    description: 'The system is built enough to simulate a real client from start to finish without breaking.',
    owner: 'Max',
    milestoneSlugs: ['m1-mock-run-build-ready'],
  },
  {
    key: 'm2',
    phase: 'M2',
    title: 'Internal mock client run complete',
    description: 'The fake client actually runs through the system and the obvious problems get fixed.',
    owner: 'Max',
    milestoneSlugs: ['m2-mock-run-complete'],
  },
  {
    key: 'm3',
    phase: 'M3',
    title: 'Trusted clinical validation complete',
    description: 'Known anesthesiologists review the system, point out holes, and help stress-test it.',
    owner: 'Samir',
    milestoneSlugs: ['m3-trusted-anesthesiologist-validation', 'm4-validation-closed'],
  },
  {
    key: 'm4',
    phase: 'M4',
    title: 'Founding partner ready',
    description: 'The legal, clinical, and commercial package is safe and clear enough for a real founding partner.',
    owner: 'Adrian',
    milestoneSlugs: ['m5-founding-partner-ready'],
  },
  {
    key: 'm5',
    phase: 'M5',
    title: 'First founding partner live',
    description: 'The first founding partner is signed and actively onboarded in a working setup.',
    owner: 'Adrian',
    milestoneSlugs: ['m6-first-founding-partner-signed', 'm7-first-founding-partner-live'],
  },
  {
    key: 'm6',
    phase: 'M6',
    title: 'Paid-client ready',
    description: 'The system has proven enough that it can support a real paid client safely.',
    owner: 'Max',
    milestoneSlugs: ['m8-additional-founding-partners', 'm9-paid-client-readiness'],
  },
  {
    key: 'm7',
    phase: 'M7',
    title: 'First paid client',
    description: 'The first real paid client is signed and enters delivery.',
    owner: 'Adrian',
    milestoneSlugs: ['m10-first-paid-client'],
  },
];

const formatStatusLabel = (value) => (value || '').replaceAll('_', ' ');


export const DashboardHome = () => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openStageKeys, setOpenStageKeys] = useState([]);
  const [hasSeededAccordion, setHasSeededAccordion] = useState(false);

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
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Failed to load launch operating system.');
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
  const currentPriorities = people.map((person) => ({
    ...person,
    priority: stripBulletPrefix(parseLines(agenda?.[person.focusKey])[0] || 'Not set yet.'),
  }));
  const currentTasksByPerson = people.map((person) => {
    const ownerTasks = (snapshot.tasksByOwner[person.name] || [])
      .filter((task) => task.status !== 'done' && task.computedStatus !== 'done')
      .sort((a, b) => taskPriorityRank(a.priority) - taskPriorityRank(b.priority)
        || (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
        || a.title.localeCompare(b.title))
      .slice(0, 3);

    return {
      ...person,
      tasks: ownerTasks,
    };
  });
  const launchRisks = parseLines(agenda?.launchRisks).slice(0, 5);
  const decisionsNeeded = parseLines(agenda?.decisionsNeeded).slice(0, 3);

  const currentProgressPercent = currentMilestone
    ? (currentMilestone.readinessScore || currentReadiness?.readinessFromTasks || 0)
    : 0;
  const currentMilestoneDisplayTitle = currentMilestone?.title || '';
  const launchStages = useMemo(() => {
    const milestonesBySlug = Object.fromEntries(milestones.map((milestone) => [milestone.slug, milestone]));

    return launchStageDefinitions.map((stage) => {
      const stageMilestones = stage.milestoneSlugs
        .map((slug) => milestonesBySlug[slug])
        .filter(Boolean);
      const stageMilestoneIds = new Set(stageMilestones.map((milestone) => milestone.id));
      const stageTasks = tasks
        .filter((task) => stageMilestoneIds.has(task.milestoneId))
        .sort((a, b) => taskPriorityRank(a.priority) - taskPriorityRank(b.priority)
          || (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
          || a.title.localeCompare(b.title));
      const doneCount = stageTasks.filter((task) => task.computedStatus === 'done').length;
      const blockedCount = stageTasks.filter((task) => task.computedStatus === 'locked' || task.computedStatus === 'blocked').length;
      const totalTasks = stageTasks.length;

      return {
        ...stage,
        milestones: stageMilestones,
        tasks: stageTasks,
        totalTasks,
        doneCount,
        blockedCount,
        progress: totalTasks === 0 ? 0 : Math.round((doneCount / totalTasks) * 100),
      };
    });
  }, [milestones, tasks]);
  const currentStageKey = launchStages.find((stage) => stage.milestoneSlugs.includes(currentMilestone?.slug))?.key
    || launchStages[0]?.key
    || '';

  useEffect(() => {
    if (hasSeededAccordion || !currentStageKey) return;
    setOpenStageKeys([currentStageKey]);
    setHasSeededAccordion(true);
  }, [currentStageKey, hasSeededAccordion]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className={dashboardPageTitle}>
          Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className={dashboardPageSubtitle}>
          Dashboard internal workspace — live milestone, task, doc, and risk view.
        </p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-red-800">Launch ops failed to load</p>
            <p className="text-xs text-red-600 font-light mt-1">{error}</p>
          </div>
        </div>
      ) : currentMilestone ? (
        <Link
          to="/dashboard/tasks"
          className={`${dashboardCardInteractive} mb-6 block p-6 border-amber-200 bg-amber-50/70 dark:bg-dark-surface/80 hover:border-amber-300`}
          aria-label={`Open launch board for ${currentMilestone.title}`}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Current milestone</p>
              <h2
                className="mt-2 text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 leading-tight"
                title={currentMilestone.title}
              >
                {currentMilestoneDisplayTitle}
              </h2>
              <p className="mt-3 max-w-3xl text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light leading-6">
                {currentMilestone.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">
                  Status: {currentMilestone.status.replaceAll('_', ' ')}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/80 text-gray-700 px-3 py-1 text-xs font-semibold border border-amber-100">
                  {currentReadiness ? `${currentReadiness.completedTasks}/${currentReadiness.totalTasks} tasks complete` : 'No readiness data yet'}
                </span>
              </div>
              {currentMilestone.gateNotes && (
                <p className="mt-3 text-xs text-amber-700 font-light leading-5">
                  {currentMilestone.gateNotes}
                </p>
              )}
            </div>

            <div className="w-full max-w-md shrink-0 rounded-2xl bg-white/70 dark:bg-dark-bg/60 border border-amber-100 dark:border-dark-border p-4">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Readiness</span>
                <span className="text-sm font-bold text-primary">{currentProgressPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-dark-bg rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${currentProgressPercent}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-5">
                Click through to the launch board for the full task breakdown, blockers, and deeper milestone detail.
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <span>Open launch board</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        </Link>
      ) : null}

      <div className={`${dashboardCard} p-5 mb-6`}>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">Launch Gate Progress</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              7 stages. Expand each one to see the tasks, owners, and milestone details.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-dark-border bg-white/80 dark:bg-dark-bg/70 px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {launchStages.length} stages
          </span>
        </div>

        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-gray-400 dark:text-gray-500">Loading launch milestones...</p>
          ) : launchStages.map((stage) => {
            const isOpen = openStageKeys.includes(stage.key);

            return (
              <div
                key={stage.key}
                className={`overflow-hidden rounded-2xl border bg-white dark:bg-dark-card transition ${isOpen ? 'border-primary/30 shadow-sm' : 'border-gray-200 dark:border-dark-border'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenStageKeys((current) => (
                    current.includes(stage.key)
                      ? current.filter((key) => key !== stage.key)
                      : [...current, stage.key]
                  ))}
                  className="flex w-full items-start justify-between gap-4 p-4 text-left hover:bg-gray-50/80 dark:hover:bg-dark-border/30 transition"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                        {stage.phase}
                      </span>
                      <h3 className="min-w-0 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-5">
                      {stage.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-dark-border/60 px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        Lead: {stage.owner}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-dark-border/60 px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        {stage.totalTasks} tasks
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-dark-border/60 px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        {stage.doneCount} done
                      </span>
                      {stage.blockedCount > 0 && (
                        <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 text-[11px] font-semibold">
                          {stage.blockedCount} blocked
                        </span>
                      )}
                      <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold">
                        {stage.progress}% complete
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pt-1">
                    <span className="text-sm font-bold text-primary">{stage.progress}%</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200 dark:border-dark-border bg-gray-50/70 dark:bg-dark-bg/40 p-4 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {stage.milestones.map((milestone) => (
                        <span
                          key={milestone.id}
                          className="inline-flex items-center rounded-full border border-gray-200 dark:border-dark-border bg-white/90 dark:bg-dark-card px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:text-gray-300"
                        >
                          {milestone.title}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {stage.milestones.map((milestone) => {
                        const milestoneTasks = stage.tasks.filter((task) => task.milestoneId === milestone.id);

                        return (
                          <div key={milestone.id} className="rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card p-3">
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{milestone.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{milestoneTasks.length} task{milestoneTasks.length === 1 ? '' : 's'}</p>
                              </div>
                            </div>

                            {milestoneTasks.length === 0 ? (
                              <p className="text-sm text-gray-400 dark:text-gray-500 font-light">No tasks loaded for this phase yet.</p>
                            ) : (
                              <ol className="space-y-2">
                                {milestoneTasks.map((task) => (
                                  <li key={task.id} className="rounded-xl border border-gray-100 dark:border-dark-border bg-gray-50/80 dark:bg-dark-border/30 px-3 py-3">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-5">
                                          {capitalizeFirst(task.title)}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                          Owner: {task.primaryOwner}
                                          {task.collaborators?.length ? ` • Collaborators: ${task.collaborators.join(', ')}` : ''}
                                        </p>
                                      </div>
                                      <span className="shrink-0 rounded-full border border-gray-200 dark:border-dark-border bg-white/90 dark:bg-dark-card px-2.5 py-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                                        {formatStatusLabel(task.computedStatus || task.status)}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ol>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>



      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className={`${dashboardCard} p-5`}>
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Operator view</p>
              <h2 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">Current Priority</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                One live objective per person.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 items-stretch">
            {currentPriorities.map((person) => (
              <div
                key={person.name}
                className={`rounded-2xl border ${person.accentBorder} bg-white/90 dark:bg-dark-bg/70 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.03)]`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${person.accentBg} ${person.accentText} text-sm font-bold`}>
                      {person.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{person.name}</p>
                      <div className="mt-1 h-1.5 w-16 rounded-full bg-gray-100 dark:bg-dark-border overflow-hidden">
                        <div className={`h-full w-full rounded-full ${person.accentDot}`} />
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${person.accentText}`}>
                    Priority
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200 font-light leading-6">
                  {capitalizeFirst(person.priority)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${dashboardCard} p-5`}>
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Operator view</p>
              <h2 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">Current Tasks</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Top three active tasks per person.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 items-stretch">
            {currentTasksByPerson.map((person) => (
              <div
                key={person.name}
                className={`rounded-2xl border ${person.accentBorder} bg-white/90 dark:bg-dark-bg/70 px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.03)]`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${person.accentBg} ${person.accentText} text-sm font-bold`}>
                      {person.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{person.name}</p>
                      <p className={`text-[11px] uppercase tracking-[0.16em] ${person.accentText}`}>Top tasks</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500">
                    {person.tasks.length}/3
                  </span>
                </div>

                {person.tasks.length === 0 ? (
                  <p className="text-sm text-gray-400 dark:text-gray-500 font-light">No active tasks yet.</p>
                ) : (
                  <ol className="space-y-2">
                    {person.tasks.map((task, index) => (
                      <li
                        key={task.id}
                        className="flex items-start gap-3 rounded-xl border border-gray-100 dark:border-dark-border bg-gray-50/70 dark:bg-dark-border/30 px-3 py-2.5"
                      >
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${person.accentDot} text-[11px] font-semibold text-white`}>
                          {index + 1}
                        </span>
                        <p className="min-w-0 flex-1 text-sm font-semibold text-gray-900 dark:text-gray-100 leading-5">
                          {capitalizeFirst(task.title)}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className={`${dashboardCard} p-5`}>
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Risk watch</p>
              <h2 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">Launch Risks</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep this tight so it stays useful.</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {launchRisks.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">No launch risks loaded yet.</p>
            ) : launchRisks.map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border border-red-100 dark:border-dark-border bg-red-50/80 dark:bg-dark-border/40 px-3 py-3">
                <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800 dark:text-gray-200 font-light leading-6">{capitalizeFirst(item)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${dashboardCard} p-5`}>
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Decision gate</p>
              <h2 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">Decisions Needed</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Only the 3 biggest calls should live here.</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {decisionsNeeded.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">No pending decisions loaded yet.</p>
            ) : decisionsNeeded.map((item, index) => (
              <div key={index} className="rounded-xl border border-gray-100 dark:border-dark-border bg-gray-50/80 dark:bg-dark-border/30 px-3 py-3">
                <p className="text-sm text-gray-700 dark:text-gray-200 font-light leading-6">{capitalizeFirst(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/dashboard/tasks" className={`${dashboardCardInteractive} p-5 group`}>
          <Layers3 className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition">Launch Operating Board</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-1">Milestones, adaptive tasks, blockers, and weekly execution</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Open board</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/library" className={`${dashboardCardInteractive} p-5 group`}>
          <BookOpen className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition">Knowledge Library</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-1">Core content that feeds the system and mock-client readiness</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Browse</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/analytics" className={`${dashboardCardInteractive} p-5 group`}>
          <BarChart3 className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition">Proof & Analytics</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-1">Data capture loop for mock, founding partner, and paid-client readiness</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Coming alive</span>
            <ArrowRight size={12} />
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};
