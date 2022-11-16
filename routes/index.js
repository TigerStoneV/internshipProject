const router = require('express').Router();

const postRouter = require('./postRouter');

router.use('/post', postRouter);

module.exports = router;