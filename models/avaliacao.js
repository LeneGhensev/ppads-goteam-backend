'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avaliacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      avaliacao.belongsTo(models.game,{
        constraints: true,
        foreignKey: 'id_game'
      } )
      avaliacao.belongsTo(models.Usuario, {
        constraints: true,
        foreignKey: 'id_usuario',
        as: 'usuario'
      })
      avaliacao.hasMany(models.avaliacao_utilparamim, {
        constraints: true,
        foreignKey: 'id_avaliacao'
      })
    }
  }
  avaliacao.init({
    comentario: DataTypes.STRING,
    estrela: {
      type: DataTypes.INTEGER,
      validate: {
        max: 5,
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'avaliacao',

  });
  return avaliacao;
};
