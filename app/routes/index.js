const express = require('express');
const router = express.Router();
const userRouter = require('../routes/userRouter');
const boardRouter = require('../routes/boardRouter');
const taskRouter = require('../routes/taskRouter');

router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/task', taskRouter);

module.exports = router;
