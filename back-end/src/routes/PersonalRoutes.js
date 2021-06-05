const express = require('express');

const routes = express.Router();

const {listarPersonal, obtenerPersona, insertarPersona, editarPersona, eliminarPersona} = require('../controllers/PersonalController');

routes.get('/', listarPersonal);
routes.get('/:id', obtenerPersona)
routes.post('/', insertarPersona)
routes.put('/:id', editarPersona)
routes.delete('/:id', eliminarPersona)

module.exports = routes;