const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) { // CHECKING FOR CUSTOM VALIDATION MSG
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

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if( !errors.isEmpty() ) { // CHECKING FOR CUSTOM VALIDATION MSG
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (error, user) => {
        if(error || !user) {
            return res.status(400).json({
                error: 'Email Does Not Exist'
            })
        }
        else {
            console.log(email, password, user.password);
            bcrypt.compare(password, user.password, (error, result) => {
                if(result) {
                    res.status(200).json('SuccessFully LogIn');
                }
                else {
                    res.status(400).json('Invalid Password');
                }
            });
            
        }
        // CREATE AND ASSIGN TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.SECRET); // CREATING TOKEN
        res.header('auth-token', token); // ADDING TOKEN IN RESPONSE HEADER
    })
}