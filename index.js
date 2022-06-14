const express =  require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
	user: 'djangobot',
	database: 'siteone',
	password: 'berryTrauma',
	port: 5432,
	host: 'localhost',
});

module.exports = { pool };

const PORT = 8080;

app.use((req, res) =>{
	res.send("response");
});

app.listen(PORT, () =>{
	const strin = `listening on port: ${PORT}`;
	console.log(strin)
});