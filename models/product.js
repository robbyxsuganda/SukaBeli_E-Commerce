"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
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
    static async findByFeature(CategoryId, search, Category, User) {
      const options = {
        include: [
          {
            model: User,
          },
          {
            model: Category,
            through: { attributes: [] },
          },
        ],
        order: [["createdAt", "DESC"]],
      };

      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      if (CategoryId) {
        options.include[1].where = { id: CategoryId };
      }

      if (search && CategoryId) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
        options.include[1].where = { id: CategoryId };
      }
      return Product.findAll(options);
    }
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
            msg: "Price cant be null",
          },
          notEmpty: {
            msg: "Price cant be empty",
          },
        },
        isInt: {
          msg: "Price needs to be a number.",
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
          isInt: {
            msg: "Stock needs to be a number.",
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
