module.exports = (express) => {
	const router = express.Router();

	// Sequelize Database Connection
	const Sequelize = require('sequelize');

    // Models

    const User = require('../../models').User;
    const Character = require('../../models').Character;
    const Stats = require('../../models').Stats;

    // Test route for Mocha test
    router.get('/character/test', (req, res) => {
    	res.json({healthy: true});
    });

    // Get all stats for a specified user's character
	router.get('/character/:uid/:cid', (req, res) => {
		// Check if user exists
		User.findOne({
			where: {
				id: req.params.uid
			}
		}).then((user) => {
			// Check if character exists
			Character.findOne({
				where: {
					id: req.params.cid
				}
			}).then((character) => {
				// Check if stats exists
				Stats.findAll({
					where: {
						UserId: req.params.uid,
						CharacterId: req.params.cid
					}
				}).then(function(result) {
					var tempDamage = 0;
					var tempHealing = 0;
					var tempWins = 0;
					var tempLosses = 0;

					// Loop through all match data results
					result.forEach((match) => {
						tempDamage += match.damage;
						tempHealing += match.healing;

						// Check if match is a win (1) or a loss (0)
						if (match.result == 0) {
							tempLosses += 1;
						} else {
							tempWins += 1;
						}
					});

					// Returns the specified user's character's total stats
					res.json({
						UserId: req.params.uid, 
						Username: user.name, 
						CharacterId: req.params.cid, 
						CharacterName: character.name, 
						damage: tempDamage, 
						healing: tempHealing, 
						wins: tempWins, 
						losses: tempLosses
					});
				}).catch((err) => {
					res.json({msg: "No stats found!", error: err});
				}); // End of stats exists check
			}).catch((err) => {
				res.json({msg: "No character found!", error: err});
			}); // End of character exists check
		}).catch((err) => {
			res.json({msg: "No user found!", error: err});
		}); // End of user exists check
	});

	return router;
}