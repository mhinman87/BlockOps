import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { DeliverableViewer } from '../components/DeliverableViewer';
import { fetchFoundationDeliverableSections } from '../services/deliverableContentService.js';
import { filterVisibleDeliverableItems } from '../services/contentVisibility.js';
import { useActiveSite } from '../contexts/ActiveSiteContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Package,
  FileText,
  Eye
} from 'lucide-react';

// Storage paths for deliverables with uploaded content
const STORAGE_PATHS = {
  'Block Time-Out Checklist': 'foundation/Block_Time_Out_Checklist.md',
  'LAST Protocol Suite': 'foundation/LAST_Protocol_Suite.md',
  'Standardized Test Dose Protocol': 'foundation/Standardized_Test_Dose_Protocol.md',
  'Weight-Based Max Dose Calculator': 'foundation/Weight_Based_Max_Dose_Calculator.md',
  'High-Volume Dilution Chart': 'foundation/High_Volume_Dilution_Chart.md',
  'LAST Second Responder Nursing Competency': 'foundation/LAST_Second_Responder_Nursing_Competency.md',
  'LA Selection Algorithm': 'foundation/LA_Selection_Algorithm.md',
  'Adjuvant Dosing Guide': 'foundation/Adjuvant_Dosing_Guide.md',
  'Exparel Utilization Criteria': 'foundation/Exparel_Utilization_Criteria.md',
  'Knobology Cheat Sheet': 'foundation/Knobology_Cheat_Sheet.md',
  'PART Maneuver Guide': 'foundation/PART_Maneuver_Guide.md',
  'Triangle of Success Setup Guide': 'foundation/Triangle_of_Success_Setup_Guide.md',
  'In-Plane Technique SOP': 'foundation/In_Plane_Technique_SOP.md',
  'Out-of-Plane Technique SOP': 'foundation/Out_of_Plane_Technique_SOP.md',
  'Hydrodissection & Opening Pressure Protocol': 'foundation/Hydrodissection_Opening_Pressure_Protocol.md',
  'Intraneural Injection Stop Criteria': 'foundation/Intraneural_Injection_Stop_Criteria.md',
  'Clean vs Sterile Protocol': 'foundation/Clean_vs_Sterile_Protocol.md',
  'Probe Cover & Gel Management Standard': 'foundation/Probe_Cover_Gel_Management_Standard.md',
  'Block Cart Planogram': 'foundation/Block_Cart_Planogram.md',
  'Block Cart Par Level Guide': 'foundation/Block_Cart_Par_Level_Guide.md',
  'Daily Cart Restock Checklist': 'foundation/Daily_Cart_Restock_Checklist.md',
  'Block Bay Workflow Logic': 'foundation/Block_Bay_Workflow_Logic.md',
  'Machine Cleaning Checklist': 'foundation/Machine_Cleaning_Checklist.md',
  'Probe Cover Selection Guide': 'foundation/Probe_Cover_Selection_Guide.md',
  'Gel Management SOP': 'foundation/Gel_Management_SOP.md',
  'PreOp Nursing Smart Template': 'foundation/PreOp_Nursing_Smart_Template.md',
  'PACU Block Assessment Smart Template': 'foundation/PACU_Block_Assessment_Smart_Template.md',
  'Block Status Tracking Board Guide': 'foundation/Block_Status_Tracking_Board_Guide.md',
  'Block Success/Failure Log': 'foundation/Block_Success_Failure_Log.md',
  'Sedation Administration & Monitoring SOP': 'foundation/Sedation_Administration_Monitoring_SOP.md',
  'Sterile Setup & Assist Competency': 'foundation/Sterile_Setup_Assist_Competency.md',
  'Fall Risk Assessment': 'foundation/Fall_Risk_Assessment.md',
  'Red Flag Recognition Card': 'foundation/Red_Flag_Recognition_Card.md',
  'Breakthrough Pain Protocol': 'foundation/Breakthrough_Pain_Protocol.md',
  'Nerve Block Patient Brochure': 'foundation/Nerve_Block_Patient_Brochure.md',
  'Regional Anesthesia Consent Form': 'foundation/RA_Consent_Form.md',
  'Post-Block Sensory Guide': 'foundation/Post_Block_Sensory_Guide.md',
  'Patient Red Flag Card': 'foundation/Patient_Red_Flag_Card.md',
  'CPT/ICD-10 Crosswalk': 'foundation/CPT_ICD10_Crosswalk.md',
  'Medical Necessity Phrases': 'foundation/Medical_Necessity_Phrases.md',
  'PACU Length-of-Stay Tracker': 'foundation/PACU_LOS_Tracker.md',
  'MME Calculator Reference': 'foundation/MME_Calculator_Reference.md',
  'Block Champion Charter': 'foundation/Block_Champion_Charter.md',
  'Block Lead Nurse Responsibility List': 'foundation/Block_Lead_Nurse_Responsibility_List.md',
};

