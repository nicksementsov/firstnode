const { pool } = require("./index");

async function read_table() {
	try {
		const res = await pool.query("SELECT * FROM appone_choice");
		console.log(res.rows);
	} catch (error) {
		console.error(error);
	}
};

read_table();