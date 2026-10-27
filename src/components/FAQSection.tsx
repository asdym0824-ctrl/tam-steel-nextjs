import React, { useState } from 'react';
import { translations } from '../i18n/translations';
import { Language, FAQItem } from '../types';
import { faqData } from '../data/faqData';
import {
  HelpCircle, ChevronDown, DollarSign, FileCheck,
  Truck, ShieldCheck, PhoneCall, MessageCircle
} from 'lucide-react';

interface FAQSectionProps {
  currentLang: Language;
  onOpenQuote: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLang, onOpenQuote }) => {
  const t = translations[currentLang];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-pricing-validity': true, // First item open by default for immediate engagement
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categoryLabels: Record<string, Record<Language, string>> = {
    all: {
      fa: 'همه پرسش‌ها',
      en: 'All Questions',
      ar: 'جميع الأسئلة',
      tr: 'Tüm Sorular',
    },
    pricing: {
      fa: 'قیمت‌گذاری و مالیات',
      en: 'Pricing & Taxes',
      ar: 'الأسعار والضرائب',
      tr: 'Fiyatlandırma & KDV',
    },
    terms: {
      fa: 'شرایط پرداخت و سفارش',
      en: 'Payment & Terms',
      ar: 'شروط الدفع والطلب',
      tr: 'Ödeme ve Sözleşme',
    },
    delivery: {
      fa: 'باربری، باسکول و تحویل',
      en: 'Logistics & Weighbridge',
      ar: 'الشحن والميزان والتسليم',
      tr: 'Kantar ve Lojistik',
    },
    quality: {
      fa: 'کیفیت و سرتیفیکیت MTC',
      en: 'Quality & MTC Certs',
      ar: 'الجودة وشهادات الفحص',
      tr: 'Kalite ve MTC Analizi',
    },
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'pricing': return DollarSign;
      case 'terms': return FileCheck;
      case 'delivery': return Truck;
      case 'quality': return ShieldCheck;
      default: return HelpCircle;
    }
  };

  const filteredFaqs = activeCategory === 'all'
    ? faqData
    : faqData.filter((item) => item.category === activeCategory);

  const sectionTitles: Record<Language, { badge: string; title: string; subtitle: string; callout: string; calloutSub: string; askBtn: string }> = {
    fa: {
      badge: 'مرکز پاسخگویی به سوالات متداول',
      title: 'پرسش‌های متداول درباره قیمت‌گذاری و شرایط بازرگانی',
      subtitle: 'شفاف‌سازی کامل درباره نوسانات بازار، مالیات بر ارزش افزوده، باسکول دیجیتال و نحوه عقد قرارداد در صنایع تام فولاد',
      callout: 'پاسخ سوال خود را در این بخش نیافتید؟',
      calloutSub: 'کارشناسان فروش و مهندسین متالورژی ما در لحظه آماده پاسخگویی و مشاوره تخصصی به شما هستند.',
      askBtn: 'استعلام فوری تلفنی',
    },
    en: {
      badge: 'Frequently Asked Questions',
      title: 'Commercial Terms, Pricing & Delivery FAQ',
      subtitle: 'Clear answers on market benchmarking, VAT itemization, digital weighbridge certification, and contracting workflows.',
      callout: 'Didn’t find the answer to your question?',
      calloutSub: 'Our commercial desk and metallurgical engineers are on standby for direct consultation.',
      askBtn: 'Request Instant Consultation',
    },
    ar: {
      badge: 'الأسئلة الشائعة والمعاملات التجارية',
      title: 'الأسئلة الشائعة حول تسعير الصلب وشروط التوريد',
      subtitle: 'إيضاحات وافية حول تقلبات السوق، ضرائب القيمة المضافة، شهادات فحص الميزان وإجراءات التعاقد المعتمدة.',
      callout: 'هل لديك استفسار آخر لم تجد إجابته هنا؟',
      calloutSub: 'مهندسو المبيعات وخبراء المعادن لدينا على استعداد تام لتقديم المشورة الفنية الفورية.',
      askBtn: 'طلب استشارة فورية',
    },
    tr: {
      badge: 'Sıkça Sorulan Sorular',
      title: 'Çelik Fiyatlandırması ve Ticari Koşullar S.S.S.',
      subtitle: 'Piyasa dalgalanmaları, KDV uygulamaları, kantar prosedürü ve sipariş adımları hakkında tüm merak edilenler.',
      callout: 'Aradığınız cevabı bulamadınız mı?',
      calloutSub: 'Satış mühendislerimiz ve metalurji uzmanlarımız projenize özel danışmanlık için hazır.',
      askBtn: 'Hızlı Danışmanlık Alın',
    },
  };

  const currentTitles = sectionTitles[currentLang] || sectionTitles.fa;

  return (
    <section className="py-20 bg-[#242129] relative overflow-hidden border-t border-[#b4c5e4]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 end-0 w-96 h-96 bg-[#090c9b]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 start-0 w-80 h-80 bg-[#3066be]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3066be]/20 border border-[#3066be]/40 text-xs font-semibold text-[#fbfff1]">
            <HelpCircle className="w-3.5 h-3.5 text-[#3066be]" />
            <span>{currentTitles.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#fbfff1]">
            {currentTitles.title}
          </h2>

          <p className="text-[#b4c5e4] text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {currentTitles.subtitle}
          </p>
        </div>

        {/* Functional Category Filter Tabs */}
        <div className="faq-category-container flex items-center justify-center flex-wrap gap-2 p-2 bg-[#3c3744] border border-[#b4c5e4]/20 rounded-2xl w-full max-w-4xl mx-auto">
          {Object.keys(categoryLabels).map((catKey) => {
            const isSelected = activeCategory === catKey;
            const CatIcon = getCategoryIcon(catKey);
            return (
              <button
                type="button"
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#090c9b] font-bold shadow-md shadow-black/10 border border-[#b4c5e4]/40 dark:bg-[#3066be] dark:text-[#fbfff1] dark:border-transparent dark:shadow-[#3066be]/30'
                    : 'text-[#64748b] hover:text-[#090c9b] dark:text-[#b4c5e4] dark:hover:text-[#fbfff1]'
                }`}
              >
                <CatIcon
                  className={`w-3.5 h-3.5 text-[#3066be] ${
                    isSelected ? 'dark:text-[#fbfff1]' : 'dark:text-[#b4c5e4]'
                  }`}
                />
                <span className={isSelected ? 'text-[#090c9b] dark:text-[#fbfff1]' : ''}>{categoryLabels[catKey][currentLang]}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            const CatIcon = getCategoryIcon(faq.category);
            const catLabel = categoryLabels[faq.category]?.[currentLang] || '';

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#3c3744] border-[#3066be] shadow-xl shadow-[#090c9b]/30'
                    : 'bg-[#3c3744]/80 border-[#b4c5e4]/20 hover:border-[#3066be]/60 hover:bg-[#3c3744]'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-start p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isOpen
                          ? 'bg-[#3066be] text-[#fbfff1]'
                          : 'bg-[#242129] border border-[#b4c5e4]/20 text-[#3066be]'
                      }`}
                    >
                      <CatIcon className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-[#b4c5e4]/70 bg-[#242129] px-2 py-0.5 rounded-md border border-[#b4c5e4]/15">
                          {catLabel}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#fbfff1] leading-snug">
                        {faq.question[currentLang]}
                      </h3>
                    </div>
                  </div>

                  {/* Accordion Toggle Chevron */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-white border border-slate-200 text-slate-500 shadow-xs dark:bg-[#242129] dark:border-[#b4c5e4]/20 dark:text-[#b4c5e4] transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-white text-slate-500 border-slate-300 dark:bg-[#3066be] dark:text-[#fbfff1] dark:border-[#3066be]'
                        : 'hover:bg-white dark:hover:bg-[#2e2a35]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-colors text-slate-500 dark:text-current" />
                  </div>
                </button>

                {/* Accordion Collapsible Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#b4c5e4] leading-relaxed border-t border-[#b4c5e4]/10 ms-14 me-5 mt-1 font-light">
                    {faq.answer[currentLang]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions? Interactive Callout Banner */}
        <div className="bg-gradient-to-r from-[#090c9b]/50 via-[#3c3744] to-[#28242f] border border-[#b4c5e4]/25 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-start">
            <h4 className="text-base sm:text-lg font-bold text-[#fbfff1]">
              {currentTitles.callout}
            </h4>
            <p className="text-xs sm:text-sm text-[#b4c5e4] max-w-xl">
              {currentTitles.calloutSub}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded-xl bg-[#3066be] hover:bg-[#24529d] text-white !text-white font-bold text-xs transition-all shadow-lg shadow-[#3066be]/30 flex items-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white !text-white" />
              <span className="text-white !text-white">{currentTitles.askBtn}</span>
            </button>

            <a
              href="https://wa.me/989122444252"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#242129] hover:bg-[#2e2a35] text-[#b4c5e4] hover:text-[#fbfff1] border border-[#b4c5e4]/20 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#3066be]" />
              <span>واتس‌اپ</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
