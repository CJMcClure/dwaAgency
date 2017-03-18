module.exports = (express) => {
	const router = express.Router();


	router.get('/stats/test', (req, res) =>
	{
		res.json({healthy: true});
	});



	router.put('/stats/', (req, res) => 
	{

		if(req.body.secret === "test_secret_password")
		{
			Stats.create(
				{
					'match': req.body.match_id,
					'character': req.body.character_id,
					'user': req.body.user_id,
					'result':req.body.result,
					'damage':req.body.damage,
					'healing':req.body.healing,
					'secret':'Passed'
				});
			res.json({"msg":"Match Added Successfully"});
		}
		else
		{
			res.json({"msg":"Match Could Not Be Added. Bad Password"});
		}
	});
	return router;
}
