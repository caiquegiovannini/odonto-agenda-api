exports.up = knex => knex.schema.createTable('clients', table => {
  table.increments();
  table.text('name').notNullable();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('clients');
