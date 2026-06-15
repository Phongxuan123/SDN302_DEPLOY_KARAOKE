# Karaoke Room Booking System

A Node.js web application for managing karaoke room bookings, built with Express, MongoDB, and EJS.

## Project Structure

```
NguyenXuanKhanhPhong_karaoke/
├── models/
│   ├── roomModel.js        # Mongoose schema & model for karaoke rooms
│   └── bookingModel.js     # Mongoose schema & model for bookings
├── views/
│   ├── booking.ejs         # List all bookings, delete a booking
│   ├── bookRoom.ejs        # Form to create a new booking
│   └── updateRoom.ejs      # Form to update an existing booking
├── controllers/
│   └── bookingController.js  # Business logic for all booking operations
├── routes/
│   └── bookingRoutes.js    # Express routes for booking endpoints
├── app.js                  # Application entry point
├── package.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

## Installation

1. Clone or download the project, then navigate to the project directory:

```bash
cd NguyenXuanKhanhPhong_karaoke
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

1. Make sure MongoDB is running on your machine.

2. Start the server:

```bash
npm start
```

3. Open your browser and go to:

```
http://localhost:3000
```

## Seeding Sample Room Data

Before booking a room, you need to have rooms in the database. You can insert sample rooms directly in MongoDB shell or using a tool like MongoDB Compass:

```json
[
  {
    "roomNumber": "101",
    "capacity": 10,
    "status": "available",
    "pricePerHour": 200000,
    "features": ["TV", "Air Conditioner", "Sound System"]
  },
  {
    "roomNumber": "102",
    "capacity": 6,
    "status": "available",
    "pricePerHour": 150000,
    "features": ["TV", "Sound System"]
  }
]
```

## Features & Usage

### View All Bookings
- Navigate to `http://localhost:3000/bookings`
- Displays a table of all bookings with Customer Name, Room Number, Start Time, End Time, and Total Amount

### Create a Booking
- Click **Book a Room** on the bookings page
- Fill in Customer Name, select a Room Number (only existing rooms are shown), Start Time, and End Time
- The system automatically calculates **Total Amount** = `ceil(hours) × pricePerHour`
- Click **Book Room** to confirm

### Update a Booking
- Click **Update** next to a booking in the list
- Modify any field and click **Update Booking**
- Total Amount is recalculated automatically based on the new times and room price

### Delete a Booking
- Click **Delete** next to a booking in the list
- Confirm the prompt to permanently remove the booking

## API Routes

| Method | Route                    | Description              |
|--------|--------------------------|--------------------------|
| GET    | /bookings                | List all bookings        |
| GET    | /bookings/create         | Show create booking form |
| POST   | /bookings/create         | Save new booking         |
| GET    | /bookings/update/:id     | Show update booking form |
| POST   | /bookings/update/:id     | Save updated booking     |
| POST   | /bookings/delete/:id     | Delete a booking         |

## Technologies Used

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database & ODM
- **EJS** — Templating engine
- **Bootstrap 5** — UI styling
