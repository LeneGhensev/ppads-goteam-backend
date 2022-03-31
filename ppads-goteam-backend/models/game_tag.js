"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class game_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  game_tag.init(
    {},
    {
      sequelize,
      modelName: "game_tag",
    }
  );
  return game_tag;
};
