'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Customer.init({
    id: {type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true, allowNull: false},
    id_shop: {type: DataTypes.INTEGER, allowNull: true,},
    first_name: {type: DataTypes.STRING, allowNull: true,},
    last_name: {type: DataTypes.STRING, allowNull: true,},
    password: {type: DataTypes.STRING, allowNull: false,},
    mail: {type: DataTypes.STRING, allowNull: false,},
    address: {type: DataTypes.STRING, allowNull: true,},
    phone: {type: DataTypes.STRING, allowNull: true,},
    updatedAt: {type: DataTypes.DATE},
    createdAt: {type: DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
    autoQueryFallback: true
  });
  return Customer;
};