import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { 
  TrendingUp, 
  TrendingDown,
  Target, 
  Users, 
  DollarSign,
  FileText,
  Video,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar
} from 'lucide-react';

export const DashboardHome = () => {
  const { user } = useAuth();

  // Mocked data
  const progressData = {
    overallProgress: 67,
    currentPhase: 'Phase 2: Pilot Testing',
    phaseNumber: 2,
    totalPhases: 4,
  };

  const topMetrics = [
    {
      icon: Target,
      label: 'Block Success Rate',
      value: '94.2%',
      trend: '+5.3%',
      trendUp: true,
      description: 'On-time starts',
    },
    {
      icon: Users,
      label: 'Surgeon Engagement',
      value: '87/100',
      trend: '+12',
      trendUp: true,
      description: 'Active participants',
    },
    {
      icon: DollarSign,
      label: 'Financial ROI',
      value: '$1.2M',
      trend: '+18.5%',
      trendUp: true,
      description: 'Annual savings',
    },
  ];

  const timelinePhases = [
    {
      name: 'Discovery & Planning',
      startDate: 'Jan 2025',
      endDate: 'Feb 2025',
      progress: 100,
      status: 'completed',
    },
    {
      name: 'Pilot Testing',
      startDate: 'Feb 2025',
      endDate: 'Apr 2025',
      progress: 65,
      status: 'in-progress',
    },
    {
      name: 'Full Rollout',
      startDate: 'Apr 2025',
      endDate: 'Jun 2025',
      progress: 0,
      status: 'upcoming',
    },
    {
      name: 'Optimization',
      startDate: 'Jun 2025',
      endDate: 'Jul 2025',
      progress: 0,
      status: 'upcoming',
    },
  ];

  const recentDeliverables = [
    {
      title: 'Q1 Block Utilization Report',
      date: 'Nov 18, 2025',
      status: 'completed',
      type: 'report',
    },
    {
      title: 'Surgeon Training Materials',
      date: 'Nov 15, 2025',
      status: 'completed',
      type: 'document',
    },
    {
      title: 'Phase 2 Implementation Plan',
      date: 'Nov 12, 2025',
      status: 'completed',
      type: 'document',
    },
    {
      title: 'Dashboard Analytics Update',
      date: 'Nov 10, 2025',
      status: 'in-progress',
      type: 'report',
    },
  ];

  const upcomingMeetings = [
    {
      title: 'Weekly Stakeholder Sync',
      date: 'Nov 25, 2025',
      time: '10:00 AM',
      type: 'video',
    },
    {
      title: 'Surgeon Feedback Session',
      date: 'Nov 27, 2025',
      time: '2:00 PM',
      type: 'video',
    },
    {
      title: 'Q4 Review & Planning',
      date: 'Nov 29, 2025',
      time: '9:00 AM',
      type: 'video',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} />;
      case 'in-progress':
        return <Clock size={16} />;
      case 'upcoming':
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          Executive Snapshot
        </h1>
        <p className="text-gray-600 font-light">
          Welcome back, {user?.full_name}. Here's your implementation overview.
        </p>
      </div>

      {/* Progress Summary Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Implementation Progress</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Phase {progressData.phaseNumber} of {progressData.totalPhases}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold uppercase tracking-wide text-gray-700">
              {progressData.currentPhase}
            </span>
            <span className="text-2xl font-bold text-primary">{progressData.overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 transition-all duration-500"
              style={{ 
                width: `${progressData.overallProgress}%`,
                background: 'linear-gradient(to right, #42A5B3, #5DD5D5)'
              }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wide">
            On Track
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wide">
            2 Milestones Active
          </span>
        </div>
      </div>

      {/* Top 3 Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {topMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trendUp ? TrendingUp : TrendingDown;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary hover:shadow-xl transition shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon className="text-primary" size={24} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${metric.trendUp ? 'bg-green-100' : 'bg-red-100'}`}>
                  <TrendIcon className={metric.trendUp ? 'text-green-600' : 'text-red-600'} size={16} />
                  <span className={`text-xs font-bold uppercase tracking-wide ${metric.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1 font-bold uppercase tracking-wide">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-xs text-gray-500 font-light">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Project Timeline / Gantt Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Project Timeline</h2>
        <div className="space-y-4">
          {timelinePhases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    phase.status === 'completed' 
                      ? 'bg-green-100 border-green-500' 
                      : phase.status === 'in-progress'
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-100 border-gray-300'
                  }`}>
                    {getStatusIcon(phase.status)}
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-gray-900">{phase.name}</p>
                    <p className="text-xs text-gray-500 font-light">{phase.startDate} - {phase.endDate}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(phase.status)}`}>
                  {phase.status === 'in-progress' ? `${phase.progress}%` : phase.status}
                </span>
              </div>
              <div className="ml-11">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      phase.status === 'completed'
                        ? 'bg-green-500'
                        : phase.status === 'in-progress'
                        ? 'bg-gradient-to-r from-primary to-blue-400'
                        : 'bg-gray-300'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deliverables */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Recent Deliverables</h2>
          <div className="space-y-3">
            {recentDeliverables.map((deliverable, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-primary transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition">
                    <FileText className="text-primary" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold uppercase tracking-wide text-gray-900">{deliverable.title}</p>
                    <p className="text-xs text-gray-500 font-light">{deliverable.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(deliverable.status)}`}>
                  {deliverable.status === 'in-progress' ? 'In Progress' : 'View'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Upcoming Meetings</h2>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {meeting.type === 'video' ? (
                      <Video className="text-primary" size={20} />
                    ) : (
                      <Calendar className="text-primary" size={20} />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold uppercase tracking-wide text-gray-900">{meeting.title}</p>
                    <p className="text-xs text-gray-500 font-light">{meeting.date} at {meeting.time}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-xs shadow-md shadow-primary/30">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
