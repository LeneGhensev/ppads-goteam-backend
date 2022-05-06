require("dotenv").config();
const bcrypt = require("bcrypt");
var passwordValidator = require("password-validator");
const isPasswordBlacklisted = require("password-blacklist/in-memory");
const { InvalidArgumentError } = require("../config/errors");
const database = require("../models");
const jwt = require("jsonwebtoken");

class Authentication {
  static async gerarSenhaHash(senha) {
    return await bcrypt.hash(senha, 12);
  }

  static validaSenhaNova(senha) {
    var schema = new passwordValidator();

    schema
      .is()
      .min(8, "Senha deve possuir no minimo 8 caracteres.")
      .is()
      .max(128, "Senha deve possuir no maximo 128 caracteres.")
      .has()
      .uppercase(1, "Senha deve possuir no minimo uma letra maiuscula.")
      .has()
      .lowercase(1, "Senha deve possuir no minimo uma letra minuscula.")
      .has()
      .digits(1, "Senha deve possuir no minimo um numero.")
      .has()
      .symbols(1, "Senha deve possuir no minimo um simbolo.");

    const resultado = schema.validate(senha, { details: true });
    if (resultado.length !== 0)
      throw new InvalidArgumentError(resultado[0].message);
    if (isPasswordBlacklisted(senha))
      throw new InvalidArgumentError("Esta senha não é segura.");

    return true;
  }

  static async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await database.Usuario.findOne({ where: { email: email } });
    const id = usuario.id;
    const verificaSenha = await bcrypt.compare(senha, usuario.senha);

    if (verificaSenha) {
      const token = jwt.sign({ id }, process.env.CHAVE_JWT, {
        expiresIn: 300, // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    res.status(500).json({ message: "Login inválido!" });
  }

  static async verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.CHAVE_JWT, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = Authentication;
