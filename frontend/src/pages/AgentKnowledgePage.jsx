import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { DeliverableViewer } from '../components/DeliverableViewer';
import { 
  Brain,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Layers,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';
import { supabase } from '../services/supabase';

const FILE_METADATA = {
  'Weight_Based_Max_Dose_Calculator.agent.md': { category: 'Safety', units: 10, qaPairs: 9 },
  'LAST_Protocol_Suite.agent.md': { category: 'Safety', units: 9, qaPairs: 7 },
  'Block_Time_Out_Checklist.agent.md': { category: 'Safety', units: 7, qaPairs: 6 },
  'Standardized_Test_Dose_Protocol.agent.md': { category: 'Safety', units: 8, qaPairs: 6 },
  'High_Volume_Dilution_Chart.agent.md': { category: 'Safety', units: 8, qaPairs: 0 },
  'LAST_Second_Responder_Nursing_Competency.agent.md': { category: 'Safety', units: 8, qaPairs: 0 },
  'Block_Champion_Charter.agent.md': { category: 'Governance', units: 11, qaPairs: 8 },
  'Block_Lead_Nurse_Responsibility_List.agent.md': { category: 'Governance', units: 9, qaPairs: 7 },
};

const humanizeFileName = (fileName) => fileName
  .replace(/\.agent\.md$/i, '')
  .replace(/_/g, ' ')
  .replace(/\b\w/g, char => char.toUpperCase());

export const AgentKnowledgePage = () => {
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [agentFiles, setAgentFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isTeam } = useUserRole();

  useEffect(() => {
    if (location.state?.reset) setSelectedFile(null);
  }, [location.state]);

  const loadAgentFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: listError } = await supabase
        .storage
        .from('deliverables')
        .list('agent-knowledge', { limit: 200, sortBy: { column: 'name', order: 'asc' } });

      if (listError) throw listError;

      const files = (data || [])
        .filter((file) => file.name.endsWith('.agent.md'))
        .map((file) => {
          const meta = FILE_METADATA[file.name] || {};
          return {
            name: humanizeFileName(file.name),
            path: `agent-knowledge/${file.name}`,
            deliverable: humanizeFileName(file.name),
            category: meta.category || 'General',
            status: 'complete',
            units: meta.units || 0,
            qaPairs: meta.qaPairs || 0,
          };
        });

      setAgentFiles(files);
    } catch (err) {
      console.error(err);
      setError('Failed to load agent knowledge files from storage.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgentFiles();
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const totalUnits = agentFiles.reduce((sum, f) => sum + f.units, 0);
  const totalQA = agentFiles.reduce((sum, f) => sum + f.qaPairs, 0);
  const totalFiles = agentFiles.length;
  const completeFiles = agentFiles.filter(f => f.status === 'complete').length;

  if (selectedFile) {
    const deliverableObj = {
      name: selectedFile.name + ' — Agent Knowledge',
      storagePath: selectedFile.path,
    };
    return (
      <DashboardLayout>
        <div className="p-6">
          <DeliverableViewer 
            deliverable={deliverableObj} 
            onBack={() => setSelectedFile(null)}
            userRole={isTeam ? 'team' : 'client'}
          />
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

        <div className="flex items-center justify-end mb-4">
          <button
            onClick={loadAgentFiles}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg hover:border-primary/30 transition disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
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
        {loading ? (
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-12 text-center">
            <Loader2 size={24} className="animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading agent knowledge from storage...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agentFiles.map((file, idx) => (
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
        )}

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
