const schemaPassword = require('../models/Password');


module.exports = (req, res, next) => {
    if(!schemaPassword.validate(req.body.password)){
        res.status(400).json({  message: 'Password too weak, minimum 6 characters in upper and lower case and 2 numbers'});
    }
    else{
        next();
    }
}