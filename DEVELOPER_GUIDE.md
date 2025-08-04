# Nexvor Studio - Geliştirici Kurulum Kılavuzu

## 🌟 Proje Durumu (Ağustos 2025)

### 🎯 Aktif Projeler:

- **🎨 Renk Paleti Oluşturucu**: HSL/RGB/HEX format desteği
- **📱 QR Kod Oluşturucu**: 6 format + triple fallback system
- **🖼️ PNG-PDF-JPG-WEBP Dönüştürücü**: PDF.js + jsPDF entegrasyonu

### 🚀 Teknik Stack:

- **Framework**: React 18 + TypeScript 5.0
- **Build Tool**: Vite 4.4 (ultra-fast HMR)
- **Hosting**: GitHub Pages (Auto-deploy)
- **Styling**: CSS Custom Properties + Glassmorphism
- **Performance**: Lazy loading + Intersection Observer
- **Bundle Size**: 285kB total, 83kB gzipped

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js v18+ (Recommended: v20.x)
- npm 9+ veya yarn 3+
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

### Kurulum

```bash
# Repository'yi klonla
git clone https://github.com/ad0rr5/nexvor-studio.git
cd nexvor-studio

# Bağımlılıkları yükle (~30 saniye)
npm install

# Geliştirme sunucusunu başlat (http://localhost:5173)
npm run dev

# Production build (dist/ klasörüne)
npm run build

# Build önizlemesi
npm run preview
```

## 📁 Proje Yapısı Açıklaması

### **Temel Dosyalar**

- `index.tsx` - Uygulama giriş noktası
- `index.html` - HTML şablonu
- `index.css` - Global stiller
- `vite.config.ts` - Vite yapılandırması

### **Kaynak Kod Organizasyonu** (`src/`)

#### **Data Layer** (`src/data/`)

```typescript
// Merkezi veri yönetimi
games.ts; // Oyun verileri (şu anda placeholder)
tools.ts; // Araç verileri (3 aktif araç)
index.ts; // Unified export
```

**Aktif Araçlar:**

- ID 3: Renk Paleti Oluşturucu
- ID 7: QR Kod Oluşturucu
- ID 8: PNG-PDF-JPG-WEBP Dönüştürücü

#### **Types** (`src/types/`)

```typescript
// Tüm TypeScript type tanımlamaları
export type Theme = "light" | "dark";
export type Page = "home" | "games" | "tools" | "about";
export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  detailedDescription: string;
  features: string[];
  link: string;
}
```

#### **Hooks** (`src/hooks/`)

```typescript
// Custom React hook'ları
useIntersectionObserver(); // Viewport animasyonları (Intersection Observer API)
useTheme(); // Dark/Light tema yönetimi
useLocalStorage(); // Persistent state management
```

#### **Utils** (`src/utils/`)

```typescript
// Yardımcı fonksiyonlar
getInitialTheme(); // Sistem tercihi + localStorage
applyTheme(); // CSS custom properties update
toggleBodyScroll(); // Modal scroll kontrolü
validateURL(); // XSS koruması için URL validation
escapeHtml(); // HTML injection koruması
```

#### **Components** (`src/components/`)

Her bileşen kendi klasöründe ve şu yapıyı takip eder:

```
ComponentName/
├── index.tsx        // Ana bileşen kodu
└── README.md        // Bileşen dokümantasyonu (opsiyonel)
```

**Aktif Bileşenler:**

- `Header/` - Navigasyon + tema switcher
- `Hero/` - Ana sayfa hero bölümü (k5rhilk.jpeg arkaplan)
- `FeaturedSection/` - Öne çıkan projeler grid
- `ProjectCard/` - Proje kartları (glassmorphism tasarım)
- `ProjectDetailModal/` - Proje detay popup'ı
- `ThemeSwitcher/` - Dark/Light tema toggle
- `Footer/` - Site alt bilgileri
- `Icons/` - SVG ikon komponenti
- `UI/` - Genel kullanım bileşenleri
- `Pages/` - Sayfa bileşenleri (Games, Tools, About)

**External Apps:** (`public/apps/`)

- `nexvor-palette.html` - Standalone renk paleti aracı
- `nexvor-qr-fixed.html` - Standalone QR generator
- `nexvor-pdf-to-png.html` - Standalone file converter

## 🛠️ Geliştirme Kuralları

### **1. Yeni Bileşen Ekleme**

```typescript
// src/components/YeniBileşen/index.tsx
import React from "react";
import type { PropTypes } from "../../types";

interface YeniBileşenProps {
  // Prop tanımlamaları
}

/**
 * Bileşen açıklaması
 */
export const YeniBileşen = ({ props }: YeniBileşenProps) => {
  return <div className="yeni-bileşen">{/* İçerik */}</div>;
};
```

### **2. Hook Ekleme**

```typescript
// src/hooks/index.ts içine ekle
export const useYeniHook = () => {
  // Hook logic'i
  return { state, actions };
};
```

### **3. Utility Fonksiyonu Ekleme**

```typescript
// src/utils/index.ts içine ekle
export const yeniUtilityFonksiyon = (param: Type): ReturnType => {
  // İşlem logic'i
  return result;
};
```

### **4. Type Ekleme**

```typescript
// src/types/index.ts içine ekle
export interface YeniInterface {
  property: string;
}
```

## 🎨 Stil Yönetimi

### **CSS Değişkenleri**

Temalar `index.css` dosyasında CSS custom properties ile yönetilir:

```css
[data-theme="light"] {
  --primary-color: #value;
  --background-color: #value;
}

[data-theme="dark"] {
  --primary-color: #value;
  --background-color: #value;
}
```

### **Responsive Design**

Mobile-first yaklaşım kullanılır:

```css
/* Mobile */
.component {
  ...;
}

/* Tablet */
@media (min-width: 768px) {
  ...;
}

/* Desktop */
@media (min-width: 1024px) {
  ...;
}
```

## 🧪 Testing Yaklaşımı

### **Bileşen Testleri**

```typescript
// Her bileşen için test dosyası oluştur
// YeniBileşen.test.tsx
import { render, screen } from "@testing-library/react";
import { YeniBileşen } from "./index";

test("bileşen düzgün render olur", () => {
  render(<YeniBileşen />);
  expect(screen.getByText("Beklenen Text")).toBeInTheDocument();
});
```

### **Hook Testleri**

```typescript
// useHook.test.ts
import { renderHook } from "@testing-library/react";
import { useYeniHook } from "./index";

test("hook doğru değeri döner", () => {
  const { result } = renderHook(() => useYeniHook());
  expect(result.current.value).toBe(expected);
});
```

## 📊 Performance İyileştirmeleri

### **Lazy Loading**

```typescript
// React.lazy kullanımı
const LazyComponent = React.lazy(() => import("./Component"));

// Kullanımda
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>;
```

### **Memoization**

```typescript
// React.memo için
export const Component = React.memo(({ props }) => {
  // Component logic
});

// useMemo için
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

## 🔧 Debugging

### **Development Tools**

- React Developer Tools
- Redux DevTools (gelecekte eklenirse)
- Vite bundle analyzer

### **Console Logging**

```typescript
// Development ortamında
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
```

## 📚 Ek Kaynaklar

- [React Dokümantasyonu](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Clean Code Principles](https://clean-code-javascript.com/)

Bu kılavuz projeye katkıda bulunacak geliştiriciler için temel bir rehberdir. Proje büyüdükçe bu dokümantasyon güncellenmelidir.
