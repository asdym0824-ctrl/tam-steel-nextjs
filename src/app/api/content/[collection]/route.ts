import { db } from '../../../../lib/db';
export const runtime = 'nodejs';
export async function GET(_: Request, { params }: { params: Promise<{collection:string}> }) {
 const {collection} = await params;
 if (!['services','catalog','brochures','articles','rates','team','certificates','faq'].includes(collection)) return Response.json({error:'Not found'}, {status:404});
 const rows = db().prepare('SELECT payload FROM content WHERE collection=? ORDER BY rowid').all(collection) as {payload:string}[];
 return Response.json({items:rows.map(row => JSON.parse(row.payload)), source: 'imported', live: false});
}
