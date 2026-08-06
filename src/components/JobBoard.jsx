import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  RefreshCw, 
  Calendar, 
  DollarSign, 
  Award, 
  Code, 
  Megaphone, 
  TrendingUp, 
  Palette, 
  HeartHandshake, 
  ChevronRight, 
  FileText, 
  Users 
} from 'lucide-react';

export default function JobBoard({ jobs, onSelectJob }) {
  // Search state
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All');
  const [industry, setIndustry] = useState('All');

  // Filter state
  const [salaryFilter, setSalaryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');

  // Reset all filters and search fields
  const handleResetFilters = () => {
    setKeyword('');
    setLocation('All');
    setIndustry('All');
    setSalaryFilter('All');
    setTypeFilter('All');
    setLevelFilter('All');
  };

  // Locations & Industries
  const locations = ['All', 'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Remote'];
  
  // Custom mapping for department circles (LG VN Product Categories style)
  const departmentCircles = [
    { label: 'Tất Cả Ngành', value: 'All', icon: Briefcase },
    { label: 'R&D / Công nghệ', value: 'IT - Software', icon: Code },
    { label: 'Marketing / PR', value: 'Marketing / PR', icon: Megaphone },
    { label: 'Kinh doanh / Sales', value: 'Sales / Business Development', icon: TrendingUp },
    { label: 'Thiết kế / Art', value: 'Design / Art', icon: Palette },
    { label: 'Hỗ trợ khách hàng', value: 'Customer Service', icon: HeartHandshake }
  ];

  // Helper to parse salary range for filtering
  const matchesSalaryRange = (jobSalary, filterValue) => {
    if (filterValue === 'All') return true;
    const cleanSalary = jobSalary.replace(/[^0-9-]/g, ''); 
    const parts = cleanSalary.split('-');
    if (parts.length < 2) return true; 
    
    const minSalary = parseInt(parts[0], 10);
    const maxSalary = parseInt(parts[1], 10);

    if (filterValue === 'under-1000') {
      return minSalary < 1000;
    } else if (filterValue === '1000-2000') {
      return (minSalary >= 1000 && minSalary <= 2000) || (maxSalary >= 1000 && maxSalary <= 2000) || (minSalary <= 1000 && maxSalary >= 2000);
    } else if (filterValue === 'above-2000') {
      return maxSalary > 2000;
    }
    return true;
  };

  // Filtered jobs memo
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesKeyword = 
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(keyword.toLowerCase()) ||
        job.industry.toLowerCase().includes(keyword.toLowerCase());

      const matchesLocation = location === 'All' || job.location === location;
      const matchesIndustry = industry === 'All' || job.industry === industry;
      const matchesType = typeFilter === 'All' || job.type === typeFilter;
      const matchesLevel = levelFilter === 'All' || job.level === levelFilter;
      const matchesSalary = matchesSalaryRange(job.salary, salaryFilter);

      return matchesKeyword && matchesLocation && matchesIndustry && matchesType && matchesLevel && matchesSalary;
    });
  }, [jobs, keyword, location, industry, typeFilter, levelFilter, salaryFilter]);

  return (
    <div className="job-board-wrapper">
      {/* Hero lifestyle Banner (LG Vietnam Style) */}
      <section className="lg-vn-hero-section">
        <span className="hero-tagline">Life's Good. Join the Leader.</span>
        <h1 className="hero-main-title">
          CÙNG LG KIẾN TẠO<br />CUỘC SỐNG TỐT ĐẸP HƠN
        </h1>
        <p className="hero-desc">
          Khám phá những cơ hội nghề nghiệp đột phá tại Tập đoàn công nghệ hàng đầu thế giới. Nơi năng lực của bạn được thăng hoa và ghi nhận xứng đáng.
        </p>
        <div className="hero-btn-row">
          <button 
            className="btn-pill-primary"
            onClick={() => {
              window.scrollTo({ top: 600, behavior: 'smooth' });
            }}
          >
            Tìm việc ngay
          </button>
          <button 
            className="btn-pill-secondary"
            onClick={() => alert('Chào mừng bạn đến với LG! Với sứ mệnh "Life\'s Good", chúng tôi không ngừng cải tiến công nghệ và mang đến không gian làm việc đa văn hóa, sáng tạo vượt trội.')}
          >
            Về văn hóa LG
          </button>
        </div>
      </section>

      {/* Floating GNB Search Bar Overlay */}
      <div className="search-bar-overlay">
        <div className="search-input-group">
          <Search className="input-icon" size={18} />
          <input 
            type="text" 
            placeholder="Tên công việc, từ khoá tuyển dụng..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="search-input-group select-group">
          <MapPin className="input-icon" size={18} />
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            className="search-select"
          >
            <option value="All">Tất cả địa điểm</option>
            {locations.filter(loc => loc !== 'All').map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <button 
          className="btn-search-submit"
          onClick={() => {
            window.scrollTo({ top: 950, behavior: 'smooth' });
          }}
          style={{ height: '52px', borderRadius: '30px' }}
        >
          Tìm kiếm
        </button>
      </div>

      {/* Category Circles (LG VN Category Icons Style) */}
      <section className="category-circle-section">
        <h2 className="category-circle-title">Tìm kiếm cơ hội theo lĩnh vực</h2>
        <div className="category-circle-grid">
          {departmentCircles.map((circle) => {
            const IconComponent = circle.icon;
            const isActive = industry === circle.value;
            return (
              <div 
                key={circle.value} 
                className={`category-circle-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setIndustry(circle.value);
                  window.scrollTo({ top: 950, behavior: 'smooth' });
                }}
              >
                <div className="circle-icon-box">
                  <IconComponent size={32} />
                </div>
                <span className="circle-text">{circle.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Board Layout */}
      <div className="board-main-container" style={{ marginTop: '0px' }}>
        {/* Sidebar Filters */}
        <aside className="filters-sidebar" style={{ top: '150px' }}>
          <div className="sidebar-header">
            <div className="sidebar-title-group">
              <Filter size={16} />
              <h3 style={{ fontSize: '15px' }}>Bộ lọc tìm kiếm</h3>
            </div>
            <button className="btn-reset-filters" onClick={handleResetFilters}>
              <RefreshCw size={12} />
              Đặt lại
            </button>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">
              <DollarSign size={14} /> Mức lương tháng
            </h4>
            <div className="filter-options">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="salary" 
                  checked={salaryFilter === 'All'} 
                  onChange={() => setSalaryFilter('All')} 
                />
                Tất cả mức lương
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="salary" 
                  checked={salaryFilter === 'under-1000'} 
                  onChange={() => setSalaryFilter('under-1000')} 
                />
                Dưới 1,000 USD
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="salary" 
                  checked={salaryFilter === '1000-2000'} 
                  onChange={() => setSalaryFilter('1000-2000')} 
                />
                1,000 - 2,000 USD
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="salary" 
                  checked={salaryFilter === 'above-2000'} 
                  onChange={() => setSalaryFilter('above-2000')} 
                />
                Trên 2,000 USD
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">
              <Briefcase size={14} /> Hình thức làm việc
            </h4>
            <div className="filter-options">
              {['All', 'Full-time', 'Part-time', 'Remote', 'Contract'].map(type => (
                <label key={type} className="radio-label">
                  <input 
                    type="radio" 
                    name="type" 
                    checked={typeFilter === type} 
                    onChange={() => setTypeFilter(type)} 
                  />
                  {type === 'All' ? 'Tất cả hình thức' : type}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Listings Content */}
        <main className="job-listings-main">
          {/* Tab Selection Row (LG VN Product Tab Bar Style) */}
          <div className="lg-tabs-container">
            {[
              { label: 'Tất cả cấp bậc', value: 'All' },
              { label: 'Thực tập sinh', value: 'Intern' },
              { label: 'Chuyên viên / Junior', value: 'Junior' },
              { label: 'Chuyên viên chính / Middle', value: 'Middle' },
              { label: 'Chuyên viên cao cấp / Senior', value: 'Senior' },
              { label: 'Quản lý / Manager', value: 'Manager' }
            ].map(tab => (
              <div 
                key={tab.value}
                className={`lg-tab-btn ${levelFilter === tab.value ? 'active' : ''}`}
                onClick={() => setLevelFilter(tab.value)}
              >
                {tab.label}
              </div>
            ))}
          </div>

          <div className="listings-info-bar" style={{ marginBottom: '16px' }}>
            <p className="results-count">
              Tìm thấy <strong className="highlight-text">{filteredJobs.length}</strong> cơ hội việc làm phù hợp
            </p>
          </div>

          {/* Product-style Job Cards Grid */}
          <div className="job-cards-grid product-cards-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className="lg-product-card" 
                  onClick={() => onSelectJob(job)}
                >
                  {/* Badge */}
                  <span className={`card-badge ${job.level === 'Senior' || job.level === 'Manager' ? 'hot' : ''}`}>
                    {job.level === 'Senior' || job.level === 'Manager' ? 'Hot' : 'Mới'}
                  </span>

                  {/* Logo Container */}
                  <div className="lg-card-logo-container">
                    <img 
                      src={job.logo || "https://placehold.co/100x100/0f2c59/ffffff?text=Logo"} 
                      alt={job.company} 
                      className="lg-card-logo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/200px-LG_logo_%282015%29.svg.png";
                      }}
                    />
                  </div>

                  {/* Title & Company */}
                  <h3 className="lg-card-title">{job.title}</h3>
                  <p className="lg-card-company">{job.company}</p>

                  {/* Salary price tag */}
                  <div className="lg-card-price-tag">
                    {job.salary}
                  </div>

                  {/* Info details */}
                  <div className="lg-card-info-list">
                    <div className="lg-card-info-item">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                    <div className="lg-card-info-item">
                      <Briefcase size={14} />
                      <span>{job.type} • {job.industry}</span>
                    </div>
                    <div className="lg-card-info-item">
                      <Calendar size={14} />
                      <span>Đăng ngày: {job.postedAt}</span>
                    </div>
                  </div>

                  {/* Buy/Learn button row */}
                  <div className="lg-card-btn-row">
                    <button className="lg-btn-buy">
                      Ứng tuyển
                    </button>
                    <button className="lg-btn-learn">
                      Chi tiết
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-results-box" style={{ gridColumn: '1 / -1' }}>
                <div className="empty-icon">📂</div>
                <h3>Không tìm thấy công việc phù hợp</h3>
                <p>Thử điều chỉnh lại từ khoá tìm kiếm hoặc đặt lại bộ lọc để tìm được nhiều việc làm hơn.</p>
                <button className="btn-clear-all" onClick={handleResetFilters}>
                  Xoá tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Lifestyle Promotion Cards Section (LG VN Style) */}
      <section className="lg-promo-grid">
        <div 
          className="lg-promo-card" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')` }}
        >
          <div className="promo-content">
            <span className="promo-tag">Life's Good Campaign</span>
            <h3 className="promo-title">Không gian phát triển toàn diện</h3>
            <p className="promo-desc">
              Tại LG, chúng tôi tin rằng mỗi cá nhân đều ẩn chứa tài năng độc đáo. Chúng tôi mang đến môi trường hỗ trợ tối đa để bạn hiện thực hóa đam mê.
            </p>
            <a href="#" className="promo-btn" onClick={(e) => { e.preventDefault(); alert('Chiến dịch "Life\'s Good" truyền cảm hứng về thái độ sống tích cực và sự tận tâm tạo nên giá trị tốt đẹp cho cộng đồng.'); }}>
              Khám phá thêm <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div 
          className="lg-promo-card" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80')` }}
        >
          <div className="promo-content">
            <span className="promo-tag">Global Career</span>
            <h3 className="promo-title">Môi trường làm việc đa quốc gia</h3>
            <p className="promo-desc">
              Hệ thống đào tạo và phát triển tài năng chuẩn quốc tế. Mở rộng góc nhìn toàn cầu và hợp tác cùng các chuyên gia hàng đầu.
            </p>
            <a href="#" className="promo-btn" onClick={(e) => { e.preventDefault(); alert('LG mang lại lộ trình thăng tiến rõ ràng, kết nối toàn cầu và cơ hội luân chuyển công tác nước ngoài.'); }}>
              Xem chính sách nhân sự <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
