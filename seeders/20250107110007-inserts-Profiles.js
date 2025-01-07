"use strict";

const fs = require("fs").promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const profilesJson = JSON.parse(await fs.readFile("./data/profiles.json", "utf-8")).map((profile) => {
      delete profile.id;
      profile.createdAt = profile.updatedAt = new Date();
      return profile;
    });

    await queryInterface.bulkInsert("Profiles", profilesJson);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null);

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
