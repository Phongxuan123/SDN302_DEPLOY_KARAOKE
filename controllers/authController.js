const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const getLoginForm = (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/bookings");
  res.render("login", { error: null, success: null, username: "" });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isLoggedIn = true;
    req.session.username = username;
    return res.redirect("/bookings");
  }

  res.render("login", {
    error: "Invalid username or password.",
    success: null,
    username,
  });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = { getLoginForm, login, logout };
