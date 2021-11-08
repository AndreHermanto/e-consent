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
        sampleId: "20770101KCCG141",
        familyNameInitials: "Sm",
        givenNameInitials: "Jo",
        sex: "Male",
        yearOfBirth: "2020",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clinId: "20770101NSWHP002",
        sampleId: "20770101KCCG142",
        familyNameInitials: "Sm",
        givenNameInitials: "Ja",
        sex: "Female",
        yearOfBirth: "2020",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clinId: "20770101NSWHP003",
        sampleId: "20770101KCCG143",
        familyNameInitials: "Sm",
        givenNameInitials: "Ch",
        sex: "Female",
        yearOfBirth: "2020",
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
