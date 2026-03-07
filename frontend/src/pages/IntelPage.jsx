import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TrendingUp, Globe, DollarSign, Award } from 'lucide-react';

export const IntelPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Business Intelligence</h1>
          <p className="text-gray-500 mt-1">Market research, competitive landscape, and opportunity tracking</p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Business Intel Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Market intelligence, grant opportunities, accelerator programs, 
            competitive analysis, and strategic insights — all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <Globe size={20} className="text-primary mb-2" />
              <p className="text-sm font-semibold text-gray-900">Market Analysis</p>
              <p className="text-xs text-gray-500 mt-1">ASC landscape, growth trends, opportunity zones</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <DollarSign size={20} className="text-green-500 mb-2" />
              <p className="text-sm font-semibold text-gray-900">Grants & Funding</p>
              <p className="text-xs text-gray-500 mt-1">Opioid reduction grants, accelerators, SBIR</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <Award size={20} className="text-amber-500 mb-2" />
              <p className="text-sm font-semibold text-gray-900">Competitive Intel</p>
              <p className="text-xs text-gray-500 mt-1">Who else is in this space and what they offer</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
