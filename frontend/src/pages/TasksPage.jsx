import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useUserRole } from '../hooks/useUserRole';
import { supabase } from '../services/supabase';
import { CheckCircle2, Circle, Plus, X, Filter, Search, User, Tag, Rocket, ChevronDown, Pencil, Save } from 'lucide-react';

const OWNERS = ['Max', 'Samir', 'Adrian', 'Bloq'];
const CATEGORIES = ['Legal', 'Website', 'Dashboard', 'Sales', 'Funding', 'Infrastructure', 'Content', 'Agent'];

const CATEGORY_COLORS = {
  Legal: 'bg-purple-100 text-purple-700',
  Website: 'bg-blue-100 text-blue-700',
  Dashboard: 'bg-cyan-100 text-cyan-700',
  Sales: 'bg-green-100 text-green-700',
  Funding: 'bg-amber-100 text-amber-700',
  Infrastructure: 'bg-gray-100 text-gray-700',
  Content: 'bg-pink-100 text-pink-700',
  Agent: 'bg-red-100 text-red-700',
};

const OWNER_COLORS = {
  Max: 'bg-blue-500',
  Samir: 'bg-green-500',
  Adrian: 'bg-amber-500',
  Bloq: 'bg-primary',
};

export const TasksPage = () => {
  const { isTeam } = useUserRole();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOwner, setFilterOwner] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', owner: 'Max', category: 'Website' });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('launch_tasks')
      .select('*')
      .eq('done', false)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    
    if (!error && data) setTasks(data);
    setLoading(false);
  };

  useEffect(() => { fetchTasks(); }, []);

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData({ title: task.title, description: task.description || '', owner: task.owner, category: task.category });
  };

  const saveEdit = async () => {
    if (!editData.title.trim()) return;
    await supabase.from('launch_tasks').update({
      title: editData.title.trim(),
      description: editData.description.trim() || null,
      owner: editData.owner,
      category: editData.category,
      updated_at: new Date().toISOString(),
    }).eq('id', editingId);
    setTasks(prev => prev.map(t => t.id === editingId ? { ...t, ...editData } : t));
    setEditingId(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const toggleDone = async (id, currentDone) => {
    await supabase.from('launch_tasks').update({ done: !currentDone, updated_at: new Date().toISOString() }).eq('id', id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = async () => {
    if (!newTask.title.trim()) return;
    setSaving(true);
    const { data, error } = await supabase.from('launch_tasks').insert([{
      title: newTask.title.trim(),
      description: newTask.description.trim() || null,
      owner: newTask.owner,
      category: newTask.category,
    }]).select();
    
    if (!error && data) {
      setTasks(prev => [...prev, ...data]);
      setNewTask({ title: '', description: '', owner: 'Max', category: 'Website' });
      setShowAdd(false);
    }
    setSaving(false);
  };

  // Filter logic
  const filtered = tasks.filter(t => {
    if (filterOwner !== 'All' && t.owner !== filterOwner) return false;
    if (filterCategory !== 'All' && t.category !== filterCategory) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !(t.description || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Group by owner
  const grouped = {};
  OWNERS.forEach(o => { grouped[o] = []; });
  filtered.forEach(t => {
    if (grouped[t.owner]) grouped[t.owner].push(t);
  });

  const totalTasks = tasks.length;
  const ownerCounts = {};
  OWNERS.forEach(o => { ownerCounts[o] = tasks.filter(t => t.owner === o).length; });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Launch Tracker</h1>
            <p className="text-gray-500 mt-1">Everything we need before reaching our first client</p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition text-sm font-semibold"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Total</p>
            <p className="text-2xl font-black text-gray-900">{totalTasks}</p>
          </div>
          {OWNERS.map(o => (
            <div key={o} className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-primary/30 transition"
              onClick={() => setFilterOwner(filterOwner === o ? 'All' : o)}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${OWNER_COLORS[o]}`}></div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{o}</p>
              </div>
              <p className={`text-2xl font-black ${filterOwner === o ? 'text-primary' : 'text-gray-900'}`}>{ownerCounts[o]}</p>
            </div>
          ))}
        </div>

        {/* Add Task Form */}
        {showAdd && (
          <div className="bg-white rounded-xl border-2 border-primary/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">New Task</p>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
            </div>
            <input
              type="text"
              placeholder="Task title..."
              value={newTask.title}
              onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              autoFocus
            />
            <input
              type="text"
              placeholder="Description (optional)..."
              value={newTask.description}
              onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <div className="flex items-center gap-3">
              <select value={newTask.owner} onChange={e => setNewTask(prev => ({ ...prev, owner: e.target.value }))}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                {OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <select value={newTask.category} onChange={e => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={addTask} disabled={saving || !newTask.title.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase">Owner:</span>
            {['All', ...OWNERS].map(o => (
              <button key={o} onClick={() => setFilterOwner(o)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${filterOwner === o ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {o}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase">Category:</span>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white font-semibold">
              <option value="All">All</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Task Lists by Owner */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading tasks...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Rocket className="text-gray-300 mx-auto mb-3" size={32} />
            <p className="text-sm font-semibold text-gray-900">No tasks found</p>
            <p className="text-xs text-gray-500 mt-1">Add tasks or adjust your filters</p>
          </div>
        ) : (
          OWNERS.filter(o => grouped[o].length > 0).map(owner => (
            <div key={owner} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${OWNER_COLORS[owner]}`}></div>
                <span className="text-sm font-bold text-gray-900">{owner}</span>
                <span className="text-xs text-gray-400 font-light">({grouped[owner].length})</span>
              </div>
              {grouped[owner].map((task, idx) => (
                <div key={task.id}
                  className={`px-5 py-3.5 hover:bg-gray-50 transition ${idx !== grouped[owner].length - 1 ? 'border-b border-gray-50' : ''}`}>
                  {editingId === task.id ? (
                    <div className="space-y-2">
                      <input type="text" value={editData.title} onChange={e => setEditData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary outline-none" autoFocus />
                      <input type="text" value={editData.description} onChange={e => setEditData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Description..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary outline-none" />
                      <div className="flex items-center gap-2">
                        <select value={editData.owner} onChange={e => setEditData(prev => ({ ...prev, owner: e.target.value }))}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white">
                          {OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <select value={editData.category} onChange={e => setEditData(prev => ({ ...prev, category: e.target.value }))}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button onClick={saveEdit} className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1">
                          <Save size={12} /> Save
                        </button>
                        <button onClick={cancelEdit} className="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-xs font-semibold">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <button onClick={() => toggleDone(task.id, task.done)} className="mt-0.5 flex-shrink-0">
                        <Circle size={18} className="text-gray-300 hover:text-primary transition" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 font-medium">{task.title}</p>
                        {task.description && <p className="text-xs text-gray-500 font-light mt-0.5">{task.description}</p>}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[task.category] || 'bg-gray-100 text-gray-600'}`}>
                          {task.category}
                        </span>
                        <button onClick={() => startEdit(task)} className="text-gray-300 hover:text-gray-500 transition">
                          <Pencil size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};
