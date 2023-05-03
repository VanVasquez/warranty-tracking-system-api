const bcrypt = require('bcryptjs');

module.exports = {
  encryptPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          reject(err);
        } else {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        }
      });
    });
  },

  checkPassword: (password, existingPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, existingPassword, (err, match) => {
        if (err) {
          reject(err);
        } else {
          resolve(match);
        }
      });
    });
  },
};
