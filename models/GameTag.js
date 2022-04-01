"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  GameTags.init(
    {},
    {
      sequelize,
      modelName: "GameTags",
    }
  );
  return GameTags;
};
