const { format } = require('date-fns');
const knex = require('../database');
const { checkSchedule } = require('../validators/appointment');

module.exports = {
  async index(req, res) {
    try {
      const { schedule } = req.query;

      let results = await knex('appointments')
        .where('cancealed_at', null)
        .join('procedures', 'procedures.id', '=', 'appointments.procedure_id')
        .join('clients', 'clients.id', '=', 'appointments.client_id')
        .select('appointments.*', 'procedures.name AS procedure', 'clients.name AS client');

      if (schedule) {
        results = results.filter(appointment => format(appointment.date, 'yyyy-MM-dd') === schedule);
      }

      const appointments = results.map(appointment => ({
        ...appointment,
        appointmentDate: format(appointment.date, 'dd/MM/yyyy'),
        appointmentSchedule: format(appointment.date, 'H:mm'),
        created_at: format(appointment.created_at, 'dd/MM/yyyy'),
        updated_at: format(appointment.updated_at, 'dd/MM/yyyy'),
      }));

      return res.json(appointments);

    } catch (error) {
      console.error(error);
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;

      const results = await knex('appointments')
        .where('appointments.id', id)
        .join('procedures', 'procedures.id', '=', 'appointments.procedure_id')
        .join('clients', 'clients.id', '=', 'appointments.client_id')
        .select('appointments.*', 'procedures.name AS procedure', 'clients.name AS client');

      if (results[0].cancealed_at) {
        return res.status(404).send('Appointment not found.');
      }

      let {
        client,
        procedure,
        date,
        duration,
        created_at,
        updated_at,
      } = results[0];

      const appointmentDate = format(date, 'dd/MM/yyyy');
      const appointmentSchedule = format(date, 'H:mm')

      const appointment = {
        client,
        procedure,
        appointmentDate,
        appointmentSchedule,
        duration: duration,
      }

      res.json(appointment);
    } catch (error) {
      console.error(error);
    }
  },
  async create(req, res) {
    try {
      const {
        procedure_id,
        client_id,
        choosenDate,
        hour,
        duration
      } = req.body;

      const date = new Date(`${choosenDate} ${hour}`);
      const alreadyScheduled = checkSchedule(choosenDate, hour);

      if (alreadyScheduled) {
        return res.send('This schedule is already in use');
      }

      await knex('appointments').insert({
        date,
        procedure_id,
        client_id,
        duration
      });

      return res.status(201).send();

    } catch (error) {
      console.error(error);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { choosenDate, hour, procedure_id, client_id, duration } = req.body;

      const date = new Date(`${choosenDate} ${hour}`);
      const alreadyScheduled = checkSchedule(choosenDate, hour);

      if (alreadyScheduled) {
        return res.send('This schedule is already in use');
      }

      await knex('appointments')
        .update({
          date,
          procedure_id,
          client_id,
          duration
        })
        .where({ id });

      res.send();
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      await knex('appointments')
        .where({ id })
        .update('cancealed_at', new Date());

        return res.send();

    } catch (error) {
      console.error(error);
    }
  }
}