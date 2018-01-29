var express       = require('express');
    path          = require('path'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    mongoose      = require('mongoose'),
    expressSession = require('express-session'),
    bodyParser    = require('body-parser');
//routes exported
var landing = require('./routes/landing');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/myfinance", {
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: '2adflkadf98adsf98asdfasdfuiasdf98',
  resave: false,
  saveUninitialized: true,
  // cookie: {secure: true}, enable on https
  cookie: {maxAge: 600}


}))
app.use(express.static(path.join(__dirname, 'public')));
//routes used from export
app.use(landing);
app.use(users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
