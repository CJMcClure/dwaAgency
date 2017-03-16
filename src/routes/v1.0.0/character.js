module.exports = (express) => {
	const router = express.Router();

	// Sequelize Database Connection
	const Sequelize = require('sequelize');
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD);

    // Models
    // const User = require('../models').User;
    // const Character = require('../models').Character;
    // const MatchData = require('../models').MatchData;

    router.get('/character/test', (req, res) => {
    	res.json({healthy: true});
    });

	router.get('/character/:uid/:cid', (req, res) => {
		MatchData.findAll({
			where: {
				user_id: req.uid
			}
		}).then(function (result) {
			console.log(result);
		});

		res.json({healthy: true});
	});

	return router;
}