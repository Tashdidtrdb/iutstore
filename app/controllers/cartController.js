const pool = require("./../../databasePool");
const Session = require("../account/session");
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

exports.add_to_cart = async (req, res, next) => {
  const { owner_id, p_id, p_title, price } = req.body;

  const { sessionString } = req.cookies;

  if(!sessionString || !Session.isValid(sessionString)) {
      const error = new Error('Invalid session');
      error.statusCode = 400;
      res.status(200).send("login");
      // res.redirect('/login');
  } else {  
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
    .then(({ account }) => {
      if(!account) {
        res.status(200).send("login");
        // res.redirect('/login');
      }  
      pool.query("INSERT INTO CART (user_id, owner_id, product_id, p_title, price) VALUES ($1, $2, $3, $4, $5)",
      [account.id, owner_id, p_id, p_title, price],
      (error, results) => {
        if(error) throw error;

        res.status(200).send('Added to cart');
      }
      )
    })
    .catch(error => next(error));
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

exports.get_my_orders = async(req, res) => {
  const { sessionString } = req.cookies;

  if(!sessionString || !Session.isValid(sessionString)) {
      const error = new Error('Invalid session');
      error.statusCode = 400;

      res.redirect('/login');
  } else {  
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
    .then(({ account }) => {
      if(!account) {
        res.redirect('/login');
      }  
      pool.query("SELECT account.name, cart.product_id, cart.p_title, cart.price FROM account, cart WHERE cart.user_id = $1 AND account.id = cart.owner_id",
      [account.id],
      (error, result) => {
        if(error) throw error;

        const products = Array.from(result.rows);
        // console.log(products);
        res.status(200).render('cart', {
          products
        });
      }
      );
    })
    .catch(error => next(error));
  }
};

exports.get_my_products = async (req, res) => {
  const { sessionString } = req.cookies;

  if(!sessionString || !Session.isValid(sessionString)) {
      const error = new Error('Invalid session');
      error.statusCode = 400;

      res.redirect('/login');
  } else {
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
    .then(({ account }) => {
      if(!account) {
        res.redirect('/login');
      }  
      pool.query("SELECT account.name, account.address, account.phone, cart.product_id, cart.p_title, cart.price FROM account, cart WHERE cart.owner_id = $1 AND account.id = cart.user_id",
      [account.id],
      (error, result) => {
        if(error) throw error;

        const products = Array.from(result.rows);
        // console.log(products);

        res.status(200).render('my_products', {
          products
        });
      }
      );
    })
    .catch(error => next(error));
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
