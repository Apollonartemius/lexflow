import React from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': { title: 'Dashboard', subtitle: 'Compliance overview and analytics' },
  '/upload': { title: 'Upload Document', subtitle: 'Analyze a financial document for compliance' },
  '/documents': { title: 'Documents', subtitle: 'All analyzed documents' },
  '/issues': { title: 'Compliance Issues', subtitle: 'Flagged violations and suggestions' },
  '/regulations': { title: 'Regulations', subtitle: 'SEBI & SEC regulatory framework' },
};

export default function Header() {
  const location = useLocation();
  const page = PAGE_TITLES[location.pathname] || { title: 'LexFlow', subtitle: '' };

  return (
    <header className="header" id="header">
      <div>
        <div className="header-title">{page.title}</div>
        <div className="header-subtitle">{page.subtitle}</div>
      </div>
      <div className="header-actions">
        <div className="header-status">
          <span className="status-dot online" />
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
}
