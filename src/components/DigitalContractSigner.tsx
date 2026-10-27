import { submitRequest } from '../lib/submit';
import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import {
  FileCheck,
  Shield,
  CheckCircle2,
  RotateCcw,
  Download,
  Stamp,
  FileSignature,
  ChevronDown,
  Layers,
  Flame,
  Scissors,
  Grid,
  Maximize,
  Sparkles,
  BadgeCheck
} from 'lucide-react';

interface DigitalContractSignerProps {
  currentLang: Language;
}

export const DigitalContractSigner: React.FC<DigitalContractSignerProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [clientName, setClientName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [serviceType, setServiceType] = useState('galvanized');
  const [tonnage, setTonnage] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [signDate, setSignDate] = useState('');

  // Dropdown state
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Canvas signature
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignatureData, setHasSignatureData] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#3066be'; // Cobalt Blue official digital ink
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignatureData(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignatureData(false);
  };

  const handleSignContract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setSubmitError('');
    if (!agreedTerms) return;

    if (!hasSignatureData || !canvasRef.current) { setSubmitError(currentLang === 'fa' ? 'لطفاً امضای خود را رسم کنید.' : 'Please draw your signature.'); return; }
    setPending(true);
    try {
      const result = await submitRequest('contracts', { clientName, nationalId, serviceType, tonnage, deliveryLocation, agreedTerms, signature: canvasRef.current.toDataURL('image/png') });
      setTrackingCode(result.trackingCode);
      setSignDate(new Date(result.createdAt).toLocaleString(currentLang === 'fa' ? 'fa-IR' : 'en-GB', { timeZone: 'Asia/Tehran' }));
      setIsSigned(true);
    } catch (error) { setSubmitError(error instanceof Error ? error.message : 'Request failed'); }
    finally { setPending(false); }

  };

  const handleReset = () => {
    setIsSigned(false);
    clearSignature();
    setAgreedTerms(false);
  };

  const serviceOptions = [
    {
      value: 'galvanized',
      label: t.servicesList.galvanized,
      badge: currentLang === 'fa' ? 'پوشش زینک و ضد زنگ' : 'Z80-Z275 Zinc Coat',
      desc: currentLang === 'fa' ? 'کویل و شیت گالوانیزه ضخامت ۰.۴ تا ۳ میل با کوتینگ ۸۰ الی ۲۷۵' : 'Hot-dip galvanized coils & sheets 0.4-3mm',
      category: currentLang === 'fa' ? 'تامین کویل و شیت' : 'Coil & Sheet Supply',
      icon: Shield,
      accent: 'from-blue-600 to-indigo-700',
    },
    {
      value: 'cold-rolled',
      label: t.servicesList.coldRolled,
      badge: currentLang === 'fa' ? 'کشش عمیق DC01-DC04' : 'Deep Drawing Steel',
      desc: currentLang === 'fa' ? 'ورق روغنی نورد سرد مناسب بدنه خودرو و قطعه‌سازی دقیق' : 'Cold-rolled coils for automotive & precision stamping',
      category: currentLang === 'fa' ? 'تامین کویل و شیت' : 'Coil & Sheet Supply',
      icon: Layers,
      accent: 'from-cyan-600 to-blue-700',
    },
    {
      value: 'hot-rolled-colored',
      label: t.servicesList.hotRolledColored,
      badge: currentLang === 'fa' ? 'رال‌های متنوع و ورق گرم' : 'ST37/ST52 & RAL Colors',
      desc: currentLang === 'fa' ? 'ورق‌های سیاه ساختمانی ST37/ST52 و رول رنگی الکترواستاتیک' : 'Structural hot-rolled & prepainted coils',
      category: currentLang === 'fa' ? 'تامین کویل و شیت' : 'Coil & Sheet Supply',
      icon: Flame,
      accent: 'from-amber-600 to-red-700',
    },
    {
      value: 'slitting',
      label: t.servicesList.slitting,
      badge: currentLang === 'fa' ? 'دقت برش ±0.05 mm' : 'Tolerance ±0.05mm',
      desc: currentLang === 'fa' ? 'برش طولی رول به نوارهای باریک با خطوط اسلیتر مدرن بدون پلیسه' : 'Precision longitudinal coil slitting with burr-free edges',
      category: currentLang === 'fa' ? 'خدمات کارگاهی مکانیزه' : 'Precision Processing',
      icon: Scissors,
      accent: 'from-emerald-600 to-teal-700',
    },
    {
      value: 'shearing',
      label: t.servicesList.shearing,
      badge: currentLang === 'fa' ? 'برش شیت مکانیزه' : 'Cut-to-Length Shearing',
      desc: currentLang === 'fa' ? 'رول بازکن و برش عرضی کامپیوتری در ابعاد سفارشی کارخانجات' : 'Automated decoiling and cut-to-length shearing',
      category: currentLang === 'fa' ? 'خدمات کارگاهی مکانیزه' : 'Precision Processing',
      icon: Grid,
      accent: 'from-purple-600 to-indigo-700',
    },
    {
      value: 'steel-deck',
      label: t.servicesList.steelDeck,
      badge: currentLang === 'fa' ? 'فرمینگ گام ۷۵ استاندارد' : 'Profile Step 75mm',
      desc: currentLang === 'fa' ? 'تولید ورق عرشه فولادی سقف، گل‌میخ و فلاشینگ‌های سازه' : 'Composite structural steel decking profiles',
      category: currentLang === 'fa' ? 'فرمینگ ساختمانی' : 'Structural Forming',
      icon: Maximize,
      accent: 'from-orange-600 to-amber-700',
    },
  ];

  const selectedOption = serviceOptions.find(s => s.value === serviceType) || serviceOptions[0];
  const selectedServiceLabel = selectedOption?.label || '';
  const SelectedIcon = selectedOption?.icon || Shield;

  return (
    <section data-section="contract-section" className="py-16 bg-[#242129] relative overflow-hidden">
      {/* Background steel texture lines */}
      <div className="absolute inset-0 bg-grid-steel opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#fbfff1] bg-[#3066be]/20 px-3.5 py-1 rounded-full border border-[#3066be]/40 mb-3">
            <Stamp className="w-3.5 h-3.5 text-[#3066be]" />
            <span>سامانه حقوقی قراردادهای الکترونیک B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#fbfff1]">
            {t.contractSection.title}
          </h2>
          <p className="text-[#b4c5e4] text-sm sm:text-base mt-2">
            {t.contractSection.subtitle}
          </p>
        </div>

        {!isSigned ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <form onSubmit={handleSignContract} className="lg:col-span-5 bg-[#3c3744] border border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-7 shadow-2xl">
              {submitError && <p role="alert" className="text-red-500 p-3">{submitError}</p>}
              <h3 className="text-base font-bold text-[#fbfff1] mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#3066be]" />
                <span>مشخصات طرفین و سفارش قرارداد</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#b4c5e4] mb-1.5">
                    {t.contractSection.clientName}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/20 focus:border-[#3066be] rounded-xl px-3.5 py-2.5 text-xs text-[#fbfff1] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#b4c5e4] mb-1.5">
                      {t.contractSection.nationalId}
                    </label>
                    <input
                      type="text"
                      required
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      className="w-full bg-[#242129] border border-[#b4c5e4]/20 focus:border-[#3066be] rounded-xl px-3.5 py-2.5 text-xs text-[#fbfff1] focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#b4c5e4] mb-1.5">
                      {t.contractSection.tonnage}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={tonnage}
                      onChange={(e) => setTonnage(e.target.value)}
                      className="w-full bg-[#242129] border border-[#b4c5e4]/20 focus:border-[#3066be] rounded-xl px-3.5 py-2.5 text-xs text-[#fbfff1] focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#b4c5e4] mb-1.5">
                    {t.contractSection.serviceType}
                  </label>

                  {/* Semantic native select for form accessibility & CSS selector compatibility */}
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#242129] text-[#fbfff1]">
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {/* Rich Graphical Interactive Dropdown Menu */}
                  <div ref={dropdownRef} className="relative">
                    {/* Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-white dark:bg-[#242129] border rounded-2xl p-3 text-start flex items-center justify-between gap-3 transition-all duration-200 group cursor-pointer ${
                        isDropdownOpen
                          ? 'border-[#3066be] ring-2 ring-[#3066be]/30 shadow-xl shadow-[#3066be]/15'
                          : 'border-slate-200 dark:border-[#b4c5e4]/20 hover:border-[#3066be]/60 hover:bg-slate-50 dark:hover:bg-[#2b2734] shadow-sm'
                      }`}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${selectedOption.accent} text-white shadow-md shadow-[#090c9b]/25`}>
                          <SelectedIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#fbfff1] truncate">
                              {selectedOption.label}
                            </span>
                            <span className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-[#3066be]/20 text-[#3066be] dark:text-[#b4c5e4] border border-blue-200/80 dark:border-[#3066be]/30">
                              {selectedOption.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-[#b4c5e4]/70 truncate mt-0.5">
                            {selectedOption.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-slate-500 dark:text-[#b4c5e4]/60 hidden sm:inline font-sans">
                          {isDropdownOpen ? (currentLang === 'fa' ? 'بستن' : 'Close') : (currentLang === 'fa' ? 'تغییر' : 'Change')}
                        </span>
                        <div className={`w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#3c3744] flex items-center justify-center text-slate-500 dark:text-[#b4c5e4] transition-all duration-300 ${
                          isDropdownOpen ? 'rotate-180 dark:bg-[#3066be] dark:text-white' : ''
                        }`}>
                          <ChevronDown className="w-4 h-4 dropdown-trigger-chevron" />
                        </div>
                      </div>
                    </button>

                    {/* Rich Floating Dropdown Popover Menu */}
                    {isDropdownOpen && (
                      <div className="dropdown-menu-popover absolute z-50 top-full start-0 end-0 mt-2 bg-white dark:bg-[#1c1823]/98 backdrop-blur-2xl border border-slate-200 dark:border-[#b4c5e4]/25 rounded-2xl shadow-2xl shadow-slate-300/70 dark:shadow-[0_25px_60px_rgba(0,0,0,0.75),0_0_25px_rgba(48,102,190,0.25)] p-2.5 animate-in fade-in-0 zoom-in-95 duration-150 overflow-hidden">

                        {/* Header bar inside menu */}
                        <div className="flex items-center justify-between px-3 py-2 mb-1.5 border-b border-slate-100 dark:border-[#b4c5e4]/10 bg-slate-50/90 dark:bg-[#282330]/50 rounded-xl">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-[#b4c5e4]">
                            <Sparkles className="w-3.5 h-3.5 text-[#3066be]" />
                            <span>{currentLang === 'fa' ? 'انتخاب محصول یا خدمت فرآوری فولاد' : 'Select Steel Product or Processing'}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-[#b4c5e4]/60">
                            {serviceOptions.length} {currentLang === 'fa' ? 'گزینه فعال' : 'options'}
                          </span>
                        </div>

                        {/* Options list */}
                        <div className="max-h-80 overflow-y-auto space-y-2.5 pe-1 custom-scrollbar">
                          {serviceOptions.map((opt) => {
                            const Icon = opt.icon;
                            const isSelected = serviceType === opt.value;
                            return (
                              <div
                                key={opt.value}
                                onClick={() => {
                                  setServiceType(opt.value);
                                  setIsDropdownOpen(false);
                                }}
                                className={`service-option-item ${isSelected ? 'is-selected' : ''} p-3 rounded-2xl border cursor-pointer transition-all duration-150 group relative ${
                                  isSelected
                                    ? 'border-[#3066be] bg-[#f0f7ff] dark:bg-[#3066be]/20 dark:border-[#3066be] shadow-sm shadow-[#3066be]/10'
                                    : 'border-slate-200/90 hover:border-[#3066be]/40 bg-white hover:bg-slate-50 dark:bg-[#292432]/70 dark:hover:bg-[#342e3f] dark:border-[#b4c5e4]/15'
                                }`}
                              >
                                {/* Top Row: Icon + Title + Selected Checkmark */}
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${opt.accent} text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10`}>
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className={`service-option-title text-xs sm:text-sm font-bold truncate transition-colors ${
                                      isSelected
                                        ? 'text-slate-800 dark:text-[#fbfff1]'
                                        : 'text-slate-700 dark:text-[#fbfff1]/90 group-hover:text-slate-900 dark:group-hover:text-[#fbfff1]'
                                    }`}>
                                      {opt.label}
                                    </span>
                                  </div>

                                  {/* Radio / Selection Checkmark Indicator */}
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                                    isSelected
                                      ? 'border-[#3066be] bg-[#3066be] text-white shadow-sm shadow-[#3066be]/40'
                                      : 'border-slate-300 dark:border-[#b4c5e4]/30 bg-transparent text-transparent group-hover:border-[#3066be]/60'
                                  }`}>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </div>
                                </div>

                                {/* Middle Row: Clear Description */}
                                <p className="service-option-desc text-[11px] leading-relaxed text-black dark:text-[#b4c5e4]/75 group-hover:text-black dark:group-hover:text-[#b4c5e4] mt-2 mb-2.5 pe-1 line-clamp-2">
                                  {opt.desc}
                                </p>

                                {/* Bottom Row / Chips: Category + Tech Specs */}
                                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100 dark:border-[#b4c5e4]/10">
                                  <span className="service-option-chip text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#3c3744] text-slate-600 dark:text-[#b4c5e4] border border-slate-200/80 dark:border-[#b4c5e4]/20 font-medium">
                                    {opt.category}
                                  </span>
                                  <span className={`service-option-badge text-[10px] px-2 py-0.5 rounded-lg font-mono font-medium transition-colors ${
                                    isSelected
                                      ? 'bg-[#3066be]/10 text-[#3066be] dark:bg-[#3066be]/30 dark:text-[#fbfff1] border border-[#3066be]/20'
                                      : 'bg-slate-50 dark:bg-[#3c3744]/60 text-slate-500 dark:text-[#b4c5e4]/70 border border-slate-200/60 dark:border-transparent'
                                  }`}>
                                    {opt.badge}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Footer bar */}
                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-[#b4c5e4]/10 px-2 flex items-center justify-between text-[10px] text-slate-500 dark:text-[#b4c5e4]/70">
                          <div className="flex items-center gap-1.5">
                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{currentLang === 'fa' ? 'تضمین MTC آزمایشگاهی و باسکول دیجیتال' : 'Certified MTC & Digital Weighing Guarantee'}</span>
                          </div>
                          <span className="font-mono text-[#3066be] font-bold">TAM FOOLAD</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#b4c5e4] mb-1.5">
                    {t.contractSection.deliveryLocation}
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full bg-[#242129] border border-[#b4c5e4]/20 focus:border-[#3066be] rounded-xl px-3.5 py-2.5 text-xs text-[#fbfff1] focus:outline-none transition-colors"
                  />
                </div>

                {/* Signature Pad */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#b4c5e4]">
                      {t.contractSection.signPadTitle}
                    </label>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="text-[11px] text-[#3066be] hover:text-[#b4c5e4] flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{t.contractSection.clearSign}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#b4c5e4]/80 mb-2">
                    {t.contractSection.signPadHint}
                  </p>

                  <div className="border border-[#b4c5e4]/30 rounded-2xl bg-[#242129] overflow-hidden relative">
                    <canvas
                      ref={canvasRef}
                      width={380}
                      height={120}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-28 touch-none cursor-crosshair"
                    />
                    {!hasSignatureData && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#b4c5e4]/40 text-xs font-light">
                        محل رسم امضای الکترونیک
                      </div>
                    )}
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-1 rounded bg-[#242129] border-[#b4c5e4]/40 text-[#3066be] focus:ring-[#3066be]"
                    />
                    <span className="text-xs text-[#b4c5e4] leading-relaxed">
                      {t.contractSection.signTerms}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreedTerms || !hasSignatureData || pending}
                  className="w-full py-3 px-4 bg-[#3066be] hover:bg-[#24529d] disabled:bg-[#3066be]/50 text-white !text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-[#3066be]/30 active:scale-98 flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-white !text-white" />
                  <span className="text-white !text-white">{t.contractSection.submitContract}</span>
                </button>
              </div>
            </form>

            {/* Live Contract Preview Column */}
            <div className="lg:col-span-7 bg-[#3c3744]/70 border border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-8 relative">
              <div className="flex items-center justify-between border-b border-[#b4c5e4]/15 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#090c9b] to-[#3066be] text-[#fbfff1] flex items-center justify-center border border-[#b4c5e4]/30 shadow-md shadow-[#090c9b]/30">
                    <FileSignature className="w-4 h-4 text-[#fbfff1]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#fbfff1]">قرارداد رسمی فروش و خدمات فرآوری فولاد</h4>
                    <span className="text-[11px] text-[#b4c5e4]">طرف اول: شرکت صنایع تام فولاد (سهامی خاص)</span>
                  </div>
                </div>
                <div className="text-end text-[11px] text-[#b4c5e4]">
                  <div>شماره پیش‌نویس: TF-DRAFT-2026</div>
                  <div className="text-[#b4c5e4] font-medium">نسخه معتبر حقوقی</div>
                </div>
              </div>

              {/* Contract Clauses */}
              <div className="space-y-4 text-xs text-[#475569] dark:text-[#fbfff1]/90 leading-relaxed font-sans">
                <p>
                  این قرارداد در راستای مقررات قانون تجارت و قوانین عمومی کشور، فی‌مابین <strong className="text-[#475569] dark:text-[#fbfff1]">صنایع تام فولاد</strong> (تامین‌کننده) و <strong className="text-[#475569] dark:text-[#fbfff1]">{clientName || 'کارفرما'}</strong> به شناسه ملی <strong className="text-[#475569] dark:text-[#fbfff1]">{nationalId || '---'}</strong> منعقد می‌گردد.
                </p>

                <div className="bg-[#242129] border border-[#b4c5e4]/15 rounded-2xl p-3.5 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#b4c5e4]">موضوع و شرح عملیات:</span>
                    <span className="text-[#475569] dark:text-[#fbfff1] font-semibold">{selectedServiceLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b4c5e4]">تناژ توافق شده:</span>
                    <span className="text-[#475569] dark:text-[#fbfff1] font-mono">{tonnage} تن متری</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#b4c5e4]">محل تخلیه و تحویل:</span>
                    <span className="text-[#475569] dark:text-[#fbfff1]">{deliveryLocation}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-[#475569] dark:text-[#fbfff1] mb-1">ماده ۱: الزامات کیفیت و گواهینامه متالورژی (MTC)</h5>
                  <p className="text-[#475569] dark:text-[#b4c5e4]">
                    تام فولاد تضمین می‌نماید که کلیه مقاطع ارسالی کاملاً منطبق بر گریدهای متالورژی کارخانه مادر (فولاد مبارکه، امیرکبیر، اکسین یا وارداتی) بوده و برگه رسمی سرتیفیکیت آزمایشگاه با محموله ارسال گردد.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#475569] dark:text-[#fbfff1] mb-1">ماده ۲: باسکول، توزین و تلرانس ابعادی</h5>
                  <p className="text-[#475569] dark:text-[#b4c5e4]">
                    ملاک قطعی وزن محموله، قبض باسکول رسمی دیجیتال مبدا مورد تایید طرفین است. تلرانس ابعادی در خطوط اسلیتینگ و شیت‌کن مطابق استاندارد DIN 59232 (حداکثر ۰.۰۵ میلی‌متر) تضمین می‌گردد.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#475569] dark:text-[#fbfff1] mb-1">ماده ۳: اعتبار امضای الکترونیک</h5>
                  <p className="text-[#475569] dark:text-[#b4c5e4]">
                    بر اساس قانون تجارت الکترونیک، امضای دیجیتال ثبت‌شده در این پرتال دارای تمامیت حقوقی و سندیت قانونی معادل امضای دستی و مهر رسمی است.
                  </p>
                </div>
              </div>

              {/* Watermark Notice */}
              <div className="mt-6 pt-4 border-t border-[#b4c5e4]/15 flex items-center justify-between text-[11px] text-[#b4c5e4]">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#3066be]" />
                  <span>محافظت شده با رمزنگاری امنیتی تام فولاد</span>
                </div>
                <span>{currentLang === 'fa' ? 'تهران' : 'Tehran'}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Success Signed State */
          <div className="max-w-2xl mx-auto bg-[#3c3744] border border-[#3066be] rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#3066be]/20 border border-[#3066be] text-[#fbfff1] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-[#3066be]" />
            </div>

            <h3 className="text-2xl font-bold text-[#fbfff1] mb-2">
              {t.contractSection.successTitle}
            </h3>
            <p className="text-sm text-[#b4c5e4] max-w-md mx-auto mb-6">
              قرارداد رسمی تامین و خدمات برای <strong className="text-[#fbfff1]">{clientName}</strong> با موفقیت در دبیرخانه دیجیتال صنایع تام فولاد ثبت و مهر گردید.
            </p>

            <div className="bg-[#242129] border border-[#b4c5e4]/20 rounded-2xl p-4 text-sm space-y-2 mb-6 text-right">
              <div className="flex justify-between items-center">
                <span className="text-[#b4c5e4]">{t.contractSection.trackingCode}</span>
                <span className="font-mono font-bold text-[#3066be] text-base">{trackingCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#b4c5e4]">زمان ثبت الکترونیک:</span>
                <span className="font-mono text-[#fbfff1]">{signDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#b4c5e4]">موضوع قرارداد:</span>
                <span className="text-[#fbfff1]">{selectedServiceLabel} ({tonnage} تن)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#b4c5e4]">وضعیت سند:</span>
                <span className="text-[#3066be] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ممهور به مهر دیجیتال رسمی</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#3066be] hover:bg-[#24529d] text-[#fbfff1] font-bold text-xs transition-colors shadow-lg shadow-[#3066be]/30"
              >
                <Download className="w-4 h-4" />
                <span>{t.contractSection.downloadPdf}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#242129] hover:bg-[#2b2731] text-[#b4c5e4] hover:text-[#fbfff1] border border-[#b4c5e4]/20 text-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.contractSection.newContract}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
