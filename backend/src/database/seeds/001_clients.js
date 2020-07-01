exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        {name: "Caique"},
        {name: "Robson"},
        {name: "Ana"},
        {name: "Renata"}
      ]);
    });
};
