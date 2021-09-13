'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AuthToken.init({
    account: DataTypes.STRING,
    token: DataTypes.STRING,
    expires_at: DataTypes.DATE,
    ip_address: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AuthToken',
    underscored: true,
  });
  return AuthToken;
};