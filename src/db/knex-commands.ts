import knex from 'knex';
import config from './knexfile';
import { argv } from 'process';
import { execSync } from 'child_process';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const knexInstance = knex(dbConfig);

const command = argv[2];
const args = argv.slice(3).join(' ');

const knexPath = path.resolve('node_modules/.bin/knex');

console.log(`Executing command: ${knexPath} ${command} ${args}`);
console.log(`Using environment: ${environment}`);

try {
    execSync(`${knexPath} ${command} ${args}`, {
        stdio: 'inherit',
        env: {
            ...process.env,
            TS_NODE_PROJECT: path.resolve('tsconfig.json'), // Ensure tsconfig is picked up
        },
    });
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error(`Error executing command '${command}':`, error.message);
    } else {
        console.error(`Unknown error executing command '${command}'`);
    }
    process.exit(1);
}
