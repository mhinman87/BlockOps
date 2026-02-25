import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  BookOpen,
  FolderOpen,
  BarChart3,
  ArrowRight,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package
} from 'lucide-react';

export const DashboardHome = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Foundation Deliverables', value: '44', sublabel: 'Drafts complete', icon: FileText, color: 'text-primary' },
    { label: 'Awaiting Review', value: '44', sublabel: 'Pending Dr. Bhakta', icon: AlertTriangle, color: 'text-amber-500' },
    { label: 'Block Packs Queued', value: '6', sublabel: 'After Foundation', icon: Package, color: 'text-gray-400' },
  ];

  const foundationCategories = [
    { name: 'Safety', count: 6, color: 'bg-red-500' },
    { name: 'Pharmacology', count: 3, color: 'bg-purple-500' },
    { name: 'Technical Fundamentals', count: 7, color: 'bg-blue-500' },
    { name: 'Sterile Technique', count: 2, color: 'bg-teal-500' },
    { name: 'Physical Infrastructure', count: 6, color: 'bg-amber-500' },
    { name: 'Documentation & Digital', count: 4, color: 'bg-indigo-500' },
    { name: 'Nursing Core Competencies', count: 5, color: 'bg-pink-500' },
    { name: 'Patient Experience', count: 5, color: 'bg-green-500' },
    { name: 'Compliance & Billing', count: 4, color: 'bg-cyan-500' },
    { name: 'Governance', count: 2, color: 'bg-orange-500' },
  ];

  const nextSteps = [
    { text: 'Dr. Bhakta reviews all 44 Foundation drafts', type: 'Blocker', icon: AlertTriangle, iconColor: 'text-amber-500' },
    { text: 'Revise deliverables based on clinical feedback', type: 'Next', icon: Clock, iconColor: 'text-blue-500' },
    { text: 'Begin Adductor Canal Block Pack (first of 6)', type: 'Queued', icon: Package, iconColor: 'text-gray-400' },
    { text: 'Upload finalized deliverables to Supabase Storage', type: 'Queued', icon: FolderOpen, iconColor: 'text-gray-400' },
  ];

  const blockPacks = [
    { name: 'Adductor Canal (Knee)', status: 'Next', color: 'bg-primary' },
    { name: 'Interscalene (Shoulder)', status: 'Queued', color: 'bg-gray-300' },
    { name: 'Supraclavicular (Upper Extremity)', status: 'Queued', color: 'bg-gray-300' },
    { name: 'Popliteal/Saphenous (Ankle/Foot)', status: 'Queued', color: 'bg-gray-300' },
    { name: 'TAP (Abdominal)', status: 'Queued', color: 'bg-gray-300' },
    { name: 'PECS (Chest)', status: 'Queued', color: 'bg-gray-300' },
  ];

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Here's where things stand with Block Ops.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-gray-50 p-2.5 rounded-lg">
                <Icon className={stat.color} size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-400 font-light">{stat.sublabel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Status Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h2 className="text-sm font-bold text-amber-900">Foundation Package — Awaiting Clinical Review</h2>
            <p className="text-sm text-amber-800 font-light mt-1">
              All 44 Foundation deliverables have been drafted across 10 categories. They are ready for Dr. Bhakta's clinical review and approval before finalization. No deliverables will be shared with clients until approved.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column — Foundation Overview + Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Foundation Categories */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Foundation Package Breakdown</h2>
            <Link to="/dashboard/library" className="text-xs font-semibold text-primary hover:underline">View All →</Link>
          </div>
          <div className="space-y-2">
            {foundationCategories.map((cat, index) => (
              <div key={index} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></div>
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-500">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">Next Steps</h2>
          <div className="space-y-3">
            {nextSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon size={16} className={`${item.iconColor} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400 font-light">{item.type}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Block Packs (6 at Launch)</h3>
            <div className="space-y-2">
              {blockPacks.map((pack, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${pack.color}`}></div>
                    <span className="text-sm text-gray-600">{pack.name}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    pack.status === 'Next' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {pack.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/dashboard/library" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <BookOpen className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">Knowledge Library</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Browse all 44 Foundation deliverables by category</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Browse</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/deliverables" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <FolderOpen className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">My Deliverables</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Track review status by section</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>View</span>
            <ArrowRight size={12} />
          </div>
        </Link>
        <Link to="/dashboard/analytics" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group">
          <BarChart3 className="text-primary mb-3" size={22} />
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition">Analytics</h3>
          <p className="text-xs text-gray-400 font-light mt-1">Program metrics — available after launch</p>
          <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
            <span>Coming Soon</span>
            <ArrowRight size={12} />
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
};
