import React, { useState, useEffect } from 'react';
import { Flame, X, MapPin, DollarSign, ArrowRight, Zap, ShieldAlert, Award } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function UrgentHiringPopup({ jobs, onSelectJob, onApplyJob }) {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('lg_careers_urgent_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('lg_careers_urgent_popup_seen', 'true');
  };

  if (!isOpen) return null;

  const urgentJobs = jobs.filter(j => 
    j.id === 'job-lg-1' || j.id === 'job-lg-4' || j.id === 'job-lg-2'
  ).slice(0, 3);

  return (
    <div className="modal-overlay urgent-popup-overlay" onClick={handleClose}>
      <div className="modal-content urgent-hiring-modal animate-zoom-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn urgent-close-btn" onClick={handleClose} aria-label={t('btnCloseWindow')}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="urgent-modal-header">
          <div className="urgent-badge-pill">
            <Flame size={16} fill="#ffffff" className="flame-icon-pulse" />
            <span>{t('urgentPopupHeaderTag')}</span>
          </div>
          <h2 className="urgent-modal-title">
            {t('urgentPopupTitle')}
          </h2>
          <p className="urgent-modal-desc">
            {t('urgentPopupDesc')}
          </p>
        </div>

        {/* Urgent Jobs Grid */}
        <div className="urgent-jobs-grid">
          {urgentJobs.map((job) => {
            const titleEn = job.id === 'job-lg-1' ? 'Marketing Procurement Specialist' : job.id === 'job-lg-4' ? 'Customer Service Technician (SVC)' : 'Digital Marketing Specialist';
            const companyEn = 'LG Electronics Vietnam';
            const descEn = job.id === 'job-lg-1' 
              ? 'Responsible for centralized procurement, agency bidding, POSM sourcing, and media buying...'
              : job.id === 'job-lg-4'
              ? 'Perform installation, maintenance, and technical troubleshooting for LG appliances...'
              : 'Plan and execute digital marketing campaigns (Google Ads, Facebook, YouTube, TikTok)...';

            return (
              <div key={job.id} className="urgent-job-card">
                <div className="urgent-card-top">
                  <span className="card-urgent-tag">
                    {t('urgentBadge')}
                  </span>
                  <span className="urgent-job-location">
                    <MapPin size={13} /> {job.location}
                  </span>
                </div>

                <div className="urgent-card-body">
                  <div className="urgent-logo-title-row">
                    {job.logo && (
                      <img src={job.logo} alt={job.title} className="urgent-job-logo" />
                    )}
                    <div>
                      <h3 className="urgent-job-title">{lang === 'en' ? titleEn : job.title}</h3>
                      <p className="urgent-company-name">{lang === 'en' ? companyEn : job.company}</p>
                    </div>
                  </div>

                  <div className="urgent-salary-row">
                    <DollarSign size={15} className="salary-icon" />
                    <span className="urgent-salary-text">{job.salary}</span>
                    <span className="urgent-type-badge">{job.type}</span>
                  </div>

                  <p className="urgent-short-desc">
                    {lang === 'en' 
                      ? descEn 
                      : (job.description.length > 110 ? job.description.slice(0, 110) + '...' : job.description)
                    }
                  </p>
                </div>

                <div className="urgent-card-actions">
                  <button 
                    className="btn-urgent-detail"
                    onClick={() => {
                      handleClose();
                      onSelectJob(job);
                    }}
                  >
                    {t('btnViewDetails')}
                  </button>
                  <button 
                    className="btn-urgent-apply"
                    onClick={() => {
                      handleClose();
                      onApplyJob(job);
                    }}
                  >
                    {t('btnApplyNow')} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="urgent-modal-footer">
          <span className="urgent-footer-note">
            <Zap size={14} color="#A50034" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {t('urgentFooterNote')}
          </span>
          <button className="btn-dismiss-urgent" onClick={handleClose}>
            {t('btnDismissPopup')}
          </button>
        </div>
      </div>
    </div>
  );
}
