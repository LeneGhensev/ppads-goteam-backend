const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController');

const router = Router();

router
    .get('/categorias', CategoriaController.findAllCategorias)
    .get('/categoria/id/:id', CategoriaController.findOneCategoria)
    .post("/categoria", CategoriaController.createCategoria)
    .put('/categoria/id/:id', CategoriaController.updateCategoria)
    .delete('/categoria/id/:id', CategoriaController.destroyCategoria);

module.exports = router;
