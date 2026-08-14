import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, ShieldCheck, UserCheck } from 'lucide-react';
import { isValidEmail, isValidPhone, sanitizeFileName } from '../utils/security';

export default function ApplyModal({ job, onClose, onSubmitApplication }) {
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

  // Keyboard accessibility: ESC key dismisses modal
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
      // Validate file extension
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'doc', 'docx'].includes(ext)) {
        setErrors(prev => ({ ...prev, cvFile: 'Chỉ chấp nhận định dạng tệp .pdf, .doc hoặc .docx.' }));
        return;
      }
      // Validate file size (Min 1KB, Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: 'Tệp CV vượt quá dung lượng tối đa 5MB.' }));
        return;
      }
      if (file.size < 1024) {
        setErrors(prev => ({ ...prev, cvFile: 'Tệp CV không hợp lệ (dung lượng quá nhỏ).' }));
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
      tempErrors.name = 'Vui lòng nhập họ và tên của bạn.';
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Họ và tên phải có ít nhất 2 ký tự.';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Vui lòng nhập địa chỉ email.';
    } else if (!isValidEmail(formData.email)) {
      tempErrors.email = 'Địa chỉ email không đúng định dạng (ví dụ: name@domain.com).';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Vui lòng nhập số điện thoại liên hệ.';
    } else if (!isValidPhone(formData.phone)) {
      tempErrors.phone = 'Số điện thoại không hợp lệ (gồm 10-11 chữ số Việt Nam).';
    }

    if (!formData.cvFileName) {
      tempErrors.cvFile = 'Vui lòng đính kèm hồ sơ CV cá nhân (.pdf, .doc, .docx).';
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
        // ATS Engine Data Schema Fields
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
        {/* Modal Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Đóng cửa sổ">
          <X size={20} />
        </button>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Ứng Tuyển Cơ Hội Nghề Nghiệp</h2>
              <p className="modal-subtitle">
                Vị trí: <strong className="highlight-blue">{job.title}</strong> tại <strong className="company-tag">{job.company}</strong>
              </p>
            </div>

            {/* Human-in-the-loop AI Screening Guarantee Badge */}
            <div className="human-screening-guarantee-box">
              <div className="guarantee-icon-wrap">
                <UserCheck size={18} />
              </div>
              <div className="guarantee-text-content">
                <strong>Cam kết Thẩm định Con người 100% (Human-In-The-Loop)</strong>
                <p>
                  100% CV của bạn được trực tiếp xem xét bởi Đội ngũ Chuyên viên Nhân sự LG Electronics. Chúng tôi không sử dụng thuật toán AI tự động loại bỏ hồ sơ.
                </p>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label required">Họ và tên</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Nhập đầy đủ họ và tên theo giấy tờ"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <span className="error-message"><AlertCircle size={14} />{errors.name}</span>}
              </div>

              {/* Contact Grid */}
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label required">Địa chỉ email</label>
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
                  <label className="form-label required">Số điện thoại</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Ví dụ: 0901234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && <span className="error-message"><AlertCircle size={14} />{errors.phone}</span>}
                </div>
              </div>

              {/* CV File Upload */}
              <div className="form-group">
                <label className="form-label required">Hồ sơ CV cá nhân</label>
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
                        <span className="upload-tip">Nhấp để thay đổi hồ sơ CV khác</span>
                      </div>
                    ) : (
                      <div className="upload-prompt">
                        <span className="bold-prompt">Tải CV lên từ thiết bị của bạn</span>
                        <span className="format-prompt">Hỗ trợ định dạng .pdf, .doc, .docx (Dung lượng 1KB - 5MB)</span>
                      </div>
                    )}
                  </label>
                </div>
                {errors.cvFile && <span className="error-message"><AlertCircle size={14} />{errors.cvFile}</span>}
              </div>

              {/* Cover Letter */}
              <div className="form-group">
                <label className="form-label">Thư giới thiệu (Không bắt buộc)</label>
                <textarea 
                  name="coverLetter"
                  rows={4}
                  placeholder="Chia sẻ thêm về mục tiêu nghề nghiệp, dự án tiêu biểu hoặc lý do bạn mong muốn gia nhập LG..."
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="form-textarea"
                />
              </div>

              {/* Action Buttons */}
              <div className="modal-actions-row">
                <button type="button" className="btn-cancel-modal" onClick={onClose} disabled={isSubmitting}>
                  Huỷ bỏ
                </button>
                <button type="submit" className="btn-submit-modal" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="loader-text">
                      <span className="mini-spinner"></span> Đang nộp hồ sơ...
                    </span>
                  ) : 'Nộp CV Ứng Tuyển'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="apply-success-view">
            <CheckCircle2 size={64} className="success-icon-animated" />
            <h2 className="success-title">Nộp hồ sơ thành công!</h2>
            <p className="success-message">
              Hồ sơ ứng tuyển của bạn cho vị trí <strong>{job.title}</strong> đã được lưu trữ thành công trên hệ thống tuyển dụng của <strong>{job.company}</strong>.
            </p>
            <p className="success-subtext">
              <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: '#A50034' }} />
              Bộ phận Nhân sự LG sẽ liên hệ trực tiếp với bạn qua Email hoặc Số điện thoại trong thời gian sớm nhất.
            </p>
            <button className="btn-close-success" onClick={onClose}>
              Đóng cửa sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
