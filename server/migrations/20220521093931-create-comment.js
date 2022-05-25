'use strict';
const {User, Comment} = require('../models')
var DataTypes = require('sequelize/lib/data-types');
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Users",
          schema: 'schema',
          key:"id"
        },
      },
      postId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Comments",
          schema: 'schema',
          key:"id"
        },
      },
      text: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Comments');
  }
};