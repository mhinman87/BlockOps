import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { Mail, User, Calendar } from 'lucide-react';
import { dashboardButtonSecondary, dashboardCard, dashboardHeroSubtitle, dashboardHeroTitle, dashboardInput, dashboardSurfaceMuted } from '../services/dashboardTheme.js';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to update profile
    console.log('Update profile:', formData);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className={dashboardHeroTitle}>My Profile</h1>
          <p className={dashboardHeroSubtitle}>
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className={`${dashboardCard} shadow-md overflow-hidden`}>
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-teal-400 to-primary"></div>

          {/* Profile Content */}
          <div className="p-8 relative -mt-16">
            {/* Avatar */}
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-primary rounded-xl border-4 border-white shadow-lg"></div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  {user?.full_name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 font-light">{user?.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/50"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Profile Information */}
            {!isEditing ? (
              <div className="space-y-6">
                <div className={`${dashboardSurfaceMuted} flex items-center gap-4 p-4`}>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <User className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wide">Full Name</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{user?.full_name}</p>
                  </div>
                </div>

                <div className={`${dashboardSurfaceMuted} flex items-center gap-4 p-4`}>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wide">Email Address</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className={`${dashboardSurfaceMuted} flex items-center gap-4 p-4`}>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wide">Member Since</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {formatDate(user?.created_at)}
                    </p>
                  </div>
                </div>

                <div className={`${dashboardSurfaceMuted} flex items-center gap-4 p-4`}>
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wide">Account Status</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {user?.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={dashboardInput}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 font-light">
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-bold uppercase tracking-wide text-sm shadow-lg shadow-primary/50"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`${dashboardButtonSecondary} px-6 py-2`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
