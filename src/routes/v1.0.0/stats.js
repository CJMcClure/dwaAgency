module.exports = (express) => {
	const router = express.Router();


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
					'match': req.body.match_id,
					'character': req.body.character_id,
					'user': req.body.user_id,
					'result':req.body.result, 
					'damage':req.body.damage, 
					'healing':req.body.healing, 
					'secret':'Passed'
				});
		}
	});

}