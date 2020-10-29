const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res) => {
  res.render("index");
});

/**
 * Basically if any request make it to this point that means router
 * did not catch the request in that case a nicely
 * formatted error would be given to user
 * */
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: `Can't find the ${req.originalUrl} for this server`,
  });
});

module.exports = app;
