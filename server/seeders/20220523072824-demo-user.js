'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      fullname: 'John',
      email: 'example@example.com',
      passwordHash: 'fesfsjbsfsdf675sdgfsjfh3yrhefjs',
      roles: ['ROLE1'],
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
