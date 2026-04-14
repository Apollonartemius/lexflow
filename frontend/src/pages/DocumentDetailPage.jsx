import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { api } from '../lib/api';

export default function DocumentDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getDocument(id).then(setData).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: '40px', color: 'var(--text-tertiary)' }}>Loading...</div>;
  if (!data) return <div style={{ padding: '40px' }}>Document not found. <button className="btn btn-ghost" onClick={() => navigate('/documents')}>Go back</button></div>;

  const { document: doc, compliance, analysis } = data;
  const score = compliance?.compliance_score ?? 0;
  const issues = compliance?.issues || [];
  const passed = compliance?.passed || [];

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;
  const scoreColor = score >= 70 ? 'var(--accent-emerald)' : score >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)';

  return (
    <div>
      <button className="btn btn-ghost" onClick={() => navigate('/documents')} style={{ marginBottom: '20px' }}>
        <ArrowLeft size={16} /> Back to Documents
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', alignItems: 'start' }}>
        {/* Left column */}
        <div>
          <div className="card animate-in" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{doc.filename}</h2>
            <div className="issue-meta">
              <div className="issue-meta-item">
                <div><div className="issue-meta-label">Type</div><div className="issue-meta-value">{compliance?.document_type || '—'}</div></div>
              </div>
              <div className="issue-meta-item">
                <div><div className="issue-meta-label">Pages</div><div className="issue-meta-value">{analysis?.page_count || '—'}</div></div>
              </div>
              <div className="issue-meta-item">
                <div><div className="issue-meta-label">Words</div><div className="issue-meta-value">{analysis?.word_count?.toLocaleString() || '—'}</div></div>
              </div>
              <div className="issue-meta-item">
                <div><div className="issue-meta-label">Sections</div><div className="issue-meta-value">{analysis?.sections_count || '—'}</div></div>
              </div>
              <div className="issue-meta-item">
                <div><div className="issue-meta-label">Status</div><div className="issue-meta-value"><span className={`badge ${doc.status === 'completed' ? 'passed' : 'medium'}`}>{doc.status}</span></div></div>
              </div>
            </div>
          </div>

          {/* Issues */}
          {issues.length > 0 && (
            <div className="animate-in animate-in-delay-1">
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="var(--accent-rose)" /> Issues ({issues.length})
              </h3>
              {issues.map((issue, i) => (
                <div className="card" key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{issue.title}</div>
                    <span className={`badge ${issue.severity.toLowerCase()}`}>{issue.severity}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{issue.regulation} — {issue.section}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{issue.description}</div>
                  <div className="suggestion-box">
                    <h4><Lightbulb size={14} /> Suggested Fix</h4>
                    <p>{issue.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Passed */}
          {passed.length > 0 && (
            <div className="animate-in animate-in-delay-2" style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} color="var(--accent-emerald)" /> Passed ({passed.length})
              </h3>
              <div className="table-container">
                <table>
                  <thead><tr><th>Section</th><th>Regulation</th><th>Confidence</th></tr></thead>
                  <tbody>
                    {passed.map((p, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</td>
                        <td>{p.regulation}</td>
                        <td><span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{p.confidence}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right column — Gauge */}
        <div className="card animate-in animate-in-delay-1">
          <div className="gauge-container">
            <svg className="gauge-svg" viewBox="0 0 160 160">
              <circle className="gauge-bg" cx="80" cy="80" r="70" />
              <circle className="gauge-fill" cx="80" cy="80" r="70"
                stroke={scoreColor}
                strokeDasharray={circumference}
                strokeDashoffset={offset} />
            </svg>
            <div className="gauge-text" style={{ color: scoreColor }}>{score}%</div>
            <div className="gauge-label">Compliance Score</div>
          </div>
          <div style={{ padding: '0 16px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>Rules Checked</span>
              <span style={{ fontWeight: 700 }}>{compliance?.total_rules_checked || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--accent-emerald)' }}>Passed</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{compliance?.rules_passed || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--accent-rose)' }}>Failed</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-rose)' }}>{compliance?.rules_failed || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
