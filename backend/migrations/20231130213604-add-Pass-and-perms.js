'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'permissions', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'permissions');
    await queryInterface.removeColumn('Users', 'password');
  },
};
