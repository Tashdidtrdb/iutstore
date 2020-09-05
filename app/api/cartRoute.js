const express = require("express");

const cartController = require("./../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .post(cartController.add_to_cart)
  .get(cartController.get_all_cart_item);

router.route("/:cart_id").delete(cartController.delete_from_cart);

module.exports = router;
