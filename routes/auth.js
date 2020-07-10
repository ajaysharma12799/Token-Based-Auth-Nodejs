const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/user');
const { signup, signin } = require('../controllers/auth');

router.post('/signup',[
    check('name', 'name should be atleast 5 character').isLength({min: 5, max: 30}),
    check('email', 'email should be correct').isEmail(),
    check('password', 'password be above 7 character').isLength({min: 7, max: 1024})
] , signup);

router.post('/signin',[
    check('email', 'name should be atleast 5 character').isLength({min:5, max: 30}),
    check('password', 'password should be above 7 character').isLength({min: 7, max: 1024})
] , signin);

module.exports = router;