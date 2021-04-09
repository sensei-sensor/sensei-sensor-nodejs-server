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

router.post('/', (req, res, next) => {
	let userId;
	pool.getConnection()
		.then(connection => {
			connection.query('SELECT user_id FROM tags WHERE mac_address = ?', [req.body.mac_address])
				.then((rows) => {
					if (rows[0] != undefined) {
						userId = rows[0].user_id;
						connection.query('INSERT INTO transactions (user_id, room_id) value (?, ?)', [userId, req.body.room_id])
							.then((rows) => {
								param = JSON.stringify(rows);
								res.header('Content-Type', 'application/json; charset=utf-8');
								res.send(param);
								connection.end();
							})
							.catch(err => {
								//handle error
								console.log(err);
								res.header('Content-Type', 'application/json; charset=utf-8');
								res.send();
								connection.end();
							})
					} else {
						console.log("未登録")
						res.header('Content-Type', 'application/json; charset=utf-8');
						res.send();
						connection.end();
					}
				})
				.catch(err => {
					//handle error
					console.log(err);
					res.header('Content-Type', 'application/json; charset=utf-8');
					res.send();
					connection.end();
				})
		}).catch(err => {
			//not connected
			console.log(err);
			res.header('Content-Type', 'application/json; charset=utf-8');
			res.send();
		});
});

module.exports = router;