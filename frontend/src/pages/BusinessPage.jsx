import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { TeamDocViewer } from '../components/TeamDocViewer';
import { useUserRole } from '../hooks/useUserRole';
import { ChevronDown, ChevronRight, FileText, FolderOpen, RefreshCw, Loader2, Scale, Briefcase, TrendingUp, Eye } from 'lucide-react';
import { supabase } from '../services/supabase';

const parseMarkdownHeader = (text) => {
  const lines = text.split('\n').slice(0, 15);
  let title = '';
  let version = '';
  let lastUpdated = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!title && trimmed.startsWith('# ')) {
      title = trimmed.replace(/^# /, '');
    }
    if (!version && trimmed.toLowerCase().includes('version')) {
      const vMatch = trimmed.match(/v(?:ersion[:\s]*)?(?:draft\s+)?(v?\d+\.\d+)/i);
      if (vMatch) {
        version = vMatch[1].startsWith('v') ? vMatch[1] : 'v' + vMatch[1];
      }
    }
    if (!lastUpdated && trimmed.toLowerCase().includes('last updated')) {
      const dMatch = trimmed.match(/(\d{4}-\d{2}-\d{2})/);
      if (dMatch) lastUpdated = dMatch[1];
    }
  }

  return { title, version: version || '', lastUpdated };
};

const categorizeFile = (fileName) => {
  const lower = fileName.toLowerCase();
  if (lower.includes('strategic') || lower.includes('vision') || lower.includes('operating_model')) return 'Strategy';
  if (lower.includes('pricing') || lower.includes('revenue')) return 'Pricing & Revenue';
  if (lower.includes('legal') || lower.includes('compliance')) return 'Legal & Compliance';
  if (lower.includes('pitch') || lower.includes('sales') || lower.includes('elevator')) return 'Sales & Outreach';
  return 'Other';
};

const CATEGORY_CONFIG = {
  'Strategy': { icon: Eye, color: 'text-primary', order: 0 },
  'Pricing & Revenue': { icon: TrendingUp, color: 'text-green-500', order: 1 },
  'Sales & Outreach': { icon: Briefcase, color: 'text-purple-500', order: 2 },
  'Legal & Compliance': { icon: Scale, color: 'text-red-400', order: 3 },
  'Other': { icon: FolderOpen, color: 'text-gray-500', order: 4 },
};

export const BusinessPage = () => {
  const { isTeam } = useUserRole();
  const location = useLocation();
  const [openDoc, setOpenDoc] = useState(null);

  // Reset to list view when sidebar nav is clicked
  useEffect(() => {
    if (location.state?.reset) {
      setOpenDoc(null);
    }
  }, [location.state]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const fetchDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: items, error: listError } = await supabase.storage
        .from('deliverables')
        .list('business', { limit: 200 });

      if (listError) throw listError;

      const mdFiles = (items || []).filter(f => f.name.endsWith('.md'));

      const docsWithMeta = await Promise.all(
        mdFiles.map(async (file) => {
          const path = `business/${file.name}`;
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
              category: categorizeFile(file.name),
            };
          } catch {
            return {
              path,
              fileName: file.name,
              title: file.name.replace(/_/g, ' ').replace('.md', ''),
              version: '',
              lastUpdated: '',
              category: categorizeFile(file.name),
            };
          }
        })
      );

      const grouped = {};
      for (const doc of docsWithMeta) {
        if (!grouped[doc.category]) grouped[doc.category] = [];
        grouped[doc.category].push(doc);
      }

      for (const cat of Object.keys(grouped)) {
        grouped[cat].sort((a, b) => a.title.localeCompare(b.title));
      }

      const sortedCategories = Object.entries(grouped)
        .map(([name, docs]) => ({ name, docs, ...(CATEGORY_CONFIG[name] || CATEGORY_CONFIG['Other']) }))
        .sort((a, b) => a.order - b.order);

      setCategories(sortedCategories);

      const expanded = {};
      sortedCategories.forEach(c => { expanded[c.name] = true; });
      setExpandedCategories(prev => {
        const merged = { ...expanded };
        for (const key of Object.keys(prev)) {
          if (key in merged) merged[key] = prev[key];
        }
        return merged;
      });
    } catch (err) {
      setError('Failed to load documents. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const toggleCategory = (name) => {
    setExpandedCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const totalDocs = categories.reduce((a, c) => a + c.docs.length, 0);

  if (openDoc) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <button
            onClick={() => setOpenDoc(null)}
            className="text-sm text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
          >
            ← Back to Business
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Business</h1>
            <p className="text-gray-500 mt-1">Strategy, pricing, legal, and sales materials</p>
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Documents</p>
            <p className="text-2xl font-black text-gray-900">{totalDocs}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Categories</p>
            <p className="text-2xl font-black text-primary">{categories.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Source</p>
            <p className="text-2xl font-black text-green-500">Live</p>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 size={24} className="animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading documents from storage...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && categories.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategories[category.name];

          return (
            <div key={category.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
              >
                <div className="text-left">
                  <p className="text-lg font-bold text-gray-900">{category.name}</p>
                  <p className="text-xs text-gray-500">{category.docs.length} document{category.docs.length !== 1 ? 's' : ''}</p>
                </div>
                {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100">
                  {category.docs.map((doc, idx) => (
                    <button
                      key={doc.path}
                      onClick={() => setOpenDoc(doc)}
                      className={`w-full flex items-center justify-between px-5 py-4 hover:bg-primary/5 transition text-left ${idx !== category.docs.length - 1 ? 'border-b border-gray-50' : ''}`}
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
          );
        })}
      </div>
    </DashboardLayout>
  );
};
