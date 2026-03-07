import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Target, Search, FileText, Send, ChevronRight, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../services/supabase';

const SUPABASE_URL = 'https://msnwupckhoomeiqxfbts.supabase.co';

export const LeadsPage = () => {
  const [strategyContent, setStrategyContent] = useState(null);
  const [showStrategy, setShowStrategy] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStrategy = async () => {
    setLoading(true);
    try {
      const url = `${SUPABASE_URL}/storage/v1/object/public/deliverables/team/Lead_Generation_Strategy.md`;
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        setStrategyContent(text);
      }
    } catch (err) {
      console.error('Failed to load strategy:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStrategy();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Lead Pipeline</h1>
            <p className="text-gray-500 mt-1">Scored ASC prospects, dossiers, and outreach tracking</p>
          </div>
        </div>

        {/* Strategy Document Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setShowStrategy(!showStrategy)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="text-primary" size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-900">Lead Generation Strategy</p>
                <p className="text-xs text-gray-500">Quality over quantity — our approach to finding perfect-fit ASCs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">v1.0</span>
              <ChevronRight size={16} className={`text-gray-400 transition-transform ${showStrategy ? 'rotate-90' : ''}`} />
            </div>
          </button>
          
          {showStrategy && strategyContent && (
            <div className="border-t border-gray-200 p-6 md:p-8">
              <div className="prose prose-sm max-w-none
                prose-headings:text-gray-900 prose-headings:uppercase prose-headings:tracking-wide
                prose-h1:text-xl prose-h1:font-black prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3 prose-h1:mb-6
                prose-h2:text-lg prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-base prose-h3:font-bold prose-h3:mt-6
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-strong:text-gray-900
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary prose-code:text-xs
                prose-table:text-sm
                prose-th:bg-gray-50 prose-th:text-gray-900 prose-th:font-bold prose-th:uppercase prose-th:tracking-wide prose-th:text-xs prose-th:px-4 prose-th:py-2
                prose-td:px-4 prose-td:py-2 prose-td:text-gray-600 prose-td:border-gray-200
                prose-li:text-gray-600
                prose-hr:border-gray-200
                prose-blockquote:border-primary prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{strategyContent}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Pipeline Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Researched</p>
            <p className="text-3xl font-black text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Facilities profiled</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Selected</p>
            <p className="text-3xl font-black text-primary">0</p>
            <p className="text-xs text-gray-500 mt-1">Picked for outreach</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Contacted</p>
            <p className="text-3xl font-black text-amber-500">0</p>
            <p className="text-xs text-gray-500 mt-1">Outreach sent</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Discovery Calls</p>
            <p className="text-3xl font-black text-green-500">0</p>
            <p className="text-xs text-gray-500 mt-1">Calls with Samir</p>
          </div>
        </div>

        {/* Prospects Table Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Search className="text-gray-400" size={24} />
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">No prospects yet</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Once Bloq has access to Brave Search and Firescraper, scored ASC dossiers will appear here weekly.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};
