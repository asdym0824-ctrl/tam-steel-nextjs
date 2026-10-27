import React, { useState } from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import { localizeDigits } from '../utils/numberLocale';
import { MarketTicker } from '../components/MarketTicker';
import { ClientJourney } from '../components/ClientJourney';
import { PartnershipSection } from '../components/PartnershipSection';
import { DigitalContractSigner } from '../components/DigitalContractSigner';
import { LicensesSection } from '../components/LicensesSection';
import { FAQSection } from '../components/FAQSection';
import {
  Layers, ShieldCheck, Palette, Scissors, Maximize2, Building2,
  ArrowLeft, ArrowRight, Zap, Shield, Calculator,
  Droplets, Sparkles, Award, Factory, Users, Calendar, Scale
} from 'lucide-react';

interface HomePageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
  onOpenCalculator: () => void;
  onOpenQuote: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  onNavigate,
  onOpenCalculator,
  onOpenQuote,
}) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'fa' || currentLang === 'ar';
  const [activePhoto, setActivePhoto] = useState<'factory' | 'coils'>('factory');

  const services = [
    {
      id: 'service-cold-rolled',
      title: t.servicesList.coldRolled,
      desc: currentLang === 'fa' ? 'ورق‌های نورد سرد با گرید کششی DC01 تا DC04 ویژه خودرو و لوازم خانگی با سطح براق و روغنی.' : 'Deep-drawing cold-rolled sheets DC01-DC04 for automotive & home appliances.',
      icon: Layers,
      specs: '0.3 - 3.0 mm',
      badge: 'تامین کویل و شیت',
    },
    {
      id: 'service-galvanized',
      title: t.servicesList.galvanized,
      desc: currentLang === 'fa' ? 'ورق‌های مقاوم در برابر رطوبت با کوتینگ روی Z100 تا Z275 از کارخانجات کاشان و تاراز.' : 'Corrosion resistant hot-dip galvanized sheets with Z100-Z275 zinc coating.',
      icon: ShieldCheck,
      specs: '0.4 - 4.0 mm',
      badge: 'ضد زنگ و خوردگی',
    },
    {
      id: 'service-hot-rolled',
      title: t.servicesList.hotRolled,
      desc: currentLang === 'fa' ? 'ورق سیاه ساختمانی ST37 و آلیاژی ST52 ویژه سازه‌های فلزی، سوله و پل‌سازی با سرتیفیکیت MTC.' : 'Structural hot-rolled steel ST37/ST52 for pre-engineered steel buildings & tanks.',
      icon: Layers,
      specs: '2.0 - 50.0 mm',
      badge: 'سازه‌های سنگین و سوله',
    },
    {
      id: 'service-colored',
      title: t.servicesList.colored,
      desc: currentLang === 'fa' ? 'ورق‌های گالوانیزه رنگی کوره‌ای الکترواستاتیک با تنوع رنگ رال (RAL) و فرمینگ شادولاین و ذوزنقه.' : 'Prepainted galvanized steel in RAL palettes with Shadoline & Trapezoidal roll-forming.',
      icon: Palette,
      specs: '0.4 - 0.7 mm',
      badge: 'پوشش سقف و نما',
    },
    {
      id: 'service-pickled',
      title: t.servicesList.pickled,
      desc: currentLang === 'fa' ? 'ورق سیاه اسیدزدایی شده بدون پوسته اکسیدی و روغنی، ایده‌آل برای برش لیزر فایبر و قطعات شاسی.' : 'Pickled & oiled descaled steel (HRPO) optimized for fiber laser blanking & stamping.',
      icon: Droplets,
      specs: '1.5 - 6.0 mm',
      badge: 'ویژه برش لیزر CNC',
    },
    {
      id: 'service-deep-drawing',
      title: t.servicesList.deepDrawing,
      desc: currentLang === 'fa' ? 'ورق‌های فوق کشش DC04, DC06 و IF Steel ویژه سخت‌ترین قالب‌های هیدرولیکی بدون پارگی و ترک.' : 'Interstitial-free & EDD sheets (DC04/DC06) for deep hydraulic press drawing.',
      icon: Sparkles,
      specs: 'ازدیاد طول ≥ ۴۰٪',
      badge: 'کشش عمیق خودرویی',
    },
    {
      id: 'service-stainless',
      title: t.servicesList.stainless,
      desc: currentLang === 'fa' ? 'انواع استنلس استیل نگیر ۳۰۴ و ۳۱۶ (ضد اسید) و بگیر ۴۳۰ با پرداخت‌های مات، براق و دکوراتیو طلایی.' : 'Austenitic 304/316 & ferritic 430 stainless steel with 2B, BA, No.4 & 8K mirror finishes.',
      icon: Award,
      specs: 'گرید ۳۰۴، ۳۱۶، ۴۳۰',
      badge: 'استنلس استیل اینوکس',
    },
    {
      id: 'service-steel-deck',
      title: t.servicesList.steelDeck,
      desc: currentLang === 'fa' ? 'فرمینگ ذوزنقه‌ای گام ۶۵ و ۷۵ میلی‌متر جهت بتن‌ریزی سریع سقف‌های مدرن ساختمانی.' : 'Structural composite metal decking profiles for rapid concrete slab installation.',
      icon: Building2,
      specs: 'گام ۶۵ و ۷۵ mm',
      badge: 'حذف شمع‌بندی سقف',
    },
    {
      id: 'service-slitting',
      title: t.servicesList.slitting,
      desc: currentLang === 'fa' ? 'نواربری و برش طولی فوق‌دقیق کویل با تیغه‌های تنگستن کارباید تا تلرانس ۰.۰۵ میلی‌متر.' : 'High-precision longitudinal slitting of wide coils with burr-free rotary knives.',
      icon: Scissors,
      specs: 'عرض ۱۵ تا ۲۰۰۰ mm',
      badge: 'خطوط CNC تمام اتومات',
    },
    {
      id: 'service-shearing',
      title: t.servicesList.shearing,
      desc: currentLang === 'fa' ? 'تبدیل رول به شیت تخت با سیستم تراز هیدرولیکی (Leveller) در ابعاد استاندارد و سفارشی.' : 'Cut-to-length shearing with hydraulic levelling for completely flat sheets.',
      icon: Maximize2,
      specs: 'طول تا ۱۲۰۰۰ mm',
      badge: 'تضمین تختی و گونیا',
    },
  ];

  return (
    <div className="space-y-0 bg-[#242129]">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#242129] overflow-hidden border-b border-[#b4c5e4]/15">
        {/* Subtle steel factory background atmosphere */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-luminosity filter blur-[1px]"
          style={{ backgroundImage: `url('/images/steel_mill_factory.jpg')` }}
        />
        {/* Subtle geometric steel backdrop */}
        <div className="absolute inset-0 bg-grid-steel opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 -start-20 w-96 h-96 bg-[#090c9b]/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -end-20 w-96 h-96 bg-[#3066be]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090c9b]/40 border border-[#b4c5e4]/30 text-xs font-semibold text-[#475569] dark:text-[#fbfff1]">
                <span className="w-2 h-2 rounded-full bg-slate-500 dark:bg-[#3066be] animate-pulse" />
                <span className="text-[#475569] dark:text-[#fbfff1]">{t.hero.badge}</span>
              </div>

              {/* Marquee Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-[#fbfff1] leading-tight sm:leading-snug max-w-3xl">
                {t.hero.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#b4c5e4] leading-relaxed max-w-2xl font-light">
                {t.hero.subtitle}
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#3066be] hover:bg-[#24529d] text-white !text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#3066be]/30 active:scale-95"
                >
                  <span className="text-white !text-white">{t.hero.ctaPrimary}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4 text-white !text-white" /> : <ArrowRight className="w-4 h-4 text-white !text-white" />}
                </button>

                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="flex items-center gap-2 px-5 py-3.5 bg-[#3c3744] hover:bg-[#4d4757] text-[#fbfff1] font-medium text-xs sm:text-sm rounded-xl border border-[#b4c5e4]/25 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-[#3066be]" />
                  <span>محاسبه‌گر آنلاین وزن ورق</span>
                </button>
              </div>

              {/* 3 Compact Stacked Cards */}
              <div className="pt-6 border-t border-[#b4c5e4]/15 flex flex-col gap-2.5 max-w-md">
                {/* Card 1 */}
                <div className="p-3 px-4 rounded-2xl bg-[#2f2b36]/90 border border-[#b4c5e4]/20 hover:border-[#3066be]/60 shadow-sm flex items-center justify-between transition-colors">
                  <div className="text-xs text-[#b4c5e4] font-medium text-right">
                    {t.hero.stat1Label}
                  </div>
                  <div className="font-mono text-lg sm:text-xl font-black text-[#475569] dark:text-[#fbfff1] tabular-nums text-left dir-ltr">
                    {t.hero.stat1Value}
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-3 px-4 rounded-2xl bg-[#2f2b36]/90 border border-[#b4c5e4]/20 hover:border-[#3066be]/60 shadow-sm flex items-center justify-between transition-colors">
                  <div className="text-xs text-[#b4c5e4] font-medium text-right">
                    {t.hero.stat2Label}
                  </div>
                  <div className="font-mono text-lg sm:text-xl font-black text-[#3066be] tabular-nums text-left dir-ltr">
                    {t.hero.stat2Value}
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-3 px-4 rounded-2xl bg-[#2f2b36]/90 border border-[#b4c5e4]/20 hover:border-[#3066be]/60 shadow-sm flex items-center justify-between transition-colors">
                  <div className="text-xs text-[#b4c5e4] font-medium text-right">
                    {t.hero.stat3Label}
                  </div>
                  <div className="font-mono text-lg sm:text-xl font-black text-[#475569] dark:text-[#fbfff1] tabular-nums text-left dir-ltr">
                    {t.hero.stat3Value}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Industrial Graphic Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-br from-[#3c3744] via-[#2f2b36] to-[#090c9b]/40 border border-[#b4c5e4]/25 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden group">

                {/* Visual Real Steel Factory Photo */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#b4c5e4]/25 shadow-inner">
                  <img
                    src={activePhoto === 'factory' ? "/images/steel_mill_factory.jpg" : "/images/steel_coils_factory.jpg"}
                    alt={activePhoto === 'factory' ? "خط نورد و کارخانه فولاد تام فولاد" : "انبار کویل و کلاف‌های تام فولاد"}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Atmospheric dark gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1c24] via-[#242129]/50 to-black/30 pointer-events-none" />

                  {/* Top Badges & Switcher */}
                  <div className="absolute top-3.5 start-3.5 end-3.5 flex items-center justify-between z-10 gap-2">
                    <span className="text-[11px] font-mono font-semibold text-white !text-white bg-[#090c9b]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#b4c5e4]/30 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#3066be] animate-pulse" />
                      <span className="text-white !text-white">{activePhoto === 'factory' ? 'خط نورد گرم و فرآوری' : 'انبار مرکزی کلاف‌ها'}</span>
                    </span>

                    {/* View Switcher buttons */}
                    <div className="flex items-center gap-1 bg-[#1f1c24]/90 backdrop-blur-md p-1 rounded-xl border border-[#b4c5e4]/25 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setActivePhoto('factory')}
                        className={`px-2 py-0.5 rounded-lg transition-colors font-medium ${activePhoto === 'factory' ? 'bg-[#3066be] text-[#fbfff1]' : 'text-[#b4c5e4] hover:text-[#fbfff1]'}`}
                      >
                        کارخانه
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePhoto('coils')}
                        className={`px-2 py-0.5 rounded-lg transition-colors font-medium ${activePhoto === 'coils' ? 'bg-[#3066be] text-[#fbfff1]' : 'text-[#b4c5e4] hover:text-[#fbfff1]'}`}
                      >
                        کلاف‌ها
                      </button>
                    </div>
                  </div>

                  {/* Bottom Text Details */}
                  <div className="absolute bottom-3.5 start-3.5 end-3.5 z-10 space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#fbfff1] drop-shadow leading-snug">
                      {activePhoto === 'factory' ? 'مجتمع کارگاهی و نورد صنایع تام فولاد' : 'مرکز نگهداری و بارگیری کلاف‌های استاندارد'}
                    </h3>
                    <p className="text-[11px] text-[#b4c5e4] drop-shadow line-clamp-2">
                      {activePhoto === 'factory'
                        ? 'تجهیزات مکانیزه تسطیح، برش طولی و عرضی با تلرانس دقیق و گواهی بازرسی متالورژی MTC.'
                        : 'تامین کویل‌های نورد سرد، گرم، اسیدشویی و گالوانیزه از برترین تولیدکنندگان کشور با باسکول دیجیتال.'}
                    </p>
                  </div>
                </div>

                {/* Quick Capability Highlights */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#242129] border border-white/10 shadow-sm">
                    <span className="text-white flex items-center gap-2 select-none border-0 outline-none bg-transparent shadow-none">
                      <Factory className="w-3.5 h-3.5 text-[#3066be]" />
                      <span className="text-white font-medium select-none border-0 outline-none bg-transparent">
                        {currentLang === 'fa' ? 'تامین مستقیم از کارخانجات معتبر' : currentLang === 'ar' ? 'توريد مباشر من كبرى المصانع' : currentLang === 'tr' ? 'Lider Haddehanelerden Doğrudan Tedarik' : 'Direct Supply from Tier-1 Mills'}
                      </span>
                    </span>
                    <span className="font-semibold text-white tabular-nums text-left text-[11px]">
                      {currentLang === 'fa' ? 'فولاد مبارکه، کاشان و هفت الماس' : currentLang === 'ar' ? 'فولاد مباركه، كاشان، هفت الماس' : currentLang === 'tr' ? 'Mobarakeh, Kashan & Haft Almas' : 'Mobarakeh, Kashan, Haft Almas'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#242129] border border-white/10 shadow-sm">
                    <span className="text-white flex items-center gap-2 select-none border-0 outline-none bg-transparent shadow-none">
                      <Shield className="w-3.5 h-3.5 text-[#3066be]" />
                      <span className="text-white font-medium select-none border-0 outline-none bg-transparent">تست متالورژی و آنالیز کوانتومتری</span>
                    </span>
                    <span className="text-white font-semibold tabular-nums">۱۰۰٪ ضمانت کتبی</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('certificates')}
                    className="w-full text-center py-2 px-3 rounded-xl bg-[#090c9b]/40 hover:bg-[#090c9b]/70 border border-[#b4c5e4]/20 text-[11px] font-semibold text-[#b4c5e4] hover:text-[#fbfff1] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-[#3066be]" />
                    <span>مشاهده تمام گواهینامه‌های ISO و پروانه‌های رسمی ←</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. KEY STATS BAR (COMPACT FLOATING HORIZONTAL BAR) */}
      <section className="-mt-5 sm:-mt-7 mb-4 relative z-20">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/2 start-1/4 -translate-y-1/2 w-80 h-32 bg-[#090c9b]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 end-1/4 -translate-y-1/2 w-80 h-32 bg-[#3066be]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

            {/* Stat 1: کارخانه‌های همکار */}
            <div className="relative overflow-hidden py-3 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#2d2836]/95 via-[#231f2a]/95 to-[#1a1720]/95 backdrop-blur-xl border border-[#b4c5e4]/20 hover:border-[#3066be]/70 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_30px_rgba(48,102,190,0.25)] transition-all duration-300 ease-out group hover:-translate-y-1">
              {/* Top rim specular highlight line */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3066be]/70 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#090c9b] to-[#3066be] border border-[#b4c5e4]/30 shadow-md shadow-[#090c9b]/40 flex items-center justify-center text-[#fbfff1] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Factory className="w-5 h-5 text-[#fbfff1]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1" dir="ltr">
                      <span className="text-base sm:text-lg font-bold font-mono text-white dark:text-[#3066be] group-hover:text-[#b4c5e4] transition-colors">+</span>
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#fbfff1]">
                        450
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#fbfff1] truncate">
                      کارخانه همکار
                    </div>
                  </div>
                </div>

                <span className="hidden xl:inline-flex text-[10px] font-mono text-white dark:text-[#b4c5e4]/70 bg-[#1c1822]/90 px-2.5 py-1 rounded-full border border-[#b4c5e4]/15 shrink-0">
                  تولید و نورد
                </span>
              </div>
            </div>

            {/* Stat 2: مشتری صنعتی */}
            <div className="relative overflow-hidden py-3 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#2d2836]/95 via-[#231f2a]/95 to-[#1a1720]/95 backdrop-blur-xl border border-[#b4c5e4]/20 hover:border-[#3066be]/70 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_30px_rgba(48,102,190,0.25)] transition-all duration-300 ease-out group hover:-translate-y-1">
              {/* Top rim specular highlight line */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3066be]/70 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#090c9b] to-[#3066be] border border-[#b4c5e4]/30 shadow-md shadow-[#090c9b]/40 flex items-center justify-center text-[#fbfff1] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Users className="w-5 h-5 text-[#fbfff1]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1" dir="ltr">
                      <span className="text-base sm:text-lg font-bold font-mono text-white dark:text-[#3066be] group-hover:text-[#b4c5e4] transition-colors">+</span>
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#fbfff1]">
                        780
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#fbfff1] truncate">
                      مشتری صنعتی
                    </div>
                  </div>
                </div>

                <span className="hidden xl:inline-flex text-[10px] font-mono text-white dark:text-[#b4c5e4]/70 bg-[#1c1822]/90 px-2.5 py-1 rounded-full border border-[#b4c5e4]/15 shrink-0">
                  طرف قرارداد
                </span>
              </div>
            </div>

            {/* Stat 3: سابقه فعالیت */}
            <div className="relative overflow-hidden py-3 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#2d2836]/95 via-[#231f2a]/95 to-[#1a1720]/95 backdrop-blur-xl border border-[#b4c5e4]/20 hover:border-[#3066be]/70 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_30px_rgba(48,102,190,0.25)] transition-all duration-300 ease-out group hover:-translate-y-1">
              {/* Top rim specular highlight line */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3066be]/70 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#090c9b] to-[#3066be] border border-[#b4c5e4]/30 shadow-md shadow-[#090c9b]/40 flex items-center justify-center text-[#fbfff1] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Calendar className="w-5 h-5 text-[#fbfff1]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1" dir="ltr">
                      <span className="text-base sm:text-lg font-bold font-mono text-white dark:text-[#3066be] group-hover:text-[#b4c5e4] transition-colors">+</span>
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#fbfff1]">
                        10
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#fbfff1] truncate">
                      سابقه فعالیت
                    </div>
                  </div>
                </div>

                <span className="hidden xl:inline-flex text-[10px] font-mono text-white dark:text-[#b4c5e4]/70 bg-[#1c1822]/90 px-2.5 py-1 rounded-full border border-[#b4c5e4]/15 shrink-0">
                  سال تجربه
                </span>
              </div>
            </div>

            {/* Stat 4: تناژ تامین */}
            <div className="relative overflow-hidden py-3 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#2d2836]/95 via-[#231f2a]/95 to-[#1a1720]/95 backdrop-blur-xl border border-[#b4c5e4]/20 hover:border-[#3066be]/70 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_30px_rgba(48,102,190,0.25)] transition-all duration-300 ease-out group hover:-translate-y-1">
              {/* Top rim specular highlight line */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3066be]/70 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#090c9b] to-[#3066be] border border-[#b4c5e4]/30 shadow-md shadow-[#090c9b]/40 flex items-center justify-center text-[#fbfff1] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Scale className="w-5 h-5 text-[#fbfff1]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1" dir="ltr">
                      <span className="text-base sm:text-lg font-bold font-mono text-white dark:text-[#3066be] group-hover:text-[#b4c5e4] transition-colors">+</span>
                      <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#fbfff1]">
                        50,000
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#fbfff1] truncate">
                      تناژ تامین
                    </div>
                  </div>
                </div>

                <span className="hidden xl:inline-flex text-[10px] font-mono text-white dark:text-[#b4c5e4]/70 bg-[#1c1822]/90 px-2.5 py-1 rounded-full border border-[#b4c5e4]/15 shrink-0">
                  تن فولاد
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PRODUCTS & SERVICES SECTION */}
      <section className="py-20 bg-[#242129] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3066be] mb-2">
                <span>{currentLang === 'fa' ? 'سبد محصولات و فرآوری صنعتی' : 'Industrial Products & Steel Processing'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#fbfff1]">
                {currentLang === 'fa' ? 'محصولات و خدمات تخصصی صنایع تام فولاد' : 'Specialized Steel Products & Processing Portfolio'}
              </h2>
              <p className="text-[#b4c5e4] text-sm mt-1 max-w-2xl">
                {currentLang === 'fa'
                  ? 'تامین تخصصی انواع ورق‌های روغنی، گالوانیزه، سیاه، رنگی، اسیدشویی، فوق کشش، استیل ضد زنگ و خدمات مکانیزه اسلیتینگ و شیت‌کن'
                  : 'Direct distribution of cold-rolled, galvanized, structural hot-rolled, prepainted, pickled, deep-drawing, stainless steel and precision slitting.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-xs font-semibold text-[#b4c5e4] hover:text-[#fbfff1] flex items-center gap-1.5 self-start md:self-auto transition-colors"
            >
              <span>{currentLang === 'fa' ? 'مشاهده کاتالوگ جامع محصولات' : 'View All Products & Services'}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4 text-[#3066be]" /> : <ArrowRight className="w-4 h-4 text-[#3066be]" />}
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
            {services.map((item) => {
              const Icon = item.icon;
              const servicePhotoKey = item.id.replace('service-', '');
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="bg-[#3c3744] border border-[#b4c5e4]/20 hover:border-[#3066be] rounded-3xl overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-[#090c9b]/30 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                >
                  {/* Service Photo Cover */}
                  <div className="relative h-44 overflow-hidden bg-[#242129]">
                    <img
                      src={`/images/services/${servicePhotoKey}.jpg`}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3c3744] via-[#3c3744]/35 to-black/25" />

                    {/* Floating Icon */}
                    <div className="absolute top-3.5 start-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#090c9b]/85 backdrop-blur-md border border-[#b4c5e4]/30 text-[#fbfff1] flex items-center justify-center shadow-lg group-hover:bg-[#3066be] transition-colors">
                        <Icon className="w-5 h-5 text-[#fbfff1]" />
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute top-3.5 end-3.5">
                      <span className="text-[11px] font-semibold text-[#fbfff1] bg-[#242129]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#b4c5e4]/25 shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 pt-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg font-bold text-[#fbfff1] mb-2 group-hover:text-[#b4c5e4] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#b4c5e4] leading-relaxed mb-4 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#b4c5e4]/15 flex items-center justify-between">
                      <span className="text-xs font-mono text-[#b4c5e4]">
                        {item.specs}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onNavigate(item.id); }}
                        className="text-xs font-semibold text-[#fbfff1] group-hover:text-[#3066be] flex items-center gap-1 transition-colors"
                      >
                        <span>مشاهده زیرمجموعه‌ها</span>
                        {isRtl ? <ArrowLeft className="w-3.5 h-3.5 text-[#3066be]" /> : <ArrowRight className="w-3.5 h-3.5 text-[#3066be]" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LIVE MARKET TICKER BOARD */}
      <MarketTicker
        currentLang={currentLang}
        onOpenCalculator={onOpenCalculator}
        onOpenQuote={() => onOpenQuote()}
      />

      {/* 4. CLIENT JOURNEY */}
      <ClientJourney
        currentLang={currentLang}
        onOpenQuote={() => onOpenQuote()}
      />

      {/* 5. DIGITAL CONTRACT SIGNING */}
      <DigitalContractSigner currentLang={currentLang} />

      {/* 6. PARTNERSHIP SECTION */}
      <PartnershipSection currentLang={currentLang} />

      {/* 8. LICENSES & ISO CERTIFICATIONS (جواز کسب، کارت بازرگانی و ۴ ایزو) */}
      <LicensesSection currentLang={currentLang} />

      {/* 9. INTERACTIVE FAQ SECTION (ACCORDION) */}
      <FAQSection
        currentLang={currentLang}
        onOpenQuote={() => onOpenQuote()}
      />

      {/* 9. QUICK CALCULATOR & CTA BANNER */}
      <section className="py-14 bg-gradient-to-r from-[#090c9b]/40 via-[#2e2a35] to-[#242129] border-t border-[#b4c5e4]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#fbfff1]">
              نیاز به استعلام قیمت فوری یا محاسبه وزن رول و شیت دارید؟
            </h3>
            <p className="text-xs sm:text-sm text-[#b4c5e4] mt-1">
              مهندسین فروش و بازرگانی تام فولاد آماده ارائه بهترین نرخ‌های رقابتی روز به شما هستند.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenCalculator}
              className="px-5 py-2.5 rounded-xl bg-[#3c3744] hover:bg-[#4d4757] text-[#fbfff1] font-medium text-xs transition-colors border border-[#b4c5e4]/25 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-[#3066be]" />
              <span>محاسبه آنلاین وزن</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="px-5 py-2.5 rounded-xl bg-[#3066be] hover:bg-[#24529d] text-[#fbfff1] font-bold text-xs transition-colors shadow-lg shadow-[#3066be]/30"
            >
              استعلام تلفنی قیمت
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
