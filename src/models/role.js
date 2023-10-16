"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: "role_id",
        as: "roles",
      });
    }
  }
  Role.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "roles",
      modelName: "Role",
    }
  );
  return Role;
};
