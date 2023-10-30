"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "user_create",
      });
      this.belongsTo(models.ReportType, {
        foreignKey: "type_id",
        as: 'type'
      });
    }
  }
  Report.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      num_livestock: DataTypes.INTEGER,
      date_release: DataTypes.DATE,
      date_sale: DataTypes.DATE,
      description: DataTypes.TEXT,
      image_path: DataTypes.STRING,
      created_by: {
        type: DataTypes.STRING,
        references: { model: "users", key: "id" },
      },
      type_id: {
        type: DataTypes.INTEGER,
        references: { model: "reports", key: "id" },
      },
      approved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Report",
      tableName: "reports",
    }
  );
  return Report;
};
