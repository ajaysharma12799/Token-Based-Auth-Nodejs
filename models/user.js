const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        min: 7,
        max: 1024,
        required: true
    },
    salt: String,
    date: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.model('User', userSchema); // CREATING MODEL FROM USER-SCHEMA