import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for that field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: 'Tệp CV không được vượt quá 5MB.' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          cvFile: file,
          cvFileName: file.name,
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
    if (!formData.name.trim()) tempErrors.name = 'Vui lòng nhập họ và tên.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Vui lòng nhập địa chỉ email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ.';
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Vui lòng nhập số điện thoại.';
    } else if (!/^[0-9+()#.\s-]{8,15}$/.test(formData.phone)) {
      tempErrors.phone = 'Số điện thoại không hợp lệ.';
    }
    
    if (!formData.cvFileName) {
      tempErrors.cvFile = 'Vui lòng đính kèm hồ sơ CV của bạn.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      const applicationData = {
        id: 'app-' + Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        candidateName: formData.name,
        email: formData.email,
        phone: formData.phone,
        cvFileName: formData.cvFileName,
        cvBase64: formData.cvBase64,
        coverLetter: formData.coverLetter,
        appliedAt: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };

      onSubmitApplication(applicationData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Ứng Tuyển Công Việc</h2>
              <p className="modal-subtitle">
                Ứng tuyển cho vị trí: <strong className="highlight-blue">{job.title}</strong> tại <strong className="company-tag">{job.company}</strong>
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label required">Họ và tên</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Nhập đầy đủ họ tên của bạn"
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
                        <span className="upload-tip">Nhấp để thay đổi hồ sơ khác</span>
                      </div>
                    ) : (
                      <div className="upload-prompt">
                        <span className="bold-prompt">Tải CV lên từ máy tính của bạn</span>
                        <span className="format-prompt">Hỗ trợ định dạng .pdf, .doc, .docx (Dung lượng tối đa 5MB)</span>
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
                  placeholder="Giới thiệu thêm về kinh nghiệm làm việc và lý do bạn ứng tuyển vào vị trí này..."
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
              Hồ sơ ứng tuyển của bạn cho vị trí <strong>{job.title}</strong> đã được gửi thành công đến nhà tuyển dụng của <strong>{job.company}</strong>.
            </p>
            <p className="success-subtext">Nhà tuyển dụng sẽ xem xét CV và liên hệ trực tiếp với bạn qua email hoặc số điện thoại đã cung cấp nếu phù hợp.</p>
            <button className="btn-close-success" onClick={onClose}>
              Đóng cửa sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
