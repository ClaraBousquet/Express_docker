const passport = require('../passport-config');
const User = require('../model/userScheme');
const bcrypt = require('bcrypt');


// Affiche le formulaire d'inscription
exports.showRegistrationForm = (req, res) => {
    res.render('register', {error:null});   
}

// Enregistrement d'un nouvel utilisateur

exports.registerUser = async (req, res) => { // requête en asyncrone, c'est pas du direct, le serveur a le temps de répondre, la requête met un certain temps,  Le serveur peut traiter d'autres requêtes pendant qu'une opération asynchrone est en cours.
 try {
    const {name, email, password} = req.body; // déstructuration const {}, permet d'extraire des valeurs de tableaux ou des propriétés d'objets en les assignant à des variables, code plus court
 
 // On vérifie si l'utilisateur existe deja en base de donnée
const existingUser = await User.findOne({email:email});  // await en asyncrone, file d'attente
if(existingUser){
    return res.render('register', {error: 'cet utilisateur existe déjà !'});
}
// On vérifie si les champs sont bien remplis
if(name === '' || email === '' || password === ''){
    return res.render('register', {error: 'Tous les champs doivent être remplis !'});
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

// On redirige vers la page de connexion
res.redirect('/login');

 } catch (error) {
    console.error(error);
    res.render('register', {error: 'Oops une erreur est survenue lors de l\'enregistrement  de l\'utilisateur!'});
 }
}

// Affichage du formulaire de connexion
exports.showLoginForm = (req, res) => {
    res.render('login');
}

// Connexion de l'utilisateur
exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})