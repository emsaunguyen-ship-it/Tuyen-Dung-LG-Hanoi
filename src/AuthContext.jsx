import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ACCOUNTS_KEY = 'lg_careers_accounts';
const CURRENT_USER_KEY = 'lg_careers_current_user';

// Seed a default demo employer account so recruiters can log in immediately
// without needing to register first.
const DEFAULT_ACCOUNTS = [
  {
    id: 'acc-employer-demo',
    role: 'employer',
    name: 'Nguyễn Khánh Thuỷ',
    company: 'LG Electronics Việt Nam',
    email: 'hr@lge.com',
    password: 'lgcareers2026',
  },
];

export function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem(ACCOUNTS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse accounts from localStorage', e);
      }
    }
    return DEFAULT_ACCOUNTS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // role: 'candidate' | 'employer'
  const register = ({ role, name, company, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const exists = accounts.some(acc => acc.email.toLowerCase() === normalizedEmail && acc.role === role);
    if (exists) {
      return { success: false, error: 'EMAIL_EXISTS' };
    }
    const newAccount = {
      id: `acc-${role}-${Date.now()}`,
      role,
      name,
      company: company || '',
      email: normalizedEmail,
      password,
    };
    setAccounts(prev => [...prev, newAccount]);
    const { password: _pw, ...publicUser } = newAccount;
    setCurrentUser(publicUser);
    return { success: true, user: publicUser };
  };

  const login = ({ role, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = accounts.find(acc =>
      acc.role === role &&
      acc.email.toLowerCase() === normalizedEmail &&
      acc.password === password
    );
    if (!found) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }
    const { password: _pw, ...publicUser } = found;
    setCurrentUser(publicUser);
    return { success: true, user: publicUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
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
