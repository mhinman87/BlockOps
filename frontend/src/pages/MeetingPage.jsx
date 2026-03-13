import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TeamDocViewer } from '../components/TeamDocViewer';
import { useUserRole } from '../hooks/useUserRole';
import { ClipboardList, Calendar, ChevronRight, FileText } from 'lucide-react';

const MEETING_DOCS = [
  {
    title: 'Week of March 17, 2026',
    description: 'All 8 Phases Layer 2 review, LLC update, legal brief, pricing tiers, platform features',
    path: 'team/meetings/Meeting_2026-03-17.md',
    version: 'Current',
    date: '2026-03-17',
    current: true,
  },
  {
    title: 'Week of March 10, 2026',
    description: 'Master Playbook review, logo approval, grants & funding, lead gen pipeline',
    path: 'team/meetings/Meeting_2026-03-10.md',
    version: 'Past',
    date: '2026-03-10',
    current: false,
  },
];

export const MeetingPage = () => {
  const { isTeam } = useUserRole();
  const [openDoc, setOpenDoc] = useState(null);

  // Auto-open current meeting
  const currentMeeting = MEETING_DOCS.find(m => m.current);

  if (openDoc) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <button
            onClick={() => setOpenDoc(null)}
            className="text-sm text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
          >
            ← Back to Meetings
          </button>
          <TeamDocViewer
            storagePath={openDoc.path}
            title={openDoc.title}
            description={openDoc.description}
            version={openDoc.version}
            isTeam={isTeam}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Weekly Meeting</h1>
          <p className="text-gray-500 mt-1">Team agenda, action items, and progress tracking</p>
        </div>

        {/* Current Meeting Card */}
        {currentMeeting && (
          <button
            onClick={() => setOpenDoc(currentMeeting)}
            className="w-full bg-white rounded-xl border-2 border-primary/30 p-6 hover:border-primary/60 transition text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-gray-900">{currentMeeting.title}</p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">UPCOMING</span>
                  </div>
                  <p className="text-sm text-gray-500 font-light mt-0.5">{currentMeeting.description}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-primary" />
            </div>
          </button>
        )}

        {/* Meeting History */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900">Meeting History</p>
          </div>
          {MEETING_DOCS.length > 0 ? (
            MEETING_DOCS.map((doc, idx) => (
              <button
                key={doc.path}
                onClick={() => setOpenDoc(doc)}
                className={`w-full flex items-center justify-between px-5 py-4 hover:bg-primary/5 transition text-left ${idx !== MEETING_DOCS.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{doc.title}</p>
                    <p className="text-xs text-gray-500 font-light">{doc.description}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-300" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-400">No past meetings yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
