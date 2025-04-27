//bookings: GET (Fetch all bookings and their information)
import bookingData from "../../data/bookings.json" with { type: 'json' };

const getBookings = (numberOfGuests, bookingStatus) => {
  let bookings = bookingData.bookings;

  if (numberOfGuests) {
    bookings = bookings.filter((booking) => booking.numberOfGuests === numberOfGuests);
  }

  if (bookingStatus) {
    bookings = bookings.filter((booking) => booking.bookingStatus === bookingStatus);
  }
    
    return bookings;
};

export default getBookings;