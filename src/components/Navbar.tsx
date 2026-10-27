import React, { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import { GlobalSearchBar } from './GlobalSearchBar';
import {
  Menu, X, ChevronDown, Calculator,
  Layers, ShieldCheck, Palette, Scissors, Maximize2, Building2, Globe,
  Phone, Smartphone, Mail, MapPin, Droplets, Sparkles, Award,
  Sun, Moon, Search, Clock
} from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenCalculator?: () => void;
  onOpenQuote: (serviceName?: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentPage,
  onNavigate,
  onOpenCalculator,
  onOpenQuote,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const t = translations[currentLang];

  const serviceLinks = [
    { id: 'service-cold-rolled', label: t.servicesList.coldRolled, icon: Layers },
    { id: 'service-galvanized', label: t.servicesList.galvanized, icon: ShieldCheck },
    { id: 'service-hot-rolled', label: t.servicesList.hotRolled, icon: Layers },
    { id: 'service-colored', label: t.servicesList.colored, icon: Palette },
    { id: 'service-pickled', label: t.servicesList.pickled, icon: Droplets },
    { id: 'service-deep-drawing', label: t.servicesList.deepDrawing, icon: Sparkles },
    { id: 'service-stainless', label: t.servicesList.stainless, icon: Award },
    { id: 'service-steel-deck', label: t.servicesList.steelDeck, icon: Building2 },
    { id: 'service-slitting', label: t.servicesList.slitting, icon: Scissors },
    { id: 'service-shearing', label: t.servicesList.shearing, icon: Maximize2 },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#242129]/95 backdrop-blur border-b border-[#b4c5e4]/15 shadow-xl shadow-black/30">

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">

          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 sm:gap-2.5 text-right focus:outline-none group"
            >
              <div className="brand-logo-container h-8 sm:h-10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl overflow-hidden shadow-md shadow-black/40 group-hover:scale-105 transition-transform border border-[#b4c5e4]/25 bg-[#2a2632] flex items-center justify-center">
                <img
                  src="/images/tam_steel_logo.svg"
                  alt={t.brandName}
                  className="h-5 sm:h-7 w-auto object-contain drop-shadow"
                />
              </div>
              <span className="text-base sm:text-xl font-bold tracking-tight text-[#fbfff1] group-hover:text-[#b4c5e4] transition-colors">
                {t.brandName}
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#b4c5e4]">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`hover:text-[#fbfff1] transition-colors relative py-1 ${currentPage === 'home' ? 'text-[#475569] dark:text-[#fbfff1] font-bold' : ''}`}
            >
              {t.nav.home}
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3066be] rounded-full" />
              )}
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className={`flex items-center gap-1.5 hover:text-[#fbfff1] transition-colors py-1 ${currentPage.startsWith('service') ? 'text-[#475569] dark:text-[#fbfff1] font-bold' : ''}`}
              >
                <span>{t.nav.services}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#3066be]' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full start-0 mt-2 w-[540px] bg-[#2f2b36] border border-[#b4c5e4]/20 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs font-semibold text-[#b4c5e4]/80 px-2 py-1.5 border-b border-[#b4c5e4]/10 mb-2">
                    {t.nav.servicesMenu}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {serviceLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => {
                            onNavigate(item.id);
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-start ${isActive ? 'bg-[#3066be] text-[#fbfff1]' : 'text-[#b4c5e4] hover:bg-[#3c3744] hover:text-[#fbfff1]'}`}
                        >
                          <Icon className="w-4 h-4 text-[#3066be] shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#b4c5e4]/10">
                    <button
                      type="button"
                      onClick={() => { onNavigate('services'); setServicesDropdownOpen(false); }}
                      className="w-full text-center py-1.5 text-xs text-[#b4c5e4] hover:text-[#fbfff1] font-semibold"
                    >
                      {currentLang === 'fa' ? 'مشاهده کاتالوگ همه محصولات و خدمات ←' : 'View All Products & Services →'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('catalog')}
              className={`hover:text-[#fbfff1] transition-colors py-1 ${currentPage === 'catalog' ? 'text-[#475569] dark:text-[#fbfff1] font-bold' : ''}`}
            >
              {t.nav.catalog}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('articles')}
              className={`hover:text-[#fbfff1] transition-colors py-1 ${currentPage === 'articles' ? 'text-[#475569] dark:text-[#fbfff1] font-bold' : ''}`}
            >
              {t.nav.articles}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`hover:text-[#fbfff1] transition-colors py-1 ${currentPage === 'about' ? 'text-[#475569] dark:text-[#fbfff1] font-bold' : ''}`}
            >
              {t.nav.about}
            </button>
          </nav>

          {/* Zone 3: Actions & Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button (Magnifying Glass) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-9.5 lg:h-9.5 rounded-xl bg-[#3c3744] hover:bg-[#4d4757] border border-[#b4c5e4]/20 hover:border-[#3066be] text-[#fbfff1] flex items-center justify-center transition-all shadow-sm group focus:outline-none focus:ring-1 focus:ring-[#3066be]"
              aria-label={currentLang === 'fa' ? 'جستجوی هوشمند در سایت' : 'Search catalog and services'}
              title={currentLang === 'fa' ? 'جستجوی هوشمند (Ctrl+K)' : 'Search (Ctrl+K)'}
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b4c5e4] group-hover:text-[#fbfff1] group-hover:scale-110 transition-transform" />
            </button>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-9.5 lg:h-9.5 rounded-xl bg-[#3c3744] hover:bg-[#4d4757] border border-[#b4c5e4]/20 hover:border-[#3066be] text-[#fbfff1] flex items-center justify-center transition-all shadow-sm group focus:outline-none focus:ring-1 focus:ring-[#3066be]"
              aria-label={theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تیره'}
              title={
                currentLang === 'fa'
                  ? (theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تیره')
                  : currentLang === 'ar'
                  ? (theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن')
                  : currentLang === 'tr'
                  ? (theme === 'dark' ? 'Açık Mod' : 'Karanlık Mod')
                  : (theme === 'dark' ? 'Light Mode' : 'Dark Mode')
              }
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3066be] group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#3c3744] border border-[#b4c5e4]/20 text-[11px] sm:text-xs font-medium text-[#fbfff1] hover:border-[#3066be] transition-colors"
                aria-label="Change Language"
              >
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3066be]" />
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#b4c5e4]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full end-0 mt-2 w-36 bg-[#2f2b36] border border-[#b4c5e4]/20 rounded-xl shadow-2xl p-1.5 z-50">
                  {languages.map((lang) => (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${currentLang === lang.code ? 'bg-[#3066be] text-[#fbfff1] font-bold' : 'text-[#b4c5e4] hover:bg-[#3c3744] hover:text-[#fbfff1]'}`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action: Instant Quote (Hidden on mobile) */}
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="hidden sm:inline-flex items-center justify-center px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-[#fbfff1] bg-[#3066be] hover:bg-[#24529d] border border-[#3066be] rounded-xl transition-all whitespace-nowrap shadow-md shadow-[#3066be]/30 active:scale-95"
            >
              {t.nav.requestQuote}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-[#b4c5e4] hover:text-[#fbfff1] hover:bg-[#3c3744] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#242129] border-b border-[#b4c5e4]/15 px-4 pt-3 pb-6 space-y-4">
          {/* Mobile Global Search Bar & Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 h-10 px-3.5 rounded-xl bg-[#3c3744] hover:bg-[#4d4757] border border-[#b4c5e4]/20 text-[#b4c5e4] hover:text-[#fbfff1] flex items-center gap-2.5 text-xs transition-colors"
            >
              <Search className="w-4 h-4 text-[#3066be]" />
              <span className="text-xs text-[#b4c5e4]/80">
                {currentLang === 'fa' ? 'جستجوی هوشمند در سایت...' : 'Search products & services...'}
              </span>
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="h-10 px-3 rounded-xl bg-[#3c3744] hover:bg-[#4d4757] border border-[#b4c5e4]/20 text-[#fbfff1] flex items-center gap-1.5 text-xs shrink-0 transition-colors"
              aria-label={theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تیره'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-medium">{currentLang === 'fa' ? 'روشن' : 'Light'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#3066be]" />
                  <span className="text-[11px] font-medium">{currentLang === 'fa' ? 'تیره' : 'Dark'}</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Direct Contact Quick Bar */}
          <div className="p-3 bg-[#3c3744] border border-[#b4c5e4]/20 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#b4c5e4]/15">
              <span className="text-[#b4c5e4] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3066be]" />
                <span>موقعیت:</span>
              </span>
              <span className="font-semibold text-[#fbfff1]">{t.footer.address}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-[#b4c5e4]/15">
              <span className="text-[#b4c5e4] flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#3066be]" />
                <span>موبایل:</span>
              </span>
              <a href="tel:09122444252" dir="ltr" className="font-mono font-bold text-[#fbfff1]">
                09122444252
              </a>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-[#b4c5e4]/15">
              <span className="text-[#b4c5e4] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#3066be]" />
                <span>تلفن ثابت:</span>
              </span>
              <a href="tel:02177166309" dir="ltr" className="font-mono font-bold text-[#fbfff1]">
                021_77166309
              </a>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-[#b4c5e4]/15">
              <span className="text-[#b4c5e4] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#3066be]" />
                <span>ایمیل:</span>
              </span>
              <a href="mailto:tamfoulad.ir@info" className="font-mono text-[#fbfff1]">
                tamfoulad.ir@info
              </a>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#b4c5e4] flex items-center gap-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#3066be]" />
                <span>{currentLang === 'fa' ? 'ساعات کاری:' : 'Working Hours:'}</span>
              </span>
              <span className="text-[11px] font-medium text-[#fbfff1] text-end">
                {t.footer.workingHours}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#b4c5e4]/10">
            <button
              type="button"
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-right text-xs font-medium ${currentPage === 'home' ? 'bg-[#3066be] text-[#fbfff1]' : 'text-[#b4c5e4] hover:bg-[#3c3744]'}`}
            >
              {t.nav.home}
            </button>
            <button
              type="button"
              onClick={() => { onNavigate('catalog'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-right text-xs font-medium ${currentPage === 'catalog' ? 'bg-[#3066be] text-[#fbfff1]' : 'text-[#b4c5e4] hover:bg-[#3c3744]'}`}
            >
              {t.nav.catalog}
            </button>
            <button
              type="button"
              onClick={() => { onNavigate('articles'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-right text-xs font-medium ${currentPage === 'articles' ? 'bg-[#3066be] text-[#fbfff1]' : 'text-[#b4c5e4] hover:bg-[#3c3744]'}`}
            >
              {t.nav.articles}
            </button>
            <button
              type="button"
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-right text-xs font-medium ${currentPage === 'about' ? 'bg-[#3066be] text-[#fbfff1]' : 'text-[#b4c5e4] hover:bg-[#3c3744]'}`}
            >
              {t.nav.about}
            </button>
          </div>

          <div>
            <div className="text-xs font-semibold text-[#b4c5e4]/70 px-1 py-1 mb-2">
              {t.nav.servicesMenu}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {serviceLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl text-right text-xs font-medium text-[#b4c5e4] hover:bg-[#3c3744] hover:text-[#fbfff1]"
                  >
                    <Icon className="w-4 h-4 text-[#3066be] shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-[#b4c5e4]/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => { onOpenCalculator?.(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-xs text-[#b4c5e4] hover:text-[#fbfff1] py-2"
            >
              <Calculator className="w-4 h-4 text-[#3066be]" />
              <span>{t.nav.calculator}</span>
            </button>

            <button
              type="button"
              onClick={() => { onOpenQuote(); setMobileMenuOpen(false); }}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#fbfff1] bg-[#3066be] hover:bg-[#24529d] rounded-xl transition-all"
            >
              {t.nav.requestQuote}
            </button>
          </div>
        </div>
      )}

      {/* Global Search Bar Modal */}
      <GlobalSearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currentLang={currentLang}
        onNavigate={(page) => {
          onNavigate(page);
          setIsSearchOpen(false);
          setMobileMenuOpen(false);
        }}
      />
    </header>
  );
};
