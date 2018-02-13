var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    expressValidator = require('express-validator'),
    User = require('../models/user.js');
// /Registration routes

router.get('/register', function(req, res) {
  res.render('./registration/register', {
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
      User.findOne({
        username: username
      }, function(err, user, next) {
        console.log(user) //returns null if empty
        if (user) {
          req.session.exists = true
        }
      })
      res.render('./registration/register', {
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
          res.render('./registration/register', {
            errors: req.session.errors,
            success: req.session.success,
            exists: req.session.exists
          })
        } else if (!user) {
          var setupU = req.session.setup;
          res.render('./registration/setup', {
            username: username,
            vusername: username,
            password: req.body.password,
            vpassword: req.body.vpassword
          })
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
  };
  User.findOne({
    username: req.body.username
  }, function(err, user, next) {
    if (user) {
      res.send('You have tried to make innapropirate changes')
    } else {}
  });
  console.log('moving on..')
  req.assert('username', 'Username: Please choose a longer username').len(4, 25);
  req.assert('password', 'Password: This should be a bit longer. 12 to 100 characters').len(12, 100);
  req.getValidationResult().then(function(result) {
    //if result is not empty, something was changed
    if (!result.isEmpty()) {
      var errors = result.array();
      req.session.errors = errors;
      req.session.success = false;
    } else {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
      }
      User.create(userData, function(error, user){
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/dashboard');
        }
      })
    }
  })

})




router.get('/profile', function(req, res) {
  res.render('profile');
})





module.exports = router;
