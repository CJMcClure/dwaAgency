module.exports = (express) => {
	const router = express.Router();

	// Sequelize Database Connection
	const Sequelize = require('sequelize');

    // Models
    // UNCOMMENT THE BELOW CODE AND DELETE THIS LINE WHEN MODELS HAVE BEEN CREATED
    // const User = require('../models').User;
    // const Character = require('../models').Character;
    // const MatchData = require('../models').MatchData;

    // Test route for Mocha test
    router.get('/character/test', (req, res) => {
    	res.json({healthy: true});
    });

    // Get all stats for a specified user's character
	router.get('/character/:uid/:cid', (req, res) => {
		// Check if user exists
		User.findOne({
			where: {
				user_id: req.params.uid
			}
		}).then((user) => {
			// Check if character exists
			Character.findOne({
				where: {
					char_id: req.params.cid
				}
			}).then((character) => {
				// Check if match data exists
				MatchData.findAll({
					where: {
						player_id: req.params.uid,
						character_id: req.params.cid
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

						// Returns the specified user's character's total stats
						res.json({userID: req.params.uid, userName: user.username, charID: req.params.cid, charName: character.name, totalDamage: tempDamage, totalHealing: tempHealing, totalWins: tempWins, totalLosses: tempLosses});
					});
				}).catch((err) => {
					res.json({error: err});
				}); // End of match data exists check
			}).catch((err) => {
				res.json({error: err});
			}); // End of character exists check
		}).catch((err) => {
			res.json({error: err});
		}); // End of user exists check
	});

	return router;
}