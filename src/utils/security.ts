/**
 * Security utility functions for XSS protection and safe content handling
 */

/**
 * Sanitize text content to prevent XSS attacks
 * Removes potentially dangerous HTML tags and scripts
 */
export const sanitizeText = (text: string): string => {
  if (typeof text !== 'string') return '';
  
  // Remove script tags and their content
  let sanitized = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous HTML tags
  sanitized = sanitized.replace(/<(iframe|object|embed|link|meta|style)[^>]*>/gi, '');
  
  // Remove javascript: and data: URLs
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/data:/gi, '');
  
  // Remove on* event handlers
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  
  return sanitized.trim();
};

/**
 * Validate and sanitize URLs to prevent malicious redirects
 * Only allows http, https, and mailto protocols
 */
export const validateURL = (url: string): string => {
  if (typeof url !== 'string') return '#';
  
  // Remove any potential XSS attempts
  const cleanUrl = sanitizeText(url);
  
  // Allow only safe protocols
  const allowedProtocols = ['http:', 'https:', 'mailto:'];
  
  try {
    const urlObj = new URL(cleanUrl);
    if (allowedProtocols.includes(urlObj.protocol)) {
      return cleanUrl;
    }
  } catch {
    // Invalid URL format
    return '#';
  }
  
  // If no protocol specified, assume https for external links
  if (cleanUrl.startsWith('www.') || cleanUrl.includes('.')) {
    return `https://${cleanUrl}`;
  }
  
  return '#';
};

/**
 * Validate project data structure to ensure it's safe
 */
export const validateProjectData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  // Check required fields exist and are of correct type
  const requiredFields = ['id', 'title', 'description', 'icon', 'featured'];
  
  for (const field of requiredFields) {
    if (!(field in data)) return false;
    
    if (field === 'id' && typeof data[field] !== 'number') return false;
    if ((field === 'title' || field === 'description' || field === 'icon') && typeof data[field] !== 'string') return false;
    if (field === 'featured' && typeof data[field] !== 'boolean') return false;
  }
  
  // Validate optional fields if they exist
  if (data.detailedDescription && typeof data.detailedDescription !== 'string') return false;
  if (data.features && !Array.isArray(data.features)) return false;
  if (data.link && typeof data.link !== 'string') return false;
  
  return true;
};

/**
 * Escape HTML characters to prevent XSS in text content
 */
export const escapeHtml = (text: string): string => {
  if (typeof text !== 'string') return '';
  
  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
};
