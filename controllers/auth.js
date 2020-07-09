const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const { check, validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
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