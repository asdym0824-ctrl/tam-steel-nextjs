import React, { useState } from 'react';
import {
  Download,
  BookOpen,
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Layers,
  ArrowRight,
  HardDrive,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  FileCheck
} from 'lucide-react';
import { Language, BrochureCatalog, CatalogItem } from '../types';
import { brochureCatalogs, catalogItems } from '../data/catalogData';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface CatalogPageProps {
  currentLang: Language;
  onOpenQuote: () => void;
  onOpenCalculator: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  currentLang,
  onOpenQuote,
  onOpenCalculator,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'brochures' | 'matrix'>('brochures');
  const [selectedBrochure, setSelectedBrochure] = useState<BrochureCatalog | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Filter & Search states for the technical matrix tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');

  const filteredItems = catalogItems.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title[currentLang].toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.grade.toLowerCase().includes(q) ||
      item.originFactory.toLowerCase().includes(q);

    const matchesService =
      selectedServiceFilter === 'all' || item.serviceId === selectedServiceFilter;

    return matchesSearch && matchesService;
  });

  const handleDownload = (brochure: BrochureCatalog, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Trigger simulated download of PDF file
    const content = `TAM FOULAD INDUSTRIAL & TRADING CO.\nOfficial Technical Brochure: ${brochure.title[currentLang]}\nCode: ${brochure.code}\nVersion: ${brochure.version}\nFile Size: ${brochure.fileSize}\nPages: ${brochure.pagesCount}\n\nKey Highlights:\n${brochure.highlights[currentLang].map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\nTam Foulad Central Stockyards: 021_77166309 | 09122444252 | tamfoulad.ir@info | www.tamfoulad.ir`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = brochure.downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessToast(brochure.title[currentLang]);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  // Helper to render book cover background styles based on theme
  const getCoverThemeStyles = (theme: BrochureCatalog['coverTheme']) => {
    switch (theme) {
      case 'navy-gold':
        return {
          bg: 'bg-gradient-to-br from-[#10223d] via-[#1b355e] to-[#0a1628]',
          accentText: 'text-[#f5a623]',
          border: 'border-[#f5a623]/30',
          badgeBg: 'bg-[#f5a623]/20 text-[#f5a623]',
        };
      case 'white-minimal':
        return {
          bg: 'bg-gradient-to-br from-[#ffffff] via-[#f3f4f6] to-[#e5e7eb]',
          accentText: 'text-[#1e293b]',
          titleColor: 'text-[#0f172a]',
          border: 'border-slate-300',
          badgeBg: 'bg-slate-900/10 text-slate-800',
        };
      case 'amber-gold':
        return {
          bg: 'bg-gradient-to-br from-[#78350f] via-[#b45309] to-[#d97706]',
          accentText: 'text-[#fef3c7]',
          border: 'border-amber-300/40',
          badgeBg: 'bg-black/25 text-amber-200',
        };
      case 'silver-steel':
        return {
          bg: 'bg-gradient-to-br from-[#334155] via-[#475569] to-[#1e293b]',
          accentText: 'text-[#38bdf8]',
          border: 'border-cyan-400/30',
          badgeBg: 'bg-cyan-500/20 text-cyan-200',
        };
      case 'blueprint-blue':
        return {
          bg: 'bg-gradient-to-br from-[#0c4a6e] via-[#0284c7] to-[#0369a1]',
          accentText: 'text-[#bae6fd]',
          border: 'border-sky-300/40',
          badgeBg: 'bg-sky-950/40 text-sky-200',
        };
      case 'charcoal-red':
        return {
          bg: 'bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#44403c]',
          accentText: 'text-[#f87171]',
          border: 'border-rose-500/30',
          badgeBg: 'bg-rose-500/20 text-rose-200',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-[#1e293b] to-[#0f172a]',
          accentText: 'text-[#3066be]',
          border: 'border-[#3066be]/40',
          badgeBg: 'bg-[#3066be]/20 text-[#3066be]',
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#242129] py-10 sm:py-14 text-slate-900 dark:text-[#fbfff1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3066be]/15 dark:bg-[#3066be]/20 border border-[#3066be]/30 dark:border-[#3066be]/40 text-[#3066be] dark:text-[#b4c5e4] text-xs font-semibold mb-3">
            <BookOpen className="w-4 h-4 text-[#3066be]" />
            <span>{currentLang === 'fa' ? 'کاتالوگ و اسناد مهندسی' : currentLang === 'ar' ? 'الكتالوج والوثائق الهندسية' : currentLang === 'tr' ? 'Teknik Belgeler & Kataloglar' : 'Technical Catalogs & Documentation'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#fbfff1] tracking-tight">
            {t.catalogPage.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#b4c5e4]/80 mt-2 leading-relaxed">
            {t.catalogPage.subtitle}
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 shadow-md">
            <button
              type="button"
              onClick={() => setActiveTab('brochures')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'brochures'
                  ? 'bg-[#3066be] text-white !text-white shadow-md shadow-[#3066be]/30'
                  : 'text-slate-600 dark:text-[#b4c5e4] hover:text-slate-900 dark:hover:text-[#fbfff1]'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'brochures' ? 'text-white !text-white' : 'text-slate-500 dark:text-[#b4c5e4]'}`} />
              <span className={activeTab === 'brochures' ? 'text-white !text-white' : 'text-slate-600 dark:text-[#b4c5e4]'}>
                {currentLang === 'fa' ? 'بروشور و کاتالوگ‌ها' : currentLang === 'ar' ? 'الكتالوجات والنشرات' : currentLang === 'tr' ? 'Broşürler & Kataloglar' : 'Brochures & Catalogs'}
              </span>
              <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                activeTab === 'brochures'
                  ? 'bg-white/20 text-white !text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-[#b4c5e4]'
              }`}>
                {localizeDigits(brochureCatalogs.length, currentLang)}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'matrix'
                  ? 'bg-[#3066be] text-white !text-white shadow-md shadow-[#3066be]/30'
                  : 'text-slate-600 dark:text-[#b4c5e4] hover:text-slate-900 dark:hover:text-[#fbfff1]'
              }`}
            >
              <Layers className={`w-4 h-4 ${activeTab === 'matrix' ? 'text-white !text-white' : 'text-slate-500 dark:text-[#b4c5e4]'}`} />
              <span className={activeTab === 'matrix' ? 'text-white !text-white' : 'text-slate-600 dark:text-[#b4c5e4]'}>
                {currentLang === 'fa' ? 'جدول مشخصات و گریدها' : currentLang === 'ar' ? 'جدول المواصفات والدرجات' : currentLang === 'tr' ? 'Kalite & Özellik Tablosu' : 'Specifications & Grades Matrix'}
              </span>
              <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                activeTab === 'matrix'
                  ? 'bg-white/20 text-white !text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-[#b4c5e4]'
              }`}>
                {localizeDigits(catalogItems.length, currentLang)}
              </span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OFFICIAL BROCHURES SHOWCASE */}
        {/* ============================================================== */}
        {activeTab === 'brochures' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Catalog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {brochureCatalogs.map((brochure) => {
                const themeStyles = getCoverThemeStyles(brochure.coverTheme);
                return (
                  <div
                    key={brochure.id}
                    onClick={() => setSelectedBrochure(brochure)}
                    className="corporate-catalog-card bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-3xl overflow-hidden hover:border-[#3066be]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#3066be]/15 group cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
                  >
                    {/* 1. TOP SECTION: Studio Mockup Stage with Realistic 3D Booklet */}
                    <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/90 dark:from-[#1c1922] dark:via-[#25212c] dark:to-[#17151c] p-6 flex items-center justify-center overflow-hidden select-none border-b border-slate-200/80 dark:border-[#b4c5e4]/15">
                      {/* Studio Lighting spotlight radial background */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,transparent_75%)] dark:bg-[radial-gradient(circle_at_center,rgba(48,102,190,0.2)_0%,transparent_75%)] pointer-events-none" />

                      {/* Subtle isometric drafting grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.07)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-70 dark:opacity-20" />

                      {/* Floating Badges */}
                      <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-black/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm text-[11px] font-bold text-slate-700 dark:text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3066be]" />
                          <span>{brochure.categoryLabel[currentLang]}</span>
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-[#3066be]/15 dark:bg-[#3066be]/25 border border-[#3066be]/30 text-[#3066be] dark:text-[#93c5fd] font-mono text-[10px] font-bold shadow-sm">
                          PDF • {localizeDigits(brochure.version, currentLang)}
                        </span>
                      </div>

                      {/* 3D Ground Contact Shadow */}
                      <div className="absolute bottom-5 w-48 sm:w-56 h-6 bg-slate-900/35 dark:bg-black/65 blur-md rounded-full transform scale-y-50 group-hover:scale-110 group-hover:opacity-75 transition-all duration-300 pointer-events-none" />

                      {/* 3D BOOKLET CONTAINER - dir="ltr" guarantees correct anatomical spine & cover placement */}
                      <div
                        dir="ltr"
                        className="relative z-10 flex items-stretch transform -rotate-3 group-hover:rotate-0 group-hover:-translate-y-2.5 group-hover:scale-105 transition-all duration-300 ease-out"
                        style={{ filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.22))' }}
                      >
                        {/* Book Spine (Left Thickness) */}
                        <div className="w-4 sm:w-4.5 h-56 sm:h-64 rounded-l-sm bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 border-r border-black/40 shadow-inner flex flex-col justify-between items-center py-3 select-none shrink-0 relative overflow-hidden">
                          <div className="absolute inset-y-0 start-0.5 w-0.5 bg-white/20" />
                          <span className="text-[7px] font-mono font-bold text-amber-300/80 uppercase">TF</span>
                          <span className="text-[8px] font-mono font-bold tracking-widest text-white/70 rotate-90 whitespace-nowrap uppercase">
                            {brochure.code}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        </div>

                        {/* Front Cover Main Body */}
                        <div
                          className={`w-40 sm:w-48 h-56 sm:h-64 rounded-r-md ${themeStyles.bg} p-4 sm:p-5 flex flex-col justify-between border-t border-r border-b ${themeStyles.border} relative overflow-hidden shrink-0 select-none`}
                        >
                          {/* Diagonal Gloss Highlight */}
                          <div className="absolute -inset-x-10 -top-10 h-32 bg-gradient-to-b from-white/25 via-white/10 to-transparent transform -rotate-12 pointer-events-none" />

                          {/* Spine Hinge / Score Crease */}
                          <div className="absolute inset-y-0 left-1.5 w-px bg-black/25 shadow-[1px_0_1px_rgba(255,255,255,0.15)] pointer-events-none" />

                          {/* Cover Header */}
                          <div className="relative z-10 flex items-start justify-between">
                            <div className="w-7 h-7 rounded-lg bg-black/25 backdrop-blur-sm p-1 flex items-center justify-center border border-white/20 shadow-sm">
                              <span className="text-[10px] font-black tracking-tight text-white">TF</span>
                            </div>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm ${themeStyles.badgeBg}`}>
                              {brochure.code}
                            </span>
                          </div>

                          {/* Cover Center Typography */}
                          <div className="relative z-10 my-auto text-center space-y-1 px-1">
                            <span className="text-[9px] font-mono tracking-widest uppercase opacity-85 text-white/90 bg-black/25 px-2 py-0.5 rounded-full border border-white/10 inline-block">
                              CATALOGUE {brochure.version}
                            </span>
                            <h4
                              className={`text-sm sm:text-base font-black tracking-tight leading-snug drop-shadow-sm ${
                                themeStyles.titleColor || 'text-white'
                              }`}
                            >
                              {brochure.coverTitle[currentLang]}
                            </h4>
                            <p className={`text-[9px] sm:text-[10px] font-medium leading-snug line-clamp-2 opacity-90 ${themeStyles.accentText}`}>
                              {brochure.coverSubtitle[currentLang]}
                            </p>
                          </div>

                          {/* Cover Footer */}
                          <div className="relative z-10 pt-2 border-t border-white/20 flex items-center justify-between text-[8px] font-mono text-white/80">
                            <span className="font-bold tracking-wider">TAM FOULAD</span>
                            <span className="px-1.5 py-0.5 rounded bg-black/20 text-white font-semibold">
                              {localizeDigits(brochure.pagesCount, currentLang)} PGS
                            </span>
                          </div>
                        </div>

                        {/* Paper Pages Edge (Right Thickness Block) */}
                        <div className="w-3 sm:w-3.5 h-56 sm:h-64 bg-gradient-to-r from-amber-50 via-slate-100 to-slate-200 border-r border-t border-b border-slate-300 dark:border-slate-500 shadow-sm rounded-r-sm flex flex-col justify-between py-1 shrink-0 relative overflow-hidden">
                          <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,#cbd5e1_0px,#cbd5e1_1px,transparent_1px,transparent_3px)] opacity-60" />
                        </div>
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20">
                        <button
                          type="button"
                          className="px-4 py-2.5 rounded-xl bg-[#3066be] hover:bg-[#3066be]/90 text-white text-xs font-bold flex items-center gap-2 shadow-xl transform scale-95 group-hover:scale-100 transition-transform"
                        >
                          <Eye className="w-4 h-4 text-white" />
                          <span className="text-white">{currentLang === 'fa' ? 'پیش‌نمایش سند' : currentLang === 'ar' ? 'معاينة الكتالوج' : currentLang === 'tr' ? 'Kataloğu İncele' : 'Preview Catalog'}</span>
                        </button>
                      </div>
                    </div>

                    {/* 2. BOTTOM DETAILS: Clean Engineering Information */}
                    <div className="p-5 sm:p-6 space-y-4 flex flex-col justify-between flex-1">
                      <div className="space-y-2.5">
                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#fbfff1] group-hover:text-[#3066be] transition-colors leading-snug">
                          {brochure.title[currentLang]}
                        </h3>

                        {/* Subtitle / Description */}
                        <p className="text-xs text-slate-600 dark:text-[#b4c5e4]/80 line-clamp-2 leading-relaxed">
                          {brochure.description[currentLang]}
                        </p>

                        {/* Highlights snippet */}
                        <div className="space-y-1.5 pt-1">
                          {brochure.highlights[currentLang].slice(0, 2).map((h, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-[#fbfff1]/85">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="line-clamp-1">{localizeDigits(h, currentLang)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-[#b4c5e4]/10 space-y-3">
                        {/* File Size & Pages Badges */}
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-[#b4c5e4]">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#f5a623] bg-[#f5a623]/10 px-2.5 py-1 rounded-lg border border-[#f5a623]/20">
                            <HardDrive className="w-3.5 h-3.5" />
                            <span>
                              {currentLang === 'fa' ? 'حجم:' : 'Size:'} {localizeDigits(brochure.fileSize, currentLang)}
                            </span>
                          </span>

                          <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-[#b4c5e4]/80 bg-slate-100 dark:bg-[#242129] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-[#b4c5e4]/10">
                            {localizeDigits(brochure.pagesCount, currentLang)} {currentLang === 'fa' ? 'صفحه' : 'Pages'}
                          </span>
                        </div>

                        {/* Prominent Download Button */}
                        <button
                          type="button"
                          onClick={(e) => handleDownload(brochure, e)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#3066be] hover:bg-[#3066be]/90 text-white !text-white shadow-lg shadow-[#3066be]/20 transition-all hover:scale-[1.01]"
                        >
                          <Download className="w-4 h-4 text-white !text-white" />
                          <span className="text-white !text-white">{currentLang === 'fa' ? 'دانلود فایل PDF' : currentLang === 'ar' ? 'تحميل الكتالوج (PDF)' : currentLang === 'tr' ? 'Kataloğu İndir (PDF)' : 'Download PDF'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: METALLURGICAL TECHNICAL MATRIX */}
        {/* ============================================================== */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-3xl p-4 sm:p-5 shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 dark:text-[#b4c5e4] absolute start-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.catalogPage.searchPlaceholder}
                  className="w-full bg-slate-50 dark:bg-[#242129] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-xl ps-10 pe-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-[#fbfff1] placeholder-slate-400 dark:placeholder-[#b4c5e4]/50 focus:outline-none focus:ring-2 focus:ring-[#3066be]/20 focus:border-[#3066be] transition-all"
                />
              </div>

              {/* Service filter */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400 dark:text-[#b4c5e4] shrink-0" />
                  <select
                    value={selectedServiceFilter}
                    onChange={(e) => setSelectedServiceFilter(e.target.value)}
                    className="bg-slate-50 dark:bg-[#242129] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-[#fbfff1] focus:outline-none focus:ring-2 focus:ring-[#3066be]/20 focus:border-[#3066be] cursor-pointer transition-all"
                  >
                    <option value="all">{t.catalogPage.allCategories}</option>
                    <option value="cold-rolled">{currentLang === 'fa' ? 'ورق روغنی (نورد سرد)' : 'Cold-Rolled'}</option>
                    <option value="galvanized">{currentLang === 'fa' ? 'ورق گالوانیزه' : 'Galvanized'}</option>
                    <option value="hot-rolled">{currentLang === 'fa' ? 'ورق سیاه (نورد گرم)' : 'Hot-Rolled'}</option>
                    <option value="colored">{currentLang === 'fa' ? 'ورق رنگی کوره ای' : 'Prepainted'}</option>
                    <option value="slitting">{currentLang === 'fa' ? 'خدمات نواربری (اسلیتینگ)' : 'Slitting'}</option>
                    <option value="steel-deck">{currentLang === 'fa' ? 'عرشه فولادی' : 'Steel Deck'}</option>
                  </select>
                </div>
                <div className="text-xs font-mono font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-[#b4c5e4] shrink-0">
                  {localizeDigits(filteredItems.length, currentLang)} {currentLang === 'fa' ? 'گرید فعال' : 'Grades'}
                </div>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-3xl overflow-hidden shadow-sm dark:shadow-2xl transition-colors">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse">
                  <thead className="bg-slate-50/90 dark:bg-[#1f1c24] text-slate-700 dark:text-[#b4c5e4] font-bold border-b border-slate-200 dark:border-[#b4c5e4]/15">
                    <tr>
                      <th className="py-4 px-4 text-start font-bold whitespace-nowrap">{currentLang === 'fa' ? 'کد کاتالوگ' : 'Code'}</th>
                      <th className="py-4 px-4 text-start font-bold">{currentLang === 'fa' ? 'عنوان و مشخصه محصول' : 'Product & Description'}</th>
                      <th className="py-4 px-4 text-start font-bold whitespace-nowrap">{t.catalogPage.grade}</th>
                      <th className="py-4 px-4 text-start font-bold whitespace-nowrap">{t.catalogPage.standards}</th>
                      <th className="py-4 px-4 text-start font-bold whitespace-nowrap">{t.catalogPage.thickness}</th>
                      <th className="py-4 px-4 text-start font-bold whitespace-nowrap">{t.catalogPage.width}</th>
                      <th className="py-4 px-4 text-start font-bold whitespace-nowrap">{t.catalogPage.factory}</th>
                      <th className="py-4 px-4 text-center font-bold whitespace-nowrap">{currentLang === 'fa' ? 'استعلام' : 'Inquiry'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#b4c5e4]/10">
                    {filteredItems.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`transition-colors hover:bg-blue-50/70 dark:hover:bg-[#3c3744]/70 ${
                          idx % 2 === 1 ? 'bg-slate-50/40 dark:bg-[#282430]/50' : 'bg-white dark:bg-[#2d2935]'
                        }`}
                      >
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-[#3066be]/10 dark:bg-[#3066be]/20 text-[#3066be] dark:text-[#93c5fd] border border-[#3066be]/20 inline-block shadow-xs">
                            {item.code}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-[#fbfff1] leading-snug">
                          {item.title[currentLang]}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 font-mono font-extrabold px-2.5 py-1 rounded-md bg-amber-500/10 dark:bg-amber-400/15 text-amber-600 dark:text-[#f5a623] border border-amber-500/20 text-xs">
                            {item.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-mono text-slate-600 dark:text-[#b4c5e4]/90 text-[11px] bg-slate-100 dark:bg-black/30 px-2.5 py-1 rounded-md border border-slate-200/80 dark:border-white/5">
                            {item.standards}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-mono text-slate-800 dark:text-[#fbfff1] font-semibold text-xs dir-ltr inline-block">
                            {localizeDigits(item.thicknessRange, currentLang)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-mono text-slate-800 dark:text-[#fbfff1] font-semibold text-xs dir-ltr inline-block">
                            {localizeDigits(item.widthRange, currentLang)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-[#b4c5e4] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3066be] shrink-0" />
                            {item.originFactory}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={onOpenQuote}
                            className="px-3.5 py-1.5 rounded-xl bg-[#3066be] hover:bg-[#24529d] text-white !text-white font-bold text-xs transition-all shadow-sm hover:shadow-md hover:shadow-[#3066be]/30 active:scale-95 inline-flex items-center gap-1.5"
                          >
                            <span>{t.nav.requestQuote}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty Search State */}
              {filteredItems.length === 0 && (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#3c3744] text-slate-400 dark:text-[#b4c5e4] mx-auto flex items-center justify-center">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-[#fbfff1]">
                    {currentLang === 'fa' ? 'هیچ موردی مطابق فیلتر یا جستجوی شما یافت نشد' : 'No metallurgical items matched your criteria'}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSelectedServiceFilter('all'); }}
                    className="text-xs text-[#3066be] hover:underline font-bold"
                  >
                    {currentLang === 'fa' ? 'پاک کردن فیلترها و نمایش همه' : 'Clear filters and show all items'}
                  </button>
                </div>
              )}

              {/* Table Bottom Metadata Bar */}
              <div className="p-4 px-6 bg-slate-50 dark:bg-[#242129] border-t border-slate-200 dark:border-[#b4c5e4]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-[#b4c5e4]/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-slate-700 dark:text-[#b4c5e4]">
                    {currentLang === 'fa' ? 'کلیه گریدها همراه با سرتیفیکیت رسمی متالورژی (MTC) و باسکول دیجیتال پارس امیر عرضه می‌گردند.' : 'All flat steel grades are delivered with authentic MTC test certificates.'}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-400 dark:text-[#b4c5e4]/60">
                  EN 10130 • EN 10346 • DIN 1623 • ASTM A653
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Interactive Brochure Flip & Details */}
        {selectedBrochure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/25 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto text-slate-900 dark:text-[#fbfff1]">
              <button
                type="button"
                onClick={() => setSelectedBrochure(null)}
                className="absolute top-5 end-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-[#b4c5e4] dark:hover:text-[#fbfff1] hover:bg-slate-100 dark:hover:bg-[#3c3744] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#3066be]/15 dark:bg-[#3066be]/25 border border-[#3066be]/30 dark:border-[#3066be]/40 flex items-center justify-center text-[#3066be] shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#f5a623] font-bold block">
                    {selectedBrochure.code} • {localizeDigits(selectedBrochure.version, currentLang)}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#fbfff1]">
                    {selectedBrochure.title[currentLang]}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-slate-700 dark:text-[#b4c5e4]/90 leading-relaxed p-3.5 bg-slate-50 dark:bg-[#242129] rounded-2xl border border-slate-200 dark:border-[#b4c5e4]/15">
                  {selectedBrochure.description[currentLang]}
                </p>

                {/* Highlights */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-[#fbfff1] mb-2">
                    {currentLang === 'fa' ? 'سرفصل‌ها و ویژگی‌های کلیدی این کاتالوگ:' : 'Key Highlights & Sections:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedBrochure.highlights[currentLang].map((h, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#242129] border border-slate-200 dark:border-[#b4c5e4]/10 text-slate-800 dark:text-[#fbfff1]/90">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span>{localizeDigits(h, currentLang)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table of Contents if available */}
                {selectedBrochure.tableOfContents && (
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-[#fbfff1] mb-2">
                      {currentLang === 'fa' ? 'فهرست مندرجات فنی:' : 'Table of Contents:'}
                    </h4>
                    <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-[#242129] rounded-xl border border-slate-200 dark:border-[#b4c5e4]/15">
                      {selectedBrochure.tableOfContents[currentLang].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-600 dark:text-[#b4c5e4]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3066be]" />
                          <span>{localizeDigits(item, currentLang)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#b4c5e4]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-[#b4c5e4]/80">
                  <HardDrive className="w-4 h-4 text-[#f5a623]" />
                  <span>
                    {currentLang === 'fa' ? 'حجم سند:' : 'Size:'} {localizeDigits(selectedBrochure.fileSize, currentLang)} ({localizeDigits(selectedBrochure.pagesCount, currentLang)} {currentLang === 'fa' ? 'صفحه' : 'Pages'})
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleDownload(selectedBrochure)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#3066be] hover:bg-[#3066be]/90 text-white !text-white transition-all shadow-md shadow-[#3066be]/20"
                  >
                    <Download className="w-4 h-4 text-white !text-white" />
                    <span className="text-white !text-white">{currentLang === 'fa' ? 'دانلود فایل کاتالوگ (PDF)' : currentLang === 'ar' ? 'تحميل الكتالوج (PDF)' : currentLang === 'tr' ? 'Kataloğu İndir (PDF)' : 'Download PDF Catalog'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBrochure(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#3c3744] dark:hover:bg-[#3c3744]/80 text-slate-700 dark:text-[#fbfff1] transition-colors"
                  >
                    {currentLang === 'fa' ? 'بستن' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {downloadSuccessToast && (
          <div className="fixed bottom-6 start-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold animate-in slide-in-from-bottom duration-200">
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {currentLang === 'fa' ? `دانلود «${downloadSuccessToast}» با موفقیت آغاز شد.` : `Download started for ${downloadSuccessToast}.`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
