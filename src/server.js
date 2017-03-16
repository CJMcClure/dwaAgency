const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/v1', require('./routes/v1.0.0/user.js')(express));
app.use('/v1', require('./routes/v1.0.0/character.js')(express));

// Server Active
module.exports = app.listen(port, () => {
	console.log('Server running on port: ', port);
})
