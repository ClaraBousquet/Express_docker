const passport = require('../passport-config');
const User = require('../model/userScheme');
const bcrypt = require('bcrypt');



// Affiche la route accueil

exports.showHome = (req, res) => {
    res.render('accueil');
};                       