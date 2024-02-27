const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const postController = require('../controller/postController');
const { ensureAuthenticator } = require('../middlewares/authMiddleware');

// Route d'accueil
router.get('/', ensureAuthenticator, postController.showHome);
// Page formulaire de connexion 
router.get('/login', authController.showLoginForm);
// Page formulaire de création de compte 
router.get('/register', authController.showRegistrationForm);
// Route qui réceptionne les données du formulaire d'inscription
router.post('/register', authController.registerUser);
// Route qui réceptionne les données du formulaire de connexion
router.post('/login', authController.loginUser);



module.exports = router;

