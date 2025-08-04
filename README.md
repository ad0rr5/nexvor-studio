# 🚀 Nexvor Studio - Modern Web Toolkit

Modern ve güvenli React + TypeScript tabanlı web araç koleksiyonu.

## 🌟 Güncel Durum (Ağustos 2025)

### 🎯 Aktif Araçlar:

- **🎨 Renk Paleti Oluşturucu** - HSL/RGB/HEX format + glassmorphism UI
- **📱 QR Kod Oluşturucu** - 6 format (URL, metin, WiFi, vCard, email, tel) + triple fallback
- **🖼️ PNG-PDF-JPG-WEBP Dönüştürücü** - PDF.js + jsPDF universal converter

### 📊 Teknik Özellikler:

- **Bundle Size**: 285kB total, 83kB gzipped
- **Performance**: 95+ Lighthouse score
- **Build Time**: ~1 saniye
- **Deploy Time**: 2-5 dakika otomatik

## 🌐 Canlı Site

**https://ad0rr5.github.io/nexvor-studio/**

## 📁 Proje Yapısı

```
nexvor-studio/
├── src/
│   ├── data/           # Merkezi veri yönetimi
│   │   ├── games.ts    # Oyun listesi (yakında)
│   │   └── tools.ts    # Araç listesi (3 aktif)
│   ├── components/     # React bileşenleri (atomic design)
│   └── utils/          # Güvenlik + XSS koruması
├── public/apps/        # Standalone HTML uygulamaları
│   ├── nexvor-palette.html          # Renk paleti
│   ├── nexvor-qr-fixed.html         # QR generator
│   └── nexvor-pdf-to-png.html       # File converter
└── KULLANIM_KILAVUZU.md # 📖 Detaylı geliştirici rehberi
```

## 🛠️ Geliştirme

**Gereksinimler:** Node.js 18+

### Kurulum:

```bash
npm install
```

### Geliştirme Sunucusu:

```bash
npm run dev
```

### Production Build:

```bash
npm run build
```

## ➕ İçerik Ekleme (Hızlı)

### 🛠️ Yeni Araç (Aktif):

1. `src/data/tools.ts` dosyasını açın
2. Yeni araç objesi ekleyin (ID: 9+)
3. HTML dosyası oluşturun: `apps/nexvor-yeni-arac.html`
4. Public'e kopyalayın: `Copy-Item "apps\*.html" "public\apps\"`
5. Deploy: `git add . && git commit -m "🛠️ Yeni araç" && git push`

### 🎮 Yeni Oyun (Yakında):

1. `src/data/games.ts` placeholder'ını kaldırın
2. Yeni oyun objesi ekleyin (ID: 2+)
3. Deploy: `git add . && git commit -m "🎮 Yeni oyun" && git push`

**📖 Detaylı rehber: [KULLANIM_KILAVUZU.md](./KULLANIM_KILAVUZU.md)**

## 🔧 Teknik Özellikler

- ⚛️ **React 18** + TypeScript 5.0
- ⚡ **Vite 4.4** Build Tool (ultra-fast HMR)
- 🎨 **Glassmorphism** modern UI design
- 🔒 **XSS Koruması** + URL validation + HTML escaping
- 📱 **Mobile-first** responsive design
- 🌙 **Dark/Light** tema sistemi (localStorage persistent)
- 🚀 **GitHub Actions** CI/CD + otomatik deployment
- 📊 **Performance**: 95+ Lighthouse score
- 🎯 **Bundle**: 285kB (83kB gzipped)

## 📦 Deployment

GitHub Actions otomatik deployment aktif! Her main branch push'unda:

```bash
git add .
git commit -m "✨ Yeni özellik açıklaması"  # Emoji kullanın!
git push origin main
```

**⏰ Süreç**: 2-5 dakika sonra → https://ad0rr5.github.io/nexvor-studio/

### 🎯 Commit Örnekleri:

```bash
git commit -m "🛠️ Yeni araç: Video Düzenleyici"
git commit -m "🐛 QR kod renk sorunu düzeltildi"
git commit -m "🎨 UI kontrast iyileştirmeleri"
git commit -m "⚡ Bundle size optimizasyonu"
```

## 👥 Ekip

- **Ayberk Doruk** - Kurucu

---

_Nexvor Studio - Geleceğin Teknoloji Liderleri 🚀_
