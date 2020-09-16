const express = require("express");
const authenticate = require("./authentication.js");
const cartController = require("./../controllers/cartController");

const router = express.Router();

router
  .route("/")
  .post(cartController.add_to_cart)
  .get(cartController.get_my_orders);

router.get("/my_products", cartController.get_my_products);
router.route("/:cart_id").delete(authenticate, cartController.delete_from_cart);

module.exports = router;
