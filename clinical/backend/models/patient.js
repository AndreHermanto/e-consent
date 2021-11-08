'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Patient.init({
    clinId: DataTypes.STRING,
    familyName: DataTypes.STRING,
    givenName: DataTypes.STRING,
    sex: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    number: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    consentSampleOnescreen: DataTypes.BOOLEAN,
    consentSampleTesting: DataTypes.BOOLEAN,
    consentSampleStorage: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};