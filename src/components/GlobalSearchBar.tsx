import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Layers,
  BookOpen,
  Newspaper,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { servicesData } from '../data/servicesData';
import { catalogItems, brochureCatalogs } from '../data/catalogData';
import { articlesData } from '../data/articlesData';
import { certificatesData } from '../data/certificatesData';
import { faqData } from '../data/faqData';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface GlobalSearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onNavigate: (page: string, extraId?: string) => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  isOpen,
  onClose,
  currentLang,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = translations[currentLang];

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onCloseRef.current();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results
  const matchedServices = q
    ? servicesData.filter(
        (s) =>
          s.title[currentLang].toLowerCase().includes(q) ||
          s.shortDesc[currentLang].toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      )
    : [];

  const matchedBrochures = q
    ? brochureCatalogs.filter(
        (b) =>
          b.title[currentLang].toLowerCase().includes(q) ||
          b.coverTitle[currentLang].toLowerCase().includes(q) ||
          b.code.toLowerCase().includes(q)
      )
    : [];

  const matchedCatalogs = q
    ? catalogItems
        .filter(
          (c) =>
            c.title[currentLang].toLowerCase().includes(q) ||
            c.code.toLowerCase().includes(q) ||
            c.grade.toLowerCase().includes(q)
        )
        .slice(0, 4)
    : [];

  const matchedArticles = q
    ? articlesData
        .filter(
          (a) =>
            a.title[currentLang].toLowerCase().includes(q) ||
            a.excerpt[currentLang].toLowerCase().includes(q)
        )
        .slice(0, 3)
    : [];

  const matchedCertificates = q
    ? certificatesData.filter(
        (c) =>
          c.title[currentLang].toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q)
      )
    : [];

  const matchedFaq = q
    ? faqData
        .filter((f) => f.question[currentLang].toLowerCase().includes(q))
        .slice(0, 2)
    : [];

  const hasResults =
    matchedServices.length > 0 ||
    matchedBrochures.length > 0 ||
    matchedCatalogs.length > 0 ||
    matchedArticles.length > 0 ||
    matchedCertificates.length > 0 ||
    matchedFaq.length > 0;

  const handleSelect = (page: string, extraId?: string) => {
    onNavigate(page, extraId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#2d2935] border border-[#b4c5e4]/25 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#b4c5e4]/15 bg-[#242129]">
          <Search className="w-5 h-5 text-[#3066be] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              currentLang === 'fa'
                ? 'جستجوی ورق (ST37, DC01)، کاتالوگ، خدمات، سرتیفیکیت یا مقالات...'
                : 'Search products, catalogs, services, certificates, articles...'
            }
            className="w-full bg-transparent border-0 px-3 py-1 text-sm text-[#fbfff1] placeholder-[#b4c5e4]/50 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-[#b4c5e4] hover:text-[#fbfff1] hover:bg-[#3c3744] transition-colors"
                title={currentLang === 'fa' ? 'پاک کردن متن' : 'Clear text'}
                aria-label={currentLang === 'fa' ? 'پاک کردن متن' : 'Clear text'}
              >
                <span className="text-xs font-medium px-1 text-[#b4c5e4]/80 hidden sm:inline">
                  {currentLang === 'fa' ? 'پاک کردن' : 'Clear'}
                </span>
              </button>
            )}

            <kbd className="hidden sm:inline-block text-[10px] font-mono text-[#b4c5e4]/70 bg-[#3c3744] px-1.5 py-0.5 rounded border border-[#b4c5e4]/20">
              ESC
            </kbd>

            {/* Exit/Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#3c3744]/80 hover:bg-[#ef4444]/20 text-[#b4c5e4] hover:text-[#ef4444] border border-[#b4c5e4]/20 hover:border-[#ef4444]/40 transition-all flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#ef4444]"
              aria-label={currentLang === 'fa' ? 'خروج از بخش جستجو' : 'Exit search'}
              title={currentLang === 'fa' ? 'خروج از بخش جستجو (Esc)' : 'Exit search (Esc)'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!q ? (
            <div className="text-center py-8 text-xs text-[#b4c5e4]/60 space-y-2">
              <Sparkles className="w-6 h-6 mx-auto text-[#f5a623]/70" />
              <p>
                {currentLang === 'fa'
                  ? 'نام محصول، گرید فولادی، کد کاتالوگ یا سوال فنی مورد نظر خود را تایپ کنید.'
                  : 'Type a steel grade (e.g. ST37, DC01), catalog code, or topic.'}
              </p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-xs text-[#b4c5e4]/60">
              {currentLang === 'fa'
                ? 'نتیجه‌ای برای عبارت جستجو شده یافت نشد.'
                : 'No results found.'}
            </div>
          ) : (
            <>
              {/* Services */}
              {matchedServices.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-[#b4c5e4] uppercase tracking-wider block mb-2">
                    {t.nav.services}
                  </span>
                  <div className="space-y-1">
                    {matchedServices.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => handleSelect('service-detail', s.id)}
                        className="w-full text-start p-2.5 rounded-xl hover:bg-[#3c3744] transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Layers className="w-4 h-4 text-[#3066be]" />
                          <div>
                            <span className="text-xs font-bold text-[#fbfff1] group-hover:text-[#3066be] transition-colors block">
                              {s.title[currentLang]}
                            </span>
                            <span className="text-[11px] text-[#b4c5e4]/70 line-clamp-1">
                              {s.shortDesc[currentLang]}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#b4c5e4]/50 group-hover:text-[#fbfff1] rtl:rotate-180" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brochures */}
              {matchedBrochures.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-[#b4c5e4] uppercase tracking-wider block mb-2">
                    {t.nav.catalog}
                  </span>
                  <div className="space-y-1">
                    {matchedBrochures.map((b) => (
                      <button
                        type="button"
                        key={b.id}
                        onClick={() => handleSelect('catalog')}
                        className="w-full text-start p-2.5 rounded-xl hover:bg-[#3c3744] transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-[#f5a623]" />
                          <div>
                            <span className="text-xs font-bold text-[#fbfff1] group-hover:text-[#f5a623] transition-colors block">
                              {b.title[currentLang]}
                            </span>
                            <span className="text-[11px] text-[#b4c5e4]/70">
                              {b.code} • {localizeDigits(b.fileSize, currentLang)}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#b4c5e4]/50 group-hover:text-[#fbfff1] rtl:rotate-180" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Metallurgical Catalog Items */}
              {matchedCatalogs.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-[#b4c5e4] uppercase tracking-wider block mb-2">
                    {currentLang === 'fa' ? 'گریدهای متالورژی' : 'Metallurgical Grades'}
                  </span>
                  <div className="space-y-1">
                    {matchedCatalogs.map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => handleSelect('catalog')}
                        className="w-full text-start p-2.5 rounded-xl hover:bg-[#3c3744] transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-xs font-bold text-[#fbfff1] block">
                            {c.title[currentLang]}
                          </span>
                          <span className="text-[11px] text-[#b4c5e4]/70">
                            {c.grade} • {c.originFactory}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#3066be] font-semibold">
                          {c.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {matchedArticles.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-[#b4c5e4] uppercase tracking-wider block mb-2">
                    {t.nav.articles}
                  </span>
                  <div className="space-y-1">
                    {matchedArticles.map((a) => (
                      <button
                        type="button"
                        key={a.id}
                        onClick={() => handleSelect('articles')}
                        className="w-full text-start p-2.5 rounded-xl hover:bg-[#3c3744] transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Newspaper className="w-4 h-4 text-emerald-400" />
                          <div>
                            <span className="text-xs font-bold text-[#fbfff1] block line-clamp-1">
                              {a.title[currentLang]}
                            </span>
                            <span className="text-[11px] text-[#b4c5e4]/70">
                              {localizeDigits(a.readTimeMin, currentLang)} {currentLang === 'fa' ? 'دقیقه مطالعه' : 'min read'}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#b4c5e4]/50 group-hover:text-[#fbfff1] rtl:rotate-180" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {matchedFaq.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-[#b4c5e4] uppercase tracking-wider block mb-2">
                    {currentLang === 'fa' ? 'سوالات متداول' : 'FAQ'}
                  </span>
                  <div className="space-y-1">
                    {matchedFaq.map((f) => (
                      <button
                        type="button"
                        key={f.id}
                        onClick={() => handleSelect('home')}
                        className="w-full text-start p-2.5 rounded-xl hover:bg-[#3c3744] transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-4 h-4 text-purple-400" />
                          <span className="text-xs text-[#fbfff1] block">
                            {f.question[currentLang]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
