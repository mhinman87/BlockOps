import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  Search, 
  BookOpen, 
  FileText, 
  ChevronRight,
  Shield,
  FlaskConical,
  Crosshair,
  SprayCan,
  Wrench,
  ClipboardList,
  Heart,
  Users,
  Scale,
  Crown,
  Grid3X3,
  List,
  Clock,
  Tag
} from 'lucide-react';

export const KnowledgeLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'safety', icon: Shield, label: 'Safety', color: 'bg-red-500', count: 6 },
    { id: 'pharmacology', icon: FlaskConical, label: 'Pharmacology', color: 'bg-purple-500', count: 3 },
    { id: 'technique', icon: Crosshair, label: 'Technical Fundamentals', color: 'bg-blue-500', count: 7 },
    { id: 'sterile', icon: SprayCan, label: 'Sterile Technique', color: 'bg-teal-500', count: 2 },
    { id: 'infrastructure', icon: Wrench, label: 'Physical Infrastructure', color: 'bg-amber-500', count: 6 },
    { id: 'documentation', icon: ClipboardList, label: 'Documentation & Digital', color: 'bg-indigo-500', count: 4 },
    { id: 'nursing', icon: Heart, label: 'Nursing Core Competencies', color: 'bg-pink-500', count: 5 },
    { id: 'patient', icon: Users, label: 'Patient Experience', color: 'bg-green-500', count: 5 },
    { id: 'compliance', icon: Scale, label: 'Compliance & Billing', color: 'bg-cyan-500', count: 4 },
    { id: 'governance', icon: Crown, label: 'Governance', color: 'bg-orange-500', count: 2 },
  ];

  const libraryItems = [
    // Safety (6)
    { id: 1, title: 'Block Time-Out Checklist', description: '9-point verification checklist that must be completed before sedation. Covers patient ID, consent, laterality, allergy review, equipment readiness, and block-specific confirmation.', category: 'safety', status: 'draft', tags: ['Checklist', 'Pre-Procedure'] },
    { id: 2, title: 'LAST Protocol Suite', description: 'Four-part Local Anesthetic Systemic Toxicity protocol: prevention strategies, early recognition signs, crisis response algorithm, and intralipid stocking/dosing requirements.', category: 'safety', status: 'draft', tags: ['Emergency', 'LAST', 'Critical'] },
    { id: 3, title: 'Standardized Test Dose Protocol', description: 'Protocol for test dose administration before local anesthetic injection. Includes epinephrine-containing test dose criteria and monitoring parameters.', category: 'safety', status: 'draft', tags: ['Pre-Procedure', 'Verification'] },
    { id: 4, title: 'Weight-Based Max Dose Calculator', description: 'Maximum dose calculation tables for common local anesthetics across standard patient weights and concentrations. Includes lean body weight adjustments.', category: 'safety', status: 'draft', tags: ['Dosing', 'Calculator', 'Reference'] },
    { id: 5, title: 'High-Volume Dilution Chart', description: 'Dilution reference for plane blocks (TAP, PECS, serratus) requiring high volumes. Concentration-to-volume conversion with max dose safety checks.', category: 'safety', status: 'draft', tags: ['Dosing', 'Plane Blocks'] },
    { id: 6, title: 'LAST "Second Responder" Nursing Competency', description: 'Nursing-specific competency checklist for LAST events. Covers role assignment, intralipid preparation, airway equipment retrieval, and documentation.', category: 'safety', status: 'draft', tags: ['Nursing', 'Emergency', 'Competency'] },

    // Pharmacology (3)
    { id: 7, title: 'LA Selection Algorithm', description: 'Decision algorithm for local anesthetic selection. Bupivacaine as default long-acting, mepivacaine as default short-acting, with alternatives and contraindication pathways.', category: 'pharmacology', status: 'draft', tags: ['Algorithm', 'Decision Support'] },
    { id: 8, title: 'Adjuvant Dosing Guide', description: 'Adjuvant medication guide with dexamethasone 4mg + epinephrine 1:400K as defaults, clonidine as secondary option. Includes onset/duration profiles and contraindications.', category: 'pharmacology', status: 'draft', tags: ['Dosing', 'Adjuvants'] },
    { id: 9, title: 'Exparel Utilization Criteria', description: 'Evidence-based assessment of liposomal bupivacaine (Exparel). Honest cost-benefit analysis — not recommended as default due to 20-80x cost for marginal benefit.', category: 'pharmacology', status: 'draft', tags: ['Cost Analysis', 'Exparel'] },

    // Technical Fundamentals (7)
    { id: 10, title: 'Knobology Cheat Sheet', description: 'Quick reference for ultrasound machine settings: depth, gain, focus zone, and frequency optimization for nerve block procedures.', category: 'technique', status: 'draft', tags: ['Ultrasound', 'Quick Ref'] },
    { id: 11, title: 'PART Maneuver Guide', description: 'Four-component probe manipulation technique: Pressure, Alignment, Rotation, and Tilting. Systematic approach to optimizing ultrasound image quality.', category: 'technique', status: 'draft', tags: ['Ultrasound', 'Technique'] },
    { id: 12, title: 'Triangle of Success Setup Guide', description: 'Ergonomic setup guide positioning the three critical elements: patient, ultrasound screen, and operator. Reduces fatigue and improves needle visualization.', category: 'technique', status: 'draft', tags: ['Ergonomics', 'Setup'] },
    { id: 13, title: 'In-Plane Technique SOP', description: 'Block Ops standard operating procedure for in-plane needle approach. Default technique for all 6 launch blocks. Includes visualization tips and troubleshooting.', category: 'technique', status: 'draft', tags: ['SOP', 'Needle Technique'] },
    { id: 14, title: 'Out-of-Plane Technique SOP', description: 'Standard operating procedure for out-of-plane needle approach. Reserved for specific clinical scenarios only — not the default approach.', category: 'technique', status: 'draft', tags: ['SOP', 'Needle Technique'] },
    { id: 15, title: 'Hydrodissection & Opening Pressure Protocol', description: 'Protocol for using hydrodissection to confirm needle tip location and create tissue planes. Includes opening pressure thresholds and injection technique.', category: 'technique', status: 'draft', tags: ['Technique', 'Advanced'] },
    { id: 16, title: 'Intraneural Injection Stop Criteria', description: 'Four mandatory stop criteria for suspected intraneural injection. Immediate response protocol with escalation pathway.', category: 'technique', status: 'draft', tags: ['Safety', 'Stop Criteria'] },

    // Sterile Technique (2)
    { id: 17, title: 'Clean vs Sterile Protocol', description: 'Definitive guide on when clean technique vs full sterile technique is required. Based on procedure type, catheter placement, and facility standards.', category: 'sterile', status: 'draft', tags: ['Infection Control', 'Protocol'] },
    { id: 18, title: 'Probe Cover & Gel Management Standard', description: 'Standard for ultrasound probe covering, gel application, and contamination prevention. Includes single-use vs reusable cover guidance.', category: 'sterile', status: 'draft', tags: ['Infection Control', 'Equipment'] },

    // Physical Infrastructure (6)
    { id: 19, title: 'Block Cart Planogram', description: 'Visual layout specification for the regional anesthesia cart. Drawer-by-drawer organization with labeled zones for needles, local anesthetics, adjuvants, and emergency supplies.', category: 'infrastructure', status: 'draft', tags: ['Setup', 'Organization'] },
    { id: 20, title: 'Daily Cart Restock Checklist', description: 'Daily checklist for block cart preparation. Covers needle inventory, local anesthetic stock levels, adjuvant medications, emergency supplies, and expiration date verification.', category: 'infrastructure', status: 'draft', tags: ['Daily', 'Checklist'] },
    { id: 21, title: 'Block Bay Workflow Logic', description: 'Patient flow logic for the block bay: arrival, pre-procedure check, block performance, recovery monitoring, and transfer. Includes timing targets.', category: 'infrastructure', status: 'draft', tags: ['Workflow', 'Operations'] },
    { id: 22, title: 'Machine Cleaning Checklist', description: 'Ultrasound machine cleaning and maintenance protocol. Pre-shift, between-patient, and end-of-day procedures.', category: 'infrastructure', status: 'draft', tags: ['Maintenance', 'Checklist'] },
    { id: 23, title: 'Probe Cover Selection Guide', description: 'Guide for selecting appropriate probe covers based on procedure type. Includes cost comparison and compatibility with common ultrasound models.', category: 'infrastructure', status: 'draft', tags: ['Equipment', 'Reference'] },
    { id: 24, title: 'Gel Management SOP', description: 'Standard operating procedure for ultrasound gel handling, storage, contamination prevention, and disposal.', category: 'infrastructure', status: 'draft', tags: ['SOP', 'Supplies'] },

    // Documentation & Digital (4)
    { id: 25, title: 'Pre-Op Nursing Smart Template', description: 'Structured nursing documentation template for pre-operative block assessment. Covers consent verification, site marking, baseline neuro exam, and sedation assessment.', category: 'documentation', status: 'draft', tags: ['EMR', 'Nursing', 'Template'] },
    { id: 26, title: 'PACU Block Assessment Smart Template', description: 'Post-procedure nursing template for PACU monitoring. Includes sensory/motor assessment, pain scoring, block regression tracking, and discharge criteria.', category: 'documentation', status: 'draft', tags: ['EMR', 'PACU', 'Template'] },
    { id: 27, title: 'Block Status Tracking Board Guide', description: 'Setup guide for a visual tracking board in the block bay or PACU. Shows block type, time performed, expected duration, and current status for all active patients.', category: 'documentation', status: 'draft', tags: ['Tracking', 'Visual Management'] },
    { id: 28, title: 'Block Success/Failure Log', description: 'Data collection template for tracking block success rates, onset times, rescue interventions, and patient-reported outcomes. Feeds quarterly reports.', category: 'documentation', status: 'draft', tags: ['Tracking', 'Outcomes', 'Data'] },

    // Nursing Core Competencies (5)
    { id: 29, title: 'Sedation Administration & Monitoring SOP', description: 'Protocol for sedation during nerve block procedures. Covers pre-sedation assessment, medication administration, monitoring parameters, and rescue criteria.', category: 'nursing', status: 'draft', tags: ['Sedation', 'SOP', 'Monitoring'] },
    { id: 30, title: 'Sterile Setup & Assist Competency', description: 'Nursing competency checklist for sterile field preparation and procedure assistance. Covers gowning, gloving, tray setup, and hand-off technique.', category: 'nursing', status: 'draft', tags: ['Competency', 'Sterile'] },
    { id: 31, title: 'Fall Risk Assessment', description: 'Assessment tool for fall risk in patients with lower extremity nerve blocks. Includes scoring criteria, prevention interventions, and mobility clearance protocol.', category: 'nursing', status: 'draft', tags: ['Safety', 'Assessment', 'Lower Extremity'] },
    { id: 32, title: 'Red Flag Recognition Card', description: 'Quick-reference card for nursing staff listing red flag signs requiring immediate provider notification: LAST symptoms, vascular compromise, compartment syndrome indicators.', category: 'nursing', status: 'draft', tags: ['Emergency', 'Quick Ref'] },
    { id: 33, title: 'Breakthrough Pain Protocol', description: 'Nursing protocol for managing breakthrough pain when a nerve block is inadequate or wearing off. Includes multimodal rescue pathways and escalation criteria.', category: 'nursing', status: 'draft', tags: ['Pain Management', 'Protocol'] },

    // Patient Experience (5)
    { id: 34, title: 'Nerve Block Patient Brochure', description: 'Patient-facing educational brochure explaining nerve blocks in plain language. What it is, how it works, what to expect, and why it\'s used instead of relying solely on opioids.', category: 'patient', status: 'draft', tags: ['Education', 'Patient-Facing'] },
    { id: 35, title: 'Regional Anesthesia Consent Form', description: 'Standardized informed consent template for nerve block procedures. Covers risks, benefits, alternatives, and patient acknowledgment in clear language.', category: 'patient', status: 'draft', tags: ['Legal', 'Consent'] },
    { id: 36, title: 'Post-Block Sensory Guide', description: 'Patient handout explaining expected sensations after a nerve block: numbness timeline, what\'s normal vs concerning, and when feeling returns.', category: 'patient', status: 'draft', tags: ['Education', 'Post-Procedure'] },
    { id: 37, title: 'Fall Prevention Patient Agreement', description: 'Patient acknowledgment form for fall prevention after lower extremity blocks. Covers mobility restrictions, use of assistive devices, and caregiver requirements.', category: 'patient', status: 'draft', tags: ['Safety', 'Agreement'] },
    { id: 38, title: 'Patient Red Flag Card', description: 'Take-home card for patients listing warning signs that require calling the provider or going to the ER. Simple, large-font format.', category: 'patient', status: 'draft', tags: ['Take-Home', 'Safety'] },

    // Compliance & Billing (4)
    { id: 39, title: 'CPT/ICD-10 Crosswalk', description: 'Complete billing reference mapping nerve block procedures to correct CPT codes and ICD-10 diagnosis codes. Includes modifier guidance and common denial reasons.', category: 'compliance', status: 'draft', tags: ['Billing', 'CPT', 'Reference'] },
    { id: 40, title: 'Medical Necessity Phrases', description: 'Pre-written medical necessity justification phrases for documentation and prior authorization. Mapped to specific block types and surgical indications.', category: 'compliance', status: 'draft', tags: ['Billing', 'Documentation'] },
    { id: 41, title: 'PACU Length-of-Stay Tracker', description: 'Tracking template for measuring PACU length of stay for block vs non-block patients. Generates data for ROI reporting and program justification.', category: 'compliance', status: 'draft', tags: ['Tracking', 'ROI', 'Data'] },
    { id: 42, title: 'MME Calculator Reference', description: 'Morphine milligram equivalent calculator for tracking opioid consumption. Compares block vs non-block patients for outcome reporting.', category: 'compliance', status: 'draft', tags: ['Opioid Tracking', 'Calculator'] },

    // Governance (2)
    { id: 43, title: 'Block Champion Charter', description: 'Formal charter defining the Champion provider\'s role, responsibilities, authority, and accountability within the regional anesthesia program. Includes escalation pathways.', category: 'governance', status: 'draft', tags: ['Champion', 'Leadership'] },
    { id: 44, title: 'Block Lead Nurse Responsibility List', description: 'Defined responsibilities for the lead nurse supporting the block program. Covers cart management, competency tracking, scheduling coordination, and quality reporting.', category: 'governance', status: 'draft', tags: ['Nursing', 'Leadership'] },
  ];

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
          Foundation Package protocols, references, and templates. All documents are drafts pending clinical review.
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
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeCategory === cat.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon size={12} />
              {cat.label} ({cat.count})
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-400 mb-4 font-semibold">
        {filteredItems.length} {filteredItems.length === 1 ? 'resource' : 'resources'}
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
                    Draft
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-primary transition leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1">
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
          <p className="text-gray-500 font-semibold">No resources found</p>
          <p className="text-gray-400 text-sm font-light mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </DashboardLayout>
  );
};
