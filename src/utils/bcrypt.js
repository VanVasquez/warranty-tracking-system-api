const bcrypt = require('bcryptjs');

function encryptPassword(password) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      return hash;
    });
  });
}

function checkPassword(password, existingPassword) {
  bcrypt.compare(password, existingPassword, (err, match) => {
    return match;
  });
}

module.exports = {
  encryptPassword,
  checkPassword,
};
