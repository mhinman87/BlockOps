import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Layers3,
  Target,
} from 'lucide-react';
import {
  dashboardCard,
  dashboardCardInteractive,
  dashboardPageSubtitle,
  dashboardPageTitle,
} from '../services/dashboardTheme.js';
import {
  buildLaunchOpsSnapshot,
  fetchLaunchBoard,
} from '../services/launchOpsService.js';

// Three accent people surfaced on the calm summary home.
const PEOPLE = [
  { name: 'Samir', text: 'text-cyan-700 dark:text-cyan-300', dot: 'bg-cyan-500', bar: 'bg-cyan-500', soft: 'bg-cyan-50 dark:bg-cyan-500/10', ring: 'border-cyan-200/70 dark:border-cyan-400/30' },
  { name: 'Max', text: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-500', bar: 'bg-indigo-500', soft: 'bg-indigo-50 dark:bg-indigo-500/10', ring: 'border-indigo-200/70 dark:border-indigo-400/30' },
  { name: 'Adrian', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500', bar: 'bg-amber-500', soft: 'bg-amber-50 dark:bg-amber-500/10', ring: 'border-amber-200/70 dark:border-amber-400/30' },
];

const isDone = (task) => task.computedStatus === 'done';

export const DashboardHome = () => {
  const { user } = useAuth();
  const { isTeam, loading: roleLoading } = useUserRole();
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (roleLoading) return undefined;
    if (!isTeam) {
      setLoading(false);
      return undefined;
    }

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
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Failed to load the launch summary.');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [isTeam, roleLoading]);

  const snapshot = useMemo(() => buildLaunchOpsSnapshot({ milestones, tasks, agenda }), [milestones, tasks, agenda]);
  const currentMilestone = snapshot.currentMilestone;
  const currentReadiness = currentMilestone ? snapshot.readinessBySlug[currentMilestone.slug] : null;

  const overall = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(isDone).length;
    return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
  }, [tasks]);

  const peopleProgress = useMemo(() => PEOPLE.map((person) => {
    const ownerTasks = tasks.filter((task) => task.primaryOwner === person.name);
    const done = ownerTasks.filter(isDone).length;
    const active = ownerTasks.filter((task) => !isDone(task) && task.computedStatus !== 'locked').length;
    return {
      ...person,
      total: ownerTasks.length,
      done,
      active,
      percent: ownerTasks.length === 0 ? 0 : Math.round((done / ownerTasks.length) * 100),
    };
  }), [tasks]);

  const currentTitle = currentMilestone
    ? `${currentMilestone.code ? `${currentMilestone.code} — ` : ''}${currentMilestone.title}`
    : '—';
  const currentPercent = currentMilestone
    ? (currentReadiness?.readinessFromTasks ?? currentMilestone.readinessScore ?? 0)
    : 0;

  if (!roleLoading && !isTeam) {
    return (
      <DashboardLayout>
        <div className="mb-6">
          <h1 className={dashboardPageTitle}>
            Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className={dashboardPageSubtitle}>
            Your Block Ops workspace for approved deliverables, resources, and program reporting.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link to="/dashboard/deliverables" className={`${dashboardCardInteractive} p-5`}>
            <Target className="mb-3 text-primary" size={22} />
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Deliverables</h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Open approved final materials for your program.</p>
          </Link>
          <Link to="/dashboard/library" className={`${dashboardCardInteractive} p-5`}>
            <BookOpen className="mb-3 text-primary" size={22} />
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Resources</h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Browse client-approved references and resources.</p>
          </Link>
          <Link to="/dashboard/analytics" className={`${dashboardCardInteractive} p-5`}>
            <ArrowRight className="mb-3 text-primary" size={22} />
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Program reporting</h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Review available value and quality reporting.</p>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className={dashboardPageTitle}>
          Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className={dashboardPageSubtitle}>
          A calm summary of where the launch stands. Open Mission Control for the full working board.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-red-800">Summary failed to load</p>
            <p className="text-xs text-red-600 font-light mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Top tiles: Current Milestone · Overall Progress · Individual Task Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Current milestone */}
        <Link
          to="/dashboard/tasks"
          className={`${dashboardCardInteractive} p-5 block`}
          aria-label={`Open Mission Control for ${currentTitle}`}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">Current milestone</p>
          {loading ? (
            <p className="mt-3 text-sm text-gray-400 dark:text-gray-500">Loading…</p>
          ) : (
            <>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-gray-900 dark:text-gray-100">{currentMilestone?.code || '—'}</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-tight">{currentMilestone?.title || 'No active milestone'}</span>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-5 line-clamp-2">{currentMilestone?.description}</p>
              {currentMilestone && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                    <span className="uppercase tracking-wider">Readiness</span>
                    <span className="text-primary">{currentPercent}%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-100 dark:bg-dark-bg rounded-full h-1.5 overflow-hidden">
                    <div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${currentPercent}%` }} />
                  </div>
                </div>
              )}
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                <span>Open Mission Control</span>
                <ArrowRight size={12} />
              </div>
            </>
          )}
        </Link>

        {/* Overall progress */}
        <div className={`${dashboardCard} p-5`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">Overall progress</p>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="text-3xl font-black text-gray-900 dark:text-gray-100">{overall.percent}%</span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{overall.done}/{overall.total} tasks done</span>
          </div>
          <div className="mt-3 w-full bg-gray-100 dark:bg-dark-bg rounded-full h-2 overflow-hidden">
            <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${overall.percent}%` }} />
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Across every milestone in the ladder.</p>
        </div>

        {/* Individual task progress */}
        <div className={`${dashboardCard} p-5`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">Individual task progress</p>
          <div className="mt-3 space-y-3">
            {peopleProgress.map((person) => (
              <div key={person.name}>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                    <span className={`h-2.5 w-2.5 rounded-full ${person.dot}`} />
                    {person.name}
                  </span>
                  <span className={`text-xs font-bold ${person.text}`}>{person.done}/{person.total} done</span>
                </div>
                <div className="mt-1.5 w-full bg-gray-100 dark:bg-dark-bg rounded-full h-1.5 overflow-hidden">
                  <div className={`h-1.5 rounded-full ${person.bar} transition-all`} style={{ width: `${person.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-person summary cards (accent colours) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {peopleProgress.map((person) => (
          <div key={person.name} className={`${dashboardCard} p-5 border ${person.ring}`}>
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${person.soft} ${person.text} text-sm font-bold`}>
                {person.name.slice(0, 1)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{person.name}</p>
                <p className={`text-[11px] uppercase tracking-[0.16em] ${person.text}`}>{person.active} active</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-gray-100">{person.done}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Done</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-gray-900 dark:text-gray-100">{person.total}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Routing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/dashboard/tasks" className={`${dashboardCardInteractive} p-5 group`}>
          <Layers3 className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition">Mission Control</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-1">The full working board — milestones, workflows, tasks, and gates</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Open Mission Control</span>
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
        <Link to="/dashboard/leads" className={`${dashboardCardInteractive} p-5 group`}>
          <Target className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition">Lead Pipeline</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-1">Track interest from first contact through founding-partner fit</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Open pipeline</span>
            <ArrowRight size={12} />
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};
