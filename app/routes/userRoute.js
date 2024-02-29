const express = require('express');
const { ensureAuthenticator } = require('../middlewares/authMiddleware');
const router = express.Router();
const userController = require('../controller/userController');
const User = require('../model/userScheme');


// Route pour le compte User
router.get('/account', ensureAuthenticator, userController.account);


module.exports = router;