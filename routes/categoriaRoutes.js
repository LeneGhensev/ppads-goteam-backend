const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController');
const Authentication = require("../security/authentication");

const router = Router();

router
    .get('/categorias', Authentication.verifyJWT, CategoriaController.findAllCategorias)
    .get('/categoria/id/:id', Authentication.verifyJWT, CategoriaController.findOneCategoria)
    .post("/categoria", Authentication.verifyJWT, Authentication.verifyAdmin, CategoriaController.createCategoria)
    .put('/categoria/id/:id', Authentication.verifyJWT, Authentication.verifyAdmin, CategoriaController.updateCategoria)
    .delete('/categoria/id/:id', Authentication.verifyJWT, Authentication.verifyAdmin, CategoriaController.destroyCategoria);

module.exports = router;
