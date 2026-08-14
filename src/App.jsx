import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobBoard from './components/JobBoard';
import JobDetail from './components/JobDetail';
import ApplyModal from './components/ApplyModal';
import PostJob from './components/PostJob';
import EmployerDashboard from './components/EmployerDashboard';
import UrgentHiringPopup from './components/UrgentHiringPopup';
import { initialJobs, initialApplications } from './initialData';
import { useLanguage } from './LanguageContext';

export default function App() {
  // Initialize state from LocalStorage or fallback to initial mockup data
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('lg_careers_jobs');
    if (savedJobs) {
      try {
        const parsed = JSON.parse(savedJobs);
        // Clear cache if it contains old mock jobs, outdated Retention Marketing job, or old external wikimedia logos
        const hasOldJobs = parsed.some(job => 
          !job.id.startsWith('job-lg-') || 
          job.title.includes('Retention') || 
          (typeof job.logo === 'string' && (job.logo.includes('wikimedia') || job.logo.includes('wikipedia')))
        ) || parsed[0]?.id !== 'job-lg-4';
        if (!hasOldJobs) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse jobs from localStorage', e);
      }
    }
    return initialJobs;
  });

  const [applications, setApplications] = useState(() => {
    const savedApps = localStorage.getItem('lg_careers_applications');
    if (savedApps) {
      try {
        const parsed = JSON.parse(savedApps);
        // Clear cache if it contains old mock applications
        const hasOldApps = parsed.some(app => !app.id.startsWith('app-lg-'));
        if (!hasOldApps) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse applications from localStorage', e);
      }
    }
    return initialApplications;
  });

  // Role: 'candidate' (Người tìm việc) or 'employer' (Nhà tuyển dụng)
  const [role, setRole] = useState('candidate');
  // Current view: 'jobs' | 'detail' | 'dashboard' | 'post-job'
  const [currentView, setCurrentView] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [emailNotification, setEmailNotification] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('lg_careers_webhook_url') || '';
  });

  const handleUpdateWebhookUrl = (url) => {
    setWebhookUrl(url);
    localStorage.setItem('lg_careers_webhook_url', url);
  };

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('lg_careers_jobs', JSON.stringify(jobs));

    // Dynamically inject Google Jobs Schema.org JSON-LD for SEO & ATS crawlers
    const existingScript = document.getElementById('google-jobs-schema');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'google-jobs-schema';
    script.type = 'application/ld+json';

    const jobPostingSchema = jobs.map(job => ({
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description,
      "datePosted": "2026-08-01",
      "validThrough": "2026-12-31",
      "employmentType": job.type === 'Full-time' ? 'FULL_TIME' : 'PART_TIME',
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company,
        "sameAs": "https://www.lg.com/vn",
        "logo": "https://emsaunguyen-ship-it.github.io/Tuyen-Dung-LG-Hanoi/lg_seonhaeng_clean.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": job.location,
          "addressCountry": "VN"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.salary,
          "unitText": "MONTH"
        }
      }
    }));

    script.textContent = JSON.stringify(jobPostingSchema);
    document.head.appendChild(script);
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('lg_careers_applications', JSON.stringify(applications));
  }, [applications]);

  // Handlers for Views and Navigation
  const handleViewChange = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  // Recruiters Handlers
  const handleAddJob = (newJob) => {
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    // Cascade delete: clean applications for that job
    setApplications(prevApps => prevApps.filter(app => app.jobId !== jobId));
  };

  const handleUpdateAppStatus = (appId, nextStatus) => {
    setApplications(prevApps => 
      prevApps.map(app => 
        app.id === appId ? { ...app, status: nextStatus } : app
      )
    );
  };

  const handleAutoExcelAndEmail = (newApp) => {
    // Get all applications for this job position (including the new one)
    const jobApps = [newApp, ...applications.filter(app => app.jobId === newApp.jobId)];

    // 1. Generate Excel HTML template
    const excelHeader = `
      <html xmlns:o="urn:schemas-microsoft-error-spreadsheets:office:excel" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
        <style>
          table { border-collapse: collapse; }
          th { background-color: #A50034; color: #ffffff; font-weight: bold; }
          th, td { border: 1px solid #dddddd; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h2>Báo cáo cộng dồn ứng viên vị trí: ${newApp.jobTitle}</h2>
        <p>Ngày xuất báo cáo: ${new Date().toLocaleDateString('vi-VN')}</p>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên ứng viên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Thư giới thiệu</th>
              <th>CV đính kèm</th>
              <th>Ngày ứng tuyển</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
    `;

    let excelBody = '';
    jobApps.forEach((app, idx) => {
      const safeName = app.candidateName ? app.candidateName.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
      const safeEmail = app.email ? app.email.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
      const safePhone = app.phone ? app.phone.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
      const safeLetter = app.coverLetter ? app.coverLetter.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
      const safeFile = app.cvFileName ? app.cvFileName.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

      excelBody += `
        <tr>
          <td>${idx + 1}</td>
          <td>${safeName}</td>
          <td>${safeEmail}</td>
          <td>${safePhone}</td>
          <td>${safeLetter}</td>
          <td>${safeFile}</td>
          <td>${app.appliedAt}</td>
          <td>${app.status === 'Pending' ? 'Chờ duyệt' : app.status}</td>
        </tr>
      `;
    });

    const excelFooter = `
          </tbody>
        </table>
      </body>
      </html>
    `;

    const excelContent = excelHeader + excelBody + excelFooter;
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    
    // 2. Trigger download of the Excel report
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    const safeJobTitle = newApp.jobTitle.replace(/[^a-zA-Z0-9]/g, '_');
    downloadLink.download = `Bao_cao_cong_don_${safeJobTitle}_${newApp.appliedAt}.xls`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    // 3. Set state to show the email simulation modal
    setEmailNotification(newApp);
  };

  // Candidates Handlers
  const handleSubmitApplication = (newApp) => {
    setApplications(prevApps => [newApp, ...prevApps]);

    // Send data to Google Sheet webhook if configured
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApp)
      })
      .then(() => console.log('Successfully synced application to Google Sheets.'))
      .catch(err => console.error('Failed to sync to Google Sheets:', err));
    }

    // Auto-generate Excel report and open Email Draft (khanhthuy.nguyen@lge.com)
    handleAutoExcelAndEmail(newApp);
  };

  return (
    <div className="app-wrapper">
      {/* Navigation Header */}
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        role={role} 
        onRoleChange={handleRoleChange} 
      />

      {/* Main Content Router */}
      <main className="main-content-area">
        {currentView === 'jobs' && (
          <JobBoard 
            jobs={jobs} 
            onSelectJob={handleSelectJob} 
          />
        )}

        {currentView === 'detail' && (
          <JobDetail 
            job={selectedJob} 
            onBack={() => handleViewChange('jobs')} 
            onApply={handleApplyJob}
          />
        )}

        {currentView === 'post-job' && (
          <PostJob 
            onAddJob={handleAddJob} 
            onBackToDashboard={() => handleViewChange('dashboard')} 
          />
        )}

        {currentView === 'dashboard' && (
          <EmployerDashboard 
            jobs={jobs} 
            applications={applications} 
            onUpdateAppStatus={handleUpdateAppStatus} 
            onDeleteJob={handleDeleteJob}
            onNavigateToPost={() => handleViewChange('post-job')}
            webhookUrl={webhookUrl}
            onUpdateWebhookUrl={handleUpdateWebhookUrl}
          />
        )}
      </main>

      {/* Urgent Hiring Auto Popup Modal */}
      {role === 'candidate' && (
        <UrgentHiringPopup 
          jobs={jobs} 
          onSelectJob={handleSelectJob} 
          onApplyJob={handleApplyJob} 
        />
      )}

      {/* Candidate Apply Modal */}
      {isApplyModalOpen && selectedJob && (
        <ApplyModal 
          job={selectedJob} 
          onClose={() => setIsApplyModalOpen(false)} 
          onSubmitApplication={handleSubmitApplication}
        />
      )}

      {/* Floating Brand Sticker "Life's Good." */}
      <a 
        href="https://www.lg.com/global/about-lg/brand-story/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-brand-sticker"
        title="Khám phá câu chuyện thương hiệu LG!"
      >
        <div className="sticker-inner">
          <span className="sticker-lifes">Life's</span>
          <span className="sticker-good">Good</span>
          <span className="sticker-dot">.</span>
        </div>
      </a>

      {/* Footer (LG Vietnam Corporate Style) */}
      <footer className="main-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '50px', paddingBottom: '30px' }}>
        <div className="container">
          {/* Footer Grid Columns */}
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-col-title">{t('navJobs')}</h4>
              <div className="footer-col-links">
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>{lang === 'vi' ? 'Lĩnh Vực Công Nghệ' : 'Technology & AI'}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>{lang === 'vi' ? 'Lĩnh Vực Marketing' : 'Marketing & Digital'}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>{lang === 'vi' ? 'Lĩnh Vực Kinh Doanh' : 'Sales & Retail'}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>{t('featuredJobsTitle')}</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">{t('navSupport')}</h4>
              <div className="footer-col-links">
                <a href="#" onClick={(e) => e.preventDefault()}>{t('navProcess')}</a>
                <a href="#" onClick={(e) => e.preventDefault()}>{lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}</a>
                <a href="#" onClick={(e) => e.preventDefault()}>{lang === 'vi' ? 'Điều Khoản Sử Dụng' : 'Terms of Service'}</a>
                <a href="#" onClick={(e) => e.preventDefault()}>{lang === 'vi' ? 'Liên Hệ Trợ Giúp' : 'Help & Contact'}</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">{t('navDiscover')}</h4>
              <div className="footer-col-links">
                <a href="https://www.lg.com/vn" target="_blank" rel="noopener noreferrer">{t('navAboutLG')}</a>
                <a href="https://www.lg.com/global/about-lg/brand-story/" target="_blank" rel="noopener noreferrer">"Life's Good" Brand Campaign</a>
                <a href="https://www.lg.com/global/sustainability" target="_blank" rel="noopener noreferrer">{lang === 'vi' ? 'Phát Triển Bền Vững' : 'Sustainability'}</a>
                <a href="https://www.lg.com/vn/tin-tuc-va-truyen-thong" target="_blank" rel="noopener noreferrer">{lang === 'vi' ? 'Trang Tin Tức LG' : 'LG Newsroom'}</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">{lang === 'vi' ? 'Kết nối với LG' : 'Connect with LG'}</h4>
              <div className="footer-col-links">
                <a href="https://www.linkedin.com/company/lg-electronics-development-vietnam-ltd/" target="_blank" rel="noopener noreferrer">LinkedIn Careers</a>
                <a href="https://www.youtube.com/@LGVietnam" target="_blank" rel="noopener noreferrer">YouTube LG Vietnam</a>
              </div>
            </div>
          </div>

          {/* Bottom logo and copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* LG Symbol SVG */}
              <svg viewBox="0 6.709 10.582 10.582" width="24" height="24" style={{ display: 'block' }}>
                <path fill="#FFFFFF" d="M5.291 6.709a5.29 5.29 0 1 1 0 10.582 5.291 5.291 0 1 1 0-10.582m3.16 8.457a4.445 4.445 0 0 0 1.31-3.161v-.242l-.22.001H6.596v.494h2.662l-.001.015a3.985 3.985 0 0 1-3.965 3.708 3.95 3.95 0 0 1-2.811-1.165 3.952 3.952 0 0 1-1.164-2.811c0-1.061.414-2.059 1.164-2.81a3.951 3.951 0 0 1 2.81-1.164l.252.003v-.495l-.251-.003a4.475 4.475 0 0 0-4.47 4.469c0 1.194.465 2.316 1.309 3.161a4.444 4.444 0 0 0 3.16 1.31 4.444 4.444 0 0 0 3.162-1.31m-2.91-1.297V9.644H5.04v4.72h1.556v-.495H5.543zm-1.265-3.552a.676.676 0 1 0-.675.674.676.676 0 0 0 .675-.674"/>
              </svg>
              <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', fontFamily: "'Inter', sans-serif", lineHeight: '1' }}>
                LG
              </span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#a1a1aa', borderLeft: '1px solid #3f3f46', paddingLeft: '8px', marginLeft: '2px' }}>
                Careers
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#71717a', textAlign: 'center', maxWidth: '600px', margin: '0' }}>
              &copy; {new Date().getFullYear()} LG Electronics. {lang === 'vi' ? 'Bản quyền nội dung thuộc về Tập đoàn LG. Layout được mô phỏng theo cổng thông tin điện tử của LG Việt Nam.' : 'All rights reserved by LG Electronics Group. Layout modeled after LG Vietnam recruitment portal.'}
            </p>
          </div>
        </div>
      </footer>
      {/* Auto-Email Simulation Dialog */}
      {emailNotification && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content email-simulator-modal" style={{ maxWidth: '650px', padding: '0px', overflow: 'hidden', border: '1px solid #ddd' }}>
            <div className="email-simulator-header" style={{ backgroundColor: '#A50034', color: '#ffffff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📧 Tự Động Gửi Báo Cáo Tuyển Dụng & Excel
              </h3>
              <button onClick={() => setEmailNotification(null)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '18px' }}>&times;</button>
            </div>
            
            <div className="email-simulator-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#f8f9fa' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                <div><strong>Người nhận (To):</strong> <span style={{ color: '#A50034', fontWeight: 600 }}>khanhthuy.nguyen@lge.com</span></div>
                <hr style={{ border: 'none', borderTop: '1px solid #edf2f7', margin: '4px 0' }} />
                <div><strong>Tiêu đề (Subject):</strong> <span style={{ fontWeight: 600 }}>[LG Careers] Ứng viên mới phát sinh - Vị trí: {emailNotification.jobTitle}</span></div>
                <hr style={{ border: 'none', borderTop: '1px solid #edf2f7', margin: '4px 0' }} />
                <div>
                  <strong>Tệp đính kèm (Attachment):</strong> 
                  <span style={{ color: '#2b6cb0', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                    📊 Bao_cao_cong_don_{emailNotification.jobTitle.replace(/[^a-zA-Z0-9]/g, '_')}_{emailNotification.appliedAt}.xls (Đã tự động tải xuống)
                  </span>
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '16px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '12px', lineHeight: '1.5', color: '#2d3748', maxHeight: '200px', overflowY: 'auto' }}>
{`Kính gửi Chị Khánh Thuỷ (HR Department),

Hệ thống LG Careers ghi nhận có ứng viên mới ứng tuyển vào vị trí của chị quản lý.

Dưới đây là thông tin ứng viên mới phát sinh (để trên bề mặt email):
--------------------------------------------------
- Họ và Tên: ${emailNotification.candidateName}
- Email: ${emailNotification.email}
- Số Điện Thoại: ${emailNotification.phone}
- Thư giới thiệu: ${emailNotification.coverLetter || 'Không có'}
- Tệp hồ sơ CV: ${emailNotification.cvFileName}
- Ngày nộp: ${emailNotification.appliedAt}
--------------------------------------------------

* Hướng dẫn: Tệp Excel cộng dồn tất cả ứng viên của vị trí này từ đầu ngày tuyển dụng đã được tự động tải về máy của bạn. Vui lòng đính kèm tệp này khi gửi email.

Trân trọng,
Hệ thống tuyển dụng tự động LG Electronics Việt Nam.`}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button 
                  onClick={() => setEmailNotification(null)}
                  className="btn-pill-secondary" 
                  style={{ color: '#4a5568', borderColor: '#cbd5e0', padding: '8px 18px', fontSize: '13.5px', cursor: 'pointer' }}
                >
                  Đóng
                </button>
                <button 
                  onClick={() => {
                    const to = 'khanhthuy.nguyen@lge.com';
                    const subject = encodeURIComponent(`[LG Careers] Ứng viên mới phát sinh - Vị trí: ${emailNotification.jobTitle}`);
                    const body = encodeURIComponent(`Kính gửi Chị Khánh Thuỷ (HR Department),

Hệ thống LG Careers ghi nhận có ứng viên mới ứng tuyển vào vị trí của chị quản lý.

Dưới đây là thông tin ứng viên mới phát sinh (để trên bề mặt email):
--------------------------------------------------
- Họ và Tên: ${emailNotification.candidateName}
- Email: ${emailNotification.email}
- Số Điện Thoại: ${emailNotification.phone}
- Thư giới thiệu: ${emailNotification.coverLetter || 'Không có'}
- Tệp hồ sơ CV: ${emailNotification.cvFileName}
- Ngày nộp: ${emailNotification.appliedAt}
--------------------------------------------------

* Hướng dẫn: Tệp Excel cộng dồn tất cả ứng viên của vị trí này từ đầu ngày tuyển dụng đã được tự động tải về máy của bạn. Vui lòng đính kèm tệp này khi gửi email.

Trân trọng,
Hệ thống tuyển dụng tự động LG Electronics Việt Nam.`);
                    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_self');
                  }}
                  className="btn-pill-primary"
                  style={{ padding: '8px 18px', fontSize: '13.5px', cursor: 'pointer' }}
                >
                  Mở Ứng Dụng Email (Gửi Ngay)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
