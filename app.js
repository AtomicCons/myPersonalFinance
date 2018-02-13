var express       = require('express'),
    app           = express(),
    router        = express.Router(),
    path          = require('path'),
    https         = require('http'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bcrypt        = require('bcrypt'),
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser'),
    expressValidator = require('express-validator'),
    expressSession = require('express-session'),
    MongoStore    = require('connect-mongo')(expressSession);

//models imported
var User = require('./models/user.js');
//middleware imported


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//set mongoose conenction
mongoose.connect("mongodb://localhost/myfinance");
var db = mongoose.connection;
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('trust proxy', 1)
app.use(logger('dev'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'this will be changed later',
  resave: true,
  saveUninitialized: false,
  cookie: {secure: false}, //set to true  on https
  cookie: {maxAge: 600},
  store: new MongoStore({
    mongooseConnection: db
  })
}))


app.use(express.static(path.join(__dirname, 'public')));
//routes used from export
//routes imported
var landing = require('./routes/landing');
var routeRegister = require('./routes/register');
var routeLogin = require('./routes/login');
var routeMenus = require('./routes/menus.js');


app.use(landing);
app.use(routeRegister);
app.use(routeLogin);
app.use(routeMenus);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
