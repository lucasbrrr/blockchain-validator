const express = require("express");
const app = express();
const connection = require("./connection");

const indexRoute = require("./Routes/index");

app.use("/", indexRoute);

console.log("Starting connection...");
connection();

app.listen(3000);
console.log("Server started: Listening on 3000");

module.exports = app;
