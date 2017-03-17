module.exports = (express) => {
	const router = express.Router();

	//const Sequelize = require('sequelize');
	//const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD);

	//models
	const User = require('../models').User;
	const MatchData = require('../models').MatchData;

	//test route for unit testing
	router.get('/user/test', (req, res) => {
		res.json({healthy: true});
	});

	// get users based on ID, will return all stats for that character
	router.get('/user/:uid', (req, res) => {
		//query match data table
		MatchData.findAll({
			where: {
				userId: req.params.uid
			}
		}).then(function(matches) {
			var tempHealing = 0;
			var tempDamage = 0;
			var tempWins = 0;
			var tempLoss = 0;

			matches.forEach((match) => {
				tempHealing += match.healing;
				tempDamage += match.damage;
				if (match.result == 1) {
					tempWins += 1;
				}
				if (match.result == 0) {
					tempLoss += 1;
				} 
			});

			User.findAll({
				where: {
					userId: req.params.uid
				}
			}).then(function(user) {
				res.json({
					id: user.id,
					username: user.username,
					healing: tempHealing,
					damage: tempDamage,
					wins: tempWins,
					losses: tempLoss
				});
			});
		});
	});

	// add new user to the database
	router.post('/user/:uname', (req, res) => {
		//if (!find users by id = null)
			//user.create({insert user params})
				//res.json new user json
	});


	return router;
}




