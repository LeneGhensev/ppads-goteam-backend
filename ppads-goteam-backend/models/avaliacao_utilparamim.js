"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class avaliacao_utilparamim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      avaliacao_utilparamim.belongsTo(models.Usuario, {
        constraints: true,
        foreignKey: 'id_usuario'
      })
      avaliacao_utilparamim.belongsTo(models.avaliacao, {
        constraints: true,
        foreignKey: 'id_avaliacao'
      })

    }
  }
  avaliacao_utilparamim.init(
    {},
    {
      sequelize,
      modelName: "avaliacao_utilparamim",
    }
  );
  return avaliacao_utilparamim;
};
