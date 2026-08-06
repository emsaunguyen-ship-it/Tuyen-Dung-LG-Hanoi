import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobBoard from './components/JobBoard';
import JobDetail from './components/JobDetail';
import ApplyModal from './components/ApplyModal';
import PostJob from './components/PostJob';
import EmployerDashboard from './components/EmployerDashboard';
import { initialJobs, initialApplications } from './initialData';

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
        );
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

      {/* Candidate Apply Modal */}
      {isApplyModalOpen && selectedJob && (
        <ApplyModal 
          job={selectedJob} 
          onClose={() => setIsApplyModalOpen(false)} 
          onSubmitApplication={handleSubmitApplication}
        />
      )}

      {/* Footer (LG Vietnam Corporate Style) */}
      <footer className="main-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '50px', paddingBottom: '30px' }}>
        <div className="container">
          {/* Footer Grid Columns */}
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-col-title">Cơ hội việc làm</h4>
              <div className="footer-col-links">
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>Lĩnh Vực Công Nghệ</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>Lĩnh Vực Marketing</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>Lĩnh Vực Kinh Doanh</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleViewChange('jobs'); }}>Việc Làm Nổi Bật</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Hỗ trợ ứng viên</h4>
              <div className="footer-col-links">
                <a href="#" onClick={(e) => e.preventDefault()}>Quy Trình Ứng Tuyển</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Chính Sách Bảo Mật</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Điều Khoản Sử Dụng</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Liên Hệ Trợ Giúp</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Khám phá LG</h4>
              <div className="footer-col-links">
                <a href="#" onClick={(e) => e.preventDefault()}>Về LG Electronics</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Chiến dịch "Life's Good"</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Phát Triển Bền Vững</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Trang Tin Tức LG</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Kết nối với LG</h4>
              <div className="footer-col-links">
                <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn Careers</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Facebook Tuyển Dụng</a>
                <a href="#" onClick={(e) => e.preventDefault()}>Instagram LifeAtLG</a>
                <a href="#" onClick={(e) => e.preventDefault()}>YouTube Global LG</a>
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
              &copy; {new Date().getFullYear()} LG Electronics. Bản quyền nội dung thuộc về Tập đoàn LG. Layout được mô phỏng theo cổng thông tin điện tử của LG Việt Nam.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
