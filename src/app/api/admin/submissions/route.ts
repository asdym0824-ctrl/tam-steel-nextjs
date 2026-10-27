import { db } from '../../../../lib/db';
import { isAdmin, sameOrigin } from '../../../../lib/security';
import { z } from 'zod';
export const runtime = 'nodejs';
export async function GET(request: Request) {
 if (!isAdmin(request)) return Response.json({error:'Unauthorized'}, {status:401});
 const rows = db().prepare('SELECT * FROM submissions ORDER BY created_at DESC LIMIT 200').all() as {payload:string}[];
 return Response.json({items:rows.map(r => ({...r,payload:JSON.parse(r.payload)}))}, {headers:{'Cache-Control':'no-store'}});
}
export async function PATCH(request: Request) {
 if (!isAdmin(request)) return Response.json({error:'Unauthorized'}, {status:401});
 if (!sameOrigin(request)) return Response.json({error:'Invalid origin'}, {status:403});
 let body; try { body = await request.json(); } catch { return Response.json({error:'Invalid JSON'}, {status:400}); }
 const parsed = z.object({id:z.uuid(),status:z.enum(['new','reviewing','closed'])}).safeParse(body);
 if (!parsed.success) return Response.json({error:'Invalid input'}, {status:400});
 const result = db().prepare('UPDATE submissions SET status=? WHERE id=?').run(parsed.data.status,parsed.data.id);
 return Response.json({updated:result.changes}, {status:result.changes ? 200 : 404});
}
