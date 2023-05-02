const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db = require('./database');
const routers = require('./routes');
const middleware = require('./middlewares');
const config = require('./config');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(middleware.credentials);
app.use(cors(config));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', routers);

module.exports = {
  Start: () => {
    db.getConnection((err, connection) => {
      console.log(`Connected to database id: ${connection.threadId}`);
      app.listen(PORT, () => {
        console.log(`App started on port ${PORT}`);
      });
    });
  },
};
