var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

var booksRouter = require('./routes/books');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');
const { authenticationCheck } = require('./middlewares/auth.middleware');

const multer = require('multer');

var app = express();

app.use(express.static('public'));

app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: "Node.js ExApp"
    }
  });
});

app.use(cors())


app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Multer error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      throw createError.BadRequest('File size limit exceeded. Please upload a smaller file.');
    }
  }

  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({
    status: err.status || 500,
    error: err.message
  });
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  console.error(`${'\x1b[31m'}[${new Date().toUTCString()}] ${req.method}: ${req.path}. Error(${errorStatus}): ${err.message}`, '\x1b[0m');
  res.status(errorStatus).send({
    status: errorStatus,
    error: err
  });
});

module.exports = app;
