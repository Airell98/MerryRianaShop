"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require("../helper/hashPass");
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
      User.hasMany(models.ShoppingHistory)
      User.belongsToMany(models.Product, { through: models.Cart });
      User.belongsToMany(models.Product, { through: models.ShoppingHistory });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "Invalid email format" },
          notEmpty: { msg: "Email required" },
          notNull: { msg: "Email required" },
          duplicateEmail(value) {
            return User.findAll({ where: { email: value } }).then((user) => {
              if (user.length != 0) {
                throw new Error("This email is taken. Try another");
              }
            });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password required" },
          notNull: { msg: "Password required" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name required" },
          notNull: { msg: "Name required" },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, option) => {
    const hash = bcrypt(instance.password);
    instance.password = hash;
  });
  return User;
};
