'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Referral } = models;
    }
  };
  Referral.init({
    // referrerId: {
    //   type: DataTypes.INTEGER, 
    // },
    // referredId: {
    //   type: DataTypes.INTEGER,
    // }
  }, {
    sequelize,
    modelName: 'Referral',
    underscored: true,
    tableName: 'tbl_referrals'
  });
  return Referral;
};