import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, ShieldCheck, UserCheck } from 'lucide-react';
import { isValidEmail, isValidPhone, sanitizeFileName } from '../utils/security';
import { useLanguage } from '../LanguageContext';

export default function ApplyModal({ job, onClose, onSubmitApplication }) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cvFile: null,
    cvFileName: '',
    coverLetter: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSubmitting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(ext)) {
        setErrors(prev => ({ ...prev, cvFile: lang === 'vi' ? 'Chỉ chấp nhận định dạng tệp .pdf, .doc hoặc .docx.' : 'Only .pdf, .doc, or .docx file formats are allowed.' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: lang === 'vi' ? 'Tệp CV vượt quá dung lượng tối đa 5MB.' : 'CV file size exceeds maximum limit of 5MB.' }));
        return;
      }
      if (file.size < 1024) {
        setErrors(prev => ({ ...prev, cvFile: lang === 'vi' ? 'Tệp CV không hợp lệ (dung lượng quá nhỏ).' : 'Invalid CV file (file size too small).' }));
        return;
      }

      const safeName = sanitizeFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          cvFile: file,
          cvFileName: safeName,
          cvBase64: reader.result
        }));
      };
      reader.readAsDataURL(file);

      if (errors.cvFile) {
        setErrors(prev => ({ ...prev, cvFile: null }));
      }
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = lang === 'vi' ? 'Vui lòng nhập họ và tên của bạn.' : 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = lang === 'vi' ? 'Họ và tên phải có ít nhất 2 ký tự.' : 'Full name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      tempErrors.email = lang === 'vi' ? 'Vui lòng nhập địa chỉ email.' : 'Please enter your email address.';
    } else if (!isValidEmail(formData.email)) {
      tempErrors.email = lang === 'vi' ? 'Địa chỉ email không đúng định dạng.' : 'Invalid email address format.';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = lang === 'vi' ? 'Vui lòng nhập số điện thoại liên hệ.' : 'Please enter your phone number.';
    } else if (!isValidPhone(formData.phone)) {
      tempErrors.phone = lang === 'vi' ? 'Số điện thoại không hợp lệ (10-11 chữ số).' : 'Invalid phone number (10-11 digits).';
    }

    if (!formData.cvFileName) {
      tempErrors.cvFile = lang === 'vi' ? 'Vui lòng đính kèm hồ sơ CV cá nhân.' : 'Please upload your CV file.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const now = new Date();
      const applicationData = {
        id: 'app-lg-' + Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        candidateName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        cvFileName: formData.cvFileName,
        cvBase64: formData.cvBase64,
        coverLetter: formData.coverLetter.trim(),
        appliedAt: now.toISOString().split('T')[0],
        appliedTimestamp: now.toISOString(),
        status: 'Pending',
        source: 'LG Careers Portal',
        humanAuditGuaranteed: true,
        atsId: `ATS-LG-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      };

      onSubmitApplication(applicationData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.classList.contains('modal-overlay') && !isSubmitting) onClose(); }}>
      <div className="modal-content animate-zoom-in">
        <button className="modal-close-btn" onClick={onClose} aria-label={t('btnCloseWindow')}>
          <X size={20} />
        </button>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">{t('applyModalTitle')}</h2>
              <p className="modal-subtitle">
                {t('applyForPosition')}: <strong className="highlight-blue">{job.title}</strong> {t('atCompany')} <strong className="company-tag">{job.company}</strong>
              </p>
            </div>

            {/* Human-in-the-loop AI Screening Guarantee Badge */}
            <div className="human-screening-guarantee-box">
              <div className="guarantee-icon-wrap">
                <UserCheck size={18} />
              </div>
              <div className="guarantee-text-content">
                <strong>{t('humanGuaranteeTitle')}</strong>
                <p>
                  {t('humanGuaranteeDesc')}
                </p>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label required">{t('fullNameLabel')}</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder={t('fullNamePlaceholder')}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <span className="error-message"><AlertCircle size={14} />{errors.name}</span>}
              </div>

              {/* Contact Grid */}
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label required">{t('emailLabel')}</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && <span className="error-message"><AlertCircle size={14} />{errors.email}</span>}
                </div>

                <div className="form-group flex-1">
                  <label className="form-label required">{t('phoneLabel')}</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="0901234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && <span className="error-message"><AlertCircle size={14} />{errors.phone}</span>}
                </div>
              </div>

              {/* CV File Upload */}
              <div className="form-group">
                <label className="form-label required">{t('cvUploadLabel')}</label>
                <div className={`cv-upload-area ${errors.cvFile ? 'upload-error' : ''} ${formData.cvFileName ? 'has-file' : ''}`}>
                  <input 
                    type="file" 
                    id="cvFile"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="file-hidden-input"
                  />
                  <label htmlFor="cvFile" className="cv-upload-label">
                    <Upload size={24} className="upload-icon" />
                    {formData.cvFileName ? (
                      <div className="uploaded-file-info">
                        <span className="file-name">{formData.cvFileName}</span>
                        <span className="upload-tip">{lang === 'vi' ? 'Nhấp để thay đổi hồ sơ CV khác' : 'Click to change file'}</span>
                      </div>
                    ) : (
                      <div className="upload-prompt">
                        <span className="bold-prompt">{t('cvUploadPrompt')}</span>
                        <span className="format-prompt">{t('cvUploadFormatTip')}</span>
                      </div>
                    )}
                  </label>
                </div>
                {errors.cvFile && <span className="error-message"><AlertCircle size={14} />{errors.cvFile}</span>}
              </div>

              {/* Cover Letter */}
              <div className="form-group">
                <label className="form-label">{t('coverLetterLabel')}</label>
                <textarea 
                  name="coverLetter"
                  rows={4}
                  placeholder={t('coverLetterPlaceholder')}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="form-textarea"
                />
              </div>

              {/* Action Buttons */}
              <div className="modal-actions-row">
                <button type="button" className="btn-cancel-modal" onClick={onClose} disabled={isSubmitting}>
                  {t('btnCancel')}
                </button>
                <button type="submit" className="btn-submit-modal" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="loader-text">
                      <span className="mini-spinner"></span> {t('submittingCV')}
                    </span>
                  ) : t('btnSubmitCV')}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="apply-success-view">
            <CheckCircle2 size={64} className="success-icon-animated" />
            <h2 className="success-title">{t('applySuccessTitle')}</h2>
            <p className="success-message">
              {t('applySuccessMessage')}
            </p>
            <p className="success-subtext">
              <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: '#A50034' }} />
              {lang === 'vi' ? 'Bộ phận Nhân sự LG sẽ liên hệ trực tiếp với bạn qua Email hoặc Số điện thoại trong thời gian sớm nhất.' : 'LG Talent Acquisition Team will contact you via Email or Phone shortly.'}
            </p>
            <button className="btn-close-success" onClick={onClose}>
              {t('btnCloseWindow')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
