var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})
router.get('/login', function(req, res, next) {
  res.render('login', {msg: 'Please Login',
                      });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Login Failed',
  successRedirect: '/dashboard'
}), function(req, res){

});
module.exports = router;
