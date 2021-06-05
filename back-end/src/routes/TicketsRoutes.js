const express = require('express');
const routes = express.Router();

const {obtener, obtenerUno, capturar, editar, editarEstatus, eliminar} = require('../controllers/TicketsController');

routes.get('/Tickets/', obtener);
routes.get('/Tickets/:id', obtenerUno);
routes.post('/Tickets/', capturar);
routes.put('/Tickets/:id', editar);
routes.put('/Tickets/', editarEstatus);
routes.delete('/Tickets/:id', eliminar);

module.exports = routes;