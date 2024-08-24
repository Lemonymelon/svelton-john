import type { Knex } from 'knex';
import knex from 'knex';
import config from '../db/knexfile.js';

type Environment = 'development' | 'production';

const environment: Environment = (process.env.NODE_ENV as Environment) || 'development';

const db = knex(config[environment]);

export default db;
