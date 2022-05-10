const { Router } = require("express");
const GameController = require("../controllers/GameController");
const Authentication = require("../security/authentication");

const router = Router();

router
  .get("/games", Authentication.verifyJWT, Authentication.verifyJWT, GameController.findAllGames)
  .get("/game/id/:id", Authentication.verifyJWT, GameController.findOneGame)
  .get("/game/recomenda/id/:id", Authentication.verifyJWT, GameController.recomendaGame)
  .post("/game", Authentication.verifyJWT, Authentication.verifyAdmin, GameController.createGame)
  .put("/game/id/:id", Authentication.verifyJWT, Authentication.verifyAdmin, GameController.updateGame)
  .delete("/game/id/:id", Authentication.verifyJWT, Authentication.verifyAdmin, GameController.destroyGame);

module.exports = router;
