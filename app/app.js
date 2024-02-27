//import des modules
const express = require('express'); //importe la librairie express, comme le use en php
const session = require('express-session'); //importer la librairie express-session
const bodyParser = require('body-parser'); //importer la librairie body-parser
const passport = require('passport'); //importer la librairie passport
const mongoose = require('mongoose'); //importer la librairie mongoose
const ejs = require('ejs'); //importer la librairie ejs
const flash = require ('express-flash');

const app = express(); //lance l'application express, initialisation

// connexion à MongoDB
mongoose.connect('mongodb://expressmongo:27017/mongoexpress',{
// useNewUrlParser: true,
// useUnifiedTopology: true
})

// Configuration de la session
app.use(session({
   secret:'user_info', // clé secrète pour crypter les données
   resave: true, //sauvegarde la session à chaque requête
   saveUninitialized: true //sauvegarde des sessions vides
}));

// bodyParser : quand on enregistre il encode et quand on recupere il decode, il stringifie et remet sur format json
app.use(bodyParser.urlencoded({ extended: true })); //permet de parser le corps de la requête en utilisant le module body-parser
app.use(bodyParser.json()); //permet de parser le corps de la requête en utilisant le module body-parser

// configuration du passport
app.use(passport.initialize());
app.use(passport.session());

//configuration des messages flash
app.use(flash());


// Configuration des routes
const authRoutes = require('./routes/authRoute');
const postRoutes = require ('./routes/postRoute');
const userRoutes = require ('./routes/userRoute');

app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Configuration du moteur de rendu
app.set('view engine', 'ejs');
app.set('views', './view');

// Ecoute du serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
})
