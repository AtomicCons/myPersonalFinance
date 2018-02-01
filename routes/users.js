var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res) {
  console.log('Session ID: ', req.sessionID);
  console.log('Session: ', req.session);
  res.render('register', {
    errors: req.session.errors,
    success: req.session.success,
    exists: req.session.exists
  });

})
router.post('/register', function(req, res, next) {
  req.assert('username', 'Username: This username cannot be used').len(4, 25);
  req.assert('password', 'Password: This should be a bit longer. 12 to 100 characters').len(12, 100);
  req.assert('vpassword', 'Passwords do not match').equals(req.body.password);
  var username = req.body.username;
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      var errors = result.array();
      req.session.errors = errors;
      req.session.success = false;
      User.findOne({username: username}, function(err, user, next){
        console.log(user)
        if (user) {
          req.session.exists = true
        }})
        res.render('register', {
          errors: req.session.errors,
          success: req.session.success,
          exists: req.session.exists
        });
    } else {
      req.session.success = true;

      var username = req.body.username;
      User.findOne({
        username: username
      }, function(err, user, next) {
        if (user) {
          req.session.exists = true;
          res.render('register', {
            errors: req.session.errors,
            success: req.session.success,
            exists: req.session.exists
          })
        } else if (!user) {
          var setupU = req.session.setup;
          res.render('setup', {
            username: username,
            vusername: username,
            password: req.body.password,
            vpassword: req.body.vpassword
          } )
        }
      })
    }
  })

})
router.post('/setup', function(req, res, next) {
  console.log(req.body.username + ":" + req.body.vusername)
    console.log(req.body.password + ":" + req.body.vpassword)
  if (req.body.username !== req.body.vusername || req.body.password !== req.body.vpassword) {
    res.send('You have tried to make innapropirate changes')
  }

  req.assert('username', 'Username: Please choose a longer username').len(4, 25);
  req.assert('password', 'Password: This should be a bit longer. 12 to 100 characters').len(12, 100);
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      req.session.errors = errors;
      req.session.success = false;
      User.findOne({username: username}, function(err, user, next){
        if (user) {
          req.session.exists = true
          res.render('setup', {

          })
        } else{
          res.send('this will register user')
        }


      });
  }
  })

})




router.get('/profile', function(req, res) {
  res.render('profile');
})





module.exports = router;
