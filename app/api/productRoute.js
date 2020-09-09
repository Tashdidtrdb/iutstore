const express = require("express");
const authenticate = require("./authentication.js");
const productController = require("./../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(authenticate, productController.createProduct);

router
  .route("/:id")
  .get(productController.getProductById)
  .patch(authenticate, productController.updateProductById)
  .delete(authenticate, productController.deleteProductById);

module.exports = router;
