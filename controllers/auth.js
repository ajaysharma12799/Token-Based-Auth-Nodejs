const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const { check, validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const salt = await bcrypt.genSalt(10); // GENERATING SALT
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // HASHING PASSWORD

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    user.save( (error, user) => {
        if(error) {
            return res.status(400).json('NOT ABLE TO SAVE USER IN DATABASE');
        }
        res.json(user);
    } )
}

exports.signin = (req, res) => {
    res.json('signin');
}