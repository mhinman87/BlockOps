import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useTheme } from '../contexts/ThemeContext';
import { Bell, Lock, Eye } from 'lucide-react';
import { dashboardButtonSecondary, dashboardCard, dashboardHeroSubtitle, dashboardHeroTitle } from '../services/dashboardTheme.js';

export const SettingsPage = () => {
  const { dark, toggle } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactor: false,
  });

  const handleToggle = (key) => {
    if (key === 'darkMode') {
      toggle();
      return;
    }
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
        },
      ],
    },
  ];

  const getSettingValue = (key) => {
    if (key === 'darkMode') return dark;
    return settings[key] || false;
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className={dashboardHeroTitle}>Settings</h1>
          <p className={dashboardHeroSubtitle}>
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
                className={`${dashboardCard} shadow-md overflow-hidden`}
              >
                {/* Group Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border flex items-center gap-3 bg-gray-50 dark:bg-dark-bg">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    {group.title}
                  </h2>
                </div>

                {/* Group Items */}
                <div className="divide-y divide-gray-200 dark:divide-dark-border">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-border/30 transition"
                    >
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide text-sm">{item.label}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-light">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={getSettingValue(item.key)}
                          onChange={() => handleToggle(item.key)}
                          className="sr-only"
                        />
                        <div
                          className={`w-11 h-6 rounded-full transition ${
                            getSettingValue(item.key)
                              ? 'bg-primary'
                              : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition transform shadow-sm ${
                              getSettingValue(item.key) ? 'translate-x-5' : ''
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
          <button className={`${dashboardButtonSecondary} px-6 py-2`}>
            Cancel
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
