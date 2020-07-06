exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('appointments').del()
    .then(function () {
      // Inserts seed entries
      return knex('appointments').insert([
        { date: new Date(), procedure_id: 1, client_id: 1 },
        { date: new Date(), duration: 60, procedure_id: 3, client_id: 2 },
        { date: new Date(), procedure_id: 2, client_id: 4 },
        { date: new Date(), procedure_id: 1, client_id: 3 }
      ]);
    });
};
