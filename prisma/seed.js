
import { PrismaClient } from "@prisma/client";
import hostsData from "../src/data/hosts.json" with { type: "json" };
import amenitiesData from "../src/data/amenities.json" with { type: "json" };
import bookingsData from "../src/data/bookings.json" with { type: "json" };
import propertiesData from "../src/data/properties.json" with { type: "json" };
import reviewsData from "../src/data/reviews.json" with { type: "json" };
import usersData from "../src/data/users.json" with { type: "json" };


const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
try {
  // Create hosts from the JSON data-before properties
  const { hosts } = hostsData;
  console.log("Importing hosts data...");

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {
        id: host.id,
        username: host.username,
        password: host.password,          
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        pictureUrl: host.profilePicture, // Map profilePicture to pictureUrl
        aboutMe: host.aboutMe,
        
        },
      create: {
        id: host.id,
        username: host.username,
        password: host.password,
        name: host.name,            
        email: host.email,
        phoneNumber: host.phoneNumber,
        pictureUrl: host.profilePicture, // Map profilePicture to pictureUrl
        aboutMe: host.aboutMe,
       
        },
      });
    }

    console.log("Hosts data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }

  try{
  // Create Users from the JSON data- before reviews
  const {users} = usersData;
  console.log("Importing users data...");

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id},
      update: {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        pictureUrl: user.profilePicture, // Map profilePicture to pictureUrl
      },
      create: {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        pictureUrl: user.profilePicture,
      }
    });
  }
    console.log("Users data imported successfully!");
  } catch (error) {
    console.error("Error importing users data:", error);
  }

  //check-users
  const createdUsers = await prisma.user.findMany();
  console.log(`Created ${createdUsers.length} users:`, createdUsers.map(u => u.id));

  try{
  // Create amenities from the JSON data
  const {amenities} = amenitiesData;
  console.log("Importing Amenities data...");

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {
        id: amenity.id,
        name: amenity.name,
      },
      create: {
       id: amenity.id,
       name: amenity.name,
      }
    });
  }
  console.log("Amenities data imported successfully!");
  } catch (error) {
    console.error("Error importing amenities data:", error);
  }


  try{
  // Create Properties from the JSON data
  const {properties} = propertiesData;
  console.log("Importing Properties data...");

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id},
      update: {
        id: property.id,
        host: { 
          connect: {id: property.hostId} //many-to-one direction
        },
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount:property.bathRoomCount,
        maxGuestCount:property.maxGuestCount,
        rating: property.rating,

      },
      create: {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount:property.bathRoomCount,
        maxGuestCount:property.maxGuestCount,
        host: { 
          connect: {id: property.hostId} //many-to-one direction
        },
        rating: property.rating,

      },
    });
  }
  console.log("Properties data imported successfully!");
  } catch (error) {
    console.error ("Error importing properties data:", error)
  }

  try{
  // Create bookings from the JSON data
  const {bookings} = bookingsData;
  console.log("Importing Bookings data...");

  for (const booking of bookings) {

    // Check if user exists before attempting to connect
    const userExists = await prisma.user.findUnique({
      where: { id: booking.userId }
    });
    
    if (!userExists) {
      console.warn(`Skipping booking ${booking.id} - User with ID ${booking.userId} not found`);
      continue; // Skip this booking
    }

    await prisma.booking.upsert({
      where: { id: booking.id},
      update: {
        id: booking.id,
        user:{
          connect: {id: booking.userId} //connect to specific user
        },
         property: {
          connect: {id: booking.propertyId} // connect to specific property
        },
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
      },
      create: {
           id: booking.id,
        user:{
          connect: {id: booking.userId} //connect to specific user
        },
         property: {
          connect: {id: booking.propertyId} // connect to specific property
        },
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
      }
    });
  }
  console.log("Booking data imported successfully!");
  } catch (error) {
    console.error ("Error importing Bookinhd data:", error)
  }
  
  try{
  // Create Reviews from the JSON data
  const {reviews} = reviewsData;
  console.log("Importing Reviews data...");

  for (const review of reviews) {

    // Check if user exists before attempting to connect
  const userExists = await prisma.user.findUnique({
    where: { id: review.userId }
  });
  
  if (!userExists) {
    console.warn(`Skipping review ${review.id} - User with ID ${review.userId} not found`);
    continue; // Skip this review
  }

    await prisma.review.upsert({
      where: { id: review.id},
      update: {
        id: review.id,
        user: {
          connect: {id: review.userId} //connect to specific user
        },
        property: {
          connect: {id: review.propertyId} // connect to specific property
        },
        rating: review.rating, 
        comment: review.comment, 
      },
      create: {
        id: review.id,
        user: {
          connect: {id: review.userId} //connect to specific user
        },
        property: {
          connect: {id: review.propertyId} // connect to specific property

        },
        rating: review.rating, 
        comment: review.comment, 
      }
    });
  }
  console.log("Reviews data imported successfully!");
  } catch (error) {
    console.error ("Error importing reviews data:", error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });