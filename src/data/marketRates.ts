import { MarketRate } from '../types';

export const initialMarketRates: MarketRate[] = [
  // --- ۱. ارز و دلار ---
  {
    id: 'rate-usd',
    symbol: 'USD-IRR',
    name: {
      fa: 'دلار آزاد',
      en: 'US Dollar',
      ar: 'دولار أمريكي',
      tr: 'Amerikan Doları',
    },
    category: 'currency',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 65400,
    change24h: 0.4,
    trend: 'up',
    lastUpdated: '14:30',
    history: [65100, 65250, 65350, 65400],
  },

  // --- ۲. طلا و مسکوکات ---
  {
    id: 'rate-gold-18k',
    symbol: 'GOLD-18K',
    name: {
      fa: 'طلای ۱۸ عیار',
      en: 'Gold 18K',
      ar: 'ذهب عيار 18',
      tr: '18 Ayar Altın',
    },
    category: 'precious_metals',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 3750000,
    change24h: 0.8,
    trend: 'up',
    lastUpdated: '14:30',
    history: [3720000, 3735000, 3740000, 3750000],
  },

  // --- ۳. ورق سیاه ST37 فولاد مبارکه ---
  {
    id: 'rate-black-st37',
    symbol: 'ST37-2MM',
    name: {
      fa: 'ورق سیاه ST37 فولاد مبارکه',
      en: 'Hot-Rolled ST37 Mobarakeh',
      ar: 'ألواح درفلة ساخنة ST37 مباركة',
      tr: 'Sıcak Sac ST37 Mobarakeh',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 34200,
    change24h: -0.2,
    trend: 'down',
    lastUpdated: '14:30',
    history: [34400, 34350, 34280, 34200],
  },

  // --- ۴. ورق گالوانیزه کاشان ---
  {
    id: 'rate-galv-kashan',
    symbol: 'GI-KASHAN',
    name: {
      fa: 'ورق گالوانیزه کاشان',
      en: 'Galvanized Sheet Kashan',
      ar: 'ألواح مجلفنة كاشان',
      tr: 'Galvanizli Sac Kashan',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 46500,
    change24h: 0.5,
    trend: 'up',
    lastUpdated: '14:30',
    history: [46200, 46300, 46400, 46500],
  },

  // --- ۵. ورق روغنی DC01 ---
  {
    id: 'rate-cold-dc01',
    symbol: 'DC01-0.7',
    name: {
      fa: 'ورق روغنی DC01',
      en: 'Cold-Rolled Sheet DC01',
      ar: 'ألواح درفلة باردة DC01',
      tr: 'DKP Soğuk Sac DC01',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 41800,
    change24h: 0.1,
    trend: 'up',
    lastUpdated: '14:30',
    history: [41700, 41750, 41780, 41800],
  },

  // --- ۶. شمش فولاد خوزستان ---
  {
    id: 'rate-billet-khz',
    symbol: 'BILLET-5SP',
    name: {
      fa: 'شمش فولاد خوزستان',
      en: 'Steel Billet Khouzestan 5SP',
      ar: 'كتل صلب خوزستان 5SP',
      tr: 'Çelik Kütük Khouzestan 5SP',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 23900,
    change24h: 0.0,
    trend: 'stable',
    lastUpdated: '14:30',
    history: [23900, 23900, 23900, 23900],
  },

  // --- ۷. میلگرد ۱۴ اصفهان ---
  {
    id: 'rate-rebar-14',
    symbol: 'REBAR-14',
    name: {
      fa: 'میلگرد ۱۴ اصفهان',
      en: 'Rebar #14 Isfahan',
      ar: 'حديد تسليح 14 أصفهان',
      tr: 'Nervürlü İnşaat Demiri 14mm',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 27800,
    change24h: 0.3,
    trend: 'up',
    lastUpdated: '14:30',
    history: [27600, 27700, 27750, 27800],
  },

  // --- ۸. سکه امامی (طرح جدید) ---
  {
    id: 'rate-coin-emami',
    symbol: 'COIN-EMAMI',
    name: {
      fa: 'سکه تمام بهار آزادی (امامی)',
      en: 'Emami Gold Coin',
      ar: 'مسكوكة بهار آزادي (إمامي)',
      tr: 'Tam Emami Altın',
    },
    category: 'precious_metals',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 51200000,
    change24h: 0.7,
    trend: 'up',
    lastUpdated: '14:30',
    history: [50800000, 51000000, 51100000, 51200000],
  },

  // --- ۹. درهم امارات (دبی) ---
  {
    id: 'rate-aed',
    symbol: 'AED-IRR',
    name: {
      fa: 'درهم امارات (دبی)',
      en: 'UAE Dirham (Dubai FX)',
      ar: 'درهم إماراتي (دبي)',
      tr: 'BAE Dirhemi',
    },
    category: 'currency',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 17850,
    change24h: 0.35,
    trend: 'up',
    lastUpdated: '14:30',
    history: [17750, 17800, 17820, 17850],
  },

  // --- ۱۰. یورو اروپا ---
  {
    id: 'rate-eur',
    symbol: 'EUR-IRR',
    name: {
      fa: 'یورو اروپا (اسکناس)',
      en: 'Euro (Cash FX)',
      ar: 'يورو أوروبي',
      tr: 'Euro',
    },
    category: 'currency',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 71200,
    change24h: -0.15,
    trend: 'down',
    lastUpdated: '14:30',
    history: [71400, 71350, 71280, 71200],
  },

  // --- ۱۱. ورق سیاه ST52 ساختمانی و صنعتی ---
  {
    id: 'rate-black-st52',
    symbol: 'ST52-10MM',
    name: {
      fa: 'ورق سیاه ST52 کاویان',
      en: 'Heavy Plate ST52 Kavian',
      ar: 'ألواح صلب ST52 كاويان',
      tr: 'Ağır Levha ST52 Kavian',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 37400,
    change24h: 0.6,
    trend: 'up',
    lastUpdated: '14:30',
    history: [37100, 37200, 37300, 37400],
  },

  // --- ۱۲. ورق استنلس استیل ۳۰۴ نگیر ---
  {
    id: 'rate-stainless-304',
    symbol: 'INOX-304',
    name: {
      fa: 'ورق استیل ۳۰۴ نگیر تایوان',
      en: 'Stainless Steel Sheet 304',
      ar: 'ألواح ستانلس ستيل 304',
      tr: 'Paslanmaz Çelik Sac 304',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 182000,
    change24h: 0.45,
    trend: 'up',
    lastUpdated: '14:30',
    history: [181000, 181400, 181800, 182000],
  },

  // --- ۱۳. ورق رنگی شادولاین ---
  {
    id: 'rate-colored-shadoline',
    symbol: 'PPGI-SHAD',
    name: {
      fa: 'ورق رنگی شادولاین (رال)',
      en: 'Prepainted Sheet Shadoline',
      ar: 'ألواح ملونة شادولاين',
      tr: 'Boyalı Sac Shadoline',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان',
      en: 'Toman',
      ar: 'تومان',
      tr: 'Tümen',
    },
    priceIrr: 58900,
    change24h: 0.8,
    trend: 'up',
    lastUpdated: '14:30',
    history: [58400, 58600, 58750, 58900],
  },

  // --- ۱۴. تیرآهن ۱۸ سنگین ذوب آهن ---
  {
    id: 'rate-beam-18',
    symbol: 'IPE-18',
    name: {
      fa: 'تیرآهن ۱۸ ذوب آهن اصفهان',
      en: 'IPE Beam #18 Isfahan',
      ar: 'جسور حديدية 18 أصفهان',
      tr: 'Profil Demir IPE 18',
    },
    category: 'steel_iron',
    unit: {
      fa: 'تومان/شاخه',
      en: 'Toman/Beam',
      ar: 'تومان/قطعة',
      tr: 'Tümen/Adet',
    },
    priceIrr: 6750000,
    change24h: 1.1,
    trend: 'up',
    lastUpdated: '14:30',
    history: [6650000, 6680000, 6720000, 6750000],
  },
];
