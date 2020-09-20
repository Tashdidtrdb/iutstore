const express = require("express");
const authenticate = require("./authentication.js");
const productController = require("./../controllers/productController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./public/img/",
  filename: (request, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({
  storage: storage,
  limit: {filesize: 10000000},
  fileFilter: (request, file, cb) => {
    checkFileType(file, cb);
  }
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if(extname && mimeType) {
    return cb(null, true);
  } else {
    cb("Error: Invalid Image");
  }
}

router
  .route("/")
  .get(productController.getProductByCategory)
  .post(authenticate, upload.single('pic'), productController.createProduct);

router
  .route("/:id")
  .get(productController.getProductById)
  .patch(authenticate, productController.updateProductById)
  .delete(authenticate, productController.deleteProductById);

module.exports = router;
