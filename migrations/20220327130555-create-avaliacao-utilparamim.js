'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('avaliacao_utilparamims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('avaliacao_utilparamims');
  }
};
