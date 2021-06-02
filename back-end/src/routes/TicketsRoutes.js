const express = require('express');
const routes = express.Router();

const {obtener, capturar, editar, eliminar} = require('../controllers/TicketsController');

routes.get('/Tickets/', obtener);
routes.post('/Tickets/', capturar);
routes.put('/Tickets/:id', editar);
routes.delete('/Tickets/:id', eliminar);

module.exports = routes;