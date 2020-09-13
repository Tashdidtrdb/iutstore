const express = require("express");
const viewController = require("../controllers/viewController");
const authenticate = require("./authentication.js");

const router = express.Router();

router
  .get("/", viewController.getHomepage)
  .get("/hoodies", viewController.getHoodies)
  .get("/jackets", viewController.getJacket)
  .get("/tshirts", viewController.getTshirt)
  .get("/others", viewController.getOther)
  .get("/account", authenticate, viewController.getAccount)
  .get("/signup", viewController.getSignup)
  .get("/login", viewController.getLogin)

module.exports = router;
