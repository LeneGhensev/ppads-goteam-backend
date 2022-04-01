"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tag.belongsToMany(models.game, {
        through: "GameTags",
        as: 'games',
        foreignKey: "id_tag",
        constraints: true,
      });
      
    }
  }
  tag.init(
    {
      nome: { type: DataTypes.STRING, unique: true },
    },
    {
      sequelize,
      modelName: "tag",
    }
  );
  return tag;
};
