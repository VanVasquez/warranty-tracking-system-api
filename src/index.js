const express = require('express');

const db = require('./database');
const routers = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/v1', routers);

function Start() {
  db.getConnection((err, connection) => {
    console.log(`Connected to database id: ${connection.threadId}`);
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  });
}

module.exports = { Start };
