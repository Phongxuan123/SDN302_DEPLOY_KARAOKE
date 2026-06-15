const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.render("booking", { bookings });
  } catch (error) {
    res.status(500).send("Error retrieving bookings: " + error.message);
  }
};

const getCreateBookingForm = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render("bookRoom", { rooms, error: null });
  } catch (error) {
    res.status(500).send("Error loading rooms: " + error.message);
  }
};

const createBooking = async (req, res) => {
  try {
    const { customerName, roomNumber, startTime, endTime } = req.body;

    const room = await Room.findOne({ roomNumber });
    if (!room) {
      const rooms = await Room.find();
      return res.render("bookRoom", {
        rooms,
        error: `Room ${roomNumber} does not exist in the system.`,
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      const rooms = await Room.find();
      return res.render("bookRoom", {
        rooms,
        error: "End time must be after start time.",
      });
    }

    const hours = (end - start) / (1000 * 60 * 60);
    const totalAmount = Math.ceil(hours) * room.pricePerHour;

    await Booking.create({ customerName, roomNumber, startTime: start, endTime: end, totalAmount });
    res.redirect("/bookings");
  } catch (error) {
    res.status(500).send("Error creating booking: " + error.message);
  }
};

const getUpdateBookingForm = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send("Booking not found.");
    const rooms = await Room.find();
    res.render("updateRoom", { booking, rooms, error: null });
  } catch (error) {
    res.status(500).send("Error loading booking: " + error.message);
  }
};

const updateBooking = async (req, res) => {
  try {
    const { customerName, roomNumber, startTime, endTime } = req.body;

    const room = await Room.findOne({ roomNumber });
    if (!room) {
      const booking = await Booking.findById(req.params.id);
      const rooms = await Room.find();
      return res.render("updateRoom", {
        booking,
        rooms,
        error: `Room ${roomNumber} does not exist in the system.`,
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      const booking = await Booking.findById(req.params.id);
      const rooms = await Room.find();
      return res.render("updateRoom", {
        booking,
        rooms,
        error: "End time must be after start time.",
      });
    }

    const hours = (end - start) / (1000 * 60 * 60);
    const totalAmount = Math.ceil(hours) * room.pricePerHour;

    await Booking.findByIdAndUpdate(req.params.id, {
      customerName,
      roomNumber,
      startTime: start,
      endTime: end,
      totalAmount,
    });

    res.redirect("/bookings");
  } catch (error) {
    res.status(500).send("Error updating booking: " + error.message);
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.redirect("/bookings");
  } catch (error) {
    res.status(500).send("Error deleting booking: " + error.message);
  }
};

module.exports = {
  getAllBookings,
  getCreateBookingForm,
  createBooking,
  getUpdateBookingForm,
  updateBooking,
  deleteBooking,
};
