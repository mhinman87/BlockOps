import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { DeliverableViewer } from '../components/DeliverableViewer';
import { 
  Brain,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Layers
} from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';
import { supabase } from '../services/supabase';

const AGENT_FILES = [
  {
    name: 'Weight-Based Max Dose Calculator',
    path: 'agent-knowledge/Weight_Based_Max_Dose_Calculator.agent.md',
    deliverable: 'Weight-Based Max Dose Calculator',
    category: 'Safety',
    status: 'complete',
    units: 10,
    qaPairs: 9,
  },
  {
    name: 'LAST Protocol Suite',
    path: 'agent-knowledge/LAST_Protocol_Suite.agent.md',
    deliverable: 'LAST Protocol Suite',
    category: 'Safety',
    status: 'complete',
    units: 9,
    qaPairs: 7,
  },
  {
    name: 'Block Time-Out Checklist',
    path: 'agent-knowledge/Block_Time_Out_Checklist.agent.md',
    deliverable: 'Block Time-Out Checklist',
    category: 'Safety',
    status: 'complete',
    units: 7,
    qaPairs: 6,
  },
  {
    name: 'Standardized Test Dose Protocol',
    path: 'agent-knowledge/Standardized_Test_Dose_Protocol.agent.md',
    deliverable: 'Standardized Test Dose Protocol',
    category: 'Safety',
    status: 'complete',
    units: 8,
    qaPairs: 6,
  },
];

export const AgentKnowledgePage = () => {
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { isTeam } = useUserRole();

  useEffect(() => {
    if (location.state?.reset) setSelectedFile(null);
  }, [location.state]);

  const handleFileClick = async (file) => {
    setSelectedFile(file);
    setLoading(true);
    try {
      const { data } = supabase.storage
        .from('deliverables')
        .getPublicUrl(file.path);
      const res = await fetch(data.publicUrl);
      if (res.ok) {
        const text = await res.text();
        setContent(text);
      } else {
        setContent('# File not found\n\nThis agent knowledge file has not been uploaded yet.');
      }
    } catch (err) {
      setContent('# Error loading file\n\n' + err.message);
    }
    setLoading(false);
  };

  const totalUnits = AGENT_FILES.reduce((sum, f) => sum + f.units, 0);
  const totalQA = AGENT_FILES.reduce((sum, f) => sum + f.qaPairs, 0);
  const totalFiles = AGENT_FILES.length;
  const completeFiles = AGENT_FILES.filter(f => f.status === 'complete').length;

  if (selectedFile) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <button
            onClick={() => setSelectedFile(null)}
            className="mb-4 text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-1"
          >
            ← Back to Agent Knowledge
          </button>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <DeliverableViewer content={content} title={selectedFile.name + ' — Agent Knowledge'} />
          )}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="text-primary" size={28} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Knowledge Base</h1>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">Layer 2</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            AI-optimized knowledge files derived from approved deliverables. Contains facts, reasoning, exceptions, decision trees, clinical pearls, and Q&A pairs for client agent training.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{totalFiles}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Knowledge Files</div>
          </div>
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{totalUnits}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Knowledge Units</div>
          </div>
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{totalQA}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Q&A Pairs</div>
          </div>
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-500">{completeFiles}/{totalFiles}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Complete</div>
          </div>
        </div>

        {/* Architecture Info */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Layers className="text-primary mt-0.5" size={20} />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Three-Layer Architecture</h3>
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <p><span className="font-semibold">Layer 1:</span> Deliverables — Human-readable clinical references (client-facing)</p>
                <p><span className="font-semibold text-primary">Layer 2:</span> Agent Knowledge — AI-optimized knowledge units with reasoning, exceptions, and edge cases (this page)</p>
                <p><span className="font-semibold">Layer 3:</span> Client Configuration — Site-specific parameters per facility (future)</p>
              </div>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="space-y-3">
          {AGENT_FILES.map((file, idx) => (
            <div
              key={idx}
              onClick={() => handleFileClick(file)}
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{file.name}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{file.category}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{file.units} units</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{file.qaPairs} Q&A pairs</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === 'complete' ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                      <CheckCircle2 size={12} /> Complete
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-full">
                      <Clock size={12} /> Pending
                    </span>
                  )}
                  <Eye size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Deliverables Note */}
        <div className="mt-8 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-amber-500 mt-0.5" size={16} />
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">Remaining Deliverables</h4>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                Agent knowledge files are created in real-time during deliverable review sessions with Dr. Bhakta. 
                As each deliverable is reviewed and approved, its companion Layer 2 file is built simultaneously to capture 
                all clinical nuance and reasoning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
