import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { DeliverableViewer } from '../components/DeliverableViewer';
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
  'Fall Prevention Patient Agreement': 'foundation/Fall_Prevention_Patient_Agreement.md',
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
  const userRole = useUserRole();
  const { getStatus, updateStatus } = useDeliverableStatus();

  useEffect(() => {
    if (location.state?.reset) setSelectedItem(null);
  }, [location.state]);

  const packages = [
    {
      id: 'foundation',
      name: 'Foundation Package',
      status: 'in-progress',
      description: 'All block-agnostic infrastructure — safety, pharmacology, technique, sterile technique, physical setup, documentation, nursing competencies, patient materials, compliance, and governance.',
      sections: [
        {
          name: 'Safety',
          items: [
            { name: 'Block Time-Out Checklist', status: 'draft', storagePath: STORAGE_PATHS['Block Time-Out Checklist'] },
            { name: 'LAST Protocol Suite', status: 'draft', storagePath: STORAGE_PATHS['LAST Protocol Suite'] },
            { name: 'Standardized Test Dose Protocol', status: 'draft', storagePath: STORAGE_PATHS['Standardized Test Dose Protocol'] },
            { name: 'Weight-Based Max Dose Calculator', status: 'draft', storagePath: STORAGE_PATHS['Weight-Based Max Dose Calculator'] },
            { name: 'High-Volume Dilution Chart', status: 'draft', storagePath: STORAGE_PATHS['High-Volume Dilution Chart'] },
            { name: 'LAST Second Responder Nursing Competency', status: 'draft', storagePath: STORAGE_PATHS['LAST Second Responder Nursing Competency'] },
          ]
        },
        {
          name: 'Pharmacology',
          items: [
            { name: 'LA Selection Algorithm', status: 'draft', storagePath: STORAGE_PATHS['LA Selection Algorithm'] },
            { name: 'Adjuvant Dosing Guide', status: 'draft', storagePath: STORAGE_PATHS['Adjuvant Dosing Guide'] },
            { name: 'Exparel Utilization Criteria', status: 'draft', storagePath: STORAGE_PATHS['Exparel Utilization Criteria'] },
          ]
        },
        {
          name: 'Technical Fundamentals',
          items: [
            { name: 'Knobology Cheat Sheet', status: 'draft', storagePath: STORAGE_PATHS['Knobology Cheat Sheet'] },
            { name: 'PART Maneuver Guide', status: 'draft', storagePath: STORAGE_PATHS['PART Maneuver Guide'] },
            { name: 'Triangle of Success Setup Guide', status: 'draft', storagePath: STORAGE_PATHS['Triangle of Success Setup Guide'] },
            { name: 'In-Plane Technique SOP', status: 'draft', storagePath: STORAGE_PATHS['In-Plane Technique SOP'] },
            { name: 'Out-of-Plane Technique SOP', status: 'draft', storagePath: STORAGE_PATHS['Out-of-Plane Technique SOP'] },
            { name: 'Hydrodissection & Opening Pressure Protocol', status: 'draft', storagePath: STORAGE_PATHS['Hydrodissection & Opening Pressure Protocol'] },
            { name: 'Intraneural Injection Stop Criteria', status: 'draft', storagePath: STORAGE_PATHS['Intraneural Injection Stop Criteria'] },
          ]
        },
        {
          name: 'Sterile Technique',
          items: [
            { name: 'Clean vs Sterile Protocol', status: 'draft', storagePath: STORAGE_PATHS['Clean vs Sterile Protocol'] },
            { name: 'Probe Cover & Gel Management Standard', status: 'draft', storagePath: STORAGE_PATHS['Probe Cover & Gel Management Standard'] },
          ]
        },
        {
          name: 'Physical Infrastructure',
          items: [
            { name: 'Block Cart Planogram', status: 'draft', storagePath: STORAGE_PATHS['Block Cart Planogram'] },
            { name: 'Daily Cart Restock Checklist', status: 'draft', storagePath: STORAGE_PATHS['Daily Cart Restock Checklist'] },
            { name: 'Block Bay Workflow Logic', status: 'draft', storagePath: STORAGE_PATHS['Block Bay Workflow Logic'] },
            { name: 'Machine Cleaning Checklist', status: 'draft', storagePath: STORAGE_PATHS['Machine Cleaning Checklist'] },
            { name: 'Probe Cover Selection Guide', status: 'draft', storagePath: STORAGE_PATHS['Probe Cover Selection Guide'] },
            { name: 'Gel Management SOP', status: 'draft', storagePath: STORAGE_PATHS['Gel Management SOP'] },
          ]
        },
        {
          name: 'Documentation & Digital',
          items: [
            { name: 'PreOp Nursing Smart Template', status: 'draft', storagePath: STORAGE_PATHS['PreOp Nursing Smart Template'] },
            { name: 'PACU Block Assessment Smart Template', status: 'draft', storagePath: STORAGE_PATHS['PACU Block Assessment Smart Template'] },
            { name: 'Block Status Tracking Board Guide', status: 'draft', storagePath: STORAGE_PATHS['Block Status Tracking Board Guide'] },
            { name: 'Block Success/Failure Log', status: 'draft', storagePath: STORAGE_PATHS['Block Success/Failure Log'] },
          ]
        },
        {
          name: 'Nursing Competencies',
          items: [
            { name: 'Sedation Administration & Monitoring SOP', status: 'draft', storagePath: STORAGE_PATHS['Sedation Administration & Monitoring SOP'] },
            { name: 'Sterile Setup & Assist Competency', status: 'draft', storagePath: STORAGE_PATHS['Sterile Setup & Assist Competency'] },
            { name: 'Fall Risk Assessment', status: 'draft', storagePath: STORAGE_PATHS['Fall Risk Assessment'] },
            { name: 'Red Flag Recognition Card', status: 'draft', storagePath: STORAGE_PATHS['Red Flag Recognition Card'] },
            { name: 'Breakthrough Pain Protocol', status: 'draft', storagePath: STORAGE_PATHS['Breakthrough Pain Protocol'] },
          ]
        },
        {
          name: 'Patient Experience',
          items: [
            { name: 'Nerve Block Patient Brochure', status: 'draft', storagePath: STORAGE_PATHS['Nerve Block Patient Brochure'] },
            { name: 'Regional Anesthesia Consent Form', status: 'draft', storagePath: STORAGE_PATHS['Regional Anesthesia Consent Form'] },
            { name: 'Post-Block Sensory Guide', status: 'draft', storagePath: STORAGE_PATHS['Post-Block Sensory Guide'] },
            { name: 'Fall Prevention Patient Agreement', status: 'draft', storagePath: STORAGE_PATHS['Fall Prevention Patient Agreement'] },
            { name: 'Patient Red Flag Card', status: 'draft', storagePath: STORAGE_PATHS['Patient Red Flag Card'] },
          ]
        },
        {
          name: 'Compliance & Billing',
          items: [
            { name: 'CPT/ICD-10 Crosswalk', status: 'draft', storagePath: STORAGE_PATHS['CPT/ICD-10 Crosswalk'] },
            { name: 'Medical Necessity Phrases', status: 'draft', storagePath: STORAGE_PATHS['Medical Necessity Phrases'] },
            { name: 'PACU Length-of-Stay Tracker', status: 'draft', storagePath: STORAGE_PATHS['PACU Length-of-Stay Tracker'] },
            { name: 'MME Calculator Reference', status: 'draft', storagePath: STORAGE_PATHS['MME Calculator Reference'] },
          ]
        },
        {
          name: 'Governance',
          items: [
            { name: 'Block Champion Charter', status: 'draft', storagePath: STORAGE_PATHS['Block Champion Charter'] },
            { name: 'Block Lead Nurse Responsibility List', status: 'draft', storagePath: STORAGE_PATHS['Block Lead Nurse Responsibility List'] },
          ]
        },
      ],
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
      case 'not-started': return { text: 'Not Started', color: 'bg-gray-100 text-gray-400' };
      default: return { text: status, color: 'bg-gray-100 text-gray-400' };
    }
  };

  // Get the real status for any item (from Supabase deliverable_status table, falling back to hardcoded)
  const getRealStatus = (item) => {
    if (item.storagePath) return getStatus(item.storagePath);
    return item.status;
  };

  const getAllItems = (pkg) => pkg.sections.flatMap(s => s.items);
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Deliverables</h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Foundation Package + Block Packs — track what's drafted, under review, and approved.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalItems}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Drafted</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{totalDrafts}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{totalApproved}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Not Started</p>
          <p className="text-2xl font-bold text-gray-400 mt-1">{totalNotStarted}</p>
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
              activeFilter === f.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
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
            <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Package Header */}
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Package className="text-primary" size={18} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{pkg.name}</h2>
                      <p className="text-xs text-gray-400 font-light">{approvedCount} approved, {draftCount} drafted of {allItems.length} total</p>
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
                <p className="text-xs text-gray-500 font-light">{pkg.description}</p>
              </div>

              {/* Sections */}
              {pkg.sections.map((section, sIdx) => {
                const filtered = filterItems(section.items);
                if (filtered.length === 0 && activeFilter !== 'all') return null;
                return (
                  <div key={sIdx}>
                    <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{section.name} ({section.items.length})</p>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {filtered.map((item, idx) => {
                        const realStatus = getRealStatus(item);
                        return (
                          <div 
                            key={idx} 
                            className={`px-5 py-2.5 flex items-center justify-between hover:bg-gray-50 transition ${item.storagePath ? 'cursor-pointer group' : ''}`}
                            onClick={() => item.storagePath && setSelectedItem({ title: item.name, description: section.name + ' — Foundation Package', storagePath: item.storagePath, categoryLabel: section.name })}
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(realStatus)}
                              <span className={`text-sm ${realStatus === 'not-started' ? 'text-gray-400' : item.storagePath ? 'text-gray-900 group-hover:text-primary transition' : 'text-gray-900'}`}>
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
