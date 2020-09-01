const pool = require("./../../databasePool");

exports.getProducts = (request, response) => {
  pool.query("SELECT * FROM PRODUCT", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

exports.createProduct = (request, response) => {
  const { p_title, size, p_description, price } = request.body;

  pool.query(
    "INSERT INTO PRODUCT (p_title, size, p_description, price) VALUES ($1, $2,$3,$4)",
    [p_title, size, p_description, price],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`product inserted`);
    }
  );
};

exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM PRODUCT WHERE p_id = $1", [id], (err, result) => {
    if (err) throw err;

    res.status(200).json(result.rows);
  });
};

exports.updateProductById = (request, response) => {
  const id = parseInt(request.params.id);
  const { p_title, size, p_description, price } = request.body;

  pool.query(
    "UPDATE PRODUCT SET p_title=$1, size=$2, p_description=$3, price=$4 WHERE p_id = $5",
    [p_title, size, p_description, price, id],
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
