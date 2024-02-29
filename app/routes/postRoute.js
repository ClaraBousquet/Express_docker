const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

// Middlewares pour vérifier si l'utilisateur est connecté
const {ensureAuthenticator} = require('../middlewares/authMiddleware');

// Route pour afficher le formulaire de création de post
router.get('/add', ensureAuthenticator, postController.showAddPost);

// Route pour receptionner les données du formulaire de création de post
router.post('/add', ensureAuthenticator, postController.addPost);

// Route qui renvoie le formulaire de modification de post
router.get('/edit/:id', ensureAuthenticator, postController.showEditPost);

// Route pour réceptionner les données du formulaire de modification de post
router.post('/edit/:id', ensureAuthenticator, postController.editPost);

// Route pour supprimer un post
router.get('/delete/:id', ensureAuthenticator, postController.deletePost);

module.exports = router;