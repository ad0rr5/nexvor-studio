/**
 * Games data for the application
 */
import type { Project } from '../types';

export const gamesData: Project[] = [
  {
    "id": 1,
    "title": "Kozmik Kaçış",
    "description": "Gezegenler arası bir macerada engellerden kaçın ve en yüksek skoru yapın.",
    "icon": "🎮",
    "featured": true,
    "detailedDescription": "Kozmik Kaçış, uzayın derinliklerinde geçen heyecan verici bir macera oyunudur. Farklı gezegenlerde engellerden kaçarak en yüksek skoru elde etmeye çalışın. Üç farklı zorluk seviyesi, 50+ benzersiz level ve gerçek zamanlı liderlik tablosu ile arkadaşlarınızla yarışın.",
    "features": ["50+ benzersiz level", "3 zorluk seviyesi", "Liderlik tablosu", "Retro pixel sanatı", "Dinamik müzik sistemi"],
    "link": "https://www.youtube.com/results?search_query=hoparl%C3%B6r+%C3%A7ok+c%C4%B1rltak+ses+veriyor"
  },
  {
    "id": 5,
    "title": "Neon Yarışçı",
    "description": "Futuristik şehirlerde hız yarışları yapın ve en iyi pilot olun.",
    "icon": "🏎️",
    "featured": true,
    "detailedDescription": "Cyberpunk tarzı gelecek şehrinde geçen adrenalin dolu yarış oyunu. Neon ışıklarıyla aydınlatılmış sokaklarda, gelişmiş araçlarla hız sınırlarını zorlayın.",
    "features": ["10 farklı araç", "15 farklı pist", "Çoklu oyuncu desteği", "Araç özelleştirme", "Turnuva modu"],
    "link": "https://example.com/neon-racer"
  },
  {
    "id": 6,
    "title": "Çiftlik Büyücüsü",
    "description": "Büyülü çiftliğinizi yönetin ve fantastik ürünler yetiştirin.",
    "icon": "🌱",
    "featured": false,
    "detailedDescription": "Büyülü çiftliğinizde fantastik bitkiler yetiştirin, büyülü yaratıklar besleyin ve büyücü pazarında ticaret yapın.",
    "features": ["50+ büyülü tohum", "Evcil ejder sistemi", "Büyü yapımı", "Sezonluk etkinlikler", "Çok oyunculu ticaret"],
    "link": "https://example.com/ciftlik-buyucusu"
  }
];
