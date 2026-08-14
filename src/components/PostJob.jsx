import React, { useState } from 'react';
import { PlusCircle, FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import defaultLgLogo from '../assets/procurement_icon.webp';

export default function PostJob({ onAddJob, onBackToDashboard }) {
  const [formData, setFormData] = useState({
    title: '',
    company: 'LG Electronics Việt Nam',
    location: 'TP. Hồ Chí Minh',
    salary: '',
    type: 'Full-time',
    level: 'Junior',
    industry: 'Marketing / PR',
    description: '',
    requirements: '',
    benefits: '',
    logoUrl: defaultLgLogo
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locations = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Remote'];
  const types = ['Full-time', 'Part-time', 'Remote', 'Contract'];
  const levels = ['Intern', 'Junior', 'Middle', 'Senior', 'Manager'];
  const industries = [
    'IT - Software',
    'Marketing / PR',
    'Sales / Business Development',
    'Design / Art',
    'Customer Service',
    'Warranty Technician'
  ];

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

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = 'Vui lòng nhập tiêu đề công việc.';
    if (!formData.company.trim()) tempErrors.company = 'Vui lòng nhập tên công ty.';
    if (!formData.salary.trim()) tempErrors.salary = 'Vui lòng nhập mức lương (Ví dụ: 1,500 - 2,500 USD hoặc Thoả thuận).';
    if (!formData.description.trim()) tempErrors.description = 'Vui lòng điền mô tả công việc.';
    if (!formData.requirements.trim()) tempErrors.requirements = 'Vui lòng điền yêu cầu ứng viên.';
    if (!formData.benefits.trim()) tempErrors.benefits = 'Vui lòng điền quyền lợi công việc.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const defaultLogo = formData.logoUrl.trim() || defaultLgLogo;

    setTimeout(() => {
      const newJob = {
        id: 'job-' + Date.now(),
        title: formData.title,
        company: formData.company,
        logo: defaultLogo,
        location: formData.location,
        salary: formData.salary,
        type: formData.type,
        level: formData.level,
        industry: formData.industry,
        description: formData.description,
        requirements: formData.requirements,
        benefits: formData.benefits,
        postedAt: new Date().toISOString().split('T')[0]
      };

      onAddJob(newJob);
      setIsSubmitting(false);
      onBackToDashboard();
    }, 1000);
  };

  return (
    <div className="post-job-container">
      {/* Back link */}
      <button className="btn-back-link" onClick={onBackToDashboard}>
        <ArrowLeft size={16} />
        <span>Quay lại Bảng điều khiển</span>
      </button>

      <div className="post-job-card">
        <div className="post-job-header">
          <PlusCircle size={28} className="header-icon-orange" />
          <div>
            <h1 className="post-job-title">Đăng Tin Tuyển Dụng Mới</h1>
            <p className="post-job-subtitle">Tiếp cận hàng triệu ứng viên tiềm năng trên hệ thống tuyển dụng LG Careers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="post-job-form">
          <h3 className="form-section-title"><FileText size={18} /> Thông tin chung</h3>
          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label required">Tiêu đề tin tuyển dụng</label>
              <input 
                type="text" 
                name="title"
                placeholder="Ví dụ: Senior React Developer, Digital Marketing Manager..."
                value={formData.title}
                onChange={handleInputChange}
                className={`form-input ${errors.title ? 'input-error' : ''}`}
              />
              {errors.title && <span className="error-message"><AlertCircle size={14} />{errors.title}</span>}
            </div>

            <div className="form-group flex-1">
              <label className="form-label required">Tên công ty tuyển dụng</label>
              <input 
                type="text" 
                name="company"
                placeholder="Tên đầy đủ của công ty tuyển dụng"
                value={formData.company}
                onChange={handleInputChange}
                className={`form-input ${errors.company ? 'input-error' : ''}`}
              />
              {errors.company && <span className="error-message"><AlertCircle size={14} />{errors.company}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Link ảnh Logo công ty (Không bắt buộc)</label>
              <input 
                type="text" 
                name="logoUrl"
                placeholder="https://example.com/logo.png"
                value={formData.logoUrl}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group flex-1">
              <label className="form-label required">Mức lương tuyển dụng</label>
              <input 
                type="text" 
                name="salary"
                placeholder="Ví dụ: 1,500 - 2,500 USD, 30.000.000 VNĐ, hoặc Thỏa thuận"
                value={formData.salary}
                onChange={handleInputChange}
                className={`form-input ${errors.salary ? 'input-error' : ''}`}
              />
              {errors.salary && <span className="error-message"><AlertCircle size={14} />{errors.salary}</span>}
            </div>
          </div>

          <div className="form-row flex-wrap">
            <div className="form-group min-w-200">
              <label className="form-label required">Địa điểm làm việc</label>
              <select name="location" value={formData.location} onChange={handleInputChange} className="form-select">
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="form-group min-w-200">
              <label className="form-label required">Hình thức làm việc</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="form-select">
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group min-w-200">
              <label className="form-label required">Cấp bậc công việc</label>
              <select name="level" value={formData.level} onChange={handleInputChange} className="form-select">
                {levels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="form-group min-w-200">
              <label className="form-label required">Nhóm ngành nghề</label>
              <select name="industry" value={formData.industry} onChange={handleInputChange} className="form-select">
                {industries.map(ind => (
                  <option key={ind} value={ind}>
                    {ind === 'IT - Software' ? 'R&D / Công nghệ' :
                     ind === 'Marketing / PR' ? 'Marketing / PR' :
                     ind === 'Sales / Business Development' ? 'Kinh doanh / Sales' :
                     ind === 'Design / Art' ? 'Thiết kế / Art' :
                     ind === 'Customer Service' ? 'Hỗ trợ khách hàng' :
                     ind === 'Warranty Technician' ? 'Kỹ thuật viên bảo hành' : ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="form-section-title"><FileText size={18} /> Nội dung chi tiết tuyển dụng</h3>
          
          <div className="form-group">
            <label className="form-label required">Mô tả công việc</label>
            <textarea 
              name="description"
              rows={5}
              placeholder="Mô tả tóm tắt các công việc chính cần thực hiện, vai trò trách nhiệm của ứng viên..."
              value={formData.description}
              onChange={handleInputChange}
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
            />
            {errors.description && <span className="error-message"><AlertCircle size={14} />{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="form-label required">Yêu cầu công việc (Xuống dòng cho mỗi ý)</label>
            <textarea 
              name="requirements"
              rows={5}
              placeholder="Yêu cầu về số năm kinh nghiệm, học vấn, công cụ làm việc, kỹ năng mềm...&#10;• Có 3 năm kinh nghiệm lập trình React.&#10;• Khả năng làm việc nhóm tốt."
              value={formData.requirements}
              onChange={handleInputChange}
              className={`form-textarea ${errors.requirements ? 'input-error' : ''}`}
            />
            {errors.requirements && <span className="error-message"><AlertCircle size={14} />{errors.requirements}</span>}
          </div>

          <div className="form-group">
            <label className="form-label required">Quyền lợi và chế độ đãi ngộ (Xuống dòng cho mỗi ý)</label>
            <textarea 
              name="benefits"
              rows={5}
              placeholder="Chế độ lương thưởng, bảo hiểm, đào tạo, môi trường làm việc, nghỉ dưỡng...&#10;• Đóng bảo hiểm xã hội đầy đủ.&#10;• Lương tháng 13 + thưởng tết."
              value={formData.benefits}
              onChange={handleInputChange}
              className={`form-textarea ${errors.benefits ? 'input-error' : ''}`}
            />
            {errors.benefits && <span className="error-message"><AlertCircle size={14} />{errors.benefits}</span>}
          </div>

          <div className="post-actions-row">
            <button type="button" className="btn-cancel-post" onClick={onBackToDashboard} disabled={isSubmitting}>
              Huỷ đăng tuyển
            </button>
            <button type="submit" className="btn-submit-post" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="loader-text">
                  <span className="mini-spinner"></span> Đang xử lý đăng bài...
                </span>
              ) : 'Đăng Tin Ngay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
