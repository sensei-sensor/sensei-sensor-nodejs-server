const express = require('express');
const router = express.Router();
const productionConfig = require('../production-config');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: productionConfig.db.host,
	user: productionConfig.db.user,
	password: productionConfig.db.password,
	connectionLimit: 5
});

/* サンプルAPI① 
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get('/', (req, res, next) => {
	let param = { "値": "これはサンプルAPIです。" };
	res.header('Content-Type', 'application/json; charset=utf-8')
	res.send(param);
});

/* サンプルAPI② 
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get('/hello', (req, res, next) => {
	let param = { "result": "Hello World !" };
	res.header('Content-Type', 'application/json; charset=utf-8')
	res.send(param);
});

/* サンプルAPI③ 
 * http://localhost:3000/samples/hello/(任意の文字列) にGETメソッドのリクエストを投げると、
 * JSON形式で(任意の文字列)を返す。
 */
router.get('/hello/:place', (req, res, next) => {
	let param = { "result": "Hello " + req.params.place + " !", "shop name": req.query.shop };
	res.header('Content-Type', 'application/json; charset=utf-8')
	res.send(param);
});

/* サンプルAPI④ 
 * http://localhost:3000/samples にPOSTメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.post('/', (req, res, next) => {
	let param = { "値": "POSTメソッドのリクエストを受け付けました", "bodyの値": req.body.name };
	pool.getConnection()
		.then(conn => {
			conn.query("SELECT 1 as val")
			.then((rows) => {
				console.log(rows); //[ {val: 1}, meta: ... ]
				//Table must have been created before 
				// " CREATE TABLE myTable (id int, val varchar(255)) "
				return conn.query("INSERT INTO test_database.test_table(name, address) value (?, ?)", [req.body.name, req.body.address]);
			})
			.then((res) => {
				console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
				conn.end();
			})
			.catch(err => {
				//handle error
				console.log(err);
				conn.end();
			})
		}).catch(err => {
			//not connected
			console.log(err);
		});
	res.header('Content-Type', 'application/json; charset=utf-8')
	res.send(param);
});

module.exports = router;