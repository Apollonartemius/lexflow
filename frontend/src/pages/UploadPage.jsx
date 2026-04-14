import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') setFile(f);
    else setError('Only PDF files are supported');
  };

  const handleSelect = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setError(''); }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    setProgress(20);

    try {
      setProgress(50);
      const data = await api.uploadDocument(file);
      setProgress(100);
      setResult(data);

      // Wait then navigate to document
      setTimeout(() => {
        if (data.document?.id) navigate(`/documents`);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Upload failed');
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      <div className="card animate-in">
        {!result ? (
          <>
            <div
              className={`upload-zone ${dragging ? 'dragging' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              id="upload-zone"
            >
              <input type="file" ref={inputRef} accept=".pdf" onChange={handleSelect} hidden />
              <div className="upload-icon"><Upload size={32} /></div>
              <div className="upload-title">
                {file ? file.name : 'Drop your document here'}
              </div>
              <div className="upload-subtitle">
                {file ? `${(file.size / 1024 / 1024).toFixed(1)} MB — Ready to analyze` : 'or click to browse files'}
              </div>
              <div className="upload-formats">
                <span className="upload-format-tag">PDF</span>
                <span className="upload-format-tag">Max 50MB</span>
              </div>
            </div>

            {error && <div className="auth-error" style={{ marginTop: '16px' }}>{error}</div>}

            {uploading && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button className="btn btn-primary btn-lg" onClick={handleUpload}
                disabled={!file || uploading} id="btn-analyze" style={{ flex: 1 }}>
                <FileText size={18} />
                {uploading ? 'Analyzing...' : 'Analyze Document'}
              </button>
              {file && !uploading && (
                <button className="btn btn-secondary btn-lg" onClick={() => { setFile(null); setError(''); }}>
                  Clear
                </button>
              )}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <CheckCircle size={56} color="var(--accent-emerald)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Document Uploaded!</h3>
            <p style={{ color: 'var(--text-tertiary)', marginBottom: '20px' }}>
              Analysis is running. You'll see results shortly.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/documents')}>
              View Documents
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
