import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { DeliverableViewer } from '../components/DeliverableViewer';
import { fetchKnowledgeLibraryItems } from '../services/knowledgeLibraryContentService.js';
import { filterVisibleLibraryItems } from '../services/contentVisibility.js';
import { WIKI_LIBRARY_ITEMS } from '../services/wikiLibraryItems.js';
import { useActiveSite } from '../contexts/ActiveSiteContext';
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

// Storage paths for deliverables with uploaded content
const STORAGE_PATHS = {
  'Block_Time_Out_Checklist': 'foundation/Block_Time_Out_Checklist.md',
  'LAST_Protocol_Suite': 'foundation/LAST_Protocol_Suite.md',
  'Standardized_Test_Dose_Protocol': 'foundation/Standardized_Test_Dose_Protocol.md',
  'Weight_Based_Max_Dose_Calculator': 'foundation/Weight_Based_Max_Dose_Calculator.md',
  'High_Volume_Dilution_Chart': 'foundation/High_Volume_Dilution_Chart.md',
  'LAST_Second_Responder_Nursing_Competency': 'foundation/LAST_Second_Responder_Nursing_Competency.md',
  'LA_Selection_Algorithm': 'foundation/LA_Selection_Algorithm.md',
  'Adjuvant_Dosing_Guide': 'foundation/Adjuvant_Dosing_Guide.md',
  'Exparel_Utilization_Criteria': 'foundation/Exparel_Utilization_Criteria.md',
  'Knobology_Cheat_Sheet': 'foundation/Knobology_Cheat_Sheet.md',
  'PART_Maneuver_Guide': 'foundation/PART_Maneuver_Guide.md',
  'Triangle_of_Success_Setup_Guide': 'foundation/Triangle_of_Success_Setup_Guide.md',
  'In_Plane_Technique_SOP': 'foundation/In_Plane_Technique_SOP.md',
  'Out_of_Plane_Technique_SOP': 'foundation/Out_of_Plane_Technique_SOP.md',
  'Hydrodissection_Opening_Pressure_Protocol': 'foundation/Hydrodissection_Opening_Pressure_Protocol.md',
  'Intraneural_Injection_Stop_Criteria': 'foundation/Intraneural_Injection_Stop_Criteria.md',
  'Clean_vs_Sterile_Protocol': 'foundation/Clean_vs_Sterile_Protocol.md',
  'Probe_Cover_Gel_Management_Standard': 'foundation/Probe_Cover_Gel_Management_Standard.md',
  'Block_Cart_Planogram': 'foundation/Block_Cart_Planogram.md',
  'Block_Cart_Par_Level_Guide': 'foundation/Block_Cart_Par_Level_Guide.md',
  'Daily_Cart_Restock_Checklist': 'foundation/Daily_Cart_Restock_Checklist.md',
  'Block_Bay_Workflow_Logic': 'foundation/Block_Bay_Workflow_Logic.md',
  'Machine_Cleaning_Checklist': 'foundation/Machine_Cleaning_Checklist.md',
  'Probe_Cover_Selection_Guide': 'foundation/Probe_Cover_Selection_Guide.md',
  'Gel_Management_SOP': 'foundation/Gel_Management_SOP.md',
  'PreOp_Nursing_Smart_Template': 'foundation/PreOp_Nursing_Smart_Template.md',
  'PACU_Block_Assessment_Smart_Template': 'foundation/PACU_Block_Assessment_Smart_Template.md',
  'Block_Status_Tracking_Board_Guide': 'foundation/Block_Status_Tracking_Board_Guide.md',
  'Block_Success_Failure_Log': 'foundation/Block_Success_Failure_Log.md',
  'Sedation_Administration_Monitoring_SOP': 'foundation/Sedation_Administration_Monitoring_SOP.md',
  'Sterile_Setup_Assist_Competency': 'foundation/Sterile_Setup_Assist_Competency.md',
  'Fall_Risk_Assessment': 'foundation/Fall_Risk_Assessment.md',
  'Red_Flag_Recognition_Card': 'foundation/Red_Flag_Recognition_Card.md',
  'Breakthrough_Pain_Protocol': 'foundation/Breakthrough_Pain_Protocol.md',
  'Nerve_Block_Patient_Brochure': 'foundation/Nerve_Block_Patient_Brochure.md',
  'RA_Consent_Form': 'foundation/RA_Consent_Form.md',
  'Post_Block_Sensory_Guide': 'foundation/Post_Block_Sensory_Guide.md',
  'Patient_Red_Flag_Card': 'foundation/Patient_Red_Flag_Card.md',
  'CPT_ICD10_Crosswalk': 'foundation/CPT_ICD10_Crosswalk.md',
  'Medical_Necessity_Phrases': 'foundation/Medical_Necessity_Phrases.md',
  'PACU_LOS_Tracker': 'foundation/PACU_LOS_Tracker.md',
  'MME_Calculator_Reference': 'foundation/MME_Calculator_Reference.md',
  'Block_Champion_Charter': 'foundation/Block_Champion_Charter.md',
  'Block_Lead_Nurse_Responsibility_List': 'foundation/Block_Lead_Nurse_Responsibility_List.md',
};

