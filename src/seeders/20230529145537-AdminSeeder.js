"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash("12345678", salt);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Đức Trọng",
          mobile: "0355898753",
          email: "ductronglu0411@gmail.com",
          password: hashed_password,
          role_id: 1,
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
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
