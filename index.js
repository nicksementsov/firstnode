const path = require("path");
const express =  require("express");
const { Pool } = require("pg");			// Extracting class Pool

const app = express();
const siteone_db = new Pool();

app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

module.exports = { siteone_db };

const PORT = 8080;

/*
// With a querystring
app.get('/search', (req, res) => {
	const { month, day} = req.query;
	res.send(`Searching day ${day} of ${month}.`);
});

app.get('/:month', (req, res) => {
	const { month } = req.params;
	res.send(`Month of ${month}.`);
});
*/

function find_post(postid, callBack) {
    siteone_db.query("SELECT * FROM simpleblog WHERE id = $1;", [postid], (err, res) => {
        if (err) {
            failure: callBack(err, null);
        } else {
            success: callBack(null, res.rows[0]);
        }
    });
}

function find_posts(num=-1, callBack) {
    siteone_db.query("SELECT * FROM simpleblog;", (err, res) => {
        if (err) {
            failure: callBack(err, null);
        } else {
            if (num==-1) {
                success: callBack(null, res.rows);
            } else {
                success: callBack(null, res.rows.slice(0, num));
            }
        }
    });
}

function add_post(newPost, callBack) {
    query = "INSERT INTO simpleblog (TITLE, AUTHOR, CONTENT) VALUES ($1, $2, $3);";
    console.log(newPost);
    values = [newPost["title"], newPost["author"], newPost["story"]];
    siteone_db.query(query, values, (err, res) => {
        if (err) {
            failure: callBack(err, null);
        } else {
            success: callBack(null, res);
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

app.post('/publish', (req, res) => {
    add_post(req.body, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
    res.redirect(301, '/stories');
});

app.get('/newstory', (req, res) => {
    res.render('newstory', {title: "New Story"});
});

app.get('/stories', (req, res) => {
    find_posts(-1, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('storylist', {title: "All Stories", stories: result});
        }
    });
});

app.get('/', (req, res) => {
    find_posts(3, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {title: "Home", stories: result});
        }
    });

});

app.listen(PORT, () =>{
	const strin = `listening on port: ${PORT}`;
	console.log(strin)
});