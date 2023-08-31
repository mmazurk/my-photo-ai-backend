const express = require('express')

const { NotFoundError } = require("./expressError");
const app = express();

// for testing
// for testing
// for testing
const User = require('./models/user')
// for testing
// for testing
// for testing






app.get('/test', function(request, response) {
    User.authenticate("bunners", "test")
    return response.send({message: "This is a test"});
  });

 





app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
