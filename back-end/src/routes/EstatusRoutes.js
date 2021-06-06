const express = require('express');
const routes = express.Router();

const {obtener} = require('../controllers/EstatusController');

routes.get('/Estatus/', obtener);

module.exports = routes;