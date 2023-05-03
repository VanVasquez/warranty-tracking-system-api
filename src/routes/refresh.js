const router = require('express').Router();
const controller = require('../controllers');

router.get('/refresh', controller.refresh.Refresh);

module.exports = router;
