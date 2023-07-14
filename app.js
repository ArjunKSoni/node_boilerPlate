var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const csrf = require("csurf")
const multer=require('multer')
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// //csrf protection
// const csrfProtection = csrf({});
// app.use(csrfProtection)

////multer to haldle files
// app.use(multer({
//   storage:multer.diskStorage({  //using multer to save files
//       filename:(req,file,cb)=>{
//           cb(null,file.originalname)
//       },
//       destination:(req,file,cb)=>{
//           cb(null,'images')  // null is for the error message and 2 argument is the place to store image
//       },
//   }),
//   fileFilter:(req,file,cb)=>{
//       if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
//           cb(null,true);
//       }
//       else cb(null,false);
//   }
// }).single('imageUrl')) ///to handle file type data {also use enctype in html form component}

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;
