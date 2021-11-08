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
      familyName: {
        type: Sequelize.STRING
      },
      givenName: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY
      },
      number: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      consentSampleOnescreen: {
        type: Sequelize.BOOLEAN
      },
      consentSampleTesting: {
        type: Sequelize.BOOLEAN
      },
      consentSampleStorage: {
        type: Sequelize.BOOLEAN
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