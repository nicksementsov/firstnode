const express =  require("express");
const { Pool } = require("pg");			// Extracting class Pool

const app = express();
const siteone_db = new Pool({
	user: 'djangobot',
	database: 'siteone',
	password: 'berryTrauma',
	port: 5432,
	host: 'localhost',
});

module.exports = { siteone_db };

const PORT = 8080;

// With a querystring
app.get('/search', (req, res) => {
	const { month, day} = req.query;
	res.send(`Searching day ${day} of ${month}.`);
})

app.get('/:month/:day', (req, res) => {
	const { month, day } = req.params;
	res.send(`Day ${day} of ${month}.`)
})

app.get('/:month', (req, res) => {
	const { month } = req.params;
	res.send(`Month of ${month}.`);
})

app.get('/', (req, res) => {
	res.send('Home');
})

app.listen(PORT, () =>{
	const strin = `listening on port: ${PORT}`;
	console.log(strin)
});