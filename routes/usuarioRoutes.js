const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const Authentication = require("../security/authentication");

const router = Router();

router
  .get("/usuarios", Authentication.verifyJWT, UsuarioController.findAllUsuarios)
  .get("/usuario/id/:id", UsuarioController.findOneUsuario)
  .post("/usuario", UsuarioController.createUsuario)
  .put("/usuario/id/:id", UsuarioController.updateUsuario)
  .delete("/usuario/id/:id", UsuarioController.destroyUsuario);

module.exports = router;
