import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Package,
  FileText,
  AlertTriangle
} from 'lucide-react';

export const DeliverablesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const packages = [
    {
      id: 'foundation',
      name: 'Foundation Package',
      description: 'Block-agnostic infrastructure — safety, pharmacology, technique, documentation, and governance.',
      status: 'in-progress',
      progress: 100,
      note: 'All 44 drafts complete. Pending clinical review by Dr. Bhakta before finalization.',
      sections: [
        {
          name: 'Safety',
          items: [
            { name: 'Block Time-Out Checklist', status: 'review' },
            { name: 'LAST Protocol Suite', status: 'review' },
            { name: 'Standardized Test Dose Protocol', status: 'review' },
            { name: 'Weight-Based Max Dose Calculator', status: 'review' },
            { name: 'High-Volume Dilution Chart', status: 'review' },
            { name: 'LAST Second Responder Nursing Competency', status: 'review' },
          ],
        },
        {
          name: 'Pharmacology',
          items: [
            { name: 'LA Selection Algorithm', status: 'review' },
            { name: 'Adjuvant Dosing Guide', status: 'review' },
            { name: 'Exparel Utilization Criteria', status: 'review' },
          ],
        },
        {
          name: 'Technical Fundamentals',
          items: [
            { name: 'Knobology Cheat Sheet', status: 'review' },
            { name: 'PART Maneuver Guide', status: 'review' },
            { name: 'Triangle of Success Setup Guide', status: 'review' },
            { name: 'In-Plane Technique SOP', status: 'review' },
            { name: 'Out-of-Plane Technique SOP', status: 'review' },
            { name: 'Hydrodissection & Opening Pressure Protocol', status: 'review' },
            { name: 'Intraneural Injection Stop Criteria', status: 'review' },
          ],
        },
        {
          name: 'Sterile Technique',
          items: [
            { name: 'Clean vs Sterile Protocol', status: 'review' },
            { name: 'Probe Cover & Gel Management Standard', status: 'review' },
          ],
        },
        {
          name: 'Physical Infrastructure',
          items: [
            { name: 'Block Cart Planogram', status: 'review' },
            { name: 'Daily Cart Restock Checklist', status: 'review' },
            { name: 'Block Bay Workflow Logic', status: 'review' },
            { name: 'Machine Cleaning Checklist', status: 'review' },
            { name: 'Probe Cover Selection Guide', status: 'review' },
            { name: 'Gel Management SOP', status: 'review' },
          ],
        },
        {
          name: 'Documentation & Digital',
          items: [
            { name: 'Pre-Op Nursing Smart Template', status: 'review' },
            { name: 'PACU Block Assessment Smart Template', status: 'review' },
            { name: 'Block Status Tracking Board Guide', status: 'review' },
            { name: 'Block Success/Failure Log', status: 'review' },
          ],
        },
        {
          name: 'Nursing Core Competencies',
          items: [
            { name: 'Sedation Administration & Monitoring SOP', status: 'review' },
            { name: 'Sterile Setup & Assist Competency', status: 'review' },
            { name: 'Fall Risk Assessment', status: 'review' },
            { name: 'Red Flag Recognition Card', status: 'review' },
            { name: 'Breakthrough Pain Protocol', status: 'review' },
          ],
        },
        {
          name: 'Patient Experience',
          items: [
            { name: 'Nerve Block Patient Brochure', status: 'review' },
            { name: 'Regional Anesthesia Consent Form', status: 'review' },
            { name: 'Post-Block Sensory Guide', status: 'review' },
            { name: 'Fall Prevention Patient Agreement', status: 'review' },
            { name: 'Patient Red Flag Card', status: 'review' },
          ],
        },
        {
          name: 'Compliance & Billing',
          items: [
            { name: 'CPT/ICD-10 Crosswalk', status: 'review' },
            { name: 'Medical Necessity Phrases', status: 'review' },
            { name: 'PACU Length-of-Stay Tracker', status: 'review' },
            { name: 'MME Calculator Reference', status: 'review' },
          ],
        },
        {
          name: 'Governance',
          items: [
            { name: 'Block Champion Charter', status: 'review' },
            { name: 'Block Lead Nurse Responsibility List', status: 'review' },
          ],
        },
      ],
    },
    {
      id: 'adductor-canal',
      name: 'Block Pack — Adductor Canal (Knee)',
      description: 'First modular block pack. Single-shot adductor canal block for total knee arthroplasty.',
      status: 'not-started',
      progress: 0,
      note: 'Queued after Foundation review. Will follow the standard 13-deliverable Block Pack template.',
      sections: [
        {
          name: 'Block Pack Deliverables (Template)',
          items: [
            { name: 'Clinical Protocol', status: 'pending' },
            { name: 'Pocket Reference Card', status: 'pending' },
            { name: 'Wall Poster', status: 'pending' },
            { name: 'Block-Specific Dosing Card', status: 'pending' },
            { name: 'Competency Checklist', status: 'pending' },
            { name: 'Positioning Guide', status: 'pending' },
            { name: 'Nursing Assessment Card', status: 'pending' },
            { name: 'Home Instructions (Patient)', status: 'pending' },
            { name: 'Surgeon Compact — Knee', status: 'pending' },
            { name: 'CPT/ICD Codes — Adductor Canal', status: 'pending' },
            { name: 'EMR Template — Adductor Canal', status: 'pending' },
            { name: 'Outcome Tracking Parameters', status: 'pending' },
            { name: 'Agent Training Module', status: 'pending' },
          ],
        },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'review': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'in-progress': return <Clock size={16} className="text-blue-500" />;
      case 'pending': return <AlertCircle size={16} className="text-gray-300" />;
      default: return <Clock size={16} className="text-gray-300" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered': return { text: 'Approved', color: 'bg-green-100 text-green-700' };
      case 'review': return { text: 'Awaiting Review', color: 'bg-amber-100 text-amber-700' };
      case 'in-progress': return { text: 'In Progress', color: 'bg-blue-100 text-blue-700' };
      case 'pending': return { text: 'Not Started', color: 'bg-gray-100 text-gray-500' };
      default: return { text: status, color: 'bg-gray-100 text-gray-500' };
    }
  };

  const allItems = packages.flatMap(p => p.sections.flatMap(s => s.items));
  const reviewCount = allItems.filter(i => i.status === 'review').length;
  const approvedCount = allItems.filter(i => i.status === 'delivered').length;
  const pendingCount = allItems.filter(i => i.status === 'pending').length;

  const filterItems = (items) => {
    if (activeFilter === 'all') return items;
    return items.filter(item => item.status === activeFilter);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Deliverables</h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Track the status of your Foundation Package and Block Packs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Deliverables</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{allItems.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Awaiting Review</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{reviewCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{approvedCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Not Started</p>
          <p className="text-2xl font-bold text-gray-400 mt-1">{pendingCount}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: 'All' },
          { id: 'review', label: 'Awaiting Review' },
          { id: 'delivered', label: 'Approved' },
          { id: 'pending', label: 'Not Started' },
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
        {packages.map((pkg) => (
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
                    <p className="text-xs text-gray-400 font-light">{pkg.description}</p>
                  </div>
                </div>
              </div>
              {pkg.note && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
                  <p className="text-xs text-amber-800 font-light">
                    <span className="font-semibold">Note:</span> {pkg.note}
                  </p>
                </div>
              )}
            </div>

            {/* Sections */}
            {pkg.sections.map((section, sIdx) => {
              const filtered = filterItems(section.items);
              if (filtered.length === 0 && activeFilter !== 'all') return null;
              return (
                <div key={sIdx}>
                  <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.name} ({section.items.length})
                    </p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {filtered.map((item, idx) => {
                      const statusLabel = getStatusLabel(item.status);
                      return (
                        <div key={idx} className="px-5 py-2.5 flex items-center justify-between hover:bg-gray-50 transition">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(item.status)}
                            <span className={`text-sm ${item.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                              {item.name}
                            </span>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusLabel.color}`}>
                            {statusLabel.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};
