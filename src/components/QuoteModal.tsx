import { submitRequest } from '../lib/submit';
import React, { useState, useEffect } from 'react';
import { X, Phone, CheckCircle2, Send, Building2, User, FileText, Check, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

const WHATSAPP_PHONE = '989122444252';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialProduct?: string;
  initialSpecs?: string;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialProduct = '',
  initialSpecs = '',
  preselectedService = '',
}) => {
  const t = translations[currentLang];
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState(preselectedService || initialProduct);
  const [specs, setSpecs] = useState(initialSpecs);
  const [tonnage, setTonnage] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (preselectedService) setProduct(preselectedService);
    else if (initialProduct) setProduct(initialProduct);
    if (initialSpecs) setSpecs(initialSpecs);
  }, [preselectedService, initialProduct, initialSpecs]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setSubmitError('');
    if (!name.trim() || !phone.trim()) {
      setError(currentLang === 'fa' ? 'لطفاً نام و شماره تماس خود را وارد نمایید.' : 'Please enter your name and phone number.');
      return;
    }

    setPending(true);
    try {
      const result = await submitRequest('quotes', { name, phone, company, city, product, specs, tonnage });
      setTrackingCode(result.trackingCode); setSubmitted(true); setError('');
    } catch (error) { setSubmitError(error instanceof Error ? error.message : 'Request failed'); }
    finally { setPending(false); }

  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setCompany('');
    setProduct('');
    setSpecs('');
    setTonnage('');
    setCity('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#2d2935] border border-[#b4c5e4]/25 rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-lg text-[#b4c5e4] hover:text-[#fbfff1] hover:bg-[#3c3744] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-[#fbfff1]">
              {currentLang === 'fa' ? 'استعلام قیمت شما با موفقیت ثبت شد' : 'Quote Request Successfully Submitted'}
            </h3>
            <p className="text-xs sm:text-sm text-[#b4c5e4]/80 max-w-md mx-auto leading-relaxed">
              {t.quoteModal.success}
            </p>

            <div className="bg-[#242129] border border-[#3066be]/40 rounded-xl p-4 max-w-sm mx-auto text-center space-y-1">
              <span className="text-[11px] text-[#b4c5e4]/70 block">
                {currentLang === 'fa' ? 'کد پیگیری استعلام قیمت:' : 'Inquiry Tracking Code:'}
              </span>
              <span className="text-base font-bold font-mono text-[#3066be]">
                {localizeDigits(trackingCode, currentLang)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#3066be] hover:bg-[#3066be]/90 text-[#fbfff1] transition-all"
            >
              {currentLang === 'fa' ? 'بستن پنجره' : 'Close Window'}
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#3066be]/25 border border-[#3066be]/40 flex items-center justify-center text-[#3066be]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#fbfff1]">
                  {t.quoteModal.title}
                </h3>
                <p className="text-xs text-[#b4c5e4]/70 mt-0.5">
                  {t.quoteModal.subtitle}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {submitError && <p role="alert" className="text-red-500 p-3">{submitError}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                    {t.quoteModal.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={currentLang === 'fa' ? 'مثال: علیرضا محمدی' : 'John Doe'}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                    {t.quoteModal.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={currentLang === 'fa' ? '۰۹۱۲۳۴۵۶۷۸۹' : currentLang === 'ar' ? '٠٩١٢٣٤٥٦٧٨٩' : currentLang === 'tr' ? '0532 123 45 67' : '0912 345 6789'}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#fbfff1] placeholder-[#b4c5e4]/40 focus:outline-none focus:border-[#3066be] text-start font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                    {currentLang === 'fa' ? 'نام شرکت یا کارگاه (اختیاری)' : 'Company / Business Name'}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={currentLang === 'fa' ? 'سازه گستر فولاد...' : 'Company Ltd.'}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                    {currentLang === 'fa' ? 'شهر مقصد تحویل بار' : 'Delivery Destination City'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={currentLang === 'fa' ? 'تهران، اصفهان، تبریز...' : 'Tehran, Isfahan...'}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                    {t.quoteModal.productService}
                  </label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder={currentLang === 'fa' ? 'مثال: ورق گالوانیزه کاشان' : 'e.g. Galvanized Sheet'}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                    {currentLang === 'fa' ? 'تناژ یا متراژ تقریبی' : 'Approximate Tonnage / Volume'}
                  </label>
                  <input
                    type="text"
                    value={tonnage}
                    onChange={(e) => setTonnage(e.target.value)}
                    placeholder={currentLang === 'fa' ? 'مثال: ۲۵ تن / ۲ بندیل' : 'e.g. 25 MT'}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                  {t.quoteModal.specs}
                </label>
                <textarea
                  rows={2}
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  placeholder={currentLang === 'fa' ? 'ضخامت، عرض، گرید متالورژی یا نوع برشکاری مدنظر...' : 'Thickness, grade, specific slitting requirements...'}
                  className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit" disabled={pending}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#3066be] hover:bg-[#3066be]/90 text-white !text-white shadow-lg shadow-[#3066be]/25 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 rtl:rotate-180 text-white !text-white" />
                  <span className="text-white !text-white">{t.quoteModal.send}</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
