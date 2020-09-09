const express = require("express");
const authenticate = require("./authentication.js");
const cartController = require("./../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .post(authenticate, cartController.add_to_cart)
  .get(authenticate, cartController.get_all_cart_item);

router.route("/:cart_id").delete(authenticate, cartController.delete_from_cart);

module.exports = router;
