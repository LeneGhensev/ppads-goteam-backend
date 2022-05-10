const database = require("../models");
const Authentication = require("../security/authentication");
const jwt = require("jsonwebtoken");

class UsuarioController {
  static async findAllUsuarios(req, res) {
    try {
      const usuarios = await database.Usuario.findAll({
        attributes: { 
          exclude: ["senha"]
        }});
      return res.status(200).json(usuarios);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async findOneUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await database.Usuario.findOne({
        where: { id: Number(id) },
        attributes: { 
          exclude: ["senha"]
        },
      });
      return res.status(200).json(usuario);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async findUsuarioByToken(req, res) {
    const id = req.userId;

    try {
      const usuario = await database.Usuario.findOne({
        where: { id: Number(id) },
        attributes: { 
          exclude: ["senha"]
        },
      });
      return res.status(200).json(usuario);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async createUsuario(req, res) {
    const usuario = req.body;
    delete usuario.admin;
    try {

      if(Authentication.validaSenhaNova(usuario.senha)){
      usuario.senha = await Authentication.gerarSenhaHash(usuario.senha);
      let usuarioCreated = await database.Usuario.create(usuario);
      delete usuarioCreated.senha;
      return res.status(201).json(usuarioCreated);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async updateUsuario(req, res) {
    const { id } = req.params;
    let usuario = req.body;


    delete usuario.id;
    delete usuario.admin;

    try {

      if (usuario.senha) {
        if(Authentication.validaSenhaNova(usuario.senha)){
        usuario.senha = await Authentication.gerarSenhaHash(usuario.senha);
        await database.Usuario.update(usuario, { where: { id: Number(id) } });
        const usuarioUpdated = await database.Usuario.findOne({
          where: { id: Number(id) },
        });
        return res.status(202).json(usuarioUpdated);
        }
      }
      await database.Usuario.update(usuario, { where: { id: Number(id) } });
      const usuarioUpdated = await database.Usuario.findOne({
        where: { id: Number(id) },
      });
      return res.status(202).json(usuarioUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async destroyUsuario(req, res) {
    const { id } = req.params;
    try {
      await database.Usuario.destroy({ where: { id: Number(id) } });
      return res.status(202).json({ message: `Usuario apagado` });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }

  static async makeUsuarioAdmin(req, res) {
    const { id } = req.params;
    const usuario = {admin: true};

    try{
      await database.Usuario.update(usuario, { where: { id: Number(id) } });
      return res.status(202)
    }catch (error) {
      return res.status(500).json(error.message);
    }

  }
}

module.exports = UsuarioController;
