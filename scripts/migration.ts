import { execSync } from 'child_process';

type Command = 'make' | 'latest' | 'rollback';

const runCommand = (command: string) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error('Failed to execute command:', (error as Error).message);
        process.exit(1);
    }
};

const command: Command = process.argv[2] as Command;
const migrationName = process.argv[3];

switch (command) {
    case 'make':
        if (!migrationName) {
            console.error('Please provide a migration name.');
            process.exit(1);
        }
        runCommand(`npx knex migrate:make ${migrationName} --knexfile src/db/knexfile.ts`);
        break;

    case 'latest':
        runCommand('npx knex migrate:latest --knexfile src/db/knexfile.ts');
        break;

    case 'rollback':
        runCommand('npx knex migrate:rollback --knexfile src/db/knexfile.ts');
        break;

    default:
        console.error(`Unknown command: ${command}`);
        console.error('Available commands: make, latest, rollback');
        process.exit(1);
}
