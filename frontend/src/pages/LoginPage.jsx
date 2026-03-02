import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, error } = useAuth();

  const [inviteError, setInviteError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    inviteCode: '',
  });

  // Valid invite codes — swap for Supabase lookup later
  const VALID_INVITE_CODES = ['BLOCKOPS2026', 'FOUNDING-PARTNER', 'TEAM-ACCESS'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let success;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      // Validate invite code before allowing registration
      if (!VALID_INVITE_CODES.includes(formData.inviteCode.trim().toUpperCase())) {
        setInviteError('Invalid invite code. Contact your Block Ops representative for access.');
        setLoading(false);
        return;
      }
      setInviteError('');
      success = await register(formData.email, formData.fullName, formData.password);
    }

    setLoading(false);

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl sm:text-2xl font-black text-primary uppercase tracking-wide">
              Block Ops
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-primary transition font-bold uppercase tracking-wide text-sm"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen pt-32 px-4 pb-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center uppercase tracking-wide">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 text-center mb-8 font-light">
              {isLogin
                ? 'Sign in to access your consulting dashboard'
                : 'Create an account to get started with Block Ops'}
            </p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name - Register Only */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required={!isLogin}
                    style={{ 
                      backgroundColor: '#ffffff',
                      color: '#111827',
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#42A5B3';
                      e.target.style.boxShadow = '0 0 0 3px rgba(66, 165, 179, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="John Doe"
                  />
                </div>
              )}

              {/* Invite Code - Register Only */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-900">
                    Invite Code
                  </label>
                  <input
                    type="text"
                    name="inviteCode"
                    value={formData.inviteCode}
                    onChange={handleChange}
                    required={!isLogin}
                    style={{ 
                      backgroundColor: '#ffffff',
                      color: '#111827',
                      width: '100%',
                      padding: '12px 16px',
                      border: inviteError ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#42A5B3';
                      e.target.style.boxShadow = '0 0 0 3px rgba(66, 165, 179, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = inviteError ? '#ef4444' : '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter your invite code"
                  />
                  {inviteError && (
                    <p className="text-red-500 text-xs mt-1">{inviteError}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-900">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ 
                    backgroundColor: '#ffffff',
                    color: '#111827',
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#5d87ff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(93, 135, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2 text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ 
                      backgroundColor: '#ffffff',
                      color: '#111827',
                      width: '100%',
                      padding: '12px 48px 12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#42A5B3';
                      e.target.style.boxShadow = '0 0 0 3px rgba(66, 165, 179, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 px-2 py-1 rounded hover:opacity-80 transition bg-primary text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold uppercase tracking-wide hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg shadow-primary/50"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200"></div>

            {/* Toggle Form */}
            <p className="text-center text-gray-700 text-sm font-light">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: '', password: '', fullName: '', inviteCode: '' });
                  setInviteError('');
                }}
                className="px-4 py-2 rounded-lg hover:opacity-80 font-bold uppercase tracking-wide transition bg-primary text-white"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-xs mt-8 font-light">
            By signing in, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};
