"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      idEjecutivo: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "idEjecutivo",
        }
      },

      rutSolicitante: {
        type: Sequelize.INTEGER,
        references: {
          model: "Clients",
          key: "id",
          as: "rutSolicitante",
        },
      },
      tasa: {
        type: Sequelize.INTEGER,
      },
      valorUF: {
        type: Sequelize.FLOAT,
      },
      plazo: {
        type: Sequelize.INTEGER,
      },
      cuota: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Requests");
  },
};
