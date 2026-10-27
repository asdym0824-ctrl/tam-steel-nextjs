import { randomUUID } from 'node:crypto';
import { query } from '../../../../lib/db';
import { schemas, type SubmissionKind } from '../../../../lib/validation';
import { sameOrigin, allowSubmission } from '../../../../lib/security';
export const runtime = 'nodejs';
export async function POST(request: Request, { params }: { params: Promise<{kind:string}> }) {
 const { kind } = await params;
 if (!Object.hasOwn(schemas, kind)) return Response.json({error:'Not found'}, {status:404});
 if (!sameOrigin(request)) return Response.json({error:'Invalid origin'}, {status:403});
 if (!request.headers.get('content-type')?.includes('application/json')) return Response.json({error:'JSON required'}, {status:415});
 try {
 const reader = request.body?.getReader();
 if (!reader) return Response.json({error:'Empty body'}, {status:400});
 const chunks: Uint8Array[] = []; let size = 0;
 while (true) { const {done,value} = await reader.read(); if(done) break; size += value.length; if(size > 450000) { await reader.cancel(); return Response.json({error:'Payload too large'}, {status:413}); } chunks.push(value); }
 const parsed = schemas[kind as SubmissionKind].safeParse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
 if (!parsed.success) return Response.json({error:'اطلاعات واردشده معتبر نیست.', details: parsed.error.flatten()}, {status:400});
 if (!(await allowSubmission(request))) return Response.json({error:'تعداد درخواست‌ها زیاد است؛ کمی بعد تلاش کنید.'}, {status:429});
 const id = randomUUID(); const trackingCode = `TF-${kind.slice(0,3).toUpperCase()}-${id}`; const createdAt = new Date().toISOString();
 await query('INSERT INTO submissions(id,kind,tracking_code,payload,created_at) VALUES ($1,$2,$3,$4,$5)', [id,kind,trackingCode,JSON.stringify(parsed.data),createdAt]);
 return Response.json({trackingCode, createdAt}, {status:201, headers:{'Cache-Control':'no-store'}});
 } catch (error) {
 if (error instanceof SyntaxError) return Response.json({error:'Invalid JSON'}, {status:400});
 console.error('Submission failed', error instanceof Error ? error.message : 'unknown');
 return Response.json({error:'ثبت درخواست انجام نشد؛ دوباره تلاش کنید.'}, {status:500});
 }
}
