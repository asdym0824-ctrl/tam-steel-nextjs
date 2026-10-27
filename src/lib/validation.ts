import { z } from 'zod';
const text = z.string().trim().max(500);
const digits = (s: string) => s.replace(/[۰-۹٠-٩]/g, c => String('۰۱۲۳۴۵۶۷۸۹'.includes(c) ? '۰۱۲۳۴۵۶۷۸۹'.indexOf(c) : '٠١٢٣٤٥٦٧٨٩'.indexOf(c)));
const phone = text.transform(digits).refine(s => /^\+?[0-9 ()-]{7,25}$/.test(s), 'Invalid phone number');
const optional = text.optional().default('');
export const schemas = {
 quotes: z.object({ name: text.min(2), phone, company: optional, city: optional, product: optional, specs: z.string().trim().max(5000).optional().default(''), tonnage: optional }),
 partnerships: z.object({ fullName: text.min(2), phone, email: z.union([z.email(), z.literal('')]).optional().default(''), role: z.enum(['supplier','logistics','contractor','agent']), message: z.string().trim().max(5000).optional().default('') }),
 contracts: z.object({ clientName: text.min(2), nationalId: text.transform(digits).refine(s => /^\d{10,11}$/.test(s)), serviceType: text.min(1), tonnage: text.transform(digits).refine(s => Number.isFinite(Number(s)) && Number(s) > 0), deliveryLocation: text.min(2), agreedTerms: z.literal(true), signature: z.string().max(400000).regex(/^data:image\/png;base64,[A-Za-z0-9+/=]+$/) }),
};
export type SubmissionKind = keyof typeof schemas;
