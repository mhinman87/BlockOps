import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TeamDocViewer } from '../components/TeamDocViewer';
import { useUserRole } from '../hooks/useUserRole';
import { BookMarked, ChevronDown, ChevronRight, FileText, FolderOpen, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// Parse markdown header to extract title, version, description, and last updated
const parseMarkdownHeader = (text) => {
  const lines = text.split('\n').slice(0, 15); // only scan first 15 lines
  let title = '';
  let version = '';
  let description = '';
  let lastUpdated = '';

  for (const line of lines) {
    const trimmed = line.trim();
    // Title: first H1
    if (!title && trimmed.startsWith('# ')) {
      title = trimmed.replace(/^# /, '');
    }
    // Version from H2 like "## Internal Operations | Version: DRAFT v2.0"
    if (!version && trimmed.toLowerCase().includes('version')) {
      const vMatch = trimmed.match(/v(?:ersion[:\s]*)?(?:draft\s+)?(v?\d+\.\d+)/i);
      if (vMatch) {
        version = vMatch[1].startsWith('v') ? vMatch[1] : 'v' + vMatch[1];
      }
    }
    // Last Updated
    if (!lastUpdated && trimmed.toLowerCase().includes('last updated')) {
      const dMatch = trimmed.match(/(\d{4}-\d{2}-\d{2})/);
      if (dMatch) lastUpdated = dMatch[1];
    }
  }

  return { title, version: version || 'v1.0', description: '', lastUpdated };
};

export const OperationsPage = () => {
  const { isTeam } = useUserRole();
  const [openDoc, setOpenDoc] = useState(null);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      // List all items in team/operations/
      const { data: items, error: listError } = await supabase.storage
        .from('deliverables')
        .list('team/operations', { limit: 200 });

      if (listError) throw listError;

      // Filter to .md files only
      const mdFiles = (items || []).filter(f => f.name.endsWith('.md'));

      // Fetch the first ~500 bytes of each file to parse the header
      const docsWithMeta = await Promise.all(
        mdFiles.map(async (file) => {
          const path = `team/operations/${file.name}`;
          try {
            const { data: urlData } = supabase.storage.from('deliverables').getPublicUrl(path);
            const resp = await fetch(urlData.publicUrl + `?t=${Date.now()}`, {
              headers: { 'Range': 'bytes=0-1500' }
            });
            const text = await resp.text();
            const meta = parseMarkdownHeader(text);
            return {
              path,
              fileName: file.name,
              title: meta.title || file.name.replace(/_/g, ' ').replace('.md', ''),
              version: meta.version,
              lastUpdated: meta.lastUpdated,
              updatedAt: file.updated_at,
            };
          } catch {
            return {
              path,
              fileName: file.name,
              title: file.name.replace(/_/g, ' ').replace('.md', ''),
              version: '',
              lastUpdated: '',
              updatedAt: file.updated_at,
            };
          }
        })
      );

      // Sort alphabetically by title
      docsWithMeta.sort((a, b) => a.title.localeCompare(b.title));
      setFolders(docsWithMeta);
    } catch (err) {
      setError('Failed to load documents. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  if (openDoc) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <button
            onClick={() => setOpenDoc(null)}
            className="text-sm text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
          >
            ← Back to Operations
          </button>
          <TeamDocViewer
            storagePath={openDoc.path}
            title={openDoc.title}
            description=""
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Operations</h1>
            <p className="text-gray-500 mt-1">Internal playbooks, phase docs, and company strategy</p>
          </div>
          <button
            onClick={fetchDocs}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary bg-white border border-gray-200 rounded-lg hover:border-primary/30 transition"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Documents</p>
            <p className="text-2xl font-black text-gray-900">{folders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Source</p>
            <p className="text-2xl font-black text-primary">Live</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Storage</p>
            <p className="text-sm font-semibold text-gray-600 mt-1">team/operations/</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 size={24} className="animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading documents from storage...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Documents List */}
        {!loading && !error && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 p-5 border-b border-gray-100">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">All Operations Documents</p>
                <p className="text-xs text-gray-500">{folders.length} file{folders.length !== 1 ? 's' : ''} in storage</p>
              </div>
            </div>

            {folders.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm">
                No documents found in team/operations/
              </div>
            )}

            {folders.map((doc, idx) => (
              <button
                key={doc.path}
                onClick={() => setOpenDoc(doc)}
                className={`w-full flex items-center justify-between px-5 py-4 hover:bg-primary/5 transition text-left ${idx !== folders.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={16} className="text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{doc.title}</p>
                    {doc.lastUpdated && (
                      <p className="text-xs text-gray-400 font-light">Updated {doc.lastUpdated}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  {doc.version && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{doc.version}</span>
                  )}
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
