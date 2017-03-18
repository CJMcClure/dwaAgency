module.exports = (express) => {
	const router = express.Router();
	const Stats = require('../../models').Stats;

	router.get('/stats/test', (req, res) =>
	{
		res.json({healthy: true});
	});

	router.post('/stats/', (req, res) => 
	{

		if(req.body.secret === "test_secret_password")
		{
			Stats.create(
			{
				'MatchId': req.body.match_id,
				'CharacterId': req.body.character_id,
				'UserId': req.body.user_id,
				'result':req.body.result,
				'damage':req.body.damage,
				'healing':req.body.healing,
				'secret':'Passed'
			}).then( (match)=>{
				res.json( {"match": match} );
			})
			
		}
		else
		{
			res.json({"msg":"Match Could Not Be Added. Bad Password"});
		}
	});
	return router;
}
