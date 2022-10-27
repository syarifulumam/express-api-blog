'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.Users, {
        foreignKey: 'id'
      })
      posts.belongsTo(models.categories, {
        foreignKey: 'id'
      })
    }
  }
  posts.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};