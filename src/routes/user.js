const router = require('express').Router();
const controller = require('../controllers');

router.get('/all', controller.user.GetAllUsers);
router.get('/logout', controller.user.Logout);
module.exports = router;
