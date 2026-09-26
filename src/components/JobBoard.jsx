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
import lg31stBannerImg from '../assets/lg_31st_anniversary_banner.webp';
import lg31stMasterCoverImg from '../assets/lg_31st_master_cover.webp';
import lg31stBannerBlurImg from '../assets/lg_31st_anniversary_blur.webp';
import talentSeedsImg from '../assets/talent_seeds_drawing_sharp.webp';
import aiSpecialistImg from '../assets/ai_specialist_sharp.webp';
import warroomContestImg from '../assets/warroom_contest_sharp.webp';
import lgTeamGroupImg from '../assets/lg_team_group.webp';
import lgTechnicianImg from '../assets/lg_technician.webp';
import lgGramLaunchImg from '../assets/media__1786502028937.webp';
import lgBestCareImg from '../assets/media__1786502073031.webp';
import affectionateAiImg from '../assets/media__1786501969961.webp';
import CVTemplatesSection from './CVTemplatesSection';
import { useLanguage } from '../LanguageContext';

import lgAnniversaryThumb from '../assets/lg_anniversary_youtube_thumb.webp';
import lgInsiderEp1Thumb from '../assets/lg_insider_youtube_thumb.webp';
import lgInsiderEp2Thumb from '../assets/lg_insider_ep2_thumb.webp';
import lgInsiderEp3Thumb from '../assets/lg_insider_ep3_thumb.webp';

import post01Img from '../assets/post_01.webp';
import post02Img from '../assets/post_02.webp';
import post03Img from '../assets/post_03.webp';
import post04Img from '../assets/post_04.webp';
import post05Img from '../assets/post_05.webp';
import post06Img from '../assets/post_06.webp';
import post07Img from '../assets/post_07.webp';

