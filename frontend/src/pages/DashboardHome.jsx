import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2,
  Clock,
  AlertCircle,
  BookOpen,
  FolderOpen,
  BarChart3,
  ArrowRight,
  FileText,
  Calendar,
  Video,
  Package,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export const DashboardHome = () => {
  const { user } = useAuth();

  // Implementation status
  const implementation = {
    currentPhase: 'Foundation Launch',
    phaseNumber: 2,
    totalPhases: 4,
    progress: 45,
    status: 'On Track',
    nextMilestone: 'Nursing Competency Framework Delivery',
    nextMilestoneDate: 'Mar 1, 2026',
  };

  // Quick stats
  const stats = [
    { label: 'Deliverables Received', value: '9', total: '24', icon: FolderOpen },
    { label: 'Library Resources', value: '18', icon: BookOpen },
    { label: 'Days in Program', value: '32', icon: Calendar },
  ];

  // Recent activity
  const recentActivity = [
    { type: 'deliverable', text: 'Adductor Canal — Clinical Protocol delivered', date: 'Feb 18', icon: FileText },
    { type: 'deliverable', text: 'Adductor Canal — Pocket Reference Card delivered', date: 'Feb 18', icon: FileText },
    { type: 'deliverable', text: 'Adductor Canal — Home Instructions delivered', date: 'Feb 18', icon: FileText },
    { type: 'library', text: 'Ultrasound-Guided Block Technique videos added', date: 'Feb 20', icon: Video },
    { type: 'library', text: 'CPT/ICD Coding Guide updated to v1.0', date: 'Feb 20', icon: BookOpen },
    { type: 'milestone', text: 'EMR Documentation Templates deployed', date: 'Feb 14', icon: CheckCircle2 },
  ];

  // Upcoming
  const upcoming = [
    { text: 'Nursing Competency Framework', type: 'Deliverable', date: 'Mar 1' },
    { text: 'Champion Provider Activation Guide', type: 'Deliverable', date: 'Mar 3' },
    { text: 'Quarterly Check-In Call', type: 'Meeting', date: 'Mar 8' },
    { text: 'Block Bay On-Site Assessment', type: 'Milestone', date: 'Mar 15' },
  ];

  const phases = [
    { name: 'Site Assessment', status: 'completed', progress: 100 },
    { name: 'Foundation Launch', status: 'in-progress', progress: 45 },
    { name: 'Training & Expansion', status: 'upcoming', progress: 0 },
    { name: 'Optimization', status: 'upcoming', progress: 0 },
  ];

  const getPhaseStyle = (status) => {
    switch (status) {
      case 'completed': return { bg: 'bg-green-500', text: 'text-green-700', badge: 'bg-green-100 text-green-700' };
      case 'in-progress': return { bg: 'bg-primary', text: 'text-primary', badge: 'bg-blue-100 text-blue-700' };
      default: return { bg: 'bg-gray-200', text: 'text-gray-400', badge: 'bg-gray-100 text-gray-400' };
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
          Here's an overview of your Block Ops implementation.
        </p>
      </div>

      {/* Top Row — Stats + Phase Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Stats */}
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-primary/10 p-2.5 rounded-lg">
                <Icon className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  {stat.total && <span className="text-sm text-gray-400">/ {stat.total}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Implementation Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Implementation Progress</h2>
            <p className="text-xs text-gray-400 font-light mt-0.5">
              Phase {implementation.phaseNumber} of {implementation.totalPhases} — {implementation.currentPhase}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">{implementation.status}</span>
            <span className="text-lg font-bold text-primary">{implementation.progress}%</span>
          </div>
        </div>
        
        {/* Phase bars */}
        <div className="flex gap-1.5 mb-4">
          {phases.map((phase, i) => {
            const style = getPhaseStyle(phase.status);
            return (
              <div key={i} className="flex-1">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-2 rounded-full transition-all ${style.bg}`} style={{ width: `${phase.progress}%` }}></div>
                </div>
                <p className={`text-xs mt-1.5 font-semibold ${style.text}`}>{phase.name}</p>
              </div>
            );
          })}
        </div>

        {/* Next milestone */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-primary" />
            <span className="text-xs text-gray-600">
              <span className="font-semibold">Next:</span> {implementation.nextMilestone}
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-400">{implementation.nextMilestoneDate}</span>
        </div>
      </div>

      {/* Two Column — Activity + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-gray-100 p-1.5 rounded mt-0.5">
                    <Icon size={14} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 font-light">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Coming Up</h2>
          </div>
          <div className="space-y-2">
            {upcoming.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.text}</p>
                  <p className="text-xs text-gray-400 font-light">{item.type}</p>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-white px-2.5 py-1 rounded border border-gray-200">{item.date}</span>
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
          <p className="text-xs text-gray-400 font-light mt-1">Browse protocols, templates, and training materials</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Browse</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/deliverables" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <FolderOpen className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">My Deliverables</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Track delivery status of your packages</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>View</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/analytics" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <BarChart3 className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">Analytics</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Program metrics and outcome tracking</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Coming Soon</span>
            <ArrowRight size={12} />
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};
