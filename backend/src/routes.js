const express = require('express');

const routes = express.Router();

const AppointmentController = require('./controllers/AppointmentController');

routes.get('/', (req, res) => res.redirect('/appointments'));

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.create);
routes.put('/appointments/:appointmentId', AppointmentController.update);
routes.delete('/appointments/:appointmentId', AppointmentController.delete);

module.exports = routes;