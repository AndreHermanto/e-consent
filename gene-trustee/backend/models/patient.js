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
    sampleId: DataTypes.STRING,
    familyNameInitials: DataTypes.STRING,
    givenNameInitials: DataTypes.STRING,
    sex: DataTypes.STRING,
    yearOfBirth: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};