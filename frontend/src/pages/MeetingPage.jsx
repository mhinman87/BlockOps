import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { ClipboardList, Calendar, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const MeetingPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Weekly Meeting</h1>
          <p className="text-gray-500 mt-1">Team agenda, action items, and progress tracking</p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Meeting Dashboard Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            This section will auto-generate your weekly meeting agenda with action items, 
            pipeline status, deliverable progress, and links to relevant documents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <Calendar size={20} className="text-primary mb-2" />
              <p className="text-sm font-semibold text-gray-900">Auto-Generated Agenda</p>
              <p className="text-xs text-gray-500 mt-1">Based on open items and recent activity</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <CheckCircle2 size={20} className="text-green-500 mb-2" />
              <p className="text-sm font-semibold text-gray-900">Action Item Tracking</p>
              <p className="text-xs text-gray-500 mt-1">Assigned owners and due dates</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <AlertCircle size={20} className="text-amber-500 mb-2" />
              <p className="text-sm font-semibold text-gray-900">Blockers & Decisions</p>
              <p className="text-xs text-gray-500 mt-1">Items needing team discussion</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
