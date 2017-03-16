module.exports = (express) => {
	const router = express.Router();

	// Sequelize Database Connection
	const Sequelize = require('sequelize');
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD);

    // Models
    // UNCOMMENT MODEL CODE BELOW WHEN MODELS HAVE BEEN ADDED, OTHERWISE ERRORS WILL BE THROWN
    // const User = require('../models').User;
    // const Character = require('../models').Character;
    // const MatchData = require('../models').MatchData;

	router.get('/character/:uid/:cid', (req, res) => {
		

		res.json({healthy: true});
	});

	return router;
}