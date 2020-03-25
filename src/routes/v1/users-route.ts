import express from 'express';
import {isAdmin, isAuth, isValidHostName} from '../../middlewares/auth';
import userController from '../../controllers/v1/users-controller';

const router = express.Router();

router.get('/get-all', isAuth, userController.getUsers);
router.get('/login', userController.login);
router.post('/create', isValidHostName, userController.createUser);
router.put('/update', isAuth, isValidHostName, userController.updateUser);
router.delete('/delete', isAuth, isAdmin, userController.deleteUser);

export default router;
