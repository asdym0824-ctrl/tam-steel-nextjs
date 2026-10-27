import React, { useState } from 'react';
import { X, Calculator, ArrowRight, CheckCircle2, RotateCcw, Copy } from 'lucide-react';
import { Language } from '../types';
import { formatNumberByLang, localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface SteelCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onTransferToQuote?: (quoteData: { productName: string; specs: string }) => void;
}

export const SteelCalculatorModal: React.FC<SteelCalculatorModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onTransferToQuote,
}) => {
  const t = translations[currentLang];
  const [sheetType, setSheetType] = useState<'cold' | 'galvanized' | 'hot' | 'stainless'>('cold');
  const [thickness, setThickness] = useState<number>(2.0);
  const [width, setWidth] = useState<number>(1250);
  const [length, setLength] = useState<number>(2500);
  const [quantity, setQuantity] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Steel densities: standard carbon steel is 7.85 g/cm3 (0.00000785 kg/mm3), stainless ~ 7.93
  const density = sheetType === 'stainless' ? 7.93 : 7.85;

  // Formula: thickness(mm) * width(mm) * length(mm) * density / 1,000,000 = kg per sheet
  const singleSheetWeightKg = (thickness * width * length * density) / 1000000;
  const totalWeightKg = singleSheetWeightKg * quantity;
  const totalWeightTon = totalWeightKg / 1000;

  const presets = [
    { label: '1000 × 2000 mm', w: 1000, l: 2000 },
    { label: '1250 × 2500 mm', w: 1250, l: 2500 },
    { label: '1500 × 3000 mm', w: 1500, l: 3000 },
    { label: '1500 × 6000 mm', w: 1500, l: 6000 },
  ];

  const sheetTypes = [
    { id: 'cold', label: currentLang === 'fa' ? 'ورق روغنی (نورد سرد)' : currentLang === 'ar' ? 'ألواح الدرفلة الباردة' : currentLang === 'tr' ? 'Soğuk Haddelenmiş Sac' : 'Cold-Rolled Sheet' },
    { id: 'galvanized', label: currentLang === 'fa' ? 'ورق گالوانیزه' : currentLang === 'ar' ? 'ألواح مجلفنة' : currentLang === 'tr' ? 'Galvanizli Sac' : 'Galvanized Sheet' },
    { id: 'hot', label: currentLang === 'fa' ? 'ورق سیاه (نورد گرم)' : currentLang === 'ar' ? 'ألواح الدرفلة الساخنة' : currentLang === 'tr' ? 'Sıcak Haddelenmiş Sac' : 'Hot-Rolled Sheet' },
    { id: 'stainless', label: currentLang === 'fa' ? 'ورق استنلس استیل' : currentLang === 'ar' ? 'فولاذ مقاوم للصدأ' : currentLang === 'tr' ? 'Paslanmaz Çelik' : 'Stainless Steel' },
  ];

  const handleCopyResult = () => {
    const text = `محاسبه تام فولاد: ${thickness}mm × ${width}mm × ${length}mm | تعداد: ${quantity} برگ | وزن هر برگ: ${singleSheetWeightKg.toFixed(2)} kg | وزن کل: ${totalWeightKg.toFixed(1)} kg (${totalWeightTon.toFixed(3)} تن)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRequestQuote = () => {
    if (onTransferToQuote) {
      const typeObj = sheetTypes.find(s => s.id === sheetType);
      const productName = typeObj ? typeObj.label : 'ورق فولادی';
      const specs = `ضخامت: ${thickness}mm | ابعاد: ${width}×${length}mm | تعداد: ${quantity} برگ | وزن تخمینی: ${totalWeightKg.toFixed(1)} کیلوگرم (${totalWeightTon.toFixed(2)} تن)`;
      onTransferToQuote({ productName, specs });
    }
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

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#3066be]/25 border border-[#3066be]/40 flex items-center justify-center text-[#3066be]">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#fbfff1]">
              {t.calcModal.title}
            </h3>
            <p className="text-xs text-[#b4c5e4]/70 mt-0.5">
              {t.calcModal.subtitle}
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Sheet Type */}
          <div>
            <label className="block text-xs font-semibold text-[#b4c5e4] mb-1.5">
              {t.calcModal.sheetType}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sheetTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSheetType(type.id as any)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg text-start transition-all border ${
                    sheetType === type.id
                      ? 'bg-[#3066be] text-white !text-white border-[#3066be] shadow-sm'
                      : 'bg-[#242129] text-[#475569] dark:text-[#fbfff1]/80 border-[#b4c5e4]/15 hover:border-[#b4c5e4]/30'
                  }`}
                  style={sheetType === type.id ? { color: '#ffffff' } : undefined}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <span className="text-[11px] text-[#b4c5e4]/70 block mb-1">
              {currentLang === 'fa' ? 'ابعاد استاندارد کارخانه:' : 'Standard Factory Presets:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setWidth(p.w);
                    setLength(p.l);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                    width === p.w && length === p.l
                      ? 'bg-[#f5a623]/20 border-[#f5a623] text-[#f5a623] font-bold'
                      : 'bg-[#242129] border-[#b4c5e4]/15 text-[#b4c5e4] hover:text-[#fbfff1]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                {t.calcModal.thickness}
              </label>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="100"
                value={thickness}
                onChange={(e) => setThickness(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                {t.calcModal.width}
              </label>
              <input
                type="number"
                step="10"
                min="10"
                max="5000"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
                {t.calcModal.length}
              </label>
              <input
                type="number"
                step="10"
                min="10"
                max="15000"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-semibold text-[#b4c5e4] mb-1">
              {t.calcModal.quantity}
            </label>
            <input
              type="number"
              min="1"
              max="100000"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              className="w-full bg-[#242129] border border-[#b4c5e4]/25 rounded-lg px-3 py-2 text-sm text-[#fbfff1] focus:outline-none focus:border-[#3066be]"
            />
          </div>
        </div>

        {/* Calculation Result Box */}
        <div className="mt-6 bg-[#242129] border border-[#3066be]/30 rounded-xl p-4.5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#b4c5e4]/10">
            <span className="text-xs text-[#b4c5e4]">
              {t.calcModal.weightPerSheet}
            </span>
            <span className="text-base font-bold font-mono text-[#475569] dark:text-[#fbfff1]">
              {formatNumberByLang(parseFloat(singleSheetWeightKg.toFixed(2)), currentLang)} {t.calcModal.kg}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#b4c5e4]">
              {t.calcModal.totalWeight}
            </span>
            <div className="text-end">
              <span className="text-xl sm:text-2xl font-black font-mono text-[#f5a623] block">
                {formatNumberByLang(parseFloat(totalWeightKg.toFixed(1)), currentLang)} {t.calcModal.kg}
              </span>
              <span className="text-xs font-mono text-[#b4c5e4]/80">
                ≈ {formatNumberByLang(parseFloat(totalWeightTon.toFixed(3)), currentLang)} {t.calcModal.ton}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleRequestQuote}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#3066be] hover:bg-[#3066be]/90 text-white !text-white transition-all shadow-md shadow-[#3066be]/20"
          >
            <span className="text-white !text-white">{currentLang === 'fa' ? 'استعلام قیمت این تناژ' : 'Request Proforma for this Tonnage'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-white !text-white" />
          </button>

          <button
            type="button"
            onClick={handleCopyResult}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-[#3c3744] hover:bg-[#3c3744]/80 text-[#fbfff1] border border-[#b4c5e4]/20 transition-colors"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-[#475569] dark:text-[#fbfff1]" />
            )}
            <span>{copied ? (currentLang === 'fa' ? 'کپی شد' : 'Copied') : (currentLang === 'fa' ? 'کپی مشخصات' : 'Copy')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
