const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users/users.db');

let sql = 'SELECT * FROM UserRequest';

db.all(sql, [], function(err, rows) {
	if (err) {
		throw err;
	}
	console.log(typeof rows);
	console.log(rows);
});

db.close();
