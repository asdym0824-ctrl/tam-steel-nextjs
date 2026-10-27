import { Language } from '../types';

export const toPersianDigits = (input: string | number): string => {
  if (input === null || input === undefined) return '';
  const pDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input
    .toString()
    .replace(/[0-9]/g, (d) => pDigits[+d])
    .replace(/[٠-٩]/g, (w) => pDigits[w.charCodeAt(0) - 1632]);
};

export const toEnglishDigits = (input: string | number): string => {
  if (input === null || input === undefined) return '';
  return input
    .toString()
    .replace(/[۰-۹]/g, (w) => (w.charCodeAt(0) - 1776).toString())
    .replace(/[٠-٩]/g, (w) => (w.charCodeAt(0) - 1632).toString());
};

/**
 * Localizes any number or string containing digits according to the selected language:
 * - 'fa' (Persian): strictly Persian digits (۰۱۲۳۴۵۶۷۸۹)
 * - 'en', 'ar', 'tr' (English, Arabic, Turkish): strictly English digits (0123456789)
 */
export const localizeDigits = (text: string | number, lang: Language): string => {
  if (text === null || text === undefined) return '';
  if (lang === 'fa') {
    return toPersianDigits(text);
  }
  return toEnglishDigits(text);
};

/**
 * Formats a number with thousands separators and the correct digit system:
 * - 'fa': '۲۵۰,۰۰۰'
 * - 'en', 'ar', 'tr': '250,000'
 */
export const formatNumberByLang = (
  num: number,
  lang: Language,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string => {
  const enFormatted = new Intl.NumberFormat('en-US', options).format(num);
  if (lang === 'fa') {
    return toPersianDigits(enFormatted);
  }
  return enFormatted;
};
