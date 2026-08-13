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
  Wrench,
  ChevronRight, 
  Play,
  FileText, 
  Users,
  Heart,
  Globe,
  Zap,
  Trophy,
  Music,
  Leaf
} from 'lucide-react';

// Import Activity & Media Assets
import talentSeedsImg from '../assets/talent_seeds_drawing_sharp.jpg';
import aiSpecialistImg from '../assets/ai_specialist_sharp.png';
import warroomContestImg from '../assets/warroom_contest_sharp.jpg';
import lgGramLaunchImg from '../assets/media__1786502028937.png';
import lgBestCareImg from '../assets/media__1786502073031.png';
import affectionateAiImg from '../assets/media__1786501969961.png';

import lgAnniversaryThumb from '../assets/lg_anniversary_youtube_thumb.jpg';
import lgInsiderEp1Thumb from '../assets/lg_insider_youtube_thumb.jpg';
import lgInsiderEp2Thumb from '../assets/lg_insider_ep2_thumb.jpg';
import lgInsiderEp3Thumb from '../assets/lg_insider_ep3_thumb.jpg';

import post01Img from '../assets/post_01.png';
import post02Img from '../assets/post_02.png';
import post03Img from '../assets/post_03.png';
import post04Img from '../assets/post_04.png';
import post05Img from '../assets/post_05.png';
import post06Img from '../assets/post_06.png';
import post07Img from '../assets/post_07.png';

// LG Vietnam Activities Data — sourced from Monthly Newsletter July 2026
const lgActivities = [
  {
    icon: Award,
    tag: 'Ươm mầm tài năng',
    title: 'Talent Seeds — Ươm mầm tương lai xanh',
    desc: 'Cuộc thi nghệ thuật dành cho con em nhân viên LG. Tác phẩm đoạt giải Nhất của con gái chị Tuyết Nhung (bộ phận Mua hàng) mang thông điệp đầy cảm xúc "LG 2040 - Kiến tạo tương lai xanh cho hành tinh", mang lại niềm tự hào to lớn cho gia đình và tập thể LG.',
    color: '#e74c3c',
    img: talentSeedsImg,
    imgPosition: 'center 40%'
  },
  {
    icon: Users,
    tag: 'Đào tạo & AI',
    title: 'AI Sharing — Lan tỏa tri thức, cùng nhau phát triển',
    desc: 'Dự án đào tạo AI nội bộ (AX Project) do anh Bảo Nguyễn giảng dạy thu hút hơn 102 nhân viên tham gia qua 7 buổi học. Lớp học giúp nhân viên hiểu cách áp dụng AI để nâng tầm kinh nghiệm thực tế, giải tỏa nỗi lo bị thay thế và tăng hiệu suất làm việc.',
    color: '#2980b9',
    img: aiSpecialistImg,
    imgPosition: 'center 40%'
  },
  {
    icon: Trophy,
    tag: 'Innovation Contest',
    title: '1H 2026 WAR ROOM Contest',
    desc: 'Cuộc thi nội bộ kéo dài 8 tuần — nơi mọi nhân viên đều có thể gửi ý tưởng đột phá để cải thiện hiệu quả vận hành và kinh doanh. Hàng chục giải thưởng được trao trực tiếp từ Ban Giám Đốc. Đây là phong trào hiện thực hóa tinh thần "Bring Ideas Together, Change Our Actions."',
    color: '#e67e22',
    img: warroomContestImg,
    imgPosition: 'center 20%'
  },
  {
    icon: Zap,
    tag: 'Sự kiện sản phẩm',
    title: 'Ra mắt LG gram AI 2026 — TP. Hồ Chí Minh',
    desc: 'Ngày 29/07/2026, LG Electronics Vietnam ra mắt dòng laptop LG gram AI tại TP. HCM — chiếc laptop đầu tiên tích hợp Dual AI và vật liệu aerominium siêu nhẹ. Nhân viên được tham gia sự kiện, trải nghiệm sản phẩm và là những người đại diện đầu tiên giới thiệu công nghệ đến khách hàng.',
    color: '#8e44ad',
    img: lgGramLaunchImg,
    imgPosition: 'center 15%'
  },
  {
    icon: Heart,
    tag: 'Trải nghiệm khách hàng',
    title: 'LG Best Care — Khám phá dịch vụ tại Hà Nội',
    desc: `Ngày 18–19/07/2026, LG tổ chức sự kiện LG Best Care tại Vincom Mega Mall Royal City (Hà Nội): demo sản phẩm thực tế, tư vấn kỹ thuật trực tiếp, workshop không bán hàng và trải nghiệm Life's Good đích thực. Nhân viên đồng hành cùng đội ngũ Customer-Centric đem lại giá trị thực cho người tiêu dùng.`,
    color: '#27ae60',
    img: lgBestCareImg,
    imgPosition: 'center 5%'
  },
  {
    icon: Globe,
    tag: 'AI & Đổi mới',
    title: 'Affectionate Intelligence — AI vào thực chiến',
    desc: 'LG Electronics triển khai ứng dụng AI nội bộ "Affectionate Intelligence" — cho phép nhân viên quét sản phẩm, tra cứu thông tin kỹ thuật và cá nhân hóa trải nghiệm bán hàng theo thời gian thực. Đây là bước cụ thể hóa chiến lược AI toàn cầu của LG ngay tại thị trường Việt Nam.',
    color: '#c0392b',
    img: affectionateAiImg,
    imgPosition: 'center 30%'
  }
];

