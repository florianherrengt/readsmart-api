import { Pool, Query, QueryResult } from 'pg';
import { parse as parsePgConnectionString } from 'pg-connection-string';


const pgPool = new Pool(
  Object.assign({}, parsePgConnectionString('postgres://postgres@localhost:5432/postgres'), {
    max: 10,
    idleTimeoutMillis: 500,
  }),
);

pgPool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

const query = async (text, values?, callback?): Promise<QueryResult> => {
  console.log('query:', text, values);
  const results = await pgPool.query(text, values);
  return results
}
export { pgPool, query };
