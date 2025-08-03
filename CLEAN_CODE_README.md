# Nexvor Studio - Clean Code Refactored

Bu proje, clean code prensipleri uygulanarak yeniden yapılandırılmıştır.

## 🏗️ Proje Yapısı

```
src/
├── types/           # TypeScript type tanımlamaları
├── hooks/           # Custom React hook'ları
├── utils/           # Yardımcı fonksiyonlar
├── components/      # React bileşenleri
│   ├── Icons/       # SVG ikon bileşenleri
│   ├── UI/          # Genel UI bileşenleri
│   ├── Header/      # Başlık bileşeni
│   ├── Footer/      # Alt bilgi bileşeni
│   ├── Hero/        # Ana sayfa hero bölümü
│   ├── AboutSection/    # Hakkımızda bölümü
│   ├── FeaturedSection/ # Öne çıkan projeler
│   ├── ProjectCard/     # Proje kartları
│   ├── ProjectDetailModal/ # Proje detay modalı
│   ├── ThemeSwitcher/   # Tema değiştirici
│   └── Pages/       # Sayfa bileşenleri
└── App.tsx         # Ana uygulama bileşeni
```

## 🧹 Uygulanan Clean Code Prensipleri

### 1. **Single Responsibility Principle (SRP)**
- Her bileşen tek bir sorumluluğa sahip
- Karmaşık bileşenler daha küçük parçalara bölündü
- Utility fonksiyonları ayrı dosyalarda organize edildi

### 2. **DRY (Don't Repeat Yourself)**
- Tekrarlanan kod blokları custom hook'lara çevrildi
- Ortak stil tanımlamaları ve sabitler merkezi hale getirildi
- Icon bileşenleri tek bir dosyada toplandı

### 3. **Meaningful Names (Anlamlı İsimlendirme)**
- Tüm fonksiyon ve değişkenler açıklayıcı isimler aldı
- Boolean değişkenler `is`, `has`, `should` ile başlıyor
- Handler fonksiyonları `handle` prefix'i ile başlıyor

### 4. **Small Functions (Küçük Fonksiyonlar)**
- Büyük bileşenler mantıklı alt bileşenlere bölündü
- Her fonksiyon tek bir işlevi yerine getiriyor
- Utility fonksiyonları tek amaçlı olarak yazıldı

### 5. **Proper Error Handling**
- Loading ve error state'leri merkezi olarak yönetiliyor
- User-friendly hata mesajları gösteriliyor
- API çağrıları try-catch blokları ile korunuyor

### 6. **Comments and Documentation**
- Her dosya açıklayıcı JSDoc yorumları ile başlıyor
- Karmaşık logic'ler inline yorumlarla açıklanıyor
- TypeScript interface'leri dokümante edildi

## 📦 Bileşen Organizasyonu

### **Atomic Design Prensibi**
- **Atoms**: Icon'lar, Button'lar, Input'lar
- **Molecules**: ProjectCard, ThemeSwitcher
- **Organisms**: Header, Footer, FeaturedSection
- **Templates**: Page layout'ları
- **Pages**: Tam sayfa bileşenleri

### **Custom Hook'lar**
- `useIntersectionObserver`: Viewport'a giriş animasyonları
- `useProjectData`: API verilerini yönetme

### **Utility Fonksiyonları**
- Theme yönetimi
- Local storage işlemleri
- DOM manipülasyonları
- Event handler'lar

## 🔧 Geliştirici Deneyimi

### **TypeScript Desteği**
- Tüm prop'lar ve state'ler tip güvenli
- Interface'ler merkezi olarak tanımlandı
- Type imports `import type` ile optimize edildi

### **Accessibility (Erişilebilirlik)**
- ARIA etiketleri eklendi
- Keyboard navigation desteği
- Screen reader uyumluluğu

### **Performance Optimizasyonu**
- Lazy loading ile intersection observer
- Gereksiz re-render'ların önlenmesi
- Bundle size optimizasyonu

## 🚀 Çalıştırma

```bash
npm run dev     # Geliştirme sunucusu
npm run build   # Production build
npm run preview # Build preview
```

## 📝 Kod Standartları

1. **Naming Conventions**
   - PascalCase: React bileşenleri
   - camelCase: Fonksiyonlar ve değişkenler
   - UPPER_SNAKE_CASE: Sabitler

2. **File Organization**
   - Her bileşen kendi klasöründe
   - Index.tsx dosyaları export hub olarak kullanılıyor
   - Types ayrı dosyalarda tanımlanıyor

3. **Import Organization**
   - React imports en üstte
   - Type imports `import type` ile
   - Local imports en altta

Bu yapı, projenin sürdürülebilirliğini artırır ve yeni geliştiricilerin projeye adapte olmasını kolaylaştırır.
