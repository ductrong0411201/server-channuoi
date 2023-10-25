'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      "report_type",
      [
        {
          id: 1,
          type: "Báo cáo chăn nuôi",
        },
        {
          id: 2,
          type: "Báo cáo môi trường",
        },
        {
          id: 3,
          type: "Báo cáo bệnh dịch",
        },
        {
          id: 4,
          type: "Báo cáo vật tư",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("report_type", null, {});
  }
};