// LG Vietnam Activities Data — sourced from Monthly Newsletter July 2026
const lgActivities = [
  {
    icon: Award,
    tag: 'Ươm mầm tài năng',
    tagEn: 'Nurturing Talent',
    title: 'Talent Seeds — Ươm mầm tương lai xanh',
    titleEn: 'Talent Seeds — Nurturing a Greener Future',
    desc: 'Cuộc thi nghệ thuật dành cho con em nhân viên LG. Tác phẩm đoạt giải Nhất của con gái chị Tuyết Nhung (bộ phận Mua hàng) mang thông điệp đầy cảm xúc "LG 2040 - Kiến tạo tương lai xanh cho hành tinh", mang lại niềm tự hào to lớn cho gia đình và tập thể LG.',
    descEn: 'An art contest for the children of LG employees. The first-prize entry by the daughter of Ms. Tuyet Nhung (Procurement) carried the moving message "LG 2040 - Building a Greener Future for the Planet", bringing great pride to her family and the LG community.',
    color: '#e74c3c',
    img: talentSeedsImg,
    imgPosition: 'center 40%'
  },
  {
    icon: Users,
    tag: 'Đào tạo & AI',
    tagEn: 'Training & AI',
    title: 'AI Sharing — Lan tỏa tri thức, cùng nhau phát triển',
    titleEn: 'AI Sharing — Spreading Knowledge, Growing Together',
    desc: 'Dự án đào tạo AI nội bộ (AX Project) do anh Bảo Nguyễn giảng dạy thu hút hơn 102 nhân viên tham gia qua 7 buổi học. Lớp học giúp nhân viên hiểu cách áp dụng AI để nâng tầm kinh nghiệm thực tế, giải tỏa nỗi lo bị thay thế và tăng hiệu suất làm việc.',
    descEn: 'The internal AI training initiative (AX Project) led by Mr. Bao Nguyen drew over 102 employees across 7 sessions. The program helped staff apply AI in real work, ease concerns about being replaced, and boost productivity.',
    color: '#2980b9',
    img: aiSpecialistImg,
    imgPosition: 'center 40%'
  },
  {
    icon: Trophy,
    tag: 'Innovation Contest',
    tagEn: 'Innovation Contest',
    title: '1H 2026 WAR ROOM Contest',
    titleEn: '1H 2026 WAR ROOM Contest',
    desc: 'Cuộc thi nội bộ kéo dài 8 tuần — nơi mọi nhân viên đều có thể gửi ý tưởng đột phá để cải thiện hiệu quả vận hành và kinh doanh. Hàng chục giải thưởng được trao trực tiếp từ Ban Giám Đốc. Đây là phong trào hiện thực hóa tinh thần "Bring Ideas Together, Change Our Actions."',
    descEn: 'An 8-week internal contest where every employee can submit breakthrough ideas to improve operations and business performance. Dozens of prizes were awarded directly by the Board of Directors, bringing the spirit of "Bring Ideas Together, Change Our Actions" to life.',
    color: '#e67e22',
    img: warroomContestImg,
    imgPosition: 'center 20%'
  },
  {
    icon: Zap,
    tag: 'Sự kiện sản phẩm',
    tagEn: 'Product Launch',
    title: 'Ra mắt LG gram AI 2026 — TP. Hồ Chí Minh',
    titleEn: 'LG gram AI 2026 Launch — Ho Chi Minh City',
    desc: 'Ngày 29/07/2026, LG Electronics Vietnam ra mắt dòng laptop LG gram AI tại TP. HCM — chiếc laptop đầu tiên tích hợp Dual AI và vật liệu aerominium siêu nhẹ. Nhân viên được tham gia sự kiện, trải nghiệm sản phẩm và là những người đại diện đầu tiên giới thiệu công nghệ đến khách hàng.',
    descEn: 'On July 29, 2026, LG Electronics Vietnam launched the LG gram AI laptop line in Ho Chi Minh City — the first laptop with Dual AI and ultra-light aerominium material. Employees joined the event, experienced the product first-hand, and were the first to introduce the technology to customers.',
    color: '#8e44ad',
    img: lgGramLaunchImg,
    imgPosition: 'center 15%'
  },
  {
    icon: Heart,
    tag: 'Trải nghiệm khách hàng',
    tagEn: 'Customer Experience',
    title: 'LG Best Care — Khám phá dịch vụ tại Hà Nội',
    titleEn: 'LG Best Care — Service Experience in Hanoi',
    desc: `Ngày 18–19/07/2026, LG tổ chức sự kiện LG Best Care tại Vincom Mega Mall Royal City (Hà Nội): demo sản phẩm thực tế, tư vấn kỹ thuật trực tiếp, workshop không bán hàng và trải nghiệm dịch vụ đích thực. Nhân viên đồng hành cùng đội ngũ Customer-Centric đem lại giá trị thực cho người tiêu dùng.`,
    descEn: `On July 18-19, 2026, LG held the LG Best Care event at Vincom Mega Mall Royal City (Hanoi): live product demos, direct technical consultation, a no-selling workshop, and an authentic service experience. Employees joined the Customer-Centric team to deliver real value to consumers.`,
    color: '#27ae60',
    img: lgBestCareImg,
    imgPosition: 'center 5%'
  },
  {
    icon: Globe,
    tag: 'AI & Đổi mới',
    tagEn: 'AI & Innovation',
    title: 'Affectionate Intelligence — AI vào thực chiến',
    titleEn: 'Affectionate Intelligence — AI in Action',
    desc: 'LG Electronics triển khai ứng dụng AI nội bộ "Affectionate Intelligence" — cho phép nhân viên quét sản phẩm, tra cứu thông tin kỹ thuật và cá nhân hóa trải nghiệm bán hàng theo thời gian thực. Đây là bước cụ thể hóa chiến lược AI toàn cầu của LG ngay tại thị trường Việt Nam.',
    descEn: 'LG Electronics rolled out the internal "Affectionate Intelligence" app — letting employees scan products, look up technical information, and personalize the sales experience in real time. It is a concrete step in bringing LG\'s global AI strategy to the Vietnam market.',
    color: '#c0392b',
    img: affectionateAiImg,
    imgPosition: 'center 30%'
  }
];

