const e = require('express');
const mysql = require('mysql2');

let pool;

function handleConnection() {
  pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    waitForConnections: true,
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Database connection closed...');
        console.log('Reconnecting ...');
        handleConnection();
      } else if (err.code === 'ER_NOT_SUPPORTED_AUTH_MODE') {
        console.log('Authentication method not supported...');
        console.log('Reconnecting...');
        handleConnection();
      } else if (err.message === "Can't add new command when connection in closed state") {
        console.log('Connection closed...');
        console.log('Reconnecting...');
        handleConnection();
      } else {
        throw err;
      }
    }
  });
}

handleConnection();

module.exports = pool;
