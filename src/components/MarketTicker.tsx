import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  Zap,
  Coins,
  DollarSign,
  Layers,
} from 'lucide-react';
import { initialMarketRates } from '../data/marketRates';
import { Language, MarketRate } from '../types';
import { formatNumberByLang, localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface MarketTickerProps {
  currentLang: Language;
  onOpenQuote?: () => void;
  onOpenCalculator?: () => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({
  currentLang,
  onOpenQuote,
}) => {
  const [rates, setRates] = useState(initialMarketRates);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/content/rates', { signal: controller.signal }).then(r => { if (!r.ok) throw new Error('rates'); return r.json(); }).then(data => setRates(data.items)).catch(() => {});
    return () => controller.abort();
  }, []);
  const t = translations[currentLang];
  const isRtl = currentLang === 'fa' || currentLang === 'ar';

  const formatRate = (rate: MarketRate) => {
    const formattedPrice = formatNumberByLang(rate.priceIrr, currentLang);
    return `${formattedPrice} ${rate.unit[currentLang]}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'precious_metals':
        return <Coins className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'currency':
        return <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-[#3066be] dark:text-[#60a5fa] shrink-0" />;
    }
  };

  // Duplicate items 2 times for an exact mathematical 50% seamless loop
  const tickerItems = [...rates, ...rates];

  return (
    <div
      id="market-ticker-container"
      className="market-ticker-wrapper w-full bg-white dark:bg-[#18161e] border-y border-slate-200 dark:border-[#b4c5e4]/15 text-xs text-slate-800 dark:text-[#fbfff1] overflow-hidden select-none relative shadow-xs transition-colors duration-200"
    >
      {/* Inline Keyframes & Animation to guarantee 100% reliability */}
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee-track {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          width: max-content !important;
          animation: marquee-scroll 42s linear infinite !important;
          will-change: transform !important;
        }
        .animate-marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Top micro specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3066be]/40 dark:via-[#3066be]/60 to-transparent pointer-events-none" />

      {/* Main responsive container */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 relative">

        {/* MOBILE TOP SUB-BAR (< md) */}
        <div className="flex md:hidden items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-200/90 dark:border-white/10">
          {/* Mobile Live Badge */}
          <div className="flex items-center gap-1.5 bg-[#1e1b26] text-white px-2.5 py-1 rounded-lg border border-[#b4c5e4]/20 shadow-2xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-[11px] text-white !text-white leading-tight">
              {currentLang === 'fa' ? 'تابلو زنده قیمت طلا، ارز و آهن‌آلات' : currentLang === 'ar' ? 'لوحة أسعار الذهب، العملات والحديد' : currentLang === 'tr' ? 'Canlı Altın, Döviz ve Çelik' : 'Live Market Board'}
            </span>
            <span className="text-[9px] font-bold font-mono text-[#93c5fd] bg-[#3066be]/30 px-1.5 py-0.5 rounded border border-[#3066be]/40 shrink-0">
              {currentLang === 'fa' ? 'نرخ مرجع' : 'Reference'}
            </span>
          </div>

          {/* Mobile Quick Action - Quote Button */}
          {onOpenQuote && (
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-white !text-white bg-[#3066be] hover:bg-[#24529d] px-2.5 py-1 rounded-lg transition-colors shadow-xs active:scale-95"
            >
              <Zap className="w-3 h-3 text-amber-300" />
              <span className="text-white !text-white">{currentLang === 'fa' ? 'استعلام' : 'Quote'}</span>
            </button>
          )}
        </div>

        {/* MAIN TICKER ROW */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 relative">

          {/* Desktop Live Badge (>= md) - Dark container with crisp white text as requested */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0 z-20 bg-[#1e1b26] px-3.5 py-1.5 rounded-xl border border-[#b4c5e4]/25 shadow-sm">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-white !text-white leading-tight flex items-center gap-2">
                <span className="text-white !text-white" style={{ color: '#ffffff' }}>
                  {t.tickerSection?.title || (currentLang === 'fa' ? 'تابلوی زنده قیمت طلا، ارز و آهن‌آلات' : 'Live Market Board')}
                </span>
                <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-[#93c5fd] bg-[#3066be]/30 px-1.5 py-0.5 rounded border border-[#3066be]/40">
                  {currentLang === 'fa' ? 'بورس کالا و طلا' : 'Live Rates'}
                </span>
              </span>
            </div>
          </div>

          {/* Marquee ticker container with Edge gradient fade masks */}
          <div className="relative flex-1 overflow-hidden min-h-[42px] sm:min-h-[46px] mx-2 sm:mx-4 h-full flex items-center min-w-0 w-full">
            {/* Edge gradient fade masks */}
            <div className="ticker-fade-right pointer-events-none absolute inset-y-0 right-0 w-4 sm:w-10 bg-gradient-to-l from-white dark:from-[#18161e] to-transparent z-10" />
            <div className="ticker-fade-left pointer-events-none absolute inset-y-0 left-0 w-4 sm:w-10 bg-gradient-to-r from-white dark:from-[#18161e] to-transparent z-10" />

            {/* Continuous Infinite Ticker Track with gap */}
            <div
              dir="ltr"
              className="animate-marquee-track items-center flex shrink-0 will-change-transform py-1 gap-2.5 sm:gap-3"
            >
              {tickerItems.map((rate, idx) => {
                const isPositive = rate.change24h > 0;
                const isNegative = rate.change24h < 0;

                return (
                  <div
                    key={`${rate.id}-${idx}`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                    onClick={onOpenQuote}
                    className="market-rate-card group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#231f2b] hover:bg-slate-50 dark:hover:bg-[#2e2938] border border-slate-200 dark:border-[#b4c5e4]/15 hover:border-[#3066be] dark:hover:border-[#3066be]/70 transition-all duration-200 cursor-pointer shrink-0 shadow-xs hover:shadow-sm"
                    title={`${rate.name[currentLang]}: ${formatRate(rate)} (${currentLang === 'fa' ? 'کلیک جهت استعلام سریع' : 'Click to inquire'})`}
                  >
                    {/* Category Icon & Symbol badge */}
                    <div className="flex items-center gap-1 shrink-0">
                      {getCategoryIcon(rate.category)}
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                          rate.category === 'precious_metals'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700/50'
                            : rate.category === 'currency'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50'
                            : 'bg-slate-100 dark:bg-[#1a1722] text-slate-700 dark:text-[#b4c5e4] border-slate-200 dark:border-[#b4c5e4]/20'
                        }`}
                      >
                        {rate.symbol}
                      </span>
                    </div>

                    {/* Rate Name - Dark visible in Light Mode, Bright in Dark Mode */}
                    <span className="rate-name font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#3066be] dark:group-hover:text-blue-300 transition-colors whitespace-nowrap shrink-0">
                      {rate.name[currentLang]}
                    </span>

                    {/* Price - Dark bold font-mono in Light Mode, Bright in Dark Mode */}
                    <span className="rate-price inline-flex items-center font-mono font-black text-xs text-slate-900 dark:text-white group-hover:text-[#1e40af] dark:group-hover:text-[#93c5fd] transition-colors whitespace-nowrap px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200/90 dark:border-white/10 shrink-0">
                      {formatRate(rate)}
                    </span>

                    {/* Change % badge */}
                    <span
                      className={`rate-change inline-flex items-center gap-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                        isPositive
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-600/40'
                          : isNegative
                          ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-600/40'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-2.5 h-2.5 shrink-0" />
                      ) : isNegative ? (
                        <TrendingDown className="w-2.5 h-2.5 shrink-0" />
                      ) : (
                        <Minus className="w-2.5 h-2.5 shrink-0" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {localizeDigits(rate.change24h, currentLang)}%
                      </span>
                    </span>

                    {/* Hover arrow hint */}
                    <ArrowUpRight className="w-3 h-3 text-[#3066be] dark:text-[#93c5fd] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Quick Action: Quote Button Only (Calculator button removed as requested) */}
          <div className="hidden md:flex items-center gap-2 shrink-0 z-20">
            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white !text-white bg-gradient-to-r from-[#3066be] to-[#24529d] hover:brightness-110 px-3.5 py-1.5 rounded-xl transition-all shrink-0 shadow-md shadow-[#3066be]/25 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-white !text-white" style={{ color: '#ffffff' }}>
                  {t.nav.requestQuote}
                </span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
