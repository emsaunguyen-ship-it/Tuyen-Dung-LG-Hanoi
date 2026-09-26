import React, { useState } from 'react';
import { Briefcase, Users, FileCheck2, UserMinus, PlusCircle, ExternalLink, Mail, Phone, Calendar, Check, X, FileText, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function EmployerDashboard({ jobs, applications, onUpdateAppStatus, onDeleteJob, onNavigateToPost, webhookUrl, onUpdateWebhookUrl }) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('applications'); // 'jobs' or 'applications'
  const [selectedJobFilter, setSelectedJobFilter] = useState('All');

  // Compute metrics
  const totalJobs = jobs.length;
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const shortlistedApps = applications.filter(a => a.status === 'Shortlisted').length;

  // Filtered applications based on selected job ID
  const filteredApps = selectedJobFilter === 'All' 
    ? applications 
    : applications.filter(app => app.jobId === selectedJobFilter);

  const handleExportAndSendEmail = () => {
    if (selectedJobFilter === 'All') return;
    
    const selectedJob = jobs.find(j => j.id === selectedJobFilter);
    if (!selectedJob) return;

    // Get all applications for this job position
    const jobApps = applications.filter(app => app.jobId === selectedJobFilter);
    if (jobApps.length === 0) {
      alert(lang === 'vi' ? 'Chưa có ứng viên nào ứng tuyển vào vị trí này để xuất báo cáo.' : 'No candidates have applied for this position yet to export a report.');
      return;
    }

    // Sort by date (oldest first for cumulative list)
    const sortedApps = [...jobApps].sort((a, b) => new Date(a.appliedAt) - new Date(b.appliedAt));

    // Get the latest candidate (thí sinh phát sinh gần nhất)
    const newApp = sortedApps[sortedApps.length - 1];

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
        <h2>${lang === 'vi' ? 'Báo cáo cộng dồn ứng viên vị trí' : 'Cumulative candidate report for position'}: ${selectedJob.title}</h2>
        <p>${lang === 'vi' ? 'Ngày xuất báo cáo' : 'Report date'}: ${new Date().toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US')}</p>
        <table>
          <thead>
            <tr>
              <th>${lang === 'vi' ? 'STT' : 'No.'}</th>
              <th>${lang === 'vi' ? 'Tên ứng viên' : 'Candidate Name'}</th>
              <th>Email</th>
              <th>${lang === 'vi' ? 'Số điện thoại' : 'Phone Number'}</th>
              <th>${lang === 'vi' ? 'Thư giới thiệu' : 'Cover Letter'}</th>
              <th>${lang === 'vi' ? 'CV đính kèm' : 'Attached CV'}</th>
              <th>${lang === 'vi' ? 'Ngày ứng tuyển' : 'Applied Date'}</th>
              <th>${lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
    `;

    let excelBody = '';
    sortedApps.forEach((app, idx) => {
      excelBody += `
        <tr>
          <td>${idx + 1}</td>
          <td>${app.candidateName}</td>
          <td>${app.email}</td>
          <td>${app.phone}</td>
          <td>${app.coverLetter || ''}</td>
          <td>${app.cvFileName}</td>
          <td>${app.appliedAt}</td>
          <td>${app.status === 'Pending' ? (lang === 'vi' ? 'Chờ duyệt' : 'Pending') : (app.status === 'Shortlisted' ? (lang === 'vi' ? 'Đã duyệt' : 'Shortlisted') : (app.status === 'Rejected' ? (lang === 'vi' ? 'Đã từ chối' : 'Rejected') : app.status))}</td>
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
    const safeJobTitle = selectedJob.title.replace(/[^a-zA-Z0-9]/g, '_');
    downloadLink.download = `${lang === 'vi' ? 'Bao_cao_cong_don' : 'Cumulative_Report'}_${safeJobTitle}_${new Date().toISOString().split('T')[0]}.xls`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    // 3. Open mail client
    const to = 'khanhthuy.nguyen@lge.com';
    const subject = encodeURIComponent(lang === 'vi'
      ? `[LG Careers] Báo cáo ứng tuyển cộng dồn - Vị trí: ${selectedJob.title}`
      : `[LG Careers] Cumulative Application Report - Position: ${selectedJob.title}`);

    const emailBody = lang === 'vi' ? `Kính gửi Chị Khánh Thuỷ (HR Department),

Hệ thống LG Careers xin gửi báo cáo cộng dồn hồ sơ ứng tuyển của vị trí: ${selectedJob.title}.

Thông tin ứng viên mới phát sinh gần nhất (để trên bề mặt email):
--------------------------------------------------
- Họ và Tên: ${newApp.candidateName}
- Email: ${newApp.email}
- Số Điện Thoại: ${newApp.phone}
- Thư giới thiệu: ${newApp.coverLetter || 'Không có'}
- Tệp hồ sơ CV: ${newApp.cvFileName}
- Ngày nộp: ${newApp.appliedAt}
--------------------------------------------------

* Đã đính kèm tệp Excel báo cáo cộng dồn (${sortedApps.length} ứng viên) từ đầu ngày tuyển dụng cho đến nay. Bạn hãy kiểm tra thư mục Download trên máy tính để đính kèm tệp này.

Trân trọng,
Hệ thống tuyển dụng tự động LG Electronics Việt Nam.` : `Dear Ms. Khanh Thuy (HR Department),

The LG Careers system is sending the cumulative candidate report for the position: ${selectedJob.title}.

Most recent candidate information (highlighted here):
--------------------------------------------------
- Full Name: ${newApp.candidateName}
- Email: ${newApp.email}
- Phone Number: ${newApp.phone}
- Cover Letter: ${newApp.coverLetter || 'None'}
- CV File: ${newApp.cvFileName}
- Applied Date: ${newApp.appliedAt}
--------------------------------------------------

* The cumulative Excel report (${sortedApps.length} candidates) since the start of the recruitment period is attached. Please check your computer's Downloads folder to attach this file.

Best regards,
LG Electronics Vietnam Automated Recruitment System.`;

    const body = encodeURIComponent(emailBody);
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">{t('dashboardTitle')}</h1>
          <p className="dashboard-subtitle">{t('dashboardSubtitle')}</p>
        </div>
        <button className="btn-create-job-main" onClick={onNavigateToPost}>
          <PlusCircle size={18} />
          <span>{t('btnPostJobMain')}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card bg-navy">
          <div className="metric-content">
            <span className="metric-card-label">{t('metricOpenJobs')}</span>
            <span className="metric-card-value">{totalJobs}</span>
          </div>
          <div className="metric-icon-wrap">
            <Briefcase size={28} />
          </div>
        </div>

        <div className="metric-card bg-blue">
          <div className="metric-content">
            <span className="metric-card-label">{t('metricTotalApps')}</span>
            <span className="metric-card-value">{totalApps}</span>
          </div>
          <div className="metric-icon-wrap">
            <Users size={28} />
          </div>
        </div>

        <div className="metric-card bg-orange">
          <div className="metric-content">
            <span className="metric-card-label">{t('metricPendingApps')}</span>
            <span className="metric-card-value">{pendingApps}</span>
          </div>
          <div className="metric-icon-wrap">
            <FileText size={28} />
          </div>
        </div>

        <div className="metric-card bg-green">
          <div className="metric-content">
            <span className="metric-card-label">{t('metricShortlistedApps')}</span>
            <span className="metric-card-value">{shortlistedApps}</span>
          </div>
          <div className="metric-icon-wrap">
            <FileCheck2 size={28} />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs-section">
        <div className="tabs-bar">
          <button 
            className={`dashboard-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            {t('tabReceivedApps')} ({applications.length})
          </button>
          <button 
            className={`dashboard-tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            {t('tabManageJobs')} ({jobs.length})
          </button>
          <button 
            className={`dashboard-tab-btn ${activeTab === 'sheets' ? 'active' : ''}`}
            onClick={() => setActiveTab('sheets')}
          >
            {lang === 'vi' ? 'Đồng Bộ Google Sheets' : 'Google Sheets Webhook'}
          </button>
        </div>

        {/* Tab Content 1: Applications */}
        {activeTab === 'applications' && (
          <div className="tab-pane-content">
            {/* Filter bar */}
            <div className="dashboard-filter-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
                <label htmlFor="jobFilter" className="filter-bar-label">{lang === 'vi' ? 'Lọc hồ sơ theo tin tuyển dụng:' : 'Filter applications by job posting:'}</label>
                <select
                  id="jobFilter"
                  value={selectedJobFilter}
                  onChange={(e) => setSelectedJobFilter(e.target.value)}
                  className="filter-bar-select"
                >
                  <option value="All">{lang === 'vi' ? 'Tất cả tin tuyển dụng' : 'All job postings'}</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>{job.title} ({job.company})</option>
                  ))}
                </select>
              </div>

              {selectedJobFilter !== 'All' && (
                <button 
                  onClick={handleExportAndSendEmail}
                  className="btn-export-email-lg"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '10px 22px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'var(--transition)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                >
                  <Mail size={16} /> {lang === 'vi' ? 'Gửi Báo Cáo & Email (Khánh Thuỷ)' : 'Send Report & Email (Khanh Thuy)'}
                </button>
              )}
            </div>

            {/* Applications List */}
            <div className="applications-list-container">
              {filteredApps.length > 0 ? (
                filteredApps.map(app => (
                  <div key={app.id} className={`app-card-item status-${app.status.toLowerCase()}`}>
                    <div className="app-card-header">
                      <div className="app-candidate-info">
                        <h3 className="candidate-name">{app.candidateName}</h3>
                        <p className="applied-for-text">
                          {lang === 'vi' ? 'Ứng tuyển' : 'Applied for'}: <span className="highlight-job-title">{app.jobTitle}</span>
                        </p>
                      </div>
                      <div className="app-status-indicator">
                        <span className={`status-badge status-${app.status.toLowerCase()}`}>
                          {app.status === 'Pending' && (lang === 'vi' ? 'Chờ duyệt' : 'Pending')}
                          {app.status === 'Shortlisted' && (lang === 'vi' ? 'Đã duyệt (Shortlisted)' : 'Shortlisted')}
                          {app.status === 'Rejected' && (lang === 'vi' ? 'Đã từ chối' : 'Rejected')}
                        </span>
                        <span className="ats-id-badge" title={lang === 'vi' ? 'Tự động cấp bởi Hệ thống Quản trị ATS LG Electronics' : 'Auto-assigned by LG Electronics ATS Management System'}>
                          {app.atsId || `LG-ATS-2026-${app.id.slice(-4)}`}
                        </span>
                      </div>
                    </div>

                    <div className="app-contact-grid">
                      <div className="contact-detail">
                        <Mail size={14} />
                        <a href={`mailto:${app.email}`} className="contact-link">{app.email}</a>
                      </div>
                      <div className="contact-detail">
                        <Phone size={14} />
                        <a href={`tel:${app.phone}`} className="contact-link">{app.phone}</a>
                      </div>
                      <div className="contact-detail">
                        <Calendar size={14} />
                        <span>{lang === 'vi' ? 'Nộp ngày' : 'Applied'}: {app.appliedAt}</span>
                      </div>
                    </div>

                    {/* Candidate Experience Details */}
                    <div className="app-exp-highlight-box" style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '10px 0', fontSize: '13px' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: app.experienceSummary ? '4px' : '0' }}>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          ⏱ {lang === 'vi' ? 'Số năm kinh nghiệm:' : 'Years of Experience:'} <span style={{ color: '#1e293b' }}>{app.yearsOfExperience || '3 - 5 năm'}</span>
                        </span>
                      </div>
                      {app.experienceSummary && (
                        <div style={{ color: '#475569', fontSize: '12.5px' }}>
                          <strong>🏢 {lang === 'vi' ? 'Tóm tắt kinh nghiệm:' : 'Work Experience:'}</strong> {app.experienceSummary}
                        </div>
                      )}
                    </div>

                    {app.coverLetter && (
                      <div className="app-letter-preview">
                        <strong>{lang === 'vi' ? 'Thư giới thiệu:' : 'Cover Letter:'}</strong>
                        <p className="letter-text">"{app.coverLetter}"</p>
                      </div>
                    )}

                    <div className="app-cv-attachment-box">
                      <div className="cv-icon-name">
                        <FileText size={18} className="cv-blue-icon" />
                        <span className="cv-filename-text">{app.cvFileName}</span>
                      </div>
                      <a 
                        href={app.cvBase64 || '#'} 
                        download={app.cvFileName}
                        onClick={(e) => {
                          if (!app.cvBase64) {
                            e.preventDefault();
                            alert(lang === 'vi' ? `Đang mở xem hồ sơ CV đính kèm: ${app.cvFileName}` : `Opening attached CV file: ${app.cvFileName}`);
                          }
                        }}
                        className="btn-download-cv"
                        title={lang === 'vi' ? 'Tải xuống CV' : 'Download CV'}
                      >
                        {lang === 'vi' ? 'Tải xuống CV' : 'Download CV'}
                      </a>
                    </div>

                    {/* Dashboard Actions */}
                    {app.status === 'Pending' && (
                      <div className="app-actions-footer">
                        <button 
                          className="btn-action-reject" 
                          onClick={() => onUpdateAppStatus(app.id, 'Rejected')}
                        >
                          <X size={16} /> {lang === 'vi' ? 'Từ chối' : 'Reject'}
                        </button>
                        <button
                          className="btn-action-approve"
                          onClick={() => onUpdateAppStatus(app.id, 'Shortlisted')}
                        >
                          <Check size={16} /> {lang === 'vi' ? 'Duyệt hồ sơ (Shortlist)' : 'Shortlist Candidate'}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-dashboard-state">
                  <p>{lang === 'vi' ? 'Không có hồ sơ ứng tuyển nào được gửi tới hoặc phù hợp với bộ lọc hiện tại.' : 'No applications have been received or match the current filter.'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 2: Posted Jobs */}
        {activeTab === 'jobs' && (
          <div className="tab-pane-content">
            <div className="posted-jobs-table-wrapper">
              {jobs.length > 0 ? (
                <table className="posted-jobs-table">
                  <thead>
                    <tr>
                      <th>{lang === 'vi' ? 'Tin tuyển dụng' : 'Job Posting'}</th>
                      <th>{lang === 'vi' ? 'Địa điểm' : 'Location'}</th>
                      <th>{lang === 'vi' ? 'Lương' : 'Salary'}</th>
                      <th>{lang === 'vi' ? 'Nhóm ngành' : 'Industry'}</th>
                      <th>{lang === 'vi' ? 'Ngày đăng' : 'Posted Date'}</th>
                      <th>{lang === 'vi' ? 'Thao tác' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => {
                      const jobAppsCount = applications.filter(a => a.jobId === job.id).length;
                      return (
                        <tr key={job.id}>
                          <td>
                            <div className="table-job-info">
                              <span className="table-job-title">{job.title}</span>
                              <span className="table-company-name">{job.company}</span>
                              <span className="table-apps-count">{lang === 'vi' ? 'Hồ sơ ứng tuyển' : 'Applications'}: <strong>{jobAppsCount}</strong></span>
                            </div>
                          </td>
                          <td>{job.location}</td>
                          <td className="table-salary">{job.salary}</td>
                          <td>{job.industry}</td>
                          <td>{job.postedAt}</td>
                          <td>
                            <div className="table-actions">
                              <button 
                                className="btn-table-delete"
                                onClick={() => {
                                  if(confirm(lang === 'vi' ? `Bạn có chắc chắn muốn xoá tin tuyển dụng "${job.title}"?` : `Are you sure you want to delete the job posting "${job.title}"?`)) {
                                    onDeleteJob(job.id);
                                  }
                                }}
                              >
                                {lang === 'vi' ? 'Xoá tin' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="empty-dashboard-state">
                  <p>{lang === 'vi' ? 'Bạn chưa đăng tuyển vị trí công việc nào.' : 'You have not posted any job openings yet.'}</p>
                  <button className="btn-create-job-main" onClick={onNavigateToPost} style={{ margin: '15px auto 0' }}>
                    <PlusCircle size={18} /> {lang === 'vi' ? 'Đăng tin tuyển dụng ngay' : 'Post a job now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 3: Google Sheets Sync */}
        {activeTab === 'sheets' && (
          <div className="tab-pane-content">
            <div className="sheets-config-container">
              <h2 className="sheets-title">
                田 {lang === 'vi' ? 'Cấu hình đồng bộ ứng viên sang Google Sheets' : 'Configure Candidate Sync to Google Sheets'}
              </h2>
              <p style={{ fontSize: '13.5px', color: '#555', marginBottom: '20px', lineHeight: '1.5' }}>
                {lang === 'vi'
                  ? 'Đơn ứng tuyển từ ứng viên nộp tại website sẽ tự động đồng bộ sang Google Sheets trên tài khoản Google Drive của bạn dưới dạng hàng (row) dữ liệu trong thời gian thực.'
                  : "Applications submitted by candidates on the website will automatically sync to Google Sheets in your Google Drive account as real-time data rows."}
              </p>

              {/* Banner chứa link Google Sheets */}
              <div className="sheets-link-banner">
                <div className="sheets-link-banner-left">
                  <div style={{ backgroundColor: '#107c41', color: '#fff', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>田</div>
                  <div className="sheets-link-banner-text">
                    <span className="sheets-link-banner-title">{lang === 'vi' ? 'Google Spreadsheet của bạn đã sẵn sàng' : 'Your Google Spreadsheet is ready'}</span>
                    <span className="sheets-link-banner-desc">{lang === 'vi' ? 'Tên file' : 'File name'}: <strong>LG_Careers_Applications</strong> (ID: 1sH23eUrOc0qgmUlH9K-sh7knAtaTCdlv47j3pb51rBY)</span>
                  </div>
                </div>
                <a
                  href="https://docs.google.com/spreadsheets/d/1sH23eUrOc0qgmUlH9K-sh7knAtaTCdlv47j3pb51rBY/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-open-sheet"
                >
                  {lang === 'vi' ? 'Mở Google Sheet' : 'Open Google Sheet'} <ExternalLink size={14} />
                </a>
              </div>

              {/* Hướng dẫn cài đặt */}
              <div className="sheets-instructions">
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>{lang === 'vi' ? 'Hướng dẫn liên kết trong 1 phút:' : '1-minute setup guide:'}</h4>
                <ol style={{ paddingLeft: '20px', margin: '0' }}>
                  {lang === 'vi' ? (
                    <>
                      <li>Bấm nút <strong>"Mở Google Sheet"</strong> ở trên để truy cập bảng tính của bạn.</li>
                      <li>Tại bảng tính, bấm chọn <strong>Tiện ích mở rộng (Extensions)</strong> &gt; <strong>Apps Script</strong>.</li>
                      <li>Xóa toàn bộ mã code hiện tại trong cửa sổ Apps Script và dán đoạn mã code dưới đây vào:</li>
                    </>
                  ) : (
                    <>
                      <li>Click the <strong>"Open Google Sheet"</strong> button above to access your spreadsheet.</li>
                      <li>In the spreadsheet, click <strong>Extensions</strong> &gt; <strong>Apps Script</strong>.</li>
                      <li>Delete all the existing code in the Apps Script window and paste the code below:</li>
                    </>
                  )}
                </ol>

                <pre className="code-snippet-box">
{`function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Danh sách ứng viên");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }
    sheet.appendRow([
      data.id || "",
      data.jobTitle || "",
      data.candidateName || "",
      data.email || "",
      data.phone || "",
      data.cvFileName || "",
      data.coverLetter || "",
      data.appliedAt || "",
      data.status || "Pending"
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                </pre>

                <ol style={{ paddingLeft: '20px', margin: '0' }} start="4">
                  {lang === 'vi' ? (
                    <>
                      <li>Bấm biểu tượng <strong>Lưu (Save - hình đĩa mềm)</strong> ở phía trên.</li>
                      <li>Bấm chọn nút <strong>Triển khai (Deploy)</strong> &gt; <strong>Triển khai mới (New deployment)</strong>.</li>
                      <li>Chọn cấu hình (bánh răng) &gt; chọn <strong>Ứng dụng web (Web app)</strong>.
                        <ul>
                          <li>Cấu hình quyền truy cập (Who has access): chọn <strong>Bất kỳ ai (Anyone)</strong>.</li>
                        </ul>
                      </li>
                      <li>Bấm <strong>Triển khai (Deploy)</strong> và copy đoạn URL Ứng dụng web được cấp (Web app URL).</li>
                    </>
                  ) : (
                    <>
                      <li>Click the <strong>Save (floppy disk icon)</strong> button above.</li>
                      <li>Click <strong>Deploy</strong> &gt; <strong>New deployment</strong>.</li>
                      <li>Select the configuration (gear icon) &gt; choose <strong>Web app</strong>.
                        <ul>
                          <li>Access configuration (Who has access): select <strong>Anyone</strong>.</li>
                        </ul>
                      </li>
                      <li>Click <strong>Deploy</strong> and copy the generated Web app URL.</li>
                    </>
                  )}
                </ol>
              </div>

              {/* Ô nhập Webhook */}
              <div className="webhook-input-group">
                <label htmlFor="webhookUrl">{lang === 'vi' ? 'Dán Web app URL (Webhook) đã copy vào đây:' : 'Paste the copied Web app URL (Webhook) here:'}</label>
                <div className="webhook-input-row">
                  <input
                    type="text"
                    id="webhookUrl"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={webhookUrl}
                    onChange={(e) => onUpdateWebhookUrl(e.target.value)}
                    className="webhook-text-input"
                  />
                  <button
                    className={`btn-save-webhook ${webhookUrl ? 'configured' : ''}`}
                    onClick={() => {
                      if (webhookUrl) {
                        alert(lang === 'vi' ? 'Lưu Webhook cấu hình Google Sheet thành công! Website đã được kết nối với trang tính của bạn.' : 'Google Sheet webhook configuration saved successfully! The website is now connected to your spreadsheet.');
                      } else {
                        alert(lang === 'vi' ? 'Vui lòng dán Web app URL của bạn vào ô trống.' : 'Please paste your Web app URL into the field.');
                      }
                    }}
                  >
                    {webhookUrl ? (lang === 'vi' ? 'Đang Kết Nối' : 'Connected') : (lang === 'vi' ? 'Lưu URL' : 'Save URL')}
                  </button>
                </div>
                <span style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                  {webhookUrl
                    ? (lang === 'vi' ? '✅ Dữ liệu tuyển dụng sẽ tự động ghi sang Google Sheet vĩnh viễn khi ứng viên đăng ký.' : '✅ Recruitment data will automatically be written to Google Sheet permanently whenever a candidate applies.')
                    : (lang === 'vi' ? '⚠️ Cần dán URL để kích hoạt đồng bộ hóa tự động.' : '⚠️ Paste a URL to enable automatic syncing.')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
