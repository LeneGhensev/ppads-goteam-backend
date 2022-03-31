"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasMany(models.avaliacao, {
        foreignKey: "id_usuario",
      });
      Usuario.hasMany(models.avaliacao_utilparamim, {
        constraints: true,
        foreignKey: "id_usuario",
      });
    }
  }
  Usuario.init(
    {
      nome: DataTypes.STRING,
      avatar: DataTypes.STRING,
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "email inválido",
          },
        },
      },
      data_de_nasc: DataTypes.DATE,
      senha: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      estado: DataTypes.STRING,
      pais: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
