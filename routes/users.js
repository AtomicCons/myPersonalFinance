var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res) {
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
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      var errors = result.array();
      req.session.errors = errors;
      req.session.success = false;
      User.findOne({
        username: username
      });
      if (User) {
        req.session.exists = true
      }
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
      }, function(err, User, next) {
        if (User) {
          req.session.exists = true;
          res.render('register', {
            errors: req.session.errors,
            success: req.session.success,
            exists: req.session.exists
          })
        } else if (!User) {
          var username = req.body.username

          req.session.setupU = username;
          console.log(req.session.setupU);
          res.render('setup', {
            username: username,
            password: req.body.password
          } )
        }
      })
    }
  })

})
router.post('/setup', function(req, res, next) {
  console.log(req.body.username + ":" + req.session.setupU)
  if (req.body.username !== req.session.setupU) {
    res.send('You have tried to make innapropirate changes')
  }
  req.assert('username', 'Username: Please choose a longer username').len(4, 25);
  req.assert('password', 'Password: This should be a bit longer. 12 to 100 characters').len(12, 100);
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      req.session.errors = errors;
      req.session.success = false;
      User.findOne({
        username: username
      });
      if (User) {
        req.session.exists = true
      }
      res.render('setup', {})
    }
  })

})




router.get('/profile', function(req, res) {
  res.render('profile');
})





module.exports = router;
