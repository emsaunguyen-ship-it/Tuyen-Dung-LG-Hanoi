import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, ChevronRight, HelpCircle, Briefcase, FileText, Gift, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import aiAvatarImg from '../assets/lg_ai_assistant_avatar.png';

export default function AIChatbot({ onSelectJob, onOpenCVSection }) {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const initialGreetingVi = "Xin chào! Mình là **Như Anh** - Trợ lý AI Tuyển dụng LG Electronics 🇻🇳. Mình rất sẵn sàng đồng hành cùng bạn! Bạn cần tư vấn vị trí công việc, chế độ đãi ngộ hay mẫu CV chuẩn LG?";
  const initialGreetingEn = "Hello! I am **Nhu Anh** - LG Electronics AI Career Assistant 🇬🇧. I'm excited to help you! How can I assist you with job openings, benefits, or LG CV templates?";

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: lang === 'vi' ? initialGreetingVi : initialGreetingEn,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      options: [
        { id: 'opt-jobs', label: lang === 'vi' ? '🔥 Vị trí tuyển gấp tại LG' : '🔥 Urgent Hiring Positions', action: 'show_jobs' },
        { id: 'opt-perks', label: lang === 'vi' ? '🎁 Quyền lợi & Bảo hiểm PVI' : '🎁 Benefits & PVI Insurance', action: 'show_perks' },
        { id: 'opt-cv', label: lang === 'vi' ? '📄 Mẫu CV Kỹ thuật & Mua hàng' : '📄 Technical & Procurement CV Templates', action: 'show_cv' },
        { id: 'opt-process', label: lang === 'vi' ? '🚀 Quy trình phỏng vấn LG' : '🚀 LG Interview Process', action: 'show_process' }
      ]
    }
  ]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const generateAIResponse = (userText, actionTrigger = null) => {
    const textLower = userText.toLowerCase();

    if (actionTrigger === 'show_jobs' || textLower.includes('vi trí') || textLower.includes('tuyển') || textLower.includes('job') || textLower.includes('vị trí')) {
      return {
        text: lang === 'vi' 
          ? "Hiện tại LG Electronics đang ưu tiên tuyển dụng các vị trí key nóng nhất:\n\n1. **Kỹ thuật viên Dịch vụ (SVC Technician)** - Hà Nội, Hải Phòng, Đà Nẵng, TP.HCM\n2. **Chuyên viên Mua hàng Tập trung (Marketing Procurement)** - Hà Nội\n3. **Chuyên viên Digital Marketing** - TP.HCM\n4. **Kỹ sư AI Specialist (AX Project)** - Hà Nội & TP.HCM\n\nBạn muốn tìm hiểu kỹ hơn về vị trí nào?"
          : "LG Electronics is currently prioritizing urgent hiring for key roles:\n\n1. **Customer Service Technician (SVC)**\n2. **Marketing Procurement Specialist**\n3. **Digital Marketing Specialist**\n4. **AI Specialist (Generative AI & LLM)**\n\nWhich position would you like to explore?",
        options: [
          { id: 'opt-procurement', label: lang === 'vi' ? '🛒 Xem việc Mua hàng' : '🛒 Procurement Jobs', action: 'job_procurement' },
          { id: 'opt-svc', label: lang === 'vi' ? '🛠 Xem việc Kỹ thuật viên' : '🛠 SVC Technician Jobs', action: 'job_svc' },
          { id: 'opt-apply-now', label: lang === 'vi' ? '📝 Nộp CV ngay' : '📝 Apply Resume Now', action: 'apply_now' }
        ]
      };
    }

    if (actionTrigger === 'show_perks' || textLower.includes('lương') || textLower.includes('quyền lợi') || textLower.includes('bảo hiểm') || textLower.includes('salary') || textLower.includes('benefit')) {
      return {
        text: lang === 'vi' 
          ? "🎁 **Chế độ đãi ngộ đẳng cấp tại LG Electronics Việt Nam:**\n\n• **Lương & Thưởng**: Lương cơ bản cạnh tranh + Thưởng KPI bán hàng + Thưởng tháng 13 & 14.\n• **Bảo hiểm sức khỏe**: Gói bảo hiểm cao cấp LG PVI Care dành riêng cho nhân viên và gia đình.\n• **Trang thiết bị**: Cung cấp Laptop, điện thoại công vụ, đồng phục cao cấp Life's Good.\n• **Môi trường**: Văn hóa làm việc cởi mở, cơ hội đào tạo tại trụ sở LG Hàn Quốc."
          : "🎁 **Premium Benefits Package at LG Electronics:**\n\n• **Salary & Bonus**: Competitive base pay + Performance KPI bonus + 13th & 14th month bonuses.\n• **Health Care**: Premium LG PVI Care insurance for employees & relatives.\n• **Equipment**: Corporate Laptop, mobile allowance, official Life's Good uniform.\n• **Environment**: Open global culture, training opportunities at LG HQ Korea.",
        options: [
          { id: 'opt-apply-now', label: lang === 'vi' ? '📝 Đăng ký ứng tuyển' : '📝 Submit Application', action: 'apply_now' }
        ]
      };
    }

    if (actionTrigger === 'show_cv' || textLower.includes('cv') || textLower.includes('mẫu') || textLower.includes('template')) {
      if (onOpenCVSection) onOpenCVSection();
      return {
        text: lang === 'vi'
          ? "📄 LG đã chuẩn bị sẵn **4 Mẫu CV chuyên nghiệp** dành riêng cho khối Kỹ thuật, Mua hàng, Marketing và AI! Mình đã tự động cuộn màn hình đến khu vực Mẫu CV cho bạn xem và tải về miễn phí rồi nhé!"
          : "📄 LG provides **4 Standardized CV Templates** for Technical, Procurement, Marketing, and AI roles! I have automatically scrolled your screen to the CV Templates section to preview and download!",
        options: [
          { id: 'opt-apply-now', label: lang === 'vi' ? '📝 Nộp CV đã tạo' : '📝 Submit My Resume', action: 'apply_now' }
        ]
      };
    }

    if (actionTrigger === 'show_process' || textLower.includes('quy trình') || textLower.includes('phỏng vấn') || textLower.includes('interview')) {
      return {
        text: lang === 'vi'
          ? "🚀 **Quy trình Tuyển dụng 4 Bước Minh Bạch tại LG:**\n\n1. **Bước 1**: Nộp hồ sơ CV trực tuyến trên website.\n2. **Bước 2**: Đội ngũ HR LG thẩm định trực tiếp trong 24h - 48h.\n3. **Bước 3**: Phỏng vấn Chuyên môn (Online / Offline tại Văn phòng LG).\n4. **Bước 4**: Nhận Thư mời nhận việc (Offer Letter) & Onboarding!"
          : "🚀 **Transparent 4-Step Recruitment Process at LG:**\n\n1. **Step 1**: Submit CV online via LG Careers Portal.\n2. **Step 2**: 100% Human HR review within 24h - 48h.\n3. **Step 3**: Professional Interview (Online / Offline at LG Office).\n4. **Step 4**: Job Offer & Welcome Onboarding!",
        options: [
          { id: 'opt-apply-now', label: lang === 'vi' ? '📝 Nộp CV ngay' : '📝 Apply Now', action: 'apply_now' }
        ]
      };
    }

    // Default friendly response
    return {
      text: lang === 'vi'
        ? `Cảm ơn bạn! Như Anh đã ghi nhận thắc mắc: "${userText}". Bạn có muốn Như Anh kết nối trực tiếp với Chị Nguyễn Khánh Thuỷ (Trưởng nhóm Tuyển dụng LG) hay tư vấn chi tiết vị trí công việc phù hợp?`
        : `Thank you! Nhu Anh noted your question: "${userText}". Would you like me to connect you directly with Ms. Nguyen Khanh Thuy (LG Lead Recruiter) or guide you to relevant jobs?`,
      options: [
        { id: 'opt-jobs', label: lang === 'vi' ? '🔍 Xem danh sách việc làm' : '🔍 Browse Vacancies', action: 'show_jobs' },
        { id: 'opt-perks', label: lang === 'vi' ? '🎁 Xem chế độ đãi ngộ' : '🎁 View Benefits', action: 'show_perks' }
      ]
    };
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(userText);
      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: aiReply.options
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleOptionClick = (option) => {
    const userOptionMsg = {
      id: Date.now(),
      sender: 'user',
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userOptionMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(option.label, option.action);
      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: aiReply.options
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="ai-chatbot-root-container">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button className="ai-chatbot-trigger-btn animate-bounce-subtle" onClick={toggleChat} aria-label="Open AI Recruiter Assistant">
          <div className="trigger-avatar-wrapper">
            <img src={aiAvatarImg} alt="Như Anh - LG AI Assistant" className="trigger-avatar-img" />
            <span className="online-status-dot"></span>
          </div>
          <div className="trigger-text-box">
            <span className="trigger-name">Như Anh LG AI</span>
            <span className="trigger-sub">Life's Good. HR</span>
          </div>
          {unreadCount > 0 && <span className="trigger-unread-badge">{unreadCount}</span>}
        </button>
      )}

      {/* Floating Chat Box Window */}
      {isOpen && (
        <div className="ai-chat-drawer-container animate-zoom-in">
          {/* Header */}
          <div className="chat-drawer-header">
            <div className="chat-header-user-info" style={{ cursor: 'pointer' }} onClick={() => setShowProfileModal(true)} title={lang === 'vi' ? 'Xem ảnh & Hồ sơ Chuyên viên AI Như Anh' : 'View AI Assistant Photo & Profile'}>
              <div className="header-avatar-ring">
                <img src={aiAvatarImg} alt="Như Anh LG AI Assistant" className="header-avatar-img" />
                <span className="online-status-dot"></span>
              </div>
              <div className="header-user-text">
                <h3 className="ai-assistant-name">
                  Như Anh <span className="lifes-good-tag">Life's Good.</span>
                </h3>
                <p className="ai-assistant-title">
                  <Sparkles size={12} className="sparkle-icon" /> {lang === 'vi' ? 'Trợ lý AI Tuyển dụng LG (Xem ảnh)' : 'LG AI Recruiter Assistant'}
                </p>
              </div>
            </div>
            <button className="btn-close-chat" onClick={toggleChat} aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-drawer-body">
            <div className="chat-timestamp-divider">
              <span>{lang === 'vi' ? 'Hỗ trợ trực tuyến 24/7' : '24/7 Live AI Assistance'}</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'message-user' : 'message-ai'}`}>
                {msg.sender === 'ai' && (
                  <div className="msg-avatar" style={{ cursor: 'pointer' }} onClick={() => setShowProfileModal(true)} title="Xem hình ảnh chân dung">
                    <img src={aiAvatarImg} alt="Như Anh AI" />
                  </div>
                )}
                
                <div className="msg-bubble-content">
                  <div className="msg-bubble">
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  </div>
                  
                  <span className="msg-timestamp">{msg.timestamp}</span>

                  {/* Render Quick Action Options */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="chat-options-grid">
                      {msg.options.map((opt) => (
                        <button key={opt.id} className="btn-chat-option" onClick={() => handleOptionClick(opt)}>
                          <span>{opt.label}</span>
                          <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message-row message-ai">
                <div className="msg-avatar">
                  <img src={aiAvatarImg} alt="Như Anh AI" />
                </div>
                <div className="msg-bubble-content">
                  <div className="msg-bubble typing-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips Bar */}
          <div className="chat-quick-chips-bar">
            <button className="chip-btn" onClick={() => handleSendMessage({ preventDefault: () => {} }, setInputMessage(lang === 'vi' ? 'Tuyển dụng Kỹ thuật viên' : 'SVC Technician Jobs'))}>
              <Briefcase size={12} /> {lang === 'vi' ? 'Việc Kỹ thuật' : 'Tech Jobs'}
            </button>
            <button className="chip-btn" onClick={() => handleSendMessage({ preventDefault: () => {} }, setInputMessage(lang === 'vi' ? 'Tuyển dụng Mua hàng' : 'Procurement Jobs'))}>
              <Briefcase size={12} /> {lang === 'vi' ? 'Việc Mua hàng' : 'Procurement'}
            </button>
            <button className="chip-btn" onClick={() => handleSendMessage({ preventDefault: () => {} }, setInputMessage(lang === 'vi' ? 'Bảo hiểm PVI & Đãi ngộ' : 'PVI Insurance & Perks'))}>
              <Gift size={12} /> {lang === 'vi' ? 'Đãi ngộ LG' : 'Perks'}
            </button>
          </div>

          {/* Input Footer */}
          <form className="chat-drawer-footer" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder={lang === 'vi' ? 'Hỏi Như Anh về việc làm LG...' : 'Ask Nhu Anh about LG careers...'}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="chat-input-field"
            />
            <button type="submit" className="btn-send-chat" disabled={!inputMessage.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* POPUP MODAL: High-Res Portrait Image & Profile of LG AI Recruiter Assistant */}
      {showProfileModal && (
        <div className="modal-overlay animate-fade-in" style={{ zIndex: 10000 }} onClick={() => setShowProfileModal(false)}>
          <div 
            className="modal-content animate-zoom-in" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '440px', padding: '0', overflow: 'hidden', borderRadius: '24px', border: '2px solid #A50034' }}
          >
            {/* Header Banner Image Container */}
            <div style={{ position: 'relative', width: '100%', height: '360px', backgroundColor: '#7B0027', overflow: 'hidden' }}>
              <img 
                src={aiAvatarImg} 
                alt="Như Anh - Trợ lý AI Tuyển dụng LG Electronics (Life's Good.)" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} 
              />
              <button 
                onClick={() => setShowProfileModal(false)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <X size={20} />
              </button>

              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                background: '#A50034',
                color: '#ffffff',
                padding: '5px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 800,
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '1px solid #ffffff'
              }}>
                Life's Good. Official HR Recruiter
              </div>
            </div>

            {/* Profile Bio Details */}
            <div style={{ padding: '20px 22px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111111', margin: 0 }}>
                  Như Anh
                </h3>
                <span style={{ backgroundColor: '#fef2f2', color: '#A50034', padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 700, border: '1px solid #fecaca' }}>
                  🟢 {lang === 'vi' ? 'Đang hoạt động 24/7' : 'Active 24/7'}
                </span>
              </div>

              <p style={{ fontSize: '13.5px', color: '#A50034', fontWeight: 700, margin: '0 0 14px 0' }}>
                {lang === 'vi' ? 'Trợ lý AI Tuyển dụng LG Electronics Việt Nam' : 'LG Electronics AI Recruiter Assistant'}
              </p>

              <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '16px', fontSize: '12.5px', color: '#334155', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '6px' }}>
                  <strong>🎯 {lang === 'vi' ? 'Khẩu hiệu:' : 'Slogan:'}</strong> <span style={{ color: '#A50034', fontWeight: 700 }}>"Life's Good. - CÙNG LG KIẾN TẠO"</span>
                </div>
                <div style={{ marginBottom: '6px' }}>
                  <strong>🤖 {lang === 'vi' ? 'Nhiệm vụ:' : 'Mission:'}</strong> {lang === 'vi' ? 'Tư vấn việc làm, chế độ đãi ngộ & hỗ trợ ứng viên nộp CV 24/7.' : 'Guide candidates, benefits & 24/7 CV submission support.'}
                </div>
                <div>
                  <strong>🛡 {lang === 'vi' ? 'Cam kết:' : 'Guarantee:'}</strong> {lang === 'vi' ? '100% Hồ sơ được thẩm định trực tiếp bởi HR LG (Human-In-The-Loop Audit).' : '100% Resume Human Review by LG HR Team.'}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    setShowProfileModal(false);
                    setIsOpen(true);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#A50034',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '11px 0',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <MessageSquare size={16} /> {lang === 'vi' ? 'Trò chuyện ngay' : 'Start Chat'}
                </button>
                <button 
                  onClick={() => {
                    setShowProfileModal(false);
                    const el = document.getElementById('jobs-board-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    borderRadius: '25px',
                    padding: '11px 0',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Briefcase size={16} /> {lang === 'vi' ? 'Xem việc làm HOT' : 'View Hot Jobs'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
