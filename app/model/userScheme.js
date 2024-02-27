const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
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


// Méthode pour comparer les mots de passes
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }    
}

module.exports = mongoose.model('User', userSchema); // On l'exporte pour pouvoir l'appeler ailleurs dans l'application