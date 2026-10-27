export type Language = 'fa' | 'en' | 'ar' | 'tr';

export interface MarketRate {
  id: string;
  name: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  category: 'currency' | 'precious_metals' | 'steel_iron';
  symbol: string;
  unit: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  priceIrr: number; // in Tomans / Rials
  priceUsd?: number;
  change24h: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  history: number[];
}

export interface ServiceSubCategory {
  id: string;
  name: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  description: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  specs: {
    thickness?: string;
    width?: string;
    standard?: string;
    coating?: string;
    dimensions?: string;
    tolerance?: string;
    pattern?: string;
    ribHeight?: string;
    coverWidth?: string;
    size?: string;
    material?: string;
    [key: string]: string | undefined;
  };
}

export interface ServiceItem {
  id: 'cold-rolled' | 'galvanized' | 'hot-rolled' | 'colored' | 'pickled' | 'deep-drawing' | 'stainless' | 'slitting' | 'shearing' | 'steel-deck' | 'hot-rolled-colored' | string;
  slug: string;
  image?: string;
  title: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  shortDesc: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  fullDesc: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  leadTime: string;
  minOrder: string;
  subCategories: ServiceSubCategory[];
  features: {
    fa: string[];
    en: string[];
    ar: string[];
    tr: string[];
  };
  technicalSpecs: {
    key: {
      fa: string;
      en: string;
      ar: string;
      tr: string;
    };
    value: string;
  }[];
  applications: {
    fa: string[];
    en: string[];
    ar: string[];
    tr: string[];
  };
}

export interface TeamMember {
  id: string;
  name: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  role: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  bio: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  experienceYears: number;
  expertise: string[];
  contactEmail: string;
  image?: string;
}

export interface CertificateItem {
  id: string;
  code: string;
  image?: string;
  title: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  badge: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  description: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  registrar: string;
  certNumber: string;
  issueDate: string;
  expiryDate: string;
  scope: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  highlights: {
    fa: string[];
    en: string[];
    ar: string[];
    tr: string[];
  };
}

export interface CatalogItem {
  id: string;
  code: string;
  serviceId: string;
  title: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  grade: string;
  standards: string;
  thicknessRange: string;
  widthRange: string;
  originFactory: string;
  packaging: string;
  inStock: boolean;
}

export interface BrochureCatalog {
  id: string;
  code: string;
  title: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  categoryLabel: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  fileSize: string; // e.g. '31 MB', '4 MB', '6 MB'
  version: string;
  pagesCount: number;
  coverTheme: 'navy-gold' | 'white-minimal' | 'amber-gold' | 'silver-steel' | 'blueprint-blue' | 'charcoal-red';
  coverTitle: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  coverSubtitle: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  downloadFileName: string;
  description: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  highlights: {
    fa: string[];
    en: string[];
    ar: string[];
    tr: string[];
  };
  tableOfContents?: {
    fa: string[];
    en: string[];
    ar: string[];
    tr: string[];
  };
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  excerpt: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  content: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  author: string;
  date: string;
  readTimeMin: number;
  category: string;
  tags: string[];
  imageUrl?: string;
}

export interface FAQItem {
  id: string;
  category: 'pricing' | 'terms' | 'quality' | 'delivery';
  question: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
  answer: {
    fa: string;
    en: string;
    ar: string;
    tr: string;
  };
}
