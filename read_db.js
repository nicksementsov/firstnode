const { siteone_db } = require("./index");

async function read_table() {
	try {
		const res = await siteone_db.query("SELECT * FROM simpleblog");
		console.log(res.rows);
	} catch (error) {
		console.error(error);
	}
};

read_table();