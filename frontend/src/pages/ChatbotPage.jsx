import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import {
  BookOpen, MessageSquare, Users, Plus, Trash2,
  Save, CheckCircle, Loader2, ChevronDown, ChevronUp,
} from 'lucide-react';

const CHATBOT_URL = 'https://block-ops-chatbot.vercel.app';
const API_KEY = 'bo-chatbot-k9x2m7p4kqr3';

const DAYS = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

function parseJson(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

function defaultHours() {
  return Object.fromEntries(
    DAYS.map(d => [d.key, d.key === 'sat' || d.key === 'sun' ? 'Closed' : '9:00 AM - 5:00 PM'])
  );
}

function apiFetch(path, options = {}) {
  return fetch(`${CHATBOT_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, ...(options.headers ?? {}) },
  });
}

// ─── Shared styles ──────────────────────────────────────────────
const card = 'bg-white border border-gray-200 rounded-xl p-5';
const label = 'block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5';
const input = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition';

// ─── Knowledge Base Tab ─────────────────────────────────────────
function KnowledgeBaseTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const [businessName, setBusinessName] = useState('');
  const [tagline, setTagline] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState(defaultHours());
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [policies, setPolicies] = useState('');

  useEffect(() => {
    apiFetch('/api/business-profile')
      .then(r => r.json())
      .then(({ profile }) => {
        if (!profile) return;
        setBusinessName(profile.businessName ?? '');
        setTagline(profile.tagline ?? '');
        setPhone(profile.phone ?? '');
        setEmail(profile.email ?? '');
        setAddress(profile.address ?? '');
        setHours(parseJson(profile.hours, defaultHours()));
        setServices(parseJson(profile.services, []));
        setFaqs(parseJson(profile.faqs, []));
        setPolicies(profile.policies ?? '');
      })
      .catch(() => setError('Failed to load knowledge base.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim() || !email.trim()) {
      setError('Business name, phone, and email are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await apiFetch('/api/business-profile', {
        method: 'PUT',
        body: JSON.stringify({
          businessName, tagline, phone, email, address,
          hours: JSON.stringify(hours),
          services: JSON.stringify(services),
          faqs: JSON.stringify(faqs),
          policies,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Save failed.');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading…</div>;

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-3xl">
      {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      {/* Basics */}
      <div className={card}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4">Business Basics</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={label}>Business Name *</label>
            <input className={input} value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Block Ops" />
          </div>
          <div>
            <label className={label}>Tagline</label>
            <input className={input} value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Build a Regional Anesthesia Center of Excellence" />
          </div>
          <div>
            <label className={label}>Phone *</label>
            <input className={input} value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 123-4567" />
          </div>
          <div>
            <label className={label}>Email *</label>
            <input className={input} value={email} onChange={e => setEmail(e.target.value)} placeholder="info@blockops.consulting" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Address</label>
            <input className={input} value={address} onChange={e => setAddress(e.target.value)} placeholder="Kansas City, KS" />
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className={card}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4">Hours of Operation</h3>
        <div className="space-y-2">
          {DAYS.map(d => (
            <div key={d.key} className="flex items-center gap-3">
              <span className="w-24 text-xs font-semibold text-gray-500 flex-shrink-0">{d.label}</span>
              <input className={input} value={hours[d.key] ?? ''} onChange={e => setHours(prev => ({ ...prev, [d.key]: e.target.value }))} placeholder="9:00 AM - 5:00 PM or Closed" />
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs font-semibold text-gray-500 flex-shrink-0">Holidays</span>
            <input className={input} value={hours.holiday ?? ''} onChange={e => setHours(prev => ({ ...prev, holiday: e.target.value }))} placeholder="Closed on major holidays" />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Services</h3>
          <button type="button" onClick={() => setServices(prev => [...prev, { name: '', description: '', price: '' }])} className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition">
            <Plus size={13} /> Add
          </button>
        </div>
        {services.length === 0 && <p className="text-sm text-gray-400">No services added yet.</p>}
        <div className="space-y-3">
          {services.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <input className={input + ' flex-1'} value={s.name} onChange={e => setServices(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} placeholder="Service name" />
                <input className={input + ' w-28'} value={s.price} onChange={e => setServices(prev => prev.map((x, j) => j === i ? { ...x, price: e.target.value } : x))} placeholder="Price" />
                <button type="button" onClick={() => setServices(prev => prev.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 transition">
                  <Trash2 size={15} />
                </button>
              </div>
              <textarea className={input + ' resize-none'} rows={2} value={s.description} onChange={e => setServices(prev => prev.map((x, j) => j === i ? { ...x, description: e.target.value } : x))} placeholder="Brief description" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">FAQs</h3>
          <button type="button" onClick={() => setFaqs(prev => [...prev, { question: '', answer: '' }])} className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition">
            <Plus size={13} /> Add
          </button>
        </div>
        {faqs.length === 0 && <p className="text-sm text-gray-400">No FAQs added yet.</p>}
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <input className={input + ' flex-1'} value={f.question} onChange={e => setFaqs(prev => prev.map((x, j) => j === i ? { ...x, question: e.target.value } : x))} placeholder="Question" />
                <button type="button" onClick={() => setFaqs(prev => prev.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 transition">
                  <Trash2 size={15} />
                </button>
              </div>
              <textarea className={input + ' resize-none'} rows={2} value={f.answer} onChange={e => setFaqs(prev => prev.map((x, j) => j === i ? { ...x, answer: e.target.value } : x))} placeholder="Answer" />
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div className={card}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4">Policies</h3>
        <textarea className={input + ' resize-none'} rows={4} value={policies} onChange={e => setPolicies(e.target.value)} placeholder="Cancellation policy, payment info, etc." />
      </div>

      <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold uppercase tracking-wider hover:opacity-90 transition disabled:opacity-60">
        {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : saved ? <><CheckCircle size={14} /> Saved</> : <><Save size={14} /> Save Knowledge Base</>}
      </button>
    </form>
  );
}

// ─── Conversations Tab ──────────────────────────────────────────
function ConversationsTab() {
  const [convos, setConvos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    apiFetch('/api/conversations')
      .then(r => r.json())
      .then(({ conversations }) => setConvos(conversations ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function loadDetail(id) {
    if (detail[id]) { setExpanded(expanded === id ? null : id); return; }
    const res = await apiFetch(`/api/conversations/${id}`);
    const { conversation } = await res.json();
    const messages = parseJson(conversation?.messages, []);
    setDetail(prev => ({ ...prev, [id]: messages }));
    setExpanded(id);
  }

  if (loading) return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading…</div>;
  if (!convos.length) return <div className="text-center py-20 text-gray-400 text-sm">No conversations yet.</div>;

  return (
    <div className="space-y-2 max-w-3xl">
      {convos.map(c => (
        <div key={c.id} className="border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => loadDetail(c.id)} className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-gray-50 transition text-left">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-gray-400">{c.sessionId.slice(0, 8)}…</span>
              <span className="text-xs text-gray-500">{c.messageCount} messages</span>
              {c.leadId && <span className="text-xs bg-primary/10 text-primary font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Lead captured</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
              {expanded === c.id ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </div>
          </button>
          {expanded === c.id && detail[c.id] && (
            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 space-y-3 max-h-80 overflow-y-auto">
              {detail[c.id].map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Leads Tab ──────────────────────────────────────────────────
function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/leads')
      .then(r => r.json())
      .then(({ leads }) => setLeads(leads ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading…</div>;
  if (!leads.length) return <div className="text-center py-20 text-gray-400 text-sm">No leads captured yet.</div>;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden max-w-4xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Name</th>
            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Phone</th>
            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Message</th>
            <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3 font-semibold text-gray-900">{lead.name}</td>
              <td className="px-5 py-3 text-gray-600">{lead.email ?? '—'}</td>
              <td className="px-5 py-3 text-gray-600">{lead.phone ?? '—'}</td>
              <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{lead.message ?? '—'}</td>
              <td className="px-5 py-3 text-gray-400 whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
const TABS = [
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'leads', label: 'Leads', icon: Users },
];

export const ChatbotPage = () => {
  const [activeTab, setActiveTab] = useState('knowledge');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-black uppercase tracking-wide text-gray-900">AI Assistant</h1>
          <p className="text-sm text-gray-500 font-light mt-0.5">Manage the Block Ops chatbot knowledge base, leads, and conversations.</p>
        </div>

        <div className="flex gap-1 border-b border-gray-200">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition -mb-px ${
                  activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div>
          {activeTab === 'knowledge' && <KnowledgeBaseTab />}
          {activeTab === 'conversations' && <ConversationsTab />}
          {activeTab === 'leads' && <LeadsTab />}
        </div>
      </div>
    </DashboardLayout>
  );
};
