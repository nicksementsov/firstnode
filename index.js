const path = require("path");
const express =  require("express");
const { Pool } = require("pg");			// Extracting class Pool

const app = express();
const siteone_db = new Pool();

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
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

function find_post(postid, callBack) {
    siteone_db.query("SELECT * FROM simpleblog WHERE id = $1", [postid], (err, res) => {
        if (err) {
            failure: callBack(err, null);
        } else {
            success: callBack(null, res.rows[0]);
        }
    });
}

app.get('/post/:postid', (req, res) => {
    const { postid } = req.params;
    find_post(parseInt(postid), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('viewpost', 
                        {title: result["title"], 
                        author: result["author"], 
                        content: result["content"]});
        }
    });
});

app.get('/', (req, res) => {
	res.render('index', {title: "Home"});
});

app.listen(PORT, () =>{
	const strin = `listening on port: ${PORT}`;
	console.log(strin)
});