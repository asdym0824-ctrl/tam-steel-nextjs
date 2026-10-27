'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SteelCalculatorModal } from './components/SteelCalculatorModal';
import { QuoteModal } from './components/QuoteModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './views/HomePage';
import { ServicesPage } from './views/ServicesPage';
import { ServiceDetailPage } from './views/ServiceDetailPage';
import { CatalogPage } from './views/CatalogPage';
import { ArticlesPage } from './views/ArticlesPage';
import { AboutPage } from './views/AboutPage';
import { servicesData } from './data/servicesData';

export default function App({ initialPage = 'home' }: { initialPage?: string }) {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<Language>('fa');
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');

  // Default theme is light mode as requested
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    try { const saved = localStorage.getItem('tam_theme'); if (saved === 'dark' || saved === 'light') setTheme(saved); } catch {}
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Synchronize Theme class on documentElement
  useEffect(() => {
    try {
      localStorage.setItem('tam_theme', theme);
    } catch (e) {}

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Synchronize Viewport Direction (Scrollbar Placement) & Content Direction
  // Requirement:
  // 1. In Persian ('fa'):
  //    - Scrollbar Thumb must be on the RIGHT side of the browser (html & body dir="ltr", direction: ltr)
  //    - Content maintains natural RTL reading flow & alignment (dir="rtl", direction: rtl)
  // 2. In English ('en'), Arabic ('ar'), and Turkish ('tr'):
  //    - Scrollbar Thumb must be on the LEFT side of the browser (html & body dir="rtl", direction: rtl)
  //    - Content flow:
  //      - Arabic ('ar'): natural RTL reading flow & alignment (dir="rtl")
  //      - English ('en') & Turkish ('tr'): natural LTR reading flow & alignment (dir="ltr")
  useEffect(() => {
    const isScrollbarRight = currentLang === 'fa';
    const viewportDir = isScrollbarRight ? 'ltr' : 'rtl';
    const contentDir = currentLang === 'fa' || currentLang === 'ar' ? 'rtl' : 'ltr';

    // 1. Set Viewport Direction (controls scrollbar placement across all browsers)
    document.documentElement.setAttribute('dir', viewportDir);
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('data-scroll-side', isScrollbarRight ? 'right' : 'left');
    document.documentElement.style.direction = viewportDir;

    document.body.setAttribute('dir', viewportDir);
    document.body.setAttribute('data-scroll-side', isScrollbarRight ? 'right' : 'left');
    document.body.style.direction = viewportDir;

    // 2. Set Content Direction on root
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('dir', contentDir);
      rootEl.setAttribute('lang', currentLang);
      rootEl.setAttribute('data-content-dir', contentDir);
      rootEl.style.direction = contentDir;
    }
  }, [currentLang]);

  useEffect(() => { setCurrentPage(initialPage); }, [initialPage]);

  const handleNavigate = (page: string) => {
    if (page === 'certificates' || page === 'licenses') {
      if (currentPage !== 'home') {
        router.push('/');
        setCurrentPage('home');
      }
      return;
    }
    if (currentPage !== page) {
      router.push(page === 'home' ? '/' : `/${page}`);
      setCurrentPage(page);
    }
  };

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedServiceForQuote(serviceName || '');
    setIsQuoteOpen(true);
  };

  const renderCurrentPage = () => {
    if (currentPage === 'home') {
      return (
        <HomePage
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenQuote={handleOpenQuote}
        />
      );
    }

    if (currentPage === 'services') {
      return (
        <ServicesPage
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenQuote={handleOpenQuote}
        />
      );
    }

    if (currentPage === 'catalog') {
      return (
        <CatalogPage
          currentLang={currentLang}
          onOpenQuote={handleOpenQuote}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />
      );
    }

    if (currentPage === 'articles') {
      return (
        <ArticlesPage
          currentLang={currentLang}
        />
      );
    }

    if (currentPage === 'about') {
      return (
        <AboutPage
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenQuote={() => handleOpenQuote()}
        />
      );
    }

    // Individual Service Pages for services
    const isServicePage =
      currentPage.startsWith('service-') ||
      servicesData.some((s) => s.id === currentPage);

    if (isServicePage) {
      const cleanServiceId = currentPage.startsWith('service-')
        ? currentPage.replace('service-', '')
        : currentPage;
      return (
        <ServiceDetailPage
          serviceId={cleanServiceId}
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onOpenQuote={handleOpenQuote}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onBack={() => handleNavigate('services')}
        />
      );
    }

    // Fallback to Home
    return (
      <HomePage
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenQuote={handleOpenQuote}
      />
    );
  };

  const isRtlContent = currentLang === 'fa' || currentLang === 'ar';
  const contentDir = isRtlContent ? 'rtl' : 'ltr';

  return (
    <div
      id="app-main-wrapper"
      dir={contentDir}
      data-content-dir={contentDir}
      className={`min-h-screen flex flex-col bg-[#242129] text-[#fbfff1] selection:bg-[#3066be] selection:text-[#fbfff1] ${
        isRtlContent ? 'font-vazir' : 'font-sans'
      }`}
      style={{ direction: contentDir }}
    >
      {/* Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenQuote={handleOpenQuote}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenContract={() => {
          if (currentPage !== 'home') {
            router.push('/');
        setCurrentPage('home');
          }
        }}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Steel Weight Calculator Modal */}
      <SteelCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        currentLang={currentLang}
      />

      {/* Fast Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        currentLang={currentLang}
        preselectedService={selectedServiceForQuote}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton currentLang={currentLang} />

      {/* Scroll to Top Button */}
      <ScrollToTop currentLang={currentLang} />
    </div>
  );
}
