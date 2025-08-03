# Nexvor Studio - Geliştirici Kurulum Kılavuzu

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn package manager
- Modern bir web tarayıcısı

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
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

#### **Types** (`src/types/`)
```typescript
// Tüm TypeScript type tanımlamaları
export type Theme = 'light' | 'dark';
export type Page = 'home' | 'games' | 'tools' | 'about';
export interface Project { ... }
```

#### **Hooks** (`src/hooks/`)
```typescript
// Custom React hook'ları
useIntersectionObserver() // Viewport animasyonları
useProjectData()          // API veri yönetimi
```

#### **Utils** (`src/utils/`)
```typescript
// Yardımcı fonksiyonlar
getInitialTheme()    // Tema başlatma
applyTheme()         // Tema uygulama
toggleBodyScroll()   // Modal scroll kontrolü
```

#### **Components** (`src/components/`)
Her bileşen kendi klasöründe ve şu yapıyı takip eder:
```
ComponentName/
├── index.tsx        // Ana bileşen kodu
└── README.md        // Bileşen dokümantasyonu (opsiyonel)
```

## 🛠️ Geliştirme Kuralları

### **1. Yeni Bileşen Ekleme**
```typescript
// src/components/YeniBileşen/index.tsx
import React from 'react';
import type { PropTypes } from '../../types';

interface YeniBileşenProps {
  // Prop tanımlamaları
}

/**
 * Bileşen açıklaması
 */
export const YeniBileşen = ({ props }: YeniBileşenProps) => {
  return (
    <div className="yeni-bileşen">
      {/* İçerik */}
    </div>
  );
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
.component { ... }

/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

## 🧪 Testing Yaklaşımı

### **Bileşen Testleri**
```typescript
// Her bileşen için test dosyası oluştur
// YeniBileşen.test.tsx
import { render, screen } from '@testing-library/react';
import { YeniBileşen } from './index';

test('bileşen düzgün render olur', () => {
  render(<YeniBileşen />);
  expect(screen.getByText('Beklenen Text')).toBeInTheDocument();
});
```

### **Hook Testleri**
```typescript
// useHook.test.ts
import { renderHook } from '@testing-library/react';
import { useYeniHook } from './index';

test('hook doğru değeri döner', () => {
  const { result } = renderHook(() => useYeniHook());
  expect(result.current.value).toBe(expected);
});
```

## 📊 Performance İyileştirmeleri

### **Lazy Loading**
```typescript
// React.lazy kullanımı
const LazyComponent = React.lazy(() => import('./Component'));

// Kullanımda
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
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
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

## 📚 Ek Kaynaklar

- [React Dokümantasyonu](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Clean Code Principles](https://clean-code-javascript.com/)

Bu kılavuz projeye katkıda bulunacak geliştiriciler için temel bir rehberdir. Proje büyüdükçe bu dokümantasyon güncellenmelidir.
