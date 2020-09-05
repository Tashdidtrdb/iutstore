const pool = require("./../../databasePool");

exports.add_to_cart = async (req, res) => {
  const { user_id, product_id, name, address, p_title, price } = req.body;
  // const { user_id } = req.user;
  const add_to_cart_Query = `INSERT INTO
          CART(user_id, product_id, name, address, p_title, price)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
  const values = [user_id, product_id, name, address, p_title, price];

  try {
    const { rows } = await pool.query(add_to_cart_Query, values);
    const dbResponse = rows[0];

    return res.status(200).send(dbResponse);
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.delete_from_cart = async (req, res) => {
  const id = req.params.cart_id;
  // const { user_id } = req.user;
  const delete_from_cart_Query =
    "DELETE FROM CART WHERE cart_id=$1  returning *";
  try {
    const { rows } = await pool.query(delete_from_cart_Query, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      return res.status(404).send("You have no booking with that id");
    }

    return res.status(200).send("Booking deleted successfully");
  } catch (error) {
    return res.status(404).send(error);
  }
};

exports.get_all_cart_item = async (req, res) => {
  // const { is_admin, user_id } = req.user;
  // const user_id = req.body;
  //
  // // for normal user
  // if (!is_admin === true) {
  //   const get_all_cart_item_Query = "SELECT * FROM booking WHERE user_id = $1";
  //   try {
  //     const { rows } = await pool.query(get_all_cart_item_Query, [user_id]);
  //     const dbResponse = rows;
  //     if (dbResponse[0] === undefined) {
  //       return res.status(404).send("You have no bookings");
  //     }
  //     return res.status(200).send(dbResponse);
  //   } catch (error) {
  //     return res.status(404).send(errorMessage);
  //   }
  // }

  // for admin
  const get_all_cart_item_Query = "SELECT * FROM CART ORDER BY cart_id DESC";
  try {
    const { rows } = await pool.query(get_all_cart_item_Query);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      return res.status(404).send("There are no bookings");
    }
    return res.status(200).send(dbResponse);
  } catch (error) {
    return res.status(404).send("An error Occured");
  }
};
