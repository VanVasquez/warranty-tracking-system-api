const allowedOrigins = require('../allowedOrigins');

module.exports = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) !== -1 || !origin) {
      callback(null, true);
    } else callback(new Error('Not Allowed by CORS'));
  },
};
