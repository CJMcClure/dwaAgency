'use strict';
module.exports = function(sequelize, DataTypes) {
	var Stats = sequelize.define('Stats', {
		id: {
		  type: DataTypes.INTEGER,
		  autoIncrement: true,
		  primaryKey: true
		},
		result: DataTypes.INTEGER,
		damage: DataTypes.INTEGER,
		healing: DataTypes.INTEGER,
		secret: DataTypes.STRING,

	}, {
    classMethods: {
		associate: function(models) {
		// associations can be defined here
			Stats.belongsTo(models.User, {
			 	foreignKey: {
			    	allowNull: false
				}
			});

			Stats.belongsTo(models.Character, {
			 	foreignKey: {
			    	allowNull: false
				}
			});

			Stats.belongsTo(models.Match, {
				foreignKey: {
					allowNull: false
				}
			});
		}
	}
});
return Stats;
}


// Match Data Table:
//   id UNIQUE INT
//   match_id REFERENCE TO MATCH ID
//   player_id REFERENCE TO USER ID
//   character_id REFERENCE TO CHARACTER ID
//   result INT 0 or 1
//   damage INT
//   healing INT
//   secret STRING