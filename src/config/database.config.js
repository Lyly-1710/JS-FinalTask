import mysql from 'mysql2/promise';

const pool = mysql.createPool({
	host: "54.252.34.58",
	user: 'root',
	password: 'lilyy87',
	database: 'poll_sgup',
	port: 3306
});

export default pool;