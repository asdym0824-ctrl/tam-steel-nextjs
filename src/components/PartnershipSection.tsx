import { submitRequest } from '../lib/submit';
import React, { useState } from 'react';
import {
  Handshake,
  Send,
  CheckCircle2,
  Building2,
  Truck,
  HardHat,
  Store,
  User,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  FileCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { localizeDigits, toEnglishDigits } from '../utils/numberLocale';

interface PartnershipSectionProps {
  currentLang: Language;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const isRtl = currentLang === 'fa' || currentLang === 'ar';
  const [role, setRole] = useState<'supplier' | 'logistics' | 'contractor' | 'agent'>('supplier');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Validation States
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  // Phone validation helper
  const checkPhoneValid = (val: string): boolean => {
    if (!val || !val.trim()) return false;
    const eng = toEnglishDigits(val.trim());
    const cleaned = eng.replace(/[\s\-\.\(\)]/g, '');

    // Iranian mobile: 09xxxxxxxxx (11 digits), +989xxxxxxxxx, 00989xxxxxxxxx, or 9xxxxxxxxx
    const isIranianMobile = /^(?:(?:\+98|0098|0)?9\d{9})$/.test(cleaned);
    // Iranian landline with province code: 021xxxxxxxx, etc.
    const isIranianLandline = /^(?:(?:\+98|0098|0)[1-8]\d{9})$/.test(cleaned);
    // International numbers: 8 to 15 digits
    const isInternational = /^\+?[1-9]\d{7,14}$/.test(cleaned);

    return isIranianMobile || isIranianLandline || isInternational;
  };

  // Email validation helper
  const checkEmailValid = (val: string): boolean => {
    if (!val || !val.trim()) return true; // Email is optional
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(val.trim());
  };

  const getPhoneErrorText = (): string => {
    switch (currentLang) {
      case 'fa':
        return 'شماره تلفن معتبر نیست. لطفاً شماره صحیح (مانند ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.';
      case 'ar':
        return 'رقم الهاتف غير صحيح. يرجى إدخال رقم صالح (مثال: ۰۹۱۲۳۴۵۶۷۸۹).';
      case 'tr':
        return 'Telefon numarası geçersiz. Lütfen geçerli bir numara giriniz.';
      case 'en':
      default:
        return 'Invalid phone number. Please enter a valid number (e.g. +98 912 345 6789).';
    }
  };

  const getEmailErrorText = (): string => {
    switch (currentLang) {
      case 'fa':
        return 'فرمت ایمیل نامعتبر است (مثال: info@company.com).';
      case 'ar':
        return 'صيغة البريد الإلكتروني غير صالحة (مثال: info@company.com).';
      case 'tr':
        return 'Geçersiz e-posta formatı (Örn: info@company.com).';
      case 'en':
      default:
        return 'Invalid email format (e.g. info@company.com).';
    }
  };

  const getNameErrorText = (): string => {
    switch (currentLang) {
      case 'fa':
        return 'لطفاً نام و نام خانوادگی یا نام شرکت را وارد کنید.';
      case 'ar':
        return 'يرجى إدخال الاسم الكامل أو اسم الشركة.';
      case 'tr':
        return 'Lütfen ad ve soyadınızı veya şirket adını giriniz.';
      case 'en':
      default:
        return 'Please enter your full name or company name.';
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (phoneTouched) {
      if (!val.trim()) {
        setPhoneError(getPhoneErrorText());
      } else if (!checkPhoneValid(val)) {
        setPhoneError(getPhoneErrorText());
      } else {
        setPhoneError('');
      }
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    if (!phone.trim() || !checkPhoneValid(phone)) {
      setPhoneError(getPhoneErrorText());
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailTouched) {
      if (val.trim() && !checkEmailValid(val)) {
        setEmailError(getEmailErrorText());
      } else {
        setEmailError('');
      }
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (email.trim() && !checkEmailValid(email)) {
      setEmailError(getEmailErrorText());
    } else {
      setEmailError('');
    }
  };

  const handleNameChange = (val: string) => {
    setFullName(val);
    if (nameTouched) {
      if (!val.trim() || val.trim().length < 2) {
        setNameError(getNameErrorText());
      } else {
        setNameError('');
      }
    }
  };

  const handleNameBlur = () => {
    setNameTouched(true);
    if (!fullName.trim() || fullName.trim().length < 2) {
      setNameError(getNameErrorText());
    } else {
      setNameError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setSubmitError('');
    setNameTouched(true);
    setPhoneTouched(true);
    setEmailTouched(true);

    let hasError = false;

    if (!fullName.trim() || fullName.trim().length < 2) {
      setNameError(getNameErrorText());
      hasError = true;
    } else {
      setNameError('');
    }

    if (!phone.trim() || !checkPhoneValid(phone)) {
      setPhoneError(getPhoneErrorText());
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (email.trim() && !checkEmailValid(email)) {
      setEmailError(getEmailErrorText());
      hasError = true;
    } else {
      setEmailError('');
    }

    if (hasError) return;

    setPending(true);
    try {
      const result = await submitRequest('partnerships', { fullName, phone, email, role, message });
      setReferenceCode(result.trackingCode); setSubmitted(true);
    } catch (error) { setSubmitError(error instanceof Error ? error.message : 'Request failed'); }
    finally { setPending(false); }

  };

  const roleOptions = [
    {
      id: 'supplier',
      label: t.partnershipSection.roles.supplier,
      sublabel: currentLang === 'fa' ? 'تولیدکنندگان شمش، اسلب و کویل‌های نورد' : 'Steel Mills & Coil Manufacturers',
      icon: Building2
    },
    {
      id: 'logistics',
      label: t.partnershipSection.roles.logistics,
      sublabel: currentLang === 'fa' ? 'ناوگان تریلی کفی، ترانزیت و بوژی‌های سنگین' : 'Heavy Flatbed & Logistics Fleets',
      icon: Truck
    },
    {
      id: 'contractor',
      label: t.partnershipSection.roles.contractor,
      sublabel: currentLang === 'fa' ? 'سازندگان سوله، اسکلت فلزی و صنایع خودرویی' : 'Steel Structure & Industrial Fabricators',
      icon: HardHat
    },
    {
      id: 'agent',
      label: t.partnershipSection.roles.agent,
      sublabel: currentLang === 'fa' ? 'توزیع‌کنندگان استانی و کارگزاران بورس کالا' : 'Regional Distributors & Brokers',
      icon: Store
    },
  ];

  const quickTags = [
    currentLang === 'fa' ? 'پیشنهاد فروش کویل و رول' : 'Supply Steel Coils',
    currentLang === 'fa' ? 'ناوگان حمل و ترابری' : 'Freight & Trucking Fleet',
    currentLang === 'fa' ? 'تامین پروژه‌ای عمده' : 'Bulk Project Procurement',
    currentLang === 'fa' ? 'عقد تفاهم‌نامه سالانه' : 'Annual Partnership Agreement',
  ];

  const applyTag = (tag: string) => {
    setMessage((prev) => (prev ? `${prev} - ${tag}` : tag));
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#242129] relative overflow-hidden transition-colors">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 start-1/4 -translate-y-1/2 w-96 h-96 bg-[#090c9b]/10 dark:bg-[#090c9b]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 end-10 w-96 h-96 bg-[#3066be]/10 dark:bg-[#3066be]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Card Container */}
        <div className="partnership-card bg-white dark:bg-gradient-to-br dark:from-[#2c2736] dark:via-[#231e2b] dark:to-[#1a1721] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/60 dark:shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all">

          {/* Top specular highlight rim */}
          <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3066be]/50 dark:via-[#3066be]/80 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/25 dark:border-amber-400/30 text-amber-700 dark:text-amber-300 text-xs font-semibold shadow-sm">
                <Handshake className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>{currentLang === 'fa' ? 'همکاری استراتژیک تجاری و B2B' : 'B2B Strategic Partnership'}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-[#fbfff1] tracking-tight leading-snug">
                  {t.partnershipSection.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#b4c5e4]/80 mt-2 leading-relaxed font-light">
                  {t.partnershipSection.subtitle}
                </p>
              </div>

              {/* Interactive Roles Selector Cards */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-[#b4c5e4]/70 uppercase tracking-wider block">
                  {currentLang === 'fa' ? 'حوزه همکاری خود را انتخاب فرمایید:' : 'Select Your Cooperation Area:'}
                </span>

                {roleOptions.map((item) => {
                  const Icon = item.icon;
                  const isSelected = role === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setRole(item.id as any)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 group ${
                        isSelected
                          ? 'bg-white dark:bg-[#3066be]/25 border-2 border-[#3066be] text-slate-900 dark:text-[#fbfff1] shadow-md shadow-[#3066be]/15 dark:shadow-lg dark:shadow-[#3066be]/20 -translate-y-0.5'
                          : 'bg-white dark:bg-[#1e1b25]/80 border border-slate-200 dark:border-[#b4c5e4]/15 text-slate-700 dark:text-[#b4c5e4]/80 hover:border-slate-300 dark:hover:border-[#b4c5e4]/30 hover:bg-slate-50 dark:hover:bg-[#25212e] shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#3066be] text-white shadow-md shadow-[#3066be]/30'
                            : 'bg-white dark:bg-[#15131a] border border-slate-200 dark:border-transparent text-slate-500 dark:text-[#b4c5e4]/60 dark:group-hover:text-[#fbfff1] shadow-sm'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-slate-600 dark:text-[#fbfff1]' : 'text-slate-600 dark:text-[#fbfff1]/90'}`}>
                            {item.label}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-[#b4c5e4]/70 truncate mt-0.5">
                            {item.sublabel}
                          </p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[#3066be] bg-[#3066be] text-white'
                          : 'border-slate-300 dark:border-[#b4c5e4]/30 bg-transparent'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3 Pillars of Trust */}
              <div className="pt-4 border-t border-slate-200 dark:border-[#b4c5e4]/15 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1e1a26]/70 border border-slate-200 dark:border-[#b4c5e4]/10 shadow-sm dark:shadow-none">
                  <CreditCard className="w-4 h-4 text-[#3066be] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-[#fbfff1] block">تسویه نقدی و LC</span>
                  <span className="text-[9px] text-slate-500 dark:text-[#b4c5e4]/60">بدون تعویق مالی</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1e1a26]/70 border border-slate-200 dark:border-[#b4c5e4]/10 shadow-sm dark:shadow-none">
                  <FileCheck className="w-4 h-4 text-[#3066be] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-[#fbfff1] block">قرارداد رسمی</span>
                  <span className="text-[9px] text-slate-500 dark:text-[#b4c5e4]/60">تعهد کتبی طرفین</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#1e1a26]/70 border border-slate-200 dark:border-[#b4c5e4]/10 shadow-sm dark:shadow-none">
                  <ShieldCheck className="w-4 h-4 text-[#3066be] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-[#fbfff1] block">خرید تناژ بالا</span>
                  <span className="text-[9px] text-slate-500 dark:text-[#b4c5e4]/60">پایداری زنجیره</span>
                </div>
              </div>

            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-slate-50/90 dark:bg-[#1c1822]/90 backdrop-blur-md border border-slate-200 dark:border-[#b4c5e4]/20 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-2xl relative">

              {submitted ? (
                <div className="text-center py-10 px-4 space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-[#fbfff1]">
                      {currentLang === 'fa' ? 'درخواست همکاری با موفقیت ثبت شد' : 'Partnership Request Registered'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#b4c5e4]/80 max-w-md mx-auto mt-1.5 leading-relaxed">
                      {t.partnershipSection.successMsg}
                    </p>
                  </div>

                  {/* Reference Tracking Ticket */}
                  <div className="max-w-xs mx-auto p-3.5 rounded-2xl bg-white dark:bg-[#241f2d] border border-[#3066be]/40 text-center space-y-1 shadow-sm">
                    <span className="text-[10px] text-slate-500 dark:text-[#b4c5e4]/70 uppercase tracking-wider block font-mono">
                      {currentLang === 'fa' ? 'کد رهگیری پرونده تجاری' : 'B2B Inquiry Ref Code'}
                    </span>
                    <span className="text-base font-black font-mono text-[#3066be] tracking-wider block">
                      {referenceCode}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-medium">
                      {currentLang === 'fa' ? 'تماس واحد بازرگانی ظرف حداکثر ۲ ساعت کاری' : 'Commercial Desk Contact < 2 Hours'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                      setNameError('');
                      setPhoneError('');
                      setEmailError('');
                      setNameTouched(false);
                      setPhoneTouched(false);
                      setEmailTouched(false);
                    }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#3066be] text-[#fbfff1] hover:bg-[#24529d] transition-all shadow-md shadow-[#3066be]/20 active:scale-95"
                  >
                    {currentLang === 'fa' ? 'ثبت درخواست همکاری دیگر' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {submitError && <p role="alert" className="text-red-500 p-3">{submitError}</p>}

                  {/* Form Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#b4c5e4]/15">
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-[#fbfff1]">
                        {t.partnershipSection.formTitle}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-[#b4c5e4]/70 mt-0.5">
                        {currentLang === 'fa' ? 'اطلاعات اولیه تماس و ظرفیت‌های کاری خود را وارد نمایید' : 'Enter your contact info and capability brief'}
                      </p>
                    </div>

                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#3066be]/10 dark:bg-[#3066be]/15 border border-[#3066be]/20 dark:border-[#3066be]/30 text-[#3066be]">
                      {roleOptions.find(r => r.id === role)?.label}
                    </span>
                  </div>

                  {/* Input Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-[#b4c5e4] mb-1.5">
                        {t.partnershipSection.fullName} *
                      </label>
                      <div className="relative">
                        <User className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 transition-colors ${nameError ? 'text-rose-500' : 'text-slate-400 dark:text-[#b4c5e4]/50'}`} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => handleNameChange(e.target.value)}
                          onBlur={handleNameBlur}
                          placeholder={currentLang === 'fa' ? 'نام و نام خانوادگی / نام شرکت' : 'Full Name / Company'}
                          className={`w-full bg-white dark:bg-[#25202e] border rounded-xl ps-9 pe-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-[#fbfff1] placeholder-slate-400 dark:placeholder-[#b4c5e4]/40 focus:outline-none shadow-sm transition-all ${
                            nameError
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                              : 'border-slate-300 dark:border-[#b4c5e4]/20 focus:border-[#3066be] focus:ring-1 focus:ring-[#3066be]'
                          }`}
                        />
                      </div>
                      {nameError && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-rose-500 dark:text-rose-400 font-medium animate-in fade-in duration-150">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{nameError}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-[#b4c5e4] mb-1.5">
                        {t.partnershipSection.phone} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <Phone className={`w-4 h-4 transition-colors ${phoneError ? 'text-rose-500' : 'text-slate-400 dark:text-[#b4c5e4]/50'}`} />
                        </div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          onBlur={handlePhoneBlur}
                          placeholder={currentLang === 'fa' ? '۰۹۱۲۳۴۵۶۷۸۹' : currentLang === 'ar' ? '٠٩١٢٣٤٥٦٧٨٩' : currentLang === 'tr' ? '0532 123 45 67' : '0912 345 6789'}
                          className={`w-full bg-white dark:bg-[#25202e] border rounded-xl ps-9 pe-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-[#fbfff1] placeholder-slate-400 dark:placeholder-[#b4c5e4]/40 focus:outline-none shadow-sm transition-all text-start font-mono ${
                            phoneError
                              ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                              : 'border-slate-300 dark:border-[#b4c5e4]/20 focus:border-[#3066be] focus:ring-1 focus:ring-[#3066be]'
                          }`}
                        />
                      </div>
                      {phoneError && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-rose-500 dark:text-rose-400 font-medium animate-in fade-in duration-150">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{phoneError}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-[#b4c5e4] mb-1.5">
                      {t.partnershipSection.email} <span className="text-[10px] font-normal text-slate-400 dark:text-[#b4c5e4]/50">({currentLang === 'fa' ? 'اختیاری' : 'Optional'})</span>
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 transition-colors ${emailError ? 'text-rose-500' : 'text-slate-400 dark:text-[#b4c5e4]/50'}`} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={handleEmailBlur}
                        placeholder="company@domain.com"
                        className={`w-full bg-white dark:bg-[#25202e] border rounded-xl ps-9 pe-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-[#fbfff1] placeholder-slate-400 dark:placeholder-[#b4c5e4]/40 focus:outline-none shadow-sm transition-all dir-ltr ${
                          emailError
                            ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                            : 'border-slate-300 dark:border-[#b4c5e4]/20 focus:border-[#3066be] focus:ring-1 focus:ring-[#3066be]'
                        }`}
                      />
                    </div>
                    {emailError && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-rose-500 dark:text-rose-400 font-medium animate-in fade-in duration-150">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{emailError}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Preset Topics */}
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-600 dark:text-[#b4c5e4]/70 mb-1.5">
                      {currentLang === 'fa' ? 'موضوعات پیشنهادی سریع:' : 'Quick Subject Suggestions:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickTags.map((tag) => (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => applyTag(tag)}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-white dark:bg-[#25202e] hover:bg-[#3066be]/10 dark:hover:bg-[#3066be]/30 text-slate-700 dark:text-[#b4c5e4] hover:text-[#3066be] dark:hover:text-[#fbfff1] border border-slate-200 dark:border-[#b4c5e4]/15 shadow-sm transition-colors"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-[#b4c5e4] mb-1.5">
                      {t.partnershipSection.message}
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={currentLang === 'fa' ? 'شرح حوزه فعالیت، توانمندی‌ها، ظرفیت حمل یا حجم تامین...' : 'Describe your company capabilities, fleet, or supply capacity...'}
                        className="w-full bg-white dark:bg-[#25202e] border border-slate-300 dark:border-[#b4c5e4]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-[#fbfff1] placeholder-slate-400 dark:placeholder-[#b4c5e4]/40 focus:outline-none focus:border-[#3066be] focus:ring-1 focus:ring-[#3066be] shadow-sm transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Privacy & NDA Note */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-[#b4c5e4]/70 bg-white dark:bg-[#25202e]/60 p-2.5 rounded-xl border border-slate-200 dark:border-[#b4c5e4]/10 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-[#3066be] shrink-0" />
                    <span>
                      {currentLang === 'fa'
                        ? 'کلیه اطلاعات تجاری و استعلام‌های شما تحت توافق‌نامه محرمانگی (NDA) محفوظ خواهد ماند.'
                        : 'All submitted business information is strictly protected under NDA protocols.'}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit" disabled={pending}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-[#3066be] to-[#24529d] hover:brightness-110 text-white transition-all shadow-lg shadow-[#3066be]/25 active:scale-95"
                  >
                    <span className="text-white">{t.partnershipSection.submitBtn}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4 text-white" /> : <ArrowRight className="w-4 h-4 text-white" />}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
