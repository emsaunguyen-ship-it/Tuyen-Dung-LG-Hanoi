import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lg_careers_language') || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('lg_careers_language', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'vi' ? 'en' : 'vi'));
  };

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations['vi']?.[key] || key;
    Object.keys(params).forEach(pKey => {
      text = text.replace(`{{${pKey}}}`, params[pKey]);
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
