const { Router } = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');
const Authentication = require("../security/authentication");

const router = Router();

router
    .get('/avaliacoes', Authentication.verifyJWT, Authentication.verifyAdmin, AvaliacaoController.findAllAvaliacoes)
    .get('/avaliacoes/game/id/:id', Authentication.verifyJWT, AvaliacaoController.findAllAvaliacoesByGameId)
    .get('/avaliacao/id/:id', Authentication.verifyJWT, Authentication.verifyAdmin, AvaliacaoController.findOneAvaliacao)
    .post("/avaliacao", Authentication.verifyJWT, AvaliacaoController.createAvaliacao)
    .put('/avaliacao/id/:id', Authentication.verifyJWT, AvaliacaoController.updateAvaliacao)
    .delete('/avaliacao/id/:id', Authentication.verifyJWT, AvaliacaoController.destroyAvaliacao);

module.exports = router;
