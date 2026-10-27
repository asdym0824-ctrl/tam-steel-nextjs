import { neon } from '@neondatabase/serverless';
let connection: ReturnType<typeof neon> | undefined;
export function db() {
 if (!connection) {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not configured');
  connection = neon(url);
 }
 return connection;
}
export async function query<T = Record<string, unknown>>(sql: string, parameters: unknown[] = []): Promise<T[]> {
 return await db().query(sql, parameters) as T[];
}
