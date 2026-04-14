import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, RefreshCw } from 'lucide-react';
import { api } from '../lib/api';

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    api.getDocuments().then(d => setDocs(d.documents || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">All Documents</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost btn-sm" onClick={load}><RefreshCw size={14} /> Refresh</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/upload')}>Upload New</button>
        </div>
      </div>

      {docs.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><FileText size={32} /></div>
            <h3>No documents uploaded</h3>
            <p>Upload a financial document to get started with compliance analysis.</p>
          </div>
        </div>
      ) : (
        <div className="table-container animate-in">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Filename</th>
                <th>Type</th>
                <th>Compliance</th>
                <th>Issues</th>
                <th>Status</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => (
                <tr key={doc.id} onClick={() => navigate(`/documents/${doc.id}`)} style={{ cursor: 'pointer' }}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{doc.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{doc.filename}</td>
                  <td>{doc.document_type || '—'}</td>
                  <td>
                    {doc.compliance_score != null ? (
                      <span style={{ color: doc.compliance_score >= 70 ? 'var(--accent-emerald)' : doc.compliance_score >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)', fontWeight: 700 }}>
                        {doc.compliance_score}%
                      </span>
                    ) : '—'}
                  </td>
                  <td>{doc.issues_count}</td>
                  <td><span className={`badge ${doc.status === 'completed' ? 'passed' : doc.status === 'error' ? 'critical' : 'medium'}`}>{doc.status}</span></td>
                  <td style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
