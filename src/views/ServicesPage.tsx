import React, { useState } from 'react';
import {
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Package,
  ArrowRight,
  Phone,
  Shield,
  Scissors,
  Flame,
  Sparkles,
  Building2,
  Palette,
  Droplets,
  Cpu
} from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { servicesData } from '../data/servicesData';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface ServicesPageProps {
  currentLang: Language;
  onNavigate?: (page: string) => void;
  onSelectService?: (serviceId: string) => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  currentLang,
  onNavigate,
  onSelectService,
  onOpenQuote,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'coils' | 'processing' | 'structural'>('all');

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'cold-rolled': return Layers;
      case 'galvanized': return Shield;
      case 'slitting': return Scissors;
      case 'hot-rolled': return Flame;
      case 'stainless': return Sparkles;
      case 'steel-deck': return Building2;
      case 'colored': return Palette;
      case 'pickled': return Droplets;
      case 'deep-drawing': return Cpu;
      case 'shearing': return Scissors;
      default: return Layers;
    }
  };

  const handleSelectService = (id: string) => {
    if (onSelectService) {
      onSelectService(id);
    } else if (onNavigate) {
      onNavigate(id);
    }
  };

  const filteredServices = servicesData.filter((service) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      service.title[currentLang].toLowerCase().includes(q) ||
      service.shortDesc[currentLang].toLowerCase().includes(q) ||
      service.subCategories.some((sc) => sc.name[currentLang].toLowerCase().includes(q));

    let matchesCat = true;
    if (filterCategory === 'coils') {
      matchesCat = ['cold-rolled', 'galvanized', 'hot-rolled', 'colored', 'pickled', 'stainless'].includes(service.id);
    } else if (filterCategory === 'processing') {
      matchesCat = ['slitting', 'shearing'].includes(service.id);
    } else if (filterCategory === 'structural') {
      matchesCat = ['steel-deck', 'hot-rolled-colored'].includes(service.id);
    }

    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#242129] py-10 sm:py-14 text-slate-900 dark:text-[#fbfff1] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3066be]/15 dark:bg-[#3066be]/20 border border-[#3066be]/30 text-[#3066be] dark:text-[#b4c5e4] text-xs font-semibold mb-3">
            <Layers className="w-4 h-4 text-[#3066be]" />
            <span>{currentLang === 'fa' ? 'محصولات و مقاطع فولادی' : currentLang === 'ar' ? 'المنتجات وقطاعات الصلب' : currentLang === 'tr' ? 'Ürünler ve Çelik Profiller' : 'Products & Steel Profiles'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#fbfff1] tracking-tight">
            {currentLang === 'fa' ? 'خدمات و فرآوری مقاطع فولادی' : currentLang === 'ar' ? 'خدمات ومعالجة قطاعات الصلب' : currentLang === 'tr' ? 'Hizmetler ve Çelik İşleme' : 'Services & Steel Processing'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#b4c5e4]/80 mt-2 leading-relaxed">
            {currentLang === 'fa' ? 'نواربری، شیت‌کن، برشکاری طولی، فرمینگ و تامین انواع ورق‌های صنعتی' : currentLang === 'ar' ? 'تقطيع طولي وعرضي، تشكيل وتوريد مختلف ألواح الصلب الصناعية' : currentLang === 'tr' ? 'Rulo dilme, boy kesme, form verme ve endüstriyel sac tedariği' : 'Slitting, cut-to-length shearing, roll forming, and specialized flat steel supply'}
          </p>

          {/* Search & Category Filter */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#b4c5e4] absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'fa' ? 'جستجو در خدمات و مقاطع...' : 'Search services & products...'}
                className="w-full bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-xl ps-9 pe-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-[#fbfff1] placeholder-slate-400 dark:placeholder-[#b4c5e4]/50 focus:outline-none focus:border-[#3066be]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-center">
              {[
                { id: 'all', label: currentLang === 'fa' ? 'همه خدمات' : 'All' },
                { id: 'coils', label: currentLang === 'fa' ? 'کویل و ورق' : 'Coils & Sheets' },
                { id: 'processing', label: currentLang === 'fa' ? 'نواربری و برش' : 'Slitting & CTL' },
                { id: 'structural', label: currentLang === 'fa' ? 'سازه و عرشه' : 'Deck & Profiles' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setFilterCategory(c.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filterCategory === c.id
                      ? 'bg-[#3066be] text-white shadow-md shadow-[#3066be]/30'
                      : 'bg-slate-100 dark:bg-[#2d2935] text-slate-600 dark:text-[#b4c5e4] hover:text-slate-900 dark:hover:text-[#fbfff1]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = getServiceIcon(service.id);
            return (
              <div
                key={service.id}
                onClick={() => handleSelectService(service.id)}
                className="corporate-service-card bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-3xl overflow-hidden hover:border-[#3066be]/60 transition-all cursor-pointer group flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  {/* Service Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900 dark:bg-[#1c1922]">
                    <img
                      src={service.image || '/images/steel_coils_factory.jpg'}
                      alt={service.title[currentLang]}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/steel_coils_factory.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Floating Badges on Image */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                      <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#3066be] transition-all">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white !text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-md">
                        {localizeDigits(index + 1 < 10 ? `0${index + 1}` : index + 1, currentLang)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 pt-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-[#fbfff1] group-hover:text-[#3066be] transition-colors mb-2">
                      {service.title[currentLang]}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-[#b4c5e4]/80 leading-relaxed mb-4 line-clamp-2">
                      {service.shortDesc[currentLang]}
                    </p>

                    {/* Bullet Features */}
                    <div className="space-y-1.5 mb-5">
                      {service.features[currentLang].slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-[#fbfff1]/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                          <span className="line-clamp-1">{localizeDigits(f, currentLang)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-200 dark:border-[#b4c5e4]/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#b4c5e4]/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#3066be]" />
                        <span>{service.leadTime}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-[#f5a623]" />
                        <span>{service.minOrder}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-[#b4c5e4]">
                        {localizeDigits(service.subCategories.length, currentLang)} {currentLang === 'fa' ? 'گرید و زیرمجموعه' : 'subcategories'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3066be] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        <span>{currentLang === 'fa' ? 'مشاهده جزئیات' : currentLang === 'ar' ? 'عرض التفاصيل' : currentLang === 'tr' ? 'Detayları İncele' : 'View Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#475569] dark:text-[#fbfff1]">
              {currentLang === 'fa' ? 'نیاز به مشاوره فنی یا سفارش مقاطع خاص متالورژی دارید؟' : 'Need Specialized Engineering Advice?'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#b4c5e4]/80 mt-1">
              {currentLang === 'fa' ? 'مهندسان متالورژی تام فولاد به صورت رایگان شما را در انتخاب گرید و تلرانس راهنمایی می‌کنند.' : 'Our metallurgists assist you in picking the right grades and tolerances.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#3066be] hover:bg-[#3066be]/90 text-white !text-white shadow-lg shadow-[#3066be]/20 transition-all shrink-0 hover:scale-105"
          >
            <Phone className="w-4 h-4 text-white !text-white" />
            <span className="text-white !text-white">{t.nav.requestQuote}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
