"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.changeColumn("Requests", "cuota", {
        type: Sequelize.FLOAT,
      }),
      queryInterface.changeColumn("Requests", "total", {
        type: Sequelize.FLOAT,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.changeColumn("Requests", "cuota", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn("Requests", "total", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },
};
