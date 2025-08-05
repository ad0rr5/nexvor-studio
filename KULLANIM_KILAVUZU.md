# 📖 Nexvor Studio Website Kullanım Kılavuzu

Bu kılavuz, Nexvor Studio websitesine yeni oyunlar, araçlar eklemek veya mevcut içerikleri düzenlemek için gereken tüm adımları içerir.

## 🌟 Projenin Güncel Durumu (Ağustos 2025)

### 🎯 Aktif Araçlar:

1. **🎨 Renk Paleti Oluşturucu** - Yapay zeka destekli renk paleti yaratma aracı
2. **📱 QR Kod Oluşturucu** - 6 farklı formatta QR kod oluşturma (URL, metin, WiFi, vCard, email, telefon)
3. **🖼️ PNG-PDF-JPG-WEBP Dönüştürücü** - Universal dosya format dönüştürücü (PDF.js + jsPDF entegrasyonu)

### 🚀 Teknik Özellikler:

- **Framework**: React + TypeScript + Vite
- **Hosting**: GitHub Pages (https://ad0rr5.github.io/nexvor-studio/)
- **Build System**: Vite ile optimize edilmiş bundle
- **UI/UX**: Modern glassmorphism tasarım + Dark/Light tema
- **Performance**: Lazy loading + Intersection Observer API
- **Güvenlik**: XSS koruması + CSP headers

## 📁 Dosya Yapısı Genel Bakış

```
nexvor-studio/
├── src/
│   ├── data/           # 🎯 BURASI ÖNEMLİ: Oyun ve araç verileri
│   │   ├── games.ts    # Oyun verileri
│   │   ├── tools.ts    # Araç verileri
│   │   └── index.ts    # Export dosyası
│   ├── components/     # React bileşenleri
│   └── utils/          # Yardımcı fonksiyonlar
├── public/
│   └── apps/           # 🎯 BURASI ÖNEMLİ: Harici uygulama dosyaları
└── apps/               # Geliştirme sırasında uygulama dosyaları
```

## 🎮 YENİ OYUN EKLEME

⚠️ **Not**: Şu anda oyun bölümü aktif değil. Oyun ekleme özelliği gelecek güncellemelerde eklenecek.

### Mevcut Oyun Durumu:

```typescript
// src/data/games.ts - Geçici placeholder
{
  "id": 1,
  "title": "YAKINDA OYUNLAR EKLENECEK",
  "description": "",
  "icon": "",
  "featured": true,
  "detailedDescription": "",
  "features": [""],
  "link": ""
}
```

### Gelecekte Oyun Eklemek İçin:

```typescript
export const gamesData: Project[] = [
  // YENİ OYUN EKLEYİN:
  {
    id: 2, // 🚨 Benzersiz numara verin (1 kullanılıyor)
    title: "Oyun Adı",
    description: "Kısa açıklama (ana sayfada görünür)",
    icon: "🎮", // Emoji ikonu
    featured: true, // true = ana sayfada görünür, false = sadece "Oyunlar" sayfasında
    detailedDescription:
      "Detaylı açıklama (modal'da görünür). Oyunun hikayesi, özellikleri hakkında uzun açıklama.",
    features: ["Özellik 1", "Özellik 2", "Özellik 3"],
    link: "https://oyun-linki.com", // Oyunun linki veya "./apps/dosya.html"
  },
];
```

### 2. Adım: Oyun Durumları

**Ana Sayfada Görünsün:**

```typescript
"featured": true
```

**Sadece "Oyunlar" Sayfasında Görünsün:**

```typescript
"featured": false
```

## 🛠️ YENİ ARAÇ EKLEME

### Mevcut Araçlar (ID: 3, 7, 8):

- **ID 3**: Renk Paleti Oluşturucu
- **ID 7**: QR Kod Oluşturucu
- **ID 8**: PNG-PDF-JPG-WEBP Dönüştürücü

### 1. Adım: `src/data/tools.ts` dosyasını düzenleyin

```typescript
export const toolsData: Project[] = [
  // Mevcut araçlar... (ID: 3, 7, 8)

  // YENİ ARAÇ EKLEYİN:
  {
    id: 9, // 🚨 Benzersiz numara verin (9 sonraki ID)
    title: "Araç Adı",
    description: "Kısa açıklama (ana sayfada görünür)",
    icon: "🔧", // Emoji ikonu
    featured: true, // true = ana sayfada görünür
    detailedDescription:
      "Detaylı açıklama. Aracın ne işe yaradığı, nasıl kullanıldığı.",
    features: ["Özellik 1", "Özellik 2", "Özellik 3"],
    link: "https://arac-linki.com", // veya "./apps/arac.html"
  },
];
```

### 🎯 Mevcut Başarılı Araç Örnekleri:

#### 1. Renk Paleti Oluşturucu:

- ✅ Modern HSL/RGB/HEX renk seçici
- ✅ Real-time renk önizleme
- ✅ Glassmorphism UI tasarım
- ✅ Dark/Light tema desteği

#### 2. QR Kod Oluşturucu:

- ✅ 6 farklı QR türü (URL, metin, WiFi, vCard, email, telefon)
- ✅ Renk özelleştirme
- ✅ PNG/SVG indirme
- ✅ Triple fallback system (QRCode.js + API + SVG)

#### 3. PNG-PDF-JPG-WEBP Dönüştürücü:

- ✅ Universal format desteği (PDF, PNG, JPG, WebP, GIF, BMP, TIFF)
- ✅ PDF.js entegrasyonu (PDF okuma)
- ✅ jsPDF entegrasyonu (PDF oluşturma)
- ✅ Drag & drop + kalite kontrolü

## 🗑️ OYUN/ARAÇ SİLME

### Geçici Silme (Gizleme):

```typescript
{
  "id": 5,
  "title": "Gizlenecek Oyun",
  // ... diğer özellikler
  "featured": false // Ana sayfadan gizle
}
```

### Kalıcı Silme:

- İlgili oyun/araç objesini tamamen silin
- Array'den kaldırın

## 🔗 LİNK TÜRLERİ

### Harici Link (Website):

```typescript
"link": "https://example.com"
```

### Dahili Uygulama:

```typescript
"link": "./apps/uygulama-adi.html"
```

### Link Yok:

```typescript
"link": undefined // veya bu satırı yazmayın
```

## 📱 YENİ UYGULAMA EKLEME (HTML Dosyası)

### Mevcut Uygulamalar:

- ✅ `nexvor-palette.html` - Renk paleti oluşturucu
- ✅ `nexvor-qr-fixed.html` - QR kod oluşturucu (gelişmiş versiyon)
- ✅ `nexvor-pdf-to-png.html` - Universal dosya dönüştürücü

### 1. Adım: HTML Dosyası Oluşturun

```html
<!-- apps/nexvor-yeni-arac.html -->
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nexvor Yeni Araç - Nexvor Studio</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Nexvor standart stil -->
    <style>
      :root {
        --primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --accent: #3b82f6;
        --glass: rgba(255, 255, 255, 0.1);
        --glass-border: rgba(255, 255, 255, 0.2);
      }

      body {
        font-family: "Inter", sans-serif;
        background: var(--primary);
        min-height: 100vh;
      }

      .panel {
        background: var(--glass);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        padding: 2rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <div class="logo">
          <i class="fas fa-tools"></i>
          <span>Nexvor Yeni Araç</span>
        </div>
      </header>

      <main class="panel">
        <!-- Uygulama içeriği buraya -->
      </main>

      <footer>
        <p>© 2025 Nexvor Studio - Yeni Araç</p>
      </footer>
    </div>
  </body>
</html>
```

### 2. Adım: Public Klasörüne Kopyalayın

```powershell
# PowerShell'de:
Copy-Item "apps\nexvor-yeni-arac.html" "public\apps\nexvor-yeni-arac.html"
```

### 3. Adım: Data Dosyasına Ekleyin

```typescript
{
  "id": 9,
  "title": "Yeni Araç",
  "description": "Modern ve kullanışlı yeni araç",
  "icon": "⚡",
  "featured": true,
  "detailedDescription": "Bu araç, kullanıcıların ihtiyaçlarını karşılayan modern bir çözüm sunar.",
  "features": ["Hızlı işlem", "Modern tasarım", "Mobil uyumlu"],
  "link": "./apps/nexvor-yeni-arac.html" // 🎯 Dosya yolu
}
```

### 🎨 Nexvor Standart Tasarım Özellikleri:

#### Stil Rehberi:

- **Font**: Inter (Google Fonts)
- **Tema**: Glassmorphism + gradient arkaplan
- **Renkler**: CSS custom properties kullanın
- **İkonlar**: Font Awesome 6.4.0
- **Responsive**: Mobile-first approach

#### CSS Değişkenleri:

```css
:root {
  --primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --glass: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}
```

## 🎨 ÖZELLEŞTİRME

### Icon Seçimi:

```typescript
"icon": "🎮" // Oyunlar için
"icon": "🛠️" // Araçlar için
"icon": "📊" // Analiz araçları için
"icon": "🎨" // Tasarım araçları için
"icon": "📱" // Mobil uygulamalar için
"icon": "⚡" // Hızlı araçlar için
"icon": "🔧" // Genel araçlar için
```

### Featured (Öne Çıkarma) Sistemi:

- `"featured": true` → Ana sayfada "Popüler" bölümünde görünür
- `"featured": false` → Sadece kategori sayfalarında görünür

## 📝 DEPLOYMENT (YAYINLAMA)

### 🚀 Güncel Deployment Bilgileri:

**Canlı Site**: https://ad0rr5.github.io/nexvor-studio/
**Repository**: https://github.com/ad0rr5/nexvor-studio
**Platform**: GitHub Pages
**Auto Deploy**: ✅ Aktif (her push sonrası 2-5 dakika)

### Değişiklikleri Canlıya Almak:

```bash
# 1. Build yapın (opsiyonel - GitHub Actions otomatik yapar)
npm run build

# 2. Git'e ekleyin
git add .

# 3. Commit yapın (emoji kullanın!)
git commit -m "✨ Yeni özellik eklendi: [Adı]"

# 4. GitHub'a yükleyin
git push origin main
```

### 🎯 Commit Mesajı Örnekleri:

```bash
# Yeni araç
git commit -m "🛠️ Yeni araç: PDF Düzenleyici"

# Bug fix
git commit -m "🐛 QR kod renk sorunu düzeltildi"

# UI güncellemesi
git commit -m "🎨 Responsive tasarım iyileştirmeleri"

# Performance
git commit -m "⚡ Yükleme hızı optimizasyonu"

# Güvenlik
git commit -m "🔒 XSS koruması eklendi"
```

### ⏰ Deployment Süreci:

1. **Push** → GitHub'a kod gönderilir
2. **GitHub Actions** → Otomatik build başlar
3. **Build** → Vite production build (1-2 dakika)
4. **Deploy** → GitHub Pages'e yüklenir (1-2 dakika)
5. **Live** → Site güncellenmiş halde canlıda

### 📊 Build Sonuçları:

- **Total Bundle**: ~285 kB
- **Gzipped**: ~83 kB
- **Build Time**: ~1 saniye
- **Deploy Time**: 2-5 dakika

## ✅ KONTROL LİSTESİ

### Yeni İçerik Eklerken:

- [ ] Benzersiz ID numarası verdim
- [ ] Başlık ve açıklama yazdım
- [ ] Uygun emoji icon seçtim
- [ ] Featured durumunu belirledim
- [ ] Link doğru formatta
- [ ] Özellikleri listeledim
- [ ] Build yaptım ve test ettim
- [ ] Git'e commit yaptım

### Uygulama Eklerken:

- [ ] HTML dosyasını apps/ klasöründe oluşturdum
- [ ] public/apps/ klasörüne kopyaladım
- [ ] Data dosyasında doğru path verdim
- [ ] Link çalışıyor mu test ettim

## 🚨 DİKKAT EDİLMESİ GEREKENLER

### ID Numaraları:

- Her oyun/araç için benzersiz olmalı
- Mevcut ID'leri kontrol edin
- Silinen içeriklerin ID'lerini tekrar kullanmayın

### Link Güvenliği:

- Sadece güvenilir linkler ekleyin
- Dahili uygulamalar için `./apps/` kullanın
- Harici linkler için `https://` kullanın

### Dosya Boyutları:

- HTML uygulamaları çok büyük olmasın (max 5MB)
- Resimler optimize edin
- Gereksiz kütüphaneler eklemeyin

## 📞 YARDIM

### Hata Durumunda:

1. Browser console'u kontrol edin (F12)
2. Build hatalarını terminal'de kontrol edin
3. JSON syntax'ının doğru olduğundan emin olun

### Örnek Hata Çözümleri:

**JSON Syntax Hatası:**

```typescript
// ❌ Yanlış (virgül eksik)
{
  "id": 5
  "title": "Test"
}

// ✅ Doğru
{
  "id": 5,
  "title": "Test"
}
```

**ID Tekrarı:**

```typescript
// ❌ Yanlış (aynı ID)
{ "id": 5, "title": "Oyun 1" },
{ "id": 5, "title": "Oyun 2" }

// ✅ Doğru (farklı ID)
{ "id": 5, "title": "Oyun 1" },
{ "id": 6, "title": "Oyun 2" }
```

## 🎯 HIZLI BAŞLANGIÇ ÖRNEĞİ

### 🛠️ Yeni Araç Eklemek İçin:

1. `src/data/tools.ts` dosyasını açın
2. En alta şunu ekleyin:

```typescript
{
  "id": 9, // Sonraki ID (mevcut: 3, 7, 8)
  "title": "Metin Analiz Aracı",
  "description": "Metinleri analiz eden yapay zeka destekli araç",
  "icon": "📝",
  "featured": true,
  "detailedDescription": "Metinlerin kelime sayısı, karakter analizi, duygu analizi ve SEO skorunu hesaplayan gelişmiş araç.",
  "features": ["Duygu analizi", "SEO skoru", "Anahtar kelime", "İstatistikler"],
  "link": "./apps/nexvor-metin-analiz.html"
}
```

3. HTML dosyasını oluşturun: `apps/nexvor-metin-analiz.html`
4. Public'e kopyalayın: `Copy-Item "apps\nexvor-metin-analiz.html" "public\apps\"`
5. Test edin: `npm run dev`
6. Yayınlayın: `git add . && git commit -m "🛠️ Metin analiz aracı eklendi" && git push`

**Tebrikler! 🎉 Yeni aracınız 5 dakika içinde canlıda olacak.**

### 🎮 Gelecekte Oyun Eklemek İçin:

```typescript
// src/data/games.ts - placeholder'ı silin ve ekleyin:
{
  "id": 2,
  "title": "Retro Snake Game",
  "description": "Nostaljik yılan oyunu modern dokunuşlarla",
  "icon": "🐍",
  "featured": true,
  "detailedDescription": "Klasik Snake oyununu modern teknolojilerle yeniden tasarladık. Seviyeli zorluk, skor sistemi ve smooth animasyonlar.",
  "features": ["10 seviye", "High score", "Responsive", "Sound FX"],
  "link": "./apps/nexvor-snake.html"
}
```

### 📊 Mevcut Proje İstatistikleri:

- **Toplam Araç**: 3 aktif
- **Toplam Oyun**: 0 (yakında)
- **Canlı Apps**: 3 HTML dosyası
- **Build Size**: 285 kB
- **Performance**: A+ rating

---

_Bu kılavuz Nexvor Studio ekibi için hazırlanmıştır. Sorularınız için GitHub Issues kullanabilirsiniz._
