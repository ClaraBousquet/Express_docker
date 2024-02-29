const User = require('../model/userScheme');
const bcrypt = require('bcrypt');

// Méthode pour afficher le compte de l'utilisateur et ses données
exports.account = async (req, res) => {
    try {
        // On recupère l'id de l'utilisateur connecté
        const userId = req.user._id;
        
        // On recupère l'utilisateur grace à son id
        const user = await User.findById(userId);

        // Si l'utilisateur est trouvé, on rend la vue avec les données de l'utilisateur
        res.render('account', { user });
    } catch (err) {
        // Gestion des erreurs
        console.log(err);
        res.status(500).send('Une erreur ');
    }
};


