const axios = require('axios');

exports.getHomepage = (req, res) => {
  res.status(200).render("base");
};

exports.getHoodies = (req, res) => {
  res.status(200).render("hoodies");
};

exports.getJacket = (req, res) => {
  res.status(200).render("jackets");
};

exports.getTshirt = (req, res) => {
  res.status(200).render("tshirts");
};

exports.getOther = (req, res) => {
  res.status(200).render("others");
};

exports.getSignup = (req, res) => {
  res.status(200).render("signup");
}

exports.getLogin = (req, res) => {
  res.status(200).render("login");
};

exports.getAccount = (req, res) => {
    res.status(200).render("account");
}
