'use strict';
const {
  Model
} = require('sequelize');

const yup = require('yup');

const schema = yup.object().shape({
  itemName: yup.string().required(),
  expiryDate: yup.date().default()
})


module.exports = (sequelize, DataTypes) => {
  class Item extends Model {

    static validateItemData(data) {
      return schema.isValidSync(data)
    }
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