const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const db = require('./models/index.js');

//Check db connection is successful
db.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

//Sync database with models
db.sequelize.sync();

app.use(bodyParser.json());

// Routes
app.use('/v1', require('./routes/v1.0.0/user.js')(express));
app.use('/v1', require('./routes/v1.0.0/character.js')(express));
app.use('/v1', require('./routes/v1.0.0/stats.js')(express));

// Server Active
module.exports = app.listen(port, () => {
	console.log('Server running on port: ', port);
})
