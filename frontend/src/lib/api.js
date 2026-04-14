/**
 * LexFlow Frontend — API Service
 * Handles all HTTP requests to the backend.
 */

const API_URL = import.meta.env.VITE_API_URL || '';

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem('lexflow_token');

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (email, password, full_name) =>
    request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name }),
    }),

  // Documents
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request('/api/documents/upload', {
      method: 'POST',
      body: formData,
    });
  },

  getDocuments: () => request('/api/documents'),

  getDocument: (id) => request(`/api/documents/${id}`),

  // Compliance
  getRegulations: () => request('/api/compliance/regulations'),

  getRules: (docType = 'Annual Report') =>
    request(`/api/compliance/rules?docType=${encodeURIComponent(docType)}`),

  getComplianceStats: () => request('/api/compliance/stats'),

  // Dashboard
  getDashboardStats: () => request('/api/dashboard/stats'),

  // Health
  getHealth: () => request('/api/health'),
};
