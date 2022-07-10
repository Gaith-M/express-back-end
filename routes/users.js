const router = require('express').Router();
const User = require('../models/User');


router.get('/', async (req, res) => {

    try{
        const users = await User.find({});

        res.json({status: 'success', data: users});

    }catch(err){
        res.status(500).json({status: 'error', data: err})
    }
});

module.exports = router;