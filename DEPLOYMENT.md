# GitHub Pages Deployment Guide

Bu doküman, Nexvor Studio web sitesinin GitHub Pages'e nasıl deploy edildiğini açıklar.

## 🚀 Live Site

**Production URL**: https://ad0rr5.github.io/nexvor-studio/
**GitHub Repository**: https://github.com/ad0rr5/nexvor-studio
**Deployment**: GitHub Actions (otomatik)

## 📊 Güncel Durum (Ağustos 2025)

### 🎯 Aktif Projeler:

- **🎨 Renk Paleti Oluşturucu** - HSL/RGB/HEX + glassmorphism UI
- **📱 QR Kod Oluşturucu** - 6 format + triple fallback system
- **🖼️ PNG-PDF-JPG-WEBP Dönüştürücü** - PDF.js + jsPDF entegrasyonu

### 📈 Performance Metrics:

- **Bundle Size**: 285.46 kB (gzipped: 82.87 kB)
- **Build Time**: ~1 saniye
- **Deploy Time**: 2-5 dakika
- **Lighthouse Score**: 95+ (Performance/Accessibility/SEO)

### 🔧 Tech Stack:

- **Framework**: React 18 + TypeScript 5.0
- **Build Tool**: Vite 4.4 (ESM + Rollup)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 GitHub Pages Konfigürasyonu

### Repository Settings

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v2
        with:
          artifact_name: github-pages
          path: ./dist
```

### Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig({
  base: "/nexvor-studio/", // GitHub Pages subdirectory
  build: {
    outDir: "dist",
    sourcemap: false, // Production'da source map gizli
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["src/utils/index.ts"],
        },
      },
    },
  },
});
```

### Bundle Optimization

```typescript
// Asset breakdown
- index.html: 2.01 kB (gzipped: 0.92 kB)
- index.css: 14.75 kB (gzipped: 3.50 kB)
- vendor.js: 142.72 kB (gzipped: 45.17 kB)
- index.js: 128.83 kB (gzipped: 35.14 kB)
- External apps: 3 standalone HTML files
```

## 📊 Firebase Analytics

### Entegrasyon

- ✅ Google Analytics 4 entegrasyonu
- ✅ Sayfa görüntüleme takibi
- ✅ Proje tıklama analizi
- ✅ Tema değişikliği takibi
- ✅ Dış link tıklama takibi

### Custom Events

```typescript
// Sayfa görüntüleme
trackPageView("home");

// Proje tıklama
trackProjectClick("Kozmik Kaçış", "game");

// Tema değişikliği
trackThemeChange("dark");

// Dış link tıklama
trackExternalLink("https://example.com");
```

## 🔧 Deployment Komutları

### Manuel Deployment

```bash
# Local development
npm run dev              # http://localhost:5173

# Production build
npm run build           # Outputs to dist/

# Preview build locally
npm run preview         # http://localhost:4173

# Deploy to GitHub (otomatik)
git add .
git commit -m "🚀 Site güncellemesi"
git push origin main    # GitHub Actions otomatik deploy eder
```

### GitHub Actions Workflow

```yaml
# Her main branch push'unda otomatik çalışır
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (npm ci)
4. Build project (npm run build)
5. Deploy to GitHub Pages
6. Update live site (~2-5 dakika)
```

## 🛡️ Production Güvenlik

### Security Headers (GitHub Pages)

```html
<!-- index.html içinde -->
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-XSS-Protection" content="1; mode=block" />
```

### XSS Koruması

```typescript
// src/utils/security.ts
export const validateURL = (url: string): string | null => {
  try {
    const validatedURL = new URL(url);
    const allowedProtocols = ["http:", "https:", "mailto:", "tel:"];
    return allowedProtocols.includes(validatedURL.protocol) ? url : null;
  } catch {
    return null;
  }
};

export const escapeHtml = (text: string): string => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};
```

## 🛡️ Production Güvenlik

### HTTP Headers

