import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  FileCheck2,
  CheckCircle,
  ExternalLink,
  X,
  FileText,
  Calendar,
  Building
} from 'lucide-react';
import { Language, CertificateItem } from '../types';
import { certificatesData } from '../data/certificatesData';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface LicensesSectionProps {
  currentLang: Language;
}

export const LicensesSection: React.FC<LicensesSectionProps> = ({ currentLang }) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const t = translations[currentLang];

  return (
    <section data-section="licenses" className="py-16 bg-white dark:bg-[#1f1c24] border-t border-b border-slate-200 dark:border-[#b4c5e4]/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3066be]/20 border border-[#3066be]/40 text-[#b4c5e4] text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-[#3066be]" />
            <span>{currentLang === 'fa' ? 'اعتبارنامه‌ها و مجوزهای قانونی' : currentLang === 'ar' ? 'التراخيص والشهادات القانونية' : currentLang === 'tr' ? 'Yasal Yetki ve Sertifikalar' : 'Official Accreditations & Licenses'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-[#fbfff1] tracking-tight">
            {currentLang === 'fa' ? 'گواهینامه‌های رسمی و استانداردهای کیفی' : currentLang === 'ar' ? 'الشهادات الرسمية ومعايير الجودة' : currentLang === 'tr' ? 'Resmi Sertifikalar ve Kalite Standartları' : 'Official Certificates & Quality Standards'}
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#b4c5e4]/80 mt-2 leading-relaxed">
            {currentLang === 'fa' ? 'صنایع تام فولاد دارای پروانه رسمی کسب از اتحادیه آهن و فولاد و گواهینامه ISO 9001:2015 است.' : currentLang === 'ar' ? 'شركة تام للصلب حاصلة على ترخيص تجاري رسمي وشهادة ISO 9001:2015.' : currentLang === 'tr' ? 'Tam Çelik, resmi ticaret lisansına ve ISO 9001:2015 sertifikasına sahiptir.' : 'Tam Steel holds official industry trade licenses and ISO 9001:2015 certification.'}
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="license-cert-card bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-2xl overflow-hidden hover:border-[#3066be] transition-all cursor-pointer group flex flex-col justify-between hover:shadow-xl hover:shadow-[#3066be]/15 relative shadow-sm"
            >
              {/* Certificate Document Photo Preview */}
              <div className="relative h-48 overflow-hidden bg-white dark:bg-[#201c27] border-b border-slate-200 dark:border-[#b4c5e4]/15">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title[currentLang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-800">
                    <Award className="w-12 h-12 text-[#3066be]" />
                  </div>
                )}

                {/* Subtle vignette overlay - only in dark mode */}
                <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Floating Top Badge */}
                <div className="absolute top-3 end-3">
                  <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-white bg-white/95 dark:bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/20 shadow-sm">
                    {cert.code}
                  </span>
                </div>

                {/* Hover inspection pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/20 dark:bg-slate-900/40 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3066be] text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{currentLang === 'fa' ? 'مشاهده اصل سند' : 'View Document'}</span>
                  </span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="license-cert-body p-5 flex-1 flex flex-col justify-between bg-white dark:bg-[#2d2935]">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-[#3066be]/15 text-slate-500 dark:text-[#3066be] flex items-center justify-center shrink-0 border border-slate-200 dark:border-transparent">
                      <Award className="w-3.5 h-3.5 text-slate-500 dark:text-[#3066be]" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-[#3066be] line-clamp-1">
                      {cert.badge[currentLang]}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1f2937] dark:text-[#fbfff1] group-hover:text-[#3066be] transition-colors mb-2 line-clamp-2">
                    {cert.title[currentLang]}
                  </h3>

                  <p className="text-xs text-[#4b5563] dark:text-[#b4c5e4]/70 line-clamp-2 leading-relaxed mb-4">
                    {cert.description[currentLang]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-[#b4c5e4]/10 flex items-center justify-between text-xs">
                  <span className="cert-registrar text-[11px] text-[#4b5563] dark:text-[#b4c5e4]/60 truncate max-w-[170px] font-medium">
                    {cert.registrar}
                  </span>
                  <span className="cert-link text-[11px] font-bold text-[#2563eb] dark:text-[#3066be] hover:text-[#1d4ed8] dark:hover:text-[#60a5fa] flex items-center gap-1 group-hover:underline">
                    <span>{currentLang === 'fa' ? 'مشاهده مشخصات' : 'Details'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div
          className="license-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="license-modal-content bg-white dark:bg-[#201c27] border border-slate-200 dark:border-[#b4c5e4]/25 rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
          >
            {/* Top Modal Header Bar with Status Badges and Close Button */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-[#b4c5e4]/15">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f8fafc] dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentLang === 'fa' ? 'سند رسمی معتبر و فعال' : 'Officially Verified & Active'}</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#4b5563] dark:text-[#b4c5e4]/70 bg-[#f8fafc] dark:bg-[#2d2935] px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10 shadow-xs">
                  {selectedCert.code}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="license-modal-close w-9 h-9 rounded-full flex items-center justify-center text-[#1f2937] hover:text-black bg-[#f8fafc] hover:bg-slate-200 border border-slate-200 dark:text-[#b4c5e4] dark:hover:text-[#fbfff1] dark:bg-[#2d2935] dark:hover:bg-[#3c3744] dark:border-transparent transition-all shadow-xs"
                aria-label={currentLang === 'fa' ? 'بستن' : 'Close'}
              >
                <X className="w-4 h-4 text-[#1f2937] dark:text-[#b4c5e4]" />
              </button>
            </div>

            {/* Main Content: 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Left Column (5 cols): Certificate Document Visual Frame */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#b4c5e4]/20 bg-[#f8fafc] dark:bg-[#16141c] p-2.5 shadow-sm group">
                  {selectedCert.image ? (
                    <div className="relative rounded-xl overflow-hidden bg-white dark:bg-[#1f1c24] border border-slate-200/80 dark:border-transparent shadow-xs">
                      <img
                        src={selectedCert.image}
                        alt={selectedCert.title[currentLang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto max-h-[360px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {/* Subtle glossy sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center bg-white dark:bg-[#1f1c24] rounded-xl border border-slate-200">
                      <Award className="w-16 h-16 text-slate-400" />
                    </div>
                  )}

                  {/* Watermark / Seal Banner */}
                  <div className="mt-2.5 px-3 py-2 rounded-xl bg-[#f8fafc] dark:bg-[#25212d] border border-slate-200 dark:border-[#b4c5e4]/15 flex items-center justify-between text-xs shadow-xs">
                    <div className="flex items-center gap-1.5 text-[#1f2937] dark:text-[#b4c5e4]">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-[11px] text-[#1f2937] dark:text-[#b4c5e4]">{currentLang === 'fa' ? 'گواهی اصالت سند' : 'Document Authenticity'}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#4b5563] dark:text-[#b4c5e4]/50">ISO 9001 / Guild Verified</span>
                  </div>
                </div>

                {/* Direct Action Badge / Quick Link */}
                <div className="p-3 rounded-xl bg-[#f8fafc] dark:bg-[#3066be]/10 border border-slate-200 dark:border-[#3066be]/20 text-xs flex items-center gap-2 text-[#4b5563] dark:text-[#b4c5e4] shadow-xs">
                  <FileCheck2 className="w-4 h-4 text-[#3066be] shrink-0" />
                  <span className="text-[11px] leading-relaxed text-[#4b5563] dark:text-[#b4c5e4]">
                    {currentLang === 'fa'
                      ? 'قابل استعلام از سامانه رسمی اتحادیه و مراجع ملی استاندارد'
                      : 'Verifiable via official trade guild and national accreditation portals'}
                  </span>
                </div>
              </div>

              {/* Right Column (7 cols): Structured Meta & Compliance Highlights */}
              <div className="lg:col-span-7 flex flex-col gap-4">

                {/* Title & Badge */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#f8fafc] text-[#3066be] border border-[#3066be]/30 dark:bg-[#3066be]/20 dark:border-transparent shadow-xs">
                      <Award className="w-3 h-3" />
                      <span>{selectedCert.badge[currentLang]}</span>
                    </span>
                    <span className="text-xs text-slate-400 dark:text-[#b4c5e4]/50">•</span>
                    <span className="text-xs font-medium text-[#4b5563] dark:text-[#b4c5e4]/70">
                      {selectedCert.registrar}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#1f2937] dark:text-[#fbfff1] leading-snug">
                    {selectedCert.title[currentLang]}
                  </h3>
                  <p className="text-xs text-[#4b5563] dark:text-[#b4c5e4]/80 mt-1.5 leading-relaxed">
                    {selectedCert.description[currentLang]}
                  </p>
                </div>

                {/* 3 Sleek Key-Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#f8fafc] dark:bg-[#25212d] border border-slate-200 dark:border-[#b4c5e4]/15 shadow-xs">
                    <div className="flex items-center gap-1.5 text-[#4b5563] dark:text-[#b4c5e4]/60 mb-1 text-[11px]">
                      <Building className="w-3.5 h-3.5 text-[#3066be]" />
                      <span>{currentLang === 'fa' ? 'مرجع صادرکننده' : 'Authority'}</span>
                    </div>
                    <span className="font-bold text-[#1f2937] dark:text-[#fbfff1] text-xs line-clamp-1 block">
                      {selectedCert.registrar}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f8fafc] dark:bg-[#25212d] border border-slate-200 dark:border-[#b4c5e4]/15 shadow-xs">
                    <div className="flex items-center gap-1.5 text-[#4b5563] dark:text-[#b4c5e4]/60 mb-1 text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-[#3066be]" />
                      <span>{currentLang === 'fa' ? 'شماره پروانه/ثبت' : 'License No'}</span>
                    </div>
                    <span className="font-mono font-bold text-[#1f2937] dark:text-[#fbfff1] text-xs block">
                      {localizeDigits(selectedCert.certNumber, currentLang)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f8fafc] dark:bg-[#25212d] border border-slate-200 dark:border-[#b4c5e4]/15 shadow-xs">
                    <div className="flex items-center gap-1.5 text-[#4b5563] dark:text-[#b4c5e4]/60 mb-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-[#3066be]" />
                      <span>{currentLang === 'fa' ? 'تاریخ و اعتبار' : 'Validity'}</span>
                    </div>
                    <span className="font-mono font-bold text-[#1f2937] dark:text-[#fbfff1] text-xs block">
                      {localizeDigits(selectedCert.issueDate, currentLang)}
                    </span>
                  </div>
                </div>

                {/* Scope Callout Card */}
                <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#25212d] border-s-4 border-s-[#3066be] border-t border-b border-e border-slate-200 dark:border-t-[#b4c5e4]/15 dark:border-b-[#b4c5e4]/15 dark:border-e-[#b4c5e4]/15 shadow-xs">
                  <span className="text-[11px] font-bold text-[#4b5563] dark:text-[#b4c5e4]/70 block mb-1">
                    {currentLang === 'fa' ? 'دامنه کاربرد و شمول استانداردی:' : 'Scope of Accreditation:'}
                  </span>
                  <p className="text-xs text-[#1f2937] dark:text-[#fbfff1]/90 leading-relaxed font-medium">
                    {selectedCert.scope[currentLang]}
                  </p>
                </div>

                {/* Compliance Checklist Grid */}
                <div className="p-3.5 rounded-xl bg-[#f8fafc] dark:bg-[#25212d] border border-slate-200 dark:border-[#b4c5e4]/15 shadow-xs">
                  <span className="text-xs font-bold text-[#1f2937] dark:text-[#fbfff1] block mb-2.5">
                    {currentLang === 'fa' ? 'شاخص‌های کلیدی انطباق و الزامات کیفی:' : 'Key Compliance Points:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedCert.highlights[currentLang].map((h, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-[#1f1c27] border border-slate-200 dark:border-white/5 text-[#1f2937] dark:text-[#fbfff1]/90 shadow-2xs">
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-relaxed text-[#1f2937] dark:text-[#fbfff1]/90">{localizeDigits(h, currentLang)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Footer Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#b4c5e4]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#4b5563] dark:text-[#b4c5e4]/70">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-[11px]">
                  {currentLang === 'fa'
                    ? 'اصل مستندات و مدارک فیزیکی در دفتر مرکزی تام فولاد قابل بررسی است.'
                    : 'Physical documents are available for inspection at Tam Steel headquarters.'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#3066be] hover:bg-[#24529d] text-white shadow-md shadow-[#3066be]/25 transition-all"
              >
                {currentLang === 'fa' ? 'بستن پنجره' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
