# 📖 Nexvor Studio Website Kullanım Kılavuzu

Bu kılavuz, Nexvor Studio websitesine yeni oyunlar, araçlar eklemek veya mevcut içerikleri düzenlemek için gereken tüm adımları içerir.

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

### 1. Adım: `src/data/games.ts` dosyasını düzenleyin

```typescript
export const gamesData: Project[] = [
  // Mevcut oyunlar...

  // YENİ OYUN EKLEYİN:
  {
    id: 8, // 🚨 Benzersiz numara verin (mevcut ID'lere bakmayı unutmayın)
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

### 1. Adım: `src/data/tools.ts` dosyasını düzenleyin

```typescript
export const toolsData: Project[] = [
  // Mevcut araçlar...

  // YENİ ARAÇ EKLEYİN:
  {
    id: 9, // 🚨 Benzersiz numara verin
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

### 1. Adım: HTML Dosyası Oluşturun

```html
<!-- apps/yeni-uygulama.html -->
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <title>Yeni Uygulama</title>
    <!-- CSS ve JS kodlarınız -->
  </head>
  <body>
    <!-- Uygulama içeriği -->
  </body>
</html>
```

### 2. Adım: Public Klasörüne Kopyalayın

```bash
# Terminal/PowerShell'de:
copy "apps\yeni-uygulama.html" "public\apps\yeni-uygulama.html"
```

### 3. Adım: Data Dosyasına Ekleyin

```typescript
{
  "id": 10,
  "title": "Yeni Uygulama",
  "description": "Açıklama",
  "icon": "⚡",
  "featured": true,
  "detailedDescription": "Detaylı açıklama",
  "features": ["Özellik 1", "Özellik 2"],
  "link": "./apps/yeni-uygulama.html" // 🎯 Dosya yolu
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

### Değişiklikleri Canlıya Almak:

```bash
# 1. Build yapın
npm run build

# 2. Git'e ekleyin
git add .

# 3. Commit yapın
git commit -m "Yeni oyun/araç eklendi: [Adı]"

# 4. GitHub'a yükleyin
git push
```

### GitHub Pages Güncellemesi:

- GitHub'a push yaptıktan sonra 2-5 dakika bekleyin
- https://ad0rr5.github.io/nexvor-studio/ adresinde değişiklikler görünecek

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

Yeni bir oyun eklemek için:

1. `src/data/games.ts` dosyasını açın
2. En alta şunu ekleyin:

```typescript
{
  "id": 11, // Mevcut en yüksek ID + 1
  "title": "Süper Mario Klonu",
  "description": "Klasik platform oyunu deneyimi",
  "icon": "🍄",
  "featured": true,
  "detailedDescription": "Retro tarzda platform oyunu. Düşmanları yen, coin topla, seviye geç!",
  "features": ["20 seviye", "Power-up'lar", "Boss savaşları"],
  "link": "https://mario-klon.com"
}
```

3. Dosyayı kaydedin
4. Terminal'de: `npm run build`
5. Git'e commit yapın: `git add . && git commit -m "Mario klonu eklendi" && git push`

**Tebrikler! 🎉 Yeni oyununuz 5 dakika içinde canlıda olacak.**

---

_Bu kılavuz Nexvor Studio ekibi için hazırlanmıştır. Sorularınız için GitHub Issues kullanabilirsiniz._
