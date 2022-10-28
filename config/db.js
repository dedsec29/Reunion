const mongoose = require("mongoose");
const setupEnv = require("./env"); // to ensure env always load
setupEnv();

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://${username}:${password}@cluster0.zj8qqrh.mongodb.net/?retryWrites=true&w=majority`;

module.exports = () => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log(err));
};
