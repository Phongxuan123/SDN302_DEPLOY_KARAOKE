const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { requireLogin } = require("./middleware/authMiddleware");

const app = express();
const PORT = 3000;
const MONGODB_URI = "mongodb://localhost:27017/karaokeDB";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "karaoke_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use("/", authRoutes);
app.get("/", (req, res) => res.redirect("/bookings"));
app.use("/bookings", requireLogin, bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
