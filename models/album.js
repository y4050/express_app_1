'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.album.hasMany(models.song);
    }
  };
  album.init({
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    songCount: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'album',
  });
  return album;
};