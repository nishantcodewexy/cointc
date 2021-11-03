"use strict";
const { Model } = require("sequelize");
const {
  tableNames,
  TicketPriorityType,
  TicketStatusType,
} = require("../../consts");
const faker = require("faker")

module.exports = (sequelize, DataTypes) => {
  class SupportTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { User, SupportTicket } = models;

      User.hasMany(SupportTicket, {
        foreignKey: "user_id",
      });
      User.hasMany(SupportTicket, {
        foreignKey: "assigned_to",
      });
      SupportTicket.belongsTo(User);
    }

    static FAKE(count){
      let rows = [],
        result = {},
        index = 0;
      let generateFakeData = () => {
        
        
          
        return {
          id: faker.datatype.uuid(),
          priority: faker.helpers.randomize(Object.keys(TicketPriorityType)),
          subject: faker.lorem.sentence(),
          description: faker.lorem.sentences(),
          status: faker.helpers.randomize(Object.keys(TicketStatusType)),
          archived_at: faker.datatype.datetime(),
          
        };
      };
      if (count > 1) {
        for (; index < count; ++index) {
          rows.push(generateFakeData());
        }
        result = { count, rows };
      } else result = { ...generateFakeData() };
      return result;
    }
  }

  SupportTicket.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      priority: {
        type: DataTypes.ENUM(Object.keys(TicketPriorityType)),
        allowNull: false,
        defaultValue: TicketPriorityType.LOW,
      },
      subject: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM(Object.keys(TicketStatusType)),
        allowNull: false,
        defaultValue: TicketStatusType.OPEN,
      },
      archived_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "SupportTicket",
      tableName: tableNames?.SUPPORT_TICKET || "tbl_support_tickets",
      underscored: true,
      paranoid: true,
      deletedAt: "archived_at",
    }
  );
  return SupportTicket;
};