// Legacy — keeping for reference but no longer used inline
const LAST_PROTOCOL_CONTENT_UNUSED = `# BLOCK OPS — Local Anesthetic Systemic Toxicity (LAST) Protocol Suite
## Foundation Package | Safety | Version: DRAFT v0.1 — Pending Clinical Review

---

# PART 1: PREVENTION & MONITORING

### What is LAST?
Local anesthetic systemic toxicity (LAST) is a rare but life-threatening complication that occurs when local anesthetic reaches supratherapeutic plasma concentrations. This may result from inadvertent intravascular injection, excessive dosing, or delayed tissue absorption. LAST affects the central nervous system and cardiovascular system, and can progress rapidly from prodromal symptoms to seizures, cardiac arrhythmias, and cardiac arrest.

### Incidence
- Estimated incidence: 0.03-0.2% of peripheral nerve blocks
- Higher risk with high-volume fascial plane blocks (TAP, PECS, QL, ESP)
- Ultrasound guidance has reduced but not eliminated the incidence
- Up to 50% of cases may present atypically — without classic CNS excitation

### Risk Factors
**Patient Factors:**
- Extremes of age (pediatric, elderly)
- Low muscle mass / low body weight
- Cardiac disease (reduced cardiac output slows LA redistribution)
- Hepatic disease (impaired LA metabolism)
- Renal disease
- Pregnancy (increased sensitivity, decreased protein binding)
- Hypoalbuminemia (increased free drug fraction)
- Acidosis (increases unbound LA fraction)

**Procedural Factors:**
- High-volume blocks (TAP, PECS) — large total LA dose
- Highly vascular injection sites
- Use of long-acting, more cardiotoxic agents (bupivacaine > ropivacaine > lidocaine)
- Absence of ultrasound guidance
- Absence of epinephrine as intravascular marker
- Multiple blocks in same session (cumulative dosing)

### Prevention Strategies

#### 1. Weight-Based Dosing
Always calculate maximum allowable dose based on lean body weight:

| Local Anesthetic | Max Dose (without Epi) | Max Dose (with Epi) |
|---|---|---|
| Bupivacaine | 2.5 mg/kg | 3 mg/kg |
| Ropivacaine | 3 mg/kg | 3.5 mg/kg |
| Lidocaine | 4.5 mg/kg | 7 mg/kg |
| Mepivacaine | 5 mg/kg | 7 mg/kg |

#### 2. Aspirate Before Injecting
- Aspirate before **every** injection increment

#### 3. Incremental Injection
- Inject in **3-5 mL aliquots**, pausing 15-30 seconds between increments
- This is the single most important technique for preventing large-bolus intravascular injection

#### 4. Epinephrine as Intravascular Marker
- Add epinephrine 1:400,000 (2.5 mcg/mL) to the LA solution
- Intravascular injection produces: HR increase ≥10 bpm, BP increase ≥15 mmHg systolic

#### 5. Ultrasound Guidance
- Use ultrasound for all peripheral nerve blocks (Block Ops standard)

#### 6. Monitor After Injection
- Continue monitoring for **30-45 minutes after injection** of large volumes

---

# PART 2: RECOGNITION — Signs & Symptoms

### Typical Presentation (Classic Progression)

**Stage 1: Prodromal / Early CNS Excitation**
- Perioral numbness/tingling
- Metallic taste
- Tinnitus (ringing in ears)
- Lightheadedness / dizziness
- Agitation, anxiety, restlessness

**Stage 2: CNS Excitation → Depression**
- Seizures (occur in ~70% of LAST cases)
- Loss of consciousness
- Respiratory depression / apnea

**Stage 3: Cardiovascular Toxicity**
- Hypotension, Bradycardia
- Conduction abnormalities (prolonged PR, wide QRS, AV block)
- Ventricular arrhythmias (VT, VF)
- Cardiac arrest / asystole

### ⚠️ Atypical Presentations
- Up to **50% of cases may not follow the classic progression**
- ~40% present as sudden-onset seizure without prodromal symptoms
- ~11% present with cardiovascular toxicity as the first sign
- Delayed onset up to 60 minutes post-injection

> **Any neurological or cardiovascular change occurring within 60 minutes of LA administration should be considered LAST until proven otherwise.**

---

# PART 3: CRISIS RESPONSE — Treatment Protocol
*Based on: ASRA LAST Checklist (Neal JM, Neal EJ, Weinberg GL, 2020)*

### IMMEDIATE ACTIONS (First 60 Seconds)

1. **STOP** the injection immediately
2. **CALL** for help — get the LAST rescue kit (20% Intralipid)
3. **AIRWAY** — 100% oxygen, secure airway if needed
4. **SEIZURES** — Midazolam 2-4 mg IV (avoid large-dose propofol)

### INTRALIPID 20% — DO NOT DELAY

| Step | Dose | 70 kg Example |
|---|---|---|
| **BOLUS** | 1.5 mL/kg over 1 min | **105 mL** |
| **INFUSION** | 0.25 mL/kg/min | **17.5 mL/min** |
| **If unstable** | Repeat bolus × 1-2 (q3-5 min) | 105 mL again |
| **If still unstable** | Double infusion to 0.5 mL/kg/min | 35 mL/min |
| **MAX DOSE** | ~12 mL/kg in first 30 min | **840 mL** |

**Continue infusion ≥15 min after hemodynamically stable.**

### IF CARDIAC ARREST — Modified ACLS
- CPR — high quality
- **Epinephrine ≤1 mcg/kg** (NOT standard 1 mg ACLS dose)
- **Amiodarone** for ventricular arrhythmias
- **AVOID:** vasopressin, lidocaine, calcium channel blockers, beta-blockers
- **Continue Intralipid** throughout resuscitation
- **Consider ECMO** early if refractory

### POST-EVENT
- ICU transfer — monitor 4-6 hours minimum (12 hours if severe/bupivacaine)
- Serial labs: lipid panel, troponin, amylase/lipase, ABG
- Complete documentation and root cause analysis
- Report to facility risk management

---

# PART 4: INTRALIPID STOCKING

### Requirements
- **Minimum stock:** 1,000 mL of 20% Intralipid per block location
- Stored in a **clearly labeled, dedicated location** known to all team members
- **Not locked** — must be accessible without keys or codes
- Include IV tubing with the Intralipid
- Check expiration dates monthly

---

## Evidence Base & References
1. Neal JM, Neal EJ, Weinberg GL. ASRA LAST Checklist: 2020 Version. Reg Anesth Pain Med. 2021;46(1):81-82.
2. Neal JM, Barrington MJ, et al. Third ASRA Practice Advisory on LAST. Reg Anesth Pain Med. 2018;43(2):113-123.
3. Macfarlane AJR, et al. Updates in our understanding of LAST. Anaesthesia. 2021;76(S1):27-39.
4. Shalaby M, et al. Atypical and delayed presentations of LAST. Clin Exp Emerg Med. 2024.
5. El-Boghdadly K, et al. LAST: current perspectives. Local Reg Anesth. 2018;11:35-44.

*Block Ops © 2025 — DRAFT: Not for clinical use until approved by Dr. Bhakta*`;

