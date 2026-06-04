import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Layers3,
} from 'lucide-react';
import {
  dashboardCard,
  dashboardCardInteractive,
  dashboardPageSubtitle,
  dashboardPageTitle,
  dashboardSurfaceMuted,
} from '../services/dashboardTheme.js';
import {
  buildLaunchOpsSnapshot,
  fetchLaunchMilestones,
  fetchLaunchTasks,
  fetchWeeklyAgenda,
} from '../services/launchOpsService.js';

const parseLines = (value) => (value || '')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

export const DashboardHome = () => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  const thisWeekTasks = snapshot.thisWeekTasks || [];
  const blockedTasks = snapshot.blockedTasks || [];
  const priorities = parseLines(agenda?.companyPriorities);
  const launchRisks = parseLines(agenda?.launchRisks);
  const decisionsNeeded = parseLines(agenda?.decisionsNeeded);

  const currentProgressPercent = currentMilestone
    ? (currentMilestone.readinessScore || currentReadiness?.readinessFromTasks || 0)
    : 0;
  const currentMilestoneDisplayTitle = currentMilestone?.title || '';

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
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">Launch Gate Progress</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Live milestone tracking: each bar reflects the tasks assigned to that milestone, and it updates as tasks are completed.
        </p>
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-gray-400 dark:text-gray-500">Loading launch milestones...</p>
          ) : snapshot.readiness.map((milestone) => {
            const fullMilestone = milestones.find((item) => item.id === milestone.id);
            const progress = fullMilestone?.readinessScore || milestone.readinessFromTasks;
            const tone = fullMilestone?.status === 'done'
              ? 'text-green-700'
              : fullMilestone?.status === 'in_progress'
                ? 'text-primary'
                : fullMilestone?.status === 'blocked'
                  ? 'text-red-600'
                  : 'text-gray-500 dark:text-gray-400';
            const barTone = fullMilestone?.status === 'done'
              ? 'bg-green-500'
              : fullMilestone?.status === 'in_progress'
                ? 'bg-primary'
                : fullMilestone?.status === 'blocked'
                  ? 'bg-red-400'
                  : 'bg-gray-300 dark:bg-dark-border';

            return (
              <div key={milestone.id}>
                <div className="flex items-center justify-between mb-1.5 gap-3">
                  <div>
                    <span className={`text-sm font-semibold ${tone}`}>{milestone.title}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 font-light">
                      {milestone.completedTasks}/{milestone.totalTasks} tasks complete
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${tone}`}>{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-dark-bg rounded-full h-2 overflow-hidden">
                  <div className={`h-2 rounded-full transition-all ${barTone}`} style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className={`${dashboardCard} p-5`}>
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">This Week&apos;s Priorities</h2>
          <div className="space-y-3">
            {priorities.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">No priorities loaded yet.</p>
            ) : priorities.map((item, index) => (
              <div key={index} className={`flex items-start gap-3 p-3 ${dashboardSurfaceMuted}`}>
                <div className="bg-primary/10 p-1.5 rounded mt-0.5">
                  <CheckCircle2 size={14} className="text-primary" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200 font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${dashboardCard} p-5`}>
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">This Week Tasks</h2>
          <div className="space-y-2">
            {thisWeekTasks.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">No this-week tasks loaded yet.</p>
            ) : thisWeekTasks.map((task) => (
              <div key={task.id} className={`p-3 ${dashboardSurfaceMuted}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{task.taskKey} — {task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Owner: {task.primaryOwner} · Milestone: {milestones.find((milestone) => milestone.id === task.milestoneId)?.slug || '—'}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className={`${dashboardCard} p-5`}>
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">Launch Risks</h2>
          <div className="space-y-2">
            {launchRisks.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">No launch risks loaded yet.</p>
            ) : launchRisks.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-dark-border/40 border border-red-100 dark:border-dark-border rounded-lg">
                <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800 dark:text-gray-200 font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${dashboardCard} p-5`}>
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">Decisions Needed</h2>
          <div className="space-y-2">
            {decisionsNeeded.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500">No pending decisions loaded yet.</p>
            ) : decisionsNeeded.map((item, index) => (
              <div key={index} className={`p-3 ${dashboardSurfaceMuted}`}>
                <p className="text-sm text-gray-700 dark:text-gray-200 font-light">{item}</p>
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
