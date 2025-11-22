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
    },
    {
      icon: Users,
      label: 'Team Members',
      value: '0',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: '0',
    },
    {
      icon: TrendingUp,
      label: 'Growth',
      value: '0%',
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          Welcome back, {user?.full_name?.toUpperCase()}!
        </h1>
        <p className="text-gray-600 font-light">
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
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary hover:shadow-xl transition shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon className="text-primary" size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-green-600">+0%</span>
              </div>
              <p className="text-gray-600 text-sm mb-1 font-bold uppercase tracking-wide">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-bold uppercase tracking-wide text-sm">Account created</p>
                <p className="text-gray-600 text-sm font-light">Today</p>
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-600 font-light">No additional activity yet</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/50">
              Request Consultation
            </button>
            <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:border-primary hover:text-primary transition font-bold uppercase tracking-wide text-sm">
              View Resources
            </button>
            <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:border-primary hover:text-primary transition font-bold uppercase tracking-wide text-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
