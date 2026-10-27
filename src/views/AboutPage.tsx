import React from 'react';
import { Building2 } from 'lucide-react';
import { Language } from '../types';
import { LicensesSection } from '../components/LicensesSection';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface AboutPageProps {
  currentLang: Language;
  onNavigate?: (page: string) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-white dark:bg-[#242129] py-10 sm:py-14 text-slate-900 dark:text-[#fbfff1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3066be]/20 border border-[#3066be]/40 text-[#b4c5e4] text-xs font-semibold">
            <Building2 className="w-4 h-4 text-[#3066be]" />
            <span>{t.nav.about}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-[#fbfff1] tracking-tight">
            {currentLang === 'fa' ? 'صنایع و بازرگانی تام فولاد' : 'About Tam Foulad Industrial Co.'}
          </h1>

          <p className="text-xs sm:text-base text-slate-600 dark:text-[#b4c5e4]/90 leading-relaxed font-light">
            {currentLang === 'fa'
              ? 'پیشرو در خدمات فرآوری، اسلیتینگ کویل و تامین پایدار انواع ورق‌های تخت فولادی برای صنایع سنگین، خودروسازی، لوازم خانگی و پروژه‌های عمرانی ملی.'
              : 'Leading industrial service center for coil slitting and flat steel distribution.'}
          </p>
        </div>

        {/* Corporate Profile Card */}
        <div className="corporate-profile-card bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-2xl relative overflow-hidden transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-[#b4c5e4]/90 leading-relaxed text-justify font-light">
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-[#fbfff1] tracking-tight">
                {currentLang === 'fa' ? 'بیش از یک دهه پیشگامی در تامین و فرآوری تخصصی مقاطع فولادی' : currentLang === 'ar' ? 'أكثر من عقد من الريادة في توريد وتصنيع قطاعات الصلب' : currentLang === 'tr' ? 'Yassı Çelik Tedariki ve Hassas İşlemede On Yıllık Liderlik' : 'Over a Decade of Excellence in Steel Supply & Processing'}
              </h2>
              <p>
                {currentLang === 'fa'
                  ? 'صنایع تام فولاد با بیش از ۱۰ سال سابقه فعالیت تخصصی در زنجیره فولاد کشور، با اتکا به همکاری مستقیم با بیش از ۴۵۰ کارخانه معتبر نظیر فولاد مبارکه اصفهان، امیرکبیر کاشان و هفت الماس، نیازهای پایدار صنایع مادر را پوشش می‌دهد.'
                  : currentLang === 'ar'
                  ? 'تعمل تام فولاد منذ أكثر من 10 سنوات كشريك موثوق يربط بين أكثر من 450 مصنعاً ومجمعاً صناعياً وأكثر من 780 عميلاً في مختلف القطاعات الصناعية.'
                  : currentLang === 'tr'
                  ? 'Tam Çelik, 10 yılı aşkın sektörel deneyimiyle 450\'den fazla partner fabrika ile 780\'i aşkın endüstriyel müşteri arasında güvenilir bir tedarik köprüsü kurmaktadır.'
                  : 'With over a decade of dedicated expertise, Tam Foulad serves as a premier industrial supply bridge connecting over 450 steel mills with 780+ industrial clients across the nation.'}
              </p>
              <p>
                {currentLang === 'fa'
                  ? 'تامین سالانه بالغ بر ۵۰,۰۰۰ تن انواع کلاف و ورق‌های مهندسی برای بیش از ۷۸۰ مشتری صنعتی، همراه با نواربری با تلرانس دقیق ±۰.۰۵ میلیمتر، صدور گواهینامه متالورژی (MTC) و باسکول دیجیتال رسمی، تضمین‌کننده اطمینان و تعهد پایدار ماست.'
                  : currentLang === 'ar'
                  ? 'وبفضل قدرة توريد سنوية تتجاوز 50,000 طن وخطوط معالجة متطورة، نلبي احتياجات أكثر من 780 عميلاً بتفاوتات دقيقة وشهادات جودة معتمدة.'
                  : currentLang === 'tr'
                  ? 'Yıllık 50.000 tonu aşan tedarik kapasitemiz ve hassas dilme hatlarımızla 780\'den fazla endüstriyel müşterimize standartlara tam uyumlu çözümler sunuyoruz.'
                  : 'Supplying over 50,000 tons annually with state-of-the-art precision slitting and CTL lines, we fulfill mission-critical demands for 780+ industrial clients backed by verified MTC test certificates.'}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card p-5 bg-white dark:bg-[#242129] rounded-2xl border border-slate-200 dark:border-[#b4c5e4]/15 text-center shadow-sm dark:shadow-none transition-colors">
                <span className="text-2xl sm:text-3xl font-black font-mono text-amber-500 dark:text-[#f5a623] block mb-1">
                  {localizeDigits('450', currentLang)}+
                </span>
                <span className="text-xs text-slate-600 dark:text-[#b4c5e4]/80 font-medium">
                  {currentLang === 'fa' ? 'کارخانه همکار' : currentLang === 'ar' ? 'مصنع شريك' : currentLang === 'tr' ? 'Partner Fabrika' : 'Partner Factories'}
                </span>
              </div>
              <div className="metric-card p-5 bg-white dark:bg-[#242129] rounded-2xl border border-slate-200 dark:border-[#b4c5e4]/15 text-center shadow-sm dark:shadow-none transition-colors">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#3066be] block mb-1">
                  {localizeDigits('780', currentLang)}+
                </span>
                <span className="text-xs text-slate-600 dark:text-[#b4c5e4]/80 font-medium">
                  {currentLang === 'fa' ? 'مشتری صنعتی' : currentLang === 'ar' ? 'عميل صناعي' : currentLang === 'tr' ? 'Endüstriyel Müşteri' : 'Industrial Clients'}
                </span>
              </div>
              <div className="metric-card p-5 bg-white dark:bg-[#242129] rounded-2xl border border-slate-200 dark:border-[#b4c5e4]/15 text-center shadow-sm dark:shadow-none transition-colors">
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 block mb-1">
                  {localizeDigits('10', currentLang)}+
                </span>
                <span className="text-xs text-slate-600 dark:text-[#b4c5e4]/80 font-medium">
                  {currentLang === 'fa' ? 'سابقه فعالیت' : currentLang === 'ar' ? 'سنوات سابقة النشاط' : currentLang === 'tr' ? 'Faaliyet Geçmişi' : 'Years of Experience'}
                </span>
              </div>
              <div className="metric-card p-5 bg-white dark:bg-[#242129] rounded-2xl border border-slate-200 dark:border-[#b4c5e4]/15 text-center shadow-sm dark:shadow-none transition-colors">
                <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-[#fbfff1] block mb-1">
                  {localizeDigits('50,000', currentLang)}+ {currentLang === 'fa' ? 'تن' : 'MT'}
                </span>
                <span className="text-xs text-slate-600 dark:text-[#b4c5e4]/80 font-medium">
                  {currentLang === 'fa' ? 'تناژ تامین' : currentLang === 'ar' ? 'حجم التوريد' : currentLang === 'tr' ? 'Tedarik Tonajı' : 'Supply Tonnage'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Licenses Section Component */}
        <LicensesSection currentLang={currentLang} />
      </div>
    </div>
  );
};
