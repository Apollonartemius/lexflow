import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, AlertTriangle, CheckCircle, TrendingUp, Database } from 'lucide-react';
import { api } from '../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getDashboardStats().then(setStats).catch(() => {});
    api.getDocuments().then(d => setDocs(d.documents || [])).catch(() => {});
  }, []);

  const graphStats = stats?.graph || { total_regulations: 3, total_sections: 19, total_requirements: 12, total_violations: 12 };
  const services = stats?.services || { neo4j: 'offline', nlp: 'unavailable', backend: 'running' };

  // Calculate aggregate from docs
  const totalDocs = docs.length;
  const analyzedDocs = docs.filter(d => d.status === 'completed').length;
  const totalIssues = docs.reduce((sum, d) => sum + (d.issues_count || 0), 0);
  const avgScore = analyzedDocs > 0
    ? Math.round(docs.filter(d => d.compliance_score != null).reduce((s, d) => s + d.compliance_score, 0) / analyzedDocs)
    : 0;

  return (
    <div>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="card animate-in" id="stat-documents">
          <div className="card-header">
            <span className="card-title">Documents</span>
            <div className="card-icon blue"><FileText size={20} /></div>
          </div>
          <div className="card-value">{totalDocs}</div>
          <div className="card-description">{analyzedDocs} analyzed</div>
        </div>

        <div className="card animate-in animate-in-delay-1" id="stat-issues">
          <div className="card-header">
            <span className="card-title">Issues Found</span>
            <div className="card-icon rose"><AlertTriangle size={20} /></div>
          </div>
          <div className="card-value">{totalIssues}</div>
          <div className="card-description">Across all documents</div>
        </div>

        <div className="card animate-in animate-in-delay-2" id="stat-score">
          <div className="card-header">
            <span className="card-title">Avg. Compliance</span>
            <div className="card-icon emerald"><TrendingUp size={20} /></div>
          </div>
          <div className="card-value">{avgScore}%</div>
          <div className="card-description">{avgScore >= 70 ? 'Good standing' : 'Needs attention'}</div>
        </div>

        <div className="card animate-in animate-in-delay-3" id="stat-regulations">
          <div className="card-header">
            <span className="card-title">Regulations</span>
            <div className="card-icon violet"><Shield size={20} /></div>
          </div>
          <div className="card-value">{graphStats.total_regulations}</div>
          <div className="card-description">{graphStats.total_sections} sections tracked</div>
        </div>
      </div>

      {/* Services Status */}
      <div className="section-header">
        <h2 className="section-title">Service Status</h2>
      </div>
      <div className="services-grid animate-in animate-in-delay-2">
        <div className="service-card">
          <div className="card-icon blue"><Database size={18} /></div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Neo4j Graph</div>
            <div className={`service-status ${services.neo4j === 'connected' ? 'connected' : 'offline'}`}>
              {services.neo4j}
            </div>
          </div>
        </div>
        <div className="service-card">
          <div className="card-icon cyan"><span style={{ fontSize: '16px' }}>🧠</span></div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>NLP Service</div>
            <div className={`service-status ${services.nlp === 'healthy' ? 'connected' : 'offline'}`}>
              {services.nlp}
            </div>
          </div>
        </div>
        <div className="service-card">
          <div className="card-icon emerald"><CheckCircle size={18} /></div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>Backend API</div>
            <div className="service-status running">{services.backend}</div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div style={{ marginTop: '32px' }}>
        <div className="section-header">
          <h2 className="section-title">Recent Documents</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/upload')} id="btn-upload-new">
            Upload New
          </button>
        </div>
        {docs.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon"><FileText size={32} /></div>
              <h3>No documents yet</h3>
              <p>Upload a financial document to start compliance analysis</p>
              <button className="btn btn-primary" style={{ marginTop: '16px' }}
                onClick={() => navigate('/upload')}>Upload Document</button>
            </div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Type</th>
                  <th>Score</th>
                  <th>Issues</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {docs.slice(0, 5).map(doc => (
                  <tr key={doc.id} onClick={() => navigate(`/documents/${doc.id}`)} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{doc.filename}</td>
                    <td>{doc.document_type || '—'}</td>
                    <td>
                      {doc.compliance_score != null ? (
                        <span style={{ color: doc.compliance_score >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700 }}>
                          {doc.compliance_score}%
                        </span>
                      ) : '—'}
                    </td>
                    <td>{doc.issues_count || 0}</td>
                    <td><span className={`badge ${doc.status === 'completed' ? 'passed' : doc.status === 'error' ? 'critical' : 'medium'}`}>{doc.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
