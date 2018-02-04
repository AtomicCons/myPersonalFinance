var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', {msg: 'Please Login',
                      });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Login Failed'
}), function(req, res){
  console.log('user', req.user);
  res.redirect('/dashboard')
});
module.exports = router;
