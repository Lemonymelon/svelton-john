import type { Knex } from 'knex';
import { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, } from '$env/static/private';


const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            // port: Number(DB_PORT),
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
    // production: {
    //     client: 'pg',
    //     connection: DATABASE_URL,
    //     migrations: {
    //         directory: './dist/db/migrations',
    //         extension: 'ts',
    //     },
    //     seeds: {
    //         directory: './dist/db/seeds',
    //         extension: 'ts',
    //     },
    // },
};

export default config;
