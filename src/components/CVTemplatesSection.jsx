import React, { useState } from 'react';
import { Download, Eye, FileText, Wrench, ShoppingBag, Megaphone, Cpu, Check, X, Copy } from 'lucide-react';

export const cvTemplatesData = [
  {
    id: 'cv-tech',
    category: 'Kỹ Thuật & Dịch Vụ',
    title: 'Mẫu CV Kỹ Thuật Viên Dịch Vụ & Bảo Hành (SVC Engineer)',
    icon: Wrench,
    color: '#10b981',
    bgLight: '#ecfdf5',
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
          period: '2023 - Hiệu tại',
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
    color: '#A50034',
    bgLight: '#fff1f2',
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
          company: 'Tập đoàn Bán Lệ & Điện Máy Đa Quốc Gia',
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
    color: '#3b82f6',
    bgLight: '#eff6ff',
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
    color: '#8b5cf6',
    bgLight: '#f5f3ff',
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
];

export default function CVTemplatesSection({ onSelectTemplateToApply }) {
  const [activeModalTemplate, setActiveModalTemplate] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCVText = (template) => {
    const textContent = `
==================================================
MẪU CV CHUẨN LG ELECTRONICS VIỆT NAM - ${template.title.toUpperCase()}
==================================================

1. MỤC TIÊU NGHỀ NGHIỆP:
${template.sections.objective}

2. KỸ NĂNG CỐT LÕI:
${template.sections.skills.map(s => '• ' + s).join('\n')}

3. KINH NGHIỆM LÀM VIỆC TIÊU BIỂU:
${template.sections.experience.map(e => `${e.role} (${e.period})\nCông ty: ${e.company}\n${e.details.map(d => '  - ' + d).join('\n')}`).join('\n\n')}

4. TRÌNH ĐỘ HỌC VẤN:
${template.sections.education}

--------------------------------------------------
Nguồn: Cổng thông tin tuyển dụng LG Electronics Việt Nam (https://www.lg.com/vn)
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadDocx = (template) => {
    // Generate text/file content and trigger download
    const textContent = `
MẪU CV CHUẨN LG ELECTRONICS VIỆT NAM
Vị trí: ${template.title}

1. MỤC TIÊU NGHỀ NGHIỆP:
${template.sections.objective}

2. KỸ NĂNG CỐT LÕI:
${template.sections.skills.map(s => '• ' + s).join('\n')}

3. KINH NGHIỆM LÀM VIỆC:
${template.sections.experience.map(e => `${e.role} | ${e.company} (${e.period})\n${e.details.map(d => ' - ' + d).join('\n')}`).join('\n\n')}

4. HỌC VẤN:
${template.sections.education}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `Mau_CV_LG_Standard_${template.id}.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <section className="lg-cv-templates-section">
      <div className="container">
        {/* Section Header */}
        <div className="cv-section-header">
          <span className="cv-eyebrow">LG Career Resources</span>
          <h2 className="cv-main-title">Kho Mẫu CV Chuẩn LG Electronics</h2>
          <p className="cv-subtitle">
            Dành riêng cho ứng viên ứng tuyển các vị trí Kỹ thuật, Mua hàng, Marketing và Công nghệ/AI.
            Xem trước, sao chép hoặc tải về mẫu CV chuẩn cấu trúc tuyển dụng LG để tăng 80% cơ hội trúng tuyển!
          </p>
        </div>

        {/* Templates Grid */}
        <div className="cv-templates-grid">
          {cvTemplatesData.map((tpl) => {
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
                    <Eye size={14} /> Xem mẫu chuẩn
                  </button>
                  <button 
                    className="btn-tpl-download"
                    onClick={() => handleDownloadDocx(tpl)}
                    style={{ backgroundColor: tpl.color }}
                  >
                    <Download size={14} /> Tải tệp CV
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
              <p className="preview-header-sub">Mẫu cấu trúc hồ sơ tiêu chuẩn được đề xuất bởi Bộ phận Tuyển dụng LG Electronics</p>
            </div>

            <div className="cv-preview-body-content">
              {/* Objective */}
              <div className="cv-preview-block">
                <h4 className="block-label">1. MỤC TIÊU NGHỀ NGHIỆP (CAREER OBJECTIVE)</h4>
                <p className="block-p">{activeModalTemplate.sections.objective}</p>
              </div>

              {/* Skills */}
              <div className="cv-preview-block">
                <h4 className="block-label">2. KỸ NĂNG CỐT LÕI (CORE SKILLS)</h4>
                <ul className="block-ul">
                  {activeModalTemplate.sections.skills.map((skill, idx) => (
                    <li key={idx}>✓ {skill}</li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div className="cv-preview-block">
                <h4 className="block-label">3. KINH NGHIỆM LÀM VIỆC TIÊU BIỂU (WORK EXPERIENCE)</h4>
                {activeModalTemplate.sections.experience.map((exp, idx) => (
                  <div key={idx} className="experience-item-box">
                    <div className="exp-role-row">
                      <strong>{exp.role}</strong>
                      <span className="exp-period">{exp.period}</span>
                    </div>
                    <div className="exp-company-name">Công ty: {exp.company}</div>
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
                <h4 className="block-label">4. TRÌNH ĐỘ HỌC VẤN (EDUCATION)</h4>
                <p className="block-p">{activeModalTemplate.sections.education}</p>
              </div>
            </div>

            <div className="cv-preview-actions-bar">
              <button 
                className="btn-copy-cv"
                onClick={() => handleCopyCVText(activeModalTemplate)}
              >
                {copiedId === activeModalTemplate.id ? (
                  <><Check size={16} color="#10b981" /> Đã sao chép văn bản CV!</>
                ) : (
                  <><Copy size={16} /> Sao chép văn bản CV</>
                )}
              </button>
              <button 
                className="btn-download-docx-main"
                onClick={() => handleDownloadDocx(activeModalTemplate)}
                style={{ backgroundColor: activeModalTemplate.color }}
              >
                <Download size={16} /> Tải Mẫu CV Về Máy (.TXT / .DOCX)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