// LG Vietnam Stats — Q2 2026
const lgStats = [
  { number: 'REINVENT', label: 'Chương trình văn hóa 2026', labelEn: '2026 Culture Program' },
  { number: '8 tuần', numberEn: '8 weeks', label: 'WAR ROOM Contest 1H/2026', labelEn: 'WAR ROOM Contest 1H/2026' },
  { number: 'Dual AI', label: 'Công nghệ LG gram AI 2026', labelEn: 'LG gram AI 2026 Technology' },
  { number: 'C-A-P', label: 'Khung chiến lược toàn tổ chức', labelEn: 'Company-wide Strategy Framework' }
];

export default function JobBoard({ jobs, onSelectJob }) {
  const { lang, t } = useLanguage();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All');
  const [industry, setIndustry] = useState('All');
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
    { label: lang === 'vi' ? 'Tất Cả Ngành' : 'All Sectors', value: 'All', icon: Briefcase },
    { label: lang === 'vi' ? 'Marketing / PR' : 'Marketing & PR', value: 'Marketing / PR', icon: Megaphone },
    { label: lang === 'vi' ? 'Kinh doanh / Sales' : 'Sales & Business', value: 'Sales / Business Development', icon: TrendingUp },
    { label: lang === 'vi' ? 'Thiết kế / Art' : 'Design & Creative', value: 'Design / Art', icon: Palette },
    { label: lang === 'vi' ? 'Hỗ trợ khách hàng' : 'Customer Support', value: 'Customer Service', icon: HeartHandshake },
    { label: lang === 'vi' ? 'Kỹ thuật viên bảo hành' : 'Warranty Service', value: 'Warranty Technician', icon: Wrench }
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

  // Filtered jobs memo with AI Semantic Synonym Expansion
  const filteredJobs = useMemo(() => {
    const synonymsMap = {
      'ai': ['trí tuệ nhân tạo', 'machine learning', 'ax project', 'smart', 'intelligence'],
      'trí tuệ nhân tạo': ['ai', 'machine learning', 'ax project', 'smart', 'intelligence'],
      'mua hàng': ['procurement', 'purchasing', 'scm', 'cung ứng', 'buyer'],
      'procurement': ['mua hàng', 'purchasing', 'scm', 'cung ứng', 'buyer'],
      'bán hàng': ['sales', 'marketing', 'retail', 'kinh doanh', 'thương mại'],
      'sales': ['bán hàng', 'marketing', 'retail', 'kinh doanh', 'thương mại'],
      'kỹ thuật': ['technician', 'kỹ sư', 'engineer', 'bảo hành', 'service'],
      'kỹ sư': ['technician', 'kỹ thuật', 'engineer', 'bảo hành', 'service'],
      'engineer': ['technician', 'kỹ thuật', 'kỹ sư', 'bảo hành', 'service'],
      'tài chính': ['finance', 'kế toán', 'accounting', 'ngân sách'],
      'finance': ['tài chính', 'kế toán', 'accounting', 'ngân sách']
    };

    const kw = keyword.toLowerCase().trim();
    let searchTerms = [kw];
    
    if (kw) {
      Object.keys(synonymsMap).forEach(key => {
        if (kw.includes(key)) {
          searchTerms = [...searchTerms, ...synonymsMap[key]];
        }
      });
    }

    return jobs.filter(job => {
      const reqText = Array.isArray(job.requirements) ? job.requirements.join(' ') : (job.requirements || '');
      const fullJobText = `${job.title} ${job.company} ${job.description} ${job.industry} ${job.location} ${reqText}`.toLowerCase();
      const matchesKeyword = !kw || searchTerms.some(term => fullJobText.includes(term));

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

      {/* Hero lifestyle Banner (Bright Pearl Centered Banner Style) */}
      <section className="lg-vn-hero-section anniversary-hero-banner-light-center">
        {/* Centered Photo Layer: Dead Center of Entire Banner */}
        <div className="hero-photo-centered-banner">
          <img 
            src={lg31stBannerImg} 
            alt="LG Vietnam 31st Anniversary Celebration" 
            className="hero-centered-photo-img" 
          />
        </div>

        {/* Compact Glass Content Card on Left */}
        <div className="hero-center-text-card">
          <div className="hero-tagline-container">
            <span className="hero-anniversary-tag-light">
              {t('anniversaryTag')}
            </span>
          </div>
          <h1 className="hero-main-title-light">
            <span className="hero-title-single-line">{t('heroTitleLine1')}</span>
            <span className="text-highlight-red">{t('heroTitleLine2')}</span>
          </h1>
          <p className="hero-desc-light">
            {t('heroDesc')}
          </p>
          <div className="hero-btn-row">
            <button 
              className="btn-pill-primary-lg"
              onClick={() => {
                window.scrollTo({ top: 650, behavior: 'smooth' });
              }}
            >
              {t('btnFindJobsNow')}
            </button>
            <button 
              className="btn-pill-outline-lg"
              onClick={() => alert(lang === 'vi' ? 'Văn hóa LG "Life\'s Good" chào đón bạn đến với môi trường làm việc sáng tạo, cởi mở và tràn đầy năng lượng!' : 'LG "Life\'s Good" culture welcomes you to a creative, open, and energetic work environment!')}
            >
              {t('btnAboutCulture')}
            </button>
          </div>
        </div>
      </section>

      {/* Floating GNB Search Bar Overlay */}
      <div className="search-bar-container container">
        <div className="search-bar-overlay">
          <div className="search-input-group">
            <Search className="input-icon" size={16} />
            <input 
              type="text" 
              placeholder={t('searchKeywordPlaceholder')}
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
              <option value="All">{t('allLocations')}</option>
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
            {t('btnSearchSubmit')}
          </button>
        </div>
      </div>

      {/* Category Circles (LG VN Category Icons Style) */}
      <section className="category-circle-section">
        <h2 className="category-circle-title">{lang === 'vi' ? 'Tìm kiếm cơ hội theo lĩnh vực' : 'Search Opportunities by Field'}</h2>
        <div className="category-circle-grid">
          {departmentCircles.map((circle) => {
            const IconComponent = circle.icon;
            const isActive = industry === circle.value;
            return (
              <div 
                key={circle.value} 
                className={`category-circle-item ${isActive ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={lang === 'vi' ? `Lọc theo ngành ${circle.label}` : `Filter by ${circle.label}`}
                onClick={() => {
                  setIndustry(circle.value);
                  window.scrollTo({ top: 950, behavior: 'smooth' });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIndustry(circle.value);
                    window.scrollTo({ top: 950, behavior: 'smooth' });
                  }
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
              <h3 style={{ fontSize: '15px' }}>{lang === 'vi' ? 'Bộ lọc tìm kiếm' : 'Search Filters'}</h3>
            </div>
            <button className="btn-reset-filters" onClick={handleResetFilters}>
              <RefreshCw size={12} />
              {lang === 'vi' ? 'Đặt lại' : 'Reset'}
            </button>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">
              <DollarSign size={14} /> {lang === 'vi' ? 'Mức lương tháng' : 'Monthly Salary'}
            </h4>
            <div className="filter-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="salary"
                  checked={salaryFilter === 'All'}
                  onChange={() => setSalaryFilter('All')}
                />
                {lang === 'vi' ? 'Tất cả mức lương' : 'All Salaries'}
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="salary"
                  checked={salaryFilter === 'under-1000'}
                  onChange={() => setSalaryFilter('under-1000')}
                />
                {lang === 'vi' ? 'Dưới 1,000 USD' : 'Under 1,000 USD'}
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
                {lang === 'vi' ? 'Trên 2,000 USD' : 'Above 2,000 USD'}
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">
              <Briefcase size={14} /> {lang === 'vi' ? 'Hình thức làm việc' : 'Employment Type'}
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
                  {type === 'All' ? (lang === 'vi' ? 'Tất cả hình thức' : 'All Types') : type}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Listings Content */}
        <main className="job-listings-main">
          {/* Tab Selection Row (LG VN Product Tab Bar Style) */}
          <div className="lg-tabs-container">
            {(lang === 'vi' ? [
              { label: 'Tất cả cấp bậc', value: 'All' },
              { label: 'Thực tập sinh', value: 'Intern' },
              { label: 'Chuyên viên / Junior', value: 'Junior' },
              { label: 'Chuyên viên chính / Middle', value: 'Middle' },
              { label: 'Chuyên viên cao cấp / Senior', value: 'Senior' },
              { label: 'Quản lý / Manager', value: 'Manager' }
            ] : [
              { label: 'All Levels', value: 'All' },
              { label: 'Intern', value: 'Intern' },
              { label: 'Junior', value: 'Junior' },
              { label: 'Middle', value: 'Middle' },
              { label: 'Senior', value: 'Senior' },
              { label: 'Manager', value: 'Manager' }
            ]).map(tab => (
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
              {lang === 'vi'
                ? <>Tìm thấy <strong className="highlight-text">{filteredJobs.length}</strong> cơ hội việc làm phù hợp</>
                : <>Found <strong className="highlight-text">{filteredJobs.length}</strong> matching job opportunities</>}
            </p>
          </div>

          {/* Product-style Job Cards Grid */}
          <div className="job-cards-grid product-cards-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => {
                const jobTitle = lang === 'en' ? (job.titleEn || job.title) : job.title;
                const companyName = lang === 'en' ? (job.companyEn || job.company) : job.company;
                const jobLoc = lang === 'en' ? (job.locationEn || job.location) : job.location;
                
                return (
                  <div 
                    key={job.id} 
                    className={`lg-product-card ${job.id === 'job-lg-4' ? 'featured-svc-card' : ''}`} 
                    onClick={() => onSelectJob(job)}
                  >
                    {/* Badge */}
                    <span className={`card-badge ${job.id === 'job-lg-4' ? 'urgent' : (job.level === 'Senior' || job.level === 'Manager' ? 'hot' : '')}`}>
                      {job.id === 'job-lg-4' 
                        ? (lang === 'vi' ? 'Tuyển Gấp' : 'Urgent') 
                        : (job.level === 'Senior' || job.level === 'Manager' ? 'Hot' : (lang === 'vi' ? 'Mới' : 'New'))
                      }
                    </span>

                    {/* Logo Container */}
                    <div className="lg-card-logo-container">
                      <img 
                        src={job.logo || aiSpecialistImg} 
                        alt={companyName} 
                        className="lg-card-logo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = aiSpecialistImg;
                        }}
                      />
                    </div>

                    {/* Title & Company */}
                    <h3 className="lg-card-title">{jobTitle}</h3>
                    <p className="lg-card-company">{companyName}</p>

                    {/* Salary price tag */}
                    <div className="lg-card-price-tag">
                      {job.salary}
                    </div>

                    {/* Info details */}
                    <div className="lg-card-info-list">
                      <div className="lg-card-info-item">
                        <MapPin size={14} />
                        <span>{jobLoc}</span>
                      </div>
                      <div className="lg-card-info-item">
                        <Briefcase size={14} />
                        <span>{job.type} • {job.industry}</span>
                      </div>
                      <div className="lg-card-info-item">
                        <Calendar size={14} />
                        <span>{t('postedDate')}: {job.postedAt}</span>
                      </div>
                    </div>

                    {/* Buy/Learn button row */}
                    <div className="lg-card-btn-row">
                      <button className="lg-btn-buy">
                        {t('btnApplyNow')}
                      </button>
                      <button className="lg-btn-learn">
                        {t('btnViewDetails')}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-results-box" style={{ gridColumn: '1 / -1' }}>
                <div className="empty-icon">📂</div>
                <h3>{lang === 'vi' ? 'Không tìm thấy công việc phù hợp' : 'No matching jobs found'}</h3>
                <p>{lang === 'vi' ? 'Thử điều chỉnh lại từ khoá tìm kiếm hoặc đặt lại bộ lọc để tìm được nhiều việc làm hơn.' : 'Try adjusting your search keywords or resetting filters to discover more open roles.'}</p>
                <button className="btn-clear-all" onClick={handleResetFilters}>
                  {t('btnResetFilters')}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ====== LG STANDARD CV TEMPLATES RESOURCE HUB ====== */}
      <CVTemplatesSection />

      {/* ====== LG VIETNAM MEDIA CENTER (ANNIVERSARY & INSIDER VIDEOS) ====== */}
      <section className="lg-media-center-section">
        <div className="media-section-header">
          <span className="media-eyebrow">LG Vietnam Media Center</span>
          <h2 className="media-main-title">{t('mediaCenterTitle')}</h2>
          <p className="media-subtitle">{t('mediaCenterSubtitle')}</p>
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
              <span className="media-badge">{lang === 'vi' ? 'Clip 30 Năm Thành Lập' : '30th Anniversary Clip'}</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">{lang === 'vi' ? 'Hành trình 30 năm LG Electronics Việt Nam' : '30 Years of LG Electronics Vietnam'}</h3>
              <p className="media-card-desc">
                {lang === 'vi'
                  ? 'Thước phim tư liệu "Thấu cảm chạm Thương yêu" ghi dấu hành trình 30 năm đồng hành cùng người Việt, không ngừng cải tiến công nghệ và kiến tạo cuộc sống tốt đẹp hơn.'
                  : 'The documentary "Empathy Touches Love" traces 30 years alongside Vietnamese people, continuously innovating technology and building a better life.'}
              </p>
              <a
                href="https://www.youtube.com/watch?v=Nk1IcfRCo3A"
                target="_blank"
                rel="noopener noreferrer"
                className="media-watch-link"
              >
                {lang === 'vi' ? 'Xem trên YouTube' : 'Watch on YouTube'} <ChevronRight size={14} />
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
              <span className="media-badge">{lang === 'vi' ? 'LG Insider - Tập 1' : 'LG Insider - Ep 1'}</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">{lang === 'vi' ? 'LG Insider - Tập 1: Hoạt động văn phòng' : 'LG Insider - Ep 1: Office Life'}</h3>
              <p className="media-card-desc">
                {lang === 'vi'
                  ? 'Tìm hiểu văn hóa doanh nghiệp cởi mở, các phòng ban làm việc năng động và câu chuyện của nhân viên tại văn phòng LG Electronics Việt Nam.'
                  : 'Discover an open corporate culture, dynamic departments, and employee stories at LG Electronics Vietnam offices.'}
              </p>
              <a
                href="https://www.youtube.com/watch?v=rhnMLslvvsA"
                target="_blank"
                rel="noopener noreferrer"
                className="media-watch-link"
              >
                {lang === 'vi' ? 'Xem trên YouTube' : 'Watch on YouTube'} <ChevronRight size={14} />
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
              <span className="media-badge">{lang === 'vi' ? 'LG Insider - Tập 2' : 'LG Insider - Ep 2'}</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">{lang === 'vi' ? 'LG Insider - Tập 2: Môi trường làm việc' : 'LG Insider - Ep 2: Work Environment'}</h3>
              <p className="media-card-desc">
                {lang === 'vi'
                  ? 'Theo chân nhân viên LG trải nghiệm văn phòng làm việc hiện đại, các khu vực tiện ích giải trí và không khí làm việc tràn đầy cảm hứng.'
                  : 'Follow LG employees through a modern workplace, recreational amenities, and an inspiring working atmosphere.'}
              </p>
              <a
                href="https://www.youtube.com/watch?v=AJyg8JB6xeU"
                target="_blank"
                rel="noopener noreferrer"
                className="media-watch-link"
              >
                {lang === 'vi' ? 'Xem trên YouTube' : 'Watch on YouTube'} <ChevronRight size={14} />
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
              <span className="media-badge">{lang === 'vi' ? 'LG Insider - Tập 3' : 'LG Insider - Ep 3'}</span>
            </a>
            <div className="media-card-body">
              <h3 className="media-card-title">{lang === 'vi' ? 'LG Insider - Tập 3: Phúc lợi & Hoạt động' : 'LG Insider - Ep 3: Benefits & Activities'}</h3>
              <p className="media-card-desc">
                {lang === 'vi'
                  ? 'Tìm hiểu các chế độ đãi ngộ hấp dẫn, căng-tin phục vụ bữa ăn đa dạng và các hoạt động nâng cao sức khỏe thể chất & tinh thần của nhân viên LG.'
                  : 'Discover attractive benefits, a diverse in-house cafeteria, and activities that boost the physical and mental wellbeing of LG employees.'}
              </p>
              <a
                href="https://www.youtube.com/watch?v=f2EfpcAKKWg"
                target="_blank"
                rel="noopener noreferrer"
                className="media-watch-link"
              >
                {lang === 'vi' ? 'Xem trên YouTube' : 'Watch on YouTube'} <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* LG Insiders Quote Grid - Placed at the bottom of Media Center */}
        <div className="lg-insiders-quotes-section">
          <div className="media-section-header" style={{ marginTop: '50px', marginBottom: '25px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '10px 0' }}>
              {lang === 'vi' ? 'Chia sẻ từ các thành viên LG (Insiders)' : 'Stories from LG Insiders'}
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
          <h2 className="culture-main-title">{lang === 'vi' ? 'Cuộc Sống Tại LG Vietnam' : 'Life at LG Vietnam'}</h2>
          <p className="culture-subtitle">
            {lang === 'vi'
              ? 'Hơn là một nơi làm việc — LG là nơi bạn phát triển, kết nối và tạo ra tác động thực sự. Khám phá văn hóa sống động khiến hàng nghìn nhân viên tự hào gắn bó.'
              : "More than a workplace — LG is where you grow, connect, and make a real impact. Discover the vibrant culture that thousands of employees are proud to be part of."}
          </p>
        </div>



        {/* Activities Grid */}
        <div className="culture-activities-grid">
          {lgActivities.map((activity, i) => {
            const IconComponent = activity.icon;
            return (
              <div 
                key={i} 
                className="culture-activity-card"
                onClick={() => setActiveQuoteZoom(activity.img)}
                style={{ cursor: 'zoom-in' }}
              >
                {/* Real photo from newsletter */}
                <div className="activity-img-wrap">
                  <img
                    src={activity.img}
                    alt={lang === 'vi' ? activity.title : activity.titleEn}
                    className="activity-img"
                    style={{ objectPosition: activity.imgPosition || 'center center' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = lg31stBannerImg;
                    }}
                  />
                  <div className="activity-img-overlay" style={{ background: `linear-gradient(to bottom, transparent 40%, ${activity.color}22 100%)` }} />
                  <div className="activity-tag-overlay" style={{ color: activity.color, background: `${activity.color}18`, border: `1px solid ${activity.color}40` }}>
                    {lang === 'vi' ? activity.tag : activity.tagEn}
                  </div>
                </div>
                {/* Card body */}
                <div className="activity-card-body">
                  <div className="activity-icon-wrap" style={{ background: `${activity.color}18`, border: `1.5px solid ${activity.color}40` }}>
                    <IconComponent size={22} style={{ color: activity.color }} />
                  </div>
                  <h3 className="activity-title">{lang === 'vi' ? activity.title : activity.titleEn}</h3>
                  <p className="activity-desc">{lang === 'vi' ? activity.desc : activity.descEn}</p>
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
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${lgTeamGroupImg})` }}
        >
          <div className="promo-content">
            <span className="promo-tag">{lang === 'vi' ? 'Văn Hoá LG' : 'LG Culture'}</span>
            <h3 className="promo-title">{lang === 'vi' ? 'Không gian phát triển toàn diện' : 'A Space for All-Round Growth'}</h3>
            <p className="promo-desc">
              {lang === 'vi'
                ? 'Tại LG, chúng tôi tin rằng mỗi cá nhân đều ẩn chứa tài năng độc đáo. Chương trình mentoring 1-on-1 cùng quản lý cấp cao, và văn hóa phản hồi liên tục giúp bạn tiến bộ từng ngày.'
                : 'At LG, we believe every individual holds unique talent. 1-on-1 mentoring with senior managers and a culture of continuous feedback help you grow every day.'}
            </p>
            <a href="#" className="promo-btn" onClick={(e) => { e.preventDefault(); alert(lang === 'vi' ? 'Chiến dịch "Life\'s Good" truyền cảm hứng về thái độ sống tích cực và sự tận tâm tạo nên giá trị tốt đẹp cho cộng đồng.' : 'The "Life\'s Good" campaign inspires a positive attitude and dedication to creating real value for the community.'); }}>
              {lang === 'vi' ? 'Khám phá thêm' : 'Explore more'} <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div
          className="lg-promo-card"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${lgTechnicianImg})` }}
        >
          <div className="promo-content">
            <span className="promo-tag">{lang === 'vi' ? 'Sự Nghiệp Toàn Cầu' : 'Global Career'}</span>
            <h3 className="promo-title">{lang === 'vi' ? 'Môi trường làm việc đa quốc gia' : 'A Multinational Work Environment'}</h3>
            <p className="promo-desc">
              {lang === 'vi'
                ? 'Làm việc trực tiếp với Expat Manager người Hàn Quốc và đội ngũ quốc tế. Cơ hội luân chuyển sang văn phòng LG tại Seoul, Singapore và hơn 120 quốc gia trên thế giới.'
                : 'Work directly with Korean expat managers and international teams. Opportunities to transfer to LG offices in Seoul, Singapore, and over 120 countries worldwide.'}
            </p>
            <a href="#" className="promo-btn" onClick={(e) => { e.preventDefault(); alert(lang === 'vi' ? 'LG mang lại lộ trình thăng tiến rõ ràng, kết nối toàn cầu và cơ hội luân chuyển công tác nước ngoài.' : 'LG offers a clear career path, global connections, and overseas transfer opportunities.'); }}>
              {lang === 'vi' ? 'Xem chính sách nhân sự' : 'View HR policy'} <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div
          className="lg-promo-card"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85)), url(${warroomContestImg})` }}
        >
          <div className="promo-content">
            <span className="promo-tag">{lang === 'vi' ? 'ESG & Bền Vững' : 'ESG & Sustainability'}</span>
            <h3 className="promo-title">{lang === 'vi' ? 'Kiến tạo tương lai xanh cùng LG' : 'Building a Greener Future with LG'}</h3>
            <p className="promo-desc">
              {lang === 'vi'
                ? 'LG cam kết đạt Carbon Neutral vào 2030. Tham gia đội ngũ tiên phong sản xuất sản phẩm thân thiện môi trường và chương trình CSR trao học bổng, xây dựng cộng đồng tại Việt Nam.'
                : 'LG is committed to Carbon Neutrality by 2030. Join a team pioneering eco-friendly products and CSR programs offering scholarships and building communities in Vietnam.'}
            </p>
            <a href="#" className="promo-btn" onClick={(e) => { e.preventDefault(); alert(lang === 'vi' ? 'LG cam kết Net Zero Carbon vào 2030 và đầu tư mạnh vào ESG tại Việt Nam.' : 'LG is committed to Net Zero Carbon by 2030 and is investing heavily in ESG in Vietnam.'); }}>
              {lang === 'vi' ? 'Xem cam kết ESG' : 'View ESG commitment'} <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
