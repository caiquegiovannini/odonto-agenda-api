exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('procedures').del()
    .then(function () {
      // Inserts seed entries
      return knex('procedures').insert([
        {name: "Consulta"},
        {name: "Extração"},
        {name: "Limpeza"}
      ]);
    });
};
