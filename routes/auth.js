var express = require('express');
var router = express.Router();
const Auth=require('../controller/auth')

router.get('/login',Auth.getLogin);

router.get('/signup',Auth.getsignup);

router.post('/login',Auth.postLogin);

router.post('/login',Auth.postSignup);


module.exports = router;
