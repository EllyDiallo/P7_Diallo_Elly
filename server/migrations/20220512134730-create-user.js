'use strict';
var DataTypes = require('sequelize/lib/data-types');
module.exports = {
  async up(queryInterface, Datatypes) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Datatypes.INTEGER
      },
      uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
      name: {
        type: Datatypes.STRING,
        allowNull: false
      },
      email: {
        type: Datatypes.STRING,
        allowNull: false
      },
      role: {
        type: Datatypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Datatypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Datatypes.DATE
      }
    });
  },
  async down(queryInterface, Datatypes) {
    await queryInterface.dropTable('Users');
  }
};