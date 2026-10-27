import type { Metadata } from 'next';
import '../index.css';
export const metadata: Metadata = {
 title: 'تام فولاد | صنایع فولاد و خدمات بازرگانی',
 description: 'پرتال جامع خدمات، بازرگانی و استعلام قیمت صنایع تام فولاد',
 icons: { icon: '/images/tam_steel_logo.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return <html lang="fa" dir="ltr" className="light" suppressHydrationWarning><head>
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
 <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
 </head><body suppressHydrationWarning className="antialiased"><div id="root" dir="rtl">{children}</div></body></html>;
}
