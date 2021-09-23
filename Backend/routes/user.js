const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const verifyEmail = require('../middleware/regex-email');
const schemaPassword = require('../middleware/Password');


router.post('/signup',verifyEmail,schemaPassword,userCtrl.signup);
router.post('/login',userCtrl.login);


module.exports= router; 