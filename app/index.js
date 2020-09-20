const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const accountRouter = require("./api/account");
const productRouter = require("./api/productRoute");
const cartRouter = require("./api/cartRoute");
const viewRouter = require("./api/viewRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use("/", viewRouter);
app.use("/account", accountRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(err.message);
  res.status(statusCode).json({
    type: "error",
    message: err.message
  });
});

module.exports = app;
