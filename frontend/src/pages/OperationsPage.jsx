import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TeamDocViewer } from '../components/TeamDocViewer';
import { useUserRole } from '../hooks/useUserRole';
import { BookMarked, ChevronDown, ChevronRight, FileText, Shield, Rocket, Users, AlertTriangle, LogOut, Target, Handshake, Briefcase, Scale } from 'lucide-react';

const OPERATIONS_DOCS = [
  {
    category: 'Master Documents',
    icon: Shield,
    color: 'text-primary',
    docs: [
      { title: 'Master Playbook', description: 'Complete 8-phase operations framework', path: 'team/operations/Block_Ops_Master_Playbook_v2.md', version: 'v2.0' },
      { title: 'Strategic Vision', description: 'Company strategy, exit paths, and platform roadmap', path: 'team/operations/Block_Ops_Strategic_Vision_v1.md', version: 'v1.0' },
      { title: 'Operating Model', description: 'Business model, pricing, and delivery structure', path: 'team/operations/Block_Ops_Operating_Model_v1.md', version: 'v1.0' },
    ]
  },
  {
    category: 'Phase 1-3: Acquire & Launch',
    icon: Rocket,
    color: 'text-green-500',
    docs: [
      { title: 'Phase 1: Lead Gen & Qualification', description: 'Finding and qualifying ideal clients', path: 'team/operations/Phase_1_Lead_Gen_Qualification_v2.md', version: 'v2.0' },
      { title: 'Phase 1: Sales & Site Assessment', description: 'Discovery calls, proposals, and closing', path: 'team/operations/Phase_1_Sales_Site_Assessment_Playbook.md', version: 'v1.0' },
      { title: 'Phase 2: Pre-Visit Prep & Customization', description: 'Site configuration and protocol customization', path: 'team/operations/Phase_2_PreVisit_Prep_Customization_v2.md', version: 'v2.0' },
      { title: 'Phase 3: On-Site Training', description: 'Samir\'s on-site training visit protocol', path: 'team/operations/Phase_3_OnSite_Training_v2.md', version: 'v2.0' },
    ]
  },
  {
    category: 'Phase 4-6: Deliver & Grow',
    icon: Users,
    color: 'text-blue-500',
    docs: [
      { title: 'Phase 4: Go-Live & Bridge Support', description: 'First 30 days post-launch support', path: 'team/operations/Phase_4_GoLive_Bridge_Support_v2.md', version: 'v2.0' },
      { title: 'Phase 5: Ongoing Support & Subscription', description: 'Monthly cadence, agent support, outcome tracking', path: 'team/operations/Phase_5_Ongoing_Support_Subscription_v2.md', version: 'v2.0' },
      { title: 'Phase 6: Renewal & Expansion', description: 'Contract renewal, upselling Block Packs, multi-site', path: 'team/operations/Phase_6_Renewal_Expansion_v2.md', version: 'v2.0' },
    ]
  },
  {
    category: 'Phase 7-8: Protect & Exit',
    icon: AlertTriangle,
    color: 'text-amber-500',
    docs: [
      { title: 'Phase 7: Churn Prevention', description: 'Early warning system and save protocols', path: 'team/operations/Phase_7_Churn_Prevention_v2.md', version: 'v2.0' },
      { title: 'Phase 8: Offboarding', description: 'Professional exit when a client leaves', path: 'team/operations/Phase_8_Offboarding_v2.md', version: 'v2.0' },
    ]
  },
  {
    category: 'Sales & Legal',
    icon: Scale,
    color: 'text-purple-500',
    docs: [
      { title: 'Elevator Pitch', description: 'Adrian\'s refined pitch for prospects', path: 'team/operations/elevator-pitch-v1.md', version: 'v1.0' },
      { title: 'Legal Launch Checklist', description: 'Legal requirements before first client', path: 'team/operations/Legal_Launch_Checklist.md', version: 'v1.0' },
      { title: 'Legal Review Needed', description: 'Items flagged for attorney review', path: 'team/operations/Legal_Review_Needed.md', version: 'v1.0' },
    ]
  },
];

export const OperationsPage = () => {
  const { isTeam } = useUserRole();
  const [openDoc, setOpenDoc] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(
    OPERATIONS_DOCS.reduce((acc, cat) => ({ ...acc, [cat.category]: true }), {})
  );

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  if (openDoc) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <button
            onClick={() => setOpenDoc(null)}
            className="text-sm text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
          >
            ← Back to Operations
          </button>
          <TeamDocViewer
            storagePath={openDoc.path}
            title={openDoc.title}
            description={openDoc.description}
            version={openDoc.version}
            isTeam={isTeam}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Operations</h1>
          <p className="text-gray-500 mt-1">Internal playbooks, phase docs, and company strategy</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Documents</p>
            <p className="text-2xl font-black text-gray-900">{OPERATIONS_DOCS.reduce((a, c) => a + c.docs.length, 0)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Phases</p>
            <p className="text-2xl font-black text-primary">8</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Categories</p>
            <p className="text-2xl font-black text-gray-900">{OPERATIONS_DOCS.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Status</p>
            <p className="text-2xl font-black text-green-500">Live</p>
          </div>
        </div>

        {/* Document Categories */}
        {OPERATIONS_DOCS.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategories[category.category];
          
          return (
            <div key={category.category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className={category.color} size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{category.category}</p>
                    <p className="text-xs text-gray-500">{category.docs.length} document{category.docs.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {category.docs.map((doc, idx) => (
                    <button
                      key={doc.path}
                      onClick={() => setOpenDoc(doc)}
                      className={`w-full flex items-center justify-between px-5 py-4 hover:bg-primary/5 transition text-left ${idx !== category.docs.length - 1 ? 'border-b border-gray-50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{doc.title}</p>
                          <p className="text-xs text-gray-500 font-light">{doc.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{doc.version}</span>
                        <ChevronRight size={14} className="text-gray-300" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};
