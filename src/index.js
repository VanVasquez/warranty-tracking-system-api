const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

function Start() {
  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
  });
}

module.exports = { Start };
