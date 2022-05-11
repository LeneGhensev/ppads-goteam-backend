const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const Authentication = require("../security/authentication");

const router = Router();

router
  .get("/usuarios", Authentication.verifyJWT, Authentication.verifyAdmin, UsuarioController.findAllUsuarios)
  .get("/usuario/id/:id", Authentication.verifyJWT, UsuarioController.findOneUsuario)
  .get("/usuario", Authentication.verifyJWT, UsuarioController.findUsuarioByToken)
  .post("/usuario", UsuarioController.createUsuario)
  .put("/usuario/id/:id", Authentication.verifyJWT, UsuarioController.updateUsuario)
  .delete("/usuario/id/:id", Authentication.verifyJWT, UsuarioController.destroyUsuario);

module.exports = router;
