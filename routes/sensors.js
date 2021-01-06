const express = require('express');
const router = express.Router();
const productionConfig = require('../production-config');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: productionConfig.db.host,
	user: productionConfig.db.user,
	password: productionConfig.db.password,
	database: 'sensei_sensor',
	connectionLimit: 5
});

router.post('/', (req, res, next) => {
	let userId;
	pool.getConnection()
		.then(connection => {
			connection.query('SELECT user_id FROM tags WHERE mac_address = ?', [req.body.mac_address])
				.then((rows) => {
					userId = rows[0].user_id;
					connection.query('INSERT INTO transactions (user_id, room_id) value (?, ?)', [userId, req.body.room_id])
						.then((rows) => {
							param = JSON.stringify(rows);
							res.header('Content-Type', 'application/json; charset=utf-8');
							res.send(param);
							console.log(rows)
							connection.end();
						})
						.catch(err => {
							//handle error
							console.log(err);
							res.header('Content-Type', 'application/json; charset=utf-8');
							connection.end();
						})
				})
				.catch(err => {
					//handle error
					console.log(err);
					res.header('Content-Type', 'application/json; charset=utf-8');
					connection.end();
				})
		}).catch(err => {
			//not connected
			console.log(err);
			res.header('Content-Type', 'application/json; charset=utf-8');
			connection.end();
		});
});

module.exports = router;