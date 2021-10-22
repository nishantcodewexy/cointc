"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Secession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, Secession } = models;

      User.hasMany(Secession,{
        foreignKey: { name: "user_id", allowNull: false },
      });
      Secession.belongsTo(User);
      
    }

  }
  Secession.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      access_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          isInt: true,
          max: 3
        },
        defaultValue:1
      },
      status: {
        type: DataTypes.ENUM(["accepted","denied","pending"]),
        allowNull: false,
        defaultValue:"pending"
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      approval_date: DataTypes.DATE,
      archived_at: DataTypes.DATE,
      
    },
    {
      sequelize,
      modelName: "Secession",
      underscored: true,
      tableName: 'tbl_secessions'
    }
  );
  return Secession;
};
