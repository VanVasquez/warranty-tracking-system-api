const bcrypt = require('bcryptjs');

module.exports = {
  encryptPassword: (password) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        return hash;
      });
    });
  },
  checkPassword: (password, existingPassword) => {
    bcrypt.compare(password, existingPassword, (err, match) => {
      return match;
    });
  },
};
