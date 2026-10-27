import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: {
      fa: 'مهندس محمدرضا شجاعی',
      en: 'Eng. Mohammadreza Shojaei',
      ar: 'م. محمد رضا شجاعي',
      tr: 'Müh. Mohammadreza Shojaei',
    },
    role: {
      fa: 'مدیر ارشد بازرگانی و تامین مقاطع',
      en: 'Senior Commercial & Supply Director',
      ar: 'مدير العمليات التجارية والتوريد',
      tr: 'Kıdemli Ticaret ve Tedarik Direktörü',
    },
    bio: {
      fa: 'بیش از ۲۲ سال تجربه مدیریت بازرگانی مقاطع تخت فولادی در بازار آهن شادآباد و بورس کالا.',
      en: 'Over 22 years of executive experience in flat steel trading across central steel exchanges.',
      ar: 'أكثر من 22 عاماً من الخبرة في تجارة ألواح الصلب المسطحة وبورصات المعادن.',
      tr: 'Demir-çelik piyasasında ve emtia borsalarında 22 yılı aşkın üst düzey ticaret tecrübesi.',
    },
    experienceYears: 22,
    expertise: ['تامین ورق بورس کالا', 'قراردادهای کلان B2B', 'اعتبارات اسنادی ریالی'],
    contactEmail: 'shojaei@tamfoulad.ir',
  },
  {
    id: 'member-2',
    name: {
      fa: 'دکتر علیرضا کاظمی',
      en: 'Dr. Alireza Kazemi',
      ar: 'د. علي رضا كاظمي',
      tr: 'Dr. Alireza Kazemi',
    },
    role: {
      fa: 'سرپرست متالورژی و کنترل کیفیت (MTC)',
      en: 'Head of Metallurgy & Quality Assurance',
      ar: 'رئيس قسم الميتالورجيا وضمان الجودة',
      tr: 'Metalurji ve Kalite Güvence Müdürü',
    },
    bio: {
      fa: 'دکترای متالورژی صنعتی از دانشگاه شریف، متخصص تحلیل رفتار کششی ورق‌های DC01 و تست‌های کوانتومتری.',
      en: 'Ph.D. in Metallurgy from Sharif University, specialist in deep drawing formability and quantometry analysis.',
      ar: 'دكتوراه في الهندسة الميتالورجية، متخصص في سلوك الشد لألواح DC01 وفحوصات المطيافية.',
      tr: 'Sharif Üniversitesi Metalurji Doktorası, DC01 derin çekme analizleri ve spektrometre uzmanı.',
    },
    experienceYears: 16,
    expertise: ['سرتیفیکیت EN 10204', 'تلرانس‌های DIN 59232', 'تست کشش و سختی‌سنجی'],
    contactEmail: 'kazemi.qc@tamfoulad.ir',
  },
  {
    id: 'member-3',
    name: {
      fa: 'مهندس سعید مرادی',
      en: 'Eng. Saeid Moradi',
      ar: 'م. سعيد مرادي',
      tr: 'Müh. Saeid Moradi',
    },
    role: {
      fa: 'مدیر خطوط فرآوری و اسلیتینگ مکانیزه',
      en: 'Slitting & Mechanical Shearing Plant Manager',
      ar: 'مدير خطوط التقطيع والتسوية الميكانيكية',
      tr: 'Mekanik Dilme ve Boy Kesme Tesis Müdürü',
    },
    bio: {
      fa: 'متخصص تنظیم تیغه‌های نواربری، کالیبراسیون خطوط CTL اتوماتیک و کاهش ضایعات کناره‌بری به زیر ۰.۵ درصد.',
      en: 'Expert in rotary slitter knife setup, automatic CTL calibration, and scrap minimization under 0.5%.',
      ar: 'خبير في ضبط شفرات التقطيع الدائري، معايرة خطوط CTL وتقليل نسبة الهدر لأقل من 0.5%.',
      tr: 'Döner dilme bıçakları ayarı, otomatik CTL kalibrasyonu ve fire oranını %0.5 altına indirme uzmanı.',
    },
    experienceYears: 18,
    expertise: ['اسلیتینگ کلاف‌های ۲۵ تن', 'شیت‌کن هیدرولیک', 'تلرانس عرضی ±0.05 mm'],
    contactEmail: 'moradi.plant@tamfoulad.ir',
  },
];
