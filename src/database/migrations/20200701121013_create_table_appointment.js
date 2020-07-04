exports.up = knex => knex.schema.createTable('appointments', table => {
  table.increments();
  table.timestamp('date').notNullable();
  table.integer('client_id')
    .references('clients.id')
    .notNullable()
    .onDelete('SET NULL');

  table.timestamp('cancealed_at');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('appointments');
