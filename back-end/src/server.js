require("dotenv").config(); // config dotenv to use .env file
const express = require("express"); // import express
const configViewEngine = require("./config/viewEngine"); // import config view engine file
const apiRoutes = require("./routes/api"); // import route file
const connection = require("./config/database");

const app = express(); // app express
const port = process.env.PORT || 8888; // port save on .env file
const hostname = process.env.HOST_NAME; // hostname save on .env file

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// config req.body - can get data from html (client)
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config template engine and static files
configViewEngine(app);

// Route
app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
