module.exports = {
    ensureAuthenticator: (req, res, next)=> { //function (){} (ancienne syntaxe fonction annonyme)
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    }
}