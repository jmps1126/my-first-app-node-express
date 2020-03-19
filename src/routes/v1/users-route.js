const express = require('express');

const userController = require('../../controllers/v1/users-controller');

const router = express.Router();

router.get('/get-all', userController.getUsers);
router.post('/login',  userController.login)
router.post('/create', userController.createUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);

module.exports = router;
