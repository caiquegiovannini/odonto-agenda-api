const knex = require('../database');

module.exports = {
  async index(req, res) {
    try {
      const results = await knex('procedures');

      return res.json(results);

    } catch (error) {
      console.error(error);
    }
  }
}