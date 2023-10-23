/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("user_tokens", function (table) {
        table.increments("id").primary()
        table.integer("user_id").notNullable()
        table.jsonb("token").notNullable();
        table.jsonb("device_details").notNullable();
        table.foreign("user_id").references("users.id").withKeyName('fk_fkey_token_user_id');
        table.timestamp("created_at").defaultTo(knex.fn.now())
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("user_tokens")
};
