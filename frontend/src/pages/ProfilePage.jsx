import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { Mail, User, Calendar } from 'lucide-react';

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
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400 mt-2">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-primary to-blue-600"></div>

          {/* Profile Content */}
          <div className="p-8 relative -mt-16">
            {/* Avatar */}
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-xl border-4 border-dark-card"></div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user?.full_name}
                </h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Profile Information */}
            {!isEditing ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-dark-bg rounded-lg">
                  <User className="text-primary" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white font-medium">{user?.full_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-bg rounded-lg">
                  <Mail className="text-primary" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Email Address</p>
                    <p className="text-white font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-bg rounded-lg">
                  <Calendar className="text-primary" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-white font-medium">
                      {formatDate(user?.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-bg rounded-lg">
                  <div className="w-5 h-5 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="text-gray-400 text-sm">Account Status</p>
                    <p className="text-white font-medium">
                      {user?.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-gray-500 opacity-50 cursor-not-allowed"
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-dark-bg border border-dark-border text-white rounded-lg hover:border-primary transition font-medium"
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
