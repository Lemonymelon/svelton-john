import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
        },
        migrations: {
            directory: './migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './seeds',
            extension: 'ts',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './dist/db/migrations', // For compiled output
            extension: 'ts',
        },
        seeds: {
            directory: './dist/db/seeds', // For compiled output
            extension: 'ts',
        },
    },
};

export default config;
