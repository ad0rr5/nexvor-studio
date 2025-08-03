/**
 * Tools data for the application
 */
import type { Project } from '../types';

export const toolsData: Project[] = [
  {
    "id": 2,
    "title": "PDF'den PNG'ye",
    "description": "PDF dosyalarınızı yüksek kalitede, ayrı PNG resimlerine dönüştürün.",
    "icon": "📄",
    "featured": true,
    "detailedDescription": "PDF dosylarınızı profesyonel kalitede PNG formatına dönüştürün. Toplu işlem desteği ile birden fazla dosyayı aynı anda işleyebilir, çözünürlük ve kalite ayarlarını özelleştirebilirsiniz.",
    "features": ["Toplu dönüştürme", "Kalite ayarları", "Hızlı işlem", "Ücretsiz kullanım", "Güvenli upload"],
    "link": "https://example.com/pdf-to-png"
  },
  {
    "id": 3,
    "title": "Renk Paleti Oluşturucu",
    "description": "Yapay zeka destekli aracımızla projeniz için mükemmel renk paletleri yaratın.",
    "icon": "🎨",
    "featured": true,
    "detailedDescription": "Yapay zeka destekli renk paleti oluşturucu ile projeleriniz için mükemmel renk kombinasyonları yaratın. Tema seçimi, renk teorisi uygulaması ve export özelliği ile tasarım sürecinizi hızlandırın.",
    "features": ["AI destekli", "Tema seçenekleri", "Export desteği", "Renk teorisi", "Hex/RGB kodları"],
    "link": "./apps/nexvor-palette.html"
  },
  {
    "id": 4,
    "title": "Metin Analiz Aracı",
    "description": "Metinlerinizi analiz edin ve SEO optimizasyonu yapın.",
    "icon": "📊",
    "featured": false,
    "detailedDescription": "Metin içeriklerinizi detaylı analiz edin. Kelime sayısı, karakter sayısı, anahtar kelime yoğunluğu ve SEO skorunu anlık olarak görebilirsiniz.",
    "features": ["Kelime analizi", "SEO puanlama", "Anahtar kelime", "Plagiarism kontrol", "Export raporu"],
    "link": "https://example.com/metin-analiz"
  },
  {
    "id": 7,
    "title": "QR Kod Oluşturucu",
    "description": "Hızlı ve kolay QR kod oluşturun. URL, metin, WiFi şifresi ve daha fazlası.",
    "icon": "📱",
    "featured": true,
    "detailedDescription": "Profesyonel QR kodları kolayca oluşturun. URL, metin, e-posta, telefon numarası, WiFi şifresi ve daha birçok format için özelleştirebilir QR kodlar yaratın.",
    "features": ["Çoklu format", "Özelleştirme", "Toplu oluşturma", "SVG export", "Analitik takip"],
    "link": "./apps/nexvor-qr.html"
  }
];
