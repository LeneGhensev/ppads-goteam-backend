const { Router } = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');

const router = Router();

router
    .get('/avaliacoes', AvaliacaoController.findAllAvaliacoes)
    .get('/avaliacoes/game/id/:id', AvaliacaoController.findAllAvaliacoesByGameId)
    .get('/avaliacao/id/:id', AvaliacaoController.findOneAvaliacao)
    .post("/avaliacao", AvaliacaoController.createAvaliacao)
    .put('/avaliacao/id/:id', AvaliacaoController.updateAvaliacao)
    .delete('/avaliacao/id/:id', AvaliacaoController.destroyAvaliacao);

module.exports = router;
