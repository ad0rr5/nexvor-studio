/**
 * Tools data for the application
 */
import type { Project } from '../types';

export const toolsData: Project[] = [
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
