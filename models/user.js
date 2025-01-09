"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "UserId" });
      User.hasMany(models.Product, { foreignKey: "UserId" });
      User.hasMany(models.Cart, { foreignKey: "UserId" });
      User.belongsToMany(models.Product, { through: "Cart" });
    }
    // GETTER
    get uppercaseName() {
      return this.name.toUpperCase();
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Name cant be null",
          },
          notEmpty: {
            msg: "Name cant be empty",
          },
        },
        isMinCharacters(value) {
          if (value.length < 10) {
            throw new Error("Min characters is 3");
          }
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true,
        validate: {
          notNull: {
            msg: "Email cant be null",
          },
          notEmpty: {
            msg: "Email cant be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cant be null",
          },
          notEmpty: {
            msg: "Password cant be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: {
          args: [["Admin", "Customer"]],
          msg: "Must be English or Chinese",
        },
        validate: {
          notNull: {
            msg: "Role cant be null",
          },
          notEmpty: {
            msg: "Role cant be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash;
  });

  return User;
};
