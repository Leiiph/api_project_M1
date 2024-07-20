// File to handle connection with the mysql database
require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'api-m1.clewiamiykdf.us-east-2.rds.amazonaws.com',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:'projet_api'
});

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connection done.');
});

module.exports = connection;