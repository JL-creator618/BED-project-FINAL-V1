//booking/:id DELETE (Remove a booking)
import bookingData from "../../data/bookings.json" with { type: 'json' };

const deleteBookingById= (id) => {
  const bookingindex = bookingData.bookings.findIndex((booking) => booking.id === id);

  if (bookingindex === -1) {
    return null;
  }

  const deletedBooking = bookingData.bookings.splice(bookingindex, 1);
  return deletedBooking; 
};

export default deleteBookingById;
