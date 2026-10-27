import { db } from '../src/lib/db';
console.log(db().prepare('SELECT collection, count(*) AS count FROM content GROUP BY collection').all());
