import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { ExternalLink, MessageSquare, BookOpen, Users } from 'lucide-react';

const CHATBOT_URL = 'https://block-ops-chatbot.vercel.app';

const tabs = [
  { id: 'knowledge', label: 'Knowledge Base', path: '/admin/knowledge-base', icon: BookOpen },
  { id: 'leads',     label: 'Leads',          path: '/admin',                icon: Users },
  { id: 'convos',    label: 'Conversations',  path: '/admin/conversations',  icon: MessageSquare },
];

export const ChatbotPage = () => {
  const [activeTab, setActiveTab] = useState('knowledge');

  const current = tabs.find(t => t.id === activeTab);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 h-full">

        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-black uppercase tracking-wide text-gray-900">AI Assistant</h1>
            <p className="text-sm text-gray-500 font-light mt-0.5">
              Manage the Block Ops chatbot knowledge base, leads, and conversations.
            </p>
          </div>
          <a
            href={`${CHATBOT_URL}/admin`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-primary hover:text-primary transition"
          >
            <ExternalLink size={14} />
            Open in new tab
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 flex-shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition -mb-px ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Iframe */}
        <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 bg-gray-50" style={{ minHeight: '600px' }}>
          <iframe
            key={activeTab}
            src={`${CHATBOT_URL}${current.path}`}
            className="w-full h-full"
            style={{ minHeight: '600px', border: 'none' }}
            title={`Block Ops Chatbot — ${current.label}`}
          />
        </div>

      </div>
    </DashboardLayout>
  );
};
