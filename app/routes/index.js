const express = require('express');
const router = express.Router();
const userRouter = require('../routes/userRouter');
const boardRouter = require('../routes/boardRouter');
const taskRouter = require('../routes/taskRouter');
const inviteRouter = require('../routes/inviteRouter');
const archiveRouter = require('../routes/archiveRouter');
const assignedRouter = require('../routes/assignedRouter');
const transactionRouter = require('../routes/transactionRouter');

router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/task', taskRouter);
router.use('/invite', inviteRouter);
router.use('/archive', archiveRouter);
router.use('/assigned', assignedRouter);
router.use('/transaction', transactionRouter);

module.exports = router;
