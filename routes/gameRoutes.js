const { Router } = require('express');
const GameController = require('../controllers/GameController');

const router = Router();

router
    .get('/games', GameController.findAllGames)
    .get('/game/id/:id', GameController.findOneGame)
    .get('/game/recomenda/id/:id', GameController.recomendaGame)
    .post("/game", GameController.createGame)
    .put('/game/id/:id', GameController.updateGame)
    .delete('/game/id/:id', GameController.destroyGame);

module.exports = router;
