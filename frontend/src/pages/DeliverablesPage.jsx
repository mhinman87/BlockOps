import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  FolderOpen, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Package,
  Filter
} from 'lucide-react';

export const DeliverablesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const packages = [
    {
      id: 'foundation',
      name: 'Foundation Package',
      status: 'in-progress',
      progress: 75,
      deliveredDate: null,
      items: [
        { name: 'LAST Emergency Protocol', status: 'delivered', date: '2026-02-10' },
        { name: 'Regional Anesthesia Time-Out Checklist', status: 'delivered', date: '2026-02-10' },
        { name: 'Pharmacology Quick Reference', status: 'delivered', date: '2026-02-10' },
        { name: 'Block Cart Equipment Checklist', status: 'delivered', date: '2026-02-12' },
        { name: 'Block Bay Setup Guide', status: 'delivered', date: '2026-02-12' },
        { name: 'EMR Documentation Template', status: 'delivered', date: '2026-02-14' },
        { name: 'Nursing Competency Framework', status: 'in-progress', date: null },
        { name: 'Champion Provider Activation Guide', status: 'in-progress', date: null },
        { name: 'Patient Education Brochure', status: 'pending', date: null },
        { name: 'Surgeon Compact Template', status: 'pending', date: null },
        { name: 'CPT/ICD Coding Guide', status: 'pending', date: null },
        { name: 'Governance Charter', status: 'pending', date: null },
      ],
    },
    {
      id: 'adductor-canal',
      name: 'Block Pack — Adductor Canal',
      status: 'in-progress',
      progress: 40,
      deliveredDate: null,
      items: [
        { name: 'Clinical Protocol', status: 'delivered', date: '2026-02-18' },
        { name: 'Pocket Reference Card', status: 'delivered', date: '2026-02-18' },
        { name: 'Wall Poster', status: 'in-progress', date: null },
        { name: 'Block-Specific Dosing Card', status: 'in-progress', date: null },
        { name: 'Competency Checklist', status: 'pending', date: null },
        { name: 'Positioning Guide', status: 'pending', date: null },
        { name: 'Nursing Assessment Card', status: 'pending', date: null },
        { name: 'Home Instructions (Patient)', status: 'delivered', date: '2026-02-18' },
        { name: 'Surgeon Compact — Knee', status: 'pending', date: null },
        { name: 'CPT/ICD Codes — Adductor Canal', status: 'pending', date: null },
        { name: 'EMR Template — Adductor Canal', status: 'pending', date: null },
        { name: 'Outcome Tracking Parameters', status: 'pending', date: null },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'in-progress': return <Clock size={16} className="text-blue-500" />;
      case 'pending': return <AlertCircle size={16} className="text-gray-300" />;
      default: return <Clock size={16} className="text-gray-300" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered': return { text: 'Delivered', color: 'bg-green-100 text-green-700' };
      case 'in-progress': return { text: 'In Progress', color: 'bg-blue-100 text-blue-700' };
      case 'pending': return { text: 'Upcoming', color: 'bg-gray-100 text-gray-500' };
      default: return { text: status, color: 'bg-gray-100 text-gray-500' };
    }
  };

  const filterItems = (items) => {
    if (activeFilter === 'all') return items;
    return items.filter(item => item.status === activeFilter);
  };

  const totalDelivered = packages.reduce((acc, pkg) => acc + pkg.items.filter(i => i.status === 'delivered').length, 0);
  const totalItems = packages.reduce((acc, pkg) => acc + pkg.items.length, 0);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Deliverables</h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Track the delivery status of your Foundation Package and Block Packs.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Items</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalItems}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Delivered</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{totalDelivered}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">In Progress</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {packages.reduce((acc, pkg) => acc + pkg.items.filter(i => i.status === 'in-progress').length, 0)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Upcoming</p>
          <p className="text-2xl font-bold text-gray-400 mt-1">
            {packages.reduce((acc, pkg) => acc + pkg.items.filter(i => i.status === 'pending').length, 0)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: 'All' },
          { id: 'delivered', label: 'Delivered' },
          { id: 'in-progress', label: 'In Progress' },
          { id: 'pending', label: 'Upcoming' },
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
          const filtered = filterItems(pkg.items);
          if (filtered.length === 0 && activeFilter !== 'all') return null;
          return (
            <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Package Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Package className="text-primary" size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">{pkg.name}</h2>
                    <p className="text-xs text-gray-400 font-light">{pkg.items.filter(i => i.status === 'delivered').length} of {pkg.items.length} delivered</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-teal-400 transition-all"
                      style={{ width: `${pkg.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-primary">{pkg.progress}%</span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-50">
                {filtered.map((item, idx) => {
                  const statusLabel = getStatusLabel(item.status);
                  return (
                    <div key={idx} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <span className={`text-sm ${item.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.date && <span className="text-xs text-gray-400 hidden sm:inline">{item.date}</span>}
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusLabel.color}`}>
                          {statusLabel.text}
                        </span>
                        {item.status === 'delivered' && (
                          <button className="text-gray-400 hover:text-primary transition">
                            <Download size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};
