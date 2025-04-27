import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";

import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

//1 GET /bookings
router.get("/", async (req, res) => {
  try {
    const { numberOfGuests, bookingStatus } = req.query;
    const bookings = getBookings(numberOfGuests, bookingStatus);

    if (!bookings || bookings.length === 0) {
      return res.status(404).send("No bookings found.");
    } else {
      res.status(200).json(bookings);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting list of bookings!");
  }
});

//2 GET /bookings/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = getBookingById(id);

    if (!booking) {
      res.status(404).send(`Booking with id ${id} was not found!`);
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while fetching the booking");
    }
  }
});

//3 POST /bookings 
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const newBooking = createBooking({
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      !numberOfGuests ||
      !totalPrice ||
      !bookingStatus
    ) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      res.status(201).json(newBooking);
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return res
        .status(500)
        .send("Something went wrong while creating new booking!");
    }
  }
});

//4 PUT /bookings/:id 
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const updatedBooking = updateBookingById(id, {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (!updatedBooking) {
      res.status(404).send(`Booking with id ${id} was not found!`);
    } else {
      res.status(200).json(updatedBooking);
    }
  } catch (error) {
    console.error(error);

    if (error.message.includes("was not found")) {
      return res.status(404).send(error.message);
    }

    res.status(500).send("Something went wrong while updating booking by id!");
  }
});

//5 DELETE /bookings/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = deleteBookingById(id);

    if (!deletedBooking) {
      res.status(404).send(`Booking with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Booking with id ${id} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting user by id!");
  }
});

// Global 404 handler (for undefined routes)
router.use((req, res) => {
  res.status(404).send("Route not found.");
});

export default router;
