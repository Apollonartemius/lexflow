import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('lexflow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('lexflow_user');
        localStorage.removeItem('lexflow_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    const userData = data.user;
    const token = data.session?.access_token || 'dev-token';

    setUser(userData);
    localStorage.setItem('lexflow_user', JSON.stringify(userData));
    localStorage.setItem('lexflow_token', token);
    return userData;
  };

  const signup = async (email, password, fullName) => {
    const data = await api.signup(email, password, fullName);
    const userData = data.user;
    const token = data.session?.access_token || 'dev-token';

    setUser(userData);
    localStorage.setItem('lexflow_user', JSON.stringify(userData));
    localStorage.setItem('lexflow_token', token);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lexflow_user');
    localStorage.removeItem('lexflow_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
