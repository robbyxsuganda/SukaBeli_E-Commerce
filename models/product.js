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
      Product.belongsTo(models.User, { foreignKey: "UserId" });
      Product.hasMany(models.ProductsCategory, { foreignKey: "ProductId" });
      Product.belongsToMany(models.Category, { through: "ProductsCategory" });
      Product.hasMany(models.Cart, { foreignKey: "ProductId" });
      Product.belongsToMany(models.User, { through: "Cart" });
    }

    // STATIC METHOD
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cant be null",
          },
          notEmpty: {
            msg: "Name cant be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description cant be null",
          },
          notEmpty: {
            msg: "Description cant be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Photo cant be null",
          },
          notEmpty: {
            msg: "Photo cant be empty",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Photo cant be null",
          },
          notEmpty: {
            msg: "Photo cant be empty",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image cant be null",
          },
          notEmpty: {
            msg: "Image cant be empty",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
