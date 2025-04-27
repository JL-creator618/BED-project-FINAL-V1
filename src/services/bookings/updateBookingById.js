//booking/:id PUT (Update a booking)
import bookingData from "../../data/bookings.json" with { type: 'json' };

const updateBookingById = (id, updatedBooking) => { 
    const bookingIndex = bookingData.bookings.findIndex((booking) => booking.id === id);
    
      
    if (bookingIndex === -1) {
        return null;
    }
    const {  
    userId,
    propertyId,
    checkinDate, 
    checkoutDate, 
    numberOfGuests,
    totalPrice,
    bookingStatus 
    } = updatedBooking;

    const existingBooking = bookingData.bookings[bookingIndex];

    existingBooking.userId = userId ?? existingBooking.userId;
    existingBooking.propertyId = propertyId ?? existingBooking.propertyId;
    existingBooking.checkinDate = checkinDate ?? existingBooking.checkinDate;
    existingBooking.checkoutDate = checkoutDate ?? existingBooking.checkoutDate;
    existingBooking.numberOfGuests = numberOfGuests ?? existingBooking.numberOfGuests;
    existingBooking.totalPrice = totalPrice ?? existingBooking.totalPrice;
    existingBooking.bookingStatus = bookingStatus ?? existingBooking.bookingStatus;

    return existingBooking;

};

export default updateBookingById;
