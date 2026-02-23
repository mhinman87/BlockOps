import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  ChevronRight,
  Stethoscope,
  Zap,
  Monitor,
  Users,
  Building2,
  BarChart3,
  Filter,
  Grid3X3,
  List,
  Clock,
  Tag,
  Lock,
  Eye
} from 'lucide-react';

export const KnowledgeLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const pillars = [
    { id: 'clinical', icon: Stethoscope, label: 'Clinical Architecture', color: 'bg-blue-500' },
    { id: 'operations', icon: Zap, label: 'Physical Operations', color: 'bg-amber-500' },
    { id: 'digital', icon: Monitor, label: 'Digital Platform', color: 'bg-purple-500' },
    { id: 'human', icon: Users, label: 'Human Capital', color: 'bg-green-500' },
    { id: 'stakeholder', icon: Building2, label: 'Stakeholder Integration', color: 'bg-rose-500' },
    { id: 'value', icon: BarChart3, label: 'Value Intelligence', color: 'bg-cyan-500' },
  ];

  const contentTypes = [
    { id: 'all', label: 'All' },
    { id: 'protocol', label: 'Protocols' },
    { id: 'reference', label: 'Reference Cards' },
    { id: 'template', label: 'Templates' },
    { id: 'video', label: 'Videos' },
    { id: 'guide', label: 'Guides' },
  ];

  // Dummy library content
  const libraryItems = [
    // Clinical Architecture
    {
      id: 1,
      title: 'LAST Protocol — Local Anesthetic Systemic Toxicity',
      description: 'Evidence-based emergency response protocol for LAST events. Includes intralipid dosing, airway management algorithm, and post-event reporting template.',
      pillar: 'clinical',
      type: 'protocol',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-15',
      version: '1.0',
      tags: ['Safety', 'Emergency', 'Foundation'],
      access: 'all',
    },
    {
      id: 2,
      title: 'Regional Anesthesia Time-Out Checklist',
      description: 'Standardized pre-procedure safety checklist including patient verification, consent confirmation, laterality check, and equipment readiness.',
      pillar: 'clinical',
      type: 'reference',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-15',
      version: '1.0',
      tags: ['Safety', 'Checklist', 'Foundation'],
      access: 'all',
    },
    {
      id: 3,
      title: 'Adductor Canal Block — Clinical Protocol',
      description: 'Complete technique guide for single-shot adductor canal block. Includes ultrasound anatomy, needle approach, local anesthetic selection, and dosing calculator.',
      pillar: 'clinical',
      type: 'protocol',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-18',
      version: '1.0',
      tags: ['Block Pack', 'Adductor Canal', 'Knee'],
      access: 'provider',
    },
    {
      id: 4,
      title: 'Adductor Canal Block — Pocket Reference Card',
      description: 'Quick-reference card with ultrasound landmarks, needle trajectory, dosing ranges, and troubleshooting tips. Designed for bedside use.',
      pillar: 'clinical',
      type: 'reference',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-18',
      version: '1.0',
      tags: ['Block Pack', 'Adductor Canal', 'Quick Ref'],
      access: 'provider',
    },
    {
      id: 5,
      title: 'Pharmacology Quick Reference — Local Anesthetics',
      description: 'Max dose calculations, onset/duration profiles, and comparison chart for lidocaine, bupivacaine, ropivacaine, and chloroprocaine.',
      pillar: 'clinical',
      type: 'reference',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-15',
      version: '1.0',
      tags: ['Pharmacology', 'Foundation', 'Dosing'],
      access: 'all',
    },
    {
      id: 6,
      title: 'Ultrasound-Guided Block Technique — Video Series',
      description: 'Narrated demonstration of proper probe handling, in-plane needle visualization, and hydrodissection technique.',
      pillar: 'clinical',
      type: 'video',
      format: 'Video',
      icon: Video,
      updated: '2026-02-20',
      version: '1.0',
      tags: ['Training', 'Technique', 'Foundation'],
      access: 'provider',
    },

    // Physical Operations
    {
      id: 7,
      title: 'Block Bay Setup Guide',
      description: 'Complete specifications for a dedicated regional anesthesia block bay: equipment list, monitor placement, supply cart organization, and privacy requirements.',
      pillar: 'operations',
      type: 'guide',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-15',
      version: '1.0',
      tags: ['Infrastructure', 'Foundation', 'Setup'],
      access: 'admin',
    },
    {
      id: 8,
      title: 'Block Cart Equipment Checklist',
      description: 'Standardized checklist for daily block cart preparation. Includes needle inventory, local anesthetic stock, ultrasound supplies, and emergency equipment.',
      pillar: 'operations',
      type: 'reference',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-15',
      version: '1.0',
      tags: ['Equipment', 'Checklist', 'Daily'],
      access: 'all',
    },
    {
      id: 9,
      title: 'Pre-Op Workflow Integration Guide',
      description: 'How to integrate block procedures into existing pre-op flow without adding delays. Scheduling templates and time-motion analysis.',
      pillar: 'operations',
      type: 'guide',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-16',
      version: '1.0',
      tags: ['Workflow', 'Scheduling', 'Foundation'],
      access: 'admin',
    },

    // Digital Platform
    {
      id: 10,
      title: 'EMR Documentation Template — Nerve Block',
      description: 'Standardized note template for documenting nerve block procedures. Includes pre-procedure assessment, technique details, and post-procedure monitoring.',
      pillar: 'digital',
      type: 'template',
      format: 'DOCX',
      icon: FileText,
      updated: '2026-02-17',
      version: '1.0',
      tags: ['EMR', 'Documentation', 'Foundation'],
      access: 'provider',
    },
    {
      id: 11,
      title: 'Block Success Tracking Log',
      description: 'Data collection template for tracking block success rates, onset times, patient satisfaction, and complications. Feeds into quarterly outcome reports.',
      pillar: 'digital',
      type: 'template',
      format: 'XLSX',
      icon: FileText,
      updated: '2026-02-17',
      version: '1.0',
      tags: ['Tracking', 'Outcomes', 'Data'],
      access: 'provider',
    },

    // Human Capital
    {
      id: 12,
      title: 'Nursing Competency Checklist — Regional Anesthesia',
      description: 'Tiered competency framework for nursing staff managing patients with regional blocks. Covers assessment, monitoring, troubleshooting, and escalation.',
      pillar: 'human',
      type: 'reference',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-18',
      version: '1.0',
      tags: ['Nursing', 'Competency', 'Training'],
      access: 'all',
    },
    {
      id: 13,
      title: 'Champion Provider Activation Guide',
      description: 'Onboarding guide for the on-site champion provider. Covers role responsibilities, program governance, and escalation pathways.',
      pillar: 'human',
      type: 'guide',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-15',
      version: '1.0',
      tags: ['Champion', 'Governance', 'Foundation'],
      access: 'provider',
    },

    // Stakeholder Integration
    {
      id: 14,
      title: 'Surgeon Compact Template',
      description: 'Agreement template between the regional anesthesia team and surgical service. Defines expectations, communication protocols, and feedback loops.',
      pillar: 'stakeholder',
      type: 'template',
      format: 'DOCX',
      icon: FileText,
      updated: '2026-02-19',
      version: '1.0',
      tags: ['Surgeon', 'Agreement', 'Foundation'],
      access: 'admin',
    },
    {
      id: 15,
      title: 'Patient Education — What to Expect (Nerve Block)',
      description: 'Patient-facing brochure explaining nerve blocks in plain language. Covers what it is, what to expect, home care instructions, and when to call.',
      pillar: 'stakeholder',
      type: 'guide',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-16',
      version: '1.0',
      tags: ['Patient', 'Education', 'Consent'],
      access: 'all',
    },
    {
      id: 16,
      title: 'Home Instructions — Adductor Canal Block',
      description: 'Post-discharge instruction sheet for patients who received an adductor canal block. Covers expected numbness duration, activity restrictions, and warning signs.',
      pillar: 'stakeholder',
      type: 'reference',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-18',
      version: '1.0',
      tags: ['Patient', 'Block Pack', 'Adductor Canal'],
      access: 'all',
    },

    // Value Intelligence
    {
      id: 17,
      title: 'CPT/ICD Coding Guide — Regional Anesthesia',
      description: 'Complete billing reference for regional anesthesia procedures. Includes CPT codes, modifiers, ICD-10 mappings, and common denial reasons with appeal templates.',
      pillar: 'value',
      type: 'guide',
      format: 'PDF',
      icon: FileText,
      updated: '2026-02-20',
      version: '1.0',
      tags: ['Billing', 'CPT', 'Revenue'],
      access: 'admin',
    },
    {
      id: 18,
      title: 'Quarterly Outcome Report Template',
      description: 'Template for generating quarterly program performance reports. Block success rates, complication tracking, financial impact, and recommendations.',
      pillar: 'value',
      type: 'template',
      format: 'XLSX',
      icon: FileText,
      updated: '2026-02-19',
      version: '1.0',
      tags: ['Reporting', 'Outcomes', 'Quarterly'],
      access: 'admin',
    },
  ];

  // Filter logic
  const filteredItems = libraryItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.pillar === activeCategory;
    const matchesType = activeType === 'all' || item.type === activeType;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  const getPillarInfo = (pillarId) => pillars.find(p => p.id === pillarId);

  const getAccessBadge = (access) => {
    switch(access) {
      case 'provider': return { label: 'Provider', color: 'bg-blue-100 text-blue-700' };
      case 'admin': return { label: 'Admin', color: 'bg-amber-100 text-amber-700' };
      default: return { label: 'All Roles', color: 'bg-gray-100 text-gray-600' };
    }
  };

  const getFormatBadge = (format) => {
    switch(format) {
      case 'Video': return 'bg-red-100 text-red-700';
      case 'XLSX': return 'bg-green-100 text-green-700';
      case 'DOCX': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Knowledge Library</h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Protocols, references, templates, and training materials — organized by the Gold Standard framework.
        </p>
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search protocols, templates, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-light"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-lg border transition ${viewMode === 'grid' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-lg border transition ${viewMode === 'list' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Pillar Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
          }`}
        >
          All Pillars
        </button>
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <button
              key={pillar.id}
              onClick={() => setActiveCategory(pillar.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeCategory === pillar.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon size={12} />
              {pillar.label}
            </button>
          );
        })}
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeType === type.id ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-400 mb-4 font-semibold">
        {filteredItems.length} {filteredItems.length === 1 ? 'resource' : 'resources'} found
      </p>

      {/* Content Grid / List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const pillarInfo = getPillarInfo(item.pillar);
            const accessBadge = getAccessBadge(item.access);
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group cursor-pointer">
                {/* Top row — pillar + access */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${pillarInfo.color}`}></div>
                    <span className="text-xs font-semibold text-gray-400">{pillarInfo.label}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${accessBadge.color}`}>
                    {accessBadge.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-primary transition leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom row — format + version + date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getFormatBadge(item.format)}`}>
                      {item.format}
                    </span>
                    <span className="text-xs text-gray-400">v{item.version}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{item.updated}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => {
            const pillarInfo = getPillarInfo(item.pillar);
            const accessBadge = getAccessBadge(item.access);
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg px-5 py-3 hover:border-primary/40 hover:shadow-sm transition flex items-center gap-4 cursor-pointer group">
                <div className={`w-2 h-8 rounded-full ${pillarInfo.color} flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition truncate">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-light truncate">{item.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getFormatBadge(item.format)}`}>{item.format}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${accessBadge.color}`}>{accessBadge.label}</span>
                  <span className="text-xs text-gray-400 w-20 text-right">{item.updated}</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-semibold">No resources found</p>
          <p className="text-gray-400 text-sm font-light mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </DashboardLayout>
  );
};
