"use strict";
const fs = require("fs").promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsCategoriesJson = JSON.parse(await fs.readFile("./data/productsCategories.json")).map((pc) => {
      delete pc.id;
      pc.createdAt = pc.updatedAt = new Date();
      return pc;
    });

    await queryInterface.bulkInsert("ProductsCategories", productsCategoriesJson);
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
    await queryInterface.bulkDelete("ProductsCategories", null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
