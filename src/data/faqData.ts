import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  {
    id: 'faq-pricing',
    category: 'pricing',
    question: {
      fa: 'نحوه محاسبه قیمت روز ورق‌ها و مالیات بر ارزش افزوده چگونه است؟',
      en: 'How are daily steel prices and VAT calculated?',
      ar: 'كيف يتم احتساب الأسعار اليومية وضريبة القيمة المضافة؟',
      tr: 'Günlük sac fiyatları ve KDV nasıl hesaplanmaktadır?',
    },
    answer: {
      fa: 'قیمت‌های پایه اعلامی در سایت و تابلوی زنده قیمت‌ها بر مبنای تحویل درب انبار/کارخانه و بدون احتساب مالیات بر ارزش افزوده (۱۰٪ قانونی) است. در فاکتور رسمی و صورتحساب قطعی، مبلغ دقیق مالیات، هزینه باسکول دیجیتال و بسته‌بندی پالت به صورت کاملاً شفاف و تفکیک‌شده درج می‌گردد.',
      en: 'Quoted benchmark prices represent ex-works warehouse gate rates excluding statutory 10% VAT. Official sales invoices itemize tax, weighbridge certificates, and strapping palletizing fees transparently.',
      ar: 'الأسعار المعروضة هي أسعار تسليم باب المستودع ولا تشمل ضريبة القيمة المضافة 10%. تتضمن الفاتورة الرسمية بياناً تفصيلياً بالضريبة ورسوم الميزان والتغليف بكل شفافية.',
      tr: 'Listelenen fiyatlar depo teslim baz fiyatlar olup %10 yasal KDV hariçtir. Resmi faturada vergi, kantar fişi ve paletleme masrafları şeffaf biçimde ayrı kalemler olarak gösterilir.',
    },
  },
  {
    id: 'faq-terms',
    category: 'terms',
    question: {
      fa: 'شرایط پرداخت، پیش‌پرداخت و خرید اعتباری (LC یا چکی) چیست؟',
      en: 'What are the payment terms, advances, and credit options (LC or post-dated checks)?',
      ar: 'ما هي شروط السداد، الدفعات المقدمة وخيارات التسهيلات الائتمانية (اعتمادات مستندية أو شيكات)؟',
      tr: 'Ödeme koşulları, avans ve vadeli alım seçenekleri (akreditif veya çek) nelerdir?',
    },
    answer: {
      fa: 'تسویه به دو روش نقدی و اعتباری انجام می‌پذیرد. در خریدهای نقدی، با پرداخت پیش‌پرداخت (معمولاً ۳۰ الی ۵۰ درصد) بار فرآوری و پس از صدور برگه باسکول و تسویه نهایی بارگیری می‌شود. برای شرکت‌های تولیدی، پیمانکاران عمرانی معتبر و مشتریان دائم، امکان گشایش خط اعتباری اسنادی (LC ریالی) و خرید چکی مدت‌دار فراهم است.',
      en: 'Transactions are processed via cash or corporate credit. Standard orders require a 30-50% advance before processing, with remaining balance settled upon final weighbridge issuance. Approved industrial manufacturers can utilize Rial Letters of Credit (LC) and terms.',
      ar: 'تتم التسوية نقداً أو بالائتمان. في الدفع النقدي، يتم سداد دفعة مقدمة (30 إلى 50%) لبدء المعالجة، ثم تسوية المتبقي بعد وزن الشحنة. كما تتوفر خطوط اعتمادات مستندية محلية وتسهيلات بالشيكات للشركات المعتمدة.',
      tr: 'Ödemeler peşin veya vadeli olarak yapılabilir. Peşin alımlarda %30-50 avansla işleme başlanır ve kantar fişi sonrası bakiye kapatılır. Onaylı üreticiler için akreditif (LC) ve vadeli çek imkanı sunulmaktadır.',
    },
  },
  {
    id: 'faq-min-order',
    category: 'pricing',
    question: {
      fa: 'حداقل مقدار سفارش (MOQ) برای انواع ورق‌ها و خدمات اسلیتینگ چقدر است؟',
      en: 'What is the Minimum Order Quantity (MOQ) for sheets and slitting services?',
      ar: 'ما هو الحد الأدنى للطلب (MOQ) لمختلف أنواع الألواح وخدمات التقطيع؟',
      tr: 'Sac ürünleri ve dilme hizmetleri için minimum sipariş miktarı (MOQ) nedir?',
    },
    answer: {
      fa: 'حداقل مقدار سفارش بسته به نوع محصول متفاوت است: برای ورق‌های شیت استاندارد، حداقل سفارش ۱ تن؛ برای کلاف‌های مادر خام، یک کلاف کامل (بین ۳ تا ۲۵ تن)؛ برای خدمات نواربری (اسلیتینگ)، حداقل ۳ تن کویل ورودی؛ و برای ورق‌های عرشه فولادی حداقل ۱۰۰ متر مربع می‌باشد.',
      en: 'Minimum Order Quantities depend on product type: standard sheared sheets require min 1 MT; raw master coils are sold as whole coils (3 to 25 MT); precision slitting services require a minimum 3 MT input coil; and steel decking requires min 100 sqm.',
      ar: 'يختلف الحد الأدنى للطلب حسب المنتج: للألواح المقطوعة القياسية طن واحد كحد أدنى؛ للفائف الخام لفافة كاملة (3 إلى 25 طناً)؛ لخدمات التقطيع الطولي 3 أطنان كحد أدنى للملف؛ ولأسقف العرشة 100 متر مربع.',
      tr: 'Minimum sipariş miktarı ürüne göre değişir: standart boy kesilmiş saclarda en az 1 ton; ana rulolarda tam 1 rulo (3-25 ton); dilme hizmetinde en az 3 tonluk rulo girişi; trapez saclarda ise minimum 100 m² sipariş kabul edilir.',
    },
  },
  {
    id: 'faq-quality',
    category: 'quality',
    question: {
      fa: 'نحوه کنترل باسکول، وزن بار و تلرانس‌های متالورژی MTC به چه صورت است؟',
      en: 'How are weighbridge scaling, consignment weights, and MTC metallurgical tolerances verified?',
      ar: 'كيف يتم التحقق من أوزان الميزان وشهادات الفحص المخبري والتفاوتات الميتالورجية؟',
      tr: 'Kantar tartımı, net ağırlık kontrolü ve MTC tolerans doğrulaması nasıl yapılmaktadır?',
    },
    answer: {
      fa: 'کلیه محموله‌های خروجی تام فولاد بر روی باسکول دیجیتال استاندارد ۶۰ تنی با استاندارد ملی ایران توزین و قبض رسمی باسکول شامل وزن ناخالص، وزن خالی تریلی و وزن خالص بار صادر می‌شود. کارفرما می‌تواند در مقصد نیز بار را با باسکول معتبر کنترل نماید؛ تلرانس مجاز انحراف باسکول مطابق استاندارد کمتر از ۰.۲ درصد وزن کل است.',
      en: 'All outbound dispatches are scaled on certified 60-ton digital weighbridges. A formal receipt listing gross, tare, and net weights is issued alongside the original Mill Test Certificate (MTC). Permissible destination weighbridge tolerance is strictly under 0.2%.',
      ar: 'يتم وزن جميع الشحنات الخارجة على موازين إلكترونية معتمدة حمولة 60 طناً، ويصدر إيصال رسمي بالأوزان القائمة والصافية مع شهادة MTC الأصلية. نسبة التفاوت المقبولة بين ميزان المصنع والعميل أقل من 0.2%.',
      tr: 'Tüm sevkiyatlar 60 tonluk kalibreli dijital kantarlarda tartılır. Dara, brüt ve net ağırlığı gösteren resmi kantar fişi MTC test sertifikasıyla birlikte teslim edilir. Kabul edilebilir varış kantar toleransı %0.2 altındadır.',
    },
  },
  {
    id: 'faq-delivery',
    category: 'delivery',
    question: {
      fa: 'زمان تحویل سفارشات موجود در انبار و سفارشات فرآوری اختصاصی چقدر است؟',
      en: 'What is the lead time for in-stock orders versus custom slitting / shearing processing?',
      ar: 'ما هي مدة تسليم الطلبات المتوفرة في المستودع مقابل الطلبات المخصصة للتقطيع والتشكيل؟',
      tr: 'Depo stoklu siparişler ile özel dilme/kesim siparişlerinin teslim süreleri nasıldır?',
    },
    answer: {
      fa: 'برای اقلام موجود در انبار، ارسال ظرف ۱۲ الی ۲۴ ساعت کاری انجام می‌شود. برای سفارشات نواربری اختصاصی یا شیت‌کردن با ابعاد سفارشی، زمان پردازش خطوط بین ۲۴ تا ۴۸ ساعت بوده و بلافاصله با ناوگان اختصاصی تریلی کفی به محل پروژه یا کارخانه کارفرما اعزام می‌گردد.',
      en: 'Standard in-stock commodities dispatch within 12 to 24 business hours. Custom coil slitting, strip deburring, or cut-to-length shearing orders process within 24 to 48 hours and dispatch via dedicated flatbed trailers directly to client facilities.',
      ar: 'للمنتجات الجاهزة في المستودع، يتم الشحن خلال 12 إلى 24 ساعة عمل. لطلبات التقطيع الطولي أو القص بمقاسات خاصة، تستغرق المعالجة من 24 إلى 48 ساعة ويتم الشحن فوراً عبر أسطول الشاحنات المجهزة.',
      tr: 'Stokta hazır ürünler 12-24 iş saati içinde sevk edilir. Özel rulo dilme veya özel boy kesme siparişlerinde üretim 24-48 saat sürer ve doğrudan açık kasa tırlarla şantiyenize veya fabrikanıza sevk edilir.',
    },
  },
  {
    id: 'faq-transport',
    category: 'delivery',
    question: {
      fa: 'آیا امکان ارسال بار به شهرستان‌ها و گمرکات مرزی صادراتی وجود دارد؟',
      en: 'Do you provide nationwide intercity delivery and border customs export dispatch?',
      ar: 'هل تتوفر خدمات الشحن إلى كافة المحافظات والمنافذ الجمركية للتصدير؟',
      tr: 'Tüm şehirlere ve sınır gümrük kapılarına ihracat sevkiyatı yapıyor musunuz?',
    },
    answer: {
      fa: 'بله، واحد ترابری و لجستیک تام فولاد با همکاری بیش از ۵۰ شرکت باربری معتبر و ناوگان اختصاصی تریلی کفی و ترانزیت، امکان حمل ایمن همراه با بیمه‌نامه کامل بار به سراسر کشور و همچنین کلیه گمرکات خروجی (باشماق، پرویزخان، مهران، سرخس، بازرگان و بندرعباس) با پالت‌بندی صادراتی ضد رطوبت را دارد.',
      en: 'Yes. Tam Foulad logistics partners with certified freight carriers and transit trailer fleets to deliver fully insured cargo nationwide and directly to all border customs points (Bashmaq, Mehran, Bazargan, Bandar Abbas) with export waterproof packaging.',
      ar: 'نعم، يوفر قطاع اللوجستيات أسطول شاحنات مجهز لنقل الشحنات المؤمنة بالكامل إلى جميع المحافظات والمنافذ الجمركية الحدودية (مهران، باشماق، بازركان، بندر عباس) مع تغليف تصديري مقاوم للرطوبة.',
      tr: 'Evet. Tam Foulad lojistik birimi, 50\'den fazla anlaşmalı nakliye firması ile tam sigortalı sevkiyatları tüm illere ve tüm sınır gümrük kapılarına (Bazargan, Mehran, Bandar Abbas vb.) ihracat standardında paletlemeyle ulaştırmaktadır.',
    },
  },
];
