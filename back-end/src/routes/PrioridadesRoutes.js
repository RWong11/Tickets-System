const express = require('express');
const routes = express.Router();

const {obtener} = require('../controllers/PrioridadesController');

routes.get('/Prioridades/', obtener);

module.exports = routes;