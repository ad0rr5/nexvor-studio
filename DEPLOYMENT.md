# Firebase Deployment Guide

Bu doküman, Nexvor Studio web sitesinin Firebase Hosting'e nasıl deploy edildiğini açıklar.

## 🚀 Live Site

**Production URL:** https://nexvor.web.app  
**Firebase Console:** https://console.firebase.google.com/project/nexvor/overview

## 📁 Firebase Konfigürasyonu

### Firebase Config (`src/firebase/config.ts`)
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAup9nu6NZ4BHa4ij7W0VRx2Q63DiSrkT8",
  authDomain: "nexvor.firebaseapp.com",
  projectId: "nexvor",
  storageBucket: "nexvor.firebasestorage.app",
  messagingSenderId: "19170940333",
  appId: "1:19170940333:web:9170a47674459cbf7b3d24",
  measurementId: "G-28BWTF1X8B"
};
```

### Hosting Konfigürasyonu (`firebase.json`)
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      // Güvenlik başlıkları
      {
        "source": "**",
        "headers": [
          {"key": "X-Frame-Options", "value": "SAMEORIGIN"},
          {"key": "X-Content-Type-Options", "value": "nosniff"},
          {"key": "X-XSS-Protection", "value": "1; mode=block"},
          {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"}
        ]
      },
      // Cache optimizasyonu
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}
        ]
      }
    ]
  }
}
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
trackPageView('home');

// Proje tıklama
trackProjectClick('Kozmik Kaçış', 'game');

// Tema değişikliği
trackThemeChange('dark');

// Dış link tıklama
trackExternalLink('https://example.com');
```

## 🔧 Deployment Komutları

### Manuel Deployment
```bash
# Development sunucusu
npm run dev

# Production build
npm run build

# Deploy to Firebase
npm run deploy

# Sadece hosting deploy
npm run deploy:hosting
```

### Quick Deploy
```bash
# Tek komutta build + deploy
npm run deploy
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
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
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

- [x] Firebase projesi oluşturuldu
- [x] Hosting yapılandırıldı
- [x] Analytics entegre edildi
- [x] Güvenlik başlıkları eklendi
- [x] Cache optimizasyonu yapıldı
- [x] Production build başarılı
- [x] Site canlıya alındı: https://nexvor.web.app

**Son Deploy:** 3 Ağustos 2025  
**Status:** ✅ Live and Operational
