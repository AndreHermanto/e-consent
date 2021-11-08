'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clinId: {
        type: Sequelize.STRING
      },
      sampleId: {
        type: Sequelize.STRING
      },
      familyNameInitials: {
        type: Sequelize.STRING
      },
      givenNameInitials: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      yearOfBirth: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Patients');
  }
};