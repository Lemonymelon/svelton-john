import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('conversations', (table) => {
        table.increments('id').primary();
        table.integer('user').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('prompt').notNullable();
        table.json('good_responses').nullable();
        table.json('bad_responses').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('conversations');
}
