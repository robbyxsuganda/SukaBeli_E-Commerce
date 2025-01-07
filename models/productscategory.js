'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductsCategory.belongsTo(models.Product, {foreignKey: "ProductId"})
      ProductsCategory.belongsTo(models.Category,{foreignKey: "CategoryId"})
    }
  }
  ProductsCategory.init({
    ProductId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductsCategory',
  });
  return ProductsCategory;
};