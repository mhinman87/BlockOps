import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MDEditor from '@uiw/react-md-editor';
import { FileText, Edit3, Save, X, Loader2, CheckCircle2, AlertTriangle, Shield, Tag, Eye } from 'lucide-react';
import { supabase } from '../services/supabase';

const SUPABASE_URL = 'https://msnwupckhoomeiqxfbts.supabase.co';

// Reuse the same clinical styling from DeliverableViewer
const MarkdownComponents = {
  h1: ({ children }) => (
    <div className="mb-8 mt-10 first:mt-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-8 bg-primary rounded-full flex-shrink-0"></div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{children}</h1>
      </div>
      <div className="h-px bg-gray-200 mt-3"></div>
    </div>
  ),
  h2: ({ children }) => (
    <div className="mb-5 mt-8">
      <h2 className="text-xl font-bold text-gray-800 pb-2 border-b border-gray-100">{children}</h2>
    </div>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-bold text-gray-700 mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-sm text-gray-700 font-light leading-relaxed mb-3">{children}</p>
  ),
  blockquote: ({ children }) => (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-5 py-4 my-5">
      <div className="text-sm font-semibold text-amber-900 leading-relaxed [&>p]:mb-0 [&>p]:text-amber-900 [&>p]:font-semibold">{children}</div>
    </div>
  ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-800 text-white">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider">{children}</th>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-gray-100 even:bg-gray-50 hover:bg-primary/5 transition">{children}</tr>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-sm text-gray-700 font-light">{children}</td>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 my-3 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 my-3 ml-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => {
    const text = String(children);
    if (text.startsWith('☐ ') || text.startsWith('☑ ') || text.includes('[x]') || text.includes('[ ]')) {
      const checked = text.startsWith('☑') || text.includes('[x]');
      return (
        <li className="flex items-start gap-3 py-1.5 px-3 bg-gray-50 rounded-lg">
          <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${checked ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`}>
            {checked && <CheckCircle2 size={14} className="text-white" />}
          </div>
          <span className="text-sm text-gray-700 font-light leading-relaxed">{children}</span>
        </li>
      );
    }
    return (
      <li className="flex items-start gap-2 text-sm">
        <span className="text-primary font-bold flex-shrink-0 mt-1">•</span>
        <span className="text-gray-700 font-light leading-relaxed">{children}</span>
      </li>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-gray-500 italic">{children}</em>
  ),
  hr: () => (
    <div className="my-8 flex items-center gap-3">
      <div className="flex-1 h-px bg-gray-200"></div>
      <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>
  ),
  code: ({ children, className }) => {
    if (className) {
      return (
        <code className="block bg-gray-900 text-gray-100 px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto">
          {children}
        </code>
      );
    }
    return <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-semibold">{children}</code>;
  },
};

export const TeamDocViewer = ({ storagePath, title, description, version, isTeam }) => {
  const [content, setContent] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data } = supabase.storage.from('deliverables').getPublicUrl(storagePath);
      const response = await fetch(data.publicUrl);
      if (!response.ok) throw new Error('Failed to fetch');
      const text = await response.text();
      setContent(text);
      setEditContent(text);
    } catch (err) {
      setError('Could not load document.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, [storagePath]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch(
        `${SUPABASE_URL}/storage/v1/object/deliverables/${storagePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': supabase.supabaseKey,
            'Content-Type': 'text/markdown',
          },
          body: editContent,
        }
      );

      if (!response.ok) throw new Error('Save failed');
      
      setContent(editContent);
      setEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save. You may not have write permissions.');
      setTimeout(() => setError(null), 3000);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Document Header */}
      <div className="bg-gray-900 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-primary" size={16} />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Block Ops</span>
          <span className="text-xs text-gray-400 mx-2">|</span>
          <span className="text-xs text-gray-400 font-light">Team Document</span>
        </div>
        <div className="flex items-center gap-2">
          {version && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary">{version}</span>
          )}
          {saveSuccess && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> Saved
            </span>
          )}
        </div>
      </div>

      {/* Title Area */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-sm text-gray-500 font-light mt-1">{description}</p>}
          </div>
          {isTeam && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-semibold"
            >
              <Edit3 size={16} />
              Edit
            </button>
          )}
          {editing && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 transition text-sm font-semibold"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition text-sm font-semibold disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-6 py-2 bg-red-50 border-b border-red-200">
          <span className="text-xs font-semibold text-red-700">{error}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8 lg:p-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : editing ? (
          <div data-color-mode="light">
            <MDEditor
              value={editContent}
              onChange={setEditContent}
              height={600}
              preview="live"
              hideToolbar={false}
            />
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-gray-400" size={14} />
          <span className="text-xs text-gray-400 font-light">Block Ops © {new Date().getFullYear()}</span>
        </div>
        <span className="text-xs text-gray-400 font-light">Internal — Team Only</span>
      </div>
    </div>
  );
};
