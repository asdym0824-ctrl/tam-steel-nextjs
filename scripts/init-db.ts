import nextEnv from '@next/env';
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { collections } from '../src/lib/seed-data';
nextEnv.loadEnvConfig(process.cwd());
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error('Configure DATABASE_URL first');
const sql = neon(url);
const schema = readFileSync('database/schema.sql', 'utf8').split(';').map(s => s.trim()).filter(Boolean);
const seed: {collection:string; id:string; payload:string; position:number}[] = [];
for (const [collection, items] of Object.entries(collections)) items.forEach((item,index) => seed.push({collection,id:String('id' in item ? item.id : index),payload:JSON.stringify(item),position:index}));
await sql.transaction([
 ...schema.map(statement => sql.query(statement, [])),
 sql.query(`INSERT INTO content(collection,id,payload,position)
 SELECT collection,id,payload,position FROM jsonb_to_recordset($1::jsonb) AS x(collection text,id text,payload text,position integer)
 ON CONFLICT(collection,id) DO NOTHING`, [JSON.stringify(seed)]),
]);
console.log(await sql`SELECT collection, count(*) AS count FROM content GROUP BY collection ORDER BY collection`);
