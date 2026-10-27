import { timingSafeEqual, createHash } from 'node:crypto';
import { query } from './db';
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
export async function allowSubmission(_request: Request) {
 const client = createHash('sha256').update('public-submissions').digest('hex');
 const now = Date.now();
 const rows = await query(`INSERT INTO request_limits(client,count,reset_at) VALUES ($1,1,$2)
 ON CONFLICT(client) DO UPDATE SET
 count = CASE WHEN request_limits.reset_at <= $3 THEN 1 ELSE request_limits.count+1 END,
 reset_at = CASE WHEN request_limits.reset_at <= $3 THEN $2 ELSE request_limits.reset_at END
 WHERE request_limits.reset_at <= $3 OR request_limits.count < 30
 RETURNING count`, [client,now+60000,now]);
 return rows.length > 0;
}
