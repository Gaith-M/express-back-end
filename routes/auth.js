const router = require('express').Router();
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/sign-up',
    body('name').escape().isAscii().trim().isLength({min: 2}),
    body('email').escape().trim().isEmail().normalizeEmail(),
    body('password').escape().trim().isLength({min:8}),
    async (req, res) => {
    
        // Validate inputs
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({status: 'error', data: errors.array()});
        
        try{
            const {name, email, password} = req.body;

            // Check if email is avaliable
            const avaliable = await User.findOne({email});
            if(avaliable) return res.json({status: 'error', data: 'user name already exists'})
            
            // create new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({name, email, password: hashedPassword});
            
            // Create and send token
            jwt.sign({name: newUser.name}, JWT_SECRET, (err, token) => {
                if(err) return res.status(500).json({status: 'error', data: err});

                res.json({status: 'success', data: {token, user: {name: newUser.name, email: newUser.email}}})
            });
        }
        catch(err){
            res.status(500).send({status: 'error', data: err})
        }
});

router.post('/login', 
    body('email').escape().trim().isEmail().normalizeEmail,
    body('password').escape().trim().isLength({min:8}),
    async (req, res) => {

        // Validate inputs
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({status: 'error', data: errors.array()});

        const {email, password} = req.body;

        try{
            // fetch user from DB
            const requestedUser = await User.findOne({email});
            if(!requestedUser) return res.status(400).json({status: 'error', data: 'email or password are incorrect'});
        
            // validate user
            const isValid = await bcrypt.compare(password, requestedUser.password)
            if(!isValid) return res.status(400).json({status: 'error', data: 'email or password are incorrect'});
        
            // Create and send token
            jwt.sign({name: requestedUser.name}, JWT_SECRET, (err, token) => {
                if(err) return res.status(500).json({status: 'error', data: err})
        
                res.json({status: 'success', data: {token, user: {name: requestedUser.name, email: requestedUser.email}}})
            })

        }catch(err){
            res.status(500).json({status: 'error', data: err})
        }
});

module.exports = router;