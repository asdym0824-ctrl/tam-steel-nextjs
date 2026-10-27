# تام فولاد — Next.js

انتقال پروژه پیوست React/Vite به Next.js App Router با حفظ صفحات، تصاویر، چهار زبان، قالب روشن/تاریک، کاتالوگ و محاسبه‌گر فولاد.

## اجرا

به Node.js نسخه 24 LTS و npm نیاز دارید.

```bash
npm ci
cp .env.example .env.local
openssl rand -hex 32
```

خروجی دستور آخر را در `ADMIN_TOKEN` فایل `.env.local` قرار دهید. کلید را در گیت کامیت نکنید. سپس:

```bash
npm run db:init
npm run dev
```

سایت در `http://localhost:3000` و مدیریت در `/admin` است. کلید مدیریت فقط در حافظه صفحه نگه داشته می‌شود. برای استفاده عمومی HTTPS لازم است.

`db:init` ساختار جداول و ۶۲ رکورد اولیه را ایجاد می‌کند؛ اجرای مجدد رکوردهای موجود را بازنویسی نمی‌کند. این اسکریپت `.env.local` را می‌خواند و برای ساخت جداول از `DATABASE_URL_UNPOOLED` استفاده می‌کند. سرور از `DATABASE_URL` استفاده می‌کند.

برای اجرای محلی، اتصال PostgreSQL متعلق به خودتان را در `.env.local` قرار دهید؛ فایل دیتابیس محلی لازم نیست.

## امکانات سرور و دیتابیس

- `POST /api/submissions/quotes`: ثبت استعلام و تولید کد پیگیری سرور
- `POST /api/submissions/partnerships`: ثبت درخواست همکاری
- `POST /api/submissions/contracts`: ثبت مشخصات، رضایت و تصویر امضا
- `GET /api/content/{collection}`: داده‌های services، catalog، brochures، articles، rates، team، certificates و faq
- `GET /api/admin/submissions`: دریافت ۲۰۰ درخواست آخر با هدر `Authorization: Bearer <ADMIN_TOKEN>`
- `PATCH /api/admin/submissions`: تغییر وضعیت با JSON شامل `id` و `status` (`new`، `reviewing` یا `closed`)

اعتبارسنجی سمت سرور با Zod، نرمال‌سازی ارقام فارسی/عربی، پرس‌وجوهای پارامتری، محدودیت اندازه ورودی و محدودیت عمومی ۳۰ ثبت در دقیقه اجرا شده است. پنل مدیریت بدون تنظیم کلید حداقل ۳۲ کاراکتری بسته است. درخواست‌های ثبت‌شده و تصویر امضا عمومی نیستند.

ساختار SQL در `database/schema.sql` و ورود داده‌های اولیه در `src/lib/db.ts` است. داده‌های اصلی سایت نیز برای رندر اولیه در `src/data` حفظ شده‌اند. نرخ‌های بازار از دیتابیس خوانده می‌شوند، اما نرخ‌های پیوست مرجع هستند و سرویس قیمت زنده متصل نشده است.

ثبت تصویر امضا به معنی احراز هویت یا امضای الکترونیکی معتبر حقوقی نیست. احراز هویت، OTP و اتصال به ارائه‌دهنده معتبر امضای دیجیتال در این پروژه پیاده‌سازی نشده است. واتس‌اپ و دانلودهای قبلی طبق محتوای پیوست حفظ شده‌اند؛ فرم استعلام اکنون در دیتابیس ثبت می‌شود.

## آزمون و بیلد

```bash
npm test
npm run typecheck
npm run build
npm start
```

## استقرار و نگهداری

این نسخه برای Vercel و دیتابیس پایدار Neon آماده شده است. پروژه ورسل `tam-steel-nextjs` و دیتابیس `tam-steel-db` در منطقه فرانکفورت قرار دارند. مقادیر `DATABASE_URL` و `DATABASE_URL_UNPOOLED` با اتصال Neon در تنظیمات ورسل ایجاد شده‌اند. کلید `ADMIN_TOKEN` به‌صورت Secret در محیط Production تنظیم شده است؛ برای انتخاب کلید شخصی، آن را در تنظیمات Environment Variables ورسل جایگزین و دوباره Deploy کنید.

```bash
vercel link --project tam-steel-nextjs --scope asdym0824-ctrl
vercel env pull .env.local --yes
npm run db:init
vercel deploy --prod
```

اطلاعات اتصال، کلیدها و فایل‌های `.env.local` و `.vercel` در گیت کامیت نمی‌شوند. انتشار فعلی با CLI انجام می‌شود؛ انتشار خودکار بعد از هر Push نیازمند اتصال GitHub به Vercel در داشبورد است.

## پوش در GitHub

```bash
gh repo create tam-steel-nextjs --private --source=. --remote=origin --push
```

ساخت پروژه از فایل پیوست انجام شده است؛ متن‌های داخل آن به‌عنوان محتوای پروژه استفاده شده‌اند.
