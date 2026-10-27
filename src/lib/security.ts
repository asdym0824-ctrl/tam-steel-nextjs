import { timingSafeEqual, createHash } from 'node:crypto';
import { db } from './db';
export function isAdmin(request: Request) {
 const expected = process.env.ADMIN_TOKEN;
 const actual = request.headers.get('authorization')?.replace(/^Bearer /, '');
 if (!expected || expected.length < 32 || !actual) return false;
 const a = Buffer.from(actual), b = Buffer.from(expected);
 return a.length === b.length && timingSafeEqual(a, b);
}
export function sameOrigin(request: Request) {
 const origin = request.headers.get('origin');
 if (!origin) return true;
 try {
  const parsed = new URL(origin);
  // Next may use an internal hostname in request.url behind a proxy.
  return ['http:', 'https:'].includes(parsed.protocol) && parsed.host === request.headers.get('host');
 } catch { return false; }
}
export function allowSubmission(request: Request) {
 // Global durable limit; no trust in spoofable forwarded IP headers.
 const client = createHash('sha256').update('public-submissions').digest('hex');
 const now = Date.now();
 return db().transaction(() => {
 const row = db().prepare('SELECT count, reset_at FROM request_limits WHERE client=?').get(client) as {count:number; reset_at:number} | undefined;
 if (!row || row.reset_at <= now) { db().prepare('INSERT OR REPLACE INTO request_limits VALUES (?,1,?)').run(client, now+60000); return true; }
 if (row.count >= 30) return false;
 db().prepare('UPDATE request_limits SET count=count+1 WHERE client=?').run(client); return true;
 })();
}
