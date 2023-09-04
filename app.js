'use strict';

const express = require('express')
const cors = require("cors"); // cross-origin resource sharing

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require("./routes/auth");
const promptRoutes = require("./routes/prompts");
const userRoutes = require("./routes/users");

const morgan = require("morgan"); // provides concise log output to help developers get insights into incoming HTTP requests
const app = express();

// middleware
app.use(cors()); // you use parens here because this is middleware factory; they return the function Express will use 
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT); // this is direct middleware function that I wrote; I don't need to invoke it


// troubleshooting connection
// app.get('/test', function(request, response) {
//   return response.send({message: "This is a test"});
// });

// routes
app.use("/auth", authRoutes);
app.use("/prompts", promptRoutes);
app.use("/users", userRoutes);

// handle 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// catch-all error handler for anything that falls down to here
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
