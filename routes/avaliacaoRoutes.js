const { Router } = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');

const router = Router();

router
    .get('/avaliacaos', AvaliacaoController.findAllAvaliacoes)
    .get('/avaliacao/id/:id', AvaliacaoController.findOneAvaliacao)
    .post("/avaliacao", AvaliacaoController.createAvaliacao)
    .put('/avaliacao/id/:id', AvaliacaoController.updateAvaliacao)
    .delete('/avaliacao/id/:id', AvaliacaoController.destroyAvaliacao);

module.exports = router;
