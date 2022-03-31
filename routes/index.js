const express = require("express");

const usuarios = require("./usuarioRoutes");
const authentication = require("./authenticationRoutes");
const categoria = require("./categoriaRoutes")
const file = require("./fileRoutes")
const game = require("./gameRoutes")

module.exports = (app) => {
  app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    //Rotas aqui
    usuarios,
    authentication,
    categoria,
    file,
    game
  );
};
