const jwt = require('jsonwebtoken');
const db = require('../database');

module.exports = {
  Refresh: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);

    const refreshToken = cookies.jwt;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(decoded);
    const query = `
      SELECT (*) FROM users WHERE username = '${decoded.UserInfo.username}'
    `;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'account not found' });
      }
      const user = result[0];
      if (!user) {
        return res.status(403).json({ message: 'account not found' });
      }
      const accessToken = generateAccessToken(user);
      res.status(200).json({ user: user.username, accessToken, name: user.name });
    });
  },
};
