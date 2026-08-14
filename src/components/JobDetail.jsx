import React from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Tag, Briefcase, Calendar, ShieldCheck, Play, Tv, Snowflake, Droplets, Laptop, Heart } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

import svcTech1Img from '../assets/svc_tech_1.webp';
import svcTech2Img from '../assets/svc_tech_2.webp';
import svcTech3Img from '../assets/svc_tech_3.webp';
import svcTech4Img from '../assets/svc_tech_4.webp';
import lgTechnicianImg from '../assets/lg_technician.webp';
import lgTeamGroupImg from '../assets/lg_team_group.webp';
import defaultLogo from '../assets/procurement_icon.webp';

export default function JobDetail({ job, onBack, onApply }) {
  const { lang, t } = useLanguage();

  if (!job) return null;

  const title = lang === 'en' ? (job.titleEn || job.title) : job.title;
  const company = lang === 'en' ? (job.companyEn || job.company) : job.company;
  const location = lang === 'en' ? (job.locationEn || job.location) : job.location;
  const description = lang === 'en' ? (job.descriptionEn || job.description) : job.description;
  const requirements = lang === 'en' ? (job.requirementsEn || job.requirements) : job.requirements;
  const benefits = lang === 'en' ? (job.benefitsEn || job.benefits) : job.benefits;

  return (
    <div className="job-detail-container">
      {/* Decorative Side Banners on Left & Right Margins */}
      <div className="detail-side-banner frame-left">
        <img src={lgTechnicianImg} alt="LG Technician" />
        <div className="side-banner-caption">
          <span className="side-banner-tag">{lang === 'vi' ? 'Kỹ Thuật Viên LG' : 'LG Technicians'}</span>
          <p>{lang === 'vi' ? 'Đội ngũ Chuyên gia Đạt chuẩn Quốc tế' : 'World-Class Technical Experts'}</p>
        </div>
      </div>

      <div className="detail-side-banner frame-right">
        <img src={lgTeamGroupImg} alt="LG Team" />
        <div className="side-banner-caption">
          <span className="side-banner-tag">Life's Good</span>
          <p>{lang === 'vi' ? 'Môi trường Làm việc Chuyên nghiệp & Tận tâm' : 'Professional & Dedicated Work Culture'}</p>
        </div>
      </div>

      {/* Back Button */}
      <button className="btn-back-link" onClick={onBack}>
        <ArrowLeft size={16} />
        <span>{lang === 'vi' ? 'Quay lại danh sách việc làm' : 'Back to Job Listings'}</span>
      </button>

      <div className="detail-layout">
        {/* Main Details content */}
        <main className="detail-main-content">
          {/* Job Header Card */}
          <div className="job-detail-header-card">
            <div className="header-card-top">
              <img 
                src={job.logo || defaultLogo} 
                alt={company} 
                className="detail-company-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultLogo;
                }}
              />
              <div className="header-title-section">
                <h1 className="detail-job-title">{title}</h1>
                <h2 className="detail-company-name">{company}</h2>
                <div className="detail-quick-badges">
                  <span className="badge badge-type">{job.type}</span>
                  <span className="badge badge-level">{job.level}</span>
                  <span className="badge badge-industry">{job.industry}</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            {/* Quick Metrics Grid */}
            <div className="quick-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">{lang === 'vi' ? 'Mức lương' : 'Salary Range'}</span>
                <span className="metric-value highlight-orange">
                  <DollarSign size={18} /> {job.salary}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">{lang === 'vi' ? 'Địa điểm' : 'Location'}</span>
                <span className="metric-value">
                  <MapPin size={18} /> {location}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">{t('postedDate')}</span>
                <span className="metric-value">
                  <Calendar size={18} /> {job.postedAt}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">{lang === 'vi' ? 'Hình thức' : 'Employment Type'}</span>
                <span className="metric-value">
                  <Clock size={18} /> {job.type}
                </span>
              </div>
            </div>

            {/* Main Action Banner */}
            <div className="action-banner-row">
              <button className="btn-apply-main" onClick={() => onApply(job)}>
                {t('btnApplyNow')}
              </button>
              <div className="safety-badge">
                <ShieldCheck size={16} />
                <span>{lang === 'vi' ? 'Tin tuyển dụng đã xác thực' : 'Verified LG Official Job Post'}</span>
              </div>
            </div>
          </div>

          {/* Job Descriptions & Details */}
          <div className="job-content-card">
            <section className="content-section">
              <h3 className="section-title-underlined">{lang === 'vi' ? 'Mô tả công việc' : 'Job Description'}</h3>
              <p className="section-text-content">{description}</p>
            </section>

            <section className="content-section">
              <h3 className="section-title-underlined">{lang === 'vi' ? 'Yêu cầu công việc' : 'Job Requirements'}</h3>
              <div className="section-bullet-points">
                {requirements.split('\n').map((line, index) => (
                  <p key={index} className="bullet-point">{line}</p>
                ))}
              </div>
            </section>

            <section className="content-section">
              <h3 className="section-title-underlined">{lang === 'vi' ? 'Quyền lợi được hưởng' : 'Benefits & Perks'}</h3>
              <div className="section-bullet-points">
                {benefits.split('\n').map((line, index) => (
                  <p key={index} className="bullet-point">{line}</p>
                ))}
              </div>
            </section>

            {/* If this is the SVC Technician job, show a video gallery section */}
            {job.id === 'job-lg-4' && (
              <section className="content-section svc-videos-section" style={{ marginTop: '30px', borderTop: '1px dashed var(--border)', paddingTop: '24px' }}>
                <h3 className="section-title-underlined">{lang === 'vi' ? 'Hoạt động thực tế & Đào tạo SVC' : 'Field Operations & SVC Training'}</h3>
                <p className="section-text-content" style={{ marginBottom: '20px', color: '#a1a1aa', fontSize: '14px' }}>
                  {lang === 'vi'
                    ? 'Tìm hiểu các hoạt động chăm sóc khách hàng chuyên nghiệp, quy trình dịch vụ bảo dưỡng và sửa chữa thực tế của đội ngũ kỹ thuật viên qua các danh sách phát (playlist) từ kênh YouTube chính thức LG Vietnam:'
                    : 'Explore professional customer service operations and hands-on maintenance procedures from the official LG Vietnam YouTube playlists:'
                  }
                </p>
                <div className="svc-playlist-grid">
                  <a href="https://www.youtube.com/@LGVietnam/search?query=Best%20Care" target="_blank" rel="noopener noreferrer" className="svc-playlist-card">
                    <div className="playlist-thumb-box">
                      <img src={svcTech1Img} alt="LG Best Care" className="playlist-thumb-img" />
                      <div className="playlist-play-overlay">
                        <Play size={16} fill="#ffffff" />
                      </div>
                      <span className="playlist-badge">15 videos</span>
                    </div>
                    <div className="playlist-info">
                      <h4>LG Best Care - Dedicated Team</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> {lang === 'vi' ? 'Xem danh sách phát' : 'Watch Playlist'}</span>
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@LGVietnam/search?query=WashTower" target="_blank" rel="noopener noreferrer" className="svc-playlist-card">
                    <div className="playlist-thumb-box">
                      <img src={svcTech3Img} alt="LG WashTower" className="playlist-thumb-img" />
                      <div className="playlist-play-overlay">
                        <Play size={16} fill="#ffffff" />
                      </div>
                      <span className="playlist-badge">10 videos</span>
                    </div>
                    <div className="playlist-info">
                      <h4>LG Best Care - LG WashTower™</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> {lang === 'vi' ? 'Xem danh sách phát' : 'Watch Playlist'}</span>
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@LGVietnam/search?query=Styler" target="_blank" rel="noopener noreferrer" className="svc-playlist-card">
                    <div className="playlist-thumb-box">
                      <img src={svcTech4Img} alt="LG Styler" className="playlist-thumb-img" />
                      <div className="playlist-play-overlay">
                        <Play size={16} fill="#ffffff" />
                      </div>
                      <span className="playlist-badge">7 videos</span>
                    </div>
                    <div className="playlist-info">
                      <h4>LG Best Care - LG Styler™</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> {lang === 'vi' ? 'Xem danh sách phát' : 'Watch Playlist'}</span>
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@LGVietnam/search?query=TV" target="_blank" rel="noopener noreferrer" className="svc-playlist-card">
                    <div className="playlist-thumb-box">
                      <img src={svcTech1Img} alt="LG TV" className="playlist-thumb-img" />
                      <div className="playlist-play-overlay">
                        <Play size={16} fill="#ffffff" />
                      </div>
                      <span className="playlist-badge">6 videos</span>
                    </div>
                    <div className="playlist-info">
                      <h4>LG Best Care - Large Screen LG TV</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> {lang === 'vi' ? 'Xem danh sách phát' : 'Watch Playlist'}</span>
                    </div>
                  </a>
                </div>
              </section>
            )}
          </div>
        </main>

        {/* Sidebar Info */}
        <aside className="detail-sidebar">
          {/* Company Brief Card */}
          <div className="sidebar-card company-card">
            <h3 className="sidebar-card-title">{lang === 'vi' ? 'Thông tin công ty' : 'Company Profile'}</h3>
            <div className="sidebar-company-header">
              <img 
                src={job.logo || defaultLogo} 
                alt={company} 
                className="sidebar-company-logo"
              />
              <div>
                <h4>{company}</h4>
                <p className="company-size">{lang === 'vi' ? 'Quy mô: 1,000 - 5,000 nhân viên' : 'Size: 1,000 - 5,000 Employees'}</p>
              </div>
            </div>
            <p className="company-brief-desc">
              {lang === 'vi' 
                ? 'Là tập đoàn công nghệ hàng đầu thế giới, LG Electronics cam kết mang lại cuộc sống tốt đẹp hơn cho người tiêu dùng và tạo dựng môi trường làm việc sáng tạo, chuyên nghiệp cho mọi tài năng.'
                : 'A global technology leader, LG Electronics is committed to enriching lives and creating an innovative, empowering work environment for top talent.'
              }
            </p>
            <div className="company-details-list">
              <div className="company-detail-item">
                <strong>{lang === 'vi' ? 'Lĩnh vực:' : 'Industry:'}</strong> <span>{job.industry}</span>
              </div>
              <div className="company-detail-item">
                <strong>{lang === 'vi' ? 'Địa chỉ:' : 'Headquarters:'}</strong> <span>Ho Chi Minh City / Hanoi, Vietnam</span>
              </div>
            </div>
          </div>

          {/* Hiring Policy Card */}
          <div className="sidebar-card policy-card">
            <h3 className="sidebar-card-title">{lang === 'vi' ? 'Quy trình tuyển dụng' : 'Recruitment Process'}</h3>
            <ol className="recruitment-steps">
              <li>
                <div className="step-num">1</div>
                <div className="step-info">
                  <strong>{lang === 'vi' ? 'Nộp hồ sơ trực tuyến' : 'Online Application'}</strong>
                  <p>{lang === 'vi' ? 'Ứng viên nộp CV và thông tin qua cổng tuyển dụng.' : 'Submit your resume via the LG Careers portal.'}</p>
                </div>
              </li>
              <li>
                <div className="step-num">2</div>
                <div className="step-info">
                  <strong>{lang === 'vi' ? 'Sàng lọc hồ sơ (HR Audit)' : 'Resume Screening'}</strong>
                  <p>{lang === 'vi' ? 'Chuyên viên Nhân sự LG trực tiếp đánh giá hồ sơ.' : '100% evaluated by LG HR Talent Acquisition team.'}</p>
                </div>
              </li>
              <li>
                <div className="step-num">3</div>
                <div className="step-info">
                  <strong>{lang === 'vi' ? 'Phỏng vấn chuyên môn' : 'Technical Interview'}</strong>
                  <p>{lang === 'vi' ? 'Phỏng vấn trực tiếp hoặc online cùng Trưởng bộ phận.' : 'In-depth interview with Department Manager.'}</p>
                </div>
              </li>
              <li>
                <div className="step-num">4</div>
                <div className="step-info">
                  <strong>{lang === 'vi' ? 'Thư mời nhận việc (Offer)' : 'Official Job Offer'}</strong>
                  <p>{lang === 'vi' ? 'Gửi offer chính thức và đón chào nhân sự mới.' : 'Formal offer letter & onboarding welcome.'}</p>
                </div>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