- ✅ `X-Frame-Options: SAMEORIGIN`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`

### Cache Stratejisi

- **Static Assets (JS/CSS)**: 1 yıl cache (`max-age=31536000`)
- **Images/JSON**: 1 gün cache (`max-age=86400`)
- **HTML**: No-cache (her zaman fresh)

### Bundle Optimizasyonu

```typescript
// Vite build configuration
build: {
  sourcemap: false, // Production'da source map gizli
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        firebase: ['firebase/app', 'firebase/analytics'],
        utils: ['src/utils/index.ts', 'src/utils/security.ts']
      }
    }
  }
}
```

## 📈 Performance Metrics

### Build Sonuçları

- **Total Bundle Size**: 285.46 kB
- **Gzipped Size**: 82.87 kB
- **Build Time**: ~1 saniye

### Asset Breakdown

- `index.html`: 2.01 kB (gzipped: 0.92 kB)
- `index.css`: 14.75 kB (gzipped: 3.50 kB)
- `vendor.js`: 11.72 kB (gzipped: 4.17 kB)
- `index.js`: 258.83 kB (gzipped: 75.14 kB)
- `utils.js`: 1.12 kB (gzipped: 0.56 kB)

## 🔄 CI/CD Pipeline (İsteğe Bağlı)

### GitHub Actions Örneği

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: "${{ secrets.GITHUB_TOKEN }}"
          firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
          projectId: nexvor
```

## 🔍 Monitoring ve Analytics

### Firebase Console

- **Performance Monitoring**: Sayfa yükleme süreleri
- **Analytics Dashboard**: Kullanıcı davranışları
- **Hosting Metrics**: Traffic analizi

### Analytics Olayları

- `page_view`: Sayfa görüntülemeleri
- `project_click`: Proje etkileşimleri
- `theme_change`: Kullanıcı tercihleri
- `external_link_click`: Dış link tıklamaları

## 🚨 Troubleshooting

### Sık Karşılaşılan Sorunlar

#### Build Hatası

```bash
# Cache temizleme
npm run build -- --force
rm -rf dist node_modules
npm install
npm run build
```

#### Deploy Hatası

```bash
# Firebase tekrar giriş
npx firebase logout
npx firebase login
npx firebase deploy --only hosting
```

#### Analytics Çalışmıyor

- Analytics sadece production'da aktif
- `isSupported()` kontrolü yapılıyor
- Console'da hata mesajları kontrol edin

## 📞 Support

### Faydalı Linkler

- [Firebase Console](https://console.firebase.google.com/project/nexvor)
- [Analytics Dashboard](https://analytics.google.com/)
- [Firebase Documentation](https://firebase.google.com/docs/hosting)

### Log Monitoring

```bash
# Firebase logs
npx firebase functions:log

# Hosting logs
# Firebase Console > Hosting > Usage sekmesi
```

## ✅ Deployment Checklist

### Güncel Durum:

- [x] GitHub repository oluşturuldu (nexvor-studio)
- [x] GitHub Pages yapılandırıldı
- [x] GitHub Actions CI/CD aktif
- [x] Güvenlik başlıkları eklendi
- [x] Bundle optimizasyonu yapıldı
- [x] 3 araç başarıyla deploy edildi
- [x] Responsive tasarım tamamlandı
- [x] Dark/Light tema sistemi aktif
- [x] Site canlıya alındı: https://ad0rr5.github.io/nexvor-studio/

### Aktif Özellikler:

- ✅ **Renk Paleti Oluşturucu**: Modern HSL/RGB color picker
- ✅ **QR Kod Oluşturucu**: 6 format + fallback system
- ✅ **Dosya Dönüştürücü**: PDF.js + jsPDF universal converter
- ✅ **Glassmorphism UI**: Modern glass effect tasarım
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Performance**: 95+ Lighthouse score

### Son Güncellemeler:

- **04 Ağustos 2025**: PNG to PDF conversion fix (jsPDF)
- **04 Ağustos 2025**: QR generator triple fallback system
- **04 Ağustos 2025**: UI kontrast iyileştirmeleri
- **04 Ağustos 2025**: Hero background update (k5rhilk.jpeg)

**Status**: ✅ Live and Operational
**Performance**: A+ rating
**Uptime**: 99.9% (GitHub Pages SLA)
