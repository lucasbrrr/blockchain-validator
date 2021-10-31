const express = require("express");
const app = express();

app.use(express.json());

const indexRoute = require("./Routes/index");
app.use("/", indexRoute);

app.listen(3000);
console.log("Server started: Listening on 3000");

module.exports = app;
