/**
 * @param { import("knex").Knex } knex
 * @returns {import("knex").Knex.SchemaBuilder}
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', function (table) {
      table.bigIncrements('id')
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.timestamps()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {import("knex").Knex.SchemaBuilder}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
