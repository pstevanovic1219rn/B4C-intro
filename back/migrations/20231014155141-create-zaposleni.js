'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Zaposlenis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jmbg: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      ime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prezime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      adresa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pozicija: {
        type: Sequelize.STRING,
        allowNull: false
      },
      datum_zaposlenja: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nadredjeni: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Zaposlenis');
  }
};