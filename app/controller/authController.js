const passport = require('../passport-config');
const User = require('../model/userScheme');
const bcrypt = require('bcrypt');

// Affiche le formulaire d'inscription
exports.showRegistrationForm = (req, res) => {
  res.render('register', { error: null });
}

// Enregistrement d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.render('register', { error: 'Cet utilisateur existe déjà' });
    }
    // On vérifie que les champs soient remplis
    if (name === '' || email === '' || password === '') {
      return res.render('register', { error: 'Tous les champs sont obligatoires' });
    }

    // On encode le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // On crée l'objet utilisateur
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    // On sauvegarde l'utilisateur dans la base de données
    await newUser.save();

    res.redirect('/login');

  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
}

// Affiche le formulaire de connexion
exports.showLoginForm = (req, res) => {
  res.render('login');
}

// Connexion de l'utilisateur
exports.loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

// Déconnexion de l'utilisateur
exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/login');
}