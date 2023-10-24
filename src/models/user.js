"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      mobile: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      password: { type: DataTypes.STRING, validate: { len: [6, 64] } },
      role_id: {
        type: DataTypes.SMALLINT,
        defaultValue: 2,
        references: { model: "roles", key: "id" },
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
