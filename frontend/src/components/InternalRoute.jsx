import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
  </div>
);

export const InternalRoute = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isTeam, loading: roleLoading } = useUserRole();

  if (authLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roleLoading) return <LoadingScreen />;

  // Fail closed: an authenticated account without an explicit reviewer/admin
  // row is a client and cannot render or start loading internal routes.
  if (!isTeam) {
    return (
      <Navigate
        to="/dashboard"
        replace
        state={{ accessDenied: 'Mission Control is available to internal Block Ops roles only.' }}
      />
    );
  }

  return children;
};
