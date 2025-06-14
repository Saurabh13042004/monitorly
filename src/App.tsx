import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import MonitorDetailPage from './pages/MonitorDetailPage';
import StatusPageEditor from './pages/StatusPageEditor';
import AlertSettings from './pages/AlertSettings';
import TeamManagement from './pages/TeamManagement';
import IntegrationsPage from './pages/IntegrationsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-dark-300 via-dark-200 to-dark-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/monitor/:id" element={<MonitorDetailPage />} />
            <Route path="/status-pages" element={<StatusPageEditor />} />
            <Route path="/alerts" element={<AlertSettings />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;