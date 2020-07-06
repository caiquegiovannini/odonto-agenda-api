exports.up = knex => knex.schema.createTable('procedures', table => {
  table.increments();
  table.text('name').notNullable();
});

exports.down = knex => knex.schema.dropTable('procedures');
