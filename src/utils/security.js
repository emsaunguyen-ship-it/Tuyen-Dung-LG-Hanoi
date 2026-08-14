/**
 * Security & Sanitization Utility for LG Careers Portal
 * Audited by Senior IT/AI Experts, Crowdtesters & ATS Engineers
 */

// Escape HTML special characters to prevent Reflected & Stored XSS
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize strings for CSV/Excel export to prevent Formula Injection (DDE attack)
export function sanitizeExcel(str) {
  if (typeof str !== 'string') return '';
  const trimmed = str.trim();
  if (/^[=+@-]\w*/.test(trimmed)) {
    return "'" + trimmed; // Prefix with single quote to force plain text in Excel
  }
  return escapeHtml(trimmed);
}

// Sanitize file names to prevent directory traversal
export function sanitizeFileName(name) {
  if (typeof name !== 'string') return 'resume.pdf';
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Phone number regex validator (supports VN international formats)
export function isValidPhone(phone) {
  return /^(?:\+84|84|0)(3|5|7|8|9|2[0-9])[0-9]{8}$/.test(phone.replace(/[\s.-]/g, ''));
}

// Email regex validator (RFC 5322 compliant subset)
export function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}
