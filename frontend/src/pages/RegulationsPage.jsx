import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { api } from '../lib/api';

export default function RegulationsPage() {
  const [regs, setRegs] = useState([]);
  const [rules, setRules] = useState([]);
  const [docType, setDocType] = useState('Annual Report');

  useEffect(() => {
    api.getRegulations().then(d => setRegs(d.regulations || [])).catch(() => {});
  }, []);

  useEffect(() => {
    api.getRules(docType).then(d => setRules(d.rules || [])).catch(() => {});
  }, [docType]);

  const docTypes = ['Annual Report', '10-K Filing', 'Quarterly Report', 'IPO Prospectus', 'Corporate Governance Report'];

  return (
    <div>
      {/* Regulations */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        {regs.map((reg, i) => (
          <div className="card animate-in" key={reg.id} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="card-header">
              <span className="card-title">{reg.jurisdiction}</span>
              <div className="card-icon violet"><Shield size={18} /></div>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{reg.name}</div>
            <div className="card-description">{reg.full_name}</div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--accent-primary)' }}>{reg.authority}</div>
          </div>
        ))}
      </div>

      {/* Rules by doc type */}
      <div className="section-header">
        <h2 className="section-title">Compliance Rules</h2>
        <select value={docType} onChange={e => setDocType(e.target.value)}
          className="input" style={{ width: 'auto', padding: '8px 12px' }}>
          {docTypes.map(dt => <option key={dt} value={dt}>{dt}</option>)}
        </select>
      </div>

      <div className="table-container animate-in">
        <table>
          <thead>
            <tr><th>Regulation</th><th>Section</th><th>Category</th><th>Requirement</th><th>Severity</th></tr>
          </thead>
          <tbody>
            {rules.map((rule, i) => (
              <tr key={i}>
                <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rule.regulation}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{rule.section_title}</td>
                <td><span className="badge medium">{rule.category}</span></td>
                <td style={{ maxWidth: '300px', fontSize: '13px' }}>{rule.requirement}</td>
                <td><span className={`badge ${(rule.violation_severity || 'medium').toLowerCase()}`}>{rule.violation_severity || 'Medium'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
