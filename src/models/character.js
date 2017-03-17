'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('Character', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Character.hasMany(models.Stats);
      }
    }
  });
  return Character;
};

// Character Table:
//   id UNIQUE INT
//   name STRING