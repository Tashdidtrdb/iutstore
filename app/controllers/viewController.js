const Session = require("../account/session");
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

exports.getHomepage = (req, res) => {
  res.status(200).render("base");
};

// exports.getHoodies = (req, res) => {
//   res.status(200).render("hoodies");
// };

// exports.getJacket = (req, res) => {
//   res.status(200).render("jackets");
// };

// exports.getTshirt = (req, res) => {
//   res.status(200).render("products");
// };

// exports.getOther = (req, res) => {
//   res.status(200).render("others");
// };

exports.getSignup = (req, res) => {
  const { sessionString } = req.cookies;

  if(!sessionString || !Session.isValid(sessionString)) {
    res.status(200).render("signup");
  } else {
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
      .then(({ account }) => {
        res.status(200).redirect('/account');
      })
      .catch(error => res.status(200).render("signup"));
  }
}

exports.getLogin = (req, res) => {
  const { sessionString } = req.cookies;

  if(!sessionString || !Session.isValid(sessionString)) {
    res.status(200).render("login");
  } else {
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
      .then(({ account }) => {
        res.status(200).redirect('/account');
      })
      .catch(error => res.status(200).render("/login"));
  }
};

exports.getAccount = (req, res) => {
  const { sessionString } = req.cookies;

  if(!sessionString || !Session.isValid(sessionString)) {
    res.status(200).redirect("/login");
  } else {
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
      .then(({ account }) => {
        res.status(200).render("account", {
          email,
          account: account
        });
      })
      .catch(error => res.status(200).redirect("/login"));
  }
}

exports.add_product = (req, res) => {
  const { sessionString } = req.cookies;

  if(!sessionString || !Session.isValid(sessionString)) {
    res.status(200).redirect("/login");
  } else {
    const { email, id } = Session.parse(sessionString);

    AccountTable.getAccount({ email, emailHash: hash(email) })
      .then(({ account }) => {
        res.status(200).render("addproduct");
      })
      .catch(error => res.status(200).redirect("/login"));
  }
}
