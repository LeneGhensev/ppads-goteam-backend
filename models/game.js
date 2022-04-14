"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game.hasMany(models.avaliacao, {
        foreignKey: 'id_game'
      })
      game.belongsTo(models.categoria, {
        foreignKey: 'id_categoria',
        as: 'categoria'
      })
      game.belongsToMany(models.tag, {
        through: "GameTags",
        as: 'tags',
        foreignKey: 'id_game',
        constraints: true,
      })
    }
  }
  game.init(
    {
      nome: { type: DataTypes.STRING, unique: true },
      url_acesso: DataTypes.STRING,
      url_video: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      imagem_ilustrativa: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "game",
    }
  );
  return game;
};
