import { ArticleItem } from '../types';

export const articlesData: ArticleItem[] = [
  {
    id: 'art-dc01-vs-st12',
    slug: 'difference-dc01-and-st12-steel-sheets',
    title: {
      fa: 'تفاوت‌های فنی ورق روغنی DC01 با ST12 و کاربرد در پرسکاری',
      en: 'Technical Differences Between DC01 and ST12 Cold-Rolled Steels',
      ar: 'الفروق الفنية بين ألواح الصلب البارد DC01 و ST12 وتطبيقات الكبس',
      tr: 'DC01 ile ST12 Soğuk Saclar Arasındaki Teknik Farklar ve Presleme',
    },
    excerpt: {
      fa: 'بررسی تطبیقی استانداردهای EN 10130 اروپا و DIN 1623 آلمان در گریدهای کششی و شاخص‌های ازدیاد طول A80.',
      en: 'Comparative analysis of European EN 10130 and German DIN 1623 standards regarding drawing grades and elongation indices.',
      ar: 'مقارنة معايير EN 10130 الأوروبية و DIN 1623 الألمانية في درجات السحب ومؤشرات الاستطالة.',
      tr: 'EN 10130 ve DIN 1623 standartlarının çekme kaliteleri ve uzama değerleri açısından karşılaştırmalı analizi.',
    },
    content: {
      fa: `ورق روغنی یا نورد سرد (Cold Rolled) به دلیل سطح صیقلی، دقت ابعادی بالا و قابلیت شکل‌پذیری عالی، سنگ‌بنای صنایع خودروسازی، لوازم خانگی و تابلوهای برق محسوب می‌شود.

۱. نام‌گذاری و استاندارد مرجع:
در گذشته، استاندارد آلمانی DIN 1623 مرجع بازار ایران بود و گرید ST12 معرف ورق کشش معمولی به شمار می‌رفت. با استقرار استاندارد اروپایی EN 10130، کد DC01 جایگزین ST12 شد. حرف D به معنای Drawing (کششی) و C به معنای Cold-rolled است.

۲. مشخصات مکانیکی:
- استحکام تسلیم (Yield Strength): حداکثر ۲۸۰ مگاپاسکال (MPa)
- استحکام کششی (Tensile Strength): بین ۲۷۰ تا ۴۱۰ مگاپاسکال
- حداقل ازدیاد طول (Elongation A80): ۲۸ درصد

۳. نکات مهم در انبارداری:
به دلیل عدم وجود پوشش روی (برخلاف گالوانیزه)، ورق‌های روغنی باید در انبارهای مسقف با رطوبت کنترل‌شده نگهداری شوند و روغن محافظتی سبک روی سطح آن‌ها تا زمان پرس‌کاری حفظ گردد.`,
      en: `Cold-rolled steel is essential for automotive stampings and household appliances due to tight dimensional tolerances and uniform surface finish.

1. Nomenclature:
Under EN 10130, DC01 designates commercial drawing steel, replacing the legacy German DIN 1623 St12 grade.

2. Mechanical Properties:
- Yield Strength: max 280 MPa
- Tensile Strength: 270 - 410 MPa
- Min Elongation A80: 28%

3. Storage & Lubrication:
Stored in humidity-controlled indoor bays with light rust-preventive electrostatic oil coating.`,
      ar: `تعتبر ألواح الدرفلة الباردة ركيزة أساسية في صناعة هياكل السيارات والأجهزة المنزلية بفضل دقتها العالية ونعومة سطحها.`,
      tr: `Soğuk haddelenmiş saclar, hassas toleransları ve pürüzsüz yüzeyleri sayesinde otomotiv ve beyaz eşya sektörünün vazgeçilmezidir.`,
    },
    author: 'واحد متالورژی تام فولاد',
    date: '1403/07/15',
    readTimeMin: 6,
    category: 'متالورژی کاربردی',
    tags: ['ورق روغنی', 'DC01', 'ST12', 'نورد سرد', 'پرسکاری'],
  },
  {
    id: 'art-coil-slitting-tolerances',
    slug: 'precision-coil-slitting-standards-tolerances',
    title: {
      fa: 'راهنمای استانداردهای نواربری دقیق کویل و کنترل پلیسه لبه',
      en: 'Guide to Precision Coil Slitting Standards and Edge Burr Control',
      ar: 'دليل معايير التقطيع الطولي الدقيق للملفات وضبط رايش الحواف',
      tr: 'Hassas Rulo Dilme Standartları ve Kenar Çapak Kontrol Kılavuzu',
    },
    excerpt: {
      fa: 'چگونگی تنظیم فاصله هوایی تیغه‌ها (Clearance) برای به حداقل رساندن پلیسه، خمش مقطعی (Camber) و تاب‌خوردگی.',
      en: 'Optimal slitter arbor clearance setup to minimize edge burr, camber deviation, and twist on narrow steel coils.',
      ar: 'كيفية ضبط الفواصل بين شفرات التقطيع للحد من الرايش وتقليل انحناء الحواف في أشرطة الصلب.',
      tr: 'Şerit saclarda kenar çapağını ve kamber eğriliğini önlemek için döner bıçak boşluğu optimizasyonu.',
    },
    content: {
      fa: `فرآیند اسلیتینگ (نواربری) کلاف‌های فولادی، حساس‌ترین گام در آماده‌سازی مواد اولیه برای خطوط پروفیل‌سازی، فنرسازی و قطعه‌سازی خودرو است.

۱. تلرانس‌های مجاز عرضی مطابق استاندارد DIN EN 10140:
برای نوارهای باریک تا عرض ۱۲۵ میلیمتر، تلرانس عرضی بین ±0.05 تا ±0.10 میلیمتر حفظ می‌شود.

۲. کنترل پلیسه و لبه‌گیری (Deburring):
فاصله هوایی افقی تیغه‌ها (Horizontal Clearance) متناسب با ۷ الی ۱۰ درصد ضخامت ورق تنظیم می‌شود تا برش بیش از ۶۰ درصد سطح را تشکیل داده و شکست لبه بدون پلیسه تیز صورت پذیرد.`,
      en: `Coil slitting requires exact arbor setup to meet European DIN EN 10140 width tolerances. Horizontal clearance is set between 7% and 10% of material gauge.`,
      ar: `تعتبر عملية التقطيع الطولي الحلقية دقيقة جداً لضمان استقامة الأشرطة وخلو الحواف من النتوءات الحادة.`,
      tr: `Rulo dilme operasyonlarında DIN EN 10140 toleranslarına ulaşmak için bıçak aralığı sac kalınlığının %7-10'u seviyesinde ayarlanır.`,
    },
    author: 'مهندسی فرآوری تام فولاد',
    date: '1403/08/02',
    readTimeMin: 8,
    category: 'فرآوری و خدمات برش',
    tags: ['اسلیتینگ', 'نواربری', 'تلرانس ابعادی', 'کنترل پلیسه', 'DIN EN 10140'],
  },
  {
    id: 'art-galvanized-coating-z100-z275',
    slug: 'galvanized-coating-classes-comparison',
    title: {
      fa: 'مقایسه رده‌های کوتینگ روی در ورق گالوانیزه (Z100 تا Z275)',
      en: 'Comparison of Zinc Coating Classes in Galvanized Steel (Z100 to Z275)',
      ar: 'مقارنة فئات طلاء الزنك في ألواح الصلب المجلفن (Z100 إلى Z275)',
      tr: 'Galvanizli Saclarda Çinko Kaplama Sınıflarının Karşılaştırılması',
    },
    excerpt: {
      fa: 'بررسی ضخامت پوشش فلز روی به میکرون، طول عمر در محیط‌های خورنده ساحلی و الزامات استاندارد EN 10346.',
      en: 'Zinc coating thickness in microns, corrosion lifespan across marine/industrial atmospheres, and EN 10346 specs.',
      ar: 'دراسة سماكة طبقة الزنك بالميكرون والعمر الافتراضي في البيئات البحرية الرطبة وفق معايير EN 10346.',
      tr: 'Mikron cinsinden çinko kaplama kalınlığı, deniz ve sanayi atmosferlerinde paslanmazlık ömrü ve EN 10346 gereklilikleri.',
    },
    content: {
      fa: `ورق‌های گالوانیزه با غوطه‌وری گرم در مذاب روی تولید می‌شوند و ضخامت این لایه با نماد Z و جرم روی در دو طرف ورق بر حسب گرم بر مترمربع (g/m²) سنجیده می‌شود.

- رده Z100: حدود ۱۴ میکرون ضخامت روی، مناسب برای لوازم خانگی و محیط‌های خشک داخلی
- رده Z180: حدود ۲۵ میکرون ضخامت روی، استاندارد متداول ساختمانی و کانال‌سازی
- رده Z275: حدود ۳۸ میکرون ضخامت روی، مقاوم در برابر اتمسفرهای مرطوب شمال و جنوب کشور و عرشه فولادی سقف`,
      en: `Hot-dip galvanized coating mass designates corrosion life under EN 10346. Z100 suits indoor dry applications, while Z275 offers heavy-duty exterior protection.`,
      ar: `يحدد وزن طلاء الزنك (Z100 إلى Z275) مدى مقاومة الألواح للعوامل الجوية وتآكل الصدأ.`,
      tr: `EN 10346 normuna göre Z180 iç ve dış inşaat standartlarında kullanılırken, Z275 korozyon riski yüksek sahalar için şarttır.`,
    },
    author: 'دکتر علیرضا کاظمی',
    date: '1403/08/20',
    readTimeMin: 7,
    category: 'کنترل خوردگی و پوشش',
    tags: ['ورق گالوانیزه', 'کوتینگ روی', 'Z180', 'Z275', 'ضد زنگ'],
  },
];