// LG Vietnam Stats — Q2 2026
const lgStats = [
  { number: 'REINVENT', label: 'Chương trình văn hóa 2026' },
  { number: '8 tuần', label: 'WAR ROOM Contest 1H/2026' },
  { number: 'Dual AI', label: 'Công nghệ LG gram AI 2026' },
  { number: 'C-A-P', label: 'Khung chiến lược toàn tổ chức' }
];

export default function JobBoard({ jobs, onSelectJob }) {
  // Search state
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All');
  const [industry, setIndustry] = useState('All');

  // Filter state
  const [salaryFilter, setSalaryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [activeQuoteZoom, setActiveQuoteZoom] = useState(null);

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
    { label: 'Marketing / PR', value: 'Marketing / PR', icon: Megaphone },
    { label: 'Kinh doanh / Sales', value: 'Sales / Business Development', icon: TrendingUp },
    { label: 'Thiết kế / Art', value: 'Design / Art', icon: Palette },
    { label: 'Hỗ trợ khách hàng', value: 'Customer Service', icon: HeartHandshake },
    { label: 'Kỹ thuật viên bảo hành', value: 'Warranty Technician', icon: Wrench }
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
      <section className="lg-vn-hero-section seonhaeng-banner">
        <div className="hero-tagline-container">
          <span className="lifes-good-badge">
            <span className="brand-text-lifes">Life's</span>
            <span className="brand-text-good">Good</span>
            <span className="brand-text-dot">.</span>
          </span>
          <span className="hero-tagline-sub">Join the Leader</span>
        </div>
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
          <Search className="input-icon" size={16} />
          <input 
            type="text" 
            placeholder="Tên công việc, từ khoá tuyển dụng..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="search-input-group select-group">
          <MapPin className="input-icon" size={16} />
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
          style={{ height: '40px', borderRadius: '30px' }}
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
                  className={`lg-product-card ${job.id === 'job-lg-4' ? 'featured-svc-card' : ''}`} 
                  onClick={() => onSelectJob(job)}
                >
                  {/* Badge */}
                  <span className={`card-badge ${job.id === 'job-lg-4' ? 'urgent' : (job.level === 'Senior' || job.level === 'Manager' ? 'hot' : '')}`}>
                    {job.id === 'job-lg-4' ? 'Tuyển Gấp' : (job.level === 'Senior' || job.level === 'Manager' ? 'Hot' : 'Mới')}
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
      {/* ====== LG VIETNAM MEDIA CENTER (ANNIVERSARY & INSIDER VIDEOS) ====== */}
      <section className="lg-media-center-section">
        <div className="media-section-header">
          <span className="media-eyebrow">LG Vietnam Media Center</span>
          <h2 className="media-main-title">Góc Truyền Thông LG Vietnam</h2>
          <p className="media-subtitle">
            Khám phá chặng đường lịch sử đầy tự hào và môi trường làm việc năng động, sáng tạo thông qua các thước phim tư liệu thực tế từ tập đoàn LG.
          </p>
        </div>

        <div className="media-grid">
          {/* Video 1: 30 Years Anniversary */}
          <div className="media-video-card">
            <a 
              href="https://www.youtube.com/watch?v=Nk1IcfRCo3A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="media-video-mockup"
            >
              <img src={lgAnniversaryThumb} alt="LG 30 Years Anniversary" className="media-thumbnail" />
              <div className="media-play-overlay">
                <Play size={28} fill="#ffffff" />
              </div>
              <span className="media-badge">Clip 30 Năm Thành Lập</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">Hành trình 30 năm LG Electronics Việt Nam</h3>
              <p className="media-card-desc">
                Thước phim tư liệu "Thấu cảm chạm Thương yêu" ghi dấu hành trình 30 năm đồng hành cùng người Việt, không ngừng cải tiến công nghệ và kiến tạo cuộc sống tốt đẹp hơn.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=Nk1IcfRCo3A" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="media-watch-link"
              >
                Xem trên YouTube <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Video 2: LG Insider Ep 1 */}
          <div className="media-video-card">
            <a 
              href="https://www.youtube.com/watch?v=rhnMLslvvsA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="media-video-mockup"
            >
              <img src={lgInsiderEp1Thumb} alt="LG Insider Ep 1" className="media-thumbnail" />
              <div className="media-play-overlay">
                <Play size={28} fill="#ffffff" />
              </div>
              <span className="media-badge">LG Insider - Tập 1</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">LG Insider - Tập 1: Hoạt động văn phòng</h3>
              <p className="media-card-desc">
                Tìm hiểu văn hóa doanh nghiệp cởi mở, các phòng ban làm việc năng động và câu chuyện của nhân viên tại văn phòng LG Electronics Việt Nam.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=rhnMLslvvsA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="media-watch-link"
              >
                Xem trên YouTube <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Video 3: LG Insider Ep 2 */}
          <div className="media-video-card">
            <a 
              href="https://www.youtube.com/watch?v=AJyg8JB6xeU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="media-video-mockup"
            >
              <img src={lgInsiderEp2Thumb} alt="LG Insider Ep 2" className="media-thumbnail" />
              <div className="media-play-overlay">
                <Play size={28} fill="#ffffff" />
              </div>
              <span className="media-badge">LG Insider - Tập 2</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">LG Insider - Tập 2: Môi trường làm việc</h3>
              <p className="media-card-desc">
                Theo chân nhân viên LG trải nghiệm văn phòng làm việc hiện đại, các khu vực tiện ích giải trí và không khí làm việc tràn đầy cảm hứng.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=AJyg8JB6xeU" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="media-watch-link"
              >
                Xem trên YouTube <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Video 4: LG Insider Ep 3 */}
          <div className="media-video-card">
            <a 
              href="https://www.youtube.com/watch?v=f2EfpcAKKWg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="media-video-mockup"
            >
              <img src={lgInsiderEp3Thumb} alt="LG Insider Ep 3" className="media-thumbnail" />
              <div className="media-play-overlay">
                <Play size={28} fill="#ffffff" />
              </div>
              <span className="media-badge">LG Insider - Tập 3</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">LG Insider - Tập 3: Phúc lợi & Hoạt động</h3>
              <p className="media-card-desc">
                Tìm hiểu các chế độ đãi ngộ hấp dẫn, căng-tin phục vụ bữa ăn đa dạng và các hoạt động nâng cao sức khỏe thể chất & tinh thần của nhân viên LG.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=f2EfpcAKKWg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="media-watch-link"
              >
                Xem trên YouTube <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* LG Insiders Quote Grid - Placed at the bottom of Media Center */}
        <div className="lg-insiders-quotes-section">
          <div className="media-section-header" style={{ marginTop: '50px', marginBottom: '25px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '10px 0' }}>
              Chia sẻ từ các thành viên LG (Insiders)
            </h3>
          </div>

          <div className="insiders-quotes-grid">
            {/* Card 1 */}
            <div className="quote-card-item" onClick={() => setActiveQuoteZoom(post01Img)} style={{ cursor: 'zoom-in' }}>
              <div className="quote-card-inner">
                <img src={post01Img} alt="LG Insider Quote 1" />
              </div>
            </div>
            {/* Card 2 */}
            <div className="quote-card-item" onClick={() => setActiveQuoteZoom(post02Img)} style={{ cursor: 'zoom-in' }}>
              <div className="quote-card-inner">
                <img src={post02Img} alt="LG Insider Quote 2" />
              </div>
            </div>
            {/* Card 3 */}
            <div className="quote-card-item" onClick={() => setActiveQuoteZoom(post03Img)} style={{ cursor: 'zoom-in' }}>
              <div className="quote-card-inner">
                <img src={post03Img} alt="LG Insider Quote 3" />
              </div>
            </div>
            {/* Card 4 */}
            <div className="quote-card-item" onClick={() => setActiveQuoteZoom(post04Img)} style={{ cursor: 'zoom-in' }}>
              <div className="quote-card-inner">
                <img src={post04Img} alt="LG Insider Quote 4" />
              </div>
            </div>
            {/* Card 5 */}
            <div className="quote-card-item" onClick={() => setActiveQuoteZoom(post05Img)} style={{ cursor: 'zoom-in' }}>
              <div className="quote-card-inner">
                <img src={post05Img} alt="LG Insider Quote 5" />
              </div>
            </div>
            {/* Card 6 */}
            <div className="quote-card-item" onClick={() => setActiveQuoteZoom(post06Img)} style={{ cursor: 'zoom-in' }}>
              <div className="quote-card-inner">
                <img src={post06Img} alt="LG Insider Quote 6" />
              </div>
            </div>
            {/* Card 7 */}
            <div className="quote-card-item" onClick={() => setActiveQuoteZoom(post07Img)} style={{ cursor: 'zoom-in' }}>
              <div className="quote-card-inner">
                <img src={post07Img} alt="LG Insider Quote 7" />
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Modal Overlay */}
        {activeQuoteZoom && (
          <div 
            className="quote-lightbox-overlay" 
            onClick={() => setActiveQuoteZoom(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              cursor: 'zoom-out'
            }}
          >
            <div 
              className="quote-lightbox-content animate-zoom-in" 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '650px', /* Click to zoom makes the card expand significantly for maximum legibility */
                width: '90%',
                aspectRatio: '1 / 1',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                border: '1.5px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <button 
                onClick={() => setActiveQuoteZoom(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '22px',
                  lineHeight: '1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  zIndex: 10
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
              >
                &times;
              </button>
              <img 
                src={activeQuoteZoom} 
                alt="LG Insider Quote Zoomed" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        )}
      </section>

      {/* ====== LG VIETNAM CULTURE SECTION ====== */}
      <section className="lg-culture-section">
        {/* Section Header */}
        <div className="culture-section-header">
          <span className="culture-eyebrow">Life At LG Vietnam</span>
          <h2 className="culture-main-title">Cuộc Sống Tại LG Vietnam</h2>
          <p className="culture-subtitle">
            Hơn là một nơi làm việc — LG là nơi bạn phát triển, kết nối và tạo ra tác động thực sự.
            Khám phá văn hóa sống động khiến hàng nghìn nhân viên tự hào gắn bó.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="culture-stats-bar">
          {lgStats.map((stat, i) => (
            <div key={i} className="culture-stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="culture-activities-grid">
          {lgActivities.map((activity, i) => {
            const IconComponent = activity.icon;
            return (
              <div key={i} className="culture-activity-card">
                {/* Real photo from newsletter */}
                <div className="activity-img-wrap">
                  <img
                    src={activity.img}
                    alt={activity.title}
                    className="activity-img"
                    style={{ objectPosition: activity.imgPosition || 'center center' }}
                  />
                  <div className="activity-img-overlay" style={{ background: `linear-gradient(to bottom, transparent 40%, ${activity.color}22 100%)` }} />
                  <div className="activity-tag-overlay" style={{ color: activity.color, background: `${activity.color}18`, border: `1px solid ${activity.color}40` }}>
                    {activity.tag}
                  </div>
                </div>
                {/* Card body */}
                <div className="activity-card-body">
                  <div className="activity-icon-wrap" style={{ background: `${activity.color}18`, border: `1.5px solid ${activity.color}40` }}>
                    <IconComponent size={22} style={{ color: activity.color }} />
                  </div>
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-desc">{activity.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lifestyle Promotion Cards Section (LG VN Style) */}
      <section className="lg-promo-grid lg-promo-grid-3">
        <div
          className="lg-promo-card"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')` }}
        >
          <div className="promo-content">
            <span className="promo-tag">Life's Good Campaign</span>
            <h3 className="promo-title">Không gian phát triển toàn diện</h3>
            <p className="promo-desc">
              Tại LG, chúng tôi tin rằng mỗi cá nhân đều ẩn chứa tài năng độc đáo. Chương trình mentoring 1-on-1 cùng quản lý cấp cao, và văn hóa phản hồi liên tục giúp bạn tiến bộ từng ngày.
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
              Làm việc trực tiếp với Expat Manager người Hàn Quốc và đội ngũ quốc tế. Cơ hội luân chuyển sang văn phòng LG tại Seoul, Singapore và hơn 120 quốc gia trên thế giới.
            </p>
            <a href="#" className="promo-btn" onClick={(e) => { e.preventDefault(); alert('LG mang lại lộ trình thăng tiến rõ ràng, kết nối toàn cầu và cơ hội luân chuyển công tác nước ngoài.'); }}>
              Xem chính sách nhân sự <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div
          className="lg-promo-card"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80')` }}
        >
          <div className="promo-content">
            <span className="promo-tag">ESG & Bền Vững</span>
            <h3 className="promo-title">Kiến tạo tương lai xanh cùng LG</h3>
            <p className="promo-desc">
              LG cam kết đạt Carbon Neutral vào 2030. Tham gia đội ngũ tiên phong sản xuất sản phẩm thân thiện môi trường và chương trình CSR trao học bổng, xây dựng cộng đồng tại Việt Nam.
            </p>
            <a href="#" className="promo-btn" onClick={(e) => { e.preventDefault(); alert('LG cam kết Net Zero Carbon vào 2030 và đầu tư mạnh vào ESG tại Việt Nam.'); }}>
              Xem cam kết ESG <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
