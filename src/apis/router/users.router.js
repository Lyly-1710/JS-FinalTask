import express from 'express';
import userController from '../controller/users.controller';
import verify from '../../middleware/verify.middleware';

const route = express.Router();

route.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

route.route('/me')
    .get(verify, userController.getOwnInfor);

route.route('/:id')
    .get(userController.getDetailUser)
    .put(verify, userController.updateUser)
    .delete(verify, userController.deleteUser);


export default route;