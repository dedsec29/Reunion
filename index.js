const express = require("express");
const app = express();
const morgan = require("morgan"); //to log incoming requests
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Remove in Production
app.use(morgan("dev"));

const setup_env = require("./config/env");
const db_connection = require("./config/db");

// import routes
const user_route = require("./routes/user");
const post_route = require("./routes/post");

setup_env();
db_connection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initializing routes
app.use("/api/user", user_route);
app.use("/api/posts", post_route);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

// Listening on port
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log("Server is running");
});

module.exports = app;
