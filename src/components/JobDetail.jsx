import React from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Tag, Briefcase, Calendar, ShieldCheck, Play, Tv, Snowflake, Droplets, Laptop, Heart } from 'lucide-react';

import svcTech1Img from '../assets/svc_tech_1.webp';
import svcTech2Img from '../assets/svc_tech_2.webp';
import svcTech3Img from '../assets/svc_tech_3.webp';
import svcTech4Img from '../assets/svc_tech_4.webp';
import lgTechnicianImg from '../assets/lg_technician.webp';
import lgTeamGroupImg from '../assets/lg_team_group.webp';
import defaultLogo from '../assets/procurement_icon.webp';

export default function JobDetail({ job, onBack, onApply }) {
  if (!job) return null;

  return (
    <div className="job-detail-container">
      {/* Decorative Side Banners on Left & Right Margins */}
      <div className="detail-side-banner frame-left">
        <img src={lgTechnicianImg} alt="Kỹ thuật viên LG" />
        <div className="side-banner-caption">
          <span className="side-banner-tag">Kỹ Thuật Viên LG</span>
          <p>Đội ngũ Chuyên gia Đạt chuẩn Quốc tế</p>
        </div>
      </div>

      <div className="detail-side-banner frame-right">
        <img src={lgTeamGroupImg} alt="Đội ngũ Dịch vụ LG" />
        <div className="side-banner-caption">
          <span className="side-banner-tag">Life's Good</span>
          <p>Môi trường Làm việc Chuyên nghiệp & Tận tâm</p>
        </div>
      </div>

      {/* Back Button */}
      <button className="btn-back-link" onClick={onBack}>
        <ArrowLeft size={16} />
        <span>Quay lại danh sách việc làm</span>
      </button>

      <div className="detail-layout">
        {/* Main Details content */}
        <main className="detail-main-content">
          {/* Job Header Card */}
          <div className="job-detail-header-card">
            <div className="header-card-top">
              <img 
                src={job.logo || defaultLogo} 
                alt={job.company} 
                className="detail-company-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultLogo;
                }}
              />
              <div className="header-title-section">
                <h1 className="detail-job-title">{job.title}</h1>
                <h2 className="detail-company-name">{job.company}</h2>
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
                <span className="metric-label">Mức lương</span>
                <span className="metric-value highlight-orange">
                  <DollarSign size={18} /> {job.salary}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Địa điểm</span>
                <span className="metric-value">
                  <MapPin size={18} /> {job.location}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Ngày đăng</span>
                <span className="metric-value">
                  <Calendar size={18} /> {job.postedAt}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Hình thức</span>
                <span className="metric-value">
                  <Clock size={18} /> {job.type}
                </span>
              </div>
            </div>

            {/* Main Action Banner */}
            <div className="action-banner-row">
              <button className="btn-apply-main" onClick={() => onApply(job)}>
                Ứng tuyển ngay
              </button>
              <div className="safety-badge">
                <ShieldCheck size={16} />
                <span>Tin tuyển dụng đã xác thực</span>
              </div>
            </div>
          </div>

          {/* Job Descriptions & Details */}
          <div className="job-content-card">
            <section className="content-section">
              <h3 className="section-title-underlined">Mô tả công việc</h3>
              <p className="section-text-content">{job.description}</p>
            </section>

            <section className="content-section">
              <h3 className="section-title-underlined">Yêu cầu công việc</h3>
              <div className="section-bullet-points">
                {job.requirements.split('\n').map((line, index) => (
                  <p key={index} className="bullet-point">{line}</p>
                ))}
              </div>
            </section>

            <section className="content-section">
              <h3 className="section-title-underlined">Quyền lợi được hưởng</h3>
              <div className="section-bullet-points">
                {job.benefits.split('\n').map((line, index) => (
                  <p key={index} className="bullet-point">{line}</p>
                ))}
              </div>
            </section>

            {/* If this is the SVC Technician job, show a video gallery section */}
            {job.id === 'job-lg-4' && (
              <section className="content-section svc-videos-section" style={{ marginTop: '30px', borderTop: '1px dashed var(--border)', paddingTop: '24px' }}>
                <h3 className="section-title-underlined">Hoạt động thực tế & Đào tạo SVC</h3>
                <p className="section-text-content" style={{ marginBottom: '20px', color: '#a1a1aa', fontSize: '14px' }}>
                  Tìm hiểu các hoạt động chăm sóc khách hàng chuyên nghiệp, quy trình dịch vụ bảo dưỡng và sửa chữa thực tế của đội ngũ kỹ thuật viên qua các danh sách phát (playlist) từ kênh YouTube chính thức <strong>LG Vietnam</strong>:
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
                      <h4>LG Best Care - Đội ngũ tận tâm</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> Xem danh sách phát</span>
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
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> Xem danh sách phát</span>
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
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> Xem danh sách phát</span>
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
                      <h4>LG Best Care - TV LG màn hình lớn</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> Xem danh sách phát</span>
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@LGVietnam/search?query=T%E1%BB%A7%20l%E1%BA%A1nh" target="_blank" rel="noopener noreferrer" className="svc-playlist-card">
                    <div className="playlist-thumb-box">
                      <img src={svcTech2Img} alt="LG Refrigerator" className="playlist-thumb-img" />
                      <div className="playlist-play-overlay">
                        <Play size={16} fill="#ffffff" />
                      </div>
                      <span className="playlist-badge">9 videos</span>
                    </div>
                    <div className="playlist-info">
                      <h4>LG Best Care - Tủ lạnh LG cao cấp</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> Xem danh sách phát</span>
                    </div>
                  </a>
                  <a href="https://www.youtube.com/@LGVietnam/search?query=M%C3%A1y%20r%E1%BB%A1%20b%C3%A1t" target="_blank" rel="noopener noreferrer" className="svc-playlist-card">
                    <div className="playlist-thumb-box">
                      <img src={svcTech4Img} alt="LG Dishwasher" className="playlist-thumb-img" />
                      <div className="playlist-play-overlay">
                        <Play size={16} fill="#ffffff" />
                      </div>
                      <span className="playlist-badge">4 videos</span>
                    </div>
                    <div className="playlist-info">
                      <h4>LG Best Care - Máy rửa bát QuadWash™</h4>
                      <span className="btn-play-link"><Play size={11} style={{ marginRight: '4px' }} /> Xem danh sách phát</span>
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
            <h3 className="sidebar-card-title">Thông tin công ty</h3>
            <div className="sidebar-company-header">
              <img 
                src={job.logo || defaultLogo} 
                alt={job.company} 
                className="sidebar-company-logo"
              />
              <div>
                <h4>{job.company}</h4>
                <p className="company-size">Quy mô: 100 - 500 nhân viên</p>
              </div>
            </div>
            <p className="company-brief-desc">
              Là một trong những doanh nghiệp đi đầu trong lĩnh vực kinh doanh của mình, cam kết mang đến giá trị và dịch vụ tốt nhất cùng môi trường phát triển tài năng chuyên nghiệp cho nhân sự.
            </p>
            <div className="company-details-list">
              <div className="company-detail-item">
                <strong>Lĩnh vực:</strong> <span>{job.industry}</span>
              </div>
              <div className="company-detail-item">
                <strong>Địa chỉ:</strong> <span>Quận 1, TP. Hồ Chí Minh / Cầu Giấy, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* Hiring Policy Card */}
          <div className="sidebar-card policy-card">
            <h3 className="sidebar-card-title">Quy trình tuyển dụng</h3>
            <ol className="recruitment-steps">
              <li>
                <div className="step-num">1</div>
                <div className="step-info">
                  <strong>Nộp hồ sơ trực tuyến</strong>
                  <p>Ứng viên nộp CV và thư xin việc thông qua hệ thống.</p>
                </div>
              </li>
              <li>
                <div className="step-num">2</div>
                <div className="step-info">
                  <strong>Sàng lọc hồ sơ</strong>
                  <p>Bộ phận tuyển dụng đánh giá năng lực phù hợp của CV.</p>
                </div>
              </li>
              <li>
                <div className="step-num">3</div>
                <div className="step-info">
                  <strong>Phỏng vấn chuyên môn</strong>
                  <p>Phỏng vấn trực tiếp hoặc online cùng Trưởng bộ phận.</p>
                </div>
              </li>
              <li>
                <div className="step-num">4</div>
                <div className="step-info">
                  <strong>Thư mời nhận việc</strong>
                  <p>Gửi offer chính thức và hoàn tất thủ tục nhận việc.</p>
                </div>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
