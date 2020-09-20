const pool = require("./../../databasePool");
const url = require("url");
const multer = require("multer");
const path = require("path");
const Session = require("../account/session");
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const cloudinary = require('./../../secrets/cloudinaryConfig');

exports.getProducts = (request, response) => {
  // console.log(request.user);
  pool.query("SELECT * FROM PRODUCT", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

exports.createProduct = (request, response, next) => {
  const { p_title, p_category, size, color, p_description, price } = request.body;

  const { sessionString } = request.cookies;
  if(!sessionString || !Session.isValid(sessionString)) {
      const error = new Error('Invalid session');
      error.statusCode = 400;

      response.redirect('/login');
  } else {  
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
    .then(({ account }) => {
      if(!account) {
        resonse.redirect('/login');
      } 

      if(!request.file) throw new Error("No file was uploaded");

      cloudinary.uploader.upload(request.file.path, {
        public_id: request.file.filename
      }, (error, result) => {
        if(error) throw error;

        pool.query(
          "INSERT INTO PRODUCT (owner_id, p_title, p_category, size, color, p_description, price, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [account.id, p_title, p_category.toLowerCase(), size, color, p_description, price, result.url],
          (error, results) => {
            if (error) {
              throw error;
            }
            response.status(201).send(`product inserted`);
          }
        )
      })
    })
    .catch(error => next(error));
  }
};

exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM PRODUCT WHERE p_id = $1", [id], (err, result) => {
    if (err) throw err;

    res.status(200).json(result.rows);
  });
};

exports.getProductByCategory = (req, res) => {
  const { category } = url.parse(req.url, true).query;

  pool.query("SELECT * FROM PRODUCT WHERE p_category = $1", [category], (err, result) => {
    if(err) throw err;

    const products = Array.from(result.rows);
    res.status(200).render('products', {
      category: category.toUpperCase() + (category === "others" ? '' : 'S'),
      products
    });
  });
};

exports.updateProductById = (request, response) => {
  const id = parseInt(request.params.id);
  const { p_title, p_category, size, p_description, price } = request.body;

  pool.query(
    "UPDATE PRODUCT SET p_title=$1, p_category=$2, size=$3, p_description=$4, price=$5 WHERE p_id = $6",
    [p_title, p_category, size, p_description, price, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

exports.deleteProductById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM PRODUCT WHERE p_id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
