import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, FileText, Tag, Loader2, CheckCircle2, AlertTriangle, X, Shield } from 'lucide-react';
import { supabase } from '../services/supabase';

// Custom renderers for clinical document styling
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
  h3: ({ children }) => {
    const text = String(children);
    // Detect warning/alert headers
    if (text.includes('⚠️') || text.toLowerCase().includes('critical') || text.toLowerCase().includes('warning')) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg px-4 py-3 mt-6 mb-4">
          <h3 className="text-base font-bold text-red-800 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
            {children}
          </h3>
        </div>
      );
    }
    return <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">{children}</h3>;
  },
  h4: ({ children }) => (
    <h4 className="text-base font-bold text-gray-700 mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }) => {
    const text = String(children);
    // Detect key rules / important callouts
    if (text.startsWith('Any neurological') || text.includes('until proven otherwise')) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg px-5 py-4 my-4">
          <p className="text-sm font-semibold text-red-800 leading-relaxed">{children}</p>
        </div>
      );
    }
    // Detect notes
    if (text.startsWith('Note:') || text.startsWith('*Note')) {
      return (
        <div className="bg-gray-50 border-l-3 border-gray-300 rounded-r px-4 py-2 my-3">
          <p className="text-sm text-gray-600 font-light leading-relaxed italic">{children}</p>
        </div>
      );
    }
    return <p className="text-sm text-gray-700 font-light leading-relaxed mb-3">{children}</p>;
  },
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
  tr: ({ children, ...props }) => (
    <tr className="border-b border-gray-100 even:bg-gray-50 hover:bg-primary/5 transition">{children}</tr>
  ),
  td: ({ children }) => {
    const text = String(children);
    // Bold key values (dosages, numbers)
    if (/^\*\*/.test(text) || /^\d/.test(text)) {
      return <td className="px-4 py-2.5 text-sm font-semibold text-gray-900">{children}</td>;
    }
    return <td className="px-4 py-2.5 text-sm text-gray-700 font-light">{children}</td>;
  },
  ul: ({ children }) => (
    <ul className="space-y-1.5 my-3 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 my-3 ml-1 list-none counter-reset-step">{children}</ol>
  ),
  li: ({ children, ordered, index }) => {
    const text = String(children);
    // Detect checklist items
    if (text.startsWith('☐ ') || text.startsWith('☑ ')) {
      const checked = text.startsWith('☑');
      return (
        <li className="flex items-start gap-3 py-1.5 px-3 bg-gray-50 rounded-lg">
          <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${checked ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`}>
            {checked && <CheckCircle2 size={14} className="text-white" />}
          </div>
          <span className="text-sm text-gray-700 font-light leading-relaxed">{text.slice(2)}</span>
        </li>
      );
    }
    // Detect STOP/AVOID items
    if (text.includes('AVOID') || text.includes('STOP')) {
      return (
        <li className="flex items-start gap-2 text-sm">
          <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">✕</span>
          <span className="text-gray-700 font-light leading-relaxed">{children}</span>
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
      // Code block
      return (
        <code className="block bg-gray-900 text-gray-100 px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto">
          {children}
        </code>
      );
    }
    return <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-semibold">{children}</code>;
  },
};

export const DeliverableViewer = ({ deliverable, onBack, userRole, onStatusUpdate, currentStatus }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!deliverable?.storagePath) {
        setError('No file path configured for this deliverable.');
        setLoading(false);
        return;
      }

      try {
        const { data } = supabase.storage
          .from('deliverables')
          .getPublicUrl(deliverable.storagePath);

        const response = await fetch(data.publicUrl);
        if (!response.ok) throw new Error('Failed to fetch document');
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError('Could not load this document. It may not have been uploaded yet.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [deliverable]);

  const handleApprove = async () => {
    if (!onStatusUpdate) return;
    setUpdating(true);
    await onStatusUpdate(deliverable.storagePath, 'approved');
    setUpdating(false);
  };

  const handleNeedsRevision = async () => {
    if (!onStatusUpdate) return;
    setUpdating(true);
    await onStatusUpdate(deliverable.storagePath, 'needs_revision', revisionNotes);
    setShowRevisionModal(false);
    setRevisionNotes('');
    setUpdating(false);
  };

  const getStatusBadge = () => {
    switch (currentStatus) {
      case 'approved':
        return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1.5"><CheckCircle2 size={14} /> Approved</span>;
      case 'needs_revision':
        return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1.5"><AlertTriangle size={14} /> Needs Revision</span>;
      default:
        return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">Draft — Pending Review</span>;
    }
  };

  if (!deliverable) return null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition font-semibold mb-4"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Document Header Card */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
          {/* Top bar */}
          <div className="bg-gray-900 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="text-primary" size={16} />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Block Ops</span>
              <span className="text-xs text-gray-400 mx-2">|</span>
              <span className="text-xs text-gray-400 font-light">Foundation Package</span>
            </div>
            {getStatusBadge()}
          </div>
          
          {/* Title area */}
          <div className="px-6 py-5">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{deliverable.title}</h1>
            <p className="text-sm text-gray-500 font-light mt-1">{deliverable.description}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              {deliverable.categoryLabel && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Tag size={12} />
                  <span>{deliverable.categoryLabel}</span>
                </div>
              )}
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-400">Version: DRAFT v0.1</span>
            </div>
          </div>

          {/* Reviewer Actions */}
          {userRole?.isReviewer && currentStatus !== 'approved' && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleApprove}
                disabled={updating}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                {updating ? 'Updating...' : 'Approve'}
              </button>
              <button
                onClick={() => setShowRevisionModal(true)}
                disabled={updating}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition text-sm font-semibold disabled:opacity-50"
              >
                <AlertTriangle size={16} />
                Needs Revision
              </button>
            </div>
          )}

          {userRole?.isReviewer && currentStatus === 'approved' && (
            <div className="px-6 py-3 bg-green-50 border-t border-green-200 flex items-center gap-2">
              <CheckCircle2 className="text-green-600" size={16} />
              <span className="text-sm text-green-800 font-semibold">This deliverable has been approved.</span>
            </div>
          )}
        </div>
      </div>

      {/* Revision Notes Modal */}
      {showRevisionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Revision Notes</h3>
              <button onClick={() => setShowRevisionModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 font-light mb-3">Describe what needs to be changed:</p>
            <textarea
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm font-light"
              placeholder="e.g., Dosing table needs updated values for ropivacaine..."
            />
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => setShowRevisionModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleNeedsRevision}
                disabled={updating || !revisionNotes.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold disabled:opacity-50"
              >
                {updating ? 'Submitting...' : 'Submit Revision Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Content */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Draft watermark banner */}
        {currentStatus !== 'approved' && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-center">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">⚠ Draft Document — Not for Clinical Use — Pending Review</span>
          </div>
        )}
        
        <div className="p-6 sm:p-8 lg:p-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-gray-500 font-semibold">{error}</p>
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

        {/* Document footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-gray-400" size={14} />
            <span className="text-xs text-gray-400 font-light">Block Ops © {new Date().getFullYear()}</span>
          </div>
          <span className="text-xs text-gray-400 font-light">Foundation Package — Safety</span>
        </div>
      </div>
    </div>
  );
};
