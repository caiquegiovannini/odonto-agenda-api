exports.up = knex => knex.schema.createTable('appointments', table => {
  table.increments();
  table.integer('procedure_id')
    .references('procedures.id')
    .notNullable()
    .onDelete('SET NULL');
  table.integer('client_id')
    .references('clients.id')
    .notNullable()
    .onDelete('SET NULL');
    
  table.timestamp('date').notNullable();
  table.integer('duration').defaultTo(30);

  table.timestamp('cancealed_at');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('appointments');
