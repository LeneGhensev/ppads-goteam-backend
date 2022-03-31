"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  file.init(
    {
      url: DataTypes.STRING,
      originalFilename: DataTypes.STRING,
      newFilename: DataTypes.STRING,
      bucket: DataTypes.STRING,
      region: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "file",
      paranoid: true,
      timestamps: true,
      defaultScope: {
        where: { deletedAt: null },
      },
    }
  );
  return file;
};
