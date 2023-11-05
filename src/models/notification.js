"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "from",
        as: "from_user",
      });
      this.belongsTo(models.User, {
        foreignKey: "to",
        as: "to_user",
      });
      this.belongsTo(models.Report, {
        foreignKey: "report_id",
        as: "report",
      });
    }
  }
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      from: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      report_id: {
        type: DataTypes.INTEGER,
        references: { model: "reports", key: "id" },
      },
      to: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      seen: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
    }
  );
  return Notification;
};
