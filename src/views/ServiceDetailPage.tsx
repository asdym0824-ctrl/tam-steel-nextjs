import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Clock,
  Package,
  CheckCircle2,
  Phone,
  ShieldCheck,
  FileText,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { servicesData } from '../data/servicesData';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface ServiceDetailPageProps {
  serviceId: string;
  currentLang: Language;
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onOpenQuote: (serviceTitle?: string) => void;
  onSelectService?: (id: string) => void;
  onOpenCalculator?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  currentLang,
  onBack,
  onNavigate,
  onOpenQuote,
  onSelectService,
  onOpenCalculator,
}) => {
  const t = translations[currentLang];
  const normalizedId = serviceId.startsWith('service-') ? serviceId.replace('service-', '') : serviceId;
  const service = servicesData.find((s) => s.id === normalizedId || s.id === serviceId) || servicesData[0];
  const [selectedSubCatId, setSelectedSubCatId] = useState<string>(
    service.subCategories[0]?.id || ''
  );

  const activeSubCat =
    service.subCategories.find((sc) => sc.id === selectedSubCatId) ||
    service.subCategories[0];

  return (
    <div className="min-h-screen bg-[#242129] py-10 sm:py-14 text-[#fbfff1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (onBack) onBack();
              else if (onNavigate) onNavigate('services');
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#b4c5e4] hover:text-[#fbfff1] transition-colors p-2 rounded-lg hover:bg-[#3c3744]"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{currentLang === 'fa' ? 'بازگشت به فهرست خدمات' : 'Back to Services'}</span>
          </button>

          <span className="text-xs font-mono text-[#b4c5e4]/70 bg-[#2d2935] px-3 py-1 rounded-full border border-[#b4c5e4]/15">
            {service.slug}
          </span>
        </div>

        {/* Hero Banner for Service */}
        <div className="bg-[#2d2935] border border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3066be]/20 border border-[#3066be]/40 text-[#b4c5e4] text-xs font-semibold">
                <Layers className="w-4 h-4 text-[#3066be]" />
                <span>{currentLang === 'fa' ? 'مشخصات فنی و استانداردهای متالورژی' : 'Metallurgical Specifications'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#fbfff1] tracking-tight">
                {service.title[currentLang]}
              </h1>

              <p className="text-xs sm:text-sm text-[#b4c5e4]/90 leading-relaxed font-light">
                {service.fullDesc[currentLang]}
              </p>

              {/* Lead time & Min order */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#b4c5e4]">
                <div className="flex items-center gap-2 bg-[#242129] px-3 py-1.5 rounded-xl border border-[#b4c5e4]/15">
                  <Clock className="w-4 h-4 text-[#3066be]" />
                  <span>
                    {currentLang === 'fa' ? 'زمان تحویل:' : 'Lead Time:'} {service.leadTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#242129] px-3 py-1.5 rounded-xl border border-[#b4c5e4]/15">
                  <Package className="w-4 h-4 text-[#f5a623]" />
                  <span>
                    {currentLang === 'fa' ? 'حداقل سفارش:' : 'Min Order:'} {service.minOrder}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action CTA Box with Service Image */}
            <div className="lg:col-span-4 bg-[#242129] border border-[#3066be]/30 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-44 w-full overflow-hidden bg-[#1c1922]">
                <img
                  src={service.image || '/images/steel_coils_factory.jpg'}
                  alt={service.title[currentLang]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242129] via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-3 end-3">
                  <span className="text-[11px] font-mono text-[#fbfff1] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                    {service.id}
                  </span>
                </div>
              </div>
              <div className="p-6 text-center space-y-4">
                <span className="text-xs text-[#b4c5e4]/80 block">
                  {currentLang === 'fa' ? 'استعلام قیمت روز و موجودی انبار' : 'Daily Pricing & Inventory'}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenQuote(service.title[currentLang])}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#3066be] hover:bg-[#3066be]/90 text-white !text-white shadow-lg shadow-[#3066be]/25 transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4 text-white !text-white" />
                  <span className="text-white !text-white">{currentLang === 'fa' ? 'ثبت استعلام این محصول' : 'Request Quote for this Product'}</span>
                </button>
                <span className="text-[11px] text-[#b4c5e4]/60 block">
                  {currentLang === 'fa' ? 'پاسخگویی کارشناسان حداکثر ظرف ۳۰ دقیقه' : 'Response within 30 minutes'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories & Grades Breakdown */}
        {service.subCategories.length > 0 && (
          <div className="bg-[#2d2935] border border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#fbfff1] flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#3066be]" />
                <span>{currentLang === 'fa' ? 'انواع گریدهای موجود و مشخصات فنی' : 'Available Subgrades & Specifications'}</span>
              </h2>
              <p className="text-xs text-[#b4c5e4]/70 mt-1">
                {currentLang === 'fa' ? 'برای مشاهده جزئیات ابعادی، تلرانس و پوشش روی هر گرید کلیک نمایید.' : 'Click each grade to inspect dimensions and coatings.'}
              </p>
            </div>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-2">
              {service.subCategories.map((sc) => (
                <button
                  type="button"
                  key={sc.id}
                  onClick={() => setSelectedSubCatId(sc.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeSubCat?.id === sc.id
                      ? 'bg-[#3066be] text-[#fbfff1] shadow-md shadow-[#3066be]/25 font-bold'
                      : 'bg-[#242129] text-[#b4c5e4] hover:text-[#fbfff1] border border-[#b4c5e4]/15'
                  }`}
                >
                  {sc.name[currentLang]}
                </button>
              ))}
            </div>

            {/* Active SubCat Details */}
            {activeSubCat && (
              <div className="p-5 bg-[#242129] rounded-2xl border border-[#b4c5e4]/15 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#fbfff1]">
                    {activeSubCat.name[currentLang]}
                  </h3>
                </div>
                <p className="text-xs text-[#b4c5e4]/85 leading-relaxed">
                  {activeSubCat.description[currentLang]}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {Object.entries(activeSubCat.specs).map(([key, val]) => {
                    if (!val) return null;
                    return (
                      <div key={key} className="p-3 bg-[#2d2935] rounded-xl border border-[#b4c5e4]/10">
                        <span className="text-[11px] text-[#b4c5e4]/70 block capitalize mb-0.5">
                          {key}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#fbfff1]">
                          {localizeDigits(val, currentLang)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Technical Specs & Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Specs Key-Value */}
          <div className="bg-[#2d2935] border border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#fbfff1] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{currentLang === 'fa' ? 'استانداردها و مشخصات عمومی' : 'Technical Specifications'}</span>
            </h3>

            <div className="space-y-2">
              {service.technicalSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#242129] rounded-xl border border-[#b4c5e4]/10 flex items-center justify-between text-xs"
                >
                  <span className="text-[#b4c5e4] font-medium">
                    {spec.key[currentLang]}
                  </span>
                  <span className="font-mono font-bold text-[#475569] dark:text-[#fbfff1]">
                    {localizeDigits(spec.value, currentLang)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications & Uses */}
          <div className="bg-[#2d2935] border border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#fbfff1] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#f5a623]" />
              <span>{currentLang === 'fa' ? 'کاربردهای صنعتی و مصرفی' : 'Industrial Applications'}</span>
            </h3>

            <div className="space-y-2">
              {service.applications[currentLang].map((app, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#242129] rounded-xl border border-[#b4c5e4]/10 flex items-center gap-2.5 text-xs text-[#fbfff1]/90"
                >
                  <span className="w-2 h-2 rounded-full bg-[#f5a623] shrink-0" />
                  <span>{localizeDigits(app, currentLang)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Services Navigation */}
        <div className="pt-6 border-t border-[#b4c5e4]/15">
          <span className="text-xs text-[#b4c5e4]/70 block mb-4">
            {currentLang === 'fa' ? 'سایر خدمات و مقاطع تام فولاد:' : 'Other Services:'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {servicesData
              .filter((s) => s.id !== service.id)
              .slice(0, 4)
              .map((other) => (
                <button
                  type="button"
                  key={other.id}
                  onClick={() => {
                    if (onSelectService) onSelectService(other.id);
                    else if (onNavigate) onNavigate(other.id);
                  }}
                  className="p-3 bg-[#2d2935] hover:bg-[#3c3744] border border-[#b4c5e4]/15 rounded-xl text-start transition-colors group"
                >
                  <span className="text-xs font-bold text-[#fbfff1] group-hover:text-[#3066be] block truncate">
                    {other.title[currentLang]}
                  </span>
                  <span className="text-[10px] text-[#b4c5e4]/60">
                    {other.leadTime}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
