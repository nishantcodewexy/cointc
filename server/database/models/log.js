"use strict";
const { Model } = require("sequelize");
const {
    types:{
        LogType
    }
} = require("../../consts")
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, Log } = models;

      User.hasMany(Log)
      
      Log.belongsTo(User, {
        foreignKey: "user_id",
      });
    }

  }
  Log.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.ENUM(...Object.keys(LogType)),
        allowNull: false
      },
      metadata:{
          type:DataTypes.JSON,
          defaultValue:{},
      }
    },
    {
      sequelize,
      modelName: "Log",
      underscored: true,
      tableName: 'tbl_logs',
      paranoid:true,
      deletedAt:"deleted_at"
    }
  );
  return Log;
};
