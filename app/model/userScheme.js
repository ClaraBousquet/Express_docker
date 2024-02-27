const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema); //on l'exporte pour pouvoir l'appeler ailleurs dans l'application