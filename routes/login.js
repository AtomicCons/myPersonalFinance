var express = require('express');
var router = express.Router();
var User = require('../models/user.js');


router.get('/logoff', function(req, res){
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
})
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next){
  if(req.body.username && req.body.password){
    var username = req.body.username,
        password = req.body.password;
   User.authenticate(username, password, function(error, user){
     if(error || !user){
       var err  = new Error('Incorrect Logon Credentials.');
       err.status = 401;
       return next(err);
     } else{
       req.session.userId = user._id;
       return res.redirect('/dashboard');
     }
   })
 } else {
   var err = new Error('Form not complete');
   err.status = 400;
   return next(err);
 }

})
module.exports = router;
