import React, { useState } from 'react';
import { Briefcase, Users, FileCheck2, UserMinus, PlusCircle, ExternalLink, Mail, Phone, Calendar, Check, X, FileText, ChevronRight } from 'lucide-react';

export default function EmployerDashboard({ jobs, applications, onUpdateAppStatus, onDeleteJob, onNavigateToPost, webhookUrl, onUpdateWebhookUrl }) {
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

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">Bảng Điều Khiển Nhà Tuyển Dụng</h1>
          <p className="dashboard-subtitle">Quản lý các chiến dịch tuyển dụng và đơn ứng tuyển của ứng viên</p>
        </div>
        <button className="btn-create-job-main" onClick={onNavigateToPost}>
          <PlusCircle size={18} />
          <span>Đăng tin tuyển dụng mới</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card bg-navy">
          <div className="metric-content">
            <span className="metric-card-label">Tin tuyển dụng đang mở</span>
            <span className="metric-card-value">{totalJobs}</span>
          </div>
          <div className="metric-icon-wrap">
            <Briefcase size={28} />
          </div>
        </div>

        <div className="metric-card bg-blue">
          <div className="metric-content">
            <span className="metric-card-label">Tổng số hồ sơ ứng tuyển</span>
            <span className="metric-card-value">{totalApps}</span>
          </div>
          <div className="metric-icon-wrap">
            <Users size={28} />
          </div>
        </div>

        <div className="metric-card bg-orange">
          <div className="metric-content">
            <span className="metric-card-label">Hồ sơ chờ xem xét</span>
            <span className="metric-card-value">{pendingApps}</span>
          </div>
          <div className="metric-icon-wrap">
            <FileText size={28} />
          </div>
        </div>

        <div className="metric-card bg-green">
          <div className="metric-content">
            <span className="metric-card-label">Ứng viên đã duyệt (Shortlist)</span>
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
            Hồ Sơ Ứng Tuyển Nhận Được ({applications.length})
          </button>
          <button 
            className={`dashboard-tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Tin Tuyển Dụng Đã Đăng ({jobs.length})
          </button>
          <button 
            className={`dashboard-tab-btn ${activeTab === 'sheets' ? 'active' : ''}`}
            onClick={() => setActiveTab('sheets')}
          >
            Đồng Bộ Google Sheets
          </button>
        </div>

        {/* Tab Content 1: Applications */}
        {activeTab === 'applications' && (
          <div className="tab-pane-content">
            {/* Filter bar */}
            <div className="dashboard-filter-bar">
              <label htmlFor="jobFilter" className="filter-bar-label">Lọc hồ sơ theo tin tuyển dụng:</label>
              <select 
                id="jobFilter" 
                value={selectedJobFilter} 
                onChange={(e) => setSelectedJobFilter(e.target.value)}
                className="filter-bar-select"
              >
                <option value="All">Tất cả tin tuyển dụng</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title} ({job.company})</option>
                ))}
              </select>
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
                          Ứng tuyển: <span className="highlight-job-title">{app.jobTitle}</span>
                        </p>
                      </div>
                      <div className="app-status-indicator">
                        <span className={`status-badge status-${app.status.toLowerCase()}`}>
                          {app.status === 'Pending' && 'Chờ duyệt'}
                          {app.status === 'Shortlisted' && 'Đã duyệt (Shortlisted)'}
                          {app.status === 'Rejected' && 'Đã từ chối'}
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
                        <span>Nộp ngày: {app.appliedAt}</span>
                      </div>
                    </div>

                    {app.coverLetter && (
                      <div className="app-letter-preview">
                        <strong>Thư giới thiệu:</strong>
                        <p className="letter-text">"{app.coverLetter}"</p>
                      </div>
                    )}

                    <div className="app-cv-attachment-box">
                      <div className="cv-icon-name">
                        <FileText size={18} className="cv-blue-icon" />
                        <span className="cv-filename-text">{app.cvFileName}</span>
                      </div>
                      <a href="#" onClick={(e) => { e.preventDefault(); alert(`Tải xuống tệp giả lập: ${app.cvFileName}`); }} className="btn-download-cv" title="Tải xuống CV">
                        Tải xuống CV
                      </a>
                    </div>

                    {/* Dashboard Actions */}
                    {app.status === 'Pending' && (
                      <div className="app-actions-footer">
                        <button 
                          className="btn-action-reject" 
                          onClick={() => onUpdateAppStatus(app.id, 'Rejected')}
                        >
                          <X size={16} /> Từ chối
                        </button>
                        <button 
                          className="btn-action-approve" 
                          onClick={() => onUpdateAppStatus(app.id, 'Shortlisted')}
                        >
                          <Check size={16} /> Duyệt hồ sơ (Shortlist)
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-dashboard-state">
                  <p>Không có hồ sơ ứng tuyển nào được gửi tới hoặc phù hợp với bộ lọc hiện tại.</p>
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
                      <th>Tin tuyển dụng</th>
                      <th>Địa điểm</th>
                      <th>Lương</th>
                      <th>Nhóm ngành</th>
                      <th>Ngày đăng</th>
                      <th>Thao tác</th>
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
                              <span className="table-apps-count">Hồ sơ ứng tuyển: <strong>{jobAppsCount}</strong></span>
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
                                  if(confirm(`Bạn có chắc chắn muốn xoá tin tuyển dụng "${job.title}"?`)) {
                                    onDeleteJob(job.id);
                                  }
                                }}
                              >
                                Xoá tin
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
                  <p>Bạn chưa đăng tuyển vị trí công việc nào.</p>
                  <button className="btn-create-job-main" onClick={onNavigateToPost} style={{ margin: '15px auto 0' }}>
                    <PlusCircle size={18} /> Đăng tin tuyển dụng ngay
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
                田 Cấu hình đồng bộ ứng viên sang Google Sheets
              </h2>
              <p style={{ fontSize: '13.5px', color: '#555', marginBottom: '20px', lineHeight: '1.5' }}>
                Đơn ứng tuyển từ ứng viên nộp tại website sẽ tự động đồng bộ sang Google Sheets trên tài khoản Google Drive của bạn dưới dạng hàng (row) dữ liệu trong thời gian thực.
              </p>

              {/* Banner chứa link Google Sheets */}
              <div className="sheets-link-banner">
                <div className="sheets-link-banner-left">
                  <div style={{ backgroundColor: '#107c41', color: '#fff', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>田</div>
                  <div className="sheets-link-banner-text">
                    <span className="sheets-link-banner-title">Google Spreadsheet của bạn đã sẵn sàng</span>
                    <span className="sheets-link-banner-desc">Tên file: <strong>LG_Careers_Applications</strong> (ID: 1sH23eUrOc0qgmUlH9K-sh7knAtaTCdlv47j3pb51rBY)</span>
                  </div>
                </div>
                <a 
                  href="https://docs.google.com/spreadsheets/d/1sH23eUrOc0qgmUlH9K-sh7knAtaTCdlv47j3pb51rBY/edit" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-open-sheet"
                >
                  Mở Google Sheet <ExternalLink size={14} />
                </a>
              </div>

              {/* Hướng dẫn cài đặt */}
              <div className="sheets-instructions">
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>Hướng dẫn liên kết trong 1 phút:</h4>
                <ol style={{ paddingLeft: '20px', margin: '0' }}>
                  <li>Bấm nút <strong>"Mở Google Sheet"</strong> ở trên để truy cập bảng tính của bạn.</li>
                  <li>Tại bảng tính, bấm chọn <strong>Tiện ích mở rộng (Extensions)</strong> &gt; <strong>Apps Script</strong>.</li>
                  <li>Xóa toàn bộ mã code hiện tại trong cửa sổ Apps Script và dán đoạn mã code dưới đây vào:</li>
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
                  <li>Bấm biểu tượng <strong>Lưu (Save - hình đĩa mềm)</strong> ở phía trên.</li>
                  <li>Bấm chọn nút <strong>Triển khai (Deploy)</strong> &gt; <strong>Triển khai mới (New deployment)</strong>.</li>
                  <li>Chọn cấu hình (bánh răng) &gt; chọn <strong>Ứng dụng web (Web app)</strong>.
                    <ul>
                      <li>Cấu hình quyền truy cập (Who has access): chọn <strong>Bất kỳ ai (Anyone)</strong>.</li>
                    </ul>
                  </li>
                  <li>Bấm <strong>Triển khai (Deploy)</strong> và copy đoạn URL Ứng dụng web được cấp (Web app URL).</li>
                </ol>
              </div>

              {/* Ô nhập Webhook */}
              <div className="webhook-input-group">
                <label htmlFor="webhookUrl">Dán Web app URL (Webhook) đã copy vào đây:</label>
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
                        alert('Lưu Webhook cấu hình Google Sheet thành công! Website đã được kết nối với trang tính của bạn.');
                      } else {
                        alert('Vui lòng dán Web app URL của bạn vào ô trống.');
                      }
                    }}
                  >
                    {webhookUrl ? 'Đang Kết Nối' : 'Lưu URL'}
                  </button>
                </div>
                <span style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                  {webhookUrl ? '✅ Dữ liệu tuyển dụng sẽ tự động ghi sang Google Sheet vĩnh viễn khi ứng viên đăng ký.' : '⚠️ Cần dán URL để kích hoạt đồng bộ hóa tự động.'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
