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
      email: {
        type: Datatypes.STRING,
        allowNull: false
      },
      username: {
        allowNull: false,
        type: Datatypes.STRING
      },
       bio: {
        allowNull: true,
        type: Datatypes.STRING
      },
      picture: {
        allowNull: true,
        type: Datatypes.STRING,
        defaultValue:'../images/profil/default_profil.png',
        
      },password: {
        allowNull: false,
        type: Datatypes.STRING
      },
      isAdmin: {
        allowNull: false,
        type: Datatypes.INTEGER
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