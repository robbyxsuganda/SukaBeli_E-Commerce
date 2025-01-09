"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
    }

    // INSTANCE METHOD
    locationWithPhase() {
      return `BSD-${this.phase}`;
    }
  }
  Profile.init(
    {
      phoneNumber: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      photo: {
        type: DataTypes.STRING,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
