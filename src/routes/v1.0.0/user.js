module.exports = (express) => {
	const router = express.Router();

	const Sequelize = require('sequelize');
	const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD);

	//models
	//const User = require('../models').User;
	///const MatchData = require('../models').MatchData;

	router.get('/user/test', (req, res) => {
		res.json({healthy: true});
	});

	// get users based on ID, will return all stats for that character
	router.get('/user/:uid', (req, res) => {
		//get user based on id
			//.then
				//get matches based on user id
					//.then
						//assign results to array var
						//create temp healing, damage, wins and losses variable
						//foreach through array
							//temp += arrayvariable
						//res.json{uid, healing, damage, wins, losses}
	});

	// add new user to the database
	router.post('/user/:uname', (req, res) => {
		//if (!find users by id = null)
			//user.create({insert user params})
				//res.json new user json
	});

	

	return router;
}