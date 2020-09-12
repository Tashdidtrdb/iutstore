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
