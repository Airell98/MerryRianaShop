"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      Product.belongsToMany(models.User, { through: models.Cart });
      Product.belongsToMany(models.User, { through: models.ShoppingHistory });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product name required" },
          notNull: { msg: "Product name required" },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product image url required" },
          notNull: { msg: "Product image url required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product price required" },
          notNull: { msg: "Product price required" },
          isNum(value) {
            if (value < 0) {
              throw new Error("Invalid price format");
            }
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product stock required" },
          notNull: { msg: "Product stock required" },
          isNum(value) {
            if (isNaN(value) == true) {
              throw new Error("Invalid format stock");
            } else if (value < 0) {
              throw new Error("Invalid format stock");
            }
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product category required" },
          notNull: { msg: "Product category required" },
        },
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product desc required"},
          notNull: { msg: "Product desc required"},
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
