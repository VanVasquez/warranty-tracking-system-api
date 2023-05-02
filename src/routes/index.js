const router = require('express').Router();
const { authorizedToken } = require('../middlewares');
const authRouter = require('./auth');
const userRouter = require('./user');
router.use('/auth', authRouter);
router.use(authorizedToken);
router.use('/user', userRouter);

module.exports = router;
