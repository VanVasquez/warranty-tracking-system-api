const router = require('express').Router();
const controller = require('../controllers');

router.post('/register', controller.auth.CreateAccount);
router.post('/login', controller.auth.LoginAccount);
router.get('/valid', controller.auth.ValidEmail);

module.exports = router;
