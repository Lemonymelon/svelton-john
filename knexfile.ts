import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },

    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};

export default config;
