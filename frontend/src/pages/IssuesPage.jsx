import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { api } from '../lib/api';

export default function IssuesPage() {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getDocuments().then(d => setDocs(d.documents || [])).catch(() => {});
  }, []);

  // Gather all issues from completed docs
  // We need full doc details to get issues, so for now show summary
  const completedDocs = docs.filter(d => d.status === 'completed' && d.issues_count > 0);
  const totalIssues = docs.reduce((s, d) => s + (d.issues_count || 0), 0);

  return (
    <div>
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="card animate-in">
          <div className="card-header">
            <span className="card-title">Total Issues</span>
            <div className="card-icon rose"><AlertTriangle size={20} /></div>
          </div>
          <div className="card-value">{totalIssues}</div>
          <div className="card-description">Across {completedDocs.length} documents</div>
        </div>
      </div>

      {completedDocs.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><AlertTriangle size={32} /></div>
            <h3>No issues found</h3>
            <p>Upload and analyze documents to see compliance issues here.</p>
          </div>
        </div>
      ) : (
        <div className="table-container animate-in animate-in-delay-1">
          <div className="table-header">
            <span className="table-title">Documents with Issues</span>
          </div>
          <table>
            <thead>
              <tr><th>Document</th><th>Type</th><th>Issues</th><th>Score</th><th>Action</th></tr>
            </thead>
            <tbody>
              {completedDocs.map(doc => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{doc.filename}</td>
                  <td>{doc.document_type || '—'}</td>
                  <td><span className="badge critical">{doc.issues_count} issues</span></td>
                  <td style={{ color: doc.compliance_score >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700 }}>
                    {doc.compliance_score}%
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/documents/${doc.id}`)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
