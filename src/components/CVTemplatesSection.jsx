import React, { useState } from 'react';
import { Download, Eye, FileText, Wrench, ShoppingBag, Megaphone, Cpu, Check, X, Copy } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const cvTemplatesData = {
  vi: [
    {
      id: 'cv-tech',
      category: 'Kỹ Thuật & Dịch Vụ',
      title: 'Mẫu CV Kỹ Thuật Viên Dịch Vụ & Bảo Hành (SVC Engineer)',
      icon: Wrench,
      color: '#A50034',
      bgLight: '#fff1f2',
      recommendedFor: ['Kỹ thuật viên Dịch vụ Khách hàng (SVC)', 'Kỹ sư Điện tử / Điện lạnh', 'Kỹ sư Lắp đặt & Bảo dưỡng'],
      summary: 'Mẫu CV thiết kế tối ưu cho kỹ sư và kỹ thuật viên ngành điện tử gia dụng. Nhấn mạnh kỹ năng đọc bản vẽ bo mạch, tay nghề xử lý sự cố thiết bị thực tế, phụ cấp sản lượng và chỉ số hài lòng khách hàng (CSAT).',
      sections: {
        objective: 'Kỹ thuật viên Dịch vụ với 3 năm kinh nghiệm thực tế trong lắp đặt, chẩn đoán bo mạch và xử lý sự cố thiết bị điện máy gia dụng cao cấp LG (OLED TV, Tủ lạnh InstaView, Máy giặt Inverter). Mong muốn cống hiến năng lực chuyên môn để mang lại trải nghiệm dịch vụ khách hàng "Life\'s Good" xuất sắc nhất tại LG Electronics Việt Nam.',
        skills: [
          'Chẩn đoán & Sửa chữa bo mạch điện tử, thiết bị điện lạnh Inverter',
          'Sử dụng thành thạo máy đo chuyên dụng & công cụ kỹ thuật LG',
          'Tư vấn, hướng dẫn sử dụng và giải đáp thắc mắc khách hàng (CSAT 98%)',
          'Bảo trì phòng ngừa (Preventive Maintenance) & An toàn lao động (HSE)',
          'Bằng lái xe máy & sẵn sàng di chuyển thị trường lưu động'
        ],
        experience: [
          {
            role: 'Kỹ Thuật Viên Sửa Chữa Lưu Động',
            period: '2023 - Hiện tại',
            company: 'Trung Tâm Dịch Vụ Kỹ Thuật Điện Máy',
            details: [
              'Trực tiếp xử lý trung bình 15-20 ca sửa chữa thiết bị LG/ngày tại nhà khách hàng.',
              'Tỷ lệ sửa chữa thành công ngay lần đầu truy cập (First Time Fix Rate) đạt 96%.',
              'Đạt danh hiệu Kỹ thuật viên Xuất sắc Q3/2025 với chỉ số hài lòng khách hàng CSAT 99%.'
            ]
          }
        ],
        education: 'Tốt nghiệp Cao đẳng Điện tử - Điện lạnh (Loại Giỏi) - Trường Cao đẳng Nghề Bách Khoa.'
      }
    },
    {
      id: 'cv-procurement',
      category: 'Mua Hàng & Chuỗi Cung Ứng',
      title: 'Mẫu CV Chuyên Viên Mua Hàng Tập Trung (Marketing Procurement)',
      icon: ShoppingBag,
      color: '#7B0027',
      bgLight: '#fcf0f2',
      recommendedFor: ['Chuyên viên Mua hàng (Procurement Specialist)', 'Buyer Hạng mục Marketing / POSM', 'Chuyên viên Quản lý Nhà cung cấp (Vendor Management)'],
      summary: 'Mẫu CV chuẩn mực cho nhân sự Mua hàng (Procurement). Tối ưu thể hiện năng lực đấu thầu tập trung (Centralized Bidding), thương lượng SLA/đơn giá Agency, phân tích TCO và quy trình kiểm soát rủi ro tập đoàn.',
      sections: {
        objective: 'Chuyên viên Mua hàng (Marketing Buyer) với hơn 4 năm kinh nghiệm quản lý danh mục đấu thầu POSM, Agency sự kiện, Media Buying và dịch vụ chuyển đổi số. Đã tối ưu hóa trung bình 12-15% tổng chi phí mua sắm hàng năm. Mong muốn đóng góp kinh nghiệm vào quy trình thu mua chuyên nghiệp của LG Electronics Việt Nam.',
        skills: [
          'Đấu thầu tập trung (Centralized Bidding) & Phân tích tổng chi phí sở hữu (TCO)',
          'Thương lượng hợp đồng khung (Master Agreement), đơn giá & cam kết SLA',
          'Đánh giá & Kiểm toán năng lực Nhà cung cấp (Vendor Audit & Scorecard)',
          'Sử dụng thành thạo phần mềm SAP Procurement, ERP & MS Excel Nâng cao',
          'Tiếng Anh thương mại thành thạo (IELTS 7.0 / TOEIC 850)'
        ],
        experience: [
          {
            role: 'Chuyên Viên Mua Hàng Marketing (Senior Procurement Buyer)',
            period: '2022 - Hiện tại',
            company: 'Tập đoàn Bán Lẻ & Điện Máy Đa Quốc Gia',
            details: [
              'Chịu trách nhiệm ngân sách thu mua Marketing 3 triệu USD/năm (POSM, Agency, Sự kiện).',
              'Tổ chức thành công 25+ đợt đấu thầu tập trung, giảm 14.5% chi phí so với ngân sách kế hoạch.',
              'Xây dựng bộ chỉ số KPI đánh giá 50+ nhà cung cấp hàng quý, đảm bảo 100% tuân thủ SLA.'
            ]
          }
        ],
        education: 'Cử nhân Kinh tế Đối ngoại - Đại học Ngoại Thương TP.HCM (GPA 3.6/4.0).'
      }
    },
    {
      id: 'cv-marketing',
      category: 'Marketing & Bán Lẻ',
      title: 'Mẫu CV Chuyên Viên Retail & Digital Marketing',
      icon: Megaphone,
      color: '#FD312E',
      bgLight: '#fff5f5',
      recommendedFor: ['Chuyên viên Retail Marketing (Trade MKT)', 'Chuyên viên Digital Marketing', 'Brand Activation Specialist'],
      summary: 'Mẫu CV ấn tượng cho các vị trí Marketing. Nhấn mạnh chỉ số tăng trưởng doanh số (Sell-out/Sell-in), quản lý hình ảnh điểm bán POSM, chạy chiến dịch quảng cáo số và kích hoạt thương hiệu tại chuỗi đại lý.',
      sections: {
        objective: 'Chuyên viên Retail & Digital Marketing với 3 năm kinh nghiệm trong ngành Điện tử Tiêu dùng (FMCG/CE). Sở trường thiết kế không gian trải nghiệm Brand Shop, quản lý thi công POSM và tối ưu chiến dịch quảng cáo đa kênh. Quyết tâm thúc đẩy hình ảnh thương hiệu "Life\'s Good" dẫn đầu thị trường.',
        skills: [
          'Thiết kế & Quản lý khu vực trưng bày sản phẩm (Shop-in-Shop / Brand Corner)',
          'Quản lý sản xuất vật phẩm POSM, quản lý đội ngũ PG/PB tại đại lý',
          'Tối ưu hóa chiến dịch Digital Ads (Google Ads, Meta Pixel, TikTok Performance)',
          'Đọc số liệu phân tích thị trường (GfK report, Sell-out analysis)'
        ],
        experience: [
          {
            role: 'Retail Marketing Specialist',
            period: '2023 - Hiện tại',
            company: 'Chuỗi Siêu Thị Điện Máy Toàn Quốc',
            details: [
              'Triển khai đồng bộ 120+ điểm trưng bày POSM cao cấp cho chiến dịch sản phẩm mới.',
              'Tăng 22% lượt khách tham quan trải nghiệm sản phẩm tại Brand Shop trong Q2/2025.',
              'Phối hợp với phòng Kinh doanh tổ chức 10+ sự kiện Activation tăng 30% doanh số Sell-out.'
            ]
          }
        ],
        education: 'Cử nhân Quản trị Marketing - Đại học Kinh tế Quốc dân (NEU).'
      }
    },
    {
      id: 'cv-ai-it',
      category: 'Công Nghệ & AI',
      title: 'Mẫu CV Chuyên Viên AI & Kỹ Sư Phần Mềm (AI/AX Engineer)',
      icon: Cpu,
      color: '#111111',
      bgLight: '#f8fafc',
      recommendedFor: ['Chuyên viên AI & Đổi mới sáng tạo (AX Project)', 'Kỹ sư Phần mềm (Software Engineer)', 'Data / AI Specialist'],
      summary: 'Mẫu CV chuyên sâu dành riêng cho kỹ sư CNTT & AI. Làm nổi bật các dự án AX (AI Transformation), xây dựng công cụ AI doanh nghiệp, ngôn ngữ Python, PyTorch, LLM Fine-tuning và kiến trúc phần mềm.',
      sections: {
        objective: 'Kỹ sư Phần mềm & Chuyên viên AI với 3+ năm kinh nghiệm phát triển ứng dụng AI doanh nghiệp. Đã trực tiếp xây dựng giải pháp AI tra cứu tự động và tự động hóa quy trình cho hơn 1,000 người dùng nội bộ. Đam mê ứng dụng AI thực chiến để kiến tạo giá trị đột phá tại LG Electronics.',
        skills: [
          'Ngôn ngữ lập trình: Python, JavaScript/TypeScript, SQL',
          'Khung AI & Data: PyTorch, LangChain, OpenAI API, HuggingFace, Pandas',
          'Kiến trúc ứng dụng: RESTful API, Docker, Microservices, Git, CI/CD',
          'Kỹ năng thực chiến: Xây dựng RAG Chatbot, Prompt Engineering, Tự động hóa quy trình AX'
        ],
        experience: [
          {
            role: 'AI / Software Engineer',
            period: '2023 - Hiện tại',
            company: 'Công ty Công nghệ & Giải pháp Phần mềm',
            details: [
              'Phát triển trợ lý AI nội bộ hỗ trợ nhân viên tra cứu tài liệu quy trình, giảm 40% thời gian xử lý.',
              'Tối ưu hóa mô hình LLM fine-tuning giúp tăng độ chính xác phản hồi từ 82% lên 95%.',
              'Đạt giải Nhất cuộc thi Sáng kiến AI Doanh nghiệp (AI Innovation Contest 2025).'
            ]
          }
        ],
        education: 'Cử nhân Công nghệ Thông tin - Đại học Bách Khoa Hà Nội (HUST).'
      }
    }
  ],

  en: [
    {
      id: 'cv-tech',
      category: 'Engineering & Field Service',
      title: 'Service & Warranty Technician CV Template (SVC Engineer)',
      icon: Wrench,
      color: '#A50034',
      bgLight: '#fff1f2',
      recommendedFor: ['Customer Service Technician (SVC)', 'Electronics / Refrigeration Engineer', 'Installation & Maintenance Specialist'],
      summary: 'Optimized CV template for home appliance electronics engineers and technicians. Highlights circuit diagram diagnosis, hands-on field troubleshooting, performance bonus metrics, and Customer Satisfaction (CSAT) scores.',
      sections: {
        objective: 'Service Technician with 3 years of practical experience in installation, circuit board diagnosis, and troubleshooting for premium LG home appliances (OLED TV, InstaView Refrigerator, Inverter WashTower). Eager to contribute technical skills to deliver superior "Life\'s Good" customer experiences at LG Electronics Vietnam.',
        skills: [
          'Circuit board diagnostics & repair for Inverter refrigeration appliances',
          'Proficient in LG specialized testing tools & engineering software',
          'Customer consultation & technical troubleshooting (CSAT 98%)',
          'Preventive Maintenance & Workplace Safety (HSE)',
          'Valid motorcycle license & willingness for mobile field travel'
        ],
        experience: [
          {
            role: 'Mobile Service Technician',
            period: '2023 - Present',
            company: 'Electronics Technical Service Center',
            details: [
              'Personally managed an average of 15-20 LG appliance repair cases/day at customer locations.',
              'Achieved a 96% First Time Fix Rate on initial customer visits.',
              'Awarded Outstanding Service Technician Q3/2025 with a 99% CSAT rating.'
            ]
          }
        ],
        education: 'Associate Degree in Electronics & Refrigeration (High Distinction) - Vocational College.'
      }
    },
    {
      id: 'cv-procurement',
      category: 'Procurement & Supply Chain',
      title: 'Marketing Procurement Specialist CV Template',
      icon: ShoppingBag,
      color: '#7B0027',
      bgLight: '#fcf0f2',
      recommendedFor: ['Procurement Specialist', 'Marketing / POSM Category Buyer', 'Vendor Management Specialist'],
      summary: 'Standardized CV template for Procurement professionals. Highlights Centralized Bidding capabilities, Agency SLA negotiations, Total Cost of Ownership (TCO) analysis, and corporate compliance controls.',
      sections: {
        objective: 'Marketing Procurement Buyer with over 4 years of experience managing sourcing categories for POSM, Event Agencies, Media Buying, and Digital Transformation services. Optimized an average of 12-15% total annual purchasing costs. Seeking to bring sourcing expertise to LG Electronics Vietnam.',
        skills: [
          'Centralized Bidding & Total Cost of Ownership (TCO) Analysis',
          'Master Service Agreement (MSA) & SLA Contract Negotiations',
          'Vendor Audits & Supplier Balanced Scorecards',
          'Proficient in SAP Procurement, ERP systems, and Advanced Excel',
          'Fluent Commercial English (IELTS 7.0 / TOEIC 850)'
        ],
        experience: [
          {
            role: 'Senior Marketing Procurement Buyer',
            period: '2022 - Present',
            company: 'Multinational Retail & Electronics Group',
            details: [
              'Managed $3M/year Marketing procurement budget for POSM, Agencies, and Brand Events.',
              'Successfully organized 25+ centralized tenders, achieving 14.5% cost savings below budget.',
              'Developed quarterly KPI scorecards for 50+ vendors, ensuring 100% SLA compliance.'
            ]
          }
        ],
        education: 'Bachelor of International Economics - Foreign Trade University (GPA 3.6/4.0).'
      }
    },
    {
      id: 'cv-marketing',
      category: 'Marketing & Retail',
      title: 'Retail & Digital Marketing Specialist CV Template',
      icon: Megaphone,
      color: '#FD312E',
      bgLight: '#fff5f5',
      recommendedFor: ['Retail Marketing Specialist (Trade MKT)', 'Digital Marketing Specialist', 'Brand Activation Specialist'],
      summary: 'High-impact CV template for Marketing roles. Emphasizes sales growth metrics (Sell-out/Sell-in), POSM point-of-sale execution, digital ads campaign optimization, and retail channel brand activation.',
      sections: {
        objective: 'Retail & Digital Marketing Specialist with 3 years of experience in Consumer Electronics (FMCG/CE). Skilled in Brand Shop experience layout, POSM contractor management, and multi-channel campaign optimization. Committed to driving LG\'s "Life\'s Good" brand leadership.',
        skills: [
          'Shop-in-Shop & Brand Corner display layout & visual merchandising',
          'POSM contractor management & promoter staff (PG/PB) supervision',
          'Digital Performance Ads optimization (Google Ads, Meta Pixel, TikTok Ads)',
          'Market data analysis (GfK reports, Sell-out analytics)'
        ],
        experience: [
          {
            role: 'Retail Marketing Specialist',
            period: '2023 - Present',
            company: 'National Electronics Retail Chain',
            details: [
              'Deployed premium POSM displays across 120+ retail locations for new product launches.',
              'Increased Brand Shop foot traffic by 22% in Q2/2025.',
              'Partnered with Sales team to run 10+ activation events, boosting Sell-out revenue by 30%.'
            ]
          }
        ],
        education: 'Bachelor of Marketing Management - National Economics University (NEU).'
      }
    },
    {
      id: 'cv-ai-it',
      category: 'Technology & AI',
      title: 'AI Specialist & Software Engineer CV Template (AI/AX)',
      icon: Cpu,
      color: '#111111',
      bgLight: '#f8fafc',
      recommendedFor: ['AI & Innovation Specialist (AX Project)', 'Software Engineer', 'Data / AI Specialist'],
      summary: 'In-depth CV template tailored for IT & AI Engineers. Highlights Enterprise AI Transformation (AX) projects, corporate AI tool building, Python, PyTorch, LLM Fine-tuning, and software architecture.',
      sections: {
        objective: 'Software & AI Engineer with 3+ years of experience developing enterprise AI applications. Built automated AI document retrieval and workflow automation tools for 1,000+ internal users. Passionate about applying AI to drive innovation at LG Electronics.',
        skills: [
          'Programming Languages: Python, JavaScript/TypeScript, SQL',
          'AI & Data Frameworks: PyTorch, LangChain, OpenAI API, HuggingFace, Pandas',
          'Architecture: RESTful API, Docker, Microservices, Git, CI/CD',
          'Practical Skills: RAG Chatbot construction, Prompt Engineering, AX Workflow Automation'
        ],
        experience: [
          {
            role: 'AI / Software Engineer',
            period: '2023 - Present',
            company: 'Technology & Software Solutions Company',
            details: [
              'Developed internal AI assistant for procedure documentation search, cutting processing time by 40%.',
              'Fine-tuned LLM models, improving response accuracy from 82% to 95%.',
              'Won 1st Place at Enterprise AI Innovation Contest 2025.'
            ]
          }
        ],
        education: 'Bachelor of Computer Science - Hanoi University of Science and Technology (HUST).'
      }
    }
  ]
};

