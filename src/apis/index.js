import express from 'express';
import userRoute from './router/users.router';
import authRoute from './router/auth.router';
import pollRoute from './router/polls.router'

const router = express.Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/poll', pollRoute);
router.use('/poll/opt', pollRoute);

export default router;