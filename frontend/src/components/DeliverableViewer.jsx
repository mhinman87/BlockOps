import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, FileText, Tag } from 'lucide-react';

export const DeliverableViewer = ({ deliverable, onBack }) => {
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
          Back to Library
        </button>
        
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{deliverable.title}</h1>
            <p className="text-sm text-gray-500 font-light mt-1">{deliverable.description}</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
            Draft — Pending Review
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FileText size={14} />
            <span>Foundation Package</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Tag size={14} />
            <span>{deliverable.categoryLabel}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10">
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
          <ReactMarkdown>{deliverable.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
