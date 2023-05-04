const db = require('../database');
const { encryptPassword, checkPassword } = require('../utils/bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

module.exports = {
  CreateAccount: async (req, res) => {
    const user = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      company: req.body.company,
      contacts: req.body.contacts,
      position: req.body.position,
      address: req.body.address,
      role: req.body.role || 'User', // default role is user
    };
    const query = `SELECT COUNT(*) as count FROM users where username = '${user.username}'`;
    db.query(query, function (err, result) {
      if (err) {
        return res
          .status(500)
          .json({ message: 'An error occured while checking users existence', error: err });
      }
      if (result[0].count > 0) {
        return res.status(400).json({ message: 'username taken' });
      } else {
        encryptPassword(user.password).then((hash) => {
          const insertQuery = `
          INSERT INTO users(name, username, password, company, contacts, position, address, role)
          VALUES (
            '${user.name}', '${user.username}', '${hash}', '${user.company}', '${user.contacts}', '${user.position}', '${user.address}', '${user.role}')
            `;

          db.query(insertQuery, function (err, result) {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ message: 'An error occured while adding user', error: err });
            }
            console.log(result);
            res.status(201).json();
          });
        });
      }
    });
  },
  LoginAccount: async (req, res) => {
    const user = { username: req.body.username, password: req.body.password };
    const query = `SELECT * FROM users WHERE username = '${user.username}'`;

    db.query(query, function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: 'An error occured while checking users existence', error: err });
      }
      if (result.length === 0) {
        return res.status(401).json({ message: 'invalid username or password' });
      }
      const fetchUser = result[0];

      checkPassword(user.password, fetchUser.password).then((match) => {
        if (!match) {
          return res.status(401).json({ message: 'invalid username or password' });
        }
        const accessToken = generateAccessToken(fetchUser);
        const refreshToken = generateRefreshToken(fetchUser);

        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          message: 'Login successful',
          user: fetchUser.name,
          accessToken: accessToken,
        });
      });
    });
  },
  ValidEmail: async (req, res) => {
    const { username } = req.query;
    const query = `
    SELECT * FROM users WHERE username = '${username}' LIMIT 0,100
    `;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: 'An error occured while checking users existence', error: err });
      }
      if (result.length === 0) {
        return res.status(200).json({ message: 'good username' });
      }
      return res.status(406).json({ message: 'username taken' });
    });
  },
};
