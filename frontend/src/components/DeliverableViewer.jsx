import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, FileText, Tag, Loader2, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { supabase } from '../services/supabase';

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
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1"><CheckCircle2 size={12} /> Approved</span>;
      case 'needs_revision':
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700 flex items-center gap-1"><AlertTriangle size={12} /> Needs Revision</span>;
      default:
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">Draft — Pending Review</span>;
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
        
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{deliverable.title}</h1>
            <p className="text-sm text-gray-500 font-light mt-1">{deliverable.description}</p>
          </div>
          {getStatusBadge()}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FileText size={14} />
            <span>Foundation Package</span>
          </div>
          {deliverable.categoryLabel && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Tag size={14} />
              <span>{deliverable.categoryLabel}</span>
            </div>
          )}
        </div>

        {/* Reviewer Actions */}
        {userRole?.isReviewer && currentStatus !== 'approved' && (
          <div className="mt-4 flex gap-3">
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold disabled:opacity-50"
            >
              <AlertTriangle size={16} />
              Needs Revision
            </button>
          </div>
        )}

        {/* Show if already approved */}
        {userRole?.isReviewer && currentStatus === 'approved' && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={16} />
            <span className="text-sm text-green-800 font-semibold">This deliverable has been approved.</span>
          </div>
        )}
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

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-gray-500 font-semibold">{error}</p>
          </div>
        ) : (
          <div className="prose prose-sm sm:prose max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-2xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3 prose-h1:mb-6
            prose-h2:text-xl prose-h2:mt-8
            prose-h3:text-lg prose-h3:mt-6
            prose-h4:text-base
            prose-p:text-gray-700 prose-p:font-light prose-p:leading-relaxed
            prose-li:text-gray-700 prose-li:font-light
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-table:text-sm
            prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-gray-700
            prose-td:px-3 prose-td:py-2 prose-td:border-b prose-td:border-gray-100
            prose-hr:border-gray-200
            prose-blockquote:border-primary prose-blockquote:text-gray-600
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          ">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
