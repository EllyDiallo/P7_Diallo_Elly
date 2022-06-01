'use strict';
const models = require('../models');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey:'userId',
        as:'user'
      });
      this.belongsTo(models.Post,{
        foreignKey:'postId',
        as:'post'
      })
    }
  }
  Like.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    postId:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    likeNumber: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'likes',
    modelName: 'Like',
  });
  return Like;
};