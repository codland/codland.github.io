const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users/users.db', sqlite3.OPEN_READWRITE, function(err) {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the sample database.');
});

db.run('CREATE TABLE UserRequest(name TEXT, email TEXT, message TEXT)');

db.close(function(err) {
	if (err) {
		console.error(err.message);
	}
	console.log('Closed the database connection.');
});
