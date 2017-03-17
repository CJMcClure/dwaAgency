module.exports = (express) => {
	const router = express.Router();

	//const Sequelize = require('sequelize');
	//const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD);

	//models
	const User = require('../../models').User;
	const Stats = require('../../models').Stats;

	//test route for unit testing
	router.get('/user/test', (req, res) => {
		res.json({healthy: true});
	});

	// get users based on ID, will return all stats for that character
	router.get('/user/:uid', (req, res) => {
		//query matchData table with userId
		Stats.findAll({
			where: {
				UserId: req.params.uid
			}
		}).then(function(matches) {
			//variables to be incremented 
			var tempHealing = 0;
			var tempDamage = 0;
			var tempWins = 0;
			var tempLoss = 0;

			//iterating through the array of results from the table query
			//totaling up stats
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

			//querying users table to output calculated stats
			User.findAll({
				where: {
					id: req.params.uid
				}
			}).then(function(user) {
				res.json({
					id: user[0].id,
					username: user[0].name,
					healing: tempHealing,
					damage: tempDamage,
					wins: tempWins,
					losses: tempLoss
				});
			}).catch((err) => {
				res.json({msg: "User not found", err: err});
			});

		}).catch((err) => {
			res.json({msg: "No matches for that user", err: err});
		});
	});

	// add new user to the database
	router.post('/user', (req, res) => {
		User.create({name: req.body.name}).then((user) => {
			res.json({id: user.id, name: user.name});
		});
	});


	return router;
}




