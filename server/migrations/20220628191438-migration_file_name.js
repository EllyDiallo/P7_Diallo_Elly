'use strict';
 
const DataTypes = require('sequelize/lib/data-types'); 

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.changeColumn('Posts', 'attachment', {
        allowNull: true,
        type: DataTypes.STRING
    });
  },

  async down (queryInterface, DataTypes) {
   await queryInterface.dropTable('Posts');
  }
};
