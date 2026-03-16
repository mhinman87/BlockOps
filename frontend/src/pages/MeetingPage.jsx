import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TeamDocViewer } from '../components/TeamDocViewer';
import { useUserRole } from '../hooks/useUserRole';
import { Calendar, ChevronRight, FileText, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

const parseMarkdownHeader = (text) => {
  const lines = text.split('\n').slice(0, 15);
  let title = '';
  let subtitle = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!title && trimmed.startsWith('# ')) {
      title = trimmed.replace(/^# /, '');
    }
    if (!subtitle && trimmed.startsWith('## ') && title) {
      subtitle = trimmed.replace(/^## /, '');
    }
  }

  return { title, subtitle };
};

export const MeetingPage = () => {
  const { isTeam } = useUserRole();
  const [openDoc, setOpenDoc] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const { data: items, error: listError } = await supabase.storage
        .from('deliverables')
        .list('team/meetings', { limit: 100 });

      if (listError) throw listError;

      const mdFiles = (items || []).filter(f => f.name.endsWith('.md'));

      const meetingsWithMeta = await Promise.all(
        mdFiles.map(async (file) => {
          const path = `team/meetings/${file.name}`;
          let title = file.name.replace(/_/g, ' ').replace('.md', '');
          let subtitle = '';

          try {
            const { data: urlData } = supabase.storage.from('deliverables').getPublicUrl(path);
            const resp = await fetch(urlData.publicUrl + `?t=${Date.now()}`, {
              headers: { 'Range': 'bytes=0-1000' }
            });
            const text = await resp.text();
            const meta = parseMarkdownHeader(text);
            if (meta.title) title = meta.title;
            if (meta.subtitle) subtitle = meta.subtitle;
          } catch {}

          const dateMatch = file.name.match(/(\d{4}-\d{2}-\d{2})/);
          const date = dateMatch ? dateMatch[1] : '';

          return { path, title, subtitle, date, fileName: file.name };
        })
      );

      // Sort by date descending (newest first)
      meetingsWithMeta.sort((a, b) => b.date.localeCompare(a.date));
      setMeetings(meetingsWithMeta);
    } catch (err) {
      console.error('Failed to load meetings:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

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
            description={openDoc.subtitle || ''}
            version=""
            isTeam={isTeam}
          />
        </div>
      </DashboardLayout>
    );
  }

  const latestMeeting = meetings.length > 0 ? meetings[0] : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Weekly Meeting</h1>
            <p className="text-gray-500 mt-1">Team agenda, action items, and progress tracking</p>
          </div>
          <button
            onClick={fetchMeetings}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary bg-white border border-gray-200 rounded-lg hover:border-primary/30 transition"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 size={24} className="animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading meetings...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Latest Meeting Card */}
            {latestMeeting && (
              <button
                onClick={() => setOpenDoc(latestMeeting)}
                className="w-full bg-white rounded-xl border-2 border-primary/30 p-6 hover:border-primary/60 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Calendar className="text-primary" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-gray-900">{latestMeeting.title}</p>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">LATEST</span>
                      </div>
                      {latestMeeting.subtitle && (
                        <p className="text-sm text-gray-500 font-light mt-0.5">{latestMeeting.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-primary" />
                </div>
              </button>
            )}

            {/* Meeting History */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <p className="text-lg font-bold text-gray-900">Meeting History</p>
                <p className="text-xs text-gray-500">{meetings.length} document{meetings.length !== 1 ? 's' : ''}</p>
              </div>
              {meetings.length > 0 ? (
                meetings.map((doc, idx) => (
                  <button
                    key={doc.path}
                    onClick={() => setOpenDoc(doc)}
                    className={`w-full flex items-center justify-between px-5 py-4 hover:bg-primary/5 transition text-left ${idx !== meetings.length - 1 ? 'border-b border-gray-50' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText size={16} className="text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{doc.title}</p>
                        {doc.subtitle && (
                          <p className="text-xs text-gray-400 font-light truncate">{doc.subtitle}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      {doc.date && (
                        <span className="text-xs text-gray-400 font-light">{doc.date}</span>
                      )}
                      <ChevronRight size={14} className="text-gray-300" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-400">No meeting documents found</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
