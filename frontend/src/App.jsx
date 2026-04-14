import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import DocumentsPage from './pages/DocumentsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import IssuesPage from './pages/IssuesPage';
import RegulationsPage from './pages/RegulationsPage';

function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚖️</div>
          <div>Loading LexFlow...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignupPage />} />
      <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
      <Route path="/upload" element={<ProtectedLayout><UploadPage /></ProtectedLayout>} />
      <Route path="/documents" element={<ProtectedLayout><DocumentsPage /></ProtectedLayout>} />
      <Route path="/documents/:id" element={<ProtectedLayout><DocumentDetailPage /></ProtectedLayout>} />
      <Route path="/issues" element={<ProtectedLayout><IssuesPage /></ProtectedLayout>} />
      <Route path="/regulations" element={<ProtectedLayout><RegulationsPage /></ProtectedLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
