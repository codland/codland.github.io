const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser'); // parsing JSON & URL-enconded data
const multer = require('multer'); // parsing multipart/form data
let db = new sqlite3.Database('./users/users.db');
let upload = multer();
let app = express();


app.use(express.static('.'));
app.use(upload.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', function(req, res) {
	let details = [req.body.user_name, req.body.user_email, req.body.user_message];
	let sql = 'INSERT INTO UserRequest(name, email, message) VALUES (?, ?, ?)';
	db.run(sql, details, function(err) {
		if (err) {
			console.error(err.message);
		} else {
			res.send('I hear you!');
		}
	});
});

app.get('/requests', function(req, res) {
	db.all('SELECT * FROM UserRequest', [], function(err, rows) {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows)+'\n');
		// res.json(rows + '\n');
	});
});

app.delete('/delete/:name', function(req, res) {
	db.run('DELETE FROM UserRequest WHERE name=?', req.params.name, function(err) {
		if (err) {
			res.status(400).send(err.message + '\n');
		}
		res.status(200).send('Deleted succesfully\n');
	});
});

app.listen(3000);
