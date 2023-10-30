'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Report, {
        foreignKey: "type_id",
      });
    }
  }
  ReportType.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'ReportType',
    tableName: "report_type",
  });
  return ReportType;
};