import React, { useState, useEffect } from 'react';
import { Flame, X, MapPin, DollarSign, ArrowRight, Zap, ShieldAlert, Award } from 'lucide-react';

export default function UrgentHiringPopup({ jobs, onSelectJob, onApplyJob }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already closed in this session
    const hasSeenPopup = sessionStorage.getItem('lg_careers_urgent_popup_seen');
    if (!hasSeenPopup) {
      // Auto open popup after 1.2s delay for a dramatic WOW impression
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Keyboard accessibility: ESC key dismisses popup
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

  // Filter urgent hiring jobs (or pick top featured positions)
  const urgentJobs = jobs.filter(j => 
    j.id === 'job-lg-1' || j.id === 'job-lg-4' || j.id === 'job-lg-2'
  ).slice(0, 3);

  return (
    <div className="modal-overlay urgent-popup-overlay" onClick={handleClose}>
      <div className="modal-content urgent-hiring-modal animate-zoom-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn urgent-close-btn" onClick={handleClose} aria-label="Đóng thông báo">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="urgent-modal-header">
          <div className="urgent-badge-pill">
            <Flame size={16} fill="#ffffff" className="flame-icon-pulse" />
            <span>THÔNG BÁO TUYỂN DỤNG GẤP 2026</span>
          </div>
          <h2 className="urgent-modal-title">
            CƠ HỘI NGHỀ NGHIỆP HOT TẠI LG ELECTRONICS
          </h2>
          <p className="urgent-modal-desc">
            Tập đoàn LG đang mở đợt tuyển dụng gấp các vị trí then chốt với mức thu nhập hấp dẫn và chế độ đãi ngộ hàng đầu Việt Nam!
          </p>
        </div>

        {/* Urgent Jobs Grid */}
        <div className="urgent-jobs-grid">
          {urgentJobs.map((job) => (
            <div key={job.id} className="urgent-job-card">
              <div className="urgent-card-top">
                <span className="card-urgent-tag">
                  🔥 TUYỂN GẤP
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
                    <h3 className="urgent-job-title">{job.title}</h3>
                    <p className="urgent-company-name">{job.company}</p>
                  </div>
                </div>

                <div className="urgent-salary-row">
                  <DollarSign size={15} className="salary-icon" />
                  <span className="urgent-salary-text">{job.salary}</span>
                  <span className="urgent-type-badge">{job.type}</span>
                </div>

                <p className="urgent-short-desc">
                  {job.description.length > 110 ? job.description.slice(0, 110) + '...' : job.description}
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
                  Xem chi tiết
                </button>
                <button 
                  className="btn-urgent-apply"
                  onClick={() => {
                    handleClose();
                    onApplyJob(job);
                  }}
                >
                  Ứng tuyển ngay <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="urgent-modal-footer">
          <span className="urgent-footer-note">
            <Zap size={14} color="#A50034" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            Ứng tuyển ngay hôm nay để nhận phản hồi kết quả hồ sơ trong vòng 48 giờ từ HR LG Electronics!
          </span>
          <button className="btn-dismiss-urgent" onClick={handleClose}>
            Bỏ qua & Xem trang tuyển dụng
          </button>
        </div>
      </div>
    </div>
  );
}
