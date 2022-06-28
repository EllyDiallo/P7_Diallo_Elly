'use strict';

const DataTypes = require('sequelize/lib/data-types');
module.exports = {
  async up(queryInterface, Datatypes) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Datatypes.INTEGER,
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
        defaultValue:0
      },
      title: {
        allowNull: false,
        type: Datatypes.STRING
      },
      content: {
        allowNull: false,
        type: Datatypes.STRING
      },
      attachment: {
        allowNull: true,
        type: Datatypes.STRING,
       
      },
      likes: {
        allowNull: false,
        type: Datatypes.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Posts');
  }
};