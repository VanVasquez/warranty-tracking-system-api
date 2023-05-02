const allowedOrigins = require('../allowedOrigins');
const { verifyAccessToken } = require('../utils/token');

module.exports = {
  credentials: function (req, res, next) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.headers('Access-Control-Allow-Credentials', true);
    }
    next();
  },

  authorizedToken: function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ message: 'Missing authorization header' });
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(403).json({ message: 'Missing access token' });
    }

    try {
      const decoded = verifyAccessToken(accessToken);
      req.user = decoded.UserInfo.username;
      req.role = decoded.UserInfo.role;
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: 'Invalid access token' });
    }
  },
};
