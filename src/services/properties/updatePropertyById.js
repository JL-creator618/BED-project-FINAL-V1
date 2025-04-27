// //property/:id PUT (Update a property)
import propertyData from "../../data/properties.json" with { type: 'json' };

const updatePropertyById = (id, updatedProperty) => {
  const propertyIndex = propertyData.properties.findIndex((property) => property.id === id);

  if (propertyIndex === -1) {
    return null;
  }

  const {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating
  } = updatedProperty;

  const currentProperty = propertyData.properties[propertyIndex];

  currentProperty.title = title ?? currentProperty.title;
  currentProperty.description = description ?? currentProperty.description;
  currentProperty.location = location ?? currentProperty.location;
  currentProperty.pricePerNight = pricePerNight ?? currentProperty.pricePerNight;
  currentProperty.bedroomCount = bedroomCount ?? currentProperty.bedroomCount;
  currentProperty.bathRoomCount = bathRoomCount ?? currentProperty.bathRoomCount;
  currentProperty.maxGuestCount = maxGuestCount ?? currentProperty.maxGuestCount;
  currentProperty.hostId = hostId ?? currentProperty.hostId;
  currentProperty.rating = rating ?? currentProperty.rating;

  return currentProperty;
};  

export default updatePropertyById;