export default function CVTemplatesSection() {
  const { lang, t } = useLanguage();
  const [activeModalTemplate, setActiveModalTemplate] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const templatesList = cvTemplatesData[lang] || cvTemplatesData['vi'];

  const handleCopyCVText = (template) => {
    const textContent = `
==================================================
LG ELECTRONICS STANDARD CV TEMPLATE - ${template.title.toUpperCase()}
==================================================

1. CAREER OBJECTIVE / MỤC TIÊU:
${template.sections.objective}

2. CORE SKILLS / KỸ NĂNG:
${template.sections.skills.map(s => '• ' + s).join('\n')}

3. WORK EXPERIENCE / KINH NGHIỆM:
${template.sections.experience.map(e => `${e.role} (${e.period})\nCompany: ${e.company}\n${e.details.map(d => '  - ' + d).join('\n')}`).join('\n\n')}

4. EDUCATION / HỌC VẤN:
${template.sections.education}

--------------------------------------------------
Source: LG Electronics Vietnam Career Portal (https://www.lg.com/vn)
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadDocx = (template) => {
    const textContent = `
LG ELECTRONICS STANDARD CV TEMPLATE
Position: ${template.title}

1. CAREER OBJECTIVE:
${template.sections.objective}

2. CORE SKILLS:
${template.sections.skills.map(s => '• ' + s).join('\n')}

3. WORK EXPERIENCE:
${template.sections.experience.map(e => `${e.role} | ${e.company} (${e.period})\n${e.details.map(d => ' - ' + d).join('\n')}`).join('\n\n')}

4. EDUCATION:
${template.sections.education}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `LG_Standard_CV_Template_${template.id}.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <section className="lg-cv-templates-section">
      <div className="container">
        {/* Section Header */}
        <div className="cv-section-header">
          <span className="cv-eyebrow">{t('cvHubEyebrow')}</span>
          <h2 className="cv-main-title">{t('cvHubTitle')}</h2>
          <p className="cv-subtitle">
            {t('cvHubSubtitle')}
          </p>
        </div>

        {/* Templates Grid */}
        <div className="cv-templates-grid">
          {templatesList.map((tpl) => {
            const IconComp = tpl.icon;
            return (
              <div key={tpl.id} className="cv-template-card">
                <div className="template-card-header" style={{ backgroundColor: tpl.bgLight }}>
                  <div className="template-icon-circle" style={{ backgroundColor: tpl.color }}>
                    <IconComp size={24} color="#ffffff" />
                  </div>
                  <span className="template-category-tag" style={{ color: tpl.color, backgroundColor: `${tpl.color}18` }}>
                    {tpl.category}
                  </span>
                </div>

                <div className="template-card-body">
                  <h3 className="template-title">{tpl.title}</h3>
                  <p className="template-summary">{tpl.summary}</p>
                  
                  <div className="template-roles-tags">
                    {tpl.recommendedFor.slice(0, 2).map((roleName, idx) => (
                      <span key={idx} className="role-chip">
                        ✓ {roleName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="template-card-footer">
                  <button 
                    className="btn-tpl-preview"
                    onClick={() => setActiveModalTemplate(tpl)}
                  >
                    <Eye size={14} /> {t('btnPreviewCV')}
                  </button>
                  <button 
                    className="btn-tpl-download"
                    onClick={() => handleDownloadDocx(tpl)}
                    style={{ backgroundColor: tpl.color }}
                  >
                    <Download size={14} /> {t('btnDownloadCVFile')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Preview Full Template */}
      {activeModalTemplate && (
        <div className="modal-overlay" onClick={() => setActiveModalTemplate(null)}>
          <div className="modal-content cv-preview-modal animate-zoom-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModalTemplate(null)}>
              <X size={20} />
            </button>

            <div className="cv-preview-header">
              <div className="preview-header-badge" style={{ backgroundColor: activeModalTemplate.color }}>
                {activeModalTemplate.category}
              </div>
              <h2 className="preview-header-title">{activeModalTemplate.title}</h2>
              <p className="preview-header-sub">
                {lang === 'vi' ? 'Mẫu cấu trúc hồ sơ tiêu chuẩn được đề xuất bởi Bộ phận Tuyển dụng LG Electronics' : 'Standardized resume template recommended by LG Electronics Talent Acquisition Team'}
              </p>
            </div>

            <div className="cv-preview-body-content">
              {/* Objective */}
              <div className="cv-preview-block">
                <h4 className="block-label">1. CAREER OBJECTIVE / MỤC TIÊU NGHỀ NGHIỆP</h4>
                <p className="block-p">{activeModalTemplate.sections.objective}</p>
              </div>

              {/* Skills */}
              <div className="cv-preview-block">
                <h4 className="block-label">2. CORE SKILLS / KỸ NĂNG CỐT LÕI</h4>
                <ul className="block-ul">
                  {activeModalTemplate.sections.skills.map((skill, idx) => (
                    <li key={idx}>✓ {skill}</li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div className="cv-preview-block">
                <h4 className="block-label">3. WORK EXPERIENCE / KINH NGHIỆM LÀM VIỆC</h4>
                {activeModalTemplate.sections.experience.map((exp, idx) => (
                  <div key={idx} className="experience-item-box">
                    <div className="exp-role-row">
                      <strong>{exp.role}</strong>
                      <span className="exp-period">{exp.period}</span>
                    </div>
                    <div className="exp-company-name">Company / Công ty: {exp.company}</div>
                    <ul className="exp-details-ul">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="cv-preview-block">
                <h4 className="block-label">4. EDUCATION / TRÌNH ĐỘ HỌC VẤN</h4>
                <p className="block-p">{activeModalTemplate.sections.education}</p>
              </div>
            </div>

            <div className="cv-preview-actions-bar">
              <button 
                className="btn-copy-cv"
                onClick={() => handleCopyCVText(activeModalTemplate)}
              >
                {copiedId === activeModalTemplate.id ? (
                  <><Check size={16} color="#10b981" /> {t('btnDownloadedSuccess')}</>
                ) : (
                  <><Copy size={16} /> {t('btnCopyCVText')}</>
                )}
              </button>
              <button 
                className="btn-download-docx-main"
                onClick={() => handleDownloadDocx(activeModalTemplate)}
                style={{ backgroundColor: activeModalTemplate.color }}
              >
                <Download size={16} /> {t('btnDownloadCVFile')} (.TXT / .DOCX)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
