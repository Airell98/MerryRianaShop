'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ShoppingHistory.belongsTo(models.User)
      ShoppingHistory.belongsTo(models.Product, { sourceKey: 'id', foreignKey: "ProductId" })
      ShoppingHistory.belongsTo(models.User, { sourceKey: 'id', foreignKey: "UserId" })
    }
  };
  ShoppingHistory.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShoppingHistory',
  });
  return ShoppingHistory;
};