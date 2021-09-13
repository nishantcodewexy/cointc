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
      // TODO: Associate referrer (User) and referred (User)
    }
  };
  Referral.init({
    // TODO: Remove after association
    referrer: DataTypes.UUID,
    referred: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Referral',
    underscored: true,
  });
  return Referral;
};