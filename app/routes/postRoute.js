const express = require('express');
const router = express.Router();
//TODO: créer ensureAuthenticator dans le middleware
const {ensureAuthenticator} = require('../middlewares/authMiddleware'); // s'assurer que l'utilisateur est connecté, le middleware est un videur

//page d'accueil
router.get('/', ensureAuthenticator, (req, res)=> {
    res.render('accueil');
});

//TODO: les autres routes à prévoir

module.exports = router;