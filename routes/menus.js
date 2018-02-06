var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/dashboard', isLoggedIn, function(req, res){
 res.render('./menus/dashboard')
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}

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
