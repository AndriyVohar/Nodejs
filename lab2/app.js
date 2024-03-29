var createError = require('http-errors');
var express = require('express');
var path = require('path');

var booksRouter = require('./routes/books');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');
const { authenticationCheck } = require('./middlewares/auth.middleware');

var app = express();

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

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
