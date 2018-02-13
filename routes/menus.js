var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/dashboard', function(req, res, next){
  User.findById(req.session.userId).exec(function(error, user){
    if(error){
      return next(error);
    } else {
      return res.json({name: user.name, username: user.name})
    }
  })
 res.render('./menus/dashboard')
})


router.get('/session', function(req, res, next) {
  console.log(req.session.views)
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    console.log(req.session.views)
    res.end('welcome to the session demo. refresh!')
  }
})
module.exports = router;
