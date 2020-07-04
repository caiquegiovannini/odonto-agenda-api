exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('appointments').del()
    .then(function () {
      // Inserts seed entries
      return knex('appointments').insert([
        { date: new Date(), client_id: 1 },
        { date: new Date(), client_id: 2 },
        { date: new Date(), client_id: 4 }
      ]);
    });
};
