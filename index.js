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

var find_post = function (postid) {
    var promise = new Promise(function (resolve, reject) {
        var pid;
        var title;
        var content;

        siteone_db.query("SELECT * FROM simpleblog", function (err, res) {
            if (err) {
                reject(err)
            } else {
                title = res.rows[0]["title"];
            }
        });
    });

    return promise;
};

app.get('/post/:id', (req, res) => {
    find_post(1)
    .then(function success(result) {
        console.log(result);
        console.log(result);
    }, function error(error) {
        console.log(error);
    });
    
});

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () =>{
	const strin = `listening on port: ${PORT}`;
	console.log(strin)
});