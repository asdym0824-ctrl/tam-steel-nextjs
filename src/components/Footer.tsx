import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  ExternalLink,
  X,
  FileCheck2
} from 'lucide-react';
import { Language } from '../types';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
  onOpenCalculator: () => void;
  onOpenContract: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigate,
  onOpenCalculator,
  onOpenContract,
  onOpenQuote,
}) => {
  const [enamadModalOpen, setEnamadModalOpen] = useState(false);
  const t = translations[currentLang];

  return (
    <footer className="bg-[#1a1820] border-t border-[#b4c5e4]/15 text-[#fbfff1] text-xs">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About & Info */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-[#fbfff1] tracking-wide">
              {currentLang === 'fa' ? 'درباره صنایع تام فولاد' : 'About Tam Foulad'}
            </h4>
            <p className="text-xs text-[#b4c5e4]/80 leading-relaxed text-justify">
              {currentLang === 'fa'
                ? 'مجموعه صنعتی و بازرگانی تام فولاد با بیش از دو دهه سابقه درخشان، مجهز به ۵ خط مکانیزه نواربری (اسلیتینگ) و شیت‌کن، تامین‌کننده تخصصی انواع ورق‌های روغنی، گالوانیزه، سیاه، رنگی و اسیدشویی برای بزرگترین خودروسازان و کارخانجات صنعتی کشور می‌باشد.'
                : 'Tam Foulad Industrial & Trading Co. is a specialized supplier of flat steel products equipped with 5 automated coil slitting and cut-to-length lines.'}
            </p>

            <div className="pt-2 space-y-2 text-[#b4c5e4]/90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3066be] shrink-0 mt-0.5" />
                <span>
                  {t.footer.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3066be] shrink-0" />
                <a href="tel:02177166309" dir="ltr" className="font-mono text-end hover:text-[#fbfff1] transition-colors">
                  021_77166309
                </a>
                <span className="text-xs text-[#b4c5e4]/60">|</span>
                <a href="tel:09122444252" dir="ltr" className="font-mono text-end hover:text-[#fbfff1] transition-colors">
                  09122444252
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3066be] shrink-0" />
                <a href="mailto:tamfoulad.ir@info" className="font-mono hover:text-[#fbfff1] transition-colors">
                  tamfoulad.ir@info
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3066be] shrink-0" />
                <span>
                  {t.footer.workingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#fbfff1] tracking-wide">
              {currentLang === 'fa' ? 'دسترسی سریع' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-[#b4c5e4]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#fbfff1] transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#fbfff1] transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#fbfff1] transition-colors"
                >
                  {t.nav.catalog}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('articles')}
                  className="hover:text-[#fbfff1] transition-colors"
                >
                  {t.nav.articles}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#fbfff1] transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#fbfff1] tracking-wide">
              {currentLang === 'fa' ? 'خدمات و محصولات' : 'Products & Services'}
            </h4>
            <ul className="space-y-2 text-[#b4c5e4]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('service-cold-rolled')}
                  className="hover:text-[#fbfff1] transition-colors flex items-center gap-1.5 text-start"
                >
                  <span>{t.servicesList.coldRolled}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('service-galvanized')}
                  className="hover:text-[#fbfff1] transition-colors flex items-center gap-1.5 text-start"
                >
                  <span>{t.servicesList.galvanized}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('service-hot-rolled')}
                  className="hover:text-[#fbfff1] transition-colors flex items-center gap-1.5 text-start"
                >
                  <span>{t.servicesList.hotRolled}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('service-colored')}
                  className="hover:text-[#fbfff1] transition-colors flex items-center gap-1.5 text-start"
                >
                  <span>{t.servicesList.colored}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('service-slitting')}
                  className="hover:text-[#fbfff1] transition-colors flex items-center gap-1.5 text-start"
                >
                  <span>{t.servicesList.slitting}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('service-shearing')}
                  className="hover:text-[#fbfff1] transition-colors flex items-center gap-1.5 text-start"
                >
                  <span>{t.servicesList.shearing}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Electronic Trust Badges / Licenses */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-[#fbfff1] tracking-wide">
              {currentLang === 'fa' ? 'مجوزها و نمادهای الکترونیکی' : 'Official Licenses'}
            </h4>
            <div className="flex flex-row items-center gap-2">
              {/* جای عکس مجوز اینماد */}
              <button
                type="button"
                onClick={() => setEnamadModalOpen(true)}
                className="w-20 sm:w-22 p-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#3066be] transition-all shadow-sm hover:shadow-md flex flex-col items-center justify-between text-center group cursor-pointer"
                title={currentLang === 'fa' ? 'مجوز نماد اعتماد الکترونیکی (اینماد)' : 'Enamad Trust Seal'}
              >
                {/* قاب جای عکس با پس‌زمینه سفید خالص */}
                <div className="w-full h-16 sm:h-18 rounded-lg bg-white border border-dashed border-slate-200 flex items-center justify-center p-1 overflow-hidden group-hover:border-[#3066be] transition-colors relative">
                  <img
                    src="/images/enamad.svg"
                    alt={currentLang === 'fa' ? 'مجوز نماد اعتماد الکترونیکی (اینماد)' : 'Enamad Trust Seal'}
                    className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span className="text-[9.5px] font-bold text-slate-700 mt-1 block truncate w-full">
                  {currentLang === 'fa' ? 'مجوز اینماد' : 'e-Namad'}
                </span>
                <span className="text-[8px] text-slate-400 block truncate w-full">
                  {currentLang === 'fa' ? 'نماد اعتماد' : 'Trust Seal'}
                </span>
              </button>

              {/* جای عکس مجوز کسب و کار اینترنتی */}
              <button
                type="button"
                onClick={() => setEnamadModalOpen(true)}
                className="w-20 sm:w-22 p-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#3066be] transition-all shadow-sm hover:shadow-md flex flex-col items-center justify-between text-center group cursor-pointer"
                title={currentLang === 'fa' ? 'مجوز کسب و کار اینترنتی (اتحادیه کشوری کسب‌وکارهای مجازی)' : 'Internet Business License'}
              >
                {/* قاب جای عکس با پس‌زمینه سفید خالص */}
                <div className="w-full h-16 sm:h-18 rounded-lg bg-white border border-dashed border-slate-200 flex items-center justify-center p-1 overflow-hidden group-hover:border-[#3066be] transition-colors relative">
                  <img
                    src="/images/ecunion.svg"
                    alt={currentLang === 'fa' ? 'مجوز کسب و کار اینترنتی' : 'Virtual Business License'}
                    className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span className="text-[9.5px] font-bold text-slate-700 mt-1 block truncate w-full">
                  {currentLang === 'fa' ? 'کسب و کار' : 'Business'}
                </span>
                <span className="text-[8px] text-slate-400 block truncate w-full">
                  {currentLang === 'fa' ? 'اتحادیه مجازی' : 'National Union'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-[#b4c5e4]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b4c5e4]/70">
          <div>
            <span>
              © {localizeDigits(new Date().getFullYear(), currentLang)} {t.brandName}. {currentLang === 'fa' ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#b4c5e4]/60">
            <span>{currentLang === 'fa' ? 'سیستم یکپارچه پردازش و تامین فولاد' : 'Integrated Steel Processing & Supply'}</span>
          </div>
        </div>
      </div>

      {/* Trust & License Modal */}
      {enamadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/25 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-start">
            <button
              type="button"
              onClick={() => setEnamadModalOpen(false)}
              className="absolute top-5 end-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:text-[#b4c5e4] dark:hover:text-[#fbfff1] hover:bg-slate-100 dark:hover:bg-[#3c3744] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3 mb-5">
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-20 rounded-xl bg-slate-50 dark:bg-[#1e1b23] border border-slate-200 dark:border-[#b4c5e4]/20 p-1 flex items-center justify-center shadow-sm">
                  <img src="/images/enamad.svg" alt="اینماد" className="w-full h-full object-contain" />
                </div>
                <div className="w-16 h-20 rounded-xl bg-slate-50 dark:bg-[#1e1b23] border border-slate-200 dark:border-[#b4c5e4]/20 p-1 flex items-center justify-center shadow-sm">
                  <img src="/images/ecunion.svg" alt="کسب و کار اینترنتی" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-[#fbfff1]">
                {currentLang === 'fa' ? 'مجوزها و نمادهای قانونی تام فولاد' : 'Official Accreditations & Registry'}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-[#242129] rounded-xl border border-slate-200 dark:border-[#b4c5e4]/15">
                <span className="text-slate-500 dark:text-[#b4c5e4]/70 block mb-0.5">مجوز نماد اعتماد الکترونیکی (اینماد):</span>
                <span className="font-semibold text-slate-800 dark:text-[#fbfff1]">دارای نماد رسمی اعتماد الکترونیکی وزارت صنعت، معدن و تجارت</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#242129] rounded-xl border border-slate-200 dark:border-[#b4c5e4]/15">
                <span className="text-slate-500 dark:text-[#b4c5e4]/70 block mb-0.5">مجوز کسب و کار اینترنتی:</span>
                <span className="font-semibold text-slate-800 dark:text-[#fbfff1]">پروانه کسب رسمی از اتحادیه کشوری کسب‌وکارهای مجازی (اتاق اصناف ایران)</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#242129] rounded-xl border border-slate-200 dark:border-[#b4c5e4]/15">
                <span className="text-slate-500 dark:text-[#b4c5e4]/70 block mb-0.5">پروانه صنفی و اتحادیه:</span>
                <span className="font-semibold text-slate-800 dark:text-[#fbfff1]">اتحادیه صنف فروشندگان آهن، فولاد و فلزات تهران</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#242129] rounded-xl border border-slate-200 dark:border-[#b4c5e4]/15">
                <span className="text-slate-500 dark:text-[#b4c5e4]/70 block mb-0.5">شناسه ملی شرکت:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-[#fbfff1]">۱۴۰۰۴۵۶۷۸۹۰</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEnamadModalOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#3066be] hover:bg-[#3066be]/90 font-bold text-white transition-colors shadow-md"
            >
              {currentLang === 'fa' ? 'متوجه شدم' : 'Understood'}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
