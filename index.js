const path = require("path");
const express =  require("express");
const { Pool } = require("pg");			// Extracting class Pool

const app = express();
const siteone_db = new Pool();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

module.exports = { siteone_db };

const PORT = 8080;

// With a querystring
app.get('/search', (req, res) => {
	const { month, day} = req.query;
	res.send(`Searching day ${day} of ${month}.`);
});

app.get('/:month', (req, res) => {
	const { month } = req.params;
	res.send(`Month of ${month}.`);
});

async function find_post(postid) {
    try {
        const foundPost = await siteone_db.query("SELECT * FROM simpleblog");
	return { id: foundPost.rows[0]["id"], title: foundPost.rows[0]["title"] };
    } catch (error) {
        console.log(error);
    }
};

app.get('/post/:id', (req, res) => {
    const queryText = "SELECT * FROM simpleblog";
    var foundPost = find_post(1);
    console.log(foundPost);
    res.render('viewpost', { title: foundPost["title"]});
});

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () =>{
	const strin = `listening on port: ${PORT}`;
	console.log(strin)
});
