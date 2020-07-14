const express = require('express');

const routes = express.Router();

const ProcedureController = require('./controllers/ProcedureController');
const ClientController = require('./controllers/ClientController');
const AppointmentController = require('./controllers/AppointmentController');

routes.get('/', (req, res) => res.redirect('/appointments'));

// Procedures
routes.get('/procedures', ProcedureController.index);

// Clients
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.post('/clients', ClientController.create);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

// Appointments
routes.get('/appointments', AppointmentController.index);
routes.get('/appointments/:id', AppointmentController.show);
routes.post('/appointments', AppointmentController.create);
routes.put('/appointments/:id', AppointmentController.update);
routes.delete('/appointments/:id', AppointmentController.delete);

module.exports = routes;