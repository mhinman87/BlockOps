import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { CompanyPage } from './pages/CompanyPage';
import { DashboardHome } from './pages/DashboardHome';
import { KnowledgeLibraryPage } from './pages/KnowledgeLibraryPage';
import { DeliverablesPage } from './pages/DeliverablesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { MeetingPage } from './pages/MeetingPage';
import { LeadsPage } from './pages/LeadsPage';
import { IntelPage } from './pages/IntelPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/company" element={<CompanyPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          <Route path="/dashboard/library" element={<ProtectedRoute><KnowledgeLibraryPage /></ProtectedRoute>} />
          <Route path="/dashboard/deliverables" element={<ProtectedRoute><DeliverablesPage /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/meeting" element={<ProtectedRoute><MeetingPage /></ProtectedRoute>} />
          <Route path="/dashboard/leads" element={<ProtectedRoute><LeadsPage /></ProtectedRoute>} />
          <Route path="/dashboard/intel" element={<ProtectedRoute><IntelPage /></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
