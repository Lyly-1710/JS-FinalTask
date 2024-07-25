import express from 'express';
import authController from '../controller/auth.controller';
import verify from '../../middleware/verify.middleware';

const route = express.Router();

route.post('/register', authController.register);
route.post('/login', authController.login);
route.post('/forgotPassword', authController.forgotPassword);
route.post('/resetPassword',verify,authController.resetPassword);


export default route;