"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Patients", [
      {
        clinId: "20770101NSWHP001",
        familyName: "Smith",
        givenName: "John",
        sex: "Male",
        dateOfBirth: "2020-12-08",
        number: "+61444444444",
        email: "JohnDough@gmail.com",
        address: "122 SQLite Db",
        consentSampleOnescreen: true,
        consentSampleTesting: true,
        consentSampleStorage: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clinId: "20770101NSWHP002",
        familyName: "Smith",
        givenName: "Jane",
        sex: "Female",
        dateOfBirth: "2020-12-07",
        number: "+61444444443",
        email: "JaneSmith@gmail.com",
        address: "123 SQLite Db",
        consentSampleOnescreen: true,
        consentSampleTesting: true,
        consentSampleStorage: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clinId: "20770101NSWHP003",
        familyName: "Smith",
        givenName: "Child",
        sex: "Female",
        dateOfBirth: "2020-12-09",
        number: "+61444444442",
        email: "TooYoungToHaveEmail@gmail.com",
        address: "123 SQLite Db",
        consentSampleOnescreen: true,
        consentSampleTesting: true,
        consentSampleStorage: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Patients", null, {});
  }
};
