var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const env = require('./db')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Database
if (env.isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb+srv://Kavindu:hLBDsBORKiJhhFw1@pncbank.zk96rcb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
  mongoose.set('debug', true);
}

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error: '));
db.once('open', console.log.bind(console, 'MongoDB connection successful'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


require('./models/UserModel');
require('./models/oauth');
// Routes
app.use(require('./routes/oauth'));

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
