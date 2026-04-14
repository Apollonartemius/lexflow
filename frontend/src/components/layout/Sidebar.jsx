import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Upload, AlertTriangle, FileText,
  Shield, Settings, LogOut, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const location = useLocation();

  const navItems = [
    { section: 'Overview' },
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/upload', icon: Upload, label: 'Upload Document' },
    { section: 'Analysis' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/issues', icon: AlertTriangle, label: 'Issues' },
    { section: 'System' },
    { path: '/regulations', icon: Shield, label: 'Regulations' },
  ];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">⚖️</div>
        <div>
          <h1>LexFlow</h1>
          <span>Compliance Engine</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div key={`section-${i}`} className="nav-section-title">
                {item.section}
              </div>
            );
          }

          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive ? 'active' : ''}`}
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: '12px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{
          padding: '12px',
          fontSize: '13px',
          color: 'var(--text-tertiary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px'
        }}>
          <Activity size={14} />
          <span>{user?.email || 'dev@lexflow.local'}</span>
        </div>
        <button
          className="nav-link"
          onClick={logout}
          style={{ width: '100%', border: 'none', background: 'none', fontFamily: 'inherit' }}
          id="btn-logout"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
