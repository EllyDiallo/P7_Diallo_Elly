'use strict';
const models = require('../models');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts'
      });
      this.hasMany(models.Comment, {
        foreignKey: 'userId',
        as: 'comments'
      })
    }
    /* toJSON(){
       return {...this.get(), id: undefined}
     }*/
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: '../images/profil/default_profil.png',
      allowNull: true
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.INTEGER

  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};