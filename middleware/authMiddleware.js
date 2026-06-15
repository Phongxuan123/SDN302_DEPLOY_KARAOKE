const requireLogin = (req, res, next) => {
  if (req.session && req.session.isLoggedIn) return next();
  res.redirect("/login");
};

module.exports = { requireLogin };
