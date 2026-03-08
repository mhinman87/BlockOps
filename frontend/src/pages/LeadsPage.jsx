import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TeamDocViewer } from '../components/TeamDocViewer';
import { useUserRole } from '../hooks/useUserRole';
import { Target, Search } from 'lucide-react';

export const LeadsPage = () => {
  const { isTeam } = useUserRole();
  const [showStrategy, setShowStrategy] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Lead Pipeline</h1>
          <p className="text-gray-500 mt-1">Scored ASC prospects, dossiers, and outreach tracking</p>
        </div>

        {/* Pipeline Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Researched</p>
            <p className="text-3xl font-black text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Facilities profiled</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Selected</p>
            <p className="text-3xl font-black text-primary">0</p>
            <p className="text-xs text-gray-500 mt-1">Picked for outreach</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Contacted</p>
            <p className="text-3xl font-black text-amber-500">0</p>
            <p className="text-xs text-gray-500 mt-1">Outreach sent</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Discovery Calls</p>
            <p className="text-3xl font-black text-green-500">0</p>
            <p className="text-xs text-gray-500 mt-1">Calls with Samir</p>
          </div>
        </div>

        {/* Strategy Document */}
        <TeamDocViewer
          storagePath="team/Lead_Generation_Strategy.md"
          title="Lead Generation Strategy"
          description="Quality over quantity — our approach to finding perfect-fit ASCs"
          version="v1.0"
          isTeam={isTeam}
        />

        {/* Prospects Table Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Search className="text-gray-400" size={24} />
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">No prospects yet</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Once Bloq has access to Brave Search and Firescraper, scored ASC dossiers will appear here weekly.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
