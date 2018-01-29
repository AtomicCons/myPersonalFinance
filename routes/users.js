var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next){
  res.render('login');
});
router.get('/register', function(req, res){
  res.render('register');
})
router.get('/profile',function(req,res){
  res.render('profile');
})





module.exports = router;
