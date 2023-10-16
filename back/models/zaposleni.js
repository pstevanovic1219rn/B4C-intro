'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zaposleni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Zaposleni.init({
    jmbg: DataTypes.STRING,
    ime: DataTypes.STRING,
    prezime: DataTypes.STRING,
    email: DataTypes.STRING,
    adresa: DataTypes.STRING,
    pozicija: DataTypes.STRING,
    datum_zaposlenja: DataTypes.STRING,
    nadredjeni: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Zaposleni',
  });
  return Zaposleni;
};