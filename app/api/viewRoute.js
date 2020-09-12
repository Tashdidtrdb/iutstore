const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router
  .get("/", viewController.getHomepage)
  .get("/hoodies", viewController.getHoodies)
  .get("/jackets", viewController.getJacket)
  .get("/tshirts", viewController.getTshirt)
  .get("/others", viewController.getOther)
  .get("/login_signup", viewController.getLogin);

module.exports = router;
