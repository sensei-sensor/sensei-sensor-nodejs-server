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

module.exports = router;