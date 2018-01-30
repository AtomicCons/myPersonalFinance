var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
/* GET users listing. */
router.get('/login', function(req, res, next){
  res.render('login');
});
router.get('/register', function(req, res){
  res.render('register',{ errors: req.session.errors,
                          success: req.session.success,
                          exists: req.session.exists});
                          console.log(errors);
})
router.post('/register', function(req, res, next){
  req.assert('username', 'Please choose a longer username').len(4,25);
  req.assert('password', 'This should be longer. 12 to 100 characters').len(12,100);
  req.getValidationResult().then(function(result){
    if(!result.isEmpty()){
      var errors = result.array();
      req.session.errors = errors;
      req.session.success = false;
      console.log(errors)
      res.render('register', { errors: req.session.errors,
                                success: req.session.success,
                                exists: req.session.exists});
    } else {
      req.session.success = true;

      var username = req.body.username;
      User.findOne({username:username}, function(err, user, next){
        console.log(user);
        if(user){
          req.session.exists = true;
          res.render('register', { errors: req.session.errors,
                                   success: req.session.success,
                                   exists: req.session.exists})
        } else if(!user){
          res.render('setup',{username:req.body.username, password:req.body.password})
        }
      })


    }
  })
})





router.get('/profile',function(req,res){
  res.render('profile');
})





module.exports = router;
