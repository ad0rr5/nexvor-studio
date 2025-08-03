# Güvenlik Dokümantasyonu

Bu dokümant, Nexvor Studio web sitesine uygulanan güvenlik önlemlerini açıklar.

## 🔒 Uygulanan Güvenlik Önlemleri

### 1. XSS (Cross-Site Scripting) Koruması

#### **Input Sanitization**
- Tüm kullanıcı verileri `sanitizeText()` fonksiyonu ile temizlenir
- Tehlikeli HTML etiketleri (`<script>`, `<iframe>`, `<object>`) kaldırılır
- JavaScript URL'leri (`javascript:`) engellenir
- Event handler'lar (`onclick`, `onload` vb.) kaldırılır

```typescript
// Örnek kullanım
const safeText = sanitizeText(userInput);
```

#### **HTML Escaping**
- Metin içeriği `escapeHtml()` ile güvenli hale getirilir
- Özel karakterler HTML entity'lerine çevrilir
- `&`, `<`, `>`, `"`, `'`, `/` karakterleri escape edilir

#### **Content Security Policy (CSP)**
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';">
```

### 2. Güvenli Link Yönetimi

#### **URL Validation**
- Tüm dış linkler `validateURL()` fonksiyonu ile kontrol edilir
- Sadece `http:`, `https:`, `mailto:` protokollerine izin verilir
- Geçersiz URL'ler `#` ile değiştirilir

#### **Secure Link Opening**
```typescript
// Güvenli link açma
const newWindow = window.open(safeLink, '_blank', 'noopener,noreferrer');
if (newWindow) {
  newWindow.opener = null; // window.opener erişimini engelle
}
```

#### **Link Attributes**
- `rel="noopener noreferrer nofollow"` eklenmiştir
- `target="_blank"` ile güvenli yeni sekme açılır

### 3. Dosya ve Dizin Güvenliği

#### **Directory Traversal Koruması**
```typescript
// Dosya yolu validasyonu
if (path.includes('..') || path.includes('\\')) {
  throw new Error('Invalid file path');
}
```

#### **Whitelist Dosya Erişimi**
```typescript
const allowedPaths = ['./data/games.json', './data/tools.json'];
if (!allowedPaths.includes(path)) {
  throw new Error('Unauthorized file access');
}
```

#### **Apache .htaccess Kuralları**

**Ana Dizin (`public/.htaccess`):**
```apache
# Dizin listelerini devre dışı bırak
Options -Indexes

# Hassas dosyalara erişimi engelle
<FilesMatch "\.(env|log|config|backup|json|md)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Güvenlik başlıkları
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
```

**Data Dizini (`data/.htaccess`):**
```apache
# Sadece JSON dosyalarına GET erişimi
<FilesMatch "\.json$">
    Require method GET
</FilesMatch>

# Diğer dosyalara erişim yok
<FilesMatch "^(?!.*\.json$).*$">
    Order Allow,Deny
    Deny from all
</FilesMatch>
```

### 4. Veri Validasyonu

#### **Project Data Validation**
```typescript
export const validateProjectData = (data: any): boolean => {
  // Zorunlu alanları kontrol et
  const requiredFields = ['id', 'title', 'description', 'icon', 'featured'];
  
  // Tip güvenliği
  if (field === 'id' && typeof data[field] !== 'number') return false;
  if ((field === 'title' || field === 'description') && typeof data[field] !== 'string') return false;
  
  return true;
};
```

#### **Array Validation**
```typescript
// API yanıtının array olduğunu kontrol et
if (!Array.isArray(data)) {
  throw new Error('Invalid data format: expected array');
}
```

### 5. HTTP Güvenlik Başlıkları

#### **Meta Etiketleri (HTML)**
```html
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```

#### **Vite Server Configuration**
```typescript
server: {
  host: 'localhost', // Sadece localhost erişimi
  headers: {
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  }
}
```

### 6. Build Güvenliği

#### **Source Map Gizleme**
```typescript
build: {
  sourcemap: mode !== 'production', // Production'da kaynak haritaları gizle
}
```

#### **Bundle Separation**
```typescript
manualChunks: {
  vendor: ['react', 'react-dom'],
  utils: ['src/utils/index.ts', 'src/utils/security.ts']
}
```

## 🛡️ Güvenlik Kontrol Listesi

### ✅ Tamamlanan Önlemler
- [x] XSS koruması (input sanitization)
- [x] HTML escaping
- [x] URL validation
- [x] Güvenli link açma
- [x] Directory traversal koruması
- [x] Dosya erişim whitelisting
- [x] HTTP güvenlik başlıkları
- [x] Content Security Policy
- [x] Apache .htaccess kuralları
- [x] Veri validasyonu
- [x] Source map gizleme

### 🔄 Önerilen Ek Önlemler (Gelecek)
- [ ] Rate limiting (API isteklerini sınırlama)
- [ ] CSRF token sistemi (form gönderimi için)
- [ ] SSL/TLS sertifikası (HTTPS)
- [ ] Web Application Firewall (WAF)
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning

## 🚨 Güvenlik Incident Response

### Şüpheli Aktivite Tespit Edildiğinde:
1. Console'da error loglarını kontrol edin
2. Network sekmesinde anormal istekleri araştırın
3. Data validation failed mesajlarını inceleyin
4. Güvenlik fonksiyonlarının çalıştığını doğrulayın

### Monitoring Points:
- `validateProjectData()` rejection'ları
- `sanitizeText()` filter'lamaları
- `validateURL()` rejection'ları
- Console error mesajları

## 📞 İletişim

Güvenlik açığı tespit ederseniz:
- Kritik: Hemen geliştirici ekibine bildirin
- Orta: Issue tracker'da güvenlik etiketi ile bildirin
- Düşük: Regular review'da değerlendirin

**Not:** Bu web sitesi kullanıcı verisi toplamadığı için veri ihlali riski minimumdur, ancak uygulanan güvenlik önlemleri siteyi genel web tehditlerinden korur.
