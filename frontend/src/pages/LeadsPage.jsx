import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Target, Search, FileText, Send } from 'lucide-react';

export const LeadsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Lead Pipeline</h1>
          <p className="text-gray-500 mt-1">Scored ASC prospects, dossiers, and outreach tracking</p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Lead Pipeline Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            AI-powered B2B lead generation. Bloq researches and scores ASCs weekly, 
            generates facility dossiers, and drafts custom outreach for Adrian.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <Search size={20} className="text-primary mb-2" />
              <p className="text-sm font-semibold text-gray-900">Deep Research</p>
              <p className="text-xs text-gray-500 mt-1">5-10 ASCs researched weekly with full dossiers</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <FileText size={20} className="text-blue-500 mb-2" />
              <p className="text-sm font-semibold text-gray-900">Scored Prospects</p>
              <p className="text-xs text-gray-500 mt-1">Ranked by fit against Samir's criteria</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <Send size={20} className="text-green-500 mb-2" />
              <p className="text-sm font-semibold text-gray-900">Custom Outreach</p>
              <p className="text-xs text-gray-500 mt-1">Email, phone script, and LinkedIn drafts</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
