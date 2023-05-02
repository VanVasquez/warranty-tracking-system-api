const router = require('express').Router();
const controller = require('../controllers');

router.get('/all', controller.user.GetAllUsers);

module.exports = router;
