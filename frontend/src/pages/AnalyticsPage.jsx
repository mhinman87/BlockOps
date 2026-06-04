import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { BarChart3, TrendingUp, Target, DollarSign, Activity, Lock } from 'lucide-react';

export const AnalyticsPage = () => {
  const placeholderMetrics = [
    { icon: Target, label: 'Block Success Rate', value: '—', description: 'Available after Phase 2' },
    { icon: Activity, label: 'Cases This Month', value: '—', description: 'Available after Phase 2' },
    { icon: TrendingUp, label: 'PACU Time Saved', value: '—', description: 'Available after Phase 2' },
    { icon: DollarSign, label: 'Revenue Impact', value: '—', description: 'Available after Phase 3' },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-light">
          Program performance metrics, outcome tracking, and financial impact analysis.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {placeholderMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Icon className="text-gray-400 dark:text-gray-500" size={18} />
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-300 mt-1">{metric.value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-light mt-1">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white border border-dashed border-gray-300 dark:border-dark-border rounded-xl p-12 text-center">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="text-gray-400 dark:text-gray-500" size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Analytics Unlock During Phase 2</h2>
        <p className="text-gray-500 dark:text-gray-400 font-light text-sm max-w-lg mx-auto leading-relaxed">
          Once your program is live and collecting data, this dashboard will show real-time block success rates, 
          PACU time savings, opioid reduction metrics, competency tracking, and financial impact analysis. 
          All data stays within your facility — Block Ops provides the tracking framework, you own the numbers.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:text-gray-400">Block Success Tracking</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:text-gray-400">PACU Time Analysis</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:text-gray-400">Opioid Reduction Metrics</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:text-gray-400">Competency Tracking</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:text-gray-400">Revenue Impact</span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 dark:text-gray-400">Quarterly Reports</span>
        </div>
      </div>
    </DashboardLayout>
  );
};