import { useUserRole } from '../hooks/useUserRole';
import { useDeliverableStatus } from '../hooks/useDeliverableStatus';

export const KnowledgeLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);
  const [libraryItems, setLibraryItems] = useState([]);
  const [libraryError, setLibraryError] = useState(null);
  const userRole = useUserRole();
  const { activeSite, renderedSiteQuery } = useActiveSite();
  const { statuses, getStatus, updateStatus } = useDeliverableStatus();

  useEffect(() => {
    const loadLibraryItems = async () => {
      try {
        const items = await fetchKnowledgeLibraryItems(renderedSiteQuery);
        const internalWikiItems = userRole.isTeam ? WIKI_LIBRARY_ITEMS : [];
        setLibraryItems([...internalWikiItems, ...items]);
        setLibraryError(null);
      } catch (error) {
        console.error(error);
        setLibraryError('Failed to load knowledge library metadata.');
      }
    };

    loadLibraryItems();
  }, [renderedSiteQuery, userRole.isTeam]);

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
    { id: 'wiki-foundation', icon: BookOpen, label: 'Wiki: Foundation', color: 'bg-slate-700' },
    { id: 'wiki-sales', icon: BookOpen, label: 'Wiki: Sales', color: 'bg-emerald-600' },
    { id: 'wiki-operating', icon: BookOpen, label: 'Wiki: Operating Model', color: 'bg-blue-700' },
    { id: 'wiki-platform', icon: BookOpen, label: 'Wiki: Platform', color: 'bg-violet-600' },
    { id: 'wiki-delivery', icon: BookOpen, label: 'Wiki: Delivery', color: 'bg-amber-600' },
    { id: 'wiki-risk', icon: BookOpen, label: 'Wiki: Risk / Legal', color: 'bg-red-600' },
    { id: 'wiki-readiness', icon: BookOpen, label: 'Wiki: Readiness', color: 'bg-primary' },
  ];

  // Foundation library items now load from the metadata model.

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

  // Filter items based on role — clients only see approved docs
  const roleFilteredItems = filterVisibleLibraryItems(filteredItems, userRole.isTeam);

  // If viewing a deliverable, show the viewer
  if (selectedItem) {
    const catInfo = getCategoryInfo(selectedItem.category);
    const status = selectedItem.storagePath ? getStatus(selectedItem.storagePath) : selectedItem.status || 'draft';
    return (
      <DashboardLayout>
        <DeliverableViewer 
          deliverable={{ ...selectedItem, categoryLabel: catInfo?.label }} 
          onBack={() => setSelectedItem(null)}
          userRole={userRole}
          currentStatus={status}
          onStatusUpdate={updateStatus}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Knowledge Library</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-light">
          {(() => {
            const wikiCount = libraryItems.filter((item) => item.kind === 'wiki-page').length;
            const foundationCount = libraryItems.filter((item) => item.kind !== 'wiki-page').length;
            const all = Object.values(statuses || {});
            const approved = all.filter(s => s.status === 'approved').length;
            if (wikiCount > 0) return `${wikiCount} internal Block Ops Wiki pages + ${foundationCount || 44} Foundation Package deliverables — Wiki pages are internal draft/review content.`;
            const total = foundationCount || 44;
            if (approved === 0) return `${total} Foundation Package deliverables — all drafts pending clinical review.`;
            if (approved === total) return `${total} Foundation Package deliverables — all approved.`;
            return `${total} Foundation Package deliverables — ${approved} approved, ${total - approved} pending review.`;
          })()}
        </p>
        {userRole.isTeam && (
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <span className="font-semibold">Internal Wiki draft mode:</span>{' '}
            Block Ops Wiki pages are visible here for team review only. They are not client-facing or approved-final content.
          </div>
        )}
        <div className="mt-3 inline-flex flex-col gap-1 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          <span className="font-semibold">Rendered site view</span>
          <span className="font-light">{activeSite?.siteName || 'Loading site...'} · {activeSite?.clientAccountName || 'Loading client...'}</span>
        </div>
        {libraryError && (
          <p className="text-sm text-red-600 mt-2">{libraryError}</p>
        )}
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search deliverables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:border-primary text-sm font-light"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-lg border transition ${viewMode === 'grid' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 dark:text-gray-400 border-gray-200 dark:border-dark-border hover:border-gray-300 dark:border-dark-border'}`}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-lg border transition ${viewMode === 'list' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 dark:text-gray-400 border-gray-200 dark:border-dark-border hover:border-gray-300 dark:border-dark-border'}`}
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
            activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:border-dark-border'
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
                activeCategory === cat.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:border-dark-border'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 font-semibold">
        {roleFilteredItems.length} {roleFilteredItems.length === 1 ? 'item' : 'items'}
      </p>

      {/* Content Grid / List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {roleFilteredItems.map((item) => {
            const catInfo = getCategoryInfo(item.category);
            return (
              <div 
                key={item.id} 
                className={`bg-white border rounded-xl p-5 transition group ${item.hasContent ? 'border-gray-200 dark:border-dark-border hover:border-primary/40 hover:shadow-md cursor-pointer' : 'border-gray-200 dark:border-dark-border cursor-default opacity-80'}`}
                onClick={() => item.hasContent && setSelectedItem(item)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${catInfo?.color || 'bg-gray-400'}`}></div>
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{catInfo?.label || 'Knowledge'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.hasContent && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        View
                      </span>
                    )}
                    {(() => {
                      const s = item.storagePath ? getStatus(item.storagePath) : 'draft';
                      if (item.kind === 'wiki-page') return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Internal Wiki</span>;
                      if (s === 'approved') return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Approved</span>;
                      if (s === 'needs_revision') return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Needs Revision</span>;
                      return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>;
                    })()}
                  </div>
                </div>
                <h3 className={`text-sm font-bold mb-2 leading-snug ${item.hasContent ? 'text-gray-900 dark:text-gray-100 group-hover:text-primary transition' : 'text-gray-900 dark:text-gray-100'}`}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
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
          {roleFilteredItems.map((item) => {
            const catInfo = getCategoryInfo(item.category);
            return (
              <div 
                key={item.id} 
                className={`bg-white border border-gray-200 dark:border-dark-border rounded-lg px-5 py-3 transition flex items-center gap-4 group ${item.hasContent ? 'hover:border-primary/40 hover:shadow-sm cursor-pointer' : 'cursor-default opacity-80'}`}
                onClick={() => item.hasContent && setSelectedItem(item)}
              >
                <div className={`w-2 h-8 rounded-full ${catInfo?.color || 'bg-gray-400'} flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-bold transition truncate ${item.hasContent ? 'text-gray-900 dark:text-gray-100 group-hover:text-primary' : 'text-gray-900 dark:text-gray-100'}`}>{item.title}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-light truncate">{item.description}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{catInfo?.label || 'Knowledge'}</span>
                  {item.hasContent && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">View</span>}
                  {(() => {
                    const s = item.storagePath ? getStatus(item.storagePath) : 'draft';
                    if (item.kind === 'wiki-page') return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Internal Wiki</span>;
                    if (s === 'approved') return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Approved</span>;
                    if (s === 'needs_revision') return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Revision</span>;
                    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>;
                  })()}
                </div>
                <ChevronRight size={16} className={`flex-shrink-0 ${item.hasContent ? 'text-primary' : 'text-gray-200'}`} />
              </div>
            );
          })}
        </div>
      )}

      {roleFilteredItems.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 dark:text-gray-400 font-semibold">No deliverables found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm font-light mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </DashboardLayout>
  );
};