import { useUserRole } from '../hooks/useUserRole';
import { useDeliverableStatus } from '../hooks/useDeliverableStatus';

export const DeliverablesPage = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [foundationSections, setFoundationSections] = useState([]);
  const [foundationError, setFoundationError] = useState(null);
  const userRole = useUserRole();
  const { activeSite, renderedSiteQuery } = useActiveSite();
  const { getStatus, updateStatus } = useDeliverableStatus();

  useEffect(() => {
    if (location.state?.reset) setSelectedItem(null);
  }, [location.state]);

  useEffect(() => {
    const loadFoundationSections = async () => {
      try {
        const sections = await fetchFoundationDeliverableSections(renderedSiteQuery);
        setFoundationSections(sections);
        setFoundationError(null);
      } catch (error) {
        console.error(error);
        setFoundationError('Failed to load foundation deliverables metadata.');
      }
    };

    loadFoundationSections();
  }, [renderedSiteQuery]);

  const packages = [
    {
      id: 'foundation',
      name: 'Foundation Package',
      status: 'in-progress',
      description: 'All block-agnostic infrastructure — safety, pharmacology, technique, sterile technique, physical setup, documentation, nursing competencies, patient materials, compliance, and governance.',
      sections: foundationSections,
    },
    {
      id: 'adductor-canal',
      name: 'Block Pack — Adductor Canal (Knee)',
      status: 'not-started',
      description: 'First block pack. Single-shot adductor canal block for total knee arthroplasty. Pending Foundation completion and Samir\'s clinical review.',
      sections: [
        {
          name: 'Adductor Canal Block Pack',
          items: [
            { name: 'Clinical Protocol', status: 'not-started' },
            { name: 'Pocket Reference Card', status: 'not-started' },
            { name: 'Wall Poster', status: 'not-started' },
            { name: 'Block-Specific Dosing Card', status: 'not-started' },
            { name: 'Competency Checklist', status: 'not-started' },
            { name: 'Positioning Guide', status: 'not-started' },
            { name: 'Nursing Assessment Card', status: 'not-started' },
            { name: 'Home Instructions (Patient)', status: 'not-started' },
            { name: 'Surgeon Compact — Knee', status: 'not-started' },
            { name: 'CPT/ICD Codes — Adductor Canal', status: 'not-started' },
            { name: 'EMR Template — Adductor Canal', status: 'not-started' },
            { name: 'Outcome Tracking Parameters', status: 'not-started' },
          ],
        },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'draft': return <Clock size={16} className="text-amber-500" />;
      case 'not-started': return <AlertCircle size={16} className="text-gray-300" />;
      default: return <AlertCircle size={16} className="text-gray-300" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved': return { text: 'Approved', color: 'bg-green-100 text-green-700' };
      case 'needs_revision': return { text: 'Needs Revision', color: 'bg-red-100 text-red-700' };
      case 'draft': return { text: 'Draft — Pending Review', color: 'bg-amber-100 text-amber-700' };
      case 'not-started': return { text: 'Not Started', color: 'bg-gray-100 text-gray-400 dark:text-gray-500' };
      default: return { text: status, color: 'bg-gray-100 text-gray-400 dark:text-gray-500' };
    }
  };

  // Get the real status for any item (from Supabase deliverable_status table, falling back to hardcoded)
  const getRealStatus = (item) => {
    if (item.storagePath) return getStatus(item.storagePath);
    return item.status;
  };

  const getAllItems = (pkg) => {
    const items = pkg.sections.flatMap((s) => s.items);
    return filterVisibleDeliverableItems(items, userRole.isTeam);
  };
  const allItems = packages.flatMap(pkg => getAllItems(pkg));
  const totalItems = allItems.length;
  const totalApproved = allItems.filter(i => getRealStatus(i) === 'approved').length;
  const totalNeedsRevision = allItems.filter(i => getRealStatus(i) === 'needs_revision').length;
  const totalNotStarted = allItems.filter(i => getRealStatus(i) === 'not-started').length;
  const totalDrafts = totalItems - totalApproved - totalNeedsRevision - totalNotStarted;

  const filterItems = (items) => {
    if (activeFilter === 'all') return items;
    return items.filter(item => getRealStatus(item) === activeFilter);
  };

  // If viewing a deliverable, show the viewer
  if (selectedItem) {
    const status = selectedItem.storagePath ? getStatus(selectedItem.storagePath) : 'draft';
    if (!userRole.isTeam && status !== 'approved') {
      return (
        <DashboardLayout>
          <div className="p-6 text-sm text-red-600">This deliverable is not client-visible yet.</div>
        </DashboardLayout>
      );
    }
    return (
      <DashboardLayout>
        <DeliverableViewer 
          deliverable={selectedItem} 
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">My Deliverables</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-light">
          Foundation Package + Block Packs — track what's drafted, under review, and approved.
        </p>
        <div className="mt-3 inline-flex flex-col gap-1 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          <span className="font-semibold">Rendered site view</span>
          <span className="font-light">{activeSite?.siteName || 'Loading site...'} · {activeSite?.clientAccountName || 'Loading client...'}</span>
        </div>
        {foundationError && (
          <p className="text-sm text-red-600 mt-2">{foundationError}</p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totalItems}</p>
        </div>
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Drafted</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{totalDrafts}</p>
        </div>
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{totalApproved}</p>
        </div>
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Not Started</p>
          <p className="text-2xl font-bold text-gray-400 dark:text-gray-500 mt-1">{totalNotStarted}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: 'All' },
          { id: 'draft', label: 'Drafted' },
          { id: 'approved', label: 'Approved' },
          { id: 'needs_revision', label: 'Needs Revision' },
          { id: 'not-started', label: 'Not Started' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeFilter === f.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:border-dark-border'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Packages */}
      <div className="space-y-6">
        {packages.map((pkg) => {
          const allItems = getAllItems(pkg);
          const approvedCount = allItems.filter(i => getRealStatus(i) === 'approved').length;
          const draftCount = allItems.filter(i => getRealStatus(i) === 'draft').length;
          const progress = allItems.length > 0 ? Math.round(((draftCount + approvedCount) / allItems.length) * 100) : 0;

          return (
            <div key={pkg.id} className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden">
              {/* Package Header */}
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Package className="text-primary" size={18} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">{pkg.name}</h2>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-light">{approvedCount} approved, {draftCount} drafted of {allItems.length} total</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-primary transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-primary">{progress}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light">{pkg.description}</p>
              </div>

              {/* Sections */}
              {pkg.sections.map((section, sIdx) => {
                const filtered = filterItems(section.items);
                if (filtered.length === 0 && activeFilter !== 'all') return null;
                return (
                  <div key={sIdx}>
                    <div className="px-5 py-2 bg-gray-50 dark:bg-dark-bg border-y border-gray-200 dark:border-dark-border">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{section.name} ({section.items.length})</p>
                    </div>
                    <div>
                      {filtered.map((item, idx) => {
                        const realStatus = getRealStatus(item);
                        return (
                          <div 
                            key={idx} 
                            className={`px-5 py-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-border/40 transition ${item.storagePath ? 'cursor-pointer group' : ''}`}
                            onClick={() => item.storagePath && setSelectedItem({ title: item.name, description: section.name + ' — Foundation Package', storagePath: item.storagePath, categoryLabel: section.name })}
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(realStatus)}
                              <span className={`text-sm ${realStatus === 'not-started' ? 'text-gray-400 dark:text-gray-500' : item.storagePath ? 'text-gray-900 dark:text-gray-100 group-hover:text-primary transition' : 'text-gray-900 dark:text-gray-100'}`}>
                                {item.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.storagePath && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                                  <Eye size={12} />
                                  View
                                </span>
                              )}
                              {(() => {
                                const realStatus = item.storagePath ? getStatus(item.storagePath) : item.status;
                                const label = getStatusLabel(realStatus);
                                return (
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${label.color}`}>
                                    {label.text}
                                  </span>
                                );
                              })()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};
