const enviroment = process.env.NODE_ENV || 'development';
const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile[enviroment]);

module.exports = knex;