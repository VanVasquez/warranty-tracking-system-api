const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        UserInfo: {
          username: user.username,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
  },
  verifyAccessToken: (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  },
  verifyRefreshToken: (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  },
};
