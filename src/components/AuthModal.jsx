import React, { useState } from 'react';
import { X, User, Briefcase, Mail, Lock, Building2 } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';

// role: initial role tab to show ('candidate' | 'employer')
// onSuccess: called with the logged-in/registered user
export default function AuthModal({ initialRole = 'candidate', onClose, onSuccess }) {
  const { lang } = useLanguage();
  const { login, register } = useAuth();

  const [role, setRole] = useState(initialRole);
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const resetFields = () => {
    setName('');
    setCompany('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSwitchRole = (newRole) => {
    setRole(newRole);
    resetFields();
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (mode === 'register' && !name)) {
      setError(lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin bắt buộc.' : 'Please fill in all required fields.');
      return;
    }

    if (mode === 'login') {
      const result = login({ role, email, password });
      if (!result.success) {
        setError(lang === 'vi'
          ? 'Email hoặc mật khẩu không đúng cho vai trò này.'
          : 'Incorrect email or password for this role.');
        return;
      }
      onSuccess(result.user);
    } else {
      const result = register({ role, name, company, email, password });
      if (!result.success) {
        setError(lang === 'vi'
          ? 'Email này đã được đăng ký cho vai trò này rồi.'
          : 'This email is already registered for this role.');
        return;
      }
      onSuccess(result.user);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 10000 }} onClick={onClose}>
      <div
        className="modal-content auth-modal"
        style={{ maxWidth: '440px', padding: '0', overflow: 'hidden', border: '1px solid #ddd' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ backgroundColor: '#A50034', color: '#fff', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800 }}>
            {mode === 'login'
              ? (lang === 'vi' ? 'Đăng nhập' : 'Sign In')
              : (lang === 'vi' ? 'Đăng ký tài khoản' : 'Create Account')}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Role Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          <button
            type="button"
            onClick={() => handleSwitchRole('candidate')}
            style={{
              flex: 1, padding: '14px', border: 'none', cursor: 'pointer',
              background: role === 'candidate' ? '#fff5f7' : '#fafafa',
              color: role === 'candidate' ? '#A50034' : '#888',
              fontWeight: role === 'candidate' ? 800 : 600,
              borderBottom: role === 'candidate' ? '3px solid #A50034' : '3px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13.5px'
            }}
          >
            <User size={15} /> {lang === 'vi' ? 'Ứng viên' : 'Candidate'}
          </button>
          <button
            type="button"
            onClick={() => handleSwitchRole('employer')}
            style={{
              flex: 1, padding: '14px', border: 'none', cursor: 'pointer',
              background: role === 'employer' ? '#fff5f7' : '#fafafa',
              color: role === 'employer' ? '#A50034' : '#888',
              fontWeight: role === 'employer' ? 800 : 600,
              borderBottom: role === 'employer' ? '3px solid #A50034' : '3px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13.5px'
            }}
          >
            <Briefcase size={15} /> {lang === 'vi' ? 'Nhà tuyển dụng' : 'Employer'}
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#444', display: 'block', marginBottom: '5px' }}>
                {role === 'candidate'
                  ? (lang === 'vi' ? 'Họ và tên' : 'Full Name')
                  : (lang === 'vi' ? 'Họ và tên người phụ trách' : 'Recruiter Full Name')} *
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0 10px' }}>
                <User size={15} color="#999" />
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '10px', fontSize: '13.5px' }}
                  placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                />
              </div>
            </div>
          )}

          {mode === 'register' && role === 'employer' && (
            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#444', display: 'block', marginBottom: '5px' }}>
                {lang === 'vi' ? 'Công ty / Bộ phận' : 'Company / Department'}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0 10px' }}>
                <Building2 size={15} color="#999" />
                <input
                  type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '10px', fontSize: '13.5px' }}
                  placeholder="LG Electronics Việt Nam"
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#444', display: 'block', marginBottom: '5px' }}>
              Email *
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0 10px' }}>
              <Mail size={15} color="#999" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', padding: '10px', fontSize: '13.5px' }}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#444', display: 'block', marginBottom: '5px' }}>
              {lang === 'vi' ? 'Mật khẩu' : 'Password'} *
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0 10px' }}>
              <Lock size={15} color="#999" />
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', padding: '10px', fontSize: '13.5px' }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {role === 'employer' && mode === 'login' && (
            <p style={{ fontSize: '11.5px', color: '#999', margin: 0 }}>
              {lang === 'vi'
                ? 'Demo: hr@lge.com / lgcareers2026'
                : 'Demo: hr@lge.com / lgcareers2026'}
            </p>
          )}

          {error && (
            <p style={{ fontSize: '12.5px', color: '#e53e3e', margin: 0, fontWeight: 600 }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn-pill-primary"
            style={{ padding: '12px', fontSize: '14px', cursor: 'pointer', marginTop: '4px' }}
          >
            {mode === 'login'
              ? (lang === 'vi' ? 'Đăng nhập' : 'Sign In')
              : (lang === 'vi' ? 'Đăng ký' : 'Create Account')}
          </button>

          <p style={{ fontSize: '12.5px', color: '#666', textAlign: 'center', margin: '2px 0 0' }}>
            {mode === 'login'
              ? (lang === 'vi' ? 'Chưa có tài khoản?' : "Don't have an account?")
              : (lang === 'vi' ? 'Đã có tài khoản?' : 'Already have an account?')}
            {' '}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleSwitchMode(mode === 'login' ? 'register' : 'login'); }}
              style={{ color: '#A50034', fontWeight: 700, textDecoration: 'none' }}
            >
              {mode === 'login' ? (lang === 'vi' ? 'Đăng ký ngay' : 'Register now') : (lang === 'vi' ? 'Đăng nhập' : 'Sign in')}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
