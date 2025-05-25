const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.patch('/user/:id/password', userController.updateUserPassword);
router.delete('/user/:id', userController.deleteUser);
router.get('/user/:id/perfil', userController.getPerfil);

module.exports = router;
