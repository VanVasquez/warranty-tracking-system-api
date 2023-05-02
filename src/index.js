const express = require('express');

const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

function Start() {
  db.getConnection((err, connection) => {
    console.log(`Connected to database id: ${connection.threadId}`);
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  });
}

module.exports = { Start };
