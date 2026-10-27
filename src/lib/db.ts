import Database from 'better-sqlite3';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { servicesData } from '../data/servicesData';
import { catalogItems, brochureCatalogs } from '../data/catalogData';
import { articlesData } from '../data/articlesData';
import { initialMarketRates } from '../data/marketRates';
import { teamMembers } from '../data/teamData';
import { certificatesData } from '../data/certificatesData';
import { faqData } from '../data/faqData';
let connection: Database.Database | undefined;
export function db() {
 if (connection) return connection;
 const filename = resolve(/* turbopackIgnore: true */ process.env.DATABASE_PATH || './data/tam-steel.sqlite');
 mkdirSync(dirname(filename), { recursive: true });
 const database = new Database(filename);
 database.pragma('journal_mode = WAL');
 database.exec(readFileSync(resolve('database/schema.sql'), 'utf8'));
 const insert = database.prepare('INSERT OR IGNORE INTO content(collection,id,payload) VALUES (?,?,?)');
 const collections = { services: servicesData, catalog: catalogItems, brochures: brochureCatalogs, articles: articlesData, rates: initialMarketRates, team: teamMembers, certificates: certificatesData, faq: faqData };
 database.transaction(() => {
  for (const [collection, items] of Object.entries(collections))
   items.forEach((item, index) => insert.run(collection, String('id' in item ? item.id : index), JSON.stringify(item)));
 })();
 connection = database;
 return database;
}
