'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {

    // static associate(models) {
    //   // define association here
    // }
  }
  Item.init({
    itemName: DataTypes.STRING,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};