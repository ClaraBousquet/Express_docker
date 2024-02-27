const mongoose = require ('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
    author:{
        type: mongoose.Schema.Types.ObjectsId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);