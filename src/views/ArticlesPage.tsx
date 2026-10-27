import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  BookOpen,
  X,
  Tag
} from 'lucide-react';
import { Language, ArticleItem } from '../types';
import { articlesData } from '../data/articlesData';
import { localizeDigits } from '../utils/numberLocale';
import { translations } from '../i18n/translations';

interface ArticlesPageProps {
  currentLang: Language;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const allTags = Array.from(new Set(articlesData.flatMap((a) => a.tags)));

  const filteredArticles = articlesData.filter((article) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      article.title[currentLang].toLowerCase().includes(q) ||
      article.excerpt[currentLang].toLowerCase().includes(q);

    const matchesTag = activeTag === 'all' || article.tags.includes(activeTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#242129] py-10 sm:py-14 text-slate-900 dark:text-[#fbfff1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3066be]/15 dark:bg-[#3066be]/20 border border-[#3066be]/30 dark:border-[#3066be]/40 text-[#3066be] dark:text-[#b4c5e4] text-xs font-semibold mb-3">
            <Newspaper className="w-4 h-4 text-[#3066be]" />
            <span>{currentLang === 'fa' ? 'دانشنامه و مقالات متالورژی' : 'Metallurgical Insights'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#fbfff1] tracking-tight">
            {currentLang === 'fa' ? 'مقالات تخصصی و استانداردهای صنعت فولاد' : 'Technical Steel Articles & Standards'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#b4c5e4]/80 mt-2 leading-relaxed">
            {currentLang === 'fa'
              ? 'بررسی علمی گریدهای فولادی، راهنمای آزمون‌های آزمایشگاهی، کنترل تلرانس‌ها و تحلیل فنی بازار آهن‌آلات'
              : 'Scientific analysis of steel grades, lab test guidelines, tolerance controls, and market analysis'}
          </p>

          {/* Search & Tag filter */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#b4c5e4] absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'fa' ? 'جستجو در مقالات و گریدها...' : 'Search articles...'}
                className="w-full bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-xl ps-9 pe-3 py-2 text-xs sm:text-sm text-slate-800 dark:text-[#fbfff1] placeholder-slate-400 dark:placeholder-[#b4c5e4]/50 focus:outline-none focus:border-[#3066be] shadow-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 justify-center">
              <button
                onClick={() => setActiveTag('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  activeTag === 'all'
                    ? 'bg-[#3066be] text-white !text-white'
                    : 'bg-white dark:bg-[#2d2935] text-slate-600 dark:text-[#b4c5e4] border border-slate-200 dark:border-transparent hover:text-slate-900 dark:hover:text-[#fbfff1] hover:bg-slate-50 dark:hover:bg-[#3c3744]'
                }`}
              >
                {currentLang === 'fa' ? 'همه موضوعات' : 'All Topics'}
              </button>
              {allTags.slice(0, 4).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                    activeTag === tag
                      ? 'bg-[#3066be] text-white !text-white'
                      : 'bg-white dark:bg-[#2d2935] text-slate-600 dark:text-[#b4c5e4] border border-slate-200 dark:border-transparent hover:text-slate-900 dark:hover:text-[#fbfff1] hover:bg-slate-50 dark:hover:bg-[#3c3744]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              style={{ backgroundImage: 'none' }}
              className={`article-card article-card-${index + 1} bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/20 rounded-2xl p-6 sm:p-7 hover:border-[#3066be] dark:hover:border-[#3066be]/70 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl dark:shadow-none hover:-translate-y-1 relative overflow-hidden`}
            >
              <div>
                {/* Meta info: Date and Reading Time */}
                <div className="flex items-center justify-between text-xs mb-3.5 select-none">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#3066be] dark:text-[#93c5fd] shrink-0" />
                    <span className="text-slate-600 dark:text-[#cbd5e1] font-semibold">
                      {localizeDigits(article.date, currentLang)}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="text-slate-600 dark:text-[#cbd5e1] font-semibold">
                      {localizeDigits(article.readTimeMin, currentLang)} {currentLang === 'fa' ? 'دقیقه' : 'min'}
                    </span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#fbfff1] group-hover:text-[#3066be] dark:group-hover:text-[#93c5fd] transition-colors mb-2.5 leading-snug">
                  {article.title[currentLang]}
                </h3>

                {/* Article Excerpt */}
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-[#cbd5e1]/90 line-clamp-3 leading-relaxed mb-5">
                  {article.excerpt[currentLang]}
                </p>
              </div>

              <div>
                {/* Tags (Hashtags) - Capsule shaped */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-100 hover:bg-slate-200 dark:bg-[#1f1c25] dark:hover:bg-[#35303d] text-slate-700 dark:text-[#b4c5e4] dark:hover:text-[#fbfff1] px-3 py-0.5 rounded-full border border-slate-200/90 dark:border-[#b4c5e4]/20 transition-colors font-normal select-none"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Footer: Author and Read Article Action */}
                <div className="pt-3.5 border-t border-slate-200 dark:border-[#b4c5e4]/15 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-[#cbd5e1] flex items-center gap-1.5 text-[11px] font-medium">
                    <User className="w-3.5 h-3.5 text-[#3066be] dark:text-[#93c5fd] shrink-0" />
                    <span>{article.author}</span>
                  </span>
                  <span className="font-bold text-[#3066be] dark:text-[#93c5fd] group-hover:text-[#1d4ed8] dark:group-hover:text-white inline-flex items-center gap-1.5 transition-colors">
                    <span>{currentLang === 'fa' ? 'مطالعه مقاله' : 'Read Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white dark:bg-[#2d2935] border border-slate-200 dark:border-[#b4c5e4]/25 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 end-5 p-2 rounded-lg text-slate-500 dark:text-[#b4c5e4] hover:text-slate-900 dark:hover:text-[#fbfff1] hover:bg-slate-100 dark:hover:bg-[#3c3744]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-[#b4c5e4]/70">
                  <span className="font-mono">{localizeDigits(selectedArticle.date, currentLang)}</span>
                  <span>•</span>
                  <span>
                    {localizeDigits(selectedArticle.readTimeMin, currentLang)} {currentLang === 'fa' ? 'دقیقه زمان مطالعه' : 'min read'}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.author}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#fbfff1] leading-tight">
                  {selectedArticle.title[currentLang]}
                </h2>

                <div className="text-xs sm:text-sm text-slate-700 dark:text-[#b4c5e4]/90 leading-relaxed whitespace-pre-line space-y-4 font-light border-t border-slate-200 dark:border-[#b4c5e4]/15 pt-4">
                  {localizeDigits(selectedArticle.content[currentLang], currentLang)}
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-[#b4c5e4]/15 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#3066be] hover:bg-[#2554a0] text-white !text-white shadow-sm"
                  >
                    {currentLang === 'fa' ? 'بستن مقاله' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
