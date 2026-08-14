import React from 'react';
import { Briefcase, PlusCircle, LayoutDashboard, User, SwitchCamera, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Header({ currentView, onViewChange, role, onRoleChange }) {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header className="main-header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Utility Bar (LG VN Style) */}
      <div className="header-top-utility-bar">
        <div className="header-container">
          <div className="utility-left">
            <a href="#" className={role === 'candidate' ? "active" : ""} onClick={(e) => { e.preventDefault(); onRoleChange('candidate'); onViewChange('jobs'); }}>
              {t('navPersonal')}
            </a>
            <a href="#" className={role === 'employer' ? "active" : ""} onClick={(e) => { e.preventDefault(); onRoleChange('employer'); onViewChange('dashboard'); }}>
              {t('navBusiness')}
            </a>
          </div>
          <div className="utility-right">
            <a href="#" onClick={(e) => e.preventDefault()}>{t('navProcess')}</a>
            <a href="https://www.lg.com/vn" target="_blank" rel="noopener noreferrer">{t('navAboutLG')}</a>
            <a href="#" onClick={(e) => e.preventDefault()}>{t('navSupport')}</a>

            {/* Bilingual Flag Language Switcher */}
            <button 
              className="lang-switcher-pill"
              onClick={toggleLanguage}
              title={lang === 'vi' ? 'Switch to English 🇬🇧' : 'Chuyển sang Tiếng Việt 🇻🇳'}
            >
              <span className={`lang-option ${lang === 'vi' ? 'active-lang' : ''}`}>
                <span className="flag-emoji">🇻🇳</span> VIE
              </span>
              <span className="lang-divider">|</span>
              <span className={`lang-option ${lang === 'en' ? 'active-lang' : ''}`}>
                <span className="flag-emoji">🇬🇧</span> ENG
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main GNB Grid */}
      <div className="header-container">
        {/* Logo (LG VN BI style signature) */}
        <div className="logo-section" onClick={() => onViewChange('jobs')} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          {/* LG Symbol SVG */}
          <svg viewBox="0 6.709 10.582 10.582" width="28" height="28" style={{ display: 'block' }}>
            <path fill="#A50034" d="M5.291 6.709a5.29 5.29 0 1 1 0 10.582 5.291 5.291 0 1 1 0-10.582m3.16 8.457a4.445 4.445 0 0 0 1.31-3.161v-.242l-.22.001H6.596v.494h2.662l-.001.015a3.985 3.985 0 0 1-3.965 3.708 3.95 3.95 0 0 1-2.811-1.165 3.952 3.952 0 0 1-1.164-2.811c0-1.061.414-2.059 1.164-2.81a3.951 3.951 0 0 1 2.81-1.164l.252.003v-.495l-.251-.003a4.475 4.475 0 0 0-4.47 4.469c0 1.194.465 2.316 1.309 3.161a4.444 4.444 0 0 0 3.16 1.31 4.444 4.444 0 0 0 3.162-1.31m-2.91-1.297V9.644H5.04v4.72h1.556v-.495H5.543zm-1.265-3.552a.676.676 0 1 0-.675.674.676.676 0 0 0 .675-.674"/>
          </svg>
          <span style={{ color: '#000000', fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px', fontFamily: "'Inter', sans-serif", lineHeight: '1' }}>
            LG
          </span>
          <div className="logo-text-group" style={{ display: 'flex', flexDirection: 'column', gap: '0px', alignItems: 'flex-start', borderLeft: '1px solid #e5e5e0', paddingLeft: '8px', marginLeft: '2px' }}>
            <span className="logo-text" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)', lineHeight: '1.1' }}>
              Careers
            </span>
            <span className="logo-slogan" style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '1' }}>
              Life's Good.
            </span>
          </div>
        </div>

        {/* Navigation Links based on role */}
        <nav className="header-nav lg-gnb-nav">
          {role === 'candidate' ? (
            <>
              <button 
                className={`nav-link lg-gnb-link ${currentView === 'jobs' ? 'active' : ''}`}
                onClick={() => onViewChange('jobs')}
              >
                {t('navJobs')}
              </button>
              <button 
                className="nav-link lg-gnb-link"
                onClick={() => { onViewChange('jobs'); setTimeout(() => { window.scrollTo({ top: 1200, behavior: 'smooth' }); }, 100); }}
              >
                {t('navDiscover')}
              </button>
              <button 
                className="nav-link lg-gnb-link"
                onClick={() => alert(lang === 'vi' ? 'Chức năng đang được cập nhật. Quy trình tuyển dụng của LG gồm 4 bước: Nộp hồ sơ, Phỏng vấn sơ loại, Đánh giá năng lực và Phỏng vấn chuyên sâu.' : 'Feature updating. LG recruitment process consists of 4 steps: Application, Screening Interview, Skill Assessment, and Technical Interview.')}
              >
                {t('navProcess')}
              </button>
            </>
          ) : (
            <>
              <button 
                className={`nav-link lg-gnb-link ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => onViewChange('dashboard')}
              >
                <LayoutDashboard size={16} />
                {t('dashboardTitle')}
              </button>
              <button 
                className={`nav-link lg-gnb-link ${currentView === 'post-job' ? 'active' : ''}`}
                onClick={() => onViewChange('post-job')}
              >
                <PlusCircle size={16} />
                {t('btnPostJobMain')}
              </button>
            </>
          )}
        </nav>

        {/* Role Switcher & Profile */}
        <div className="header-actions">
          <button 
            className={`role-toggle-btn ${role === 'employer' ? 'employer-mode' : ''}`} 
            onClick={() => {
              const nextRole = role === 'candidate' ? 'employer' : 'candidate';
              onRoleChange(nextRole);
              onViewChange(nextRole === 'candidate' ? 'jobs' : 'dashboard');
            }}
            title="Chuyển đổi vai trò người dùng"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <SwitchCamera size={14} />
            <span>
              {role === 'candidate' ? t('navRoleEmployer') : t('navRoleCandidate')}
            </span>
          </button>

          <div className="user-profile">
            <div className="avatar">
              <User size={16} />
            </div>
            <div className="user-info">
              <span className="user-name" style={{ fontSize: '13px' }}>
                {role === 'candidate' ? t('userCandidate') : t('userRecruiter')}
              </span>
              <span className="user-status" style={{ fontSize: '10px' }}>Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
