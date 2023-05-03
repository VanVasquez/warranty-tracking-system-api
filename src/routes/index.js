const router = require('express').Router();
const { authorizedToken } = require('../middlewares');
const authRouter = require('./auth');
const userRouter = require('./user');
const refreshRouter = require('./refresh');

router.use('/auth', authRouter);
router.use(refreshRouter);
router.use(authorizedToken);
router.use('/user', userRouter);
module.exports = router;
