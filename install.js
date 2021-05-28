const productionConfig = require('./.env');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'sensei_sensor',
	connectionLimit: 5
});

pool.getConnection()
	.then(connection => {
		connection.query('create table users (user_id int primary key auto_increment, user_name varchar(40), role tinyint, is_public tinyint default "0")')
			.then((rows) => {
				console.log(rows);
			})
			.catch((err) => {
				console.log(err);
			})
		connection.query('create table rooms (room_id INT primary key auto_increment, room_name varchar(40), address varchar(40))')
			.then((rows) => {
				console.log(rows);
			})
			.catch((err) => {
				console.log(err);
			})
		connection.query('create table transactions (transaction_id int primary key auto_increment, user_id int, room_id int, created_at timestamp default current_timestamp)')
			.then((rows) => {
				console.log(rows);
			})
			.catch((err) => {
				console.log(err);
			})
		connection.query('create table tags (mac_address varchar(20) primary key, user_id int, description varchar(40))')
			.then((rows) => {
				console.log(rows);
			})
			.catch((err) => {
				console.log(err);
			})
		connection.end()
	});