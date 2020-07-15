const { format } = require('date-fns');
const knex = require('../database');

async function checkSchedule(choosenDate, hour) {
  const appointments = await knex('appointments').where('cancealed_at', null);
  const appointmentsAtSameDay = appointments.filter(appointment => 
    format(appointment.date, 'yyyy-MM-dd') === choosenDate
  );
  
  return appointmentsAtSameDay.filter(each => format(each.date, 'HH:mm') === hour);
}

module.exports = {
  checkSchedule,
}
