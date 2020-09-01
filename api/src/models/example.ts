import { executeQuery } from '../lib/db';

/**
 * Execute a SQL query against the database and return the result
 *
 */
async function modelFunction(arg1): Promise<Array<Record<string, unknown>>> {
  const query = `
              SELECT column1, column2
              FROM table1
              WHERE column3 = ?
            `;

  const params = [arg1];

  const rows = await executeQuery(query, params);

  return rows;
}

export default {
  modelFunction,
};
