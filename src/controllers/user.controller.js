const db = require('../database');
module.exports = {
  GetAllUsers: async (req, res) => {
    console.log(req);
    const { offset } = req.body;
    if (req.role === 'Admin') {
      const query = `SELECT * FROM users LIMIT 10 OFFSET ${offset}`;
      db.query(query, (err, result) => {
        res.status(200).json({ result });
      });
    }
  },
  Logout: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.status(204).json();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204).json();
  },
};
