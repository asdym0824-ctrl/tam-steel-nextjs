import React from 'react';
import {
  FileText,
  Search,
  FileSignature,
  Scissors,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface ClientJourneyProps {
  currentLang: Language;
  onOpenQuote?: () => void;
}

export const ClientJourney: React.FC<ClientJourneyProps> = ({ currentLang, onOpenQuote }) => {
  const t = translations[currentLang];
  const isRtl = currentLang === 'fa' || currentLang === 'ar';

  const steps = [
    {
      num: 1,
      phase: currentLang === 'fa' ? 'گام اول: استعلام' : 'Phase 1: Quote',
      icon: FileText,
      deliverableIcon: Clock,
      deliverable: currentLang === 'fa' ? 'اعلام قیمت زیر ۳۰ دقیقه' : 'Quote < 30 Min',
      title: currentLang === 'fa' ? 'استعلام قیمت و موجودی انبار' : 'Price & Stock Inquiry',
      desc: currentLang === 'fa' ? 'ارسال درخواست با مشخصات گرید، ضخامت، عرض و تناژ مورد نیاز، بررسی سریع موجودی انبار و اعلام قیمت قطعی.' : 'Request submission, grading, dimension setting, and direct inventory price verification within 30 min.',
    },
    {
      num: 2,
      phase: currentLang === 'fa' ? 'گام دوم: اصالت‌سنجی' : 'Phase 2: Validation',
      icon: Search,
      deliverableIcon: ShieldCheck,
      deliverable: currentLang === 'fa' ? 'سرتیفیکیت MTC کارخانه' : 'Official Mill MTC',
      title: currentLang === 'fa' ? 'تایید آنالیز و برگه MTC' : 'MTC Certificate Review',
      desc: currentLang === 'fa' ? 'ارائه سرتیفیکیت آزمایشگاهی کارخانه مادر شامل نتایج کوانتومتری، ترکیب شیمیایی و تست کشش مکانیکی پیش از بارگیری.' : 'Laboratory Mill Test Certificate issuance with quantometry and tensile testing data.',
    },
    {
      num: 3,
      phase: currentLang === 'fa' ? 'گام سوم: توافق' : 'Phase 3: Contract',
      icon: FileSignature,
      deliverableIcon: FileCheck,
      deliverable: currentLang === 'fa' ? 'تعهد کتبی تلرانس و زمان' : 'Written Tolerance Terms',
      title: currentLang === 'fa' ? 'انعقاد قرارداد رسمی' : 'Official Agreement',
      desc: currentLang === 'fa' ? 'امضای دیجیتال یا فیزیکی قرارداد شفاف شرکتی همراه با تعهد کتبی تلرانس ابعادی، شرایط پرداخت و زمان‌بندی دقیق تحویل.' : 'Transparent procurement contract specifying exact tolerances, payment terms, and delivery milestones.',
    },
    {
      num: 4,
      phase: currentLang === 'fa' ? 'گام چهارم: فرآوری' : 'Phase 4: Processing',
      icon: Scissors,
      deliverableIcon: Layers,
      deliverable: currentLang === 'fa' ? '۵ خط مکانیزه نواربری' : '5 Slitting & Blanking Lines',
      title: currentLang === 'fa' ? 'فرآوری، نواربری و شیت‌کن' : 'Slitting & Processing',
      desc: currentLang === 'fa' ? 'انجام خدمات برش طولی و عرضی دقیق با تیغه‌های CNC، لبه‌گیری و بسته‌بندی ایمن با تسمه فولادی و پالت چوبی صادراتی.' : 'Precision slitting across 5 lines, deburring, automated steel strapping, and wooden palletization.',
    },
    {
      num: 5,
      phase: currentLang === 'fa' ? 'گام پنجم: لجستیک' : 'Phase 5: Logistics',
      icon: Truck,
      deliverableIcon: CheckCircle2,
      deliverable: currentLang === 'fa' ? 'قبض رسمی باسکول ۶۰ تنی' : '60-Ton Weigh Ticket',
      title: currentLang === 'fa' ? 'باسکول دیجیتال و تحویل' : 'Weighbridge & Delivery',
      desc: currentLang === 'fa' ? 'توزین دقیق بار روی باسکول ۶۰ تنی دیجیتال، صدور قبض رسمی با کد رهگیری و بارگیری سریع بر روی تریلی یا کفی به سراسر کشور.' : '60-ton certified weighbridge calibration, official weight ticket issuance, and nationwide trucking.',
    },
  ];

  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-gradient-to-b dark:from-[#1c1922] dark:via-[#201c27] dark:to-[#1a1720] relative overflow-hidden border-t border-slate-200 dark:border-[#b4c5e4]/15 transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-[#3066be]/5 dark:bg-[#3066be]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 end-10 w-72 h-72 bg-[#090c9b]/5 dark:bg-[#090c9b]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3066be]/10 dark:bg-gradient-to-r dark:from-[#090c9b]/30 dark:to-[#3066be]/30 border border-blue-200 dark:border-[#3066be]/40 text-[#3066be] dark:text-[#b4c5e4] text-xs font-semibold mb-3.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-[#3066be]" />
            <span>{currentLang === 'fa' ? 'فرآیند استاندارد خرید و تامین B2B' : currentLang === 'ar' ? 'مسار الشراء والتوريد' : currentLang === 'tr' ? 'Satın Alma & Tedarik Süreci' : 'Procurement & Supply Process'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-[#fbfff1] tracking-tight leading-snug">
            {t.journeySection?.title || (currentLang === 'fa' ? 'مراحل گام‌به‌گام خرید، کنترل کیفیت و تحویل' : 'Step-by-Step Purchase, Quality Control & Dispatch')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#b4c5e4]/80 mt-2.5 leading-relaxed max-w-2xl mx-auto font-light">
            {t.journeySection?.subtitle || (currentLang === 'fa' ? 'از استعلام اولیه و اعلام قیمت تا تایید سرتیفیکیت MTC، فرآوری مکانیزه و تحویل با باسکول رسمی' : 'From initial quote to digital dispatch & weighbridge verification')}
          </p>
        </div>

        {/* Steps Pipeline with Interconnected Flow */}
        <div className="relative">

          {/* Desktop Connecting Stepper Line (visible on lg screens) */}
          <div className="hidden lg:block absolute top-[42px] inset-x-12 h-1 bg-gradient-to-r from-[#3066be]/15 via-[#3066be]/40 to-[#3066be]/15 dark:from-[#3066be]/20 dark:via-[#3066be]/60 dark:to-[#3066be]/20 z-0 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3066be]/20 dark:via-[#b4c5e4]/50 to-transparent animate-pulse" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const DeliverableIcon = step.deliverableIcon;

              return (
                <div
                  key={step.num}
                  className="client-journey-card bg-white dark:bg-gradient-to-b dark:from-[#2c2736]/95 dark:via-[#241f2d]/95 dark:to-[#1c1824]/95 border border-slate-200 dark:border-[#b4c5e4]/20 hover:border-[#3066be] rounded-3xl p-5 flex flex-col justify-between shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-[0_16px_36px_rgba(48,102,190,0.18)] hover:-translate-y-1.5 transition-all duration-300 group relative backdrop-blur-sm"
                >
                  {/* Directional Chevron arrow for desktop */}
                  {idx < steps.length - 1 && (
                    <div className="step-connector-chevron hidden lg:flex absolute -end-3 top-10 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-blue-50 dark:bg-[#1c1824] border border-blue-200 dark:border-[#3066be]/50 items-center justify-center text-[#3066be] shadow-sm group-hover:scale-110 group-hover:bg-[#3066be] group-hover:text-white transition-all">
                      {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </div>
                  )}

                  <div>
                    {/* Top Row: Stepper Number + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Step Number Badge */}
                      <div className="step-number-badge w-11 h-11 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#090c9b] dark:to-[#3066be] text-slate-600 dark:text-white border border-slate-200 dark:border-[#b4c5e4]/30 shadow-sm dark:shadow-md dark:shadow-[#090c9b]/30 flex items-center justify-center font-bold text-base leading-none group-hover:scale-105 group-hover:border-[#3066be] group-hover:text-[#3066be] dark:group-hover:text-white group-hover:shadow-md transition-all duration-300">
                        {localizeDigits(step.num, currentLang)}
                      </div>

                      {/* Icon */}
                      <div className="step-icon-box w-9 h-9 rounded-xl bg-blue-50/80 dark:bg-[#1d1a24] border border-blue-100 dark:border-[#b4c5e4]/15 flex items-center justify-center text-[#3066be] dark:text-[#b4c5e4]/70 group-hover:text-amber-500 group-hover:border-amber-400/40 transition-colors">
                        <Icon className="w-4 h-4 text-[#3066be] dark:text-[#b4c5e4]/70 transition-colors" />
                      </div>
                    </div>

                    {/* Phase chip */}
                    <span className="inline-block text-[10px] font-semibold tracking-wide text-[#3066be] uppercase mb-1.5">
                      {step.phase}
                    </span>

                    {/* Step Title */}
                    <h3 className="text-sm font-bold text-slate-900 dark:text-[#fbfff1] group-hover:text-[#3066be] transition-colors mb-2 leading-snug">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-slate-600 dark:text-[#b4c5e4]/75 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Deliverable Key Tag */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-[#b4c5e4]/15 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-[#b4c5e4] group-hover:text-slate-900 dark:group-hover:text-[#fbfff1] transition-colors">
                    <DeliverableIcon className="w-3.5 h-3.5 text-[#3066be] shrink-0" />
                    <span className="truncate">{step.deliverable}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
