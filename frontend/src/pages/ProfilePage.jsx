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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase tracking-wide">My Profile</h1>
          <p className="text-gray-600 mt-2 font-light">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
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
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                  {user?.full_name}
                </h2>
                <p className="text-gray-600 font-light">{user?.email}</p>
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
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <User className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-bold uppercase tracking-wide">Full Name</p>
                    <p className="text-gray-900 font-medium">{user?.full_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-bold uppercase tracking-wide">Email Address</p>
                    <p className="text-gray-900 font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-bold uppercase tracking-wide">Member Since</p>
                    <p className="text-gray-900 font-medium">
                      {formatDate(user?.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-gray-600 text-sm font-bold uppercase tracking-wide">Account Status</p>
                    <p className="text-gray-900 font-medium">
                      {user?.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wide text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wide text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-gray-600 text-xs mt-1 font-light">
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
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:border-primary hover:text-primary transition font-bold uppercase tracking-wide text-sm"
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
