const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({status: 'error', data: {name: 'unauthorized', message: 'user is unauthorized.'}});

    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data
        
        next();
    }catch(err){
        res.status(401).json({status: 'error', data: err})
    }   
}

module.exports = auth;