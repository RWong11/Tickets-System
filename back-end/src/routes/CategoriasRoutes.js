const express = require('express');
const routes = express.Router();

const {obtener, capturar, eliminar} = require('../controllers/CategoriasController');

routes.get('/Categorias/', obtener);
routes.post('/Categorias/', capturar);
routes.delete('/Categorias/:id', eliminar);

module.exports = routes;