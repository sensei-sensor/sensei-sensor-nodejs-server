'use strict'

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

router.get('/', (req, res) => {
	let param;
	pool.getConnection()
		.then(connection => {
			connection.query('SELECT MAX(created_at) as created_at, user_id, room_id, room_name, address FROM transactions NATURAL JOIN rooms GROUP BY user_id')
				.then((rows) => {
					param = JSON.stringify(rows);
					res.header('Content-Type', 'application/json; charset=utf-8');
					res.send(param);
					connection.end();
				});
		});
});

module.exports = router;