import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Users,
  Target,
  ClipboardList,
  TrendingUp,
  BookMarked,
} from 'lucide-react';

export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isTeam } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Knowledge Library', path: '/dashboard/library' },
    { icon: FolderOpen, label: 'My Deliverables', path: '/dashboard/deliverables' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  ];

  const teamMenuItems = [
    { icon: ClipboardList, label: 'Weekly Meeting', path: '/dashboard/meeting' },
    { icon: Target, label: 'Lead Pipeline', path: '/dashboard/leads' },
    { icon: BookMarked, label: 'Operations', path: '/dashboard/operations' },
    { icon: TrendingUp, label: 'Business Intel', path: '/dashboard/intel' },
  ];

  const bottomMenuItems = [
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-semibold ${
          isActive
            ? 'bg-primary text-white shadow-md shadow-primary/30'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-5 border-b border-gray-200">
          <Link to="/dashboard" className="text-lg font-black text-primary uppercase tracking-wide">
            Block Ops
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-900">
            <X size={20} />
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-4 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Main</p>
          {mainMenuItems.map((item) => <NavLink key={item.path} item={item} />)}

          {isTeam && (
            <div className="pt-4">
              <p className="px-4 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Team</p>
              {teamMenuItems.map((item) => <NavLink key={item.path} item={item} />)}
            </div>
          )}
          
          <div className="pt-4">
            <p className="px-4 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Account</p>
            {bottomMenuItems.map((item) => <NavLink key={item.path} item={item} />)}
          </div>
        </nav>

        {/* User + Logout */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-primary rounded-full flex-shrink-0"></div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-50 transition text-gray-500 hover:text-red-600 text-sm font-semibold"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-500 hover:text-gray-900">
            <Menu size={20} />
          </button>
          <div className="hidden md:block"></div>

          {/* Right Section */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-primary rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700 hidden sm:inline">{user?.full_name}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                </div>
                <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100">Sign Out</button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};
