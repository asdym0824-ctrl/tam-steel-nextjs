import React from 'react';
import { BrochureCatalog, Language } from '../types';
import { localizeDigits } from '../utils/numberLocale';

interface CatalogBookletMockupProps {
  catalog: BrochureCatalog;
  currentLang: Language;
  isHovered?: boolean;
  size?: 'normal' | 'large';
}

export const CatalogBookletMockup: React.FC<CatalogBookletMockupProps> = ({
  catalog,
  currentLang,
  isHovered = false,
  size = 'normal',
}) => {
  const isLarge = size === 'large';

  // Specific cover designs matching the themes:
  const renderCover = () => {
    switch (catalog.coverTheme) {
      case 'navy-gold':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0c1836] via-[#13234d] to-[#0a1126] text-white p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
            {/* Geometric Gold Angular Stripes like cover 1 in Capture.JPG */}
            <div className="absolute -top-10 -end-10 w-36 h-36 bg-[#f59e0b] transform rotate-45 opacity-90 shadow-lg pointer-events-none" />
            <div className="absolute top-12 -end-8 w-24 h-24 bg-[#090c9b]/60 transform rotate-45 pointer-events-none" />
            <div className="absolute -bottom-12 -start-12 w-32 h-32 bg-[#f59e0b]/20 transform rotate-45 pointer-events-none" />

            {/* Top Brand Block */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-[#f59e0b] flex items-center justify-center p-0.5 text-black font-black text-[9px] shadow-sm">
                  TF
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-wider leading-none text-[#fbfff1]">TAM FOULAD</div>
                  <div className="text-[7.5px] text-[#f59e0b] font-medium leading-tight">صنایع تام فولاد</div>
                </div>
              </div>
              <span className="text-[8px] font-mono text-white/60 bg-white/10 px-1.5 py-0.5 rounded">
                {localizeDigits('1403', currentLang)}
              </span>
            </div>

            {/* Central Industrial Hexagonal / Angled Photos Container */}
            <div className="relative z-10 my-auto py-2 flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-[#f59e0b] shadow-xl rotate-[-3deg] bg-slate-900">
                <img
                  src="/images/steel_coils_factory.jpg"
                  alt="کویل تام فولاد"
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1 inset-x-0 text-center text-[7px] font-bold text-[#f59e0b] uppercase tracking-wider">
                  Precision Coils
                </span>
              </div>
            </div>

            {/* Bottom Title Banner */}
            <div className="relative z-10 bg-black/40 backdrop-blur-xs p-2 rounded-lg border border-white/10">
              <div className="text-[10px] sm:text-[11px] font-black text-[#fbfff1] leading-tight line-clamp-1">
                {catalog.coverTitle[currentLang]}
              </div>
              <div className="text-[7.5px] sm:text-[8px] text-[#f59e0b] mt-0.5 font-medium leading-tight line-clamp-1">
                {catalog.coverSubtitle[currentLang]}
              </div>
              <div className="mt-1 flex justify-between items-center text-[7px] text-white/60 font-mono">
                <span>{catalog.code}</span>
                <span>{localizeDigits(catalog.pagesCount, currentLang)} P</span>
              </div>
            </div>
          </div>
        );

      case 'white-minimal':
        return (
          <div className="w-full h-full bg-[#ffffff] text-slate-900 p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
            {/* Top Minimalist Brand Wordmark like cover 2 in Capture.JPG */}
            <div className="text-center pt-2">
              <div className="text-xl sm:text-2xl font-black tracking-tight text-[#b91c1c] font-sans">
                FF-CO
              </div>
              <div className="text-[7px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">
                TAM FOULAD INDUSTRIAL GROUP
              </div>
            </div>

            {/* Central Product Hero like middle image in Capture.JPG (Metallic steel ring/fastener clamp) */}
            <div className="my-auto py-2 flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                {/* Metallic coil / clamp representation */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-slate-300 shadow-inner p-1 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400">
                  <div className="w-14 h-14 rounded-full border-2 border-slate-400 flex items-center justify-center bg-slate-50 shadow-sm overflow-hidden">
                    <img
                      src="/images/services/slitting.jpg"
                      alt="نواربری فولاد"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Soft reflection shadow */}
                <div className="absolute -bottom-2 w-16 h-3 bg-slate-400/30 rounded-full blur-xs" />
              </div>
            </div>

            {/* Bottom Red Accent Stripe like Capture.JPG */}
            <div className="pt-2 border-t-2 border-[#b91c1c]">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[9px] sm:text-[10px] font-black text-slate-900 leading-tight">
                    {catalog.coverTitle[currentLang]}
                  </div>
                  <div className="text-[7px] text-slate-500 font-medium">
                    25 Years Sustainable Quality
                  </div>
                </div>
                <div className="text-[7px] font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded font-bold">
                  {catalog.code}
                </div>
              </div>
            </div>
          </div>
        );

      case 'amber-gold':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#f59e0b] via-[#ea8c04] to-[#d97706] text-[#1c1922] p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
            {/* Subtle background grain & industrial lines */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            <div className="absolute top-0 end-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

            {/* Top Emblem like cover 3 in Capture.JPG */}
            <div className="relative z-10 flex justify-between items-center">
              <div className="text-start">
                <span className="text-[8px] uppercase tracking-widest font-black text-black/60 block">
                  TECHNICAL CATALOG
                </span>
                <span className="text-[11px] font-black tracking-tight text-[#1c1922] block leading-tight">
                  {catalog.coverTitle[currentLang]}
                </span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-[#1c1922] text-[#f59e0b] flex items-center justify-center font-black text-[10px] shadow-md">
                TF
              </div>
            </div>

            {/* Central Icon Motif matching third brochure in screenshot */}
            <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#1c1922]/15 border border-black/20 flex items-center justify-center backdrop-blur-xs shadow-inner mb-2 p-2">
                <img
                  src="/images/tam_steel_logo.svg"
                  alt="Tam Steel Logo"
                  className="w-full h-full object-contain filter invert contrast-150 opacity-80"
                />
              </div>
              <span className="text-[8px] font-black tracking-wider text-black/80 uppercase font-sans">
                TAM FOULAD INDUSTRIAL CO.
              </span>
            </div>

            {/* Bottom Clean Gold Minimal Label */}
            <div className="relative z-10 border-t border-black/15 pt-2 flex justify-between items-center text-[7.5px] font-bold text-black/80">
              <span className="uppercase tracking-wider">GENERAL CATALOG [EN / FA]</span>
              <span className="font-mono">{catalog.code}</span>
            </div>
          </div>
        );

      case 'silver-steel':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#334155] via-[#1e293b] to-[#0f172a] text-white p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-[#3066be] to-cyan-400" />
            <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-[8px] font-mono font-bold text-cyan-400 tracking-wider">COLD-ROLLED STEEL</span>
              <span className="text-[7.5px] text-white/60 bg-white/10 px-1 rounded font-mono">DC01 / ST12</span>
            </div>

            <div className="relative z-10 my-auto py-2 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl overflow-hidden border border-cyan-400/40 shadow-xl bg-slate-800">
                <img
                  src="/images/services/cold-rolled.jpg"
                  alt="ورق روغنی"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[9px] font-bold text-cyan-300 block mt-2">EN 10130 CERTIFIED</span>
            </div>

            <div className="relative z-10 bg-black/40 p-2 rounded-lg border border-white/10">
              <div className="text-[10px] font-black text-white leading-tight">
                {catalog.coverTitle[currentLang]}
              </div>
              <div className="text-[7.5px] text-slate-300 mt-0.5 line-clamp-1">
                {catalog.coverSubtitle[currentLang]}
              </div>
            </div>
          </div>
        );

      case 'blueprint-blue':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0c2340] via-[#12335c] to-[#0a1a30] text-white p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
            {/* Blueprint Grid Lines Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

            <div className="relative z-10 flex justify-between items-center border-b border-sky-400/20 pb-2">
              <span className="text-[8px] font-mono font-bold text-sky-300 tracking-wider">ENGINEERING SPECS</span>
              <span className="text-[7.5px] text-sky-200/80 bg-sky-900/50 px-1 rounded font-mono">Z180 - Z275</span>
            </div>

            <div className="relative z-10 my-auto py-2 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl overflow-hidden border border-sky-400/40 shadow-xl bg-slate-900">
                <img
                  src="/images/services/steel-deck.jpg"
                  alt="عرشه فولادی"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[9px] font-bold text-sky-300 block mt-2">RIB 65 / 75 MM</span>
            </div>

            <div className="relative z-10 bg-sky-950/60 p-2 rounded-lg border border-sky-400/20">
              <div className="text-[10px] font-black text-white leading-tight">
                {catalog.coverTitle[currentLang]}
              </div>
              <div className="text-[7.5px] text-sky-200 mt-0.5 line-clamp-1">
                {catalog.coverSubtitle[currentLang]}
              </div>
            </div>
          </div>
        );

      case 'charcoal-red':
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b] text-white p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden select-none">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#ef4444]" />

            <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-[8px] font-mono font-bold text-[#ef4444] tracking-wider">LABORATORY MTC</span>
              <span className="text-[7.5px] text-white/60 bg-white/10 px-1 rounded font-mono">DIN 59232</span>
            </div>

            <div className="relative z-10 my-auto py-2 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-xl overflow-hidden border border-[#ef4444]/40 shadow-xl bg-zinc-900 flex items-center justify-center p-2">
                <img
                  src="/images/services/stainless.jpg"
                  alt="تست متالورژی"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[9px] font-bold text-[#fca5a5] block mt-2">ACCREDITED TESTING</span>
            </div>

            <div className="relative z-10 bg-black/50 p-2 rounded-lg border border-white/10">
              <div className="text-[10px] font-black text-white leading-tight">
                {catalog.coverTitle[currentLang]}
              </div>
              <div className="text-[7.5px] text-zinc-300 mt-0.5 line-clamp-1">
                {catalog.coverSubtitle[currentLang]}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${isLarge ? 'w-64 h-80 sm:w-72 sm:h-96' : 'w-48 h-60 sm:w-56 sm:h-72'}`}>
      {/* 1. Realistic Floor / Studio Ambient Drop Shadow */}
      <div
        className={`absolute bottom-1 sm:bottom-2 -start-2 sm:-start-4 -end-2 sm:-end-4 rounded-full bg-black/40 blur-md sm:blur-lg transform scale-y-40 -rotate-3 transition-all duration-300 ${
          isHovered ? 'scale-x-105 opacity-70 translate-y-1' : 'scale-x-95 opacity-55'
        }`}
        style={{ height: isLarge ? '26px' : '20px' }}
      />

      {/* 2. 3D Angled Perspective Booklet */}
      <div
        className={`relative z-10 rounded-r-md rounded-l-xs overflow-hidden transition-all duration-300 ease-out ${
          isHovered ? 'transform -translate-y-2 scale-[1.03]' : ''
        }`}
        style={{
          width: isLarge ? '195px' : '155px',
          height: isLarge ? '275px' : '220px',
          transform: isHovered
            ? 'perspective(1200px) rotateY(-13deg) rotateX(8deg) rotateZ(-3deg)'
            : 'perspective(1200px) rotateY(-18deg) rotateX(12deg) rotateZ(-6deg)',
          transformOrigin: 'bottom center',
          // Realistic stacked paper edge depth along right and bottom:
          boxShadow: `
            1px 1px 0px #e2e8f0,
            2px 2px 0px #cbd5e1,
            3px 3px 0px #cbd5e1,
            4px 4px 0px #94a3b8,
            5px 5px 0px #94a3b8,
            6px 6px 0px #64748b,
            12px 18px 25px -4px rgba(0, 0, 0, 0.45)
          `,
        }}
      >
        {/* Bound Spine Ridge on the left */}
        <div
          className="absolute inset-y-0 start-0 w-3 z-30 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0.25) 20%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          }}
        />

        {/* Glossy Cover Sheen Reflex */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* Render Cover Artwork */}
        {renderCover()}
      </div>
    </div>
  );
};
