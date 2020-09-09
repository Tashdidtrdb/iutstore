const express = require("express");
const bodyParser = require("body-parser");
const accountRouter = require("./api/account");
const productRouter = require("./api/productRoute");
const cartRouter = require("./api/cartRoute");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/account", accountRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: "error",
    message: err.message
  });
});

module.exports = app;
