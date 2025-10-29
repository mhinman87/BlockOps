import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, Users, Calendar, Award } from 'lucide-react';

export const DashboardHome = () => {
  const { user } = useAuth();

  const metrics = [
    {
      icon: Calendar,
      label: 'Consultations',
      value: '0',
      color: 'from-blue-400 to-primary',
    },
    {
      icon: Users,
      label: 'Team Members',
      value: '0',
      color: 'from-green-400 to-emerald-600',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: '0',
      color: 'from-purple-400 to-pink-600',
    },
    {
      icon: TrendingUp,
      label: 'Growth',
      value: '0%',
      color: 'from-orange-400 to-red-600',
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user?.full_name}!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-dark-card rounded-xl p-6 border border-dark-border hover:border-primary transition shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${metric.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-xs font-semibold text-green-400">+0%</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-white">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-dark-card rounded-xl p-6 border border-dark-border">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-dark-bg rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Account created</p>
                <p className="text-gray-400 text-sm">Today</p>
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-400">No additional activity yet</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition font-medium">
              Request Consultation
            </button>
            <button className="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg hover:border-primary transition font-medium">
              View Resources
            </button>
            <button className="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg hover:border-primary transition font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
