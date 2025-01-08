const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    const error = "Silahkan Login Terlebih Dahulu";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role !== "Admin") {
    const error = "Kamu tidak memiliki access";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
};

const isCustomer = (req, res, next) => {
  if (req.session.user && req.session.user.role !== "Customer") {
    const error = "Kamu tidak memiliki access";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
};

module.exports = {
  isCustomer,
  isAdmin,
  isLoggedIn,
};
