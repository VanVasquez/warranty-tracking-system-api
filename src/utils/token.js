const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
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
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
