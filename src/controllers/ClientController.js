const knex = require('../database');

module.exports = {
  async index(req, res) {
    try {
      const results = await knex('clients')
        .where('deleted_at', null);

      return res.json(results);

    } catch (error) {
      console.error(error);
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;

      const client = await knex('clients').where({ id });

      if (client[0].deleted_at) {
        return res.status(404).send('Client not found');
      }

      res.json(client);
    } catch (error) {
      console.error(error);
    }
  },
  async create(req, res) {
    try {
      const { name } = req.body;

      await knex('clients').insert({ name });

      return res.status(201).send();

    } catch (error) {
      console.error(error);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await knex('clients')
        .update({ name })
        .where({ id });

      res.send();
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      await knex('clients')
        .where({ id })
        .update('deleted_at', new Date());

        return res.send();

    } catch (error) {
      console.error(error);
    }
  }
}