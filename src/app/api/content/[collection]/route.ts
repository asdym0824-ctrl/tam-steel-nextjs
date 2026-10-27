import { query } from '../../../../lib/db';
export const runtime = 'nodejs';
export async function GET(_: Request, { params }: { params: Promise<{collection:string}> }) {
 const {collection} = await params;
 if (!['services','catalog','brochures','articles','rates','team','certificates','faq'].includes(collection)) return Response.json({error:'Not found'}, {status:404});
 const rows = await query<{payload:string}>('SELECT payload FROM content WHERE collection=$1 ORDER BY position', [collection]);
 return Response.json({items:rows.map(row => JSON.parse(row.payload)), source: 'imported', live: false});
}
