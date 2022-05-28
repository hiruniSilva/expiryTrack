'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const yup = require('yup');
const config = require("../config");


let schema = yup.object().shape({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  passwordHash: yup.string().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"),
  roles: yup.array().of(yup.string())
})

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static validateUserData(data, withoutPassword) {
			if (withoutPassword) return schema.omit(["password"]).isValidSync(data);
			return schema.isValidSync(data);
		}

    toUserJson(){
      const userJson = this.toJSON();
			delete userJson.passwordHash;
			return userJson;
    }

    static validatePassword(password) {
			return yup.reach(schema, "password").isValidSync(password);
		}

    static hashPassword(password) {
			return bcrypt.hash(password, 10);
		}

  }
  User.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    roles: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};