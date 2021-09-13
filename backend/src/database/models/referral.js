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
      // define association here
    }
  };
  Referral.init({
    referrer: DataTypes.UUID,
    referred: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Referral',
    underscored: true,
  });
  return Referral;
};