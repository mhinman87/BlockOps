import React, { useMemo } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useDeliverableStatus } from '../hooks/useDeliverableStatus';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2,
  Clock,
  BookOpen,
  FolderOpen,
  BarChart3,
  ArrowRight,
  FileText,
  Calendar,
  Package,
  AlertTriangle
} from 'lucide-react';

export const DashboardHome = () => {
  const { user } = useAuth();
  const { statuses } = useDeliverableStatus();

  const counts = useMemo(() => {
    const all = Object.values(statuses);
    const approved = all.filter(s => s.status === 'approved').length;
    const needsRevision = all.filter(s => s.status === 'needs_revision').length;
    const pending = 44 - approved - needsRevision;
    return { approved, needsRevision, pending };
  }, [statuses]);

  const stats = [
    { label: 'Approved', value: String(counts.approved), sublabel: 'By Dr. Bhakta', icon: CheckCircle2, color: counts.approved > 0 ? 'text-green-600' : 'text-gray-400' },
    { label: 'Pending Review', value: String(counts.pending), sublabel: 'Drafts', icon: Clock, color: 'text-amber-600' },
    { label: 'Needs Revision', value: String(counts.needsRevision), sublabel: 'Flagged', icon: AlertTriangle, color: counts.needsRevision > 0 ? 'text-red-600' : 'text-gray-400' },
  ];

  const phases = [
    { name: 'Foundation Content', status: 'in-progress', progress: Math.round((counts.approved / 44) * 100), description: `${counts.approved} of 44 deliverables approved by Dr. Bhakta` },
    { name: 'Legal & Business Setup', status: 'in-progress', progress: 40, description: 'LLC ✅ EIN ✅ Bank ⏳ Operating Agreement ⏳ Insurance ⏳' },
    { name: 'Operations Playbook', status: 'completed', progress: 100, description: 'All 8 phases Layer 2 complete & approved' },
    { name: 'First Block Pack', status: 'upcoming', progress: 0, description: 'Adductor Canal (Knee) — starts after Foundation approval' },
    { name: 'Platform Build', status: 'in-progress', progress: 50, description: 'Dashboard live, deliverable viewer, approval system working' },
    { name: 'Agent Architecture', status: 'upcoming', progress: 0, description: 'Client-facing AI agent — after content is approved' },
  ];

  const recentWork = [
    { text: 'Dashboard stats wired to live approval data', date: 'Mar 23', type: 'Platform' },
    { text: 'Block Time-Out Checklist v0.3 — reviewed & updated with Samir', date: 'Mar 23', type: 'Content' },
    { text: 'LAST Protocol Suite v0.3 approved by Samir', date: 'Mar 12', type: 'Content' },
    { text: 'All 8 Ops Phases Layer 2 complete & approved', date: 'Mar 12', type: 'Operations' },
    { text: 'LLC formed, EIN obtained, Chase business account applied', date: 'Mar 18', type: 'Business' },
    { text: 'Legal Brief for Attorney created & sent', date: 'Mar 12', type: 'Legal' },
  ];

  const nextSteps = [
    { text: 'Continue Foundation deliverable reviews (1-by-1 with Samir)', priority: 'high', owner: 'Samir + Bloq', done: false },
    { text: 'Get Operating Agreement from attorney', priority: 'high', owner: 'Samir', done: false },
    { text: 'Get Client Services Agreement from attorney', priority: 'high', owner: 'Samir', done: false },
    { text: 'Obtain E&O + General Liability insurance', priority: 'high', owner: 'Samir', done: false },
    { text: 'Finalize Chase business checking setup', priority: 'medium', owner: 'Samir', done: false },
    { text: 'Samir to decide epi concentration default (1:200K vs 1:400K)', priority: 'medium', owner: 'Samir', done: false },
    { text: 'Build PHI detection/purge system for client agents', priority: 'medium', owner: 'Max', done: false },
    { text: 'LLC formation — Certificate of Filing received', priority: 'high', owner: 'Samir', done: true },
    { text: 'EIN obtained from IRS', priority: 'high', owner: 'Samir', done: true },
    { text: 'LAST Protocol Suite approved', priority: 'high', owner: 'Samir', done: true },
  ];

  const getPhaseColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-primary';
      default: return 'bg-gray-200';
    }
  };

  const getPhaseTextColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700';
      case 'in-progress': return 'text-primary';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Block Ops build status — here's where things stand.
        </p>
      </div>

      {/* Status Banner */}
      {counts.approved < 44 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-amber-800">{counts.approved} of 44 Foundation deliverables approved — {counts.pending} pending clinical review</p>
            <p className="text-xs text-amber-600 font-light mt-1">Nothing goes live until Dr. Bhakta approves each document. Block Pack development starts after Foundation is signed off.</p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-green-800">All 44 Foundation deliverables approved!</p>
            <p className="text-xs text-green-600 font-light mt-1">Foundation Package is complete. Block Pack development can begin.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-primary/10 p-2.5 rounded-lg">
                <Icon className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-gray-400">{stat.sublabel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Build Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Build Progress</h2>
        <div className="space-y-4">
          {phases.map((phase, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className={`text-sm font-semibold ${getPhaseTextColor(phase.status)}`}>{phase.name}</span>
                  <span className="text-xs text-gray-400 ml-2 font-light">{phase.description}</span>
                </div>
                <span className={`text-sm font-bold ${getPhaseTextColor(phase.status)}`}>{phase.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full transition-all ${getPhaseColor(phase.status)}`} style={{ width: `${phase.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column — Recent + Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Recent Work */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Recent Work</h2>
          <div className="space-y-3">
            {recentWork.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-gray-100 p-1.5 rounded mt-0.5">
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-light">{item.text}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{item.date}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs font-semibold text-gray-400">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Next Steps</h2>
          <div className="space-y-2">
            {nextSteps.filter(i => !i.done).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{item.text}</p>
                  <p className="text-xs text-gray-400 font-light">Owner: {item.owner}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)} flex-shrink-0 ml-3`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
          {nextSteps.some(i => i.done) && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Completed</p>
              <div className="space-y-1">
                {nextSteps.filter(i => i.done).map((item, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1.5">
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                    <p className="text-sm text-gray-400 line-through font-light">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/dashboard/library" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <BookOpen className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">Knowledge Library</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Browse all 44 Foundation deliverables</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Browse</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/deliverables" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <FolderOpen className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">My Deliverables</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Track Foundation + Block Pack status</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>View</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/analytics" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <BarChart3 className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">Analytics</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Unlocks after first client deployment</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Coming Soon</span>
            <ArrowRight size={12} />
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};
