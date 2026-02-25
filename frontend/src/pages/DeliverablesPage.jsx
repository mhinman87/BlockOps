import React, { useState } from 'react';
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
  'LAST Protocol Suite': 'foundation/LAST_Protocol_Suite.md',
  'Block Time-Out Checklist': 'foundation/Block_Time_Out_Checklist.md',
  'Weight-Based Max Dose Calculator': 'foundation/Weight_Based_Max_Dose_Calculator.md',
  'LA Selection Algorithm': 'foundation/LA_Selection_Algorithm.md',
  'Block Cart Planogram': 'foundation/Block_Cart_Planogram.md',
  'CPT/ICD-10 Crosswalk': 'foundation/CPT_ICD10_Crosswalk.md',
};

import { useUserRole } from '../hooks/useUserRole';
import { useDeliverableStatus } from '../hooks/useDeliverableStatus';

export const DeliverablesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const userRole = useUserRole();
  const { getStatus, updateStatus } = useDeliverableStatus();

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
            { name: 'Standardized Test Dose Protocol', status: 'draft' },
            { name: 'Weight-Based Max Dose Calculator', status: 'draft', storagePath: STORAGE_PATHS['Weight-Based Max Dose Calculator'] },
            { name: 'High-Volume Dilution Chart', status: 'draft' },
            { name: 'LAST Second Responder Nursing Competency', status: 'draft' },
          ]
        },
        {
          name: 'Pharmacology',
          items: [
            { name: 'LA Selection Algorithm', status: 'draft', storagePath: STORAGE_PATHS['LA Selection Algorithm'] },
            { name: 'Adjuvant Dosing Guide', status: 'draft' },
            { name: 'Exparel Utilization Criteria', status: 'draft' },
          ]
        },
        {
          name: 'Technical Fundamentals',
          items: [
            { name: 'Knobology Cheat Sheet', status: 'draft' },
            { name: 'PART Maneuver Guide', status: 'draft' },
            { name: 'Triangle of Success Setup Guide', status: 'draft' },
            { name: 'In-Plane Technique SOP', status: 'draft' },
            { name: 'Out-of-Plane Technique SOP', status: 'draft' },
            { name: 'Hydrodissection & Opening Pressure Protocol', status: 'draft' },
            { name: 'Intraneural Injection Stop Criteria', status: 'draft' },
          ]
        },
        {
          name: 'Sterile Technique',
          items: [
            { name: 'Clean vs Sterile Protocol', status: 'draft' },
            { name: 'Probe Cover & Gel Management Standard', status: 'draft' },
          ]
        },
        {
          name: 'Physical Infrastructure',
          items: [
            { name: 'Block Cart Planogram', status: 'draft', storagePath: STORAGE_PATHS['Block Cart Planogram'] },
            { name: 'Daily Cart Restock Checklist', status: 'draft' },
            { name: 'Block Bay Workflow Logic', status: 'draft' },
            { name: 'Machine Cleaning Checklist', status: 'draft' },
            { name: 'Probe Cover Selection Guide', status: 'draft' },
            { name: 'Gel Management SOP', status: 'draft' },
          ]
        },
        {
          name: 'Documentation & Digital',
          items: [
            { name: 'PreOp Nursing Smart Template', status: 'draft' },
            { name: 'PACU Block Assessment Smart Template', status: 'draft' },
            { name: 'Block Status Tracking Board Guide', status: 'draft' },
            { name: 'Block Success/Failure Log', status: 'draft' },
          ]
        },
        {
          name: 'Nursing Competencies',
          items: [
            { name: 'Sedation Administration & Monitoring SOP', status: 'draft' },
            { name: 'Sterile Setup & Assist Competency', status: 'draft' },
            { name: 'Fall Risk Assessment', status: 'draft' },
            { name: 'Red Flag Recognition Card', status: 'draft' },
            { name: 'Breakthrough Pain Protocol', status: 'draft' },
          ]
        },
        {
          name: 'Patient Experience',
          items: [
            { name: 'Nerve Block Patient Brochure', status: 'draft' },
            { name: 'Regional Anesthesia Consent Form', status: 'draft' },
            { name: 'Post-Block Sensory Guide', status: 'draft' },
            { name: 'Fall Prevention Patient Agreement', status: 'draft' },
            { name: 'Patient Red Flag Card', status: 'draft' },
          ]
        },
        {
          name: 'Compliance & Billing',
          items: [
            { name: 'CPT/ICD-10 Crosswalk', status: 'draft', storagePath: STORAGE_PATHS['CPT/ICD-10 Crosswalk'] },
            { name: 'Medical Necessity Phrases', status: 'draft' },
            { name: 'PACU Length-of-Stay Tracker', status: 'draft' },
            { name: 'MME Calculator Reference', status: 'draft' },
          ]
        },
        {
          name: 'Governance',
          items: [
            { name: 'Block Champion Charter', status: 'draft' },
            { name: 'Block Lead Nurse Responsibility List', status: 'draft' },
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

  const getAllItems = (pkg) => pkg.sections.flatMap(s => s.items);
  const totalDrafts = packages.reduce((acc, pkg) => acc + getAllItems(pkg).filter(i => i.status === 'draft').length, 0);
  const totalApproved = packages.reduce((acc, pkg) => acc + getAllItems(pkg).filter(i => i.status === 'approved').length, 0);
  const totalNotStarted = packages.reduce((acc, pkg) => acc + getAllItems(pkg).filter(i => i.status === 'not-started').length, 0);
  const totalItems = packages.reduce((acc, pkg) => acc + getAllItems(pkg).length, 0);

  const filterItems = (items) => {
    if (activeFilter === 'all') return items;
    return items.filter(item => item.status === activeFilter);
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
          const draftCount = allItems.filter(i => i.status === 'draft').length;
          const approvedCount = allItems.filter(i => i.status === 'approved').length;
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
                      <p className="text-xs text-gray-400 font-light">{draftCount} drafted, {approvedCount} approved of {allItems.length} total</p>
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
                        const statusLabel = getStatusLabel(item.status);
                        return (
                          <div 
                            key={idx} 
                            className={`px-5 py-2.5 flex items-center justify-between hover:bg-gray-50 transition ${item.storagePath ? 'cursor-pointer group' : ''}`}
                            onClick={() => item.storagePath && setSelectedItem({ title: item.name, description: section.name + ' — Foundation Package', storagePath: item.storagePath, categoryLabel: section.name })}
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(item.status)}
                              <span className={`text-sm ${item.status === 'not-started' ? 'text-gray-400' : item.storagePath ? 'text-gray-900 group-hover:text-primary transition' : 'text-gray-900'}`}>
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
