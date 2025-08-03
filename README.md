# 🚀 Nexvor Studio - Portfolio Website

Modern ve güvenli React + TypeScript tabanlı portfolio websitesi.

## 🌐 Canlı Site

**https://ad0rr5.github.io/nexvor-studio/**

## 📁 Proje Yapısı

```
nexvor-studio/
├── src/
│   ├── data/           # Oyun ve araç verileri
│   │   ├── games.ts    # Oyun listesi
│   │   └── tools.ts    # Araç listesi
│   ├── components/     # React bileşenleri
│   └── utils/          # Güvenlik ve yardımcı fonksiyonlar
├── public/apps/        # Harici uygulama dosyaları
└── KULLANIM_KILAVUZU.md # 📖 Detaylı kullanım rehberi
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

### Yeni Oyun:

1. `src/data/games.ts` dosyasını açın
2. Yeni oyun objesi ekleyin
3. `npm run build && git add . && git commit -m "Yeni oyun" && git push`

### Yeni Araç:

1. `src/data/tools.ts` dosyasını açın
2. Yeni araç objesi ekleyin
3. `npm run build && git add . && git commit -m "Yeni araç" && git push`

**📖 Detaylı rehber için [KULLANIM_KILAVUZU.md](./KULLANIM_KILAVUZU.md) dosyasını okuyun.**

## 🔧 Teknik Özellikler

- ⚛️ **React 19** + TypeScript
- 🎨 **Vite** Build Tool
- 🔒 **XSS Koruması** ve güvenlik önlemleri
- 📱 **Responsive** tasarım
- 🌙 **Dark/Light** tema desteği
- 🚀 **GitHub Pages** otomatik deployment

## 📦 Deployment

Değişiklikler GitHub'a push edildiğinde otomatik olarak canlıya alınır.

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

2-5 dakika sonra değişiklikler https://ad0rr5.github.io/nexvor-studio/ adresinde görünür.

## 👥 Ekip

- **Ayberk Doruk** - CEO & Kurucu Ortak
- **Efe Berke Ağlık** - CEO & Kurucu Ortak
- **Mustafa Gökay Hamarat** - CEO & Kurucu Ortak
- **Muhammet Rüzgar Çelik** - CEO & Kurucu Ortak

---

_Nexvor Studio - Geleceğin Teknoloji Liderleri 🚀_
