"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          itemName: "Item-1",
          expiryDate: "2023-03-03",
          createdAt: "2022-02-03",
          updatedAt: "2022-02-03"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  },
};
