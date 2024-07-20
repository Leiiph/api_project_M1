const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'api-m1.clewiamiykdf.us-east-2.rds.amazonaws.com', 
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'projet_api',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
