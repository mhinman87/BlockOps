import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  Search, 
  BookOpen, 
  FileText, 
  ChevronRight,
  Shield,
  Zap,
  Stethoscope,
  Monitor,
  Users,
  Building2,
  BarChart3,
  Grid3X3,
  List,
  Clock,
  Beaker
} from 'lucide-react';

export const KnowledgeLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'safety', icon: Shield, label: 'Safety', color: 'bg-red-500' },
    { id: 'pharmacology', icon: Beaker, label: 'Pharmacology', color: 'bg-purple-500' },
    { id: 'technique', icon: Stethoscope, label: 'Technical Fundamentals', color: 'bg-blue-500' },
    { id: 'sterile', icon: Zap, label: 'Sterile Technique', color: 'bg-teal-500' },
    { id: 'infrastructure', icon: Building2, label: 'Physical Infrastructure', color: 'bg-amber-500' },
    { id: 'documentation', icon: Monitor, label: 'Documentation & Digital', color: 'bg-indigo-500' },
    { id: 'nursing', icon: Users, label: 'Nursing Competencies', color: 'bg-green-500' },
    { id: 'patient', icon: Users, label: 'Patient Experience', color: 'bg-rose-500' },
    { id: 'compliance', icon: BarChart3, label: 'Compliance & Billing', color: 'bg-cyan-500' },
    { id: 'governance', icon: Shield, label: 'Governance', color: 'bg-orange-500' },
  ];

  // Real Foundation deliverables built with Samir
  const libraryItems = [
    // Safety (6)
    { id: 1, title: 'Block Time-Out Checklist', description: '9-point verification checklist that must be completed before sedation. Covers patient ID, consent, laterality, allergies, anticoagulation status, and equipment readiness.', category: 'safety', status: 'draft', tags: ['Foundation', 'Safety'] },
    { id: 2, title: 'LAST Protocol Suite', description: 'Four-part local anesthetic systemic toxicity protocol: prevention strategies, recognition signs, crisis response algorithm, and intralipid stocking/administration guide.', category: 'safety', status: 'draft', tags: ['Foundation', 'Safety', 'Emergency'] },
    { id: 3, title: 'Standardized Test Dose Protocol', description: 'Standardized protocol for test dose administration before local anesthetic injection to detect intravascular placement.', category: 'safety', status: 'draft', tags: ['Foundation', 'Safety'] },
    { id: 4, title: 'Weight-Based Max Dose Calculator', description: 'Dosing reference with volume tables for common patient weights and local anesthetic concentrations. Prevents overdose errors.', category: 'safety', status: 'draft', tags: ['Foundation', 'Safety', 'Dosing'] },
    { id: 5, title: 'High-Volume Dilution Chart', description: 'Dilution reference for plane blocks (TAP, PECS, serratus) where higher volumes at lower concentrations are needed for adequate spread.', category: 'safety', status: 'draft', tags: ['Foundation', 'Safety', 'Dosing'] },
    { id: 6, title: 'LAST Second Responder Nursing Competency', description: 'Nursing-specific competency checklist for responding to LAST events as second responder. Covers intralipid preparation, airway assistance, and documentation.', category: 'safety', status: 'draft', tags: ['Foundation', 'Safety', 'Nursing'] },

    // Pharmacology (3)
    { id: 7, title: 'LA Selection Algorithm', description: 'Decision algorithm for local anesthetic selection. Bupivacaine default long-acting, mepivacaine default short-acting, with alternatives and clinical rationale.', category: 'pharmacology', status: 'draft', tags: ['Foundation', 'Pharmacology'] },
    { id: 8, title: 'Adjuvant Dosing Guide', description: 'Standardized adjuvant dosing: dexamethasone 4mg + epinephrine 1:400K as defaults, clonidine as secondary option. Includes evidence summaries.', category: 'pharmacology', status: 'draft', tags: ['Foundation', 'Pharmacology', 'Dosing'] },
    { id: 9, title: 'Exparel Utilization Criteria', description: 'Evidence-based assessment of liposomal bupivacaine. Not recommended as default due to 20-80x cost for marginal benefit over standard LA with adjuvants.', category: 'pharmacology', status: 'draft', tags: ['Foundation', 'Pharmacology'] },

    // Technical Fundamentals (7)
    { id: 10, title: 'Knobology Cheat Sheet', description: 'Quick reference for ultrasound machine settings: depth, gain, focus, frequency optimization for nerve block imaging.', category: 'technique', status: 'draft', tags: ['Foundation', 'Technique', 'Ultrasound'] },
    { id: 11, title: 'PART Maneuver Guide', description: 'Probe manipulation technique guide: Pressure, Alignment, Rotation, and Tilting for optimal ultrasound visualization.', category: 'technique', status: 'draft', tags: ['Foundation', 'Technique', 'Ultrasound'] },
    { id: 12, title: 'Triangle of Success Setup Guide', description: 'Ergonomic positioning guide for operator, patient, ultrasound machine, and equipment to optimize block performance.', category: 'technique', status: 'draft', tags: ['Foundation', 'Technique', 'Ergonomics'] },
    { id: 13, title: 'In-Plane Technique SOP', description: 'Standard operating procedure for in-plane needle approach. Block Ops default technique for all 6 launch blocks.', category: 'technique', status: 'draft', tags: ['Foundation', 'Technique'] },
    { id: 14, title: 'Out-of-Plane Technique SOP', description: 'Standard operating procedure for out-of-plane needle approach. Specific applications only — not the default technique.', category: 'technique', status: 'draft', tags: ['Foundation', 'Technique'] },
    { id: 15, title: 'Hydrodissection & Opening Pressure Protocol', description: 'Protocol for using hydrodissection to confirm correct tissue plane and assess opening pressure before full injection.', category: 'technique', status: 'draft', tags: ['Foundation', 'Technique'] },
    { id: 16, title: 'Intraneural Injection Stop Criteria', description: 'Four evidence-based stop criteria for detecting and preventing intraneural injection during nerve blocks.', category: 'technique', status: 'draft', tags: ['Foundation', 'Technique', 'Safety'] },

    // Sterile Technique (2)
    { id: 17, title: 'Clean vs Sterile Protocol', description: 'Defines when clean technique is acceptable vs when full sterile technique is required for different block types and clinical settings.', category: 'sterile', status: 'draft', tags: ['Foundation', 'Sterile Technique'] },
    { id: 18, title: 'Probe Cover & Gel Management Standard', description: 'Standardized protocol for probe cover selection, application, gel management, and contamination prevention.', category: 'sterile', status: 'draft', tags: ['Foundation', 'Sterile Technique'] },

    // Physical Infrastructure (6)
    { id: 19, title: 'Block Cart Planogram', description: 'Visual layout specification for the regional anesthesia block cart. Standardized drawer assignments, supply locations, and labeling system.', category: 'infrastructure', status: 'draft', tags: ['Foundation', 'Infrastructure'] },
    { id: 20, title: 'Daily Cart Restock Checklist', description: 'Daily checklist for nursing staff to verify block cart supplies, expiration dates, and equipment readiness before first case.', category: 'infrastructure', status: 'draft', tags: ['Foundation', 'Infrastructure', 'Daily'] },
    { id: 21, title: 'Block Bay Workflow Logic', description: 'Workflow diagram and logic for patient flow through the block bay — from arrival to block completion to OR transport.', category: 'infrastructure', status: 'draft', tags: ['Foundation', 'Infrastructure', 'Workflow'] },
    { id: 22, title: 'Machine Cleaning Checklist', description: 'Ultrasound machine cleaning and maintenance protocol. Daily, weekly, and post-case cleaning requirements.', category: 'infrastructure', status: 'draft', tags: ['Foundation', 'Infrastructure'] },
    { id: 23, title: 'Probe Cover Selection Guide', description: 'Guide for selecting appropriate probe covers based on block type, sterility requirements, and clinical setting.', category: 'infrastructure', status: 'draft', tags: ['Foundation', 'Infrastructure'] },
    { id: 24, title: 'Gel Management SOP', description: 'Standard operating procedure for ultrasound gel handling, contamination prevention, and waste management.', category: 'infrastructure', status: 'draft', tags: ['Foundation', 'Infrastructure'] },

    // Documentation & Digital (4)
    { id: 25, title: 'PreOp Nursing Smart Template', description: 'Pre-operative nursing assessment template specific to regional anesthesia patients. Structured fields for block-relevant history and assessment.', category: 'documentation', status: 'draft', tags: ['Foundation', 'Documentation', 'EMR'] },
    { id: 26, title: 'PACU Block Assessment Smart Template', description: 'Post-anesthesia care unit assessment template for monitoring patients with active nerve blocks. Includes sensory/motor checks.', category: 'documentation', status: 'draft', tags: ['Foundation', 'Documentation', 'EMR'] },
    { id: 27, title: 'Block Status Tracking Board Guide', description: 'Setup guide for a visual tracking board showing block status for all active patients — for OR and PACU visibility.', category: 'documentation', status: 'draft', tags: ['Foundation', 'Documentation', 'Tracking'] },
    { id: 28, title: 'Block Success/Failure Log', description: 'Data collection template for tracking block outcomes: success rates, onset times, rescue requirements, and complications.', category: 'documentation', status: 'draft', tags: ['Foundation', 'Documentation', 'Outcomes'] },

    // Nursing Competencies (5)
    { id: 29, title: 'Sedation Administration & Monitoring SOP', description: 'Protocol for nursing administration and monitoring of procedural sedation during nerve block placement.', category: 'nursing', status: 'draft', tags: ['Foundation', 'Nursing'] },
    { id: 30, title: 'Sterile Setup & Assist Competency', description: 'Competency checklist for nursing staff assisting with nerve block procedures — sterile field preparation, equipment handling, and provider support.', category: 'nursing', status: 'draft', tags: ['Foundation', 'Nursing', 'Competency'] },
    { id: 31, title: 'Fall Risk Assessment', description: 'Nursing assessment tool for fall risk in patients with active lower extremity nerve blocks. Includes prevention interventions.', category: 'nursing', status: 'draft', tags: ['Foundation', 'Nursing', 'Safety'] },
    { id: 32, title: 'Red Flag Recognition Card', description: 'Quick-reference card for nursing staff listing red flag signs and symptoms requiring immediate escalation in block patients.', category: 'nursing', status: 'draft', tags: ['Foundation', 'Nursing', 'Safety'] },
    { id: 33, title: 'Breakthrough Pain Protocol', description: 'Protocol for managing breakthrough pain in patients with nerve blocks. Escalation pathway from repositioning through rescue analgesia.', category: 'nursing', status: 'draft', tags: ['Foundation', 'Nursing'] },

    // Patient Experience (5)
    { id: 34, title: 'Nerve Block Patient Brochure', description: 'Patient-facing educational brochure explaining what nerve blocks are, what to expect, and how they improve recovery — in plain language.', category: 'patient', status: 'draft', tags: ['Foundation', 'Patient Education'] },
    { id: 35, title: 'Regional Anesthesia Consent Form', description: 'Informed consent template covering risks, benefits, and alternatives for regional anesthesia procedures.', category: 'patient', status: 'draft', tags: ['Foundation', 'Patient', 'Legal'] },
    { id: 36, title: 'Post-Block Sensory Guide', description: 'Patient handout explaining expected sensory changes after a nerve block — what is normal, what to watch for, and when to call.', category: 'patient', status: 'draft', tags: ['Foundation', 'Patient Education'] },
    { id: 37, title: 'Fall Prevention Patient Agreement', description: 'Patient agreement and education document for fall prevention when discharged with an active lower extremity block.', category: 'patient', status: 'draft', tags: ['Foundation', 'Patient', 'Safety'] },
    { id: 38, title: 'Patient Red Flag Card', description: 'Wallet-sized card for patients listing warning signs that require calling their provider or going to the ER after a nerve block.', category: 'patient', status: 'draft', tags: ['Foundation', 'Patient', 'Safety'] },

    // Compliance & Billing (4)
    { id: 39, title: 'CPT/ICD-10 Crosswalk', description: 'Complete billing reference mapping nerve block CPT codes to ICD-10 diagnosis codes, with modifiers and common denial reasons.', category: 'compliance', status: 'draft', tags: ['Foundation', 'Billing', 'CPT'] },
    { id: 40, title: 'Medical Necessity Phrases', description: 'Pre-written medical necessity language for documentation and prior authorization. Covers common payer requirements.', category: 'compliance', status: 'draft', tags: ['Foundation', 'Billing', 'Documentation'] },
    { id: 41, title: 'PACU Length-of-Stay Tracker', description: 'Tracking template for measuring PACU length of stay in block vs non-block patients. Feeds ROI calculations.', category: 'compliance', status: 'draft', tags: ['Foundation', 'Outcomes', 'Tracking'] },
    { id: 42, title: 'MME Calculator Reference', description: 'Morphine milligram equivalent calculator and reference card for tracking opioid reduction in block patients.', category: 'compliance', status: 'draft', tags: ['Foundation', 'Outcomes', 'Opioid'] },

    // Governance (2)
    { id: 43, title: 'Block Champion Charter', description: 'Defines the role, responsibilities, authority, and accountability of the on-site Block Champion provider. The governance backbone of every engagement.', category: 'governance', status: 'draft', tags: ['Foundation', 'Governance'] },
    { id: 44, title: 'Block Lead Nurse Responsibility List', description: 'Defines the Block Lead Nurse role — daily responsibilities, quality checks, supply management, and escalation authority.', category: 'governance', status: 'draft', tags: ['Foundation', 'Governance', 'Nursing'] },
  ];

  // Filter logic
  const filteredItems = libraryItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (catId) => categories.find(c => c.id === catId);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Knowledge Library</h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          44 Foundation Package deliverables — all drafts pending clinical review.
        </p>
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search deliverables..."
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

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
          }`}
        >
          All ({libraryItems.length})
        </button>
        {categories.map((cat) => {
          const count = libraryItems.filter(i => i.category === cat.id).length;
          if (count === 0) return null;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeCategory === cat.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-400 mb-4 font-semibold">
        {filteredItems.length} {filteredItems.length === 1 ? 'deliverable' : 'deliverables'}
      </p>

      {/* Content Grid / List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const catInfo = getCategoryInfo(item.category);
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${catInfo.color}`}></div>
                    <span className="text-xs font-semibold text-gray-400">{catInfo.label}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    Draft — Pending Review
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-primary transition leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, i) => (
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
            const catInfo = getCategoryInfo(item.category);
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg px-5 py-3 hover:border-primary/40 hover:shadow-sm transition flex items-center gap-4 cursor-pointer group">
                <div className={`w-2 h-8 rounded-full ${catInfo.color} flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition truncate">{item.title}</h3>
                  <p className="text-xs text-gray-400 font-light truncate">{item.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-400">{catInfo.label}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>
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
          <p className="text-gray-500 font-semibold">No deliverables found</p>
          <p className="text-gray-400 text-sm font-light mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </DashboardLayout>
  );
};
