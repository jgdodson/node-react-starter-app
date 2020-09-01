import config from 'config';
import util from 'util';
import { createPool, Pool, PoolConfig } from 'mysql';

const poolConfig: PoolConfig = {
  connectionLimit: config.get('mysql.maxConnections'),
  host: config.get('mysql.host'),
  user: config.get('mysql.user'),
  password: config.get('mysql.password'),
  database: config.get('mysql.database'),
  multipleStatements: false,
  charset: 'utf8mb4_unicode_ci',
  timezone: 'UTC',
};

const pool: Pool = createPool(poolConfig);

const executeQuery = util.promisify(pool.query).bind(pool);
const getConnection = util.promisify(pool.getConnection).bind(pool);

export { executeQuery, getConnection };
