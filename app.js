if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');

const passport = require('passport');
require('./scripts/passport');

const database = require('./scripts/database');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var loadRouter = require('./routes/loadPlaylist');
var tokenRouter = require('./routes/tokens');

var app = express();

app.use(session({
  secret: 'moonlight-daze',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session({secret: 'moonlight-daze'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/loadPlaylist', loadRouter);
app.use('/auth', authRouter);
app.use('/tokens', tokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('Route attempted was ' + req.url);
  next(createError(404));
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

app.listen(8000, ()=>{
  console.log('Server is running on port 8000')
});

module.exports = app;
