module.exports = (express) => {
	const router = express.Router();

	// Sequelize Database Connection
	const Sequelize = require('sequelize');
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD);

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
		MatchData.findAll({
			where: {
				user_id: req.uid,
				char_id: req.cid
			}
		}).then(function (result) {
			var tempDamage = 0;
			var tempHealing = 0;
			var tempWins = 0;
			var tempLosses = 0;

			tempDamage += result.damage;
			tempHealing += result.healing;

			if (result.result == 0) {
				tempLosses += 1;
			} else {
				tempWins += 1;
			}

			// Returns the specified user's character's total stats
			res.json({userID: req.uid, charID: req.cid, totalDamage: tempDamage, totalHealing: tempHealing, totalWins: tempWins, totalLosses: tempLosses});
		});
	});

	return router;
}