var router = require('express').Router();
var authController = require('../Controller/authController');
var userController = require('../Controller/userController');

const authentication = require('../Middleware/authentication');

router.post('/signin',authController.signIn);
router.post('/signup',authController.signUp);
router.get('/profile', authentication, userController.userProfile);
router.post('/insert', authentication, userController.postUserData);
router.put('/update/:id', authentication, userController.updateUser);
router.delete('/delete/:id', authentication, userController.deleteUser)


module.exports = router;