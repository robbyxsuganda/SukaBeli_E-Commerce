"use strict";

const fs = require("fs").promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsJson = JSON.parse(await fs.readFile("./data/products.json", "utf-8")).map((product) => {
      delete product.id;
      product.createdAt = product.updatedAt = new Date();
      return product;
    });

    await queryInterface.bulkInsert("Products", productsJson);

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
    await queryInterface.bulkDelete("Products", null);

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
