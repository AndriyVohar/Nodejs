const { port, mongodb_uri } = require("./config");

const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(mongodb_uri).then(() => {
  console.log("Mongo DB connected");
});

const app = express();

const task1Router = require("./routes/task1.route");
const task2Router = require("./routes/task2.route");

app.use(express.json());
app.use("/task1", task1Router);
app.use("/task2", task2Router);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
  next();
});

// An endpoint to hadle base url route GET request
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      message: "Node.js ExApp",
    },
  });
});

// Error-handling middleware. Handling global application errors
app.use((err, req, res, next) => {
  const erorrStatus = err.status || 500;
  console.error(
    `${"\x1b[31m"}[${new Date().toUTCString()}] ${req.method}: ${
      req.path
    }. Error(${erorrStatus}): ${err.message}`,
    "\x1b[0m"
  );
  res.status(erorrStatus).send({
    status: erorrStatus,
    error: err,
  });
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send({
    status: err.status || 500,
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
