const express = require('express');
const router = express.Router();
require('dotenv').config();

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: 'sensei_sensor',
	connectionLimit: 5
});

router.get('/', (req, res) => {
	let param;
	pool.getConnection()
		.then(connection => {
			connection.query('SELECT created_at, user_id, room_id, user_name, room_name, address, is_public FROM transactions t1 NATURAL JOIN users NATURAL JOIN rooms WHERE created_at = (SELECT MAX(t2.created_at) FROM transactions t2 WHERE t1.user_id = t2.user_id)')
				.then((rows) => {
					param = JSON.stringify(rows);
					res.header('Content-Type', 'application/json; charset=utf-8');
					res.send(param);
					connection.end();
				});
		});
});

router.get('/:id', (req, res) => {
	let param;
	let userId = req.params.id;
	pool.getConnection()
		.then(connection => {
			connection.query('SELECT * FROM users WHERE user_id = ?', [userId])
				.then((rows) => {
					param = JSON.stringify(rows);
					res.header('Content-Type', 'application/json; charset=utf-8');
					res.send(param);
					connection.end();
				});
		});
})

router.put('/:id/:is_public', (req, res) => {
	let param;
	let userId = req.params.id;
	let is_public = req.params.is_public

	pool.getConnection()
	.then(connection => {
		connection.query('UPDATE users SET is_public = ? WHERE user_id = ?', [is_public, userId])
			.then((rows) => {
				param = JSON.stringify(rows);
				res.header('Content-Type', 'application/json; charset=utf-8');
				res.send(param);
				connection.end();
			});
	});
})

module.exports = router;