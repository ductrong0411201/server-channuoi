"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          role: "ADMIN",
        },
        {
          id: 2,
          role: "Khuyến nông cơ sở",
        },
        {
          id: 3,
          role: "Nhà nông",
        },
        {
          id: 4,
          role: "Kỹ thuật viên thú y",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
