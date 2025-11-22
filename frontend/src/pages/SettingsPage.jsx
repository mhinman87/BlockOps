import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Bell, Lock, Eye } from 'lucide-react';

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: true,
    twoFactor: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Email Notifications',
          description: 'Receive updates via email',
          key: 'emailNotifications',
        },
        {
          label: 'SMS Notifications',
          description: 'Receive alerts via SMS',
          key: 'smsNotifications',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Lock,
      items: [
        {
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          key: 'twoFactor',
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Eye,
      items: [
        {
          label: 'Dark Mode',
          description: 'Enable dark theme',
          key: 'darkMode',
          disabled: true,
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide">Settings</h1>
          <p className="text-gray-600 mt-2 font-light">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <div
                key={groupIndex}
                className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
              >
                {/* Group Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                    {group.title}
                  </h2>
                </div>

                {/* Group Items */}
                <div className="divide-y divide-gray-200">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-bold text-gray-900 uppercase tracking-wide text-sm">{item.label}</p>
                        <p className="text-gray-600 text-sm font-light">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key] || false}
                          onChange={() => handleToggle(item.key)}
                          disabled={item.disabled}
                          className="sr-only"
                        />
                        <div
                          className={`w-11 h-6 rounded-full transition ${
                            settings[item.key]
                              ? 'bg-primary'
                              : 'bg-gray-300'
                          } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition transform shadow-sm ${
                              settings[item.key] ? 'translate-x-5' : ''
                            }`}
                          ></span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/50">
            Save Changes
          </button>
          <button className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:border-primary hover:text-primary transition font-bold uppercase tracking-wide text-sm">
            Cancel
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
