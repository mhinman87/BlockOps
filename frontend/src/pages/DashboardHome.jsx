import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
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

  const stats = [
    { label: 'Foundation Deliverables', value: '44', sublabel: 'Drafted', icon: FileText, color: 'text-amber-600' },
    { label: 'Pending Review', value: '44', sublabel: 'By Dr. Bhakta', icon: Clock, color: 'text-amber-600' },
    { label: 'Block Packs', value: '0 / 6', sublabel: 'In progress', icon: Package, color: 'text-gray-400' },
  ];

  const phases = [
    { name: 'Foundation Content', status: 'in-progress', progress: 80, description: '44 deliverables drafted, pending clinical review' },
    { name: 'First Block Pack', status: 'upcoming', progress: 0, description: 'Adductor Canal (Knee) — starts after Foundation approval' },
    { name: 'Platform Build', status: 'in-progress', progress: 40, description: 'Website live, dashboard functional, Supabase integrated' },
    { name: 'Agent Architecture', status: 'upcoming', progress: 0, description: 'Client-facing AI agent — after content is approved' },
  ];

  const recentWork = [
    { text: 'Migrated auth from Render backend to Supabase', date: 'Feb 23', type: 'Platform' },
    { text: 'Rebuilt landing page with ROI-focused messaging', date: 'Feb 23', type: 'Website' },
    { text: 'Built Knowledge Library, Deliverables tracker, Analytics pages', date: 'Feb 23', type: 'Dashboard' },
    { text: 'Completed all 44 Foundation deliverable drafts', date: 'Feb 24', type: 'Content' },
    { text: 'LAST Protocol Suite sent to Samir for review', date: 'Feb 23', type: 'Content' },
    { text: 'Block Time-Out Checklist sent to Samir for review', date: 'Feb 23', type: 'Content' },
  ];

  const nextSteps = [
    { text: 'Samir reviews all Foundation drafts', priority: 'high', owner: 'Samir' },
    { text: 'Wire contact form to Supabase', priority: 'medium', owner: 'Bloq' },
    { text: 'Set up Supabase Storage for deliverable files', priority: 'medium', owner: 'Max' },
    { text: 'Custom domain for website', priority: 'low', owner: 'Max' },
    { text: 'Begin Adductor Canal Block Pack', priority: 'medium', owner: 'Samir + Bloq' },
    { text: 'Design client agent architecture', priority: 'medium', owner: 'Max' },
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
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-sm font-semibold text-amber-800">All 44 Foundation deliverables are drafted — awaiting Samir's clinical review</p>
          <p className="text-xs text-amber-600 font-light mt-1">Nothing goes live until Samir approves each document. Block Pack development starts after Foundation is signed off.</p>
        </div>
      </div>

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
            {nextSteps.map((item, index) => (
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
