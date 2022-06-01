'use strict';
const models = require('../models');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
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
      this.hasMany(models.Comment, {
        foreignKey:'postId',
        as:'comments'
      });
      this.hasMany(models.Like, {
        foreignKey:'postId',
        as:'likess'
      });
    }
    toJSON(){
      return {...this.get()}
    }
  }
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    
    userId:{
      type: DataTypes.INTEGER,
      allowNull:false,
       
    },
    title: {
      type: DataTypes.STRING,
      allownull: false
  },
    content: {
      type: DataTypes.STRING,
      allownull: false
    },
    attachment: {
      type: DataTypes.STRING,
      allownull: true,
      defaultValue:'../images/profil/default_profil.png'
    },
    likes: {
        
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'Post',
  });
  return Post;
};