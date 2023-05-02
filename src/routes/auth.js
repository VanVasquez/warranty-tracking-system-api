const router = require('express').Router();
const controller = require('../controllers');

router.post('/register', controller.auth.CreateAccount);
router.post('/login', controller.auth.LoginAccount);

module.exports = router;
