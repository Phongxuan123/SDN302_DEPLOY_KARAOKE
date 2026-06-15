const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);
router.get("/create", bookingController.getCreateBookingForm);
router.post("/create", bookingController.createBooking);
router.get("/update/:id", bookingController.getUpdateBookingForm);
router.post("/update/:id", bookingController.updateBooking);
router.post("/delete/:id", bookingController.deleteBooking);

module.exports = router;
