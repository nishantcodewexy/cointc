"use strict";
const { Model } = require("sequelize");
const {
    types:{
        TicketSubjectType,
        TicketStatusType
    }
} = require("../../consts")
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {User,Ticket} = models

      User.hasMany(Ticket,{
        foreignKey:"user_id"
      })
      Ticket.belongsTo(User)
    }
  }
  Ticket.init(
    {
      id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
      },
      subject: {
        type:DataTypes.ENUM(Object.keys(TicketSubjectType)),
        allowNull:false,
        defaultValue:TicketSubjectType.LOW
      },
      description:DataTypes.STRING,
      status: {
        type:DataTypes.ENUM(Object.keys(TicketStatusType)),
        allowNull:false,
        defaultValue:TicketStatusType.OPEN
      },
    },
    {
      sequelize,
      modelName: "Ticket",
      tableName: "tbl_tickets",
      underscored: true,
      paranoid:true,
      deletedAt: 'deleted_at'
    }
  );
  return Ticket;
};
