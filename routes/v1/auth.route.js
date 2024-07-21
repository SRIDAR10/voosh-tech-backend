const express = require('express');
const router = express.Router();
const { authController } = require('../../controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/google', authController.googleSignup);
router.get('/google/callback', authController.googleSignupCallback);
router.get('/logout', authController.logout);
module.exports = router;