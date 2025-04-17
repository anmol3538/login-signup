'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/server-config');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    email: {type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.beforeCreate((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password, parseInt(SALT));
    user.password = encryptedPassword;
  });
  return Users;
};